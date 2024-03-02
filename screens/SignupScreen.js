import { useContext, useState } from 'react';
import AuthContent from '../components/Auth/AuthContent';
import { CreateUser } from '../util/Auth';
import LoadingOverlay from '../components/ui/LoadingOverlay'
import { Alert } from 'react-native';
import { authContext } from '../store/auth-context';
function SignupScreen() {
  const authCtx = useContext(authContext)
  const [isAuthenticating,setIsAuthenticating] = useState(false)
  async function AuthenticateHandler({email,password}){
    setIsAuthenticating(true);
    try {
      console.log(email,password)
      const token = await CreateUser(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert(
        'Authentication failed',
        error
      );
      setIsAuthenticating(false);
    }
  }
  if (isAuthenticating)
  {
    return <LoadingOverlay message={"Creating User..."}/>
  }
  return <AuthContent onAuthenticate={AuthenticateHandler}/>;
}

export default SignupScreen;
