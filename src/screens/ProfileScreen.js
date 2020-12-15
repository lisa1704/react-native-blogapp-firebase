import { useRoute } from "@react-navigation/native";
import React, { useState } from "react"
import { Text, StyleSheet, View, Image, TouchableOpacity, TouchableNativeFeedback, Alert, FlatList } from "react-native"
import { Input, Button, Card, Tile, Header, Avatar } from 'react-native-elements';
import { AuthContext } from "../providers/AuthProvider";
import HeaderHome from "./../components/HeaderHome";
import PhotoComponent from "./../components/PhotoComponent";
import { MaterialIcons, Feather, AntDesign } from '@expo/vector-icons';
import * as firebase from "firebase";
import "firebase/firestore";


const ProfileScreen = (props) => {
  const route = useRoute();
  return (
    <AuthContext.Consumer>
      {(auth) => (
        <View style={styles.viewStyle}>
          <HeaderHome
            DrawerFunction={() => {
              props.navigation.toggleDrawer();
            }}
            HeaderHome={route.name}
          />
          <View style={{ justifyContent: "center", alignContent: "center", alignSelf: "center" }}>
            <PhotoComponent />
          </View>
          <Card containerStyle={styles.cardViewStyle}>
            <Text style={{ fontSize: 25, color: 'black' }}> Name: {auth.CurrentUser.displayName} </Text>
            <Text style={{ fontSize: 25, color: 'black' }}> Email: {auth.CurrentUser.email} </Text>
            <Text style={{ fontSize: 25, color: 'black' }}> User ID: {auth.CurrentUser.uid} </Text>
          </Card>
          <Button buttonStyle={{ backgroundColor: 'black', marginTop: 40, width: 250, borderRadius: 10, justifyContent: "center", alignSelf: "center", height: 42 }}
            icon={<MaterialIcons name="delete" size={24} color="white" />}
            title=' Delete Profile'
            titleStyle={{ color: 'black' }}
            type='solid'
            onPress={function () {
              firebase
                .firestore()
                .collection("users")
                .doc(auth.CurrentUser.uid)
                .delete()

              auth.setIsLoggedIn(false);
              auth.setCurrentUser({});
            }}
          />
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
  avatarStyle: {
    backgroundColor: "red",
    alignSelf: "center",
    alignContent: "center",
    flex: 1,
    justifyContent: "center",
  },
  cardViewStyle: {
    borderRadius: 10,
    elevation: 5,
    height: 160,
    width: 330,
    marginTop: 30,
  },
});

export default ProfileScreen;
