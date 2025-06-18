// /src/components/tours/TourCreate.tsx
import { useForm } from "@refinedev/react-hook-form";
import {
  Box,
  Typography,
  Button,
  Paper,
  Stack,
  CircularProgress,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useNotification } from "@refinedev/core";
import { FieldValues } from "react-hook-form";

// Import Icons
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// Import our reusable components
import { TourFormBasicInfo } from "./form/TourFormBasicInfo";
import { TourFormLocationCategory } from "./form/TourFormLocationCategory";
import { TourFormMedia } from "./form/TourFormMedia";
import { TourFormPromotionalFlags } from "./form/TourFormPromotionalFlags";

// Import our design system and interface
import { tourTheme } from "./styles/tourTheme";
import { GradientHeader, PageContainer } from "./styles/styledComponents";
import { Tour } from "../../interfaces/tour";

const steps = ['Basic Details', 'Location & Media', 'Promotional Settings'];

// We need to properly type the props for our form partials
interface TourFormProps {
  register: any;
  errors: any;
  control: any;
  setValue: any;
  watchedValues: FieldValues; 
  categoryValue: string;
  setCategoryValue: React.Dispatch<React.SetStateAction<string>>;
}

const renderStepContent = (step: number, props: TourFormProps) => {
  switch (step) {
    case 0:
      return <TourFormBasicInfo {...props} />;
    case 1:
      return (
        <Stack spacing={3}>
          <TourFormLocationCategory {...props} />
          <TourFormMedia {...props} />
        </Stack>
      );
    case 2:
      return <TourFormPromotionalFlags {...props} />;
    default:
      return null;
  }
};

export const TourCreate = () => {
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();
  const { open } = useNotification();

  const {
    saveButtonProps,
    register,
    control,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    reset,
    trigger,
  } = useForm<Tour>({
    refineCoreProps: {
      resource: "tours",
      onMutationSuccess: (data) => {
        open?.({
          type: "success",
          message: "🎉 Tour Created Successfully!",
          description: `"${data?.data?.title || 'Your amazing tour'}" is now live!`,
          undoableTimeout: 4000,
        });
        setTimeout(() => navigate("/tours"), 1500);
      },
      onMutationError: (error) => {
        open?.({ type: "error", message: "Creation Failed", description: error.message, undoableTimeout: 7000 });
      }
    },
    defaultValues: {
      title: "", description: "", tags: [], location: "", category: "", image: "", slug: "", item_id: "",
      is_featured: false, is_vip: false, is_pinned: false, show_on_homepage: false, is_unforgettable: false,
    }
  });

  const watchedValues = watch();
  const title = watch("title");
  const [categoryValue, setCategoryValue] = useState("");

  useEffect(() => {
    if (title) {
      setValue("slug", title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, ""));
    }
  }, [title, setValue]);
  
  const handleNext = async () => {
    const fieldsToValidate: string[] = {
      0: ["title", "description"],
      1: ["location", "category"],
      2: []
    }[activeStep] || [];

    const isStepValid = await trigger(fieldsToValidate);
    if (isStepValid) setActiveStep((prev) => prev + 1);
    else open?.({ type: "error", message: "Validation Error", description: "Please fill out all required fields." });
  };

  const handleBack = () => setActiveStep((prevStep) => prevStep - 1);
  
  const handleReset = () => {
    if (window.confirm("Are you sure you want to clear the form?")) {
      reset();
      setActiveStep(0);
    }
  };

  const formProps: TourFormProps = {
    register, errors, control, setValue, watchedValues, categoryValue, setCategoryValue
  };

  return (
    <PageContainer sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <GradientHeader elevation={0}>
        <Box sx={{ p: tourTheme.spacing.lg }}>
          <Typography variant="h4" sx={{ fontWeight: 700, display: "flex", alignItems: "center", gap: 2 }}>
            <AddCircleIcon sx={{ fontSize: "inherit" }} /> Create New Tour
          </Typography>
          <Typography variant="subtitle1" sx={{ opacity: 0.9, mb: 3 }}>
            Follow the steps to add a new adventure to your collection
          </Typography>
          <Stepper activeStep={activeStep} sx={{ background: 'transparent' }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel sx={{ "& .MuiStepLabel-label.Mui-active": { color: "white" } }} />
              </Step>
            ))}
          </Stepper>
        </Box>
      </GradientHeader>

      <Box sx={{ flex: 1, overflowY: 'auto', p: 3 }}>
        {renderStepContent(activeStep, formProps)}
      </Box>
      
      <Paper elevation={4} sx={{ p: 2, borderTop: "1px solid #e0e0e0", flexShrink: 0 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Button disabled={activeStep === 0} onClick={handleBack} variant="outlined" startIcon={<ArrowBackIcon />}>
            Back
          </Button>

          <Typography variant="body2" color="text.secondary">Step {activeStep + 1} of {steps.length}</Typography>

          <Box sx={{ display: "flex", gap: 1 }}>
            {activeStep === steps.length - 1 ? (
              <>
                <Button onClick={handleReset} variant="outlined" color="secondary" startIcon={<CancelIcon />}>
                  Reset
                </Button>
                <Button {...saveButtonProps} variant="contained" startIcon={isSubmitting ? <CircularProgress size={16} /> : <SaveIcon />} disabled={isSubmitting}>
                  {isSubmitting ? "Creating..." : "Create Tour"}
                </Button>
              </>
            ) : (
              <Button variant="contained" onClick={handleNext} endIcon={<ArrowForwardIcon />}>
                Next
              </Button>
            )}
          </Box>
        </Box>
      </Paper>
    </PageContainer>
  );
};