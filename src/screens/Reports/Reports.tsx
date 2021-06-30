import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import ReportsIcon from "@material-ui/icons/Assessment";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { COLORS } from "../../constants/COLORS";
import { Client, ClientKeys } from "../../models/client.schema";
import _ from "lodash";
import { useHistory } from "react-router-dom";
import { TouchableOpacity, View } from "react-native-web";
import csv from "csvtojson";
import { StyledText } from "../../components/StyledText";
import { useGlobalContext } from "../../global/globalState";
import { registerClient } from "../../api/client/registerClient";
import { CSVLink } from "react-csv";
import moment from "moment";
import { Button, TextField, Grid } from "@material-ui/core";
import { getAllPantryClients } from "../../api/client/getAllPantryClients";

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
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export function Reports() {
  const classes = useStyles();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [globalState, setGlobalState] = useGlobalContext();
  const [csvData, setCSVData] = useState<any[]>([]);

  const [clientListStartDate, setClientListStartDate] = useState(
    moment().startOf("M").valueOf()
  );

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      if (user) {
        setGlobalState({ user });
      }
    }
  }, []);

  return (
    <Container component="main" maxWidth="sm" style={{ marginBottom: 48 }}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <ReportsIcon />
        </Avatar>
        <Typography variant="h5">Reports</Typography>

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
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              id="date-local"
              label="Next appointment"
              type="date"
              defaultValue="2017-05-24"
              value={moment(clientListStartDate).toDate()}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Button
            fullWidth
            variant="contained"
            style={{
              backgroundColor: COLORS.primary,
              color: COLORS.buttonTextColor,
              marginTop: 16,
            }}
            onClick={async () => {
              if (globalState.user) {
              }
            }}
          >
            Get Client Checkin Report
          </Button>
          <Button
            fullWidth
            variant="contained"
            style={{
              backgroundColor: COLORS.primary,
              color: COLORS.buttonTextColor,
              marginTop: 16,
            }}
            onClick={async () => {
              if (globalState.user) {
                const clients = await getAllPantryClients({
                  pantryId: globalState.user.pantry.id,
                });
                console.log(clients.length);
                if (clients.length) {
                  const data = clients.map((client) => {
                    const clientData: any = _.merge(
                      client,
                      client.householdInfo
                    );
                    delete clientData.householdInfo;
                    clientData.registrationDate = moment(
                      clientData.registrationDate
                    ).format("MM-DD-YYYY");
                    return clientData;
                  });
                  setCSVData(data);
                }
              }
            }}
          >
            Get Current Client List
          </Button>
        </Grid>
        {csvData.length ? (
          <CSVLink
            style={{ marginTop: 16 }}
            data={csvData}
            headers={ClientKeys.map((key) => ({ key, label: key }))}
            filename={"client_upload_results.csv"}
          >
            {`Download Result File`}
          </CSVLink>
        ) : null}
      </div>
    </Container>
  );
}
