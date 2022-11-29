import React from "react";
import { View, FlatList, StyleSheet, Text, Dimensions } from "react-native";
import PropTypes from 'prop-types';

import MovieTab from "./MovieTab";


export default class ScrollingBaseComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            results: [],
            page: 1,
            ifMoreAvailable: true,
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
            ifMoreAvailable: result.ifMoreAvailable
        }));
    }

    navigateToDetail = (id) => {
        this.props.navigate('Detail', {id: id});
    }

    renderItem = ({ item }) => (
        <MovieTab 
            movie={item}
            navigateToDetail={this.navigateToDetail}
            params={this.props.params}
        />
    )

    componentDidMount() {
        this.loadMovies();
    }

    render() {
        // console.log(this.state.results);
        return (
            <View style={styles.container}>
                {/* <Text style={styles.componentTitle}>
                    {this.props.componentTitle}
                </Text> */}

                <FlatList 
                    data={this.state.results} 
                    renderItem={this.renderItem} 
                    ListEmptyComponent={
                        <View>
                            <Text>Loading...</Text>
                        </View>
                    }
                    keyExtractor={item => item.id}
                    // horizontal={true}
                    numColumns={2}
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


ScrollingBaseComponent.propTypes = {
    navigate: PropTypes.func,
    params: PropTypes.shape({
        posterSize: PropTypes.string,
        baseURL: PropTypes.string,
        genres: PropTypes.object,
        defaultImgAsset: PropTypes.string,
    }),
    api: PropTypes.func,
    componentTitle: PropTypes.string,
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