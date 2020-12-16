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
            Header={route.name}
          />
          <View style={{ justifyContent: "center", alignContent: "center", alignSelf: "center" }}>
            <PhotoComponent />
          </View>
          <Text style={styles.space}></Text>
          <Card containerStyle={styles.cardViewStyle}>
            <Text style={{ fontSize: 20, color: 'black' }}>Name: {auth.CurrentUser.displayName} </Text>
            <Text style={styles.space}></Text>
            <Text style={{ fontSize: 20, color: 'black' }}>Email: {auth.CurrentUser.email} </Text>
            <Text style={styles.space}></Text>
            <Text style={{ fontSize: 20, color: 'black' }}>User ID: {auth.CurrentUser.uid} </Text>
            <Text style={styles.space}></Text>
          </Card>
          <Button buttonStyle={{ backgroundColor: 'orange', marginTop: 10, width: 250, borderRadius: 100, justifyContent: "center", alignSelf: "center", height: 42 }}
            icon={<MaterialIcons name="delete" size={24} color="white" />}
            title=' Delete Profile'
            titleStyle={{ color: 'white' }}
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
    elevation: 10,
    height: 160,
    width: 400,
    marginTop: 30,
    marginBottom:30,
    marginVertical:10,
    alignContent:"center",
    alignSelf:"center"
  },
  space:{
    marginTop:10
  }
});

export default ProfileScreen;
