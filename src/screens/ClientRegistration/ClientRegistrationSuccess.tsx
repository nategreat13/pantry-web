import React from "react";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import CheckIcon from "@material-ui/icons/Check";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useClientRegistrationContext } from "./ClientRegistrationState";
import { Button, Typography } from "@material-ui/core";
import { COLORS } from "../../constants/COLORS";
import { StyledText } from "../../components/StyledText";
import { useHistory } from "react-router-dom";

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
  const history = useHistory();

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <CheckIcon />
        </Avatar>
        <StyledText>Success!</StyledText>
        <StyledText>The Client ID is:</StyledText>
        <StyledText style={{ fontSize: 24, marginTop: 12, marginBottom: 12 }}>
          {clientRegistrationState.id}
        </StyledText>
        <StyledText>
          Give this ID to the client and tell them to remember it.
        </StyledText>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          style={{
            backgroundColor: COLORS.primary,
            color: COLORS.buttonTextColor,
            marginTop: 16,
          }}
          onClick={() => {
            history.replace("/pantry/login");
          }}
        >
          Got it
        </Button>
        {/* <Avatar className={classes.avatar}>
          <CheckIcon />
        </Avatar>
        <Typography>Success!</Typography>
        <Typography>Your Client ID is:</Typography>
        <Typography>{clientRegistrationState.id}</Typography> */}
      </div>
    </Container>
  );
}
