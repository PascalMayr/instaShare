// a simple function to login a user by email and password

import axios from 'axios'
import qs from 'querystring'
import throw_error from '../throw_error'

const login = (email, password, errorCallback = () => {}, callback = () => {}) => {
  const requestBody = {
    email, password
  } // creating request body
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    } // setting content-type header 
  }
  axios.post(process.env.REACT_APP_SERVER_HOST + "users/login/", qs.stringify(requestBody), config)
  .then((result) => {
    if(typeof window !== 'undefined'){
      if(result.data){
        sessionStorage.setItem('user', result.data.user._id)
        sessionStorage.setItem('jwt', result.data.token)
        callback(result.data)
        // redirecting user back to home after login
        window.location.href = '/'
      }
      if(result.error){
        throw_error({}, result.data.message)
        errorCallback(result.data.message, result.data.error)
      }
    }
  })
  .catch((error) => {
    console.log(JSON.stringify(error))
    throw_error(error, error.message)
    errorCallback("Couldn't sign in - please try again", error)
  })
}

export default login