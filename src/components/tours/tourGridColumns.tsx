// /src/components/tours/tourGridColumns.tsx
import { GridColDef } from "@mui/x-data-grid";
import { Box, Typography, Tooltip, Chip, IconButton, Stack } from "@mui/material";
import { EditButton } from "@refinedev/mui";
import { SvgIconComponent } from "@mui/icons-material";

// Import icons
import VisibilityIcon from '@mui/icons-material/Visibility';
import StarIcon from "@mui/icons-material/Star";
import DiamondIcon from "@mui/icons-material/Diamond";
import PushPinIcon from "@mui/icons-material/PushPin";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LaunchIcon from "@mui/icons-material/Launch";

import { tourTheme } from "./styles/tourTheme";
import { Tour } from "../../interfaces/tour";

// ... (flagConfig and islandConfig remain the same)
interface FlagConfig {
  icon: SvgIconComponent;
  color: string;
  label: string;
}

const flagConfig: { [key: string]: FlagConfig } = {
  is_featured: { icon: StarIcon, color: tourTheme.colors.status.featured, label: "Featured" },
  is_vip: { icon: DiamondIcon, color: tourTheme.colors.status.vip, label: "VIP" },
  is_pinned: { icon: PushPinIcon, color: tourTheme.colors.status.pinned, label: "Pinned" },
  show_on_homepage: { icon: HomeIcon, color: tourTheme.colors.status.homepage, label: "Homepage" },
  is_unforgettable: { icon: FavoriteIcon, color: tourTheme.colors.status.unforgettable, label: "Unforgettable" }
};
const islandConfig: { [key: string]: { emoji: string; color: string; name: string; } } = {
  "Oahu": { emoji: "🏝️", color: "#2196f3", name: "Oahu" },
  "Maui": { emoji: "🌺", color: "#ff9800", name: "Maui" },
  "Big Island": { emoji: "🌋", color: "#f44336", name: "Big Island" },
  "Kauai": { emoji: "🌿", color: "#4caf50", name: "Kauai" }
};

export const getTourColumns = (
  handleToggle: (id: string, field: string, current: boolean) => void,
  handleSelect: (tour: Tour) => void,
  isMobile: boolean 
): GridColDef<Tour>[] => {

  const mobileTourColumn: GridColDef<Tour> = {
    field: "title", 
    headerName: "Tour", 
    flex: 1, 
    minWidth: 200,
    renderCell: ({ row }) => (
      // ALIGNMENT FIX: By ensuring the Stack fills the cell's height, alignItems works correctly.
      <Stack direction="row" spacing={1.5} alignItems="center" sx={{ height: '100%' }}>
        <img src={row.image} alt={row.title} style={{ width: 60, height: 40, objectFit: "cover", borderRadius: tourTheme.borderRadius.sm }}/>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, lineHeight: 1.3 }}>{row.title}</Typography>
      </Stack>
    )
  };

  const viewColumn: GridColDef<Tour> = {
    field: "view",
    headerName: "",
    width: 60,
    sortable: false,
    align: "center",
    renderCell: ({ row }) => (
      <Tooltip title="View Details">
        <IconButton onClick={() => handleSelect(row)} size="small">
          <VisibilityIcon />
        </IconButton>
      </Tooltip>
    )
  };

  if (isMobile) {
    return [
      mobileTourColumn,
      viewColumn,
    ];
  }

  // ... (Desktop columns remain the same)
  return [
    viewColumn,
    {
      field: "image",
      headerName: "",
      width: 90,
      sortable: false,
      renderCell: ({ row }) => (
        <Box sx={{ p: 0.5 }}>
          <img src={row.image} alt={row.title} style={{ width: 70, height: 48, objectFit: "cover", borderRadius: tourTheme.borderRadius.md }}/>
        </Box>
      ),
    },
    { 
      field: "title_desktop",
      headerName: "Tour Details", 
      flex: 2, 
      minWidth: 250,
      renderCell: ({ row }) => (
        <Box sx={{ py: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>{row.title}</Typography>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>ID: {row.item_id}</Typography>
        </Box>
      )
    },
    {
      field: "location",
      headerName: "Island",
      width: 120,
      renderCell: ({ value }) => {
        const config = islandConfig[value] || { emoji: "🏝️", color: "#607d8b", name: value };
        return <Chip label={<Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}><span>{config.emoji}</span> {config.name}</Box>} sx={{ backgroundColor: `${config.color}15`, color: config.color, fontWeight: 600 }} />;
      }
    },
    {
      field: "category",
      headerName: "Category",
      width: 150,
      renderCell: ({ value }) => (value ? <Chip label={value} size="small" variant="outlined" /> : null),
    },
    {
      field: "status",
      headerName: "Status",
      width: 180,
      sortable: false,
      renderCell: ({ row }) => (
        <Box sx={{ display: "flex", gap: 0.3 }}>
          {Object.keys(flagConfig).map(flag => {
            const config = flagConfig[flag];
            const IconComponent = config.icon;
            const isActive = row[flag as keyof Tour] as boolean;
            return (
              <Tooltip key={flag} title={`Toggle ${config.label}`}>
                <IconButton size="small" onClick={() => handleToggle(row.id, flag, isActive)} sx={{ color: isActive ? config.color : "#ccc" }}>
                  <IconComponent fontSize="small" />
                </IconButton>
              </Tooltip>
            );
          })}
        </Box>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      sortable: false,
      align: "center",
      headerAlign: "center",
      renderCell: ({ row }) => (
        <Box sx={{ display: "flex", gap: 0.5 }}>
          <Tooltip title="View on FareHarbor">
            <IconButton href={row.affiliate_url} target="_blank" size="small" sx={{ color: tourTheme.colors.secondary.ocean }}>
              <LaunchIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <EditButton hideText recordItemId={row.id} size="small" />
        </Box>
      ), 
    },
  ];
};
