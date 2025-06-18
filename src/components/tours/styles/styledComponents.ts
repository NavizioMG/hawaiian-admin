// /src/components/tours/styles/styledComponents.ts
import { styled, Box, Paper, Button, TextField, Card, Chip } from "@mui/material";
import { tourTheme } from "./tourTheme";

// --- CORE LAYOUT COMPONENTS ---

export const PageContainer = styled(Box)(({ theme }) => ({
  // FIX: Change height to 100% to fill its parent, not the whole viewport (vh).
  // And remove the conflicting overflow property.
  height: "100%", 
  display: "flex", 
  flexDirection: "column",
  // overflow: "hidden", // <-- DELETE THIS LINE
  backgroundColor: tourTheme.colors.neutral.background
}));

export const GradientHeader = styled(Paper)(({ theme }) => ({
  background: tourTheme.colors.primary.gradient,
  color: "white",
  borderRadius: 0,
  position: "relative",
  zIndex: 10, // Ensure header is above content
  // FIX: Removed the global TextField style that was causing conflicts.
  // Styles should be applied to specific components like SearchInput below.
}));

export const ContentArea = styled(Box)(({ theme }) => ({
  flex: 1,
  // We already correctly removed overflow: "hidden" from here.
  padding: tourTheme.spacing.md,
  display: "flex",
  flexDirection: "column"
}));

// --- INTERACTIVE COMPONENTS ---

export const ActionButton = styled(Button)(({ theme }) => ({
  borderRadius: tourTheme.borderRadius.md,
  textTransform: "none",
  fontWeight: 600,
  transition: "all 0.25s ease-in-out",
  boxShadow: tourTheme.shadows.card, // Give buttons a subtle shadow
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: tourTheme.shadows.hover
  }
}));

export const SearchInput = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: tourTheme.borderRadius.md,
    transition: "all 0.25s ease-in-out",
    backgroundColor: 'rgba(255,255,255, 0.9)', // Start with a slightly transparent look
    "&:hover": {
      backgroundColor: 'white',
      boxShadow: tourTheme.shadows.card
    },
    "&.Mui-focused": {
      backgroundColor: 'white',
      boxShadow: `0 0 0 4px ${tourTheme.colors.primary.main}30`, // Modern focus glow
      "& .MuiOutlinedInput-notchedOutline": {
        borderWidth: '1px' // Keep border width consistent
      }
    }
  },
  // Remove the default label styles that can conflict
  "& .MuiInputLabel-root": {
      fontWeight: 500
  }
}));

// --- CARD & CONTAINER COMPONENTS ---

export const StyledCard = styled(Card)(({ theme }) => ({
  boxShadow: "0 1px 3px rgba(0,0,0,0.05)", // Start with a softer shadow
  borderRadius: tourTheme.borderRadius.lg,
  border: `1px solid ${tourTheme.colors.neutral.border}`,
  transition: "all 0.25s ease-in-out",
  "&:hover": {
    boxShadow: `0 0 20px -5px ${tourTheme.colors.primary.main}40`, // ENHANCEMENT: Add a subtle glow on hover
    transform: "translateY(-2px)",
    borderColor: `${tourTheme.colors.primary.main}50`
  }
}));

export const FilterContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: tourTheme.spacing.md,
  flexWrap: "wrap", 
  alignItems: "center",
  padding: tourTheme.spacing.md,
  backgroundColor: "rgba(0, 0, 0, 0.02)", // Use a subtle dark tint instead
  borderRadius: tourTheme.borderRadius.lg,
  border: `1px solid ${tourTheme.colors.neutral.border}`
}));


// --- CHIP & ICON COMPONENTS ---

// NEW: A dedicated styled component for our interactive filter chips
export const FilterChip = styled(Chip)(({ theme }) => ({
    transition: 'all 0.2s ease-in-out',
    cursor: 'pointer',
    borderWidth: '1px',
    borderStyle: 'solid',
    '&:hover': {
        transform: 'translateY(-1px)',
        opacity: 0.9
    }
}));


export const StatusIcon = styled(Box)(({ color }) => ({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "24px",
  height: "24px", 
  borderRadius: "50%",
  backgroundColor: color,
  color: "white",
  fontSize: "12px",
  fontWeight: 600,
  boxShadow: "0 1px 2px rgba(0,0,0,0.2)",
  cursor: "pointer",
  transition: "all 0.2s ease-in-out",
  "&:hover": {
    transform: "scale(1.15)",
    boxShadow: `0 0 10px -2px ${color}`
  }
}));

export const CategoryChip = styled(Box)(({ category }) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: tourTheme.spacing.xs,
  padding: `${tourTheme.spacing.xs} ${tourTheme.spacing.sm}`,
  backgroundColor: tourTheme.colors.categories[category] || tourTheme.colors.categories.Other,
  color: "white",
  borderRadius: tourTheme.borderRadius.md, // Slightly larger radius
  fontSize: tourTheme.typography.caption.fontSize,
  fontWeight: 500,
  textShadow: '0 1px 1px rgba(0,0,0,0.1)' // Add a subtle text shadow for readability
}));