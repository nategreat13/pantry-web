import React from "react";
import { TouchableOpacity, View } from "react-native-web";
import { COLORS } from "../constants/COLORS";
import { StyledText } from "./StyledText";
import LockIcon from "@material-ui/icons/Lock";
import LogoutIcon from "@material-ui/icons/ArrowBack";
import { useHistory } from "react-router-dom";
import { useGlobalContext } from "../global/globalState";
import HomeIcon from "@material-ui/icons/Home";
import { useMediaQuery, useTheme } from "@material-ui/core";

export function Header(p: {}) {
  const history = useHistory();
  const [globalState, setGlobalState] = useGlobalContext();
  const theme = useTheme();
  const isMobileDevice = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <View
      style={{
        backgroundColor: COLORS.primary,
        height: 100,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={{ position: "absolute", top: 0, left: 0, padding: 20 }}>
        <TouchableOpacity
          onPress={() => {
            history.push("/home");
          }}
        >
          <HomeIcon style={{ color: COLORS.onPrimary }} />
        </TouchableOpacity>
      </View>
      <StyledText
        style={{ color: COLORS.onPrimary, fontSize: isMobileDevice ? 18 : 36 }}
      >
        Pantry Manager
      </StyledText>
      <View
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          height: 100,
          padding: 20,
        }}
      >
        {!globalState.user ? (
          <TouchableOpacity
            style={{
              flexDirection: "row",
              display: "flex",
              alignItems: "center",
            }}
            onPress={() => {
              history.push("/pantry/login");
            }}
          >
            <LockIcon style={{ color: COLORS.onPrimary }} />
            <StyledText style={{ color: COLORS.onPrimary, marginLeft: 8 }}>
              Log In
            </StyledText>
          </TouchableOpacity>
        ) : (
          <View>
            <StyledText
              style={{ color: COLORS.onPrimary, marginBottom: 4 }}
            >{`${globalState.user.firstName} ${globalState.user.lastName}`}</StyledText>
            <StyledText style={{ color: COLORS.onPrimary, marginBottom: 4 }}>
              {globalState.user.pantry.name}
            </StyledText>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                display: "flex",
                alignItems: "center",
              }}
              onPress={() => {
                setGlobalState({
                  user: undefined,
                });
              }}
            >
              <LogoutIcon style={{ color: COLORS.onPrimary }} />
              <StyledText style={{ color: COLORS.onPrimary, marginLeft: 8 }}>
                Log Out
              </StyledText>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}
