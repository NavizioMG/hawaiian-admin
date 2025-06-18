// src/pages/auth/Login.tsx
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  Stack,
  Link,
} from "@mui/material";
import { useLogin } from "@refinedev/core";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const { mutate: login } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ email, password });
  };

  const handleForgotPassword = () => {
    navigate("/reset-password");
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
        <Typography variant="h4" mb={2} textAlign="center">
          Hawaiian Tour Co.
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" variant="contained" fullWidth>
              Login
            </Button>
            <Box textAlign="center">
              <Link
                onClick={handleForgotPassword}
                sx={{ cursor: "pointer", fontSize: "0.875rem" }}
              >
                Forgot password?
              </Link>
            </Box>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};
