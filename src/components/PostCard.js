import React from "react";
import { useState, useEffect } from "react";
import { View } from "react-native";
import { Card, Button, Text, Avatar } from "react-native-elements";
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from '@expo/vector-icons';
import * as firebase from "firebase";
import "firebase/firestore";
import { AuthContext } from "./../providers/AuthProvider";
import PostScreen from "./../screens/PostScreen";


const PostCard = (props) => {
  const [likes, setLikes] = useState(0);
  const [press, setPress] = useState(false);
  const stack = useNavigation();


  const loadPostData = async () => {

    firebase
      .firestore()
      .collection("posts")
      .doc(props.docid)
      .collection("postlikes")
      .onSnapshot((querySnapshot) => {
        setLikes(querySnapshot.size)
      })
      .catch((error) => {
        alert(error);
      });
  };
  useEffect(() => {
    loadPostData();
  }, []);

  return (
    <AuthContext.Consumer>
      {(auth) => (
        <View>
          <Card>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Avatar
                containerStyle={{ backgroundColor: "#4caf50" }}
                rounded
                icon={{ name: "user", type: "font-awesome", color: "black" }}
                activeOpacity={1}
              />
              <Text h4Style={{ padding: 10, fontSize: 20 }} h4>
                {props.author}
              </Text>
            </View>

            <Text
              style={{
                paddingVertical: 10,
                fontSize: 18
              }}
            >
              {props.postbody}
            </Text>
            <Card.Divider />
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Button
                type="outline"
                buttonStyle={{ borderRadius: 100, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor: "#fff" }}
                title={"  Like (" + likes.toString() + ")"}
                titleStyle={{ fontSize: 16, color: "black" }}
                raised
                icon={<AntDesign name="heart" size={24} color="black" />}
                onPress={function () {
                  if (press == false) {
                    setPress(true);
                    firebase
                      .firestore()
                      .collection("posts")
                      .doc(props.docid)
                      .collection("postlikes")
                      .doc(auth.CurrentUser.uid)
                      .set({
                        like: 1
                      })
                      .catch((error) => {
                        alert(error);
                      });

                    firebase
                      .firestore()
                      .collection("notification")
                      .add(
                        {
                          type: "liked",
                          author: auth.CurrentUser.displayName,
                          created_at: firebase.firestore.Timestamp.now(),
                        }
                      )
                  } else {
                    setPress(false);
                    firebase
                      .firestore()
                      .collection("posts")
                      .doc(props.docid)
                      .collection("postlikes")
                      .doc(auth.CurrentUser.uid)
                      .delete()

                    firebase
                      .firestore()
                      .collection("notification")
                      .add({
                        type: "disliked",
                        author: auth.CurrentUser.displayName,
                        created_at: firebase.firestore.Timestamp.now(),
                      })
                  }
                }}
              />
              <Button
                type="outline"
                buttonStyle={{ borderRadius: 100, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor: "#fff" }}
                title=" Comment "
                titleStyle={{ fontSize: 16, color: "black" }}
                raised
                containerStyle={{color:"black"}}
                icon={<FontAwesome name="comments" size={24} color="black" />}
                onPress={function () {
                  stack.navigate("PostScreen", { name: props.author, date: props.date, post: props.postbody, docid: props.docid, likecount: likes });
                }}
              />

            </View>
          </Card>
        </View>
      )}
    </AuthContext.Consumer>
  );
};

export default PostCard;
