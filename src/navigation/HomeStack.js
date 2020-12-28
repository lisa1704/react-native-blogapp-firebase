import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./../screens/HomeScreen";
import PostScreen from "./../screens/PostScreen";

const HomeStack = createStackNavigator();
const HomeStackScreen=()=>{
  return(
    <HomeStack.Navigator initialRouteName="Home">
      <HomeStack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}  />
      <HomeStack.Screen name ="PostScreen" component= {PostScreen} options={{headerShown: false}}/>
    </HomeStack.Navigator>
  );
};
export default HomeStackScreen;