import React, { useState } from "react";
import { Button, Container, Grid, Card, CardContent, Typography, IconButton, TextField, InputAdornment } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { API } from "../globle";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const passwordValidationSchema = yup.object({
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

function PasswordReset() {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const { handleSubmit, values, handleChange, handleBlur, touched, errors } = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: passwordValidationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      values.id = params.id;
      values.token = params.token;
      let user = await axios.post(`${API}/users/passwordReset`, values);
      if (user.data.statusCode === 200) {
        setLoading(false);
        navigate("/");
      } else {
        setLoading(false);
      }
    },
  });

  const togglePasswordVisibility = (field) => {
    if (field === "password") {
      setShowPassword(!showPassword);
    } else if (field === "confirmPassword") {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  return (
    <Container>

      <Grid container justifyContent="center">
        <Grid item xs={12} md={6}>
          <Card variant="outlined" style={{ backgroundColor: "lightblue" }}>
            <CardContent>
              <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
                <Typography variant="h5" gutterBottom>
                  Password Reset Page
                </Typography>
                <Grid container spacing={2} alignItems="center" justifyContent="center">
                  <Grid item xs={12}>
                    <TextField
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      label="New Password"
                      variant="outlined"
                      placeholder="Enter your Password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      fullWidth
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={() => togglePasswordVisibility("password")}>
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <p style={{ color: "red" }}>{touched.password && errors.password ? errors.password : null}</p>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      label="Confirm Password"
                      variant="outlined"
                      placeholder="Confirm Password"
                      value={values.confirmPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      fullWidth
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={() => togglePasswordVisibility("confirmPassword")}>
                              {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <p style={{ color: "red" }}>
                      {touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword : null}
                    </p>
                  </Grid>
                  <Grid item xs={12}>
                    <Button variant="contained" color="primary" type="submit" disabled={loading}>
                      {loading ? "Changing..." : "Reset"}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

    </Container>
  );
}

export default PasswordReset;
