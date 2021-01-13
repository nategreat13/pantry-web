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
import { Pantry } from "../../models/pantry.schema";
import { lookupPantry } from "../../api/pantry/lookupPantry";

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

export function PantryLookup() {
  const classes = useStyles();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [possiblePantries, setpossiblePantries] = useState<Pantry[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  return (
    <Container component="main" maxWidth="sm" style={{ marginBottom: 48 }}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <SearchIcon />
        </Avatar>
        <Typography variant="h5">Lookup Pantry</Typography>
        <Formik
          initialValues={{
            name: "",
            zip: "",
          }}
          onSubmit={async (values) => {
            setErrorMessage("");
            setSuccessMessage("");

            const possiblePantries = await lookupPantry({
              name: values.name,
              zip: values.zip,
            });

            setpossiblePantries(possiblePantries);
            if (!hasSearched) {
              setHasSearched(true);
            }
          }}
        >
          {({ handleBlur, handleChange, handleSubmit, values }) => (
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="name"
                    label="Pantry Name"
                    name="name"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    type="string"
                    value={values.name}
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
                  backgroundColor: !(values.name || values.zip)
                    ? COLORS.surface
                    : COLORS.primary,
                  color: COLORS.buttonTextColor,
                }}
                className={classes.submit}
                disabled={!(values.name || values.zip)}
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

        {possiblePantries.length ? (
          <Grid container spacing={2}>
            <PossiblePantryRow type={"header"} />
            {possiblePantries.map((pantry) => {
              return <PossiblePantryRow type={"pantry"} pantry={pantry} />;
            })}
          </Grid>
        ) : hasSearched ? (
          <StyledText style={{ color: COLORS.buttonNegativeColor }}>
            No Pantries Found
          </StyledText>
        ) : null}
      </div>
    </Container>
  );
}

function PossiblePantryRow(
  p:
    | {
        type: "header";
      }
    | {
        type: "pantry";
        pantry: Pantry;
      }
) {
  return (
    <>
      <Grid item xs={3}>
        <StyledText variant={p.type === "header" ? "bold" : undefined}>
          {p.type === "header" ? "Pantry ID" : p.pantry.id}
        </StyledText>
      </Grid>
      <Grid item xs={6}>
        <StyledText variant={p.type === "header" ? "bold" : undefined}>
          {p.type === "header" ? "Pantry Name" : p.pantry.name}
        </StyledText>
      </Grid>
      <Grid item xs={3}>
        <StyledText variant={p.type === "header" ? "bold" : undefined}>
          {p.type === "header" ? "Zip Code" : p.pantry.zip}
        </StyledText>
      </Grid>
    </>
  );
}
