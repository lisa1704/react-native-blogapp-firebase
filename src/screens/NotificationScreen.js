import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Card, Avatar } from "react-native-elements";
import HeaderHome from "./../components/HeaderHome";
import { AuthContext } from "../providers/AuthProvider";
import { useRoute } from '@react-navigation/native';
import * as firebase from "firebase";
import NotificationCard from "./../components/NotificationCard";
import "firebase/firestore";
import { FlatList } from "react-native-gesture-handler";


const NotificationScreen = (props) => {
  const [notifArr, setNotifArr] = useState([]);
  const route = useRoute();

  const loadNotifications = async () => {
    firebase
      .firestore()
      .collection("notification")
      .orderBy("created_at", "desc")
      .onSnapshot((querySnapshot) => {
        let nArr = [];
        querySnapshot.forEach((doc) => {
          nArr.push({
            id: doc.id,
            data: doc.data()
          });
        });
        setNotifArr(nArr);
      }).catch((error) => {
        alert(error);
      });

  };
  useEffect(() => {
    loadNotifications();
  }, []);

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
          <FlatList
          data={notifArr}
          renderItem={({item})=>{
            return(
              <NotificationCard
              author={item.data.author}
              type={item.data.type}
              />
            );
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
});

export default NotificationScreen;
