import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeTabScreen from "./../navigation/HomeTab";
import ProfileScreen from "./../screens/ProfileScreen";
import CommentScreen from "./../screens/CommentScreen"

const AppDrawer = createDrawerNavigator();

const AppDrawerScreen = () => {
  return (
    <AppDrawer.Navigator>
      <AppDrawer.Screen name="Home" component={HomeTabScreen} />
      <AppDrawer.Screen name="Profile" component={ProfileScreen} />
      <AppDrawer.Screen name="Comment" component={CommentScreen}/>
    </AppDrawer.Navigator>
  );
};

export default AppDrawerScreen;
