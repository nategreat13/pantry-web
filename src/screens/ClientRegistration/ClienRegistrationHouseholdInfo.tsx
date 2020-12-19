import React, { createContext, useContext, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import RegistrationIcon from "@material-ui/icons/Assignment";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Formik } from "formik";
import { Client } from "../../models/client.schema";
import { useClientRegistrationContext } from "./ClientRegistrationState";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";

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
  const [
    clientRegistrationState,
    setClientRegistrationState,
  ] = useClientRegistrationContext();

  const limit = 10;

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <RegistrationIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Household Info
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6">Age</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl variant="filled" className={classes.formControl}>
              <InputLabel id="numKids"># Kids</InputLabel>
              <Select
                labelId="numKids"
                id="numKids"
                type="number"
                value={clientRegistrationState.householdInfo.numkids}
                onChange={(e) => {
                  setClientRegistrationState({
                    householdInfo: {
                      ...clientRegistrationState.householdInfo,
                      ...{ numkids: e.target.value as number },
                    },
                  });
                }}
              >
                {Array.from(Array(limit).keys()).map((val) => {
                  return <MenuItem value={val}>{val}</MenuItem>;
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
                  return <MenuItem value={val}>{val}</MenuItem>;
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
                  return <MenuItem value={val}>{val}</MenuItem>;
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Gender</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
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
                  return <MenuItem value={val}>{val}</MenuItem>;
                })}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
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
                  return <MenuItem value={val}>{val}</MenuItem>;
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Ethnicity</Typography>
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
                  return <MenuItem value={val}>{val}</MenuItem>;
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
                  return <MenuItem value={val}>{val}</MenuItem>;
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
                  return <MenuItem value={val}>{val}</MenuItem>;
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
                  return <MenuItem value={val}>{val}</MenuItem>;
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl variant="filled" className={classes.formControl}>
              <InputLabel id="numOther"># Other</InputLabel>
              <Select
                labelId="numOther"
                id="numOther"
                type="number"
                value={clientRegistrationState.householdInfo.numOther}
                onChange={(e) => {
                  setClientRegistrationState({
                    householdInfo: {
                      ...clientRegistrationState.householdInfo,
                      ...{ numOther: e.target.value as number },
                    },
                  });
                }}
              >
                {Array.from(Array(limit).keys()).map((val) => {
                  return <MenuItem value={val}>{val}</MenuItem>;
                })}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Next
        </Button>
      </div>
    </Container>
  );
}
