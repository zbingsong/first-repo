import React from "react";
import { StyleSheet, Text, View } from "react-native";
import PropTypes from 'prop-types';

import findMoviesAsync from "../../api/GetDetailAPI";
import MovieDetail from "./MovieDetail";


export default class DetailScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ifDetailReady: false,
            movie: null,
        }
    }

    loadMovie = async () => {
        // console.log(this.props.route.params.imdbID);
        const movie = await findMoviesAsync(this.props.route.params.imdbID);
        this.setState({ifDetailReady: true, movie: movie});
    }

    componentDidMount() {
        // console.log('load movie');
        this.loadMovie();
    }

    render() {
        if (this.state.ifDetailReady) {
            return (
                <MovieDetail movie={this.state.movie} />
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
