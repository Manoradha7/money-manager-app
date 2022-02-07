import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Login";
import { useFormik } from "formik";
import * as yup from "yup";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { API_URL } from "../globalConstant.js";

// icons
import { MdAccountBalanceWallet } from "react-icons/md";

// validate form using yup
const formValidationSchema = yup.object({
  email: yup
    .string()
    .email("Must be a valid email")
    .max(255)
    .required("Email is required"),
});
// forgetpassword
function ForgotPassword() {
  //snack bar
  const [open, setOpen] = React.useState(false);
  const [Msg, setMsg] = React.useState("");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  //useformik
  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: { email: "" },
      validationSchema: formValidationSchema,
      onSubmit: (values) => {
        forgot(values);
        console.log("onSubmit", values);
      },
    });
  
  const forgot = (values) => {
    fetch(`${API_URL}/users/forgotpassword`, {
      method: "POST",
      body: JSON.stringify(values),
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      if (response.status === 200) {
        setMsg({
          Message: "Verification link sent to the registered mail",
          status: "success",
        });
      } else {
        setMsg({ Message: "Mail is not registered", status: "error" });
      }
      setOpen(true);
    });
  };
  return (
    <div className="background">
      <div className="signin-signup">
        <div className="app-title">
          <i className="logo-icon">
            <MdAccountBalanceWallet />
          </i>
          <h2>Money Manager</h2>
        </div>
        <form className="signin-signup-form" onSubmit={handleSubmit}>
          <header className="login-header">Forgot Password</header>
          <TextField
            id="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.email && touched.email}
            type="email"
            label="Email"
            variant="standard"
            helperText={errors.email && touched.email && errors.email}
          />
          <Button
            type="submit"
            value="signin"
            className="btn"
            variant="contained"
          >
            <LoginIcon />
            Submit
          </Button>
        </form>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity={Msg.status}
            sx={{ width: "100%" }}
          >
            {Msg.Message}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}

export { ForgotPassword };
