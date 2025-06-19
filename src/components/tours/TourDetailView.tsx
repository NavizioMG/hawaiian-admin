// /src/components/tours/TourDetailView.tsx
import React from 'react';
import { useOne } from '@refinedev/core';
import { Box, Typography, Chip, Stack, Paper, Divider, IconButton, CircularProgress, Grid } from '@mui/material';
import { Tour } from '../../interfaces/tour';
import { tourTheme } from './styles/tourTheme';

// Import Icons
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

const DetailSection: React.FC<{ icon?: React.ReactElement; title: string; children: React.ReactNode; }> = ({ icon, title, children }) => (
  <Box>
    <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1.5 }}>
      {icon && React.cloneElement(icon, { sx: { color: 'text.secondary' }})}
      <Typography variant="h6" fontWeight={600} color="text.primary">{title}</Typography>
    </Stack>
    {children}
  </Box>
);

const flagConfig = {
  is_featured: { icon: <StarIcon />, color: tourTheme.colors.status.featured, label: 'Featured' },
  is_vip: { icon: <DiamondIcon />, color: tourTheme.colors.status.vip, label: 'VIP' },
  is_pinned: { icon: <PushPinIcon />, color: tourTheme.colors.status.pinned, label: 'Pinned' },
  show_on_homepage: { icon: <HomeIcon />, color: tourTheme.colors.status.homepage, label: 'Homepage' },
  is_unforgettable: { icon: <FavoriteIcon />, color: tourTheme.colors.status.unforgettable, label: 'Unforgettable' }
};

const islandConfig: { [key: string]: { emoji: string; color: string; name: string; } } = {
  "Oahu": { emoji: "🏝️", color: "#2196f3", name: "Oahu" },
  "Maui": { emoji: "🌺", color: "#ff9800", name: "Maui" },
  "Big Island": { emoji: "🌋", color: "#f44336", name: "Big Island" },
  "Kauai": { emoji: "🌿", color: "#4caf50", name: "Kauai" }
};

export const TourDetailView: React.FC<TourDetailViewProps> = ({ tourId, onClose }) => {
  const { data, isLoading, isError } = useOne<Tour>({
    resource: 'tours',
    id: tourId,
    meta: {
      select: '*',
    },
  });

  if (isLoading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
  }

  if (isError || !data?.data) {
    return <Typography sx={{ p: 2, textAlign: 'center' }}>Could not load tour details.</Typography>;
  }

  const tour = data.data;
  const activeFlags = Object.entries(flagConfig).filter(([key]) => tour[key as keyof Tour] === true);
  const locationConfig = islandConfig[tour.location] || { emoji: "🏝️", color: "#607d8b", name: tour.location };

  return (
    <Box sx={{ p: { xs: 1, sm: 2 } }}>
      <Paper sx={{ overflow: 'hidden', borderRadius: 4 }} elevation={2}>
        <Box sx={{ position: 'relative' }}>
           <IconButton onClick={onClose} size="small" sx={{ position: 'absolute', top: 12, right: 12, zIndex: 2, backgroundColor: 'rgba(0,0,0,0.5)', color: 'white', '&:hover': { backgroundColor: 'rgba(0,0,0,0.7)'} }}>
              <CloseIcon />
           </IconButton>
           <Box 
              component="img"
              src={tour.image}
              alt={tour.title}
              sx={{ width: '100%', height: { xs: 200, md: 280 }, objectFit: 'cover' }}
           />
           <Box sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              p: { xs: 2, md: 3 },
              background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)',
              color: 'white'
            }}>
             <Typography variant="h4" fontWeight={800}>{tour.title}</Typography>
           </Box>
        </Box>

        <Stack spacing={4} sx={{ p: { xs: 2, md: 3 } }}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} flexWrap="wrap">
            <Chip label={`${locationConfig.emoji} ${locationConfig.name}`} size="medium" />
            {tour.category && <Chip label={tour.category} size="medium" variant="outlined" />}
          </Stack>
          
          <Divider />

          <Grid container spacing={4}>
            {activeFlags.length > 0 && (
              <Grid item xs={12} md={6}>
                <DetailSection icon={<FlagIcon />} title="Status Flags">
                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    {activeFlags.map(([key, config]) => (
                      <Chip key={key} icon={config.icon} label={config.label} sx={{ backgroundColor: config.color, color: 'white', '& .MuiChip-icon': { color: 'white' } }} />
                    ))}
                  </Stack>
                </DetailSection>
              </Grid>
            )}

            {tour.tags && tour.tags.length > 0 && (
               <Grid item xs={12} md={6}>
                 <DetailSection icon={<StyleIcon />} title="Tags">
                   <Stack direction="row" spacing={1} flexWrap="wrap">
                      {tour.tags.map((tag, index) => <Chip key={index} label={tag} variant="outlined" />)}
                   </Stack>
                 </DetailSection>
               </Grid>
            )}
          </Grid>

          {tour.description && (
            <DetailSection icon={<DescriptionIcon />} title="Tour Description">
              <Typography variant="body1" sx={{ lineHeight: 1.7, color: 'text.secondary', whiteSpace: 'pre-wrap' }}>
                {tour.description}
              </Typography>
            </DetailSection>
          )}
          
          <DetailSection icon={<CodeIcon />} title="Technical Details">
              <Stack spacing={1} sx={{ p: 2, backgroundColor: '#f5f5f5', borderRadius: 2 }}>
                  <Typography variant="caption" fontFamily="monospace">ID: {tour.id}</Typography>
                  <Typography variant="caption" fontFamily="monospace">Item ID: {tour.item_id}</Typography>
                  <Typography variant="caption" fontFamily="monospace">Slug: {tour.slug}</Typography>
                  <Typography variant="caption" fontFamily="monospace">Description (Raw): {tour.description || '--- NOT FOUND ---'}</Typography>
              </Stack>
          </DetailSection>
        </Stack>
      </Paper>
    </Box>
  );
};