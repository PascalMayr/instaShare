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
      window.location.href = '/'
    }
    else{
      throw_error({}, "user token is expired")
      callback(result.data)
    }
  })
  .catch((err) => {
    throw_error(err, "could not get user")
  })
}

export default get_user