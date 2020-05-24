// a simple function to get the current users metadata by his id

import axios from 'axios'
import throw_error from '../throw_error'

const get_user = (jwt, user, callback = () => {}) => {
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Bearer ${jwt}`
    }
  }
  axios.get(process.env.REACT_APP_SERVER_HOST + "user/" + user, config)
  .then((result) => {
    if(result.data.tokenExpired){
      throw_error({}, "user token is expired")
      window.location.href = '/'
    }
    else{
      callback(result.data)
    }
  })
  .catch((err) => {
    throw_error(err, "couldn't get user")
  })
}

export default get_user