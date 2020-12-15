import React, { useState, useEffect } from 'react';
import { Image, View, Platform, StyleSheet,TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';


const PhotoComponent = () => {
    const [image, setImage] = useState( 'https://dummyimage.com/200x300/e0e0e0/e8e8e8.jpg&text=upload');

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
                if (status !== 'granted') {
                    alert('Need Camera and Media Permisson');
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    return (
        
           < View style={{width:200,justifyContent:"center",alignContent:"center",alignSelf:"center",height:220,marginTop:10}}>
            <TouchableOpacity
            
            onPress={pickImage}
            >


                {image && <Image source={{ uri: image }} style={styles.photoStyle} />}

            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    photoStyle: {
        marginTop:20,
        width:200,
        height: 220, 
        borderWidth:5, 
        borderColor: 'black', 
        borderWidth:3,
        resizeMode:'contain'
    }
});

export default PhotoComponent;