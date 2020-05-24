import axios from 'axios'
import qs from 'querystring'
import throw_error from '../throw_error'
import is_user_logged_in from '../is_user_logged_in'

const update_metadata = (id, filename = {}, callback = () => {}) => {
  is_user_logged_in((jwt, user) => {
    const requestBody = {
      id,
      filename
    }
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${jwt}`
      } // protected routes need an Authorization header
    }
    axios.post(process.env.REACT_APP_SERVER_HOST + "update/", qs.stringify(requestBody), config)
    .then((result) => {
      callback(result.data)
      console.log(result.data)
    })
    .catch((err) => {
      throw_error(err, `couldn't update filename for ${id}`)
    })
  })
}

export default update_metadata