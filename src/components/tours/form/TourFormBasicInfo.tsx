// /src/components/tours/form/TourFormBasicInfo.tsx
import { Controller } from "react-hook-form";
import {
  Autocomplete,
  Box,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  Stack,
  TextField,
} from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import TagIcon from "@mui/icons-material/Tag";
import { StyledCard } from "../styles/styledComponents";
import { tourTheme } from "../styles/tourTheme";

// Define the props the component will accept
interface TourFormBasicInfoProps {
  control: any; // From useForm, needed for Controller
  errors: any; // From useForm, for displaying errors
  register: any; // From useForm, for simple fields
}

export const TourFormBasicInfo = ({ control, errors, register }: TourFormBasicInfoProps) => {
  return (
    <StyledCard>
      <CardHeader
        avatar={<DescriptionIcon sx={{ color: tourTheme.colors.primary.main }} />}
        title="Basic Information"
        subheader="Tour title, description, and identification"
      />
      <Divider />
      <CardContent>
        <Stack spacing={3}>
          <TextField
            {...register("title", { required: "Tour title is required" })}
            error={!!errors.title}
            helperText={errors?.title?.message as string}
            fullWidth
            label="Tour Title"
            placeholder="Enter an engaging tour title..."
            // FIX: Add InputLabelProps to ensure the label always floats correctly
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            {...register("item_id")}
            fullWidth
            label="Item ID"
            placeholder="Unique identifier..."
            // FIX: Add InputLabelProps to ensure the label always floats correctly
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            {...register("slug")}
            fullWidth
            label="URL Slug"
            placeholder="url-friendly-version"
            helperText="Auto-generated from title, but you can customize it"
            // FIX: Add InputLabelProps to ensure the label always floats correctly
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            {...register("description")}
            fullWidth
            label="Description"
            placeholder="Describe the amazing experience..."
            multiline
            rows={4}
            // FIX: Add InputLabelProps to ensure the label always floats correctly
            InputLabelProps={{ shrink: true }}
          />

          <Controller
            name="tags"
            control={control}
            render={({ field }) => (
              <Autocomplete
                multiple
                freeSolo
                options={[]}
                {...field}
                onChange={(_, value) => field.onChange(value)}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                  ))
                }
                renderInput={(params) => (
                  <TextField {...params} label="Tags" placeholder="Add tags and press Enter" />
                )}
              />
            )}
          />
        </Stack>
      </CardContent>
    </StyledCard>
  );
};