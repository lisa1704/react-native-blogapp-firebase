import React from "react";
import { useState, useEffect } from "react";
import { View } from "react-native";
import { Card, Button, Text, Avatar } from "react-native-elements";
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import * as firebase from "firebase";
import "firebase/firestore";
import CommentScreen from "./../screens/CommentScreen";

const PostCard = (props) => {

  return (
    <Card>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Avatar
          containerStyle={{ backgroundColor: "#ffab91" }}
          rounded
          icon={{ name: "user", type: "font-awesome", color: "black" }}
          activeOpacity={1}
        />
        <Text h4Style={{ padding: 10 }} h4>
          {props.author}
        </Text>
      </View>
      <Text style={{ fontStyle: "italic" }}> {props.title}</Text>
      <Text
        style={{
          paddingVertical: 10,
        }}
      >
        {props.body}
      </Text>
      <Card.Divider />
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Button
          type="outline"
          title=" Like "
          icon={<Ionicons name="md-heart-empty" size={24} color="black" />}
        />
        <Button
          type="outline"
          title=" Comment "
          icon={<FontAwesome name="comments" size={24} color="black" />}
          onPress={function () {
            props.navigation.navigate("Comment");
          }}
        />
        <Button
          type="outline"
          title=" Delete "
          icon={<AntDesign name="delete" size={24} color="black" />}
          onPress={(doc) => {
            firebase
              .firestore()
              .collection("posts")
              .doc(doc.id)
              .delete()
              .then(function () {
                alert("Deleted the post with id:", doc.id);
              }).catch((error) => {
                alert(error);
              })

          }}
        />
      </View>
    </Card>
  );
};

export default PostCard;
