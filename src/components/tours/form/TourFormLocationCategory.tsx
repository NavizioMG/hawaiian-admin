// /src/components/tours/form/TourFormLocationCategory.tsx
import {
    CardContent,
    CardHeader,
    Divider,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
  } from "@mui/material";
  import LocationOnIcon from "@mui/icons-material/LocationOn";
  import { StyledCard } from "../styles/styledComponents";
  import { tourTheme } from "../styles/tourTheme";
  import { SearchableCategorySelect } from "../SearchableCategorySelect";
  
  interface TourFormLocationCategoryProps {
    register: any;
    watchedValues: any;
    errors: any;
    categoryValue: string;
    setCategoryValue: (value: string) => void;
    setValue: any;
  }
  
  export const TourFormLocationCategory = ({
    register,
    watchedValues,
    errors,
    categoryValue,
    setCategoryValue,
    setValue,
  }: TourFormLocationCategoryProps) => {
    return (
      <StyledCard>
        <CardHeader
          avatar={<LocationOnIcon sx={{ color: tourTheme.colors.secondary.tropical }} />}
          title="Location & Category"
          subheader="Where and what type of tour"
        />
        <Divider />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Location</InputLabel>
                <Select {...register("location")} value={watchedValues.location || ""} label="Location">
                  <MenuItem value="Oahu">🏝️ Oahu</MenuItem>
                  <MenuItem value="Maui">🌺 Maui</MenuItem>
                  <MenuItem value="Big Island">🌋 Big Island</MenuItem>
                  <MenuItem value="Kauai">🌿 Kauai</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <SearchableCategorySelect
                value={categoryValue || ""}
                onChange={(value) => {
                  setCategoryValue(value);
                  setValue("category", value);
                }}
                error={!!errors.category}
                helperText={errors?.category?.message as string}
                label="Category"
                placeholder="Search 69+ categories..."
                currentCategory={watchedValues.category}
              />
              {(categoryValue === "Other" || watchedValues.category === "Other") && (
                <TextField
                  {...register("custom_category")}
                  fullWidth
                  label="Custom Category"
                  placeholder="e.g., Cultural Tour"
                  variant="outlined"
                  sx={{ mt: 2 }}
                />
              )}
            </Grid>
          </Grid>
        </CardContent>
      </StyledCard>
    );
  };