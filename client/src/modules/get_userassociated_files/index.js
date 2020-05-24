import axios from 'axios'
import is_user_logged_in from '../is_user_logged_in'
import throw_error from '../throw_error'

const get_userassociated_files = (callback = () => {}) => {
  is_user_logged_in((jwt, user) => {
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${jwt}`
      }
    }
    axios.get(process.env.REACT_APP_SERVER_HOST + "all/" + user, config)
    .then((result) => {
      if(result.data && result.data.tokenExpired){ 
        //TODO: add action when token is expired
        throw_error({}, "user token expired")
      }
      else{
        callback(result.data)
      }
    })
    .catch((err) => {
      throw_error(err, "couldn't get associated user files")
    })
  })
}

export default get_userassociated_files