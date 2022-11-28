import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import PropTypes from 'prop-types';


export default function MovieTab(props) {

    const toDetail = () => {
        props.navigateToDetail(props.movie.id);
    }

    return (
        <View style={styles.container}>
            <Pressable onPress={toDetail} style={styles.pressable}>
                {
                    props.movie.poster === null
                    ? 
                    <Image 
                        source={{ uri: props.params.defaultImgAsset }}
                        style={styles.image} 
                        resizeMode='contain' 
                    />
                    : 
                    <Image 
                        source={{ uri: props.params.baseUrl + props.params.posterSize + props.movie.poster }} 
                        style={styles.image} 
                        resizeMode='contain' 
                    />
                }
                <Text style={styles.title}>{props.movie.title}</Text>
                <Text>Rating: {props.movie.rating}</Text>
            </Pressable>
        </View>
    )
}


MovieTab.propTypes = {
    navigateToDetail: PropTypes.func,
    movie: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        poster: PropTypes.string,
        rating: PropTypes.number,
        genre: PropTypes.array,
    }),
    params: PropTypes.shape({
        posterSize: PropTypes.string,
        baseURL: PropTypes.string,
        genres: PropTypes.object,
        defaultImgAsset: PropTypes.string,
    }),
}


const styles = StyleSheet.create({
    container: {
        borderWidth: 0,
        borderColor: 'black',
        marginVertical: 10,
        padding: 15,
    },

    pressable: {
        alignItems: 'center',
        margin: 15,
    },

    image: {
        width: 150,
        height: 150,
        marginVertical: 10,
    },

    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 5
    },
});
