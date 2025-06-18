// src/components/tours/TourShow.tsx
import { useShow } from "@refinedev/core";
import { Show } from "@refinedev/mui";
import { 
  Typography, 
  Stack, 
  Box, 
  Card, 
  CardContent,
  Chip,
  Avatar,
  Paper,
  Grid,
  Divider,
  IconButton,
  Tooltip,
  Button
} from "@mui/material";
import { 
  Star as StarIcon, 
  Diamond as DiamondIcon, 
  PushPin as PushPinIcon, 
  Home as HomeIcon, 
  Favorite as FavoriteIcon,
  LocationOn as LocationOnIcon,
  Category as CategoryIcon,
  Launch as LaunchIcon,
  Edit as EditIcon,
  Tag as TagIcon
} from "@mui/icons-material";
import { Link } from "react-router-dom";

const flagConfig = {
  is_featured: { icon: StarIcon, color: "#ff9800", label: "Featured" },
  is_vip: { icon: DiamondIcon, color: "#9c27b0", label: "VIP" },
  is_pinned: { icon: PushPinIcon, color: "#2196f3", label: "Pinned" },
  show_on_homepage: { icon: HomeIcon, color: "#4caf50", label: "Homepage" },
  is_unforgettable: { icon: FavoriteIcon, color: "#f44336", label: "Unforgettable" }
};

const categoryColors = {
  "Hiking": "#4caf50",
  "Snorkel": "#00bcd4", 
  "Kayak": "#03a9f4",
  "Sunset Cruise": "#ff9800",
  "Wildlife": "#8bc34a",
  "Scenic": "#9c27b0",
  "Adventure": "#f44336",
  "Other": "#607d8b"
};

