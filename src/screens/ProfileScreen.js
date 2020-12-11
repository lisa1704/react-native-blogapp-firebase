import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Card, Avatar } from "react-native-elements";
import { AuthContext } from "../providers/AuthProvider";
import HeaderHome from "./../components/HeaderHome";
const ProfileScreen = (props) => {
  return (
    <AuthContext.Consumer>
      {(auth) => (
        <View style={styles.viewStyle}>
          <HeaderHome
            DrawerFunction={() => {
              props.navigation.toggleDrawer();
            }}
          />
          <View>
            <Avatar
            avatarStyle={styles.avatarStyle}
            rounded
            />
          </View>
        </View>
      )}
    </AuthContext.Consumer>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 30,
    color: "blue",
  },
  viewStyle: {
    flex: 1,
  },
  avatarStyle:{
    backgroundColor:"red",
    alignSelf:"center",
    alignContent:"center",
    flex: 1, 
    justifyContent: "center",
  }
});

export default ProfileScreen;
