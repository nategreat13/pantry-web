import React from "react";
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

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockIcon />
        </Avatar>
        <Typography variant="h5">Pantry Login</Typography>
        <Formik
          initialValues={{
            pantryId: "",
            firstName: "",
            lastName: "",
            email: "",
          }}
          onSubmit={async (values) => {
            const pantry = await getPantry({ id: `${values.pantryId}` });
            if (!pantry) {
              console.log("ERROR!!!!!!");
              return;
            }
            setGlobalState({
              user: {
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                pantry,
              },
            });
            history.goBack();
          }}
          validationSchema={Yup.object().shape({
            pantryId: Yup.number().required(),
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
            </form>
          )}
        </Formik>
      </div>
    </Container>
  );
}
