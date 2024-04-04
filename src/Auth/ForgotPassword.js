import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { API } from "../globle";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const formValidationSchema = yup.object({
  email: yup.string().email("Invalid email format").required("Email is required"),
});

function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  // const navigate = useNavigate();

  const { handleSubmit, values, handleChange, handleBlur, touched, errors } =
    useFormik({
      initialValues: {
        email: "",
      },
      validationSchema: formValidationSchema,
      onSubmit: async (values) => {
        setLoading(true);
        try {
          const response = await fetch(`${API}/users/forgot`, {
            method: "POST",
            body: JSON.stringify(values),
            headers: { "Content-type": "application/json" },
          });
          const data = await response.json();

          if (response.ok) {
            setSuccessMessage(data.message);
            setErrorMessage("");
            setLoading(false);
            // navigate("/");
          } else {
            setErrorMessage(data.message || "Something went wrong");
            setSuccessMessage("");
            setLoading(false);
          }
        } catch (error) {
          console.error("Error:", error);
          setErrorMessage("Something went wrong");
          setSuccessMessage("");
          setLoading(false);
        }
      },
    });

  return (
    <Container >

      <Grid container justifyContent="center">
        <Grid item xs={12} md={6}>
          <Card variant="outlined" style={{ backgroundColor: "lightblue", boxShadow: "0 4px 8px rgba(0,0,0,0.1), 0 6px 20px rgba(0,0,0,0.1)" }} >
            <CardContent>
              <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
                <img
                  src="https://i.pinimg.com/736x/de/12/a3/de12a3d51ae370e751c135c6a2d94885.jpg"
                  alt="img"
                  style={{ height: "100px", width: "100px" }}
                />
                <Typography variant="h5" gutterBottom>
                  Trouble logging in?
                </Typography>
                <Typography variant="body2" gutterBottom color="text.secondary">
                  Enter your email and we'll send you a link to reset your password back into your account.
                </Typography>
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  label="Email address"
                  variant="outlined"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && !!errors.email}
                  helperText={touched.email && errors.email}

                  margin="normal"

                />

                <div style={{ marginTop: "0.5rem" }}>
                  <Button
                    variant="contained"
                    fullWidth
                    type="submit"
                    disabled={loading}
                    style={{ backgroundColor: "#84b3e6" }}
                  >
                    {loading ? "Sending..." : "Send Email"}
                  </Button>


                  {errorMessage && (
                    <Typography variant="body2" style={{ color: "red", marginTop: "0.5rem" }}>
                      {errorMessage}
                    </Typography>
                  )}
                  {successMessage && (
                    <Typography variant="body2" style={{ color: "green", marginTop: "0.5rem" }}>
                      {successMessage}
                    </Typography>
                  )}
                  <Typography variant="body2" gutterBottom style={{ marginTop: "1rem" }}>
                    Don't Have Account? <Link to="/register">Sign Up</Link>
                  </Typography>
                </div>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

    </Container>
  );
}

export default ForgotPassword;
