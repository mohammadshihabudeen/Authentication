import { useContext, useState } from 'react';
import AuthContent from '../components/Auth/AuthContent';
import { Login } from '../util/Auth';
import LoadingOverlay from '../components/ui/LoadingOverlay'
import { Alert } from 'react-native';
import { authContext } from '../store/auth-context';
function LoginScreen() {
  const authCtx = useContext(authContext);
  const [isAuthenticating,setIsauthenticating] = useState(false)
  async function AuthenticateHandler({email,password}){
    setIsauthenticating(true)
    try{
      const token= await Login(email,password)
      authCtx.authenticate(token)
      
    }
    catch{
      Alert.alert("Login Failed","Check Your Credentials")
    }
    setIsauthenticating(false)
  }
  if (isAuthenticating)
  {
    return <LoadingOverlay message={"Logging in..."}/>
  }
  return <AuthContent isLogin onAuthenticate={AuthenticateHandler}/>;
}

export default LoginScreen;
