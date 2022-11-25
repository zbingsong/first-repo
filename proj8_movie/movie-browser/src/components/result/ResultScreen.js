import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import PropTypes from 'prop-types';

import searchForMoviesAsync from "../../api/SearchAPI";
import MovieSummary from "./MovieSummary";


export default class ResultScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ifResultsReady: false,
            results: [],
            page: 1,
            maxPage: 1,
        }
    }

    loadMovieList = async () => {
        // console.log(this.props);
        const resultList = await searchForMoviesAsync(
            this.props.route.params.title, this.props.route.params.year, page);
        this.setState({results: resultList});
    }

    navigateToDetail = (imdbID) => {
        this.props.navigation.navigate('Detail', {imdbID: imdbID});
    }

    renderItem = ({ item }) => (
        <MovieSummary movie={item} navigateToDetail={this.navigateToDetail} />
    )

    componentDidMount() {
        this.loadMovieList();
        this.setState({ifResultsReady: true})
    }

    render() {
        if (this.state.ifResultsReady) {
            return (
                <View style={styles.container}>
                    <FlatList data={this.state.results} 
                        renderItem={this.renderItem} 
                        ListEmptyComponent={(<Text>No movie was found.</Text>)} 
                        showsVerticalScrollIndicator={false} 
                    />
                </View>
            );
        } else {
            return (
                <View style={styles.container}>
                    <Text>Loading results...</Text>
                </View>
            );
        }
    }
}


ResultScreen.propTypes = {
    navigation: PropTypes.object,
    route: PropTypes.object,
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
});
