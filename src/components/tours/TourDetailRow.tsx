// /src/components/tours/TourDetailRow.tsx
import React from 'react';
import { Box, Typography, Chip, Stack, useTheme, useMediaQuery, Divider } from '@mui/material';
import { Tour } from '../../interfaces/tour';
import { tourTheme } from './styles/tourTheme';
import StarIcon from '@mui/icons-material/Star';
import DiamondIcon from '@mui/icons-material/Diamond';
import PushPinIcon from '@mui/icons-material/PushPin';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface TourDetailRowProps {
  tour: Tour;
}

// ... (flagConfig and islandConfig remain the same)
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

export const TourDetailRow: React.FC<TourDetailRowProps> = ({ tour }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const activeFlags = Object.entries(flagConfig).filter(([key]) => 
    tour[key as keyof Tour] === true
  );

  const locationConfig = islandConfig[tour.location] || { emoji: "🏝️", color: "#607d8b", name: tour.location };

  const DetailSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <>
      <Divider />
      <Box sx={{ pt: 1.5 }}>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {title}
        </Typography>
        {children}
      </Box>
    </>
  );

  if (isMobile) {
    return (
      <Box sx={{ p: 2, backgroundColor: '#fafafa', borderTop: '1px solid #e0e0e0' }}>
        <Stack spacing={1.5}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Box
              component="img"
              src={tour.image}
              alt={tour.title}
              sx={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 2, flexShrink: 0 }}
            />
            <Stack spacing={0.5}>
              <Typography variant="subtitle1" fontWeight={600}>{tour.title}</Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                <Chip label={`${locationConfig.emoji} ${locationConfig.name}`} size="small" sx={{ backgroundColor: `${locationConfig.color}15`, color: locationConfig.color }} />
                {tour.category && <Chip label={tour.category} size="small" variant="outlined" />}
              </Stack>
            </Stack>
          </Stack>

          {tour.description && (
            <DetailSection title="Description">
              <Typography variant="body2">{tour.description}</Typography>
            </DetailSection>
          )}

          {activeFlags.length > 0 && (
            <DetailSection title="Status">
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {activeFlags.map(([key, config]) => (
                  <Chip key={key} icon={config.icon} label={config.label} size="small" sx={{ backgroundColor: config.color, color: 'white', '& .MuiChip-icon': { color: 'white' } }} />
                ))}
              </Stack>
            </DetailSection>
          )}

          {tour.tags && tour.tags.length > 0 && (
            <DetailSection title="Tags">
              <Stack direction="row" spacing={0.5} flexWrap="wrap">
                {tour.tags.map((tag, index) => (
                  <Chip key={index} label={tag} size="small" variant="outlined" sx={{ fontSize: '0.75rem', height: 24 }} />
                ))}
              </Stack>
            </DetailSection>
          )}

          <DetailSection title="Technical Details">
            <Stack direction="row" spacing={2} flexWrap="wrap">
              <Typography variant="caption" color="text.secondary">ID: {tour.item_id}</Typography>
              <Typography variant="caption" color="text.secondary">Slug: {tour.slug}</Typography>
            </Stack>
          </DetailSection>
        </Stack>
      </Box>
    );
  }

  // Desktop View
  return (
    <Box sx={{ p: 2, backgroundColor: '#fafafa', borderTop: '1px solid #e0e0e0' }}>
      <Stack spacing={2}>
        {tour.description && (
          <Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>Description</Typography>
            <Typography variant="body2" sx={{ lineHeight: 1.6 }}>{tour.description}</Typography>
          </Box>
        )}
        {activeFlags.length > 0 && (
          <Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>Active Flags</Typography>
            <Stack direction="row" spacing={1}>
              {activeFlags.map(([key, config]) => (
                <Chip key={key} icon={config.icon} label={config.label} size="small" sx={{ backgroundColor: config.color, color: 'white', '& .MuiChip-icon': { color: 'white' } }} />
              ))}
            </Stack>
          </Box>
        )}
        {tour.tags && tour.tags.length > 0 && (
          <Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>Tags</Typography>
            <Stack direction="row" spacing={0.5} flexWrap="wrap">
              {tour.tags.map((tag, index) => (
                <Chip key={index} label={tag} size="small" variant="outlined" sx={{ fontSize: '0.75rem' }} />
              ))}
            </Stack>
          </Box>
        )}
      </Stack>
    </Box>
  );
};