import {
  Button,
  Container,
  Grid,
  makeStyles,
  Theme,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import { COLORS } from "../constants/COLORS";
import { useGlobalContext } from "../global/globalState";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

export function Home() {
  const theme = useTheme<Theme>();
  const classes = useStyles();
  const mobileDevice = useMediaQuery(theme.breakpoints.down("sm"));
  let history = useHistory();
  const [globalState] = useGlobalContext();

  return (
    <Container component="main" maxWidth="sm">
      <div className={classes.paper}>
        <Grid container spacing={2}>
          {!globalState.user ? (
            <Grid item xs={12}>
              <Button
                style={{
                  backgroundColor: COLORS.primary,
                  color: COLORS.buttonTextColor,
                  marginRight: mobileDevice ? 0 : 16,

                  width: "100%",
                }}
                onClick={() => {
                  history.push("/pantry/register");
                }}
              >
                Pantry Registration
              </Button>
            </Grid>
          ) : null}
          <Grid item xs={12}>
            <Button
              style={{
                backgroundColor: COLORS.primary,
                color: COLORS.buttonTextColor,

                width: "100%",
              }}
              onClick={() => {
                history.push("/pantry/lookup");
              }}
            >
              Pantry Lookup
            </Button>
          </Grid>
          {!globalState.user ? (
            <Grid item xs={12}>
              <Button
                style={{
                  backgroundColor: COLORS.primary,
                  color: COLORS.buttonTextColor,
                  marginRight: mobileDevice ? 0 : 16,

                  width: "100%",
                }}
                onClick={() => {
                  history.push("/pantry/login");
                }}
              >
                Pantry Login
              </Button>
            </Grid>
          ) : null}
          {/* {!globalState.user ? (
            <Grid item xs={12}>
              <Button
                style={{
                  backgroundColor: COLORS.primary,
                  color: COLORS.buttonTextColor,
                  marginRight: mobileDevice ? 0 : 16,

                  width: "100%",
                }}
              >
                Pantry Admin Login
              </Button>
            </Grid>
          ) : null} */}

          <Grid item xs={12}>
            <Button
              style={{
                backgroundColor: COLORS.primary,
                color: COLORS.buttonTextColor,

                width: "100%",
              }}
              onClick={() => {
                if (globalState.user) {
                  history.push(
                    `/client/register/${globalState.user.pantry.id}`
                  );
                }
              }}
            >
              Client Registration
            </Button>
          </Grid>
          {globalState.user ? (
            <Grid item xs={12}>
              <Button
                style={{
                  backgroundColor: COLORS.primary,
                  color: COLORS.buttonTextColor,

                  width: "100%",
                }}
                onClick={() => {
                  history.push("/client/checkin");
                }}
              >
                Client Check-in
              </Button>
            </Grid>
          ) : null}
          {globalState.user ? (
            <Grid item xs={12}>
              <Button
                style={{
                  backgroundColor: COLORS.primary,
                  color: COLORS.buttonTextColor,

                  width: "100%",
                }}
                onClick={() => {
                  history.push("/client/lookup");
                }}
              >
                Client Lookup
              </Button>
            </Grid>
          ) : null}
        </Grid>
      </div>
    </Container>
  );
}
