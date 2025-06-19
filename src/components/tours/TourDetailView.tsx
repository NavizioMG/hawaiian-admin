import React from 'react';
import { useOne } from '@refinedev/core';
import { Box, Typography, Chip, Stack, Paper, Divider, IconButton, CircularProgress } from '@mui/material';
import { Tour } from '../../interfaces/tour';
import { tourTheme } from './styles/tourTheme';

// Import Icons for a better UX
import CloseIcon from '@mui/icons-material/Close';
import DescriptionIcon from '@mui/icons-material/Description';
import FlagIcon from '@mui/icons-material/Flag';
import StyleIcon from '@mui/icons-material/Style';
import CodeIcon from '@mui/icons-material/Code';
import StarIcon from '@mui/icons-material/Star';
import DiamondIcon from '@mui/icons-material/Diamond';
import PushPinIcon from '@mui/icons-material/PushPin';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface TourDetailViewProps {
  tourId: string;
  onClose: () => void;
}

// Reusable Section component for consistent styling
const DetailSection: React.FC<{ icon: React.ReactElement; title: string; children: React.ReactNode; }> = ({ icon, title, children }) => (
  <Box>
    <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
      {React.cloneElement(icon, { sx: { color: 'text.secondary' }})}
      <Typography variant="subtitle1" fontWeight={600} color="text.secondary">{title}</Typography>
    </Stack>
    {children}
  </Box>
);

const flagConfig = {
  is_featured: { icon: <StarIcon fontSize="small" />, color: tourTheme.colors.status.featured, label: 'Featured' },
  is_vip: { icon: <DiamondIcon fontSize="small" />, color: tourTheme.colors.status.vip, label: 'VIP' },
  is_pinned: { icon: <PushPinIcon fontSize="small" />, color: tourTheme.colors.status.pinned, label: 'Pinned' },
  show_on_homepage: { icon: <HomeIcon fontSize="small" />, color: tourTheme.colors.status.homepage, label: 'Homepage' },
  is_unforgettable: { icon: <FavoriteIcon fontSize="small" />, color: tourTheme.colors.status.unforgettable, label: 'Unforgettable' }
};

const islandConfig: { [key: string]: { emoji: string; color: string; name: string; } } = {
  "Oahu": { emoji: "🏝️", color: "#2196f3", name: "Oahu" },
  "Maui": { emoji: "🌺", color: "#ff9800", name: "Maui" },
  "Big Island": { emoji: "🌋", color: "#f44336", name: "Big Island" },
  "Kauai": { emoji: "🌿", color: "#4caf50", name: "Kauai" }
};

export const TourDetailView: React.FC<TourDetailViewProps> = ({ tourId, onClose }) => {
  // This hook fetches the full tour data using the provided ID
  const { data, isLoading, isError } = useOne<Tour>({
    resource: 'tours',
    id: tourId,
  });

  if (isLoading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
  }

  if (isError || !data?.data) {
    return <Typography sx={{ p: 2 }}>Could not load tour details.</Typography>;
  }

  const tour = data.data;
  const activeFlags = Object.entries(flagConfig).filter(([key]) => tour[key as keyof Tour] === true);
  const locationConfig = islandConfig[tour.location] || { emoji: "🏝️", color: "#607d8b", name: tour.location };

  return (
    <Paper sx={{ m: { xs: 1, md: 2 }, border: `1px solid ${tourTheme.colors.neutral.border}`, overflow: 'hidden' }} elevation={0}>
      <Box sx={{ position: 'relative' }}>
         <IconButton onClick={onClose} size="small" sx={{ position: 'absolute', top: 8, right: 8, backgroundColor: 'rgba(0,0,0,0.4)', color: 'white', '&:hover': { backgroundColor: 'rgba(0,0,0,0.6)'} }}>
            <CloseIcon fontSize="small" />
         </IconButton>
         <Box 
            component="img"
            src={tour.image}
            alt={tour.title}
            sx={{ width: '100%', height: { xs: 180, md: 240 }, objectFit: 'cover' }}
         />
      </Box>

      <Stack spacing={3} sx={{ p: { xs: 2, md: 3 } }}>
        <Box>
            <Typography variant="h5" fontWeight={700}>{tour.title}</Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mt: 1 }}>
              <Chip label={`${locationConfig.emoji} ${locationConfig.name}`} />
              {tour.category && <Chip label={tour.category} variant="outlined" />}
            </Stack>
        </Box>

        <Divider />

        {tour.description && (
          <DetailSection icon={<DescriptionIcon />} title="Description">
            <Typography variant="body2" sx={{ lineHeight: 1.7, color: 'text.secondary' }}>
              {tour.description}
            </Typography>
          </DetailSection>
        )}

        {activeFlags.length > 0 && (
          <DetailSection icon={<FlagIcon />} title="Status Flags">
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {activeFlags.map(([key, config]) => (
                <Chip key={key} icon={config.icon} label={config.label} sx={{ backgroundColor: config.color, color: 'white', '& .MuiChip-icon': { color: 'white' } }} />
              ))}
            </Stack>
          </DetailSection>
        )}

        {tour.tags && tour.tags.length > 0 && (
           <DetailSection icon={<StyleIcon />} title="Tags">
             <Stack direction="row" spacing={0.5} flexWrap="wrap">
                {tour.tags.map((tag, index) => <Chip key={index} label={tag} size="small" variant="outlined" />)}
             </Stack>
           </DetailSection>
        )}
        
        <DetailSection icon={<CodeIcon />} title="Technical Details">
            <Stack spacing={0.5}>
                <Typography variant="caption" color="text.secondary">ID: {tour.id}</Typography>
                <Typography variant="caption" color="text.secondary">Item ID: {tour.item_id}</Typography>
                <Typography variant="caption" color="text.secondary">Slug: {tour.slug}</Typography>
            </Stack>
        </DetailSection>
      </Stack>
    </Paper>
  );
};