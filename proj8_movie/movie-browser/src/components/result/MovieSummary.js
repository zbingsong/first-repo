import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import PropTypes from 'prop-types';


const DEFAULT_IMAGE_PATH = '../../../img/assets/image-available-icon-flat-vector.jpg';

export default function MovieSummary(props) {

    const toDetail = () => {
        props.navigateToDetail(props.movie.id);
    }

    const toTag = () => {
        alert('tag');
    }

    return (
        <View style={styles.container}>
            <Pressable onPress={toDetail} style={styles.pressable}>
                {
                    props.movie.poster === null
                    ? 
                    <Image 
                        source={require(DEFAULT_IMAGE_PATH)} 
                        style={styles.image} 
                        resizeMode='contain' 
                    />
                    : 
                    <Image 
                        source={{ uri: props.baseURL + props.posterSize + props.movie.poster }} 
                        style={styles.image} 
                        resizeMode='contain' 
                    />
                }
                <Text style={styles.title}>{props.movie.title}</Text>
                <Text>Rating: {props.movie.rating}</Text>
            </Pressable>
            <View style={styles.tagContainer}>
                {
                    props.movie.genre.map(genreId => (
                        <Pressable onPress={toTag} style={styles.tag}>
                            <Text style={styles.tagText}>
                                {props.genres[`${genreId}`]}
                            </Text>
                        </Pressable>
                    ))
                }
            </View>
        </View>
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
    }),
    posterSize: PropTypes.string,
    baseURL: PropTypes.string,
    genres: PropTypes.object,
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
        width: 300,
        height: 300,
        marginVertical: 10,
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 5
    },

    tagContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },

    tag: {
        borderRadius: 5,
        backgroundColor: '#4d4d4d',
        marginHorizontal: 2,
        paddingHorizontal: 10,
        paddingVertical: 5,
        elevation: 2,
    },

    tagText: {
        color: '#cccccc',
    },
});
