import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Input, Button, Card } from "react-native-elements";
import { AuthContext } from "../providers/AuthProvider";
import * as firebase from "firebase";
import Loading from "./../components/Loading";
import HeaderHome from "../components/HeaderHome";
import { FontAwesome } from '@expo/vector-icons';

const CommentScreen = (props) => {
    const [commentBody, setCommentBody] = useState("");
    return (
        <AuthContext.Consumer>
            {(auth) =>
                <View>
                    <HeaderHome
                        DrawerFunction={() => {
                            props.navigation.toggleDrawer();
                        }}
                    />
                    <View>
                        <Input
                            placeholder="Write a comment"
                            leftIcon={<FontAwesome name="pencil-square-o" size={24} color="black" />}
                            onChangeText={(currentText) => {
                                setCommentBody(currentText);
                            }}
                        />
                        <Button
                        type="outline"
                        title="Post Comment"
                        
                        />
                    </View>

                </View >
            }
        </AuthContext.Consumer>
    );
};
export default CommentScreen;