import React from "react";
import { View, FlatList, StyleSheet, Dimensions } from "react-native";
import PropTypes from 'prop-types';

import ErrorScreen from "./ErrorScreen";
import LoadingScreen from "./LoadingScreen";


export default class ScrollingBaseComponent extends React.Component {

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
        // (async () => {
        //     this.loadMovies();
        //     this.setState({ifReady: true});
        // })();
        this.loadMovies();
    }

    render() {
        // console.log(this.props);
        if (!this.state.ifReady) {
            // console.log('preparing content');
            return (
                <LoadingScreen loadingImgAsset={this.props.loadingImgAsset} />
            )
        }

        return (
            <View style={styles.container}>
                <FlatList 
                    data={this.state.results} 
                    renderItem={this.props.renderItem} 
                    ListEmptyComponent={
                        <ErrorScreen 
                            errorImgAsset={this.props.errorImgAsset} 
                            message='No movie was found.' 
                        />
                    }
                    keyExtractor={item => item.id}
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
    api: PropTypes.func,
    renderItem: PropTypes.func,
    loadingImgAsset: PropTypes.string,
    errorImgAsset: PropTypes.string,
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