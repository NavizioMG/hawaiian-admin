// /src/components/tours/styles/styledComponents.ts
import { styled, Box, Paper, Button, TextField, Card } from "@mui/material";
import { tourTheme } from "./tourTheme";

// --- CORE LAYOUT COMPONENTS ---

export const PageContainer = styled(Box)(() => ({
  height: "100%", 
  display: "flex", 
  flexDirection: "column",
  backgroundColor: tourTheme.colors.neutral.background
}));

export const GradientHeader = styled(Paper)(() => ({
  background: tourTheme.colors.primary.gradient,
  color: "white",
  borderRadius: 0,
  position: "relative",
  zIndex: 10,
}));

export const ContentArea = styled(Box)(() => ({
  flex: 1,
  padding: tourTheme.spacing.md,
  display: "flex",
  flexDirection: "column",
  position: "relative",
}));

// --- INTERACTIVE COMPONENTS ---

export const ActionButton = styled(Button)(() => ({
  borderRadius: tourTheme.borderRadius.md,
  textTransform: "none",
  fontWeight: 600,
  transition: "all 0.25s ease-in-out",
  boxShadow: tourTheme.shadows.card,
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: tourTheme.shadows.hover
  }
}));

export const SearchInput = styled(TextField)({
  // This component is now styled directly in the header for better context-awareness
});

// --- CARD & CONTAINER COMPONENTS ---

export const StyledCard = styled(Card)(() => ({
  boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
  borderRadius: tourTheme.borderRadius.lg,
  border: `1px solid ${tourTheme.colors.neutral.border}`,
  transition: "all 0.25s ease-in-out",
  "&:hover": {
    boxShadow: `0 0 20px -5px ${tourTheme.colors.primary.main}40`,
    transform: "translateY(-2px)",
    borderColor: `${tourTheme.colors.primary.main}50`
  }
}));

// --- CHIP & ICON COMPONENTS ---

export const StatusIcon = styled(Box)<{ color?: string }>(({ color }) => ({
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

export const CategoryChip = styled(Box)<{ category: string }>(({ category }) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: tourTheme.spacing.xs,
  padding: `${tourTheme.spacing.xs} ${tourTheme.spacing.sm}`,
  backgroundColor: tourTheme.colors.categories[category as keyof typeof tourTheme.colors.categories] || tourTheme.colors.categories.Other,
  color: "white",
  borderRadius: tourTheme.borderRadius.md,
  fontSize: tourTheme.typography.caption.fontSize,
  fontWeight: 500,
  textShadow: '0 1px 1px rgba(0,0,0,0.1)'
}));