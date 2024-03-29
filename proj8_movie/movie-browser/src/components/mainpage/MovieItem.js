import React from "react";
import { Image, Pressable, StyleSheet, Text, Dimensions } from "react-native";
import { Shadow } from 'react-native-shadow-2';
import PropTypes from 'prop-types';


export default function MovieItem(props) {

    const toDetail = () => {
        props.navigateToDetail(props.movie.id);
    }

    return (
        <Shadow distance={5} offset={[9, 9]} style={styles.container}>
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
                        source={{ uri: props.params.baseURL + props.params.posterSize + props.movie.poster }} 
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


MovieItem.propTypes = {
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
        defaultImgAsset: PropTypes.string,
    }),
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 5,
        marginVertical: 8,
        marginHorizontal: 8,
        padding: 5,
        width: Dimensions.get('window').width * 0.45,
        height: 340,
        alignItems: 'center',
        justifyContent: 'center',
    },

    pressable: {
        alignItems: 'center',
        margin: 10,
    },

    image: {
        width: 180,
        height: 250,
        marginTop: 3,
    },

    title: {
        fontSize: 14,
        fontWeight: 'bold',
        marginVertical: 3,
        flexWrap: 'wrap',
        textAlign: 'center',
        textAlignVertical: 'center',
        height: 50,
    },
});
