import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import RegistrationIcon from "@material-ui/icons/Assignment";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useClientRegistrationContext } from "./ClientRegistrationState";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
} from "@material-ui/core";
import { registerClient } from "../../api/client/registerClient";
import { useHistory } from "react-router-dom";
import { COLORS } from "../../constants/COLORS";
import Checkbox from "@material-ui/core/Checkbox";

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
  formControl: {
    minWidth: 120,
    width: "100%",
    backgroundColor: "white",
  },
}));

export function ClientRegistrationHouseholdInfo() {
  const classes = useStyles();
  const history = useHistory();
  const [
    clientRegistrationState,
    setClientRegistrationState,
  ] = useClientRegistrationContext();
  const [checked, setChecked] = useState(false);

  const limit = 10;

  const numPeopleSelected =
    clientRegistrationState.householdInfo.numAdults +
    clientRegistrationState.householdInfo.numKids +
    clientRegistrationState.householdInfo.numSeniors;

  const numGenderSelected =
    clientRegistrationState.householdInfo.numMales +
    clientRegistrationState.householdInfo.numFemales +
    clientRegistrationState.householdInfo.numOtherGender;

  const numEthnicitySelected =
    clientRegistrationState.householdInfo.numWhites +
    clientRegistrationState.householdInfo.numBlack +
    clientRegistrationState.householdInfo.numAdults +
    clientRegistrationState.householdInfo.numHispanic +
    clientRegistrationState.householdInfo.numOtherEthnicity;

  const isValid =
    checked &&
    numPeopleSelected > 0 &&
    numPeopleSelected === numGenderSelected &&
    numPeopleSelected === numEthnicitySelected;

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <RegistrationIcon />
        </Avatar>
        <Typography variant="h5">Household Info</Typography>
        <Typography style={{ fontSize: 14, marginBottom: 8 }}>
          The total number from each section (age, gender, and ethnicity) must
          be the same.
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6">{`Age (${numPeopleSelected})`}</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl variant="filled" className={classes.formControl}>
              <InputLabel id="numKids"># Kids</InputLabel>
              <Select
                labelId="numKids"
                id="numKids"
                type="number"
                value={clientRegistrationState.householdInfo.numKids}
                onChange={(e) => {
                  setClientRegistrationState({
                    householdInfo: {
                      ...clientRegistrationState.householdInfo,
                      ...{ numKids: e.target.value as number },
                    },
                  });
                }}
              >
                {Array.from(Array(limit).keys()).map((val) => {
                  return (
                    <MenuItem key={val} value={val}>
                      {val}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl variant="filled" className={classes.formControl}>
              <InputLabel id="numAdults"># Adults</InputLabel>
              <Select
                labelId="numAdults"
                id="numAdults"
                type="number"
                value={clientRegistrationState.householdInfo.numAdults}
                onChange={(e) => {
                  setClientRegistrationState({
                    householdInfo: {
                      ...clientRegistrationState.householdInfo,
                      ...{ numAdults: e.target.value as number },
                    },
                  });
                }}
              >
                {Array.from(Array(limit).keys()).map((val) => {
                  return (
                    <MenuItem key={val} value={val}>
                      {val}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl variant="filled" className={classes.formControl}>
              <InputLabel id="numSeniors"># Seniors</InputLabel>
              <Select
                labelId="numSeniors"
                id="numSeniors"
                type="number"
                value={clientRegistrationState.householdInfo.numSeniors}
                onChange={(e) => {
                  setClientRegistrationState({
                    householdInfo: {
                      ...clientRegistrationState.householdInfo,
                      ...{ numSeniors: e.target.value as number },
                    },
                  });
                }}
              >
                {Array.from(Array(limit).keys()).map((val) => {
                  return (
                    <MenuItem key={val} value={val}>
                      {val}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">{`Gender (${numGenderSelected})`}</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl variant="filled" className={classes.formControl}>
              <InputLabel id="numMales"># Males</InputLabel>
              <Select
                labelId="numMales"
                id="numMales"
                type="number"
                value={clientRegistrationState.householdInfo.numMales}
                onChange={(e) => {
                  setClientRegistrationState({
                    householdInfo: {
                      ...clientRegistrationState.householdInfo,
                      ...{ numMales: e.target.value as number },
                    },
                  });
                }}
              >
                {Array.from(Array(limit).keys()).map((val) => {
                  return (
                    <MenuItem key={val} value={val}>
                      {val}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl variant="filled" className={classes.formControl}>
              <InputLabel id="numFemales"># Females</InputLabel>
              <Select
                labelId="numFemales"
                id="numFemales"
                type="number"
                value={clientRegistrationState.householdInfo.numFemales}
                onChange={(e) => {
                  setClientRegistrationState({
                    householdInfo: {
                      ...clientRegistrationState.householdInfo,
                      ...{ numFemales: e.target.value as number },
                    },
                  });
                }}
              >
                {Array.from(Array(limit).keys()).map((val) => {
                  return (
                    <MenuItem key={val} value={val}>
                      {val}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl variant="filled" className={classes.formControl}>
              <InputLabel id="numOthers"># Other</InputLabel>
              <Select
                labelId="numOtherGender"
                id="numOtherGender"
                type="number"
                value={clientRegistrationState.householdInfo.numOtherGender}
                onChange={(e) => {
                  setClientRegistrationState({
                    householdInfo: {
                      ...clientRegistrationState.householdInfo,
                      ...{ numOtherGender: e.target.value as number },
                    },
                  });
                }}
              >
                {Array.from(Array(limit).keys()).map((val) => {
                  return (
                    <MenuItem key={val} value={val}>
                      {val}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">{`Ethnicity (${numEthnicitySelected})`}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl variant="filled" className={classes.formControl}>
              <InputLabel id="numWhites"># White</InputLabel>
              <Select
                labelId="numWhites"
                id="numWhites"
                type="number"
                value={clientRegistrationState.householdInfo.numWhites}
                onChange={(e) => {
                  setClientRegistrationState({
                    householdInfo: {
                      ...clientRegistrationState.householdInfo,
                      ...{ numWhites: e.target.value as number },
                    },
                  });
                }}
              >
                {Array.from(Array(limit).keys()).map((val) => {
                  return (
                    <MenuItem key={val} value={val}>
                      {val}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl variant="filled" className={classes.formControl}>
              <InputLabel id="numBlack"># Black</InputLabel>
              <Select
                labelId="numBlack"
                id="numBlack"
                type="number"
                value={clientRegistrationState.householdInfo.numBlack}
                onChange={(e) => {
                  setClientRegistrationState({
                    householdInfo: {
                      ...clientRegistrationState.householdInfo,
                      ...{ numBlack: e.target.value as number },
                    },
                  });
                }}
              >
                {Array.from(Array(limit).keys()).map((val) => {
                  return (
                    <MenuItem key={val} value={val}>
                      {val}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl variant="filled" className={classes.formControl}>
              <InputLabel id="numHispanic"># Hispanic</InputLabel>
              <Select
                labelId="numHispanic"
                id="numHispanic"
                type="number"
                value={clientRegistrationState.householdInfo.numHispanic}
                onChange={(e) => {
                  setClientRegistrationState({
                    householdInfo: {
                      ...clientRegistrationState.householdInfo,
                      ...{ numHispanic: e.target.value as number },
                    },
                  });
                }}
              >
                {Array.from(Array(limit).keys()).map((val) => {
                  return (
                    <MenuItem key={val} value={val}>
                      {val}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl variant="filled" className={classes.formControl}>
              <InputLabel id="numAsian"># Asian</InputLabel>
              <Select
                labelId="numAsian"
                id="numAsian"
                type="number"
                value={clientRegistrationState.householdInfo.numAsian}
                onChange={(e) => {
                  setClientRegistrationState({
                    householdInfo: {
                      ...clientRegistrationState.householdInfo,
                      ...{ numAsian: e.target.value as number },
                    },
                  });
                }}
              >
                {Array.from(Array(limit).keys()).map((val) => {
                  return (
                    <MenuItem key={val} value={val}>
                      {val}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl variant="filled" className={classes.formControl}>
              <InputLabel id="numOtherEthnicity"># Other</InputLabel>
              <Select
                labelId="numOtherEthnicity"
                id="numOtherEthnicity"
                type="number"
                value={clientRegistrationState.householdInfo.numOtherEthnicity}
                onChange={(e) => {
                  setClientRegistrationState({
                    householdInfo: {
                      ...clientRegistrationState.householdInfo,
                      ...{ numOtherEthnicity: e.target.value as number },
                    },
                  });
                }}
              >
                {Array.from(Array(limit).keys()).map((val) => {
                  return (
                    <MenuItem key={val} value={val}>
                      {val}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              style={{ display: "flex", alignItems: "flex-start" }}
              control={
                <Checkbox
                  style={{ color: COLORS.primary }}
                  checked={checked}
                  onChange={() => {
                    setChecked(!checked);
                  }}
                  name="checkbox"
                />
              }
              label="I acknowledge that I meet the qualifcation requirements defined by the state that I live in. (Talk to your local food pantry for more information.)"
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          style={{
            backgroundColor: isValid ? COLORS.primary : COLORS.surface,
            color: COLORS.buttonTextColor,
          }}
          disabled={!isValid}
          className={classes.submit}
          onClick={async () => {
            const clientId = await registerClient({
              client: clientRegistrationState,
            });
            setClientRegistrationState({ id: `${clientId}` });
            history.replace("/client/register/success");
          }}
        >
          Register
        </Button>
      </div>
    </Container>
  );
}
