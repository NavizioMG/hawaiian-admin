// /src/components/tours/form/TourFormPromotionalFlags.tsx
import {
    Box,
    CardContent,
    CardHeader,
    Divider,
    FormControlLabel,
    Paper,
    Stack,
    Switch,
    Typography,
  } from "@mui/material";
  import StarIcon from "@mui/icons-material/Star";
  import DiamondIcon from "@mui/icons-material/Diamond";
  import HomeIcon from "@mui/icons-material/Home";
  import PushPinIcon from "@mui/icons-material/PushPin";
  import FavoriteIcon from "@mui/icons-material/Favorite";
  import { StyledCard } from "../styles/styledComponents";
  import { tourTheme } from "../styles/tourTheme";
  
  const flagConfig = {
      is_featured: { icon: StarIcon, color: tourTheme.colors.status.featured, label: "Featured Tour" },
      is_vip: { icon: DiamondIcon, color: tourTheme.colors.status.vip, label: "VIP Experience" },
      is_pinned: { icon: PushPinIcon, color: tourTheme.colors.status.pinned, label: "Pinned" },
      show_on_homepage: { icon: HomeIcon, color: tourTheme.colors.status.homepage, label: "Show on Homepage" },
      is_unforgettable: { icon: FavoriteIcon, color: tourTheme.colors.status.unforgettable, label: "Unforgettable Experience" }
  };
  
  interface TourFormPromotionalFlagsProps {
    register: any;
    watchedValues: any;
  }
  
  export const TourFormPromotionalFlags = ({ register, watchedValues }: TourFormPromotionalFlagsProps) => {
    return (
      <StyledCard>
        <CardHeader
          avatar={<StarIcon sx={{ color: tourTheme.colors.status.featured }} />}
          title="Promotional Flags"
          subheader="Special designations and visibility"
        />
        <Divider />
        <CardContent>
          <Stack spacing={2}>
            {Object.entries(flagConfig).map(([key, config]) => {
              const IconComponent = config.icon;
              return (
                <Paper
                  key={key}
                  elevation={0}
                  sx={{
                    p: 1.5,
                    border: `1px solid ${tourTheme.colors.neutral.border}`,
                    borderRadius: 2,
                    backgroundColor: watchedValues[key] ? `${config.color}1A` : "transparent",
                  }}
                >
                  <FormControlLabel
                    control={
                      <Switch
                        {...register(key as any)}
                        checked={!!watchedValues[key]}
                        sx={{
                          "& .MuiSwitch-switchBase.Mui-checked": { color: config.color },
                          "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { backgroundColor: config.color },
                        }}
                      />
                    }
                    label={
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                        <IconComponent sx={{ color: config.color }} />
                        <Typography variant="body2" fontWeight={500}>{config.label}</Typography>
                      </Box>
                    }
                    sx={{ margin: 0, width: "100%" }}
                  />
                </Paper>
              );
            })}
          </Stack>
        </CardContent>
      </StyledCard>
    );
  };