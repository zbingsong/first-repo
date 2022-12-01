import React from "react";
import { Image, Pressable, StyleSheet, Text, View, Dimensions } from "react-native";
import { Shadow } from 'react-native-shadow-2';
import PropTypes from 'prop-types';


export default function MovieSummary(props) {

    const toDetail = () => {
        props.navigateToDetail(props.movie.id);
    }

    return (
        <Shadow distance={4} offset={[11, 11]} style={styles.container}>
            <Pressable onPress={toDetail} style={styles.pressable}>
                <View>
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
                </View>
                
                <View style={styles.infoContainer}>
                    <Text style={styles.title}>{props.movie.title}</Text>
                    <Text>Rating: {props.movie.rating.toFixed(1)}</Text>
                    <View style={styles.tagContainer}>
                        {
                            props.movie.genre.map(genreId => (
                                <View style={styles.tag} key={`${props.movie.id}-${genreId}`}>
                                    <Text style={styles.tagText}>
                                        {props.params.genres[`${genreId}`]}
                                    </Text>
                                </View>
                            ))
                        }
                    </View>
                </View>
            </Pressable>
        </Shadow>
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
        borderRadius: 5,
        marginVertical: 8,
        marginHorizontal: 8,
        padding: 5,
        width: Dimensions.get('window').width * 0.95,
        height: Dimensions.get('window').height * 0.35,
        alignItems: 'center',
        justifyContent: 'center',
    },

    pressable: {
        flexDirection: 'row',
        alignItems: 'center',
        // width: Dimensions.get('window').width * 0.9,
    },

    image: {
        width: Dimensions.get('window').width * 0.38,
        height: Dimensions.get('window').height * 0.33,
        marginVertical: 3,
    },

    infoContainer: {
        width: Dimensions.get('window').width * 0.5,
        marginLeft: Dimensions.get('window').width * 0.01,
        alignItems: 'center',
        justifyContent: 'center',
    },

    title: {
        fontSize: 26,
        fontWeight: 'bold',
        flexWrap: 'wrap',
        textAlign: 'center',
        textAlignVertical: 'center',
        // height: 50,
        marginBottom: 10,
    },

    tagContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        // height: 90,
        marginHorizontal: 10,
        marginTop: 15,
    },

    tag: {
        borderRadius: 3,
        backgroundColor: '#4d4d4d',
        margin: 2,
        paddingHorizontal: 7,
        paddingVertical: 3,
        elevation: 1,
    },

    tagText: {
        color: '#cccccc',
        fontSize: 15,
    },
});
