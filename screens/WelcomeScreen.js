import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { authContext } from '../store/auth-context';

function WelcomeScreen() {

  const [fetchedMessage, setFetchedMessage] = useState('')
  const authCtx = useContext(authContext)
  useEffect(() => {
    try {
      axios.get('https://expense-tracker-476c6-default-rtdb.firebaseio.com/message.json?auth='+ 
      authCtx.token
      ).then
        (
          (response) => {
            setFetchedMessage(response.data)
          }
        )
    }
    catch {
      Alert.alert("ERRor", "err")
    }
  }
    , [authCtx.token])

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Text>{fetchedMessage}</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
