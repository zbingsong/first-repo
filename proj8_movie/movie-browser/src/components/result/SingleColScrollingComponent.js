import React from "react";
import { View, FlatList, StyleSheet, Dimensions } from "react-native";
import PropTypes from 'prop-types';

import ErrorScreen from "../common/ErrorScreen";
import LoadingScreen from "../common/LoadingScreen";
import MovieSummary from "./MovieSummary";


export default class SingleColScrollingComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            results: [],
            page: 1,
            ifMoreAvailable: true,
            ifReady: false,
        }
    }

    loadMovies = async () => {
        if (!this.state.ifMoreAvailable || this.state.page > 1000) {
            return;
        }

        const result = await this.props.api(this.state.page);
        
        this.setState(prevState => ({
            results: [...prevState.results, ...result.movies],
            page: prevState.page + 1,
            ifMoreAvailable: result.ifMoreAvailable,
            ifReady: true
        }));
    }

    componentDidMount() {
        this.loadMovies();
    }

    renderItem = ({ item }) => {
        const movieSummaryParams = {
            posterSize: this.props.route.params.posterSize,
            baseURL: this.props.route.params.baseURL,
            genres: this.props.route.params.genres,
            defaultImgAsset: this.props.route.params.defaultImgAsset,
        }

        return (
            <MovieSummary 
                movie={item} 
                navigateToDetail={id => this.props.navigation.navigate('Detail', {id: id})} 
                params={movieSummaryParams}
            />
        );
    }

    render() {
        // console.log(this.props);
        if (!this.state.ifReady) {
            // console.log('preparing content');
            return (
                <LoadingScreen loadingImgAsset={this.props.route.params.loadingImgAsset} />
            )
        }

        console.log('ready')
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
                    keyExtractor={item => item.id}
                    onEndReachedThreshold={1}
                    onEndReached={this.loadMovies}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    style={styles.list}
                />
            </View>
        )
    }
}


SingleColScrollingComponent.propTypes = {
    api: PropTypes.func,
    navigation: PropTypes.object,
    route: PropTypes.shape({
        key: PropTypes.string,
        name: PropTypes.string,
        params: PropTypes.shape({
            title: PropTypes.string,
            posterSize: PropTypes.string,
            baseURL: PropTypes.string,
            genres: PropTypes.object,
            defaultImgAsset: PropTypes.string,
            loadingImgAsset: PropTypes.string,
            errorImgAsset: PropTypes.string,
        }),
    }),
}


const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        // borderTopWidth: 1,
        // borderBottomWidth: 1,
        alignItems: 'center',
        // marginVertical: 5,
    },

    list: {
        // marginVertical: 5,
        // marginHorizontal: 5,
    },

    componentTitle: {
        fontSize: 22,
    },
});
