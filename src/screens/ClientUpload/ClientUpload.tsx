import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import UploadIcon from "@material-ui/icons/CloudUpload";
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
import {
  registerClient,
  registerClientWithId,
} from "../../api/client/registerClient";
import { CSVLink } from "react-csv";
import moment from "moment";
import { CircularProgress } from "@material-ui/core";

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

export function ClientUpload() {
  const classes = useStyles();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const history = useHistory();
  const [globalState, setGlobalState] = useGlobalContext();
  const [csvData, setCSVData] = useState<any[]>([]);
  const [numUploaded, setNumUploaded] = useState(0);
  const [totalNumUploading, setTotalNumUploading] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      if (user) {
        setGlobalState({ user });
      }
    }
  }, []);

  function convertStringToEachFirstLetterCapitalized(val: string) {
    return val
      .split(" ")
      .map((a) => _.upperFirst(a.toLowerCase()))
      .join(" ");
  }

  return (
    <Container component="main" maxWidth="sm" style={{ marginBottom: 48 }}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <UploadIcon />
        </Avatar>
        <Typography variant="h5">Upload Client List</Typography>
        <View style={{ width: "100%" }}>
          <StyledText style={{ marginTop: 4 }}>
            {`* Must be a .csv file`}
          </StyledText>
          <StyledText style={{ marginTop: 4 }}>{`* Fields:`}</StyledText>
          <StyledText style={{ marginTop: 4, marginLeft: 16 }}>
            {`* firstName (required)`}
          </StyledText>
          <StyledText style={{ marginTop: 4, marginLeft: 16 }}>
            {`* lastName (required)`}
          </StyledText>
          <StyledText style={{ marginTop: 4, marginLeft: 16 }}>
            {`* address`}
          </StyledText>
          <StyledText style={{ marginTop: 4, marginLeft: 16 }}>
            {`* address2`}
          </StyledText>
          <StyledText style={{ marginTop: 4, marginLeft: 16 }}>
            {`* city`}
          </StyledText>
          <StyledText style={{ marginTop: 4, marginLeft: 16 }}>
            {`* state`}
          </StyledText>
          <StyledText style={{ marginTop: 4, marginLeft: 16 }}>
            {`* zip`}
          </StyledText>
          <StyledText style={{ marginTop: 4, marginLeft: 16 }}>
            {`* phoneNumber`}
          </StyledText>
          <StyledText style={{ marginTop: 4, marginLeft: 16 }}>
            {`* numAdults`}
          </StyledText>
          <StyledText style={{ marginTop: 4, marginLeft: 16 }}>
            {`* numKids`}
          </StyledText>
          <StyledText style={{ marginTop: 4, marginLeft: 16 }}>
            {`* numSeniors`}
          </StyledText>
          <StyledText style={{ marginTop: 4, marginLeft: 16 }}>
            {`* numMales`}
          </StyledText>
          <StyledText style={{ marginTop: 4, marginLeft: 16 }}>
            {`* numFemales`}
          </StyledText>
          <StyledText style={{ marginTop: 4, marginLeft: 16 }}>
            {`* numOtherGender`}
          </StyledText>
          <StyledText style={{ marginTop: 4, marginLeft: 16 }}>
            {`* numWhite`}
          </StyledText>
          <StyledText style={{ marginTop: 4, marginLeft: 16 }}>
            {`* numBlack`}
          </StyledText>
          <StyledText style={{ marginTop: 4, marginLeft: 16 }}>
            {`* numAsian`}
          </StyledText>
          <StyledText style={{ marginTop: 4, marginLeft: 16 }}>
            {`* numHispanic`}
          </StyledText>
          <StyledText style={{ marginTop: 4, marginLeft: 16 }}>
            {`* numOtherEthnicity`}
          </StyledText>
        </View>
        <input
          id="logo-upload-button"
          multiple={false}
          accept=".csv"
          onChange={async (event) => {
            var file = event.target.files?.[0];
            if (file) {
              setIsUploading(true);
              const csvText = await file.text();

              csv({})
                .fromString(csvText)
                .then(async (data) => {
                  if (!data.length) {
                    setIsUploading(false);
                    return;
                  }

                  if (!globalState.user?.pantry.id) {
                    return;
                  }
                  const keys = Object.keys(data[0]);
                  const missingFields: string[] = [];
                  ["firstName", "lastName", "address"].forEach((key) => {
                    if (!keys.includes(key)) {
                      missingFields.push(key);
                    }
                  });

                  if (missingFields.length) {
                    setErrorMessage(
                      `Missing Fields: ${missingFields.join(", ")}`
                    );
                    setIsUploading(false);
                    return;
                  }

                  // const clientsToAdd: Omit<Client, "registrationDate">[] =
                  //   _.compact(
                  //     data.map((clientData) => {
                  //       if (!clientData.firstName || !clientData.lastName) {
                  //         return;
                  //       }
                  //       return {
                  //         id: clientData.id,
                  //         firstName: convertStringToEachFirstLetterCapitalized(
                  //           clientData.firstName
                  //         ),
                  //         lastName: convertStringToEachFirstLetterCapitalized(
                  //           clientData.lastName
                  //         ),
                  //         address: convertStringToEachFirstLetterCapitalized(
                  //           clientData.address ?? ""
                  //         ),
                  //         address2: convertStringToEachFirstLetterCapitalized(
                  //           clientData.address2 ?? ""
                  //         ),
                  //         city: convertStringToEachFirstLetterCapitalized(
                  //           clientData.city ?? ""
                  //         ),
                  //         phoneNumber:
                  //           convertStringToEachFirstLetterCapitalized(
                  //             clientData.phoneNumber ?? ""
                  //           ),
                  //         state: clientData.state ?? "",
                  //         zip: convertStringToEachFirstLetterCapitalized(
                  //           clientData.zip ?? ""
                  //         ),
                  //         registeredPantries: {
                  //           [globalState.user?.pantry.id ?? ""]: true,
                  //         },
                  //         householdInfo: {
                  //           numAdults: parseInt(clientData.numAdults ?? "0"),
                  //           numKids: parseInt(clientData.numKids ?? "0"),
                  //           numSeniors: parseInt(clientData.numSeniors ?? "0"),
                  //           numMales: parseInt(clientData.numMales ?? "0"),
                  //           numFemales: parseInt(clientData.numFemales ?? "0"),
                  //           numOtherGender: parseInt(
                  //             clientData.numOtherGender ?? "0"
                  //           ),
                  //           numWhite: parseInt(clientData.numWhite ?? "0"),
                  //           numBlack: parseInt(clientData.numBlack ?? "0"),
                  //           numAsian: parseInt(clientData.numAsian ?? "0"),
                  //           numHispanic: parseInt(
                  //             clientData.numHispanic ?? "0"
                  //           ),
                  //           numOtherEthnicity: parseInt(
                  //             clientData.numOtherEthnicity ?? "0"
                  //           ),
                  //         },
                  //       };
                  //     })
                  //   );

                  const clientsToAdd: Omit<
                    Client,
                    "id" | "registrationDate"
                  >[] = _.compact(
                    data.map((clientData) => {
                      if (!clientData.firstName || !clientData.lastName) {
                        return;
                      }
                      return {
                        firstName: convertStringToEachFirstLetterCapitalized(
                          clientData.firstName
                        ),
                        lastName: convertStringToEachFirstLetterCapitalized(
                          clientData.lastName
                        ),
                        address: convertStringToEachFirstLetterCapitalized(
                          clientData.address ?? ""
                        ),
                        address2: convertStringToEachFirstLetterCapitalized(
                          clientData.address2 ?? ""
                        ),
                        city: convertStringToEachFirstLetterCapitalized(
                          clientData.city ?? ""
                        ),
                        phoneNumber: convertStringToEachFirstLetterCapitalized(
                          clientData.phoneNumber ?? ""
                        ),
                        state: clientData.state ?? "",
                        zip: convertStringToEachFirstLetterCapitalized(
                          clientData.zip ?? ""
                        ),
                        registeredPantries: {
                          [globalState.user?.pantry.id ?? ""]: true,
                        },
                        householdInfo: {
                          numAdults: parseInt(clientData.numAdults ?? "0"),
                          numKids: parseInt(clientData.numKids ?? "0"),
                          numSeniors: parseInt(clientData.numSeniors ?? "0"),
                          numMales: parseInt(clientData.numMales ?? "0"),
                          numFemales: parseInt(clientData.numFemales ?? "0"),
                          numOtherGender: parseInt(
                            clientData.numOtherGender ?? "0"
                          ),
                          numWhite: parseInt(clientData.numWhite ?? "0"),
                          numBlack: parseInt(clientData.numBlack ?? "0"),
                          numAsian: parseInt(clientData.numAsian ?? "0"),
                          numHispanic: parseInt(clientData.numHispanic ?? "0"),
                          numOtherEthnicity: parseInt(
                            clientData.numOtherEthnicity ?? "0"
                          ),
                        },
                      };
                    })
                  );

                  setTotalNumUploading(clientsToAdd.length);

                  let numberUploaded = 0;

                  try {
                    const addedClients = _.compact(
                      await Promise.all(
                        clientsToAdd.map(async (clientToAdd) => {
                          const newClient = await registerClient({
                            client: clientToAdd,
                          });
                          numberUploaded++;
                          setNumUploaded(numberUploaded);
                          return newClient;
                        })
                      )
                    );

                    if (addedClients.length) {
                      const data = addedClients.map((client) => {
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
                      setCSVData(data);
                    }
                  } catch (e) {}
                  setIsUploading(false);
                });
            }
          }}
          type="file"
          style={{ display: "none" }}
        />
        <label htmlFor="logo-upload-button">
          <TouchableOpacity
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: 15,
              backgroundColor: COLORS.primary,
              marginTop: 32,
              borderRadius: 8,
              marginBottom: 16,
            }}
            onPress={() => {
              setErrorMessage("");
            }}
          >
            <StyledText style={{ color: COLORS.onPrimary }}>
              Choose File
            </StyledText>
          </TouchableOpacity>
        </label>
        {isUploading ? (
          <>
            <CircularProgress
              size={14}
              style={{ marginLeft: 12, color: COLORS.primary }}
            />
          </>
        ) : null}
        {totalNumUploading && numUploaded ? (
          <StyledText>{`${numUploaded} of ${totalNumUploading} uploaded`}</StyledText>
        ) : null}
        {csvData.length ? (
          <CSVLink
            data={csvData}
            headers={ClientKeys.map((key) => ({ key, label: key }))}
            filename={"client_upload_results.csv"}
          >
            {`Download Result File`}
          </CSVLink>
        ) : null}
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
      </div>
    </Container>
  );
}
