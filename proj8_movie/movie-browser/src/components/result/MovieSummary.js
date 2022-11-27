import React from "react";
import { Image, Pressable, StyleSheet, Text } from "react-native";
import PropTypes from 'prop-types';


const DEFAULT_IMAGE_PATH = '../../../assets/image-available-icon-flat-vector.jpg';

export default function MovieSummary(props) {
    // console.log(props);

    const onPress = () => {
        // console.log(props.movie.imdbID);
        props.navigateToDetail(props.movie.id);
    }

    // console.log(props.movie.imdbID);
    return (
        <Pressable onPress={onPress} style={styles.pressable}>
            {
                props.movie.poster === null
                 ? 
                <Image source={require(DEFAULT_IMAGE_PATH)} style={styles.image} resizeMode='contain' />
                 : 
                <Image source={{ uri: props.movie.poster }} style={styles.image} resizeMode='contain' />
            }
            <Text>{props.movie.title}</Text>
            <Text>Rating: {props.movie.rating}</Text>
        </Pressable>
    )
}


MovieSummary.propTypes = {
    navigateToDetail: PropTypes.func,
    movie: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        poster: PropTypes.string,
        rating: PropTypes.number,
        genre: PropTypes.array,
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
