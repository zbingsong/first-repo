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
            ifMoreAvailable: true,
        }
    }

    loadMovies = async () => {
        // console.log('load more movies');
        // console.log(this.state)
        // if no more movies can be loaded, do nothing
        if (!this.state.ifMoreAvailable) {
            return;
        }

        // fetch more movies
        const result = await searchForMoviesAsync(
            this.props.route.params.title, this.props.route.params.year, this.state.page
        );
        // append to state.results and update state.page and state.ifMoreAvailable
        this.setState(prevState => ({
            results: [...prevState.results, ...result.movies],
            page: prevState.page + 1,
            ifMoreAvailable: result.ifMoreAvailable
        }));
    }

    navigateToDetail = (imdbID) => {
        this.props.navigation.navigate('Detail', {imdbID: imdbID});
    }

    renderItem = ({ item }) => (
        <MovieSummary movie={item} navigateToDetail={this.navigateToDetail} />
    )

    componentDidMount() {
        this.loadMovies();
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
                        // When scrolling to second last movie on screen, load more movies
                        onEndReachedThreshold={1} 
                        onEndReached={this.loadMovies}
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