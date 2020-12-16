import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Entypo, AntDesign, Ionicons } from "@expo/vector-icons";
import HomeScreen from "./../screens/HomeScreen";
import NotificationScreen from "./../screens/NotificationScreen";

const HomeTab = createMaterialBottomTabNavigator();

const HomeTabScreen = () => {
  return (
    <HomeTab.Navigator initialRouteName="Home"   activeColor="#f0edf6"
    inactiveColor="#fff"
    barStyle={{ backgroundColor: "#ff9800" }}>
      <HomeTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarColor:"#ff9800",
          tabBarLabel: "Home",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Entypo name="home" color="white" size={26} />
            ) : (
              <AntDesign name="home" color="white" size={22} />
            ),
        }}
      />
      
      <HomeTab.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
          tabBarColor:"#ff9800",
          tabBarLabel: "Notifications",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="ios-notifications" size={26} color="white" />
            ) : (
              <Ionicons
                name="ios-notifications-outline"
                size={22}
                color="white"
              />
            ),
        }}
      />
    </HomeTab.Navigator>
  );
};

export default HomeTabScreen;
