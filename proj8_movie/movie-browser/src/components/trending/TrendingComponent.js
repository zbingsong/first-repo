import React from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import PropTypes from 'prop-types';

import MovieSummary from "../result/MovieSummary";
import getTrending from "../../api/TrendingAPI";


export default class TrendingComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            trendingList: [],
            page: 1,
            ifMoreAvailable: true,
        }
    }

    loadTrendingMovies = async () => {
        if (!this.state.ifMoreAvailable || this.state.page > 1000) {
            return;
        }

        const result = await getTrending(this.state.page);
        
        this.setState(prevState => ({
            trendingList: [...prevState.trendingList, ...result.movies],
            page: prevState.page + 1,
            ifMoreAvailable: result.ifMoreAvailable
        }));
    }

    navigateToDetail = (id) => {
        this.props.navigate('Detail', {id: id});
    }

    renderItem = ({ item }) => {
        <MovieSummary 
            movie={item}
            navigateToDetail={this.navigateToDetail}
            params={this.props.params}
        />
    }

    componentDidMount() {
        this.loadTrendingMovies();
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.componentTitle}>
                    Trending This Week
                </Text>

                <FlatList 
                    data={this.state.trendingList} 
                    renderItem={this.renderItem} 
                    ListEmptyComponent={<View><Text>Loading...</Text></View>}
                    horizontal={true}
                    onEndReachedThreshold={1}
                    onEndReached={this.loadTrendingMovies}
                />
            </View>
        )
    }
}


TrendingComponent.propTypes = {
    navigate: PropTypes.func,
    params: PropTypes.shape({
        posterSize: PropTypes.string,
        baseURL: PropTypes.string,
        genres: PropTypes.object,
        defaultImgAsset: PropTypes.string,
    }),
}


const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
    },

    componentTitle: {
        fontSize: 24,
    },
});
