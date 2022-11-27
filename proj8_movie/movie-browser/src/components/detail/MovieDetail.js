import { View, Text, StyleSheet, Image, Pressable, Linking } from "react-native";
import PropTypes from 'prop-types';
import { useFonts } from 'expo-font';


const DEFAULT_IMAGE_PATH = '../../../assets/img/image-available-icon-flat-vector.jpg';

export default function MovieDetail(props) {

    const [fontsLoaded] = useFonts({
        'Amazon-Ember-Bold': require('../../../assets/fonts/AmazonEmber+Bd.ttf'),
    });

    const toTag = () => {

    }

    const goToIMDB = async () => {
        await Linking.openURL(`https://www.imdb.com/title/${props.movie.imdbId}/`);
    }

    const goToHomepage = async () => {
        await Linking.openURL(props.movie.homepage);
    }

    // console.log(props.movie.Poster);
    if (props.movie === null) {
        return (
            <View>
                <Text>Error loading movie info.</Text>
            </View>
        );
    } else {
        return (
            <View style={styles.container}>
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
                        source={{ uri: props.baseUrl + props.posterSize + props.movie.poster }} 
                        style={styles.image} 
                        resizeMode='contain' 
                    />
                }
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
                
                <Pressable onPress={goToIMDB} style={styles.imdbnLink}>
                    <Text style={styles.imdbLinkText}>IMDB {props.movie.imdbId}</Text>
                </Pressable>
                <Pressable onPress={goToHomepage} style={styles.homepageLink}>
                    <Text style={styles.homepageLinkText}>Movie Homepage</Text>
                </Pressable>

                <Text style={styles.title}>{props.movie.title}</Text>
                <Text>{props.movie.tagline}</Text>
                <Text>Release date: {props.movie.release}</Text>
                <Text>Rating: {props.movie.rating} based on {props.movie.ratingCount} votes</Text>
                <Text>popularity: {props.movie.popularity}</Text>
                <Text>Length: {props.movie.length} minutes</Text>
                <Text>Plot: {'\n'}{props.movie.plot}</Text>
            </View>
        );
    }
}


MovieDetail.propTypes = {
    movie: PropTypes.object,
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
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
