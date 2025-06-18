// /src/components/tours/TourEdit.tsx
import { useForm } from "@refinedev/react-hook-form";
import { Edit, DeleteButton } from "@refinedev/mui";
import { useNotification } from "@refinedev/core";
import { useWatch } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom"; // Import useNavigate
import {
  Box,
  Typography,
  Grid,
  Chip,
  Paper,
  Stack,
  Alert,
  Container,
  Button,
} from "@mui/material";
import { useEffect, useState, useRef } from "react";

// Import our smaller form components
import { TourFormBasicInfo } from "./form/TourFormBasicInfo";
import { TourFormLocationCategory } from "./form/TourFormLocationCategory";
import { TourFormMedia } from "./form/TourFormMedia";
import { TourFormPromotionalFlags } from "./form/TourFormPromotionalFlags";

import { tourTheme } from "./styles/tourTheme";

export const TourEdit = () => {
  const { open } = useNotification();
  const initialized = useRef(false);
  const { id } = useParams();
  const navigate = useNavigate(); // Hook for navigation

  const {
    saveButtonProps,
    register,
    control,
    formState: { errors },
    setValue,
    watch,
    reset,
    refineCore: { queryResult },
  } = useForm({
    refineCoreProps: {
      resource: "tours",
      action: "edit",
      id,
      onMutationSuccess: (data) => {
        open?.({
          type: "success",
          message: "🎉 Tour Updated Successfully!",
          description: `"${data?.data?.title || 'Your tour'}" has been updated.`,
          undoableTimeout: 4000,
        });
      },
      onMutationError: (error) => {
        open?.({
          type: "error",
          message: "⚠️ Update Failed",
          description: `Error: ${error?.message || 'Something went wrong.'}`,
          undoableTimeout: 6000,
        });
      },
    },
  });

  useEffect(() => {
    const tourData = queryResult?.data?.data;
    if (tourData) {
      const formValues = {
        ...tourData,
        tags: tourData.tags || [],
      };
      reset(formValues);
    }
  }, [queryResult?.data?.data, reset]);


  const watchedValues = watch();
  const title = useWatch({ control, name: "title" });
  const [categoryValue, setCategoryValue] = useState("");

  useEffect(() => {
    if (watchedValues.category && !initialized.current) {
      setCategoryValue(watchedValues.category);
      initialized.current = true;
    }
  }, [watchedValues.category]);

  useEffect(() => {
    if (title) {
      const currentSlug = watch("slug");
      const expectedSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
      if (currentSlug !== expectedSlug) {
        setValue("slug", expectedSlug);
      }
    }
  }, [title, setValue, watch]);

  return (
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        backgroundColor: '#fafafa'
    }}>
      <Paper elevation={0} sx={{ background: tourTheme.colors.primary.gradient, color: "white", p: 3, flexShrink: 0 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, display: "flex", alignItems: "center", gap: 2 }}>
          ✏️ Edit Tour
          {watchedValues?.title && (
            <Chip label={watchedValues.title} sx={{ backgroundColor: "rgba(255,255,255,0.2)", color: "white", fontWeight: 600 }} />
          )}
        </Typography>
        <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
          Update tour details, settings, and promotional flags
        </Typography>
      </Paper>

      <Container
        maxWidth="xl"
        sx={{
            py: 4,
            flex: '1 1 auto',
            overflowY: 'auto',
        }}
      >
        <Edit
          headerButtons={
            <Stack direction="row" spacing={2}>
              <DeleteButton
                // THE FIX: Explicitly pass the record's ID to the button.
                recordItemId={id}
                variant="outlined"
                // For a better UX, we can also tell it where to go after success.
                onSuccess={() => {
                  navigate("/tours");
                }}
                sx={(theme) => ({
                  color: theme.palette.error.main,
                  borderColor: theme.palette.error.main,
                  '&:hover': {
                    backgroundColor: `${theme.palette.error.main}1A`,
                    borderColor: theme.palette.error.main,
                  }
                })}
              />
              <Button
                {...saveButtonProps}
                variant="contained"
                sx={{
                  background: tourTheme.colors.primary.gradient
                }}
              >
                Save Changes
              </Button>
            </Stack>
          }
          footerButtons={<></>}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Stack spacing={3}>
                <TourFormBasicInfo control={control} errors={errors} register={register} />
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
            </Grid>

            <Grid item xs={12} md={4}>
              <Stack spacing={3}>
                <TourFormPromotionalFlags register={register} watchedValues={watchedValues} />
                <Alert severity="info" sx={{ borderRadius: 2 }}>
                  <Typography variant="body2">
                    <strong>💡 Pro Tip:</strong> Featured tours appear first in search results. VIP tours get special badges.
                  </Typography>
                </Alert>
              </Stack>
            </Grid>
          </Grid>
        </Edit>
      </Container>
    </div>
  );
};