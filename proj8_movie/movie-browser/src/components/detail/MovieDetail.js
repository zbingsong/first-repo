import React from "react";
import { View, Text, StyleSheet, Image, Pressable, Linking, ScrollView } from "react-native";
import PropTypes from 'prop-types';
import * as Font from 'expo-font';


const DEFAULT_IMAGE_PATH = '../../../assets/img/image-available-icon-flat-vector.jpg';
const FONT_PATH = '../../../assets/fonts/AmazonEmber_Bd.ttf';

export default class MovieDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ifReady: false,
        }
    }

    loadFonts = async () => {
        await Font.loadAsync({
            'Amazon-Ember-Bold': require(FONT_PATH)
        });
    }

    toTag = () => {

    }

    goToIMDB = async () => {
        await Linking.openURL(`https://www.imdb.com/title/${this.props.movie.imdbId}/`);
    }

    goToHomepage = async () => {
        await Linking.openURL(this.props.movie.homepage);
    }

    componentDidMount() {
        this.loadFonts();
        this.setState({ifReady: true});
    }

    render() {
        if (this.state.ifReady) {
            if (this.props.movie === null) {
                return (
                    <View>
                        <Text>Error loading movie info.</Text>
                    </View>
                );
            } else {
                return (
                    <ScrollView style={styles.container}>
                        {
                            this.props.movie.poster === null
                             ? 
                            <Image 
                                source={require(DEFAULT_IMAGE_PATH)} 
                                style={styles.image} 
                                resizeMode='contain' 
                            />
                             : 
                            <Image 
                                source={{ uri: this.props.baseUrl + this.props.posterSize + this.props.movie.poster }} 
                                style={styles.image} 
                                resizeMode='contain' 
                            />
                        }
                        <View style={styles.tagContainer}>
                            {
                                this.props.movie.genres.map(genreId => (
                                    <Pressable onPress={this.toTag} style={styles.tag}>
                                        <Text style={styles.tagText}>
                                            {this.props.genres[`${genreId}`]}
                                        </Text>
                                    </Pressable>
                                ))
                            }
                        </View>
                        
                        <Pressable onPress={this.goToIMDB} style={styles.imdbnLink}>
                            <Text style={styles.imdbLinkText}>IMDB {this.props.movie.imdbId}</Text>
                        </Pressable>
                        <Pressable onPress={this.goToHomepage} style={styles.homepageLink}>
                            <Text style={styles.homepageLinkText}>Movie Homepage</Text>
                        </Pressable>
        
                        <Text style={styles.title}>{this.props.movie.title}</Text>
                        <Text>{this.props.movie.tagline}</Text>
                        <Text>Release date: {this.props.movie.release}</Text>
                        <Text>Rating: {this.props.movie.rating} based on {this.props.movie.ratingCount} votes</Text>
                        <Text>popularity: {this.props.movie.popularity}</Text>
                        <Text>Length: {this.props.movie.length} minutes</Text>
                        <Text>Plot: {'\n'}{this.props.movie.plot}</Text>
                    </ScrollView>
                );
            }
        } else {
            return (
                <View>
                    <Text>Loading...</Text>
                </View>
            )
        }
    }
}


MovieDetail.propTypes = {
    movie: PropTypes.object,
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignContent: 'center',
        padding: 15,
    },

    image: {
        width: 400,
        height: 400,
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

    imdbnLink: {
        backgroundColor: '#DBA506',
        borderRadius: 4,
        paddingHorizontal: 10,
        paddingVertical: 5,
        margin: 5,
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
        margin: 5,
    },

    homepageLinkText: {

    },
});
