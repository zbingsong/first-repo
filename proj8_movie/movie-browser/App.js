import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SearchScreen from './src/components/search/SearchScreen';
import ResultScreen from './src/components/result/ResultScreen';
import DetailScreen from './src/components/detail/DetailScreen';
import AdvSearchScreen from './src/components/search/AdvSearchScreen';

import getGenreList from './src/api/GetGenreListAPI';
import getConfig from './src/api/GetConfigAPI';


const STACK = createNativeStackNavigator();

export default class App extends React.Component {

    constructor() {
        super();
        this.state = {
            genres: [],
            base_url: '',
            poster_size: 'original',
            ifAppReady: false
        }
    }

    getAPIBaseInfo = async () => {
        const genres = await getGenreList();
        const APIconfig = await getConfig();
        this.setState({
            genres: genres,
            base_url: APIconfig.base_url,
            poster_size: APIconfig.poster_size
        });
    }

    componentDidMount() {
        this.getAPIBaseInfo();
        this.setState({ifAppReady: true});
    }

    render() {
        if (this.state.ifAppReady) {
            const initialParams =  {
                genres: this.state.genres, 
                base_url: this.state.base_url, 
                poster_size: this.state.poster_size,
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
