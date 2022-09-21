import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import PropTypes from 'prop-types'

const Header = props => {
    if (props.ifSettingTime) {
        return (
            <View style={styles.headerContainer}>
                <Text style={[styles.setTime, styles.header]}>Setting Timer</Text>
            </View>
        )
    } else {
        return (
            <View style={styles.headerContainer}>
                {
                    props.category === 'work' ? 
                    (<Text style={[styles.work, styles.header]}>Doing Work</Text>) 
                    : (<Text style={[styles.break, styles.header]}>Taking a Break</Text>) 
                }
            </View>
        )
    }
}

Header.propTypes = {
    category: PropTypes.string,
    ifSettingTime: PropTypes.bool
}

export default Header


const styles = StyleSheet.create({
	headerContainer: {
        margin: 10
    },

    header: {
        fontWeight: 'bold',
        fontSize: 54,
    },

    setTime: {
        color: '#38a169'
    },

    work: {
        color: '#e53e3e'
    },

    break: {
        color: '#3182ce'
    }
})