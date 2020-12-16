import React, { useState } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { Card, Button, Text, Avatar, Input, Header } from "react-native-elements";

const NotificationCard = (props) => {
    return (
        <View style={styles.viewStyle}>
            <Card style={styles.cardStyle}>
                <Text style={styles.textStyle}> {props.author} {props.type} the post </Text>
            </Card>
        </View>
    );
};
const styles = StyleSheet.create(
    {
        viewStyle: {
            flex: 1,
        },
        textStyle: {
            fontSize: 15,
            fontWeight: 'bold',
            color: 'black'
        },
        cardStyle: {
            borderRadius: 10,
            elevation: 5,
            height: 50,
            width: 330


        },

    }
);
export default NotificationCard;