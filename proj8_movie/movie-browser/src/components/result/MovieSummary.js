import React from "react";
import { Image, Pressable, StyleSheet, Text } from "react-native";
import PropTypes from 'prop-types';


const DEFAULT_IMAGE_PATH = '../../../assets/image-available-icon-flat-vector.jpg';

export default function MovieSummary(props) {
    // console.log(props);

    const onPress = () => {
        // console.log(props.movie.imdbID);
        props.navigateToDetail(props.movie.imdbID);
    }

    // console.log(props.movie.imdbID);
    return (
        <Pressable onPress={onPress} style={styles.pressable}>
            {
                props.movie.Poster === 'N/A'
                 ? 
                <Image source={require(DEFAULT_IMAGE_PATH)} style={styles.image} resizeMode='contain' />
                 : 
                <Image source={{ uri: props.movie.Poster }} style={styles.image} resizeMode='contain' />
            }
            <Text>{props.movie.Title}</Text>
            <Text>IMDb ID: {props.movie.imdbID}</Text>
            <Text>Release year: {props.movie.Year}</Text>
        </Pressable>
    )
}


MovieSummary.propTypes = {
    navigateToDetail: PropTypes.func,
    movie: PropTypes.shape({
        Title: PropTypes.string,
        Year: PropTypes.string,
        imdbID: PropTypes.string,
        Type: PropTypes.string,
        Poster: PropTypes.string,
    })
}


const styles = StyleSheet.create({
    image: {
        width: 300,
        height: 300,
    },

    pressable: {
        alignItems: 'center',
        margin: 15,
    },
});