export const TourShow = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  if (isLoading) {
    return (
      <Box sx={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        minHeight: "60vh" 
      }}>
        <Typography variant="h6" color="text.secondary">
          🌺 Loading tour details...
        </Typography>
      </Box>
    );
  }

  if (!record) {
    return (
      <Box sx={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        minHeight: "60vh" 
      }}>
        <Typography variant="h6" color="error">
          Tour not found
        </Typography>
      </Box>
    );
  }

  const activeFlags = Object.entries(flagConfig).filter(([key]) => record[key]);
  const tags = record.tags ? (typeof record.tags === "string" ? record.tags.split(",") : record.tags) : [];

  return (
    <Box sx={{ 
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      p: 3
    }}>
      <Show 
        title={
          <Typography variant="h4" sx={{ color: "white", fontWeight: 700 }}>
            🏝️ {record.title}
          </Typography>
        }
        breadcrumb={false}
        headerButtons={
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              component={Link}
              to={`/tours/edit/${record.id}`}
              variant="contained"
              startIcon={<EditIcon />}
              sx={{ 
                backgroundColor: "rgba(255,255,255,0.2)",
                "&:hover": { backgroundColor: "rgba(255,255,255,0.3)" }
              }}
            >
              Edit Tour
            </Button>
            <Button
              href={record.affiliate_url}
              target="_blank"
              rel="noopener noreferrer"
              variant="outlined"
              startIcon={<LaunchIcon />}
              sx={{ 
                borderColor: "rgba(255,255,255,0.5)",
                color: "white",
                "&:hover": { 
                  backgroundColor: "rgba(255,255,255,0.1)",
                  borderColor: "white"
                }
              }}
            >
              View on FareHarbor
            </Button>
          </Box>
        }
      >
        <Card sx={{ 
          maxWidth: 1000, 
          mx: "auto", 
          mt: 2,
          borderRadius: 3,
          overflow: "hidden",
          boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
        }}>
          {/* Hero Section with Image */}
          <Box sx={{ position: "relative", height: 300, overflow: "hidden" }}>
            <img
              src={record.image}
              alt={record.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover"
              }}
            />
            <Box sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.6) 100%)",
              display: "flex",
              alignItems: "end",
              p: 3
            }}>
              <Box>
                <Typography variant="h4" sx={{ 
                  color: "white", 
                  fontWeight: 700,
                  textShadow: "0 2px 4px rgba(0,0,0,0.5)",
                  mb: 1
                }}>
                  {record.title}
                </Typography>
                <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                  <Chip
                    icon={<LocationOnIcon />}
                    label={record.location}
                    sx={{
                      backgroundColor: "rgba(255,255,255,0.9)",
                      color: "#333",
                      fontWeight: 600
                    }}
                  />
                  <Chip
                    icon={<CategoryIcon />}
                    label={record.category}
                    sx={{
                      backgroundColor: categoryColors[record.category] || "#607d8b",
                      color: "white",
                      fontWeight: 600
                    }}
                  />
                </Box>
              </Box>
            </Box>
          </Box>

          <CardContent sx={{ p: 4 }}>
            <Grid container spacing={4}>
              {/* Main Details */}
              <Grid item xs={12} md={8}>
                <Stack spacing={3}>
                  {/* Status Flags */}
                  {activeFlags.length > 0 && (
                    <Paper sx={{ p: 2, backgroundColor: "#f8f9fa", borderRadius: 2 }}>
                      <Typography variant="h6" sx={{ 
                        mb: 2, 
                        fontWeight: 600,
                        color: "#495057"
                      }}>
                        🏆 Status & Promotions
                      </Typography>
                      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                        {activeFlags.map(([key, config]) => {
                          const IconComponent = config.icon;
                          return (
                            <Chip
                              key={key}
                              icon={<IconComponent />}
                              label={config.label}
                              sx={{
                                backgroundColor: config.color,
                                color: "white",
                                fontWeight: 600,
                                "& .MuiChip-icon": { color: "white" }
                              }}
                            />
                          );
                        })}
                      </Box>
                    </Paper>
                  )}

                  {/* Description */}
                  {record.description && (
                    <Paper sx={{ p: 3, backgroundColor: "#f8f9fa", borderRadius: 2 }}>
                      <Typography variant="h6" sx={{ 
                        mb: 2, 
                        fontWeight: 600,
                        color: "#495057"
                      }}>
                        📝 Description
                      </Typography>
                      <Typography variant="body1" sx={{ 
                        lineHeight: 1.7,
                        color: "#6c757d"
                      }}>
                        {record.description}
                      </Typography>
                    </Paper>
                  )}

                  {/* Tags */}
                  {tags.length > 0 && (
                    <Paper sx={{ p: 3, backgroundColor: "#f8f9fa", borderRadius: 2 }}>
                      <Typography variant="h6" sx={{ 
                        mb: 2, 
                        fontWeight: 600,
                        color: "#495057"
                      }}>
                        🏷️ Tags
                      </Typography>
                      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                        {tags.map((tag, index) => (
                          <Chip
                            key={index}
                            label={tag.trim()}
                            variant="outlined"
                            sx={{
                              borderColor: "#667eea",
                              color: "#667eea",
                              "&:hover": {
                                backgroundColor: "rgba(102, 126, 234, 0.1)"
                              }
                            }}
                          />
                        ))}
                      </Box>
                    </Paper>
                  )}
                </Stack>
              </Grid>

              {/* Sidebar Details */}
              <Grid item xs={12} md={4}>
                <Stack spacing={3}>
                  {/* Technical Details */}
                  <Paper sx={{ p: 3, backgroundColor: "#f8f9fa", borderRadius: 2 }}>
                    <Typography variant="h6" sx={{ 
                      mb: 2, 
                      fontWeight: 600,
                      color: "#495057"
                    }}>
                      ⚙️ Technical Details
                    </Typography>
                    <Stack spacing={2}>
                      <Box>
                        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                          ITEM ID
                        </Typography>
                        <Typography variant="body2" sx={{ fontFamily: "monospace", mt: 0.5 }}>
                          {record.item_id || "Not set"}
                        </Typography>
                      </Box>
                      <Divider />
                      <Box>
                        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                          URL SLUG
                        </Typography>
                        <Typography variant="body2" sx={{ fontFamily: "monospace", mt: 0.5 }}>
                          {record.slug || "Not set"}
                        </Typography>
                      </Box>
                      <Divider />
                      <Box>
                        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                          AFFILIATE URL
                        </Typography>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            mt: 0.5,
                            wordBreak: "break-all",
                            color: record.affiliate_url ? "#1976d2" : "#6c757d"
                          }}
                        >
                          {record.affiliate_url || "Not set"}
                        </Typography>
                      </Box>
                    </Stack>
                  </Paper>

                  {/* Quick Actions */}
                  <Paper sx={{ p: 3, backgroundColor: "#f8f9fa", borderRadius: 2 }}>
                    <Typography variant="h6" sx={{ 
                      mb: 2, 
                      fontWeight: 600,
                      color: "#495057"
                    }}>
                      🚀 Quick Actions
                    </Typography>
                    <Stack spacing={2}>
                      <Button
                        component={Link}
                        to={`/tours/edit/${record.id}`}
                        variant="contained"
                        startIcon={<EditIcon />}
                        fullWidth
                        sx={{
                          backgroundColor: "#667eea",
                          "&:hover": { backgroundColor: "#5a6fd8" }
                        }}
                      >
                        Edit Tour
                      </Button>
                      <Button
                        href={record.affiliate_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="outlined"
                        startIcon={<LaunchIcon />}
                        fullWidth
                        disabled={!record.affiliate_url}
                      >
                        View on FareHarbor
                      </Button>
                    </Stack>
                  </Paper>
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Show>
    </Box>
  );
};