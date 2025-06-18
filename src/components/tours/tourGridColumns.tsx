// /src/components/tours/tourGridColumns.tsx
import { GridColDef } from "@mui/x-data-grid";
import { Box, Typography, Tooltip, Chip, IconButton } from "@mui/material";
import { EditButton } from "@refinedev/mui";

// Import Icons and Configs
import StarIcon from "@mui/icons-material/Star";
import HomeIcon from "@mui/icons-material/Home";
import PushPinIcon from "@mui/icons-material/PushPin";
import DiamondIcon from "@mui/icons-material/Diamond";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LaunchIcon from "@mui/icons-material/Launch";

import { tourTheme } from "./styles/tourTheme";

// Re-define configs here or import from a central config file
const flagConfig = {
  is_featured: { icon: StarIcon, color: tourTheme.colors.status.featured, label: "Featured" },
  is_vip: { icon: DiamondIcon, color: tourTheme.colors.status.vip, label: "VIP" },
  is_pinned: { icon: PushPinIcon, color: tourTheme.colors.status.pinned, label: "Pinned" },
  show_on_homepage: { icon: HomeIcon, color: tourTheme.colors.status.homepage, label: "Homepage" },
  is_unforgettable: { icon: FavoriteIcon, color: tourTheme.colors.status.unforgettable, label: "Unforgettable" }
};

const islandConfig = {
  "Oahu": { emoji: "🏝️", color: "#2196f3", name: "Oahu" },
  "Maui": { emoji: "🌺", color: "#ff9800", name: "Maui" },
  "Big Island": { emoji: "🌋", color: "#f44336", name: "Big Island" },
  "Kauai": { emoji: "🌿", color: "#4caf50", name: "Kauai" }
};

// This function generates the columns array, accepting the toggle handler as an argument.
export const getTourColumns = (handleToggle: (id: string, field: string, current: boolean) => void): GridColDef[] => [
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
    field: "title", 
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
    renderCell: ({ value }) => value && <Chip label={value} size="small" variant="outlined" />,
  },
  {
    field: "toggles",
    headerName: "Status", // RENAMED: from "Quick Actions" to "Status"
    width: 180,
    sortable: false,
    renderCell: ({ row }) => (
      <Box sx={{ display: "flex", gap: 0.3 }}>
        {Object.keys(flagConfig).map(flag => {
          const config = flagConfig[flag];
          const IconComponent = config.icon;
          const isActive = row[flag];
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