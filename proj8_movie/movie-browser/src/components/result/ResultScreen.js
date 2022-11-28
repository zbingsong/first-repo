import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import PropTypes from 'prop-types';

import searchForMoviesAsync from "../../api/SearchAPI";
import MovieSummary from "./MovieSummary";
import LoadingScreen from "../common/LoadingScreen";
import ErrorScreen from "../common/ErrorScreen";


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

    // fetch results of search
    // result is array of movies
    // each movie is an object: 
    //     {id: number, title: string, poster: string | null, rating: number, genre: array of number}
    loadMovies = async () => {
        // console.log('load more movies');
        // console.log(this.state)
        // if no more movies can be loaded or page more than 1000, do nothing
        if (!this.state.ifMoreAvailable || this.state.page > 1000) {
            return;
        }

        // fetch more movies
        const result = await searchForMoviesAsync(
            this.props.route.params.title, this.state.page
        );
        // append to state.results and update state.page and state.ifMoreAvailable
        this.setState(prevState => ({
            results: [...prevState.results, ...result.movies],
            page: prevState.page + 1,
            ifMoreAvailable: result.ifMoreAvailable,
            ifResultsReady: true
        }));
    }

    navigateToDetail = (id) => {
        this.props.navigation.navigate('Detail', {id: id});
    }

    renderItem = ({ item }) => (
        <MovieSummary 
            movie={item} 
            navigateToDetail={this.navigateToDetail} 
            params={this.props.route.params}
        />
    )

    componentDidMount() {
        this.loadMovies();
        // this.setState({ifResultsReady: true})
    }

    render() {
        if (this.state.ifResultsReady) {
            return (
                <View style={styles.container}>
                    <FlatList 
                        data={this.state.results} 
                        renderItem={this.renderItem} 
                        ListEmptyComponent={
                            <ErrorScreen 
                                errorImgAsset={this.props.route.params.errorImgAsset} 
                                message='No movie was found.' 
                            />
                        } 
                        showsVerticalScrollIndicator={false} 
                        // When scrolling to second last movie on screen, load more movies
                        onEndReachedThreshold={1} 
                        onEndReached={this.loadMovies}
                    />
                </View>
            );
        } else {
            return (
                <LoadingScreen loadingImgAsset={this.props.route.params.loadingImgAsset} />
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
