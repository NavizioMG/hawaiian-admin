// src/pages/auth/ResetPassword.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabaseClient } from "@/utility/supabaseClient";
import { TextField, Button, Card, CardContent, Stack, Typography } from "@mui/material";

export const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");

  useEffect(() => {
    supabaseClient.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        console.log("Redirected here by Supabase recovery link");
      }
    });
  }, []);

  const handleSubmit = async () => {
    const { error } = await supabaseClient.auth.updateUser({ password });
    if (!error) {
      alert("Password updated!");
      navigate("/login");
    } else {
      alert("Error resetting password");
    }
  };

  return (
    <Card sx={{ maxWidth: 400, margin: "auto", mt: 10 }}>
      <CardContent>
        <Stack spacing={2}>
          <Typography variant="h6">🔁 Reset Your Password</Typography>
          <TextField
            label="New Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />
          <Button variant="contained" onClick={handleSubmit}>
            Update Password
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};
