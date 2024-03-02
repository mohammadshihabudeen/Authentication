import { useState } from 'react';
import AuthContent from '../components/Auth/AuthContent';
import { CreateUser } from '../util/Auth';
import LoadingOverlay from '../components/ui/LoadingOverlay'

function SignupScreen() {
  const [isAuthenticating,setIsauthenticating] = useState(false)
  async function AuthenticateHandler({email,password}){
    setIsauthenticating(true)
    try{
      const token= await CreateUser(email,password)
      authCtx.authenticate(token)
    }
    catch{
      Alert.alert("Signin Failed","Check Your Credentials")
    }
    setIsauthenticating(false)
  }
  if (isAuthenticating)
  {
    return <LoadingOverlay message={"Creating User..."}/>
  }
  return <AuthContent onAuthenticate={AuthenticateHandler}/>;
}

export default SignupScreen;
