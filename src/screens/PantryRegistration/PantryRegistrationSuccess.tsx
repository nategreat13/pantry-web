import React from "react";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import CheckIcon from "@material-ui/icons/Check";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Button, Typography } from "@material-ui/core";
import { useHistory, useParams } from "react-router-dom";
import { StyledText } from "../../components/StyledText";
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
    backgroundColor: theme.palette.secondary.main,
  },
}));

export function PantryRegistrationSuccess() {
  const classes = useStyles();
  const { pantryId } = useParams<any>();
  const history = useHistory();

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <CheckIcon />
        </Avatar>
        <StyledText>Success!</StyledText>
        <StyledText>Your Pantry ID is:</StyledText>
        <StyledText style={{ fontSize: 24, marginTop: 12, marginBottom: 12 }}>
          {pantryId}
        </StyledText>
        <StyledText>
          Keep track of this ID, the password, and the admin password.
        </StyledText>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          style={{
            backgroundColor: COLORS.primary,
            color: COLORS.buttonTextColor,
            marginTop: 16,
            marginBottom: 64,
          }}
          onClick={() => {
            history.replace("/pantry/login");
          }}
        >
          Got it
        </Button>
      </div>
    </Container>
  );
}
