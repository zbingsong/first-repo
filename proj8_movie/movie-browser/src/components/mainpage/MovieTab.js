import React from "react";
import { Image, Pressable, StyleSheet, Text, Dimensions } from "react-native";
import { Shadow } from 'react-native-shadow-2';
import PropTypes from 'prop-types';


export default function MovieTab(props) {

    const toDetail = () => {
        props.navigateToDetail(props.movie.id);
    }

    return (
        <Shadow distance={6} offset={[9, 9]} style={styles.container}>
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
                <Text>Rating: {props.movie.rating.toFixed(1)}</Text>
            </Pressable>
        </Shadow>
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
        backgroundColor: '#fff',
        // borderWidth: 1,
        borderRadius: 5,
        marginVertical: 8,
        marginHorizontal: 8,
        // elevation: 5,
        padding: 5,
        width: Dimensions.get('window').width * 0.45,
        height: 300,
        alignItems: 'center',
        justifyContent: 'center',
    },

    pressable: {
        alignItems: 'center',
        margin: 10,
    },

    image: {
        width: 150,
        height: 200,
        marginVertical: 3,
    },

    title: {
        fontSize: 14,
        fontWeight: 'bold',
        marginVertical: 5,
        flexWrap: 'wrap',
        textAlign: 'center',
        textAlignVertical: 'center',
        height: 50,
    },
});
