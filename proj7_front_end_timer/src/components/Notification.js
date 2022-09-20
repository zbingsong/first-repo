import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { useState, useEffect, useRef } from 'react';
import { Platform, Alert } from 'react-native';
import Pomodoro from './Pomodoro'

// Taken from post: https://dev.to/neeleshrj/local-notifications-using-expo-25il
Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  })

  
// Taken from official doc: https://docs.expo.dev/push-notifications/overview/
async function registerForPushNotificationsAsync() {
    let token
    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync()
        let finalStatus = existingStatus
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync()
            finalStatus = status
        }
        if (finalStatus !== 'granted') {
            Alert.alert(
                'Notification Error', 
                'Failed to get push token for push notification!', 
                [{
                    text: 'OK',
                    onPress: null
                }]
            )
            return
        }
        token = (await Notifications.getExpoPushTokenAsync()).data
        // console.log(token);
    } else {
        Alert.alert(
            'Notification error', 
            'Must use physical device for Push Notifications',
            [{
                text: 'OK',
                onPress: null
            }]
        )
    }
  
    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [500, 500, 500],
            sound: true,
            lightColor: '#FF231F7C',
            lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
        })
    }
    return token
}


async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: "Pomodoro Timer",
            body: 'Time is up!',
        },
        trigger: new Date(Date.now() + 50),
    })
}


// From official doc, modified
export default function LocalNotification() {
    const [expoPushToken, setExpoPushToken] = useState('')
    const [notification, setNotification] = useState(false)
    const notificationListener = useRef()
    const responseListener = useRef()
  
    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token))
    
        // This listener is fired whenever a notification is received while the app is foregrounded
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification)
        })
    
        // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response)
        })
    
        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current)
            Notifications.removeNotificationSubscription(responseListener.current)
        }
    }, [])

    return (
        <Pomodoro sendNotification={async () => {await schedulePushNotification()}} />
    )
}