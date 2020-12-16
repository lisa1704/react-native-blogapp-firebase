import React, { useState } from "react";
import { View, StyleSheet,Image } from "react-native";
import { Input, Button, Card } from "react-native-elements";
import { FontAwesome, Feather, AntDesign } from "@expo/vector-icons";
import { AuthContext } from "../providers/AuthProvider";
import * as firebase from "firebase";
import Loading from "./../components/Loading";
const SignInScreen = (props) => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <AuthContext.Consumer>
        {(auth) => (
          <View style={styles.viewStyle}>
            <Image source={require('G:/3-2 2020/Mobile & Web Dev/Social App with firebase/react-native-blogapp-firebase/assets/logo2.png')}
            style = {{ width: 200, height: 200, alignSelf:"center" }}/>
            <Card>
              <Card.Title>Welcome to My Blog!</Card.Title>
              <Card.Divider />
              <Input
                leftIcon={
                  <FontAwesome name="envelope" size={24} color="#ff9800" />
                }
                placeholder="E-mail Address"
                onChangeText={function (currentInput) {
                  setEmail(currentInput);
                }}
              />

              <Input
                placeholder="Password"
                leftIcon={<Feather name="key" size={24} color="#ff9800" />}
                secureTextEntry={true}
                onChangeText={function (currentInput) {
                  setPassword(currentInput);
                }}
              />

              <Button
                icon={<AntDesign name="login" size={24} color="white" />}
                title="  Sign In!"
                raised
                buttonStyle={{ borderRadius: 100, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor: "#ff9800" }}
                onPress={() => {
                  setIsLoading(true);
                  firebase
                    .auth()
                    .signInWithEmailAndPassword(Email, Password)
                    .then((userCreds) => {
                      setIsLoading(false);
                      auth.setIsLoggedIn(true);
                      auth.setCurrentUser(userCreds.user);
                    })
                    .catch((error) => {
                      setIsLoading(false);
                      alert(error);
                    })
                }}
              />
              <Button
                type="clear"
                buttonStyle={{ borderRadius: 100, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor: "white" }}
                icon={<AntDesign name="user" size={24} color="#ff9800" />}
                title="  Don't have an account?"
                titleStyle={{color:"#ff9800"}}
                onPress={function () {
                  props.navigation.navigate("SignUp");
                }}
              />
            </Card>
          </View>
        )}
      </AuthContext.Consumer>
    );
  }
};

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
  },
});
export default SignInScreen;
