// /src/components/layout/ModernLayout.tsx
import { useState } from "react";
import { useLogout, useMenu, useNavigation } from "@refinedev/core";
import { useLocation, Link } from "react-router-dom";
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Menu,
  MenuItem,
  Chip,
  Paper,
  Tooltip,
  Badge,
} from "@mui/material";
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  Dashboard as DashboardIcon,
  Logout as LogoutIcon,
  Settings as SettingsIcon,
  Person as PersonIcon,
  Notifications as NotificationsIcon,
  Add as AddIcon,
} from "@mui/icons-material";

// Import our design system
import { tourTheme } from "../tours/styles/tourTheme";

const drawerWidth = 280;
const collapsedDrawerWidth = 70;

interface ModernLayoutProps {
  children: React.ReactNode;
}

export const ModernLayout: React.FC<ModernLayoutProps> = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null);
  const { mutate: logout } = useLogout();
  const { menuItems } = useMenu();
  const { create } = useNavigation();
  const location = useLocation();

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  const handleLogout = () => {
    logout();
    handleUserMenuClose();
  };

  const isActiveRoute = (path: string) => {
    return location.pathname.startsWith(path);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Drawer
        variant="permanent"
        sx={{
          width: isCollapsed ? collapsedDrawerWidth : drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: isCollapsed ? collapsedDrawerWidth : drawerWidth,
            boxSizing: "border-box",
            background: tourTheme.colors.primary.gradient,
            color: "white",
            border: "none",
            transition: "width 0.3s ease",
            overflow: "hidden",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: 2,
            minHeight: 70,
          }}
        >
          {!isCollapsed && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.2rem",
                }}
              >
                🏝️
              </Box>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1 }}>
                  Hawaiian
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.8, lineHeight: 1 }}>
                  Tour Manager
                </Typography>
              </Box>
            </Box>
          )}
          <IconButton
            onClick={() => setIsCollapsed(!isCollapsed)}
            sx={{
              color: "white",
              backgroundColor: "rgba(255,255,255,0.1)",
              "&:hover": { backgroundColor: "rgba(255,255,255,0.2)" },
            }}
          >
            {isCollapsed ? <MenuIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </Box>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.1)" }} />

        <List sx={{ px: 1, py: 2, flex: 1 }}>
          {menuItems.map((item) => {
            const isActive = isActiveRoute(item.route || "");
            const icon = item.meta?.icon || <DashboardIcon />;
            
            return (
              <ListItem key={item.key} disablePadding sx={{ mb: 0.5 }}>
                <Tooltip 
                  title={isCollapsed ? item.label : ""} 
                  placement="right"
                  arrow
                >
                  <ListItemButton
                    component={Link}
                    to={item.route || "/"}
                    sx={{
                      borderRadius: 2,
                      mx: 1,
                      backgroundColor: isActive ? "rgba(255,255,255,0.15)" : "transparent",
                      "&:hover": {
                        backgroundColor: "rgba(255,255,255,0.1)",
                        transform: "translateX(4px)",
                      },
                      transition: "all 0.2s ease",
                      minHeight: 48,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color: "white",
                        minWidth: isCollapsed ? "auto" : 56,
                        justifyContent: "center",
                        fontSize: "1.5rem",
                      }}
                    >
                      {icon}
                    </ListItemIcon>
                    {!isCollapsed && (
                      <ListItemText
                        primary={item.label}
                        sx={{
                          "& .MuiListItemText-primary": {
                            fontWeight: isActive ? 600 : 400,
                            fontSize: "0.95rem",
                          },
                        }}
                      />
                    )}
                  </ListItemButton>
                </Tooltip>
              </ListItem>
            );
          })}
        </List>

        {!isCollapsed && (
          <Box sx={{ p: 2 }}>
            <Paper
              sx={{
                p: 2,
                backgroundColor: "rgba(255,255,255,0.1)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                Quick Actions
              </Typography>
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                <Chip
                  icon={<AddIcon />}
                  label="New Tour"
                  size="small"
                  onClick={() => create("tours")}
                  sx={{
                    backgroundColor: "rgba(255,255,255,0.2)",
                    color: "white",
                    "&:hover": { backgroundColor: "rgba(255,255,255,0.3)" },
                  }}
                />
              </Box>
            </Paper>
          </Box>
        )}

        <Box sx={{ p: 2, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          <ListItemButton
            onClick={handleUserMenuOpen}
            sx={{
              borderRadius: 2,
              "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
            }}
          >
            <ListItemIcon sx={{ minWidth: isCollapsed ? "auto" : 56, justifyContent: 'center' }}>
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  backgroundColor: "rgba(255,255,255,0.2)",
                  fontSize: "0.9rem",
                }}
              >
                TM
              </Avatar>
            </ListItemIcon>
            {!isCollapsed && (
              <ListItemText
                primary="Tour Manager"
                secondary="admin@hawaiitours.com"
                sx={{
                  "& .MuiListItemText-primary": { fontWeight: 600, fontSize: "0.9rem" },
                  "& .MuiListItemText-secondary": { color: "rgba(255,255,255,0.7)", fontSize: "0.8rem" },
                }}
              />
            )}
          </ListItemButton>
        </Box>
      </Drawer>

      <Menu
        anchorEl={userMenuAnchor}
        open={Boolean(userMenuAnchor)}
        onClose={handleUserMenuClose}
        transformOrigin={{ horizontal: "left", vertical: "bottom" }}
        anchorOrigin={{ horizontal: "left", vertical: "top" }}
        PaperProps={{
          sx: {
            borderRadius: 2,
            minWidth: 200,
            boxShadow: tourTheme.shadows.hover,
          },
        }}
      >
        <MenuItem onClick={handleUserMenuClose}>
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          Profile Settings
        </MenuItem>
        <MenuItem onClick={handleUserMenuClose}>
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          App Settings
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout} sx={{ color: "error.main" }}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" sx={{ color: "error.main" }} />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          backgroundColor: tourTheme.colors.neutral.background,
          minHeight: "100vh",
          overflow: "hidden",
        }}
      >
        <AppBar
          position="sticky"
          elevation={0}
          sx={{
            backgroundColor: "white",
            borderBottom: `1px solid ${tourTheme.colors.neutral.border}`,
            color: tourTheme.colors.neutral.text.primary,
          }}
        >
          <Toolbar sx={{ justifyContent: "space-between", minHeight: "64px !important" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {menuItems.find(item => isActiveRoute(item.route || ""))?.label || "Dashboard"}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <IconButton
                sx={{
                  color: tourTheme.colors.neutral.text.secondary,
                  "&:hover": { backgroundColor: tourTheme.colors.neutral.border },
                }}
              >
                <Badge badgeContent={3} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              
              <Avatar
                onClick={handleUserMenuOpen}
                sx={{
                  width: 32,
                  height: 32,
                  backgroundColor: tourTheme.colors.primary.main,
                  cursor: "pointer",
                  fontSize: "0.9rem",
                }}
              >
                TM
              </Avatar>
            </Box>
          </Toolbar>
        </AppBar>

        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};