// src/pages/auth/ResetPassword.tsx
import {
    Box,
    Button,
    Paper,
    Stack,
    TextField,
    Typography,
  } from "@mui/material";
  import { useState, useEffect } from "react";
  import { useNavigate } from "react-router-dom";
  import { supabaseClient } from "@/utility";
  
  export const ResetPassword = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [token, setToken] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
  
    // Pull the access token from the hash when user lands on page
    useEffect(() => {
      const hash = window.location.hash;
      const params = new URLSearchParams(hash.replace("#", "?"));
      const accessToken = params.get("access_token");
  
      if (accessToken) {
        setToken(accessToken);
        supabaseClient.auth.setSession({
          access_token: accessToken,
          refresh_token: params.get("refresh_token") || "",
        });
      } else {
        setError("Invalid or expired reset link.");
      }
    }, []);
  
    const handleReset = async () => {
      setLoading(true);
      const { data, error } = await supabaseClient.auth.updateUser({
        password,
      });
  
      if (error) {
        setError(error.message);
      } else {
        setSuccess(true);
        setTimeout(() => navigate("/login"), 2000);
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
            <Typography color="success.main" align="center">
              Password updated! Redirecting to login...
            </Typography>
          ) : (
            <Stack spacing={2}>
              <TextField
                type="password"
                label="New Password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
      </Box>
    );
  };
  