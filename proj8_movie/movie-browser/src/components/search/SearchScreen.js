import React from "react";
import { Pressable, StyleSheet, Text, View, Dimensions, KeyboardAvoidingView } from "react-native";
import PropTypes from 'prop-types';

import SearchField from "./SearchField";
import BrowseComponent from "../mainpage/BrowseComponent";
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
        // console.log(this.props);
        return (
            <KeyboardAvoidingView 
                behavior={Platform.OS === "ios" ? "padding" : "height"} 
                keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20} 
                enabled={Platform.OS === "ios"} 
                style={styles.container}
            >
                <Logo width={Dimensions.get('window').width * 0.9} height={60} />

                <View style={styles.searchBar}>
                    <SearchField value={this.state.movieTitle} 
                        placeholder='Search Movie...' update={this.handleTitleUpdate} />
                    <Pressable style={styles.button} onPress={this.navigateToResult}>
                        <Text style={styles.buttonText}>Search</Text>
                    </Pressable>
                </View>

                <BrowseComponent params={this.props.route.params} />
            </KeyboardAvoidingView>
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

    button: {
        height: 42,
        borderRadius: 10,
        paddingHorizontal: 20,
        marginLeft: 10,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttonText: {
        color: 'white',
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
    },

    searchBar: {
        flexDirection: 'row',
    },
});
