// src/pages/auth/ResetPassword.tsx
import {
    Box,
    Button,
    Paper,
    Stack,
    TextField,
    Typography,
    IconButton,
    Snackbar,
    Alert,
  } from "@mui/material";
  import { Visibility, VisibilityOff } from "@mui/icons-material";
  import { useState, useEffect } from "react";
  import { useNavigate } from "react-router-dom";
  import { supabaseClient } from "../../utility";
  
  export const ResetPassword = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [token, setToken] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showSnackbar, setShowSnackbar] = useState(false);
  
    useEffect(() => {
      const hash = window.location.hash;
      const params = new URLSearchParams(hash.replace("#", "?"));
      const accessToken = params.get("access_token");
  
      if (accessToken) {
        setToken(accessToken);
        supabaseClient.auth.setSession({
          access_token: accessToken,
          refresh_token: params.get("refresh_token") || "",
          token_type: "bearer",
        });
      } else {
        setError("Invalid or expired reset link.");
      }
    }, []);
  
    const handleReset = async () => {
      setError("");
      if (password.length < 6) {
        setError("Password must be at least 6 characters.");
        return;
      }
  
      setLoading(true);
  
      const { error } = await supabaseClient.auth.updateUser({ password });
  
      if (error) {
        setError(error.message);
        setShowSnackbar(true);
      } else {
        setSuccess(true);
        setShowSnackbar(true);
        setTimeout(() => navigate("/login"), 2500);
      }
  
      setLoading(false);
    };
  
    return (
      <Box
        sx={{
          height: "100vh",
          background: "linear-gradient(to right, #00c6ff, #0072ff)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 2,
        }}
      >
        <Paper elevation={6} sx={{ p: 4, width: 400 }}>
          <Typography variant="h5" mb={2} textAlign="center">
            Reset Password
          </Typography>
  
          {success ? (
            <Typography color="success.main" align="center" fontWeight="bold">
              🎉 Password updated! Redirecting...
            </Typography>
          ) : (
            <Stack spacing={2}>
              <TextField
                type={showPassword ? "text" : "password"}
                label="New Password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  ),
                }}
              />
              <Button
                variant="contained"
                fullWidth
                onClick={handleReset}
                disabled={loading || !password}
              >
                {loading ? "Updating..." : "Update Password"}
              </Button>
              {error && (
                <Typography color="error" variant="body2" textAlign="center">
                  {error}
                </Typography>
              )}
            </Stack>
          )}
        </Paper>
  
        <Snackbar
          open={showSnackbar}
          autoHideDuration={3000}
          onClose={() => setShowSnackbar(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          {success ? (
            <Alert severity="success">Password updated successfully!</Alert>
          ) : (
            <Alert severity="error">{error}</Alert>
          )}
        </Snackbar>
      </Box>
    );
  };