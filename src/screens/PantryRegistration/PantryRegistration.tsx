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
import { registerPantry } from "../../api/pantry/registerPantry";
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

export function PantryRegistration() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <RegistrationIcon />
        </Avatar>
        <Typography variant="h5">Pantry Registration</Typography>
        <Formik
          initialValues={{
            name: "",
            address1: "",
            address2: "",
            city: "",
            state: "",
            zip: "",
            phoneNumber: "",
            adminPassword: "",
          }}
          onSubmit={async (values) => {
            const pantryId = await registerPantry({
              pantry: {
                name: values.name,
                address1: values.address1,
                address2: values.address2,
                city: values.city,
                state: values.state,
                zip: values.zip,
                phoneNumber: values.phoneNumber,
                adminPassword: values.adminPassword,
              },
            });
            history.replace(`/pantry/register/success/${pantryId}`);
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string().required(),
            address1: Yup.string().required(),
            city: Yup.string().required(),
            state: Yup.string().required(),
            zip: Yup.number().required(),
            adminPassword: Yup.string().required(),
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
                    label="Name"
                    name="name"
                    required
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    type="text"
                    value={values.name}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="address1"
                    name="address1"
                    label="Address line 1"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    value={values.address1}
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
                <Grid item xs={12} sm={12}>
                  <TextField
                    id="adminPassword"
                    name="adminPassword"
                    label="Admin Password"
                    fullWidth
                    variant="outlined"
                    onBlur={handleBlur}
                    value={values.adminPassword}
                    type="password"
                    onChange={(e) => {
                      console.log(values);
                      console.log(isValid);
                      handleChange(e);
                    }}
                    required
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                style={{
                  backgroundColor:
                    !isValid || !values.name ? COLORS.surface : COLORS.primary,
                  color: COLORS.buttonTextColor,
                }}
                className={classes.submit}
                disabled={!isValid || !values.name}
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
