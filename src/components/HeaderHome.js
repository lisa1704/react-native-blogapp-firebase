import React from "react";
import { Header } from "react-native-elements";
import * as firebase from "firebase";
import { AuthContext } from "../providers/AuthProvider";
const HeaderHome = (props) => {
  return (
    <AuthContext.Consumer>
      {(auth) => (
        <Header
          placement="left"
          leftComponent={{
            icon: "menu",
            color: "#fff",
            onPress: props.DrawerFunction,
          }}
          centerComponent={{ text: props.Header, style: { color: "#fff", fontSize: 18 } }}
          rightComponent={{
            icon: "lock-outline",
            color: "#fff",
            onPress: function () {
              firebase
                .auth()
                .signOut()
                .then(() => {
                  auth.setIsLoggedIn(false);
                  auth.setCurrentUser({});
                })
                .catch((error) => {
                  alert(error);
                })
            }
          }}
          containerStyle={{
            backgroundColor: '#ff9800',
            justifyContent: 'space-around',
          }}
          statusBarProps={{ barStyle: 'light-content' }}
          barStyle="light-content"
        />
      )}
    </AuthContext.Consumer>
  );
};

export default HeaderHome;
