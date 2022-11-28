import React from "react";
import { Pressable, StyleSheet, Text, View, ScrollView } from "react-native";
import PropTypes from 'prop-types';

import SearchField from "./SearchField";
import TrendingComponent from "../mainpage/TrendingComponent";
import TopRatedComponent from '../mainpage/TopRatedComponent'
import Logo from '../../../assets/img/API-logo-long-1.svg';


export default class SearchScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            movieTitle: '',
        }
    }

    handleTitleUpdate = input => {
        // console.log('title changed');
        this.setState({movieTitle: input});
    }

    navigateToResult = () => {
        if (this.state.movieTitle.trim() === '') {
            alert('Movie title cannot be empty');
        } else {
            // console.log(this.state.movieTitle.trim());
            this.props.navigation.navigate('Result', {
                title: this.state.movieTitle.trim()
            });
        }
    }

    navigateToAdvSearch = () => {
        this.props.navigation.navigate('AdvSearch', {
            title: this.state.movieTitle.trim()
        });
    }

    render() {
        // console.log('search');
        // console.log(this.props);
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    
                        <Logo width={300} height={80} style={styles.logo} />

                        <SearchField value={this.state.movieTitle} 
                            placeholder='Search Movie...' update={this.handleTitleUpdate} />

                        <View style={styles.buttonContainer}>
                            <Pressable style={styles.button} onPress={this.navigateToResult}>
                                <Text style={styles.buttonText}>Search</Text>
                            </Pressable>

                            <Pressable style={styles.button} onPress={this.navigateToAdvSearch}>
                                <Text style={styles.buttonText}>Advanced Search</Text>
                            </Pressable>
                        </View>

                        <TrendingComponent 
                            navigate={this.props.navigation.navigate} 
                            params={this.props.route.params} 
                        />

                        <TopRatedComponent 
                            navigate={this.props.navigation.navigate} 
                            params={this.props.route.params} 
                        />
                </View>
            </ScrollView>
        );
    }
}


SearchScreen.propTypes = {
    navigation: PropTypes.object,
    route: PropTypes.object,
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    logo: {
        marginBottom: 30,
    },

    image: {
        width: 100, 
        height: 100,
    },

    button: {
        // width: 110,
        borderRadius: 5,
        elevation: 2,
        paddingVertical: 11,
        paddingHorizontal: 20,
        margin: 10,
        backgroundColor: 'black',
        alignItems: 'center',
    },

    buttonText: {
        color: 'white',
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
    },

    buttonContainer: {
        flexDirection: 'row',
    },
});
