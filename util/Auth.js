import axios from "axios";

const API_KEY = 'AIzaSyD4xeYu2F_2EcRMY3soZRDFdG8ljIlggqo'

export async function Authenticate(mode,email,password)
{
    const response = await axios.post
    (`https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=`
    +API_KEY,
    {
        email: email,
        password : password,
        returnSecureToken: true
    }
    )
    console.log(response)
    return response.data.idToken
}

export  function CreateUser(email,password)
{
    console.log("hi")
    return Authenticate("signUp",email,password)
}

export  function Login(email,password)
{
    return Authenticate("signInWithPassword",email,password)
}

