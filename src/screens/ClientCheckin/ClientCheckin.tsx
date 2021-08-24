import React, { useEffect, useState } from "react";
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
import { useHistory } from "react-router-dom";
import { TouchableOpacity } from "react-native-web";
import { Client } from "../../models/client.schema";
import { lookupClient } from "../../api/client/lookupClient";
import _ from "lodash";

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
  const history = useHistory();
  const [showUploadButton, setShowUploadButton] = useState(false);
  const [lookupErrorMessage, setLookupErrorMessage] = useState("");
  const [possibleClients, setPossibleClients] = useState<Client[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  useEffect(() => {
    if (!globalState.user) {
      history.replace("/pantry/login");
    }
  }, []);

  return (
    <Container component="main" maxWidth="sm" style={{ marginBottom: 48 }}>
      <CssBaseline />
      <div className={classes.paper}>
        <TouchableOpacity
          onLongPress={() => {
            setShowUploadButton(true);
          }}
        >
          <Avatar className={classes.avatar}>
            <CheckinIcon />
          </Avatar>
        </TouchableOpacity>
        {showUploadButton ? (
          <Button
            fullWidth
            variant="contained"
            style={{
              backgroundColor: COLORS.primary,
              color: COLORS.buttonTextColor,
              marginTop: 16,
              marginBottom: 32,
            }}
            onClick={() => {
              history.push("/client/upload");
            }}
          >
            Upload Existing Clients
          </Button>
        ) : null}
        <Typography variant="h5">Client Check-in</Typography>
        <Formik
          initialValues={{
            clientId: "",
          }}
          onSubmit={async (values, { resetForm }) => {
            setErrorMessage("");
            setSuccessMessage("");
            if (globalState.user) {
              const checkin = await checkInClient({
                clientId: `${values.clientId}`,
                pantry: globalState.user.pantry,
                volunteerName: `${globalState.user.firstName} ${globalState.user.lastName}`,
                volunteerEmail: globalState.user.email,
              });

              if (checkin === null) {
                setErrorMessage("Client not found. Please check the Client ID");
              } else {
                setSuccessMessage(
                  `Successful Check-in:\nClient Name: ${
                    checkin.client.firstName
                  } ${checkin.client.lastName}\n# of People in household: ${
                    checkin.client.householdInfo.numAdults +
                    checkin.client.householdInfo.numKids +
                    checkin.client.householdInfo.numSeniors
                  }`
                );
                resetForm();
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
        <StyledText
          style={{ color: COLORS.primary, marginBottom: 8, marginTop: 16 }}
        >
          New Client?
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
            if (globalState.user) {
              history.push(`/client/register/${globalState.user.pantry.id}`);
            }
          }}
        >
          Register Client
        </Button>

        <Typography style={{ marginTop: 48 }} variant="h5">
          Client ID Lookup
        </Typography>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            zip: "",
          }}
          onSubmit={async (values) => {
            setErrorMessage("");
            if (globalState.user) {
              const possibleClients = await lookupClient({
                firstName: _.capitalize(values.firstName),
                lastName: _.capitalize(values.lastName),
                zip: _.capitalize(values.zip),
                pantryId: globalState.user.pantry.id,
              });

              setPossibleClients(possibleClients);
              if (!hasSearched) {
                setHasSearched(true);
              }
            }
          }}
        >
          {({ handleBlur, handleChange, handleSubmit, values }) => (
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="firstName"
                    label="First Name (Optional)"
                    name="firstName"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    type="string"
                    value={values.firstName}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="lastName"
                    label="Last Name (Optional)"
                    name="lastName"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    type="string"
                    value={values.lastName}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="zip"
                    label="Zip Code (Optional)"
                    name="zip"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    type="number"
                    value={values.zip}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                style={{
                  backgroundColor: !(
                    values.firstName ||
                    values.lastName ||
                    values.zip
                  )
                    ? COLORS.surface
                    : COLORS.primary,
                  color: COLORS.buttonTextColor,
                }}
                className={classes.submit}
                disabled={!(values.firstName || values.lastName || values.zip)}
              >
                Lookup Client
              </Button>
              {errorMessage ? (
                <StyledText style={{ color: COLORS.buttonNegativeColor }}>
                  {errorMessage}
                </StyledText>
              ) : null}
            </form>
          )}
        </Formik>

        {possibleClients.length ? (
          <Grid container spacing={2}>
            <PossibleClientRow type={"header"} />
            {possibleClients.map((client) => {
              return (
                <PossibleClientRow
                  key={client.id}
                  type={"client"}
                  client={client}
                />
              );
            })}
          </Grid>
        ) : hasSearched ? (
          <StyledText style={{ color: COLORS.buttonNegativeColor }}>
            No Clients Found
          </StyledText>
        ) : null}
        {globalState.user && globalState.user.isAdmin ? (
          <Button
            type="submit"
            fullWidth
            variant="contained"
            style={{
              backgroundColor: COLORS.primary,
              color: COLORS.buttonTextColor,
              marginTop: 16,
            }}
            onClick={() => history.push("/reports")}
          >
            Reports
          </Button>
        ) : null}
      </div>
    </Container>
  );
}

function PossibleClientRow(
  p:
    | {
        type: "header";
      }
    | {
        type: "client";
        client: Client;
      }
) {
  return (
    <>
      <Grid item xs={3}>
        <StyledText variant={p.type === "header" ? "bold" : undefined}>
          {p.type === "header" ? "Client ID" : p.client.id}
        </StyledText>
      </Grid>
      <Grid item xs={3}>
        <StyledText variant={p.type === "header" ? "bold" : undefined}>
          {p.type === "header" ? "First Name" : p.client.firstName}
        </StyledText>
      </Grid>
      <Grid item xs={3}>
        <StyledText variant={p.type === "header" ? "bold" : undefined}>
          {p.type === "header" ? "Last Name" : p.client.lastName}
        </StyledText>
      </Grid>
      <Grid item xs={3}>
        <StyledText variant={p.type === "header" ? "bold" : undefined}>
          {p.type === "header" ? "Zip Code" : p.client.zip}
        </StyledText>
      </Grid>
    </>
  );
}
