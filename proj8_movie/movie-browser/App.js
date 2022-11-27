import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';

import SearchScreen from './src/components/search/SearchScreen';
import ResultScreen from './src/components/result/ResultScreen';
import DetailScreen from './src/components/detail/DetailScreen';
import AdvSearchScreen from './src/components/search/AdvSearchScreen';

import getGenreList from './src/api/GetGenreListAPI';
import getConfig from './src/api/GetConfigAPI';


const STACK = createNativeStackNavigator();
const FONT_PATH = './assets/fonts/AmazonEmber_Bd.ttf';
const DEFAULT_IMAGE_PATH = '../../../assets/img/image-available-icon-flat-vector.jpg';

export default class App extends React.Component {

    constructor() {
        super();
        this.state = {
            genres: [],
            baseUrl: '',
            posterSize: 'original',
            defaultImgAsset: null,
            ifAppReady: false
        }
    }

    loadFonts = async () => {
        await Font.loadAsync({
            'Amazon-Ember-Bold': require(FONT_PATH)
        });
    }

    loadDefaultImg = async () => {
        const [{ localUri }] = await Asset.loadAsync(require(DEFAULT_IMAGE_PATH));
        this.setState({defaultImgAsset: localUri});
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
        (async () => {
            await Promise.all([this.loadFonts(), this.getAPIBaseInfo(), this.loadDefaultImg()]);
        })();
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
