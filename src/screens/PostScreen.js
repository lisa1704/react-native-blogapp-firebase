import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Input, Button, Card } from "react-native-elements";
import { AuthContext } from "../providers/AuthProvider";
import * as firebase from "firebase";
import Loading from "../components/Loading";
import HeaderHome from "../components/HeaderHome";
import { FontAwesome } from '@expo/vector-icons';
import PostAuthor from "./../components/PostAuthor";
import { FlatList } from "react-native-gesture-handler";
import { TouchableOpacity } from "react-native";
import CommentCard from "../components/CommentCard";
import { useRoute } from '@react-navigation/native';

const PostScreen = (props) => {
    const [postComment, setPostComment] = useState("");
    const [postCommentData, setPostCommentData] = useState([]);
    const [commentCounter, setCommentCounter] = useState(0);
    const [counter, setCounter] = useState(0);
    const [like, setLike] = useState(0);
    const input = React.createRef();
    const route = useRoute();

    const loadComments = async () => {
        firebase
            .firestore()
            .collection("posts")
            .doc(props.route.params.title)
            .collection("postcomments")
            .orderBy("createdAt", "desc")
            .onSnapshot((querySnapshot) => {
                let cArr = [];
                querySnapshot.forEach((doc) => {
                    cArr.push({
                        id: doc.id,
                        data: doc.data()
                    });
                });
                setPostCommentData(cArr);
                setCommentCounter(querySnapshot.size);
            }).catch((error) => {
                alert(error);
            });

    };
    useEffect(() => {
        loadComments();
    }, []);

    return (
        <AuthContext.Consumer>
            {(auth) => (
                <View>
                    <HeaderHome
                        DrawerFunction={() => {
                            props.navigation.toggleDrawer();
                        }}
                        Header={route.name}
                    />
                    <PostAuthor
                        name={props.route.params.name}
                        postbody={props.route.params.post}
                        date={props.route.params.date}
                        likecount={props.route.params.likecount}
                        commentcount={commentCounter}
                    />
                    <Card style={styles.cardViewStyle}>
                        <View>
                            <Input
                                placeholder="Write a comment"
                                leftIcon={<FontAwesome name="pencil-square-o" size={24} color="black" />}
                                onChangeText={(currentText) => {
                                    setPostComment(currentText);
                                }}
                            />
                        </View>
                        <View>
                            <Button
                                type="outline"
                                title="Comment"
                                onPress={() => {
                                    firebase
                                        .firestore()
                                        .collection('posts')
                                        .add({
                                            userId: auth.CurrentUser.uid,
                                            body: input,
                                            author: auth.CurrentUser.displayName,
                                            createdAt: firebase.firestore.Timestamp.now(),

                                        }).then(function (doc) {
                                            alert("Comment ID: " + doc.id);
                                        }).catch((error) => {
                                            alert(error);
                                        });

                                    firebase
                                        .firestore()
                                        .collection("notification")
                                        .add({
                                            type: "commented",
                                            author: auth.CurrentUser.displayName,
                                            createdAt: firebase.firestore.Timestamp.now()
                                        })

                                }}
                            />
                        </View>

                    </Card>
                    <FlatList
                        data={postCommentData}
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity
                                    onLongPress={() => {
                                        Alert.alert(
                                            "Delete the comment?",
                                            "Press OK to delete",
                                            [{
                                                text: "Cancel",
                                                onPress: () => { console.log("Cancel pressed"); },
                                                style: "cancel"
                                            },
                                            {
                                                text: "OK",
                                                onPress: () => {
                                                    if (auth.CurrentUser.uid == item.data.userId) {
                                                        firebase
                                                            .firestore()
                                                            .collection("posts")
                                                            .doc(props.route.params.title)
                                                            .collection("postcomments")
                                                            .doc(item.id)
                                                            .delete()
                                                    } else {
                                                        alert("You're not the author of this comment");
                                                    }
                                                }
                                            }
                                            ],
                                            { cancelable: false }
                                        );
                                    }}
                                >
                                    <CommentCard
                                        name={item.data.author}
                                        comment={item.data.body}
                                        date={item.data.createdAt}
                                    />
                                </TouchableOpacity>
                            );
                        }}
                    />
                </View>
            )}
        </AuthContext.Consumer>
    );

};

const styles = StyleSheet.create(
    {

        cardViewStyle: {
            borderRadius: 10,
            elevation: 5,
            height: 170,
            width: 330,


        },

    }
)
export default PostScreen;