import {
  Box,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { useState } from "react";
import { login, register } from "../api/auth";

function AuthForm({ onClose, onLoggedin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "error",
  });

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setErrors({});
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};

    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Enter a valid email";

    if (!form.password.trim()) newErrors.password = "Password is required";

    if (!isLogin && !form.firstName.trim())
      newErrors.firstName = "First Name is required";

    return newErrors;
  };

  const handleSubmit = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      const firstError = Object.values(validationErrors)[0];
      setSnackbar({ open: true, message: firstError, severity: "error" });
      return;
    }
    setErrors({});
    try {
      if (isLogin) {
        const res = await login(form);
        if (res?.token) {
          localStorage.setItem("token", res.token);
          localStorage.setItem("user", JSON.stringify(res.user));
          setSnackbar({
            open: true,
            message: "Login successful",
            severity: "success",
          });
          setTimeout(() => {
            onClose();
          }, 1000);
          onLoggedin(res.user);
        }
      } else {
        const res = await register(form);
        setSnackbar({ open: true, message: res.message, severity: "success" });
        setIsLogin(true);
        setForm({ email: "", password: "" });
      }
    } catch (err) {
      console.log(err);
      const error = err.response.data.message || "Something went wrong";
      setErrors({ error });
      setSnackbar({ open: true, message: error, severity: "error" });
    }
  };
  return (
    <Box>
      <Typography variant="h6" mb={2} sx={{ textAlign: "center" }}>
        {isLogin ? "Login" : "Register"}
      </Typography>
      {!isLogin && (
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            label="First Name"
            name="firstName"
            fullWidth
            margin="normal"
            required
            value={form.firstName}
            onChange={handleChange}
            error={!!errors.firstName}
            helperText={errors.firstName}
          />
          <TextField
            label="Last Name"
            name="lastName"
            fullWidth
            margin="normal"
            value={form.lastName}
            onChange={handleChange}
          />
        </Box>
      )}
      <TextField
        label="Email"
        name="email"
        fullWidth
        margin="normal"
        required
        value={form.email}
        onChange={handleChange}
        error={!!errors.email}
        helperText={errors.email}
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        fullWidth
        margin="normal"
        required
        value={form.password}
        onChange={handleChange}
        error={!!errors.password}
        helperText={errors.password}
      />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mt: 2,
        }}
      >
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          {isLogin ? "Login" : "Register"}
        </Button>
        <Button onClick={onClose}>Cancel</Button>
      </Box>

      <Typography variant="body2" sx={{ mt: 2 }}>
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <Button onClick={toggleForm} size="small">
          {isLogin ? "Register" : "Login"}
        </Button>
      </Typography>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default AuthForm;
