import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import ReportsIcon from "@material-ui/icons/Assessment";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { COLORS } from "../../constants/COLORS";
import CircularProgress from "@material-ui/core/CircularProgress";
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
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { getClientCheckinReport } from "../../api/clientCheckIn/getClientCheckinReport";
import { checkInClient } from "../../api/clientCheckIn/checkInClient";
import { CheckInKeys } from "../../models/clientCheckin.schema";

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
  const [csvDataForClientListReport, setCsvDataForClientListReport] = useState<
    any[]
  >([]);
  const [csvDataForCheckinReport, setCsvDataForCheckinReport] = useState<any[]>(
    []
  );
  const [clientListReportErrorMsg, setClientListReportErrorMsg] = useState("");
  const [CheckinReportErrorMsg, setCheckinReportErrorMsg] = useState("");

  const [clientListReportIsLoading, setClientListReportIsLoading] =
    useState(false);
  const [CheckinReportIsLoading, setCheckinReportIsLoading] = useState(false);

  const [startDateMS, setStartDateMS] = useState(
    moment().startOf("M").startOf("D").valueOf()
  );
  const [endDateMS, setEndDateMS] = useState(moment().endOf("D").valueOf());

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
      <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils}>
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
              <KeyboardDatePicker
                style={{ width: "100%" }}
                autoOk={true}
                showTodayButton={true}
                value={moment(startDateMS).toDate()}
                format="YYYY-MM-DD"
                onChange={(newDate) => {
                  if (newDate?.valueOf()) {
                    setStartDateMS(
                      moment(newDate.valueOf()).startOf("D").valueOf()
                    );
                  }
                }}
                maxDate={moment()}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <KeyboardDatePicker
                style={{ width: "100%" }}
                autoOk={true}
                showTodayButton={true}
                value={moment(endDateMS).toDate()}
                format="YYYY-MM-DD"
                onChange={(newDate) => {
                  if (newDate?.valueOf()) {
                    setEndDateMS(
                      moment(newDate.valueOf()).endOf("D").valueOf()
                    );
                  }
                }}
                maxDate={moment()}
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
                  setCheckinReportIsLoading(true);
                  try {
                    const clientCheckinsAndClient =
                      await getClientCheckinReport({
                        pantryId: globalState.user.pantry.id,
                        startDateMS,
                        endDateMS,
                      });
                    let numAdults = 0;
                    let numKids = 0;
                    let numSeniors = 0;
                    let numMales = 0;
                    let numFemales = 0;
                    let numOtherGender = 0;
                    let numWhite = 0;
                    let numBlack = 0;
                    let numHispanic = 0;
                    let numAsian = 0;
                    let numOtherEthnicity = 0;
                    if (clientCheckinsAndClient.length) {
                      const data = clientCheckinsAndClient.map(
                        (checkinAndClient) => {
                          /*
                          numAdults +=
                            checkinAndClient.client.householdInfo.numAdults ??
                            0;
                          numKids +=
                            checkinAndClient.client.householdInfo.numKids ?? 0;
                          numSeniors +=
                            checkinAndClient.client.householdInfo.numSeniors ??
                            0;
                          numMales +=
                            checkinAndClient.client.householdInfo.numMales ?? 0;
                          numFemales +=
                            checkinAndClient.client.householdInfo.numFemales ??
                            0;
                          numOtherGender +=
                            checkinAndClient.client.householdInfo
                              .numOtherGender ?? 0;
                          numWhite +=
                            checkinAndClient.client.householdInfo.numWhite ?? 0;
                          numBlack +=
                            checkinAndClient.client.householdInfo.numBlack ?? 0;
                          numHispanic +=
                            checkinAndClient.client.householdInfo.numHispanic ??
                            0;
                          numAsian +=
                            checkinAndClient.client.householdInfo.numAsian ?? 0;
                          numOtherEthnicity +=
                            checkinAndClient.client.householdInfo
                              .numOtherEthnicity ?? 0;
                              */
                          const { clientCheckIn, client } = checkinAndClient;
                          const clientCheckInData: any = { ...clientCheckIn };
                          const clientData: any = _.merge(
                            client,
                            client.householdInfo
                          );
                          delete clientData.householdInfo;
                          delete clientData.registeredPantries;
                          clientData.registrationDate = moment(
                            clientData.registrationDate
                          ).format("MM-DD-YYYY");
                          clientCheckInData.checkinDate = moment(
                            clientCheckInData.checkinDate
                          ).format("MM-DD-YYYY");
                          delete clientCheckInData.id;

                          return _.merge(clientData, clientCheckInData);
                        }
                      );
                      setCsvDataForCheckinReport(data);
                    } else {
                      setCsvDataForCheckinReport([]);
                      setCheckinReportErrorMsg("No Results");
                    }
                  } catch (e) {
                    console.log(e);
                    setCsvDataForCheckinReport([]);
                    setCheckinReportErrorMsg("Something went wrong");
                  }
                  setCheckinReportIsLoading(false);
                }
              }}
            >
              Get Client Checkin Report
            </Button>
            <View
              style={{
                width: "100%",
                alignItems: "center",
              }}
            >
              {CheckinReportIsLoading ? (
                <CircularProgress style={{ marginTop: 16 }} />
              ) : csvDataForCheckinReport.length ? (
                <CSVLink
                  style={{ marginTop: 16 }}
                  data={csvDataForCheckinReport}
                  headers={[
                    ...ClientKeys.filter(
                      (key) => key !== "registeredPantries"
                    ).map((key) => ({ key, label: key })),
                    ...CheckInKeys.filter((key) => key !== "id").map((key) => ({
                      key,
                      label: key,
                    })),
                  ]}
                  filename={"checkin_report.csv"}
                >
                  {`Download Result File`}
                </CSVLink>
              ) : CheckinReportErrorMsg ? (
                <StyledText style={{ color: "red", marginTop: 16 }}>
                  {CheckinReportErrorMsg}
                </StyledText>
              ) : null}
            </View>
            <Button
              fullWidth
              variant="contained"
              style={{
                backgroundColor: COLORS.primary,
                color: COLORS.buttonTextColor,
                marginTop: 64,
              }}
              onClick={async () => {
                if (globalState.user) {
                  setClientListReportIsLoading(true);
                  try {
                    const clients = await getAllPantryClients({
                      pantryId: globalState.user.pantry.id,
                    });
                    if (clients.length) {
                      const data = clients.map((client) => {
                        const clientData: any = _.merge(
                          client,
                          client.householdInfo
                        );
                        delete clientData.householdInfo;
                        delete clientData.registeredPantries;
                        clientData.registrationDate = moment(
                          clientData.registrationDate
                        ).format("MM-DD-YYYY");
                        return clientData;
                      });
                      setCsvDataForClientListReport(data);
                    } else {
                      setCsvDataForClientListReport([]);
                      setClientListReportErrorMsg("No Results");
                    }
                  } catch (e) {}
                  setClientListReportIsLoading(false);
                }
              }}
            >
              Get Master Client List
            </Button>
          </Grid>
          {clientListReportIsLoading ? (
            <CircularProgress style={{ marginTop: 16 }} />
          ) : csvDataForClientListReport.length ? (
            <CSVLink
              style={{ marginTop: 16 }}
              data={csvDataForClientListReport}
              headers={ClientKeys.filter(
                (key) => key !== "registeredPantries"
              ).map((key) => ({ key, label: key }))}
              filename={"client_list.csv"}
            >
              {`Download Result File`}
            </CSVLink>
          ) : clientListReportErrorMsg ? (
            <StyledText style={{ color: "red", marginTop: 24 }}>
              {clientListReportErrorMsg}
            </StyledText>
          ) : null}
        </div>
      </MuiPickersUtilsProvider>
    </Container>
  );
}
