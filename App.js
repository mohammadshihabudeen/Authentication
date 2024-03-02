import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import IconButton from './components/ui/IconButton'
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import { Colors } from './constants/styles';
import AuthContextProvider, { authContext } from './store/auth-context';
import { useContext } from 'react';

const Stack = createNativeStackNavigator();
function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const authCtx = useContext(authContext)
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} 
      options={{
        headerRight: ({tintColor})=>{
          return <IconButton 
          icon={'exit'}
          size={24} 
          color={tintColor} 
          onPress={authCtx.logout}/>
        }
      }}
      />
    </Stack.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(authContext)

  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack/>}
      {authCtx.isAuthenticated && <AuthenticatedStack/>}
    </NavigationContainer>
  );
}

function Root(){
  const authCtx = useContext(authContext)
  useEffect(()=>{
    async function fetchToken(){
        const storedToken = await AsyncStorage.getItem("token")
        if(storedToken)
        {authCtx.authenticate(storedToken)}
    }
    fetchToken()
},[])
return <Navigation />
}
export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
      <Root />
      </AuthContextProvider>
    </>
  );
}
