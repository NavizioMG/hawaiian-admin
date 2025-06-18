// /src/components/tours/TourCreate.tsx
import { useForm } from "@refinedev/react-hook-form";
import {
  Box,
  Typography,
  Chip,
  Button,
  Paper,
  Stack,
  CircularProgress,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useNotification } from "@refinedev/core";

// UX ENHANCEMENT: Import icons for our buttons
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

// Import our design system
import { tourTheme } from "./styles/tourTheme";
import { GradientHeader, PageContainer } from "./styles/styledComponents";

const steps = ['Basic Details', 'Location & Media', 'Promotional Settings'];

export const TourCreate = () => {
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();
  const { open } = useNotification();
  const firstFieldRef = useRef<HTMLInputElement>(null); // UX ENHANCEMENT: Ref for auto-focus

  const {
    saveButtonProps,
    register,
    control,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    reset,
    trigger,
  } = useForm({
    refineCoreProps: {
      resource: "tours",
      onMutationSuccess: (data) => {
        open?.({
          type: "success",
          message: "🎉 Tour Created Successfully!",
          description: `"${data?.data?.title || 'Your amazing tour'}" is now live!`,
          undoableTimeout: 5000,
        });
        setTimeout(() => navigate("/tours"), 1500);
      },
      onMutationError: (error) => {
        open?.({
          type: "error",
          message: "⚠️ Creation Failed",
          description: error.message || "Please check for errors in the form.",
          undoableTimeout: 7000,
        });
      }
    },
    defaultValues: {
      title: "", description: "", tags: [], location: "", category: "", image: "",
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
  
  // UX ENHANCEMENT: Auto-focus the first field of the current step
  useEffect(() => {
    setTimeout(() => {
      firstFieldRef.current?.focus();
    }, 100);
  }, [activeStep]);

  const handleNext = async () => {
    const fieldsToValidate = {
      0: ["title", "description"],
      1: ["location", "category"],
      2: []
    }[activeStep];

    const isStepValid = await trigger(fieldsToValidate as any);
    
    if (isStepValid) {
      setActiveStep((prevStep) => prevStep + 1);
    } else {
      // UX ENHANCEMENT: Give user feedback on validation failure
      open?.({
        type: "error",
        message: "Validation Error",
        description: "Please fill out all required fields before proceeding.",
      });
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };
  
  const handleReset = () => {
    // UX ENHANCEMENT: Confirm before resetting the form
    if (window.confirm("Are you sure you want to clear the entire form? All progress will be lost.")) {
      reset();
      setActiveStep(0);
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return <TourFormBasicInfo control={control} errors={errors} register={register} />;
      case 1:
        return (
          <Stack spacing={3}>
            <TourFormLocationCategory 
              register={register}
              watchedValues={watchedValues}
              errors={errors}
              categoryValue={categoryValue}
              setCategoryValue={setCategoryValue}
              setValue={setValue}
            />
            <TourFormMedia register={register} control={control} />
          </Stack>
        );
      case 2:
        return <TourFormPromotionalFlags register={register} watchedValues={watchedValues} />;
      default:
        return null;
    }
  };

  return (
    // FIX: The main page container is now a flexbox column to manage the layout
    <PageContainer sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <GradientHeader elevation={0}>
        <Box sx={{ p: tourTheme.spacing.lg }}>
          <Typography variant="h4" sx={{ fontWeight: 700, display: "flex", alignItems: "center", gap: 2 }}>
            <AddCircleIcon sx={{ fontSize: "inherit" }} />
            Create New Tour
          </Typography>
          <Typography variant="subtitle1" sx={{ opacity: 0.9, mb: 3 }}>
            Follow the steps to add a new adventure to your collection
          </Typography>
          <Stepper activeStep={activeStep} sx={{ background: 'transparent' }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel sx={{ "& .MuiStepLabel-label.Mui-active": { color: "white" } }}>
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
      </GradientHeader>

      {/* FIX: This content area is now scrollable */}
      <Box sx={{ flex: 1, overflowY: 'auto', p: 3 }}>
        {renderStepContent(activeStep)}
      </Box>
      
      {/* FIX: The navigation bar is now sticky to the bottom of the layout */}
      <Paper 
        elevation={4} 
        sx={{ p: 2, borderTop: "1px solid #e0e0e0", flexShrink: 0 }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Button 
            disabled={activeStep === 0} 
            onClick={handleBack} 
            variant="outlined"
            startIcon={<ArrowBackIcon />} // UX ENHANCEMENT: Added Icon
          >
            Back
          </Button>

          <Typography variant="body2" color="text.secondary">
            Step {activeStep + 1} of {steps.length}
          </Typography>

          <Box sx={{ display: "flex", gap: 1 }}>
            {activeStep === steps.length - 1 ? (
              <>
                <Button 
                  onClick={handleReset} 
                  variant="outlined" 
                  color="secondary"
                  startIcon={<CancelIcon />}
                >
                  Reset
                </Button>
                <Button
                  {...saveButtonProps}
                  variant="contained"
                  startIcon={isSubmitting ? <CircularProgress size={16} /> : <SaveIcon />}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating..." : "Create Tour"}
                </Button>
              </>
            ) : (
              <Button 
                variant="contained" 
                onClick={handleNext}
                endIcon={<ArrowForwardIcon />} // UX ENHANCEMENT: Added Icon
              >
                Next
              </Button>
            )}
          </Box>
        </Box>
      </Paper>
    </PageContainer>
  );
};