import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Card, Button, Text, Avatar, Input } from "react-native-elements";
import PostCard from "./../components/PostCard";
import HeaderHome from "../components/HeaderHome";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { AuthContext } from "../providers/AuthProvider";
import { useNetInfo } from "@react-native-community/netinfo";
import * as firebase from "firebase";
import "firebase/firestore";


const HomeScreen = (props) => {
  /*const netinfo = useNetInfo();
  if (netinfo.type != "unknown" && !netinfo.isInternetReachable) {
    alert("No Internet!");
  } */
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");

  const loadPosts = async () => {
    setLoading(true);
    firebase
      .firestore()
      .collection('posts')
      .orderBy("createdAt","desc")
      .onSnapshot((querySnapshot) => {
        let p_arr = [];
        querySnapshot.forEach((doc) => {
          p_arr.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setPosts(p_arr);
        setLoading(false);
      }).catch((error) => {
        setLoading(false);
        alert(error);
      });
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <AuthContext.Consumer>
      {(auth) => (
        <View style={styles.viewStyle}>
          <HeaderHome
            DrawerFunction={() => {
              props.navigation.toggleDrawer();
            }}
          />
          <Card>
            <Input
              placeholder="What's On Your Mind?"
              leftIcon={<Entypo name="pencil" size={24} color="black" />}
              onChangeText={(currentText) => {
                setInput(currentText);
              }}
            />
            <Button
              title="Post"
              type="outline"
              onPress={function () {
                setLoading(false);
                firebase
                  .firestore()
                  .collection('posts')
                  .add({
                    userId: auth.CurrentUser.uid,
                    body: input,
                    author: auth.CurrentUser.displayName,
                    createdAt: firebase.firestore.Timestamp.now(),
                    likes: [],
                    comments: []
                  }).then(function (doc) {
                    alert("Post created with ID: " + doc.id);
                  }).catch((error) => {
                    setLoading(false);
                    alert(error);
                  })
              }}
            />
          </Card>
          <ActivityIndicator size="large" color="red" animating={loading} />

          <FlatList
            data={posts}
            renderItem={({ item }) => {
              return (
                <PostCard
                  author={item.data.author}
                  title={item.id}
                  body={item.data.body}
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

export default HomeScreen;
