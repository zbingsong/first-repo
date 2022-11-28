import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import SearchScreen from './src/components/search/SearchScreen';
import ResultScreen from './src/components/result/ResultScreen';
import DetailScreen from './src/components/detail/DetailScreen';
import AdvSearchScreen from './src/components/search/AdvSearchScreen';

import LoadingScreen from './src/components/common/LoadingScreen';
import ErrorScreen from './src/components/common/ErrorScreen';

import getGenreList from './src/api/GetGenreListAPI';
import getConfig from './src/api/GetConfigAPI';


SplashScreen.preventAutoHideAsync();

const STACK = createNativeStackNavigator();
const FONT_PATH = './assets/fonts/AmazonEmber_Bd.ttf';
const DEFAULT_IMAGE_PATH = './assets/img/image-available-icon-flat-vector.jpg';
const LOADING_IMAGE_PATH = './assets/img/loading-loading-gif.gif';
const ERROR_IMAGE_PATH = './assets/img/error-image-generic.png';

export default class App extends React.Component {

    constructor() {
        super();
        this.state = {
            genres: [],
            baseUrl: '',
            posterSize: 'original',
            defaultImgAsset: null,
            loadingImgAsset: null,
            errorImgAsset: null,
            ifAppReady: false
        }
    }

    loadFonts = async () => {
        await Font.loadAsync({
            'Amazon-Ember-Bold': require(FONT_PATH)
        });
    }

    loadDefaultImg = async () => {
        const loadedAssets = await Asset.loadAsync([
            require(DEFAULT_IMAGE_PATH), 
            require(LOADING_IMAGE_PATH),
            require(ERROR_IMAGE_PATH)
        ]);
        this.setState({
            defaultImgAsset: loadedAssets[0].localUri, 
            loadingImgAsset: loadedAssets[1].localUri,
            errorImgAsset: loadedAssets[2].localUri
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

    completeAPICalls = async () => {
        await Promise.all([
            this.loadFonts(), 
            this.getAPIBaseInfo(), 
            this.loadDefaultImg()
        ]);
        this.setState(
            { ifAppReady: true }, 
            async () => { await SplashScreen.hideAsync(); }
        );
    }

    componentDidMount() {
        this.completeAPICalls();
    }

    render() {
        if (!this.state.ifAppReady) {
            return null;
        }

        const initialParams =  {
            genres: this.state.genres, 
            baseUrl: this.state.baseUrl, 
            posterSize: this.state.posterSize,
            defaultImgAsset: this.state.defaultImgAsset,
            loadingImgAsset: this.state.loadingImgAsset,
        };

        return (
            <NavigationContainer style={styles.container}>
                <STACK.Navigator initialRouteName='Search'>
                    <STACK.Screen name='Search' component={SearchScreen} 
                        initialParams={initialParams} />
                    <STACK.Screen name='AdvSearch' component={AdvSearchScreen} 
                        initialParams={initialParams} />
                    <STACK.Screen name='Result' component={ResultScreen} 
                        initialParams={initialParams} />
                    <STACK.Screen name='Detail' component={DetailScreen} 
                        initialParams={initialParams} />
                    <STACK.Screen name='Loading' component={LoadingScreen} 
                        initialParams={{ loadingImgAsset: this.state.loadingImgAsset }} />
                    <STACK.Screen name='Error' component={ErrorScreen}
                        initialParams={{ errorImgAsset: this.state.errorImgAsset }} />
                </STACK.Navigator>
            </NavigationContainer>
        );
    }
}
    

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
