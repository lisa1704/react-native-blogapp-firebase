import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Input, Button, Card } from "react-native-elements";
import { FontAwesome, Feather, AntDesign, Ionicons } from "@expo/vector-icons";
import * as firebase from "firebase";
import "firebase/firestore";
import Loading from "./../components/Loading";

const SignUpScreen = (props) => {
  const [Name, setName] = useState("");
  const [SID, setSID] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <View style={styles.viewStyle}>
        <Card>
          <Card.Title>Welcome to My Blog!</Card.Title>
          <Card.Divider />
          <Input
            leftIcon={<Ionicons name="ios-person" size={24} color="#ff9800" />}
            placeholder="Name"
            onChangeText={function (currentInput) {
              setName(currentInput);
            }}
          />
          <Input
            leftIcon={<Ionicons name="ios-school" size={24} color="#ff9800" />}
            placeholder="Student ID"
            onChangeText={function (currentInput) {
              setSID(currentInput);
            }}
          />
          <Input
            leftIcon={<FontAwesome name="envelope" size={24} color="#ff9800" />}
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
            buttonStyle={{ borderRadius: 100, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor: "#ff9800" }}
            icon={<AntDesign name="user" size={24} color="#ff9800" />}
            title="  Sign Up!"
            type="solid"
            onPress={() => {
              if (Name && SID && Email && Password) {
                setIsLoading(true);
                firebase
                  .auth()
                  .createUserWithEmailAndPassword(Email, Password)
                  .then((userCreds) => {
                    userCreds.user.updateProfile({ displayName: Name });
                    firebase
                      .firestore()
                      .collection('users')
                      .doc(userCreds.user.uid)
                      .set({
                        name: Name,
                        sid: SID,
                        email: Email
                      })
                      .then(() => {
                        //alert("Account created");
                        setIsLoading(false);
                        alert("User UID: " + userCreds.user.uid);

                        console.log(userCreds.user);
                        props.navigation.navigate("SignIn");
                      })
                      .catch((error) => {
                        setIsLoading(false);
                        alert(error);
                      });

                  })
                  .catch((error) => {
                    setIsLoading(false);
                    alert(error);
                  });
              } else {
                alert("Fields can't be empty");
              }
            }}
          />
          <Button
            type="clear"
            buttonStyle={{ borderRadius: 100, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor: "white" }}
            icon={<AntDesign name="login" size={24} color="#ff9800" />}
            title="  Already have an account?"
            titleStyle={{ color: "#ff9800" }}
            onPress={function () {
              props.navigation.navigate("SignIn");
            }}
          />
        </Card>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ff9800",
  },
});
export default SignUpScreen;
