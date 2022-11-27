import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Font from 'expo-font';

import SearchScreen from './src/components/search/SearchScreen';
import ResultScreen from './src/components/result/ResultScreen';
import DetailScreen from './src/components/detail/DetailScreen';
import AdvSearchScreen from './src/components/search/AdvSearchScreen';

import getGenreList from './src/api/GetGenreListAPI';
import getConfig from './src/api/GetConfigAPI';


const STACK = createNativeStackNavigator();
const FONT_PATH = './assets/fonts/AmazonEmber_Bd.ttf';

export default class App extends React.Component {

    constructor() {
        super();
        this.state = {
            genres: [],
            baseUrl: '',
            posterSize: 'original',
            ifAppReady: false
        }
    }

    loadFonts = async () => {
        await Font.loadAsync({
            'Amazon-Ember-Bold': require(FONT_PATH)
        });
    }

    getAPIBaseInfo = async () => {
        const genres = await getGenreList();
        const APIconfig = await getConfig();
        this.setState({
            genres: genres,
            baseUrl: APIconfig.baseUrl,
            posterSize: APIconfig.posterSize
        });
    }

    componentDidMount() {
        this.loadFonts();
        this.getAPIBaseInfo();
        this.setState({ifAppReady: true});
    }

    render() {
        if (this.state.ifAppReady) {
            const initialParams =  {
                genres: this.state.genres, 
                baseUrl: this.state.baseUrl, 
                posterSize: this.state.posterSize,
            };

            return (
                <NavigationContainer style={styles.container}>
                    <STACK.Navigator initialRouteName='Search'>
                        <STACK.Screen name='Search' component={SearchScreen} initialParams={initialParams} />
                        <STACK.Screen name='AdvSearch' component={AdvSearchScreen} initialParams={initialParams} />
                        <STACK.Screen name='Result' component={ResultScreen} initialParams={initialParams} />
                        <STACK.Screen name='Detail' component={DetailScreen} initialParams={initialParams} />
                    </STACK.Navigator>
                </NavigationContainer>
            );
        } else {
            return (
                <View style={styles.container}>
                    <Text>Loading...</Text>
                </View>
            );
        }
    }
}
    


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
