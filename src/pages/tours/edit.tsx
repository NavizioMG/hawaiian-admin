import { useForm } from "@refinedev/react-hook-form";
import { useWatch } from "react-hook-form";
import { Edit } from "@refinedev/mui";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Stack,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Autocomplete,
  Card,
  CardHeader,
  CardContent,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

const categoryOptions = [
  "Hiking",
  "Snorkel",
  "Kayak",
  "Sunset Cruise",
  "Wildlife",
  "Scenic",
  "Adventure",
  "Other",
];

const tagOptions = [
  "Eco",
  "Family",
  "Couples",
  "Educational",
  "Luxury",
  "Cultural",
];

export const TourEdit = () => {
  const {
    saveButtonProps,
    register,
    setValue,
    control,
    getValues,
    formState: { errors },
  } = useForm();

  const title = useWatch({ control, name: "title" });
  const selectedCategory = useWatch({ control, name: "category" });

  const [categoryValue, setCategoryValue] = useState(getValues("category") || "");
  const [tagInput, setTagInput] = useState<string[]>([]);

  useEffect(() => {
    if (title) {
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      setValue("slug", slug);
    }
  }, [title, setValue]);

  useEffect(() => {
    const tagsValue = getValues("tags");
    if (typeof tagsValue === "string") {
      setTagInput(tagsValue.split(",").map((tag: string) => tag.trim()));
    } else if (Array.isArray(tagsValue)) {
      setTagInput(tagsValue);
    } else {
      setTagInput([]);
    }
  }, [getValues]);

  useEffect(() => {
    setValue("tags", tagInput.join(", "));
  }, [tagInput, setValue]);

  useEffect(() => {
    setValue("category", categoryValue);
  }, [categoryValue, setValue]);

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Card sx={{ maxWidth: 900, mx: "auto", mt: 3, p: 3 }}>
        <CardHeader
          title={<Typography variant="h5">✏️ Edit Tour</Typography>}
          subheader="Update tour details, category, tags, and display settings."
        />
        <CardContent>
          <Stack spacing={3}>
            <TextField
              {...register("title", { required: true })}
              fullWidth
              variant="outlined"
              label="Title"
              error={!!errors.title}
              helperText={errors.title && "Title is required"}
            />

            <TextField {...register("item_id")} fullWidth variant="outlined" label="Item ID" />

            <TextField {...register("slug")} fullWidth variant="outlined" label="Web Slug" />

            <FormControl fullWidth>
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                value={categoryValue}
                onChange={(e) => setCategoryValue(e.target.value)}
                label="Category"
              >
                {categoryOptions.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {selectedCategory === "Other" && (
              <TextField
                {...register("category_custom")}
                fullWidth
                variant="outlined"
                label="Custom Category"
              />
            )}

            <TextField
              {...register("location")}
              fullWidth
              variant="outlined"
              label="Location"
            />

            <TextField
              {...register("affiliate_url")}
              fullWidth
              variant="outlined"
              label="Affiliate URL"
            />

            <TextField
              {...register("image")}
              fullWidth
              variant="outlined"
              label="Image URL"
            />

            <Autocomplete
              multiple
              freeSolo
              value={tagInput}
              options={tagOptions}
              onChange={(_, value) => setTagInput(value)}
              renderInput={(params) => (
                <TextField {...params} label="Tags (comma separated)" variant="outlined" />
              )}
            />

            <TextField
              {...register("description")}
              fullWidth
              variant="outlined"
              label="Description"
              multiline
              rows={4}
            />

            <Stack direction="row" spacing={2} flexWrap="wrap">
              <FormControlLabel
                control={<Checkbox {...register("is_featured")} />}
                label="Featured"
              />
              <FormControlLabel
                control={<Checkbox {...register("is_unforgettable")} />}
                label="Unforgettable"
              />
              <FormControlLabel
                control={<Checkbox {...register("show_on_homepage")} />}
                label="Show on Homepage"
              />
              <FormControlLabel
                control={<Checkbox {...register("is_vip")} />}
                label="VIP"
              />
              <FormControlLabel
                control={<Checkbox {...register("is_pinned")} />}
                label="Pinned"
              />
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Edit>
  );
};
