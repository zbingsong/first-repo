import React from "react";
import { StyleSheet, Text, View } from "react-native";
import PropTypes, { number, string } from 'prop-types';

import getMovieDetailAsync from "../../api/GetDetailAPI";
import MovieDetail from "./MovieDetail";


export default class DetailScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ifDetailReady: false,
            movie: null, 
        }
    }

    // getMovieDetailAsync() returns a single movie in the form:
    // {
    //     title: string,
    //     tagline: string,
    //     genres: array of number,
    //     imdbId: string,
    //     plot: string,
    //     poster: string,
    //     popularity: number (float, between 0 to 100),
    //     rating: number (float, between 0 to 10),
    //     ratingCount: number (int, non-negative),
    //     length: number (int, non-negative),
    //     release: string,
    //     homepage: string,
    // }
    loadMovie = async () => {
        const movie = await getMovieDetailAsync(this.props.route.params.id);
        this.setState({ifDetailReady: true, movie: movie});
    }

    componentDidMount() {
        // console.log('load movie');
        this.loadMovie();
    }

    render() {
        if (this.state.ifDetailReady) {
            return (
                <MovieDetail 
                    movie={this.state.movie} 
                    baseUrl={this.props.route.params.baseUrl} 
                    posterSize={this.props.route.params.posterSize} 
                    genres={this.props.route.params.genres}
                />
            );
        } else {
            return (
                <View>
                    <Text>Loading movie information...</Text>
                </View>
            )
        }
    }
}


DetailScreen.propTypes = {
    navigation: PropTypes.object,
    route: PropTypes.object,
}


const styles = StyleSheet.create({

});
