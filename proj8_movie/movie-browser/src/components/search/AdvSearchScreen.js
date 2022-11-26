import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import SearchField from "./SearchField";
import PropTypes from 'prop-types';

export default class AdvSearchScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            movieTitle: props.route.params.title,
            movieYear: '',
        }
    }

    handleTitleUpdate = input => {
        // console.log('title changed');
        this.setState({movieTitle: input});
    }

    handleYearUpdate = input => {
        this.setState({movieYear: input});
    }

    navigateToResult = () => {
        if (this.state.movieTitle.trim() === '') {
            alert('Movie title cannot be empty');
        } else {
            // console.log(this.state.movieTitle.trim());
            this.props.navigation.navigate('Result', {
                title: this.state.movieTitle.trim(),
                year: this.state.movieYear.trim(),
            });
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <SearchField title='Movie Title*' value={this.state.movieTitle} 
                    placeholder='Title' update={this.handleTitleUpdate} />

                <SearchField title='Release Year' value={this.state.movieYear} 
                    placeholder='Release year' update={this.handleYearUpdate} />

                <Pressable style={styles.button} onPress={this.navigateToResult}>
                    <Text style={styles.buttonText}>Search</Text>
                </Pressable>
            </View>
        );
    }
}


AdvSearchScreen.propTypes = {
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
        width: 110,
        borderRadius: 4,
        elevation: 2,
        paddingVertical: 11,
        paddingHorizontal: 20,
        marginVertical: 30,
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
});