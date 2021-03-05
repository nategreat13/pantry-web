import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockIcon from "@material-ui/icons/Lock";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Formik } from "formik";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { getPantry } from "../../api/pantry/getPantry";
import { useGlobalContext } from "../../global/globalState";
import { COLORS } from "../../constants/COLORS";
import { StyledText } from "../../components/StyledText";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: COLORS.primary,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export function PantryLogin() {
  const classes = useStyles();
  const history = useHistory();
  const [globalState, setGlobalState] = useGlobalContext();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedRadioButton, setSelectedRadioButton] = useState<
    "volunteer" | "admin"
  >("volunteer");

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      if (user) {
        setGlobalState({ user });
        history.push("/client/checkin");
      }
    }
  }, []);

  return (
    <Container component="main" maxWidth="sm" style={{ marginBottom: 48 }}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockIcon />
        </Avatar>
        <Typography variant="h5">Login</Typography>
        <FormControl component="fieldset">
          <RadioGroup
            row
            aria-label="position"
            name="position"
            style={{ marginTop: 8 }}
            value={selectedRadioButton}
            onChange={(event) => {
              if (
                event.target.value === "volunteer" ||
                event.target.value === "admin"
              ) {
                setSelectedRadioButton(event.target.value);
              }
            }}
          >
            <FormControlLabel
              value="volunteer"
              control={<Radio color="primary" />}
              label="Volunteer"
            />
            <FormControlLabel
              value="admin"
              control={<Radio color="primary" />}
              label="Admin"
            />
          </RadioGroup>
        </FormControl>
        <Formik
          initialValues={{
            pantryId: "",
            password: "",
            firstName: "",
            lastName: "",
            email: "",
          }}
          onSubmit={async (values) => {
            const pantry = await getPantry({ id: `${values.pantryId}` });
            if (!pantry) {
              setErrorMessage("Invalid Pantry ID");
              return;
            }
            if (
              selectedRadioButton === "volunteer" &&
              pantry.password !== values.password
            ) {
              setErrorMessage("Incorrect Password");
              return;
            }
            if (
              selectedRadioButton === "admin" &&
              pantry.adminPassword !== values.password
            ) {
              setErrorMessage("Incorrect Password");
              return;
            }
            const user = {
              firstName: values.firstName,
              lastName: values.lastName,
              email: values.email,
              pantry,
              isAdmin: selectedRadioButton === "admin",
            };
            setGlobalState({
              user,
            });
            localStorage.setItem("user", JSON.stringify(user));
            history.push("/client/checkin");
          }}
          validationSchema={Yup.object().shape({
            pantryId: Yup.number().required(),
            password: Yup.string().required(),
            firstName: Yup.string().required(),
            lastName: Yup.string().required(),
            email: Yup.string().required(),
          })}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            touched,
            values,
            isValid,
          }) => (
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="pantryId"
                    label="Pantry ID"
                    name="pantryId"
                    required
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    type="number"
                    value={values.pantryId}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="password"
                    name="password"
                    label={
                      selectedRadioButton === "volunteer"
                        ? "Password"
                        : "Admin Password"
                    }
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    type="password"
                    value={values.password}
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    value={values.firstName}
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    fullWidth
                    required
                    variant="outlined"
                    onBlur={handleBlur}
                    value={values.lastName}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    required
                    id="email"
                    name="email"
                    label="Email Address"
                    fullWidth
                    type="email"
                    variant="outlined"
                    onBlur={handleBlur}
                    value={values.email}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                style={{
                  backgroundColor:
                    !isValid || !values.pantryId
                      ? COLORS.surface
                      : COLORS.primary,
                  color: COLORS.buttonTextColor,
                }}
                className={classes.submit}
                disabled={!isValid || !values.pantryId}
              >
                Login
              </Button>
              {errorMessage ? (
                <StyledText style={{ color: COLORS.buttonNegativeColor }}>
                  {errorMessage}
                </StyledText>
              ) : null}
              {successMessage ? (
                <StyledText style={{ color: COLORS.buttonPositiveColor }}>
                  {successMessage}
                </StyledText>
              ) : null}
            </form>
          )}
        </Formik>
        <StyledText
          style={{ color: COLORS.primary, marginBottom: 8, marginTop: 16 }}
        >
          New? Register your pantry to get started.
        </StyledText>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          style={{
            backgroundColor: COLORS.primary,
            color: COLORS.buttonTextColor,
          }}
          onClick={() => {
            history.push("/pantry/register");
          }}
        >
          Register Your Pantry
        </Button>
        <StyledText
          style={{ color: COLORS.primary, marginTop: 16, marginBottom: 8 }}
        >
          Forgot your Pantry ID?
        </StyledText>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          style={{
            backgroundColor: COLORS.primary,
            color: COLORS.buttonTextColor,
          }}
          onClick={() => {
            history.push("/pantry/lookup");
          }}
        >
          Lookup Pantry ID
        </Button>
      </div>
    </Container>
  );
}
