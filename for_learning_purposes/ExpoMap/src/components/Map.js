import React from "react"
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location'
import { StyleSheet, Dimensions, Text, View } from "react-native"

const randomLocation = {latitude: 34, longitude: -118.3}

export default class Map extends React.Component {

    constructor() {
        super()
        this.state = {
            myLocation: {
                longitude: 200,
                latitude: 200,
            },
            schoolLocation: {
                longitude: 200,
                latitude: 200,
            },
            randomAddress: {
                street: '',
                city: '',
                region: '',
                country: '',
            },
        }
    }

    askForLocationPermissionAsync = async () => {
        let {status} = await Location.requestForegroundPermissionsAsync()
        if (status !== 'granted') {
            console.error('Location permission not granted')
            return
        }
        // return the current coordinates of the device
        const location = await Location.getCurrentPositionAsync({})
        // returns an array of coordinates whose addresses match to the address specified
        const USCLocation = await Location.geocodeAsync('651 W 35th St, Los Angeles, CA 90089')
        // return an array of addresses that match the input coordinates
        const randomAddress = await Location.reverseGeocodeAsync(randomLocation)
        // console.log(randomAddress)

        this.setState({
            myLocation: {
                longitude: location.coords.longitude, 
                latitude: location.coords.latitude
            },
            schoolLocation: {
                longitude: USCLocation[0].longitude,
                latitude: USCLocation[0].latitude
            },
            randomAddress: {
                street: randomAddress[0].street,
                city: randomAddress[0].city,
                region: randomAddress[0].region,
                country: randomAddress[0].country
            }
            
        })
    }

    componentDidMount() {
        this.askForLocationPermissionAsync()
    }

    render() {
        if (this.state.myLocation.longitude === 200) {
            // When location has not been fetched, return a loading screen
            return (
                <View>
                    <Text>Loading...</Text>
                </View>
            )
        } else {
            const randAddr = this.state.randomAddress
            const randomAddressStr = `${randAddr.street}, ${randAddr.city}, ${randAddr.region}, ${randAddr.country}`
            // console.log(this.state)
            return ( 
                <MapView style={styles.map} initialRegion={{
                    latitude: this.state.myLocation.latitude,
                    longitude: this.state.myLocation.longitude,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                }}>
                    <Marker title='Me' coordinate={this.state.myLocation} />
                    <Marker title="USC" coordinate={this.state.schoolLocation} pinColor='blue' />
                    <Marker title="random" coordinate={randomLocation} pinColor='green' 
                        description={randomAddressStr} />
                </MapView>
            )
        }
    }
}

const styles = StyleSheet.create({
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
})
