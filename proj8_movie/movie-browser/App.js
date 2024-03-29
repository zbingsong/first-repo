import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import SearchScreen from './src/components/search/SearchScreen';
import ResultScreen from './src/components/result/ResultScreen';
import DetailScreen from './src/components/detail/DetailScreen';
import AdvSearchScreen from './src/components/search/AdvSearchScreen';

import getGenreList from './src/api/config/GetGenreListAPI';
import getConfig from './src/api/config/GetConfigAPI';


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
            ifAppReady: false,
            params: {
                genres: [],
                baseURL: '',
                posterSize: 'original',
                defaultImgAsset: null,
                loadingImgAsset: null,
                errorImgAsset: null,
            }
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
        this.setState(prevState => ({
            params: {
                ...prevState.params,
                defaultImgAsset: loadedAssets[0].localUri, 
                loadingImgAsset: loadedAssets[1].localUri,
                errorImgAsset: loadedAssets[2].localUri
            }
        }));
    }

    getAPIBaseInfo = async () => {
        const genres = await getGenreList();
        const APIconfig = await getConfig();
        this.setState(prevState => ({
            params: {
                ...prevState.params,
                genres: genres,
                baseURL: APIconfig.baseURL,
                posterSize: APIconfig.posterSize
            }
        }));
    }

    completeAPICalls = async () => {
        await Promise.all([
            this.loadFonts(), 
            this.getAPIBaseInfo(), 
            this.loadDefaultImg()
        ]);
        this.setState(
            { ifAppReady: true }, 
            async () => { 
                await SplashScreen.hideAsync(); 
                // console.log(this.state.loadingImgAsset); 
            }
        );
    }

    componentDidMount() {
        this.completeAPICalls();
    }

    render() {
        if (!this.state.ifAppReady) {
            return null;
        }

        return (
            <NavigationContainer style={styles.container}>
                <STACK.Navigator initialRouteName='Search'>
                    <STACK.Screen name='Search' component={SearchScreen} 
                        initialParams={this.state.params} />
                    <STACK.Screen name='AdvSearch' component={AdvSearchScreen} 
                        initialParams={this.state.params} />
                    <STACK.Screen name='Result' component={ResultScreen} 
                        initialParams={this.state.params} />
                    <STACK.Screen name='Detail' component={DetailScreen} 
                        initialParams={this.state.params} />
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
