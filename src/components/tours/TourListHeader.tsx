// /src/components/tours/TourListHeader.tsx
import { useMemo } from "react";
import { useNavigation } from "@refinedev/core";
import { Box, Typography, Button, InputAdornment, Chip, Stack, IconButton, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import ClearAllIcon from '@mui/icons-material/ClearAll';
import ClearIcon from "@mui/icons-material/Clear"; 

// Import Icons for our new flag buttons
import StarIcon from "@mui/icons-material/Star";
import DiamondIcon from "@mui/icons-material/Diamond";
import HomeIcon from "@mui/icons-material/Home";
import PushPinIcon from "@mui/icons-material/PushPin";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CancelIcon from '@mui/icons-material/Cancel';

import { GradientHeader, ActionButton, SearchInput } from "./styles/styledComponents";
import { tourTheme } from "./styles/tourTheme";
import { SearchableCategorySelect } from "./SearchableCategorySelect";

// Config now includes icons for the new filter buttons
const flagConfig = {
  is_featured: { label: "Featured", icon: <StarIcon fontSize="small" />, color: tourTheme.colors.status.featured },
  is_vip: { label: "VIP", icon: <DiamondIcon fontSize="small" />, color: tourTheme.colors.status.vip },
  is_pinned: { label: "Pinned", icon: <PushPinIcon fontSize="small" />, color: tourTheme.colors.status.pinned },
  show_on_homepage: { label: "Homepage", icon: <HomeIcon fontSize="small" />, color: tourTheme.colors.status.homepage },
  is_unforgettable: { label: "Unforgettable", icon: <FavoriteIcon fontSize="small" />, color: tourTheme.colors.status.unforgettable }
};

export const TourListHeader = ({
  search, setSearch,
  filtersState, toggleFlagFilter, setFiltersState,
  activeFilterCount,
  clearAllFilters,
  applyFilters,
  tourData
}) => {
  const { create } = useNavigation();

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    applyFilters();
  };
  
  const flagCounts = useMemo(() => {
    if (!tourData) return {};
    const counts = {};
    Object.keys(flagConfig).forEach(key => {
        counts[key] = tourData.filter(tour => tour[key]).length;
    });
    return counts;
  }, [tourData]);

  return (
    <GradientHeader elevation={0}>
      <Stack spacing={2} sx={{ p: tourTheme.spacing.md }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>🏝️ Tour Manager</Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>Search, filter, and manage your entire tour catalog.</Typography>
          </Box>
          <ActionButton variant="contained" startIcon={<AddIcon />} onClick={() => create("tours")} sx={{ backgroundColor: "white", color: tourTheme.colors.primary.main, "&:hover": { backgroundColor: "#f0f0f0" }, flexShrink: 0 }}>
            Create Tour
          </ActionButton>
        </Stack>
        
        <Box component="form" onSubmit={handleSearchSubmit}>
          <Stack direction="row" spacing={1}>
            <SearchInput
              placeholder="Search by title, description, or tags..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              fullWidth
              InputProps={{
                startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
                endAdornment: search && (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setSearch('')} size="small">
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <Button type="submit" variant="contained" sx={{ backgroundColor: "rgba(255,255,255,0.2)", "&:hover": { backgroundColor: "rgba(255,255,255,0.3)" }, flexShrink: 0 }}>
              Apply
            </Button>
          </Stack>
        </Box>

        <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
            <Typography variant="overline" sx={{ color: 'rgba(255,255,255,0.7)', mr: 1, alignSelf: 'center' }}>Filters:</Typography>
            
            {Object.entries(flagConfig).map(([key, config]) => {
                const state = filtersState[key];
                const count = flagCounts[key] || 0;
                
                const getChipStyle = () => {
                    if (state === true) return { backgroundColor: config.color, color: 'white', border: '1px solid transparent' };
                    if (state === false) return { backgroundColor: '#ffebee', color: '#c62828', border: '1px solid #ef9a9a' };
                    return { backgroundColor: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' };
                };
                
                return(
                    <Chip 
                        key={key}
                        icon={state === false ? <CancelIcon style={{ color: '#c62828' }} /> : config.icon}
                        label={`${config.label} (${count})`}
                        onClick={() => toggleFlagFilter(key)}
                        sx={{ ...getChipStyle(), transition: 'all 0.2s ease', '&:hover': { opacity: 0.8 }, cursor: 'pointer' }}
                    />
                );
            })}

            <Box sx={{ minWidth: 200 }}>
                <SearchableCategorySelect
                    value={filtersState.category}
                    onChange={(value) => setFiltersState((p) => ({ ...p, category: value }))}
                    label="Category"
                    sx={{ 
                        "& .MuiOutlinedInput-root": { backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 2 },
                        "& .MuiInputLabel-root": { color: 'rgba(255,255,255,0.7)' },
                        "& .MuiOutlinedInput-input": { color: 'white' },
                        "& .MuiSvgIcon-root": { color: 'white' },
                        "& .MuiOutlinedInput-notchedOutline": { borderColor: 'rgba(255,255,255,0.3) !important' }
                    }}
                />
            </Box>

            {/* FIX: Added the Island/Location filter dropdown back in */}
            <Box sx={{ minWidth: 150 }}>
              <FormControl size="small" fullWidth>
                <InputLabel sx={{color: 'rgba(255,255,255,0.7)'}}>Location</InputLabel>
                <Select
                  value={filtersState.location}
                  onChange={(e) => setFiltersState((p) => ({ ...p, location: e.target.value }))}
                  label="Location"
                  sx={{ 
                      color: 'white', 
                      '.MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.3)' },
                      '.MuiSvgIcon-root': { color: 'white' },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.5)'},
                      '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.5)'},
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      borderRadius: 2
                  }}
                >
                  <MenuItem value="">All Islands</MenuItem>
                  <MenuItem value="Oahu">Oahu</MenuItem>
                  <MenuItem value="Maui">Maui</MenuItem>
                  <MenuItem value="Big Island">Big Island</MenuItem>
                  <MenuItem value="Kauai">Kauai</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {activeFilterCount > 0 && (
                 <Button onClick={clearAllFilters} startIcon={<ClearAllIcon />} sx={{ color: 'rgba(255,255,255,0.8)' }}>
                    Clear Filters ({activeFilterCount})
                </Button>
            )}
        </Stack>
      </Stack>
    </GradientHeader>
  );
};