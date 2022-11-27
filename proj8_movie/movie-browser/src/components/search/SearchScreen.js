import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import PropTypes from 'prop-types';

import SearchField from "./SearchField";
import Logo from '../../../assets/img/API-logo.svg';


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
            <View style={styles.container}>
                <Logo width={300} height={250} style={styles.logo} />

                <SearchField title='Movie Title*' value={this.state.movieTitle} 
                    placeholder='Title' update={this.handleTitleUpdate} />

                <View style={styles.buttonContainer}>
                    <Pressable style={styles.button} onPress={this.navigateToResult}>
                        <Text style={styles.buttonText}>Search</Text>
                    </Pressable>

                    <Pressable style={styles.button} onPress={this.navigateToAdvSearch}>
                        <Text style={styles.buttonText}>Advanced Search</Text>
                    </Pressable>
                </View>
                
            </View>
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
        marginBottom: 50,
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
