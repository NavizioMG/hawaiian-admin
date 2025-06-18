// /src/components/tours/SearchableCategorySelect.tsx
import React, { useState, useMemo } from 'react';
import {
  Autocomplete,
  TextField,
  Box,
  Typography,
  Chip,
  Paper,
} from '@mui/material';
import CategoryIcon from '@mui/icons-material/Category';
import { tourTheme } from './styles/tourTheme';

const categoryOptions = [
  "Airplane", "Attraction", "ATV", "Bike Rental", "Bike Tour", "Boat Rental", 
  "Boat Tour", "Brewery", "Bus Tour", "Canoe", "Catamaran", "Cave", "Climbing",
  "Cooking Class", "Cruise / Large Boat", "Cultural Performance", "Distillery",
  "Dolphin", "Eco Tour", "Environmental Attraction", "Escape Room", "Exotic Car",
  "Factory Tour", "Farm", "Fishing", "Food Tour", "General", "Ghost Tour",
  "Helicopter", "Hiking", "Horse", "Hunt", "Jeep", "Jet Boat", "Jet Ski",
  "Kayak", "Kiteboard", "Lodging", "Museum", "Paragliding / Hang Gliding",
  "Parasail", "Pedal Pub", "Photography Tour", "Plantation", "Pub Crawl",
  "Raft", "Rage Room", "Ropes Course", "Sailing", "Sauna", "Scooter",
  "Scuba", "Segway", "Service", "Shooting Range", "Shuttle", "Skydive",
  "Snorkel", "SUP", "Surf", "Theater", "Train", "Trolley", "Wakeboard",
  "Walking Tour", "Whale Watch", "Winery", "Workshop", "Zipline", "Zoo", "Other"
];

const categoryGroups: { [key: string]: string[] } = {
  "Water Activities": ["Boat Rental", "Boat Tour", "Canoe", "Catamaran", "Cruise / Large Boat", "Dolphin", "Fishing", "Jet Boat", "Jet Ski", "Kayak", "Parasail", "Raft", "Sailing", "Scuba", "Snorkel", "SUP", "Surf", "Wakeboard", "Whale Watch"],
  "Land Adventures": ["ATV", "Bike Rental", "Bike Tour", "Bus Tour", "Climbing", "Hiking", "Horse", "Hunt", "Jeep", "Ropes Course", "Segway", "Walking Tour", "Zipline"],
  "Air Activities": ["Airplane", "Helicopter", "Paragliding / Hang Gliding", "Skydive"],
  "Cultural & Food": ["Brewery", "Cooking Class", "Cultural Performance", "Distillery", "Food Tour", "Plantation", "Pub Crawl", "Winery"],
  "Entertainment": ["Attraction", "Cave", "Environmental Attraction", "Escape Room", "Ghost Tour", "Museum", "Photography Tour", "Rage Room", "Shooting Range", "Theater", "Zoo"],
  "Transportation": ["Exotic Car", "Scooter", "Shuttle", "Train", "Trolley"],
  "Wellness & Lifestyle": ["Sauna", "Workshop"],
  "Other": ["Eco Tour", "Factory Tour", "Farm", "General", "Kiteboard", "Lodging", "Pedal Pub", "Service", "Other"]
};

const getCategoryColor = (category: string): string => {
  return (tourTheme.colors.categories as Record<string, string>)[category] || tourTheme.colors.categories.Other;
};

interface SearchableCategorySelectProps {
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
  helperText?: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  fullWidth?: boolean;
  currentCategory?: string;
  sx?: object;
}

export const SearchableCategorySelect: React.FC<SearchableCategorySelectProps> = ({
  value,
  onChange,
  error = false,
  helperText,
  label = "Category",
  placeholder = "Search categories...",
  required = false,
  fullWidth = true,
  currentCategory,
  sx = {}
}) => {
  const [inputValue, setInputValue] = useState('');

  const allOptions = useMemo(() => {
    const options = [...categoryOptions];
    if (currentCategory && !options.includes(currentCategory) && currentCategory !== "nan") {
      options.unshift(currentCategory);
    }
    return options;
  }, [currentCategory]);

  const getCategoryGroup = (category: string): string => {
    for (const [groupName, categories] of Object.entries(categoryGroups)) {
      if (categories.includes(category)) return groupName;
    }
    return "Other";
  };

  const renderOption = (props: React.HTMLAttributes<HTMLLIElement>, option: string) => {
    const group = getCategoryGroup(option);
    const color = getCategoryColor(option);
    const isCurrentCustom = currentCategory && !categoryOptions.includes(currentCategory) && option === currentCategory;
    
    return (
      <Box component="li" {...props} key={option}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
          <CategoryIcon sx={{ color, fontSize: 18 }} />
          <Box sx={{ flex: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {option}
              {isCurrentCustom && <Chip label="Current" size="small" sx={{ ml: 1, height: 20, fontSize: '0.7rem' }} />}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.7rem' }}>
              {group}
            </Typography>
          </Box>
        </Box>
      </Box>
    );
  };

  return (
    <Autocomplete
      value={value || null}
      onChange={(_, newValue: string | null) => {
        onChange(newValue || '');
      }}
      inputValue={inputValue}
      onInputChange={(_, newInputValue: string) => {
        setInputValue(newInputValue);
      }}
      options={allOptions}
      renderOption={renderOption}
      renderInput={(params) => (
        <TextField
          {...params}
          label={required ? `${label} *` : label}
          placeholder={placeholder}
          error={error}
          helperText={helperText}
          fullWidth={fullWidth}
          variant="outlined"
          sx={sx}
        />
      )}
      PaperComponent={({ children, ...props }) => (
        <Paper 
          {...props} 
          sx={{
            backgroundColor: 'white',
            borderRadius: tourTheme.borderRadius.md,
            boxShadow: tourTheme.shadows.hover,
          }}
        >
          {children}
        </Paper>
      )}
      noOptionsText="No categories found"
      clearOnBlur
      selectOnFocus
      handleHomeEndKeys
    />
  );
};