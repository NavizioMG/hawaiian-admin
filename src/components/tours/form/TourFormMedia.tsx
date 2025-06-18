// /src/components/tours/form/TourFormMedia.tsx
import {
    CardContent,
    CardHeader,
    Divider,
    Paper,
    Stack,
    TextField,
    Typography,
  } from "@mui/material";
  import ImageIcon from "@mui/icons-material/Image";
  import LinkIcon from "@mui/icons-material/Link";
  import { StyledCard } from "../styles/styledComponents";
  import { tourTheme } from "../styles/tourTheme";
  import { useWatch } from "react-hook-form";
  
  interface TourFormMediaProps {
    register: any;
    control: any;
  }
  
  export const TourFormMedia = ({ register, control }: TourFormMediaProps) => {
    const imageUrl = useWatch({ control, name: "image" });
  
    return (
      <StyledCard>
        <CardHeader
          avatar={<ImageIcon sx={{ color: tourTheme.colors.secondary.sunset }} />}
          title="Media & Links"
          subheader="Images and external URLs"
        />
        <Divider />
        <CardContent>
          <Stack spacing={3}>
            <TextField
              {...register("image")}
              fullWidth
              label="Image URL"
              placeholder="https://example.com/tour-image.jpg"
            />
            {imageUrl && (
              <Paper elevation={2} sx={{ p: 2, borderRadius: 2, backgroundColor: "#f8f9fa" }}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>Image Preview:</Typography>
                <img
                  src={imageUrl}
                  alt="Tour preview"
                  style={{
                    width: "100%",
                    maxWidth: "300px",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
              </Paper>
            )}
            <TextField
              {...register("affiliate_url")}
              fullWidth
              label="FareHarbor URL"
              placeholder="https://fareharbor.com/..."
              InputProps={{
                startAdornment: <LinkIcon sx={{ mr: 1, color: "text.secondary" }} />,
              }}
            />
          </Stack>
        </CardContent>
      </StyledCard>
    );
  };