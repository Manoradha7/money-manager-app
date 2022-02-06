//import the required packages
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { useFormik } from "formik";
import * as yup from "yup";
import { useHistory } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import * as React from "react";
import MuiAlert from "@mui/material/Alert";

// icons
import { MdAccountBalanceWallet } from "react-icons/md";

// form validation using yup
const formValidationSchema = yup.object({
  //validate email field
  email: yup
    .string()
    .email("Must be a valid email")
    .max(255)
    //.matches(!/^[A-Z0-9._%+-]+@[A-Z0-9+=]+\.[A-Z]{2,}$/i, "Pattern not matched")
    .required("Email is required"),

  // validte password field
  password: yup
    .string()
    .min(8, "Password must be 8 character")
    .max(12, "Too much Password")
    .required("Password is required"),
});

//signin
function Signin() {
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
  const history = useHistory();

  const { handleChange, handleSubmit, handleBlur, values, errors, touched } =
    useFormik({
      // give initial value as empty
      initialValues: { email: "", password: "" },
      //  validation
      validationSchema: formValidationSchema,
      onSubmit: (values) => {
        Login(values);
      },
    });

  //url for backend
  const URL = `http://localhost:8000`;

  //fetching the details
  const Login = async (values) => {
    await fetch(`${URL}/users/signin`, {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 200) {
          setMsg({ Message: "Signin Successfully", status: "success" });
          setOpen(true);
          setTimeout(() => history.push("/dashboard"), 3000);
        } else {
          setMsg({ Message: "Invalid Credentials", status: "error" });
          setOpen(true);
        }
      })
      .catch((err) => {
        setMsg({ Message: "Error", status: "error" });
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
          <header className="login-header">Sign in</header>
          <TextField
            id="email"
            name="email"
            value={values.email}
            onBlur={handleBlur}
            onChange={handleChange}
            error={errors.email && touched.email}
            type="email"
            label="E-mail"
            variant="standard"
            helperText={errors.email && touched.email && errors.email}
            required
          />
          <TextField
            id="password"
            name="password"
            value={values.password}
            error={errors.password && touched.password}
            onChange={handleChange}
            onBlur={handleBlur}
            type="password"
            label="Password"
            variant="standard"
            helperText={errors.password && touched.password && errors.password}
            required
          />
          <Button
            type="submit"
            value="signin"
            className="btn"
            variant="contained"
          >
            <LoginIcon /> Sign in
          </Button>
          <Button
            varient="text"
            color="inherit"
            onClick={() => history.push("/forgotpassword")}
          >
            Forgot password?
          </Button>
          <p> Not a member?</p>
          <Button
            type="submit"
            value="signin"
            className="btn"
            onClick={() => history.push("/signup")}
            variant="contained"
          >
            <PersonAddAltIcon /> Sign up
          </Button>
        </form>
      </div>
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
  );
}

export { Signin };
