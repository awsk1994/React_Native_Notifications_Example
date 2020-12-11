import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Button, View } from 'react-native';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({  // this is executed for OS to know what to do, before we display to user.
  handleNotification: async () => { // use async function, so we return a promise.
    return {
      shouldShowAlert: true // this will enable notification even though our app is already running.
    };
  }
});

export default function App() {
  useEffect(() => {
    // This function(.addNotificationReceivedListener) defines what to do when incoming notification is received and app is running.
    // Set to subscription variable, so we can turn off notification in the future.
    const subscription = Notifications.addNotificationReceivedListener(notification => {  
      console.log(notification)
    });

    // Clean up function, to avoid memory leak.
    return () => {
      subscription.remove();
    }
  }, []);

  const triggerNotificationHandler = () => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: 'My first local notification',
        body: 'This is the first local notification we are setting.'  // You can set more, but not all will be supported. If unsupported, will be ignored.s
      },
      trigger: {  // define when notification should be sent
        seconds: 10
      }
    });  // This creates local notification.
  };

  return (
    <View style={styles.container}>
      <Button title="Trigger Notification" onPress={triggerNotificationHandler}/>
      <StatusBar style="auto" />
    </View>
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
