import React from "react";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import CheckIcon from "@material-ui/icons/Check";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useClientRegistrationContext } from "./ClientRegistrationState";
import { Typography } from "@material-ui/core";
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
}));

export function ClientRegistrationSuccess() {
  const classes = useStyles();
  const [clientRegistrationState] = useClientRegistrationContext();

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <CheckIcon />
        </Avatar>
        <Typography>Success!</Typography>
        <Typography>Your Client ID is:</Typography>
        <Typography>{clientRegistrationState.id}</Typography>
      </div>
    </Container>
  );
}
