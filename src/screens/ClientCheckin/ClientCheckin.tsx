import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import CheckinIcon from "@material-ui/icons/Room";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Formik } from "formik";
import { useGlobalContext } from "../../global/globalState";
import { COLORS } from "../../constants/COLORS";
import { checkInClient } from "../../api/clientCheckIn/checkInClient";
import { StyledText } from "../../components/StyledText";

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

export function ClientCheckin() {
  const classes = useStyles();
  const [globalState] = useGlobalContext();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  return (
    <Container component="main" maxWidth="sm" style={{ marginBottom: 48 }}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <CheckinIcon />
        </Avatar>
        <Typography variant="h5">Client Check-in</Typography>
        <Formik
          initialValues={{
            clientId: "",
          }}
          onSubmit={async (values) => {
            setErrorMessage("");
            setSuccessMessage("");
            if (globalState.user) {
              const checkin = await checkInClient({
                clientId: `${values.clientId}`,
                pantry: globalState.user.pantry,
              });

              if (checkin === null) {
                setErrorMessage("Client not found. Please check the Client ID");
              } else {
                setSuccessMessage(
                  `Successful Check-in:\nClient Name: ${checkin.client.firstName} ${checkin.client.lastName}`
                );
              }
            }
          }}
        >
          {({ handleBlur, handleChange, handleSubmit, values }) => (
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="clientId"
                    label="Client ID"
                    name="clientId"
                    required
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    type="number"
                    value={values.clientId}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                style={{
                  backgroundColor: !values.clientId
                    ? COLORS.surface
                    : COLORS.primary,
                  color: COLORS.buttonTextColor,
                }}
                className={classes.submit}
                disabled={!values.clientId}
              >
                Check In Client
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
      </div>
    </Container>
  );
}
