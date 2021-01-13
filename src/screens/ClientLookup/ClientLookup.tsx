import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import SearchIcon from "@material-ui/icons/Search";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Formik } from "formik";
import { COLORS } from "../../constants/COLORS";
import { StyledText } from "../../components/StyledText";
import { lookupClient } from "../../api/client/lookupClient";
import { Client } from "../../models/client.schema";
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

export function ClientLookup() {
  const classes = useStyles();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [possibleClients, setPossibleClients] = useState<Client[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  return (
    <Container component="main" maxWidth="sm" style={{ marginBottom: 48 }}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <SearchIcon />
        </Avatar>
        <Typography variant="h5">Lookup Client</Typography>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            zip: "",
          }}
          onSubmit={async (values) => {
            setErrorMessage("");
            setSuccessMessage("");

            const possibleClients = await lookupClient({
              firstName: _.capitalize(values.firstName),
              lastName: _.capitalize(values.lastName),
              zip: _.capitalize(values.zip),
            });

            setPossibleClients(possibleClients);
            if (!hasSearched) {
              setHasSearched(true);
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
                    label="First Name"
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
                    label="Last Name"
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
                    label="Zip Code"
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
              {successMessage ? (
                <StyledText style={{ color: COLORS.buttonPositiveColor }}>
                  {successMessage}
                </StyledText>
              ) : null}
            </form>
          )}
        </Formik>

        {possibleClients.length ? (
          <Grid container spacing={2}>
            <PossibleClientRow type={"header"} />
            {possibleClients.map((client) => {
              return <PossibleClientRow type={"client"} client={client} />;
            })}
          </Grid>
        ) : hasSearched ? (
          <StyledText style={{ color: COLORS.buttonNegativeColor }}>
            No Clients Found
          </StyledText>
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
