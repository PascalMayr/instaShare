import axios from 'axios'
import qs from 'querystring'
import login from '../login'
import throw_error from '../throw_error'

const signup = (email, password, errorCallback = () => {}, callback = () => {}) => {
  const requestBody = {
    email, password
  }
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
  axios.post(process.env.REACT_APP_SERVER_HOST + "users/", qs.stringify(requestBody), config)
  .then((result) => {
    if(result.data.error === undefined){
      callback(result.data)
      login(email, password)
    }
    else{
      throw_error({}, "couldn't signup user")
      errorCallback(result.data.message, result.data.error)
    }
  })
  .catch((err) => {
    throw_error(err, "couldn't signup user")
  })
}

export default signup