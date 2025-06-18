import {
    useDataGrid,
    List,
    EditButton,
  } from "@refinedev/mui";
  import { DataGrid, GridColDef } from "@mui/x-data-grid";
  import {
    Stack,
    Switch,
    Box,
    TextField,
    InputAdornment,
    IconButton,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Button,
    Typography,
    Tooltip,
    Chip,
    Paper,
    Badge,
    Avatar,
    Fade,
    Grow,
    ButtonGroup,
    ToggleButton,
    ToggleButtonGroup,
    Divider,
  } from "@mui/material";
  import { useUpdate } from "@refinedev/core";
  import { useEffect, useMemo, useState } from "react";
  import SearchIcon from "@mui/icons-material/Search";
  import PreviewIcon from "@mui/icons-material/Visibility";
  import UploadIcon from "@mui/icons-material/Upload";
  import StarIcon from "@mui/icons-material/Star";
  import StarBorderIcon from "@mui/icons-material/StarBorder";
  import LocationOnIcon from "@mui/icons-material/LocationOn";
  import CategoryIcon from "@mui/icons-material/Category";
  import FilterListIcon from "@mui/icons-material/FilterList";
  import ClearIcon from "@mui/icons-material/Clear";
  import TuneIcon from "@mui/icons-material/Tune";
  import HomeIcon from "@mui/icons-material/Home";
  import PushPinIcon from "@mui/icons-material/PushPin";
  import DiamondIcon from "@mui/icons-material/Diamond";
  import FavoriteIcon from "@mui/icons-material/Favorite";
  import LaunchIcon from "@mui/icons-material/Launch";
  import EditIcon from "@mui/icons-material/Edit";
  
  const flagFilters = ["is_featured", "is_unforgettable", "is_vip", "is_pinned", "show_on_homepage"];
  
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
  
  export const TourList = () => {
    const [search, setSearch] = useState("");
    const [quickFilter, setQuickFilter] = useState("all");
    const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
    const [filtersState, setFiltersState] = useState({
      category: "",
      location: "",
      ...Object.fromEntries(flagFilters.map((flag) => [flag, ""])),
    });
  
    const searchKeywords = useMemo(() => search.toLowerCase().split(" ").filter(Boolean), [search]);
  
    const { dataGridProps, setFilters } = useDataGrid({
      resource: "tours",
      pagination: {
        current: 1,
        pageSize: 50,
      },
      hasPagination: true,
    });
  
    const { mutate } = useUpdate();
  
    const handleToggle = (id, field, current) => {
      mutate({
        resource: "tours",
        id,
        values: { [field]: !current },
        mutationMode: "pessimistic",
      });
    };
  
    const clearAllFilters = () => {
      setSearch("");
      setQuickFilter("all");
      setFiltersState({
        category: "",
        location: "",
        ...Object.fromEntries(flagFilters.map((flag) => [flag, ""])),
      });
    };
  
    const activeFilterCount = useMemo(() => {
      let count = 0;
      if (search) count++;
      if (quickFilter !== "all") count++;
      if (filtersState.category) count++;
      if (filtersState.location) count++;
      flagFilters.forEach(flag => {
        if (filtersState[flag] !== "") count++;
      });
      return count;
    }, [search, quickFilter, filtersState]);
  
    useEffect(() => {
      const newFilters = [];
      
      // Search filters
      searchKeywords.forEach((keyword) => {
        ["title", "location", "category", "tags", "item_id"].forEach((field) => {
          newFilters.push({
            field,
            operator: "contains",
            value: keyword,
          });
        });
      });
      
      // Quick filters
      if (quickFilter === "featured") newFilters.push({ field: "is_featured", operator: "eq", value: true });
      if (quickFilter === "vip") newFilters.push({ field: "is_vip", operator: "eq", value: true });
      if (quickFilter === "homepage") newFilters.push({ field: "show_on_homepage", operator: "eq", value: true });
      
      // Advanced filters
      if (filtersState.category) newFilters.push({ field: "category", operator: "eq", value: filtersState.category });
      if (filtersState.location) newFilters.push({ field: "location", operator: "eq", value: filtersState.location });
      flagFilters.forEach((flag) => {
        if (filtersState[flag] !== "") {
          newFilters.push({ field: flag, operator: "eq", value: filtersState[flag] === "true" });
        }
      });
      setFilters(newFilters);
    }, [searchKeywords, quickFilter, filtersState, setFilters]);
  
    const columns: GridColDef[] = [
      {
        field: "image",
        headerName: "",
        width: 90,
        sortable: false,
        renderCell: ({ row }) => (
          <Box sx={{ position: "relative", p: 0.5 }}>
            <img
              src={row.image}
              alt={row.title}
              style={{ 
                width: 70, 
                height: 48, 
                objectFit: "cover", 
                borderRadius: 8,
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
              }}
            />
            {row.is_featured && (
              <StarIcon 
                sx={{ 
                  position: "absolute", 
                  top: 2, 
                  right: 2, 
                  color: "#ff9800", 
                  fontSize: 16,
                  filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.3))"
                }} 
              />
            )}
          </Box>
        ),
      },
      { 
        field: "title", 
        headerName: "Tour Details", 
        flex: 3, 
        minWidth: 280,
        renderCell: ({ row }) => (
          <Box sx={{ py: 1 }}>
            <Typography variant="subtitle1" sx={{ 
              fontWeight: 600, 
              lineHeight: 1.3,
              mb: 0.5,
              color: "#1a1a1a"
            }}>
              {row.title}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
              <Chip 
                icon={<LocationOnIcon />}
                label={row.location} 
                size="small" 
                variant="outlined"
                sx={{ 
                  fontSize: "0.75rem", 
                  height: 22,
                  "& .MuiChip-icon": { fontSize: 14 }
                }} 
              />
              <Chip 
                icon={<CategoryIcon />}
                label={row.category} 
                size="small" 
                sx={{ 
                  fontSize: "0.75rem", 
                  height: 22,
                  backgroundColor: categoryColors[row.category] || "#607d8b",
                  color: "white",
                  "& .MuiChip-icon": { fontSize: 14, color: "white" }
                }} 
              />
              <Typography variant="caption" color="text.secondary" sx={{ ml: 0.5 }}>
                ID: {row.item_id}
              </Typography>
            </Box>
          </Box>
        )
      },
      {
        field: "tags",
        headerName: "Tags",
        flex: 1,
        minWidth: 160,
        renderCell: ({ value }) => {
          if (!value) return null;
          const tags = typeof value === "string" ? value.split(",") : value;
          const displayTags = tags.slice(0, 2);
          return (
            <Box sx={{ display: "flex", gap: 0.5, alignItems: "center", flexWrap: "wrap" }}>
              {displayTags.map((tag, i) => (
                <Chip 
                  key={i} 
                  label={tag.trim()} 
                  size="small" 
                  variant="outlined"
                  sx={{ 
                    fontSize: "0.7rem", 
                    height: 20,
                    borderColor: "#e0e0e0"
                  }} 
                />
              ))}
              {tags.length > 2 && (
                <Tooltip title={tags.slice(2).map(t => t.trim()).join(" • ")}>
                  <Chip 
                    label={`+${tags.length - 2}`} 
                    size="small" 
                    sx={{ 
                      fontSize: "0.7rem", 
                      height: 20, 
                      backgroundColor: "#f5f5f5",
                      color: "#666"
                    }} 
                  />
                </Tooltip>
              )}
            </Box>
          );
        },
      },
      {
        field: "flags",
        headerName: "Status",
        width: 160,
        sortable: false,
        renderCell: ({ row }) => (
          <Box sx={{ display: "flex", gap: 0.5, alignItems: "center", flexWrap: "wrap" }}>
            {flagFilters.map(flag => {
              if (!row[flag]) return null;
              const config = flagConfig[flag];
              const IconComponent = config.icon;
              return (
                <Tooltip key={flag} title={config.label}>
                  <IconComponent 
                    sx={{ 
                      fontSize: 18, 
                      color: config.color,
                      cursor: "pointer",
                      "&:hover": { transform: "scale(1.1)" }
                    }}
                    onClick={() => handleToggle(row.id, flag, row[flag])}
                  />
                </Tooltip>
              );
            })}
          </Box>
        ),
      },
      {
        field: "toggles",
        headerName: "Quick Actions",
        width: 180,
        sortable: false,
        renderCell: ({ row }) => (
          <Box sx={{ display: "flex", gap: 0.3, alignItems: "center" }}>
            <Tooltip title="Toggle Featured">
              <IconButton
                size="small"
                onClick={() => handleToggle(row.id, "is_featured", row.is_featured)}
                sx={{ 
                  color: row.is_featured ? "#ff9800" : "#ccc",
                  "&:hover": { backgroundColor: "rgba(255, 152, 0, 0.1)" }
                }}
              >
                {row.is_featured ? <StarIcon fontSize="small" /> : <StarBorderIcon fontSize="small" />}
              </IconButton>
            </Tooltip>
            <Tooltip title="Toggle Homepage">
              <IconButton
                size="small"
                onClick={() => handleToggle(row.id, "show_on_homepage", row.show_on_homepage)}
                sx={{ 
                  color: row.show_on_homepage ? "#4caf50" : "#ccc",
                  "&:hover": { backgroundColor: "rgba(76, 175, 80, 0.1)" }
                }}
              >
                <HomeIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Toggle VIP">
              <IconButton
                size="small"
                onClick={() => handleToggle(row.id, "is_vip", row.is_vip)}
                sx={{ 
                  color: row.is_vip ? "#9c27b0" : "#ccc",
                  "&:hover": { backgroundColor: "rgba(156, 39, 176, 0.1)" }
                }}
              >
                <DiamondIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Toggle Pinned">
              <IconButton
                size="small"
                onClick={() => handleToggle(row.id, "is_pinned", row.is_pinned)}
                sx={{ 
                  color: row.is_pinned ? "#2196f3" : "#ccc",
                  "&:hover": { backgroundColor: "rgba(33, 150, 243, 0.1)" }
                }}
              >
                <PushPinIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Toggle Unforgettable">
              <IconButton
                size="small"
                onClick={() => handleToggle(row.id, "is_unforgettable", row.is_unforgettable)}
                sx={{ 
                  color: row.is_unforgettable ? "#f44336" : "#ccc",
                  "&:hover": { backgroundColor: "rgba(244, 67, 54, 0.1)" }
                }}
              >
                <FavoriteIcon fontSize="small" />
              </IconButton>
            </Tooltip>
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
              <IconButton 
                href={row.affiliate_url} 
                target="_blank" 
                rel="noopener noreferrer"
                size="small"
                sx={{ 
                  color: "#1976d2",
                  "&:hover": { backgroundColor: "rgba(25, 118, 210, 0.1)" }
                }}
              >
                <LaunchIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <EditButton hideText recordItemId={row.id} size="small" />
          </Box>
        ), 
      },
    ];
  
    return (
      <Box sx={{ 
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        backgroundColor: "#fafafa"
      }}>
        {/* Enhanced Header */}
        <Paper elevation={0} sx={{ 
          borderBottom: "1px solid #e0e0e0",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white"
        }}>
          <Box sx={{ p: 2 }}>
            <Typography variant="h5" sx={{ 
              fontWeight: 700, 
              mb: 0.5,
              textShadow: "0 2px 4px rgba(0,0,0,0.2)"
            }}>
              🏝️ Hawaiian Tour Manager
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9, mb: 2 }}>
              Manage your tour catalog with powerful search and instant updates
            </Typography>
            
            {/* Modern Search Bar */}
            <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 2 }}>
              <TextField
                placeholder="Search tours, locations, categories..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                size="medium"
                sx={{ 
                  flex: 1,
                  maxWidth: 500,
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "rgba(255,255,255,0.95)",
                    borderRadius: 3,
                    "&:hover": { backgroundColor: "white" },
                    "&.Mui-focused": { backgroundColor: "white" }
                  }
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: "#666" }} />
                    </InputAdornment>
                  ),
                  endAdornment: search && (
                    <InputAdornment position="end">
                      <IconButton size="small" onClick={() => setSearch("")}>
                        <ClearIcon fontSize="small" />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              
              <Badge badgeContent={activeFilterCount} color="error">
                <Button
                  variant={showAdvancedFilters ? "contained" : "outlined"}
                  startIcon={<TuneIcon />}
                  onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                  sx={{ 
                    backgroundColor: showAdvancedFilters ? "rgba(255,255,255,0.2)" : "transparent",
                    borderColor: "rgba(255,255,255,0.5)",
                    color: "white",
                    "&:hover": { 
                      backgroundColor: "rgba(255,255,255,0.1)",
                      borderColor: "white"
                    }
                  }}
                >
                  Filters
                </Button>
              </Badge>
              
              {activeFilterCount > 0 && (
                <Button
                  variant="outlined"
                  startIcon={<ClearIcon />}
                  onClick={clearAllFilters}
                  sx={{ 
                    borderColor: "rgba(255,255,255,0.5)",
                    color: "white",
                    "&:hover": { 
                      backgroundColor: "rgba(255,255,255,0.1)",
                      borderColor: "white"
                    }
                  }}
                >
                  Clear All
                </Button>
              )}
              
              <Button
                variant="contained"
                startIcon={<UploadIcon />}
                sx={{ 
                  backgroundColor: "rgba(255,255,255,0.2)",
                  "&:hover": { backgroundColor: "rgba(255,255,255,0.3)" }
                }}
              >
                Bulk Upload
              </Button>
            </Box>
            
            {/* Quick Filter Buttons */}
            <ToggleButtonGroup
              value={quickFilter}
              exclusive
              onChange={(e, value) => value && setQuickFilter(value)}
              size="small"
              sx={{
                "& .MuiToggleButton-root": {
                  color: "rgba(255,255,255,0.8)",
                  borderColor: "rgba(255,255,255,0.3)",
                  "&.Mui-selected": {
                    backgroundColor: "rgba(255,255,255,0.2)",
                    color: "white"
                  },
                  "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" }
                }
              }}
            >
              <ToggleButton value="all">All Tours</ToggleButton>
              <ToggleButton value="featured">⭐ Featured</ToggleButton>
              <ToggleButton value="vip">💎 VIP</ToggleButton>
              <ToggleButton value="homepage">🏠 Homepage</ToggleButton>
            </ToggleButtonGroup>
          </Box>
          
          {/* Advanced Filters */}
          <Fade in={showAdvancedFilters}>
            <Box sx={{ 
              px: 3, 
              pb: 2,
              borderTop: "1px solid rgba(255,255,255,0.1)"
            }}>
              <Box sx={{ 
                display: "flex", 
                gap: 2, 
                flexWrap: "wrap",
                alignItems: "center",
                pt: 2
              }}>
                <FormControl size="small" sx={{ minWidth: 140 }}>
                  <InputLabel sx={{ color: "rgba(255,255,255,0.8)" }}>Category</InputLabel>
                  <Select
                    value={filtersState.category}
                    onChange={(e) => setFiltersState((prev) => ({ ...prev, category: e.target.value }))}
                    label="Category"
                    sx={{
                      backgroundColor: "rgba(255,255,255,0.1)",
                      color: "white",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(255,255,255,0.3)"
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(255,255,255,0.5)"
                      }
                    }}
                  >
                    <MenuItem value="">All Categories</MenuItem>
                    <MenuItem value="Hiking">🥾 Hiking</MenuItem>
                    <MenuItem value="Snorkel">🤿 Snorkel</MenuItem>
                    <MenuItem value="Kayak">🛶 Kayak</MenuItem>
                    <MenuItem value="Sunset Cruise">🌅 Sunset Cruise</MenuItem>
                    <MenuItem value="Wildlife">🐠 Wildlife</MenuItem>
                    <MenuItem value="Scenic">🏞️ Scenic</MenuItem>
                    <MenuItem value="Adventure">⚡ Adventure</MenuItem>
                    <MenuItem value="Other">📍 Other</MenuItem>
                  </Select>
                </FormControl>
                
                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <InputLabel sx={{ color: "rgba(255,255,255,0.8)" }}>Location</InputLabel>
                  <Select
                    value={filtersState.location}
                    onChange={(e) => setFiltersState((prev) => ({ ...prev, location: e.target.value }))}
                    label="Location"
                    sx={{
                      backgroundColor: "rgba(255,255,255,0.1)",
                      color: "white",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(255,255,255,0.3)"
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(255,255,255,0.5)"
                      }
                    }}
                  >
                    <MenuItem value="">All Islands</MenuItem>
                    <MenuItem value="Oahu">🏝️ Oahu</MenuItem>
                    <MenuItem value="Maui">🌺 Maui</MenuItem>
                    <MenuItem value="Big Island">🌋 Big Island</MenuItem>
                    <MenuItem value="Kauai">🌿 Kauai</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
          </Fade>
        </Paper>
        
        {/* DataGrid with enhanced styling */}
        <Box sx={{ flex: 1, overflow: "hidden" }}>
          <DataGrid 
            {...dataGridProps} 
            columns={columns} 
            density="comfortable"
            disableColumnMenu
            sx={{
              height: "100%",
              border: 0,
              backgroundColor: "white",
              "& .MuiDataGrid-main": {
                overflow: "hidden"
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#f8f9fa",
                borderBottom: "2px solid #e9ecef",
                fontSize: "0.85rem",
                fontWeight: 600,
                color: "#495057"
              },
              "& .MuiDataGrid-cell": {
                borderColor: "#f1f3f4",
                "&:focus": { outline: "none" }
              },
              "& .MuiDataGrid-row": {
                "&:hover": {
                  backgroundColor: "#f8f9ff",
                  cursor: "pointer"
                },
                "&:nth-of-type(even)": {
                  backgroundColor: "#fafbfc"
                }
              },
              "& .MuiDataGrid-virtualScroller": {
                "&::-webkit-scrollbar": { width: 8 },
                "&::-webkit-scrollbar-track": { backgroundColor: "#f1f1f1" },
                "&::-webkit-scrollbar-thumb": { 
                  backgroundColor: "#c1c1c1", 
                  borderRadius: 4,
                  "&:hover": { backgroundColor: "#a8a8a8" }
                }
              }
            }}
          />
        </Box>
      </Box>
    );
  };