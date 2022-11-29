import React from "react";
import { View, Text, StyleSheet, Image, Pressable, Linking, ScrollView, Dimensions } from "react-native";
import PropTypes from 'prop-types';


export default class MovieDetail extends React.Component {

    constructor(props) {
        super(props);
    }

    toTag = () => {

    }

    goToIMDB = async () => {
        await Linking.openURL(`https://www.imdb.com/title/${this.props.movie.imdbId}/`);
    }

    goToHomepage = async () => {
        await Linking.openURL(this.props.movie.homepage);
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    {
                        this.props.movie.poster === null
                            ? 
                        <Image 
                            source={{ uri: this.props.params.defaultImgAsset }}
                            style={styles.image} 
                            resizeMode='contain' 
                        />
                            : 
                        <Image 
                            source={{ uri: this.props.params.baseURL + this.props.params.posterSize + this.props.movie.poster }} 
                            style={styles.image} 
                            resizeMode='contain' 
                        />
                    }
                    <View style={styles.tagContainer}>
                        {this.props.movie.genres.map(genreId => (
                            <Pressable onPress={this.toTag} style={styles.tag} 
                                key={`${this.props.movie.id}-${genreId}`}>
                                <Text style={styles.tagText}>
                                    {this.props.params.genres[`${genreId}`]}
                                </Text>
                            </Pressable>
                        ))}
                    </View>

                    <View style={styles.linkContainer}>
                        <Pressable onPress={this.goToIMDB} style={styles.imdbnLink}>
                            <Text style={styles.imdbLinkText}>IMDB {this.props.movie.imdbId}</Text>
                        </Pressable>
                        <Pressable onPress={this.goToHomepage} style={styles.homepageLink}>
                            <Text style={styles.homepageLinkText}>Movie Homepage</Text>
                        </Pressable>
                    </View>
                    
                    <View style={styles.textInfoContainer}>
                        <Text style={styles.title}>{this.props.movie.title}</Text>
                        <Text>{this.props.movie.tagline}</Text>
                        <Text>Release date: {this.props.movie.release}</Text>
                        <Text>Rating: {this.props.movie.rating} based on {this.props.movie.ratingCount} votes</Text>
                        <Text>popularity: {this.props.movie.popularity}</Text>
                        <Text>Length: {this.props.movie.length} minutes</Text>
                        <Text>Plot: {'\n'}{this.props.movie.plot}</Text>
                    </View>
                </View>
            </ScrollView>
        );
    }
}


MovieDetail.propTypes = {
    movie: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        tagline: PropTypes.string,
        genres: PropTypes.arrayOf(PropTypes.number),
        imdbId: PropTypes.string,
        plot: PropTypes.string,
        poster: PropTypes.string,
        popularity: PropTypes.number,
        rating: PropTypes.number,
        ratingCount: PropTypes.number,
        length: PropTypes.number,
        release: PropTypes.string,
        homepage: PropTypes.string,
    }),
    params: PropTypes.shape({
        posterSize: PropTypes.string,
        baseURL: PropTypes.string,
        genres: PropTypes.object,
        defaultImgAsset: PropTypes.string,
    })
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },

    image: {
        width: Dimensions.get('window').width,
        height: 660,
    },
    
    tagContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 5,
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

    linkContainer: {
        flexDirection: 'row',
        width: Dimensions.get('window').width,
        justifyContent: 'center',
    },

    imdbnLink: {
        backgroundColor: '#DBA506',
        borderRadius: 4,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginVertical: 5,
        marginRight: Dimensions.get('window').width * 0.02,
        width: Dimensions.get('window').width * 0.45,
    },

    imdbLinkText: {
        color: 'black',
        fontFamily: 'Amazon-Ember-Bold',
    },

    homepageLink: {
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginVertical: 5,
        // marginLeft: Dimensions.get('window').width * 0.01,
        width: Dimensions.get('window').width * 0.45,
    },

    homepageLinkText: {
        fontFamily: 'Amazon-Ember-Bold',
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 5,
    },

    pressableContainer: {
        flexDirection: 'row',
    },

    textInfoContainer: {
        marginHorizontal: 10,
        marginBottom: 20,
    },
});
