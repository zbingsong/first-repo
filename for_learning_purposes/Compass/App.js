import React from 'react';
import { ImageBackground, StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { Magnetometer } from 'expo-sensors'

export default class App extends React.Component {

    constructor() {
        super()
        this.state = {
            magnetometer: null,
            // saves magnetic field strength data from magnetometer
            measurement: {
                x: 0,
                y: 0,
                z: 0,
            }
        }
    }

    getMagnetometer = async () => {
        // ask for magnetometer permission
        const {status} = await Magnetometer.requestPermissionsAsync()
        if (status !== 'granted') {
            console.error('permission denied')
            return
        }
        // subscribe to data from magnetometer and update this.state accordingly
        const listener = Magnetometer.addListener(measurement => this.setState({measurement}))
        // return the subscription
        return listener
    }

    componentDidMount() {
        // record the magnetometer subscription in this.state
        const listener = this.getMagnetometer()
        this.setState({magnetometer: listener})
    }

    componentWillUnmount() {
        // remove the subscription on magnetometer and remove this listener from this.state
        this.state.magnetometer.remove()
        this.setState({magnetometer: null})
    }

    render() {
        if (this.state.magnetometer === null) {
            // if not loaded, return a loading screen
            return (
                <View style={styles.container}>
                    <Text>Loading...</Text>
                </View>
            )
        } else {
            // compute compass heading from magnetometer data (angle in radian)
            // source of formula: https://arduino.stackexchange.com/questions/18625/converting-three-axis-magnetometer-to-degrees
            const angle = Math.atan2(this.state.measurement.x, this.state.measurement.y)
            return (
                <View style={styles.container}>
                    <ImageBackground source={require('./assets/compassBG.png')} 
                        style={styles.imageBackground}>
                        <Image source={require('./assets/compassNeedle.png')} 
                            style={{
                                ...styles.image, 
                                // rotate compass needle by the computed angle
                                transform: [{rotate: `${angle}rad`}]
                            }} />
                    </ImageBackground>
                </View>
            )
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
    imageBackground: {
        height: Dimensions.get('window').width * 0.8,
        width: Dimensions.get('window').width * 0.8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 70,
        height: 430,
    },
});
