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
import { View } from "react-native-web";
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
  const [globalState, setGlobalState] = useGlobalContext();

  return (
    <Container component="main" maxWidth="sm">
      {/* <CssBaseline /> */}
      <div className={classes.paper}>
        <Grid container spacing={2} style={{ marginTop: 12 }}>
          {!globalState.user ? (
            <Grid item xs={12}>
              <Button
                style={{
                  backgroundColor: COLORS.primary,
                  color: COLORS.buttonTextColor,
                  marginRight: mobileDevice ? 0 : 16,
                  marginBottom: mobileDevice ? 16 : 0,
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
          {!globalState.user ? (
            <Grid item xs={12}>
              <Button
                style={{
                  backgroundColor: COLORS.primary,
                  color: COLORS.buttonTextColor,
                  marginRight: mobileDevice ? 0 : 16,
                  marginBottom: mobileDevice ? 16 : 0,
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
          {!globalState.user ? (
            <Grid item xs={12}>
              <Button
                style={{
                  backgroundColor: COLORS.primary,
                  color: COLORS.buttonTextColor,
                  marginRight: mobileDevice ? 0 : 16,
                  marginBottom: mobileDevice ? 16 : 0,
                  width: "100%",
                }}
              >
                Pantry Admin Login
              </Button>
            </Grid>
          ) : null}

          <Grid item xs={12}>
            <Button
              style={{
                backgroundColor: COLORS.primary,
                color: COLORS.buttonTextColor,
                marginBottom: mobileDevice ? 16 : 0,
                width: "100%",
              }}
              onClick={() => {
                history.push("/client/register");
              }}
            >
              Client Registration
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              style={{
                backgroundColor: COLORS.primary,
                color: COLORS.buttonTextColor,
                marginBottom: mobileDevice ? 16 : 0,
                width: "100%",
              }}
              onClick={() => {
                history.push("/client/checkin");
              }}
            >
              Client Check-in
            </Button>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}
