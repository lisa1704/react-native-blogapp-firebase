import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStackScreen from "./src/navigation/AuthStack";
import AppDrawerScreen from "./src/navigation/AppDrawer";
import { AuthContext, AuthProvider } from "./src/providers/AuthProvider";
import * as firebase from "firebase";
import * as eva from '@eva-design/eva';
//import firebase from 'firebase/app'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDQ1L8cdCs2aP4Rr49VxusQfn6Auq0s2m4",
  authDomain: "blog-app-d2f62.firebaseapp.com",
  databaseURL: "https://blog-app-d2f62-default-rtdb.firebaseio.com/",
  projectId: "blog-app-d2f62",
  storageBucket: "blog-app-d2f62.appspot.com",
  messagingSenderId: "1023239892318",
  appId: "1:1023239892318:web:8e6e51f79afbbd07f8f3cf"
};

if(!firebase.apps.length){
firebase.initializeApp(firebaseConfig);
}


function App() {
  return (
    <AuthProvider>
      <AuthContext.Consumer>
        {(auth) => (
          <NavigationContainer>
            {auth.IsLoggedIn ? <AppDrawerScreen /> : <AuthStackScreen />}
          </NavigationContainer>
        )}
      </AuthContext.Consumer>
    </AuthProvider>
  );
}

export default App;
