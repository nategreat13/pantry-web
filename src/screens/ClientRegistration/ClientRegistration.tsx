import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import RegistrationIcon from "@material-ui/icons/Assignment";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Formik } from "formik";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { useClientRegistrationContext } from "./ClientRegistrationState";
import { COLORS } from "../../constants/COLORS";

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

export function ClientRegistration() {
  const classes = useStyles();
  const history = useHistory();

  const [
    clientRegistrationState,
    setClientRegistrationState,
  ] = useClientRegistrationContext();

  return (
    <Container component="main" maxWidth="sm" style={{ marginBottom: 48 }}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <RegistrationIcon />
        </Avatar>
        <Typography variant="h5">Client Registration</Typography>
        <Formik
          initialValues={{
            firstName: clientRegistrationState.firstName,
            lastName: clientRegistrationState.lastName,
            address: clientRegistrationState.address,
            address2: clientRegistrationState.address2,
            city: clientRegistrationState.city,
            state: clientRegistrationState.state,
            zip: clientRegistrationState.zip,
            phoneNumber: clientRegistrationState.phoneNumber,
          }}
          onSubmit={async (values) => {
            setClientRegistrationState({
              firstName: values.firstName,
              lastName: values.lastName,
              address: values.address,
              address2: values.address2,
              city: values.city,
              state: values.state,
              zip: `${values.zip}`,
              phoneNumber: values.phoneNumber,
            });
            history.push("/client/register/householdInfo");
          }}
          validationSchema={Yup.object().shape({
            firstName: Yup.string().required(),
            lastName: Yup.string().required(),
            address: Yup.string().required(),
            city: Yup.string().required(),
            state: Yup.string().required(),
            zip: Yup.number().required(),
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
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="First Name"
                    name="firstName"
                    required
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    type="text"
                    value={values.firstName}
                    variant="outlined"
                    autoComplete="fname"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    required
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    type="text"
                    value={values.lastName}
                    variant="outlined"
                    autoComplete="lname"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="address"
                    name="address"
                    label="Address"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    value={values.address}
                    fullWidth
                    autoComplete="shipping address-line1"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="address2"
                    name="address2"
                    label="Address line 2"
                    fullWidth
                    autoComplete="shipping address-line2"
                    variant="outlined"
                    onBlur={handleBlur}
                    value={values.address2}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    required
                    id="city"
                    name="city"
                    label="City"
                    fullWidth
                    autoComplete="shipping address-level2"
                    variant="outlined"
                    onBlur={handleBlur}
                    value={values.city}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="state"
                    name="state"
                    required
                    label="State/Province/Region"
                    fullWidth
                    variant="outlined"
                    onBlur={handleBlur}
                    value={values.state}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="zip"
                    name="zip"
                    label="Zip / Postal code"
                    fullWidth
                    autoComplete="shipping postal-code"
                    variant="outlined"
                    type="number"
                    onBlur={handleBlur}
                    value={values.zip}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    id="phoneNumber"
                    name="phoneNumber"
                    label="Phone Number"
                    fullWidth
                    autoComplete="phone number"
                    variant="outlined"
                    onBlur={handleBlur}
                    value={values.phoneNumber}
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
                className={classes.submit}
                disabled={!isValid || !values.firstName}
                style={{
                  backgroundColor:
                    !isValid || !values.firstName
                      ? COLORS.surface
                      : COLORS.primary,
                  color: COLORS.buttonTextColor,
                }}
              >
                Next
              </Button>
            </form>
          )}
        </Formik>
      </div>
    </Container>
  );
}
