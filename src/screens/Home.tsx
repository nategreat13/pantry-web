import {
  Button,
  Theme,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import React, {  } from "react";
import { View } from "react-native-web";
import { useHistory } from "react-router-dom";
import { StyledText } from "../components/StyledText";
import { COLORS } from "../constants/COLORS";

export function Home() {
  const theme = useTheme<Theme>();
  const mobileDevice = useMediaQuery(theme.breakpoints.down("sm"));
  let history = useHistory();
  // const [redirect, setRedirect] = useState("");

  // if (redirect) {
  //   return <Redirect to={redirect} />;
  // }

  return (
    <View
      style={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <StyledText
        style={{ fontSize: 48, marginTop: 48, color: COLORS.primary }}
      >
        Pantry Manager
      </StyledText>
      <View
        style={{
          marginTop: 48,
          flexDirection: mobileDevice ? "column" : "row",
        }}
      >
        <Button
          style={{
            backgroundColor: COLORS.primary,
            color: COLORS.buttonTextColor,
            marginRight: mobileDevice ? 0 : 16,
            marginBottom: mobileDevice ? 16 : 0,
          }}
          onClick={() => {
            history.push("/pantryRegistration");
          }}
        >
          Pantry Registration
        </Button>
        <Button
          style={{
            backgroundColor: COLORS.primary,
            color: COLORS.buttonTextColor,
            marginRight: mobileDevice ? 0 : 16,
            marginBottom: mobileDevice ? 16 : 0,
          }}
        >
          Pantry Worker Registration
        </Button>
        <Button
          style={{
            backgroundColor: COLORS.primary,
            color: COLORS.buttonTextColor,
            marginBottom: mobileDevice ? 16 : 0,
          }}
          onClick={() => {
            history.push("/clientRegistration");
          }}
        >
          Client Registration
        </Button>
      </View>
    </View>
  );
}
