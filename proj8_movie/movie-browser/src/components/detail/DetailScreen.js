import React from "react";
import { StyleSheet, Text, View } from "react-native";
import PropTypes from 'prop-types';

import getMovieDetailAsync from "../../api/GetDetailAPI";
import MovieDetail from "./MovieDetail";
import LoadingScreen from "../common/LoadingScreen";
import ErrorScreen from "../common/ErrorScreen";


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
        this.setState({movie: movie});
    }

    componentDidMount() {
        // console.log('load movie');
        this.loadMovie();
        this.setState({ifDetailReady: true});
    }

    render() {
        if (!this.state.ifDetailReady) {
            return (
                <LoadingScreen />
            );
        }

        if (this.state.movie === null) {
            return (
                <ErrorScreen message='Error loading movie info.' />
            );
        } else {
            return (
                <MovieDetail 
                    movie={this.state.movie} 
                    params={this.props.route.params} 
                />
            );
        }
    }
}


DetailScreen.propTypes = {
    navigation: PropTypes.object,
    route: PropTypes.object,
}


const styles = StyleSheet.create({

});
