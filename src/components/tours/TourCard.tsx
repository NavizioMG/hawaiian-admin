// /src/components/tours/TourCard.tsx
import { Box, Typography, Card, CardMedia, CardContent, CardActions, Chip, Stack } from "@mui/material";
import { EditButton } from "@refinedev/mui";
import { Tour } from "../../interfaces/tour";

// Import Icons
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CategoryIcon from '@mui/icons-material/Category';
import StarIcon from '@mui/icons-material/Star';

interface TourCardProps {
  tour: Tour;
}

export const TourCard: React.FC<TourCardProps> = ({ tour }) => {
  return (
    <Card sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, mb: 2, boxShadow: 3 }}>
      <CardMedia
        component="img"
        sx={{ width: { xs: '100%', sm: 180 }, height: { xs: 140, sm: 'auto' }, objectFit: 'cover' }}
        image={tour.image}
        alt={tour.title}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          {tour.is_featured && (
             <Chip
                icon={<StarIcon />}
                label="Featured"
                color="warning"
                size="small"
                sx={{ mb: 1 }}
              />
          )}
          <Typography component="div" variant="h6" sx={{ mb: 1 }}>
            {tour.title}
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap">
            <Chip icon={<LocationOnIcon />} label={tour.location} size="small" />
            <Chip icon={<CategoryIcon />} label={tour.category} size="small" variant="outlined" />
          </Stack>
        </CardContent>
        <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
          <EditButton recordItemId={tour.id}>Edit Tour</EditButton>
        </CardActions>
      </Box>
    </Card>
  );
};