import React from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import TrendingComponent from "./TrendingComponent";
import TopRatedComponent from "./TopRatedComponent";


const TAB = createMaterialTopTabNavigator();

export default class BrowseComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        // console.log(this.props);
        return (
            <View style={styles.container}>
                <TAB.Navigator initialRouteName="Trending">
                    <TAB.Screen name='Trending' component={TrendingComponent} initialParams={this.props.params} />
                    <TAB.Screen name='TopRated' component={TopRatedComponent} initialParams={this.props.params} />
                </TAB.Navigator>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width, 
        height: Dimensions.get('window').height * 0.79, 
    },

});
