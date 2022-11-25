import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SearchScreen from './src/components/search/SearchScreen';
import ResultScreen from './src/components/result/ResultScreen';
import DetailScreen from './src/components/detail/DetailScreen';


const STACK = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer style={styles.container}>
            <STACK.Navigator initialRouteName='Search'>
                <STACK.Screen name='Search' component={SearchScreen} />
                <STACK.Screen name='Result' component={ResultScreen} />
                <STACK.Screen name='Detail' component={DetailScreen} />
            </STACK.Navigator>
        </NavigationContainer>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
