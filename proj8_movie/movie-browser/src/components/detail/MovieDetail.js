import { View, Text, StyleSheet, Image } from "react-native";
import PropTypes from 'prop-types';


const DEFAULT_IMAGE_PATH = '../../../assets/image-available-icon-flat-vector.jpg';

export default function MovieDetail(props) {
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
                    <Image source={require(DEFAULT_IMAGE_PATH)} style={styles.image} resizeMode='contain' />
                     : 
                    <Image source={{ uri: props.movie.poster }} style={styles.image} resizeMode='contain' />
                }
                <Text>{props.movie.Title}</Text>
                <Text>Release date: {props.movie.Released}</Text>
                <Text>Rated: {props.movie.Rated}</Text>
                <Text>Director: {props.movie.Director}</Text>
                <Text>Major actors: {props.movie.Actors}</Text>
                <Text>Plot: {'\n'}{props.movie.Plot}</Text>
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
});
