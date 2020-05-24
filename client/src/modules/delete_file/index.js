import axios from 'axios'
import throw_error from '../throw_error'
import is_user_logged_in from '../is_user_logged_in'

const delete_file = (id, callback = () => {}) => {
  is_user_logged_in((jwt, user) => {
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${jwt}`
      }
    }
    axios.get(process.env.REACT_APP_SERVER_HOST + "delete/" + id, config)
    .then((result) => {
      callback(result.data)
      console.log(result.data)
    })
    .catch((err) => {
      throw_error(err, `couldn't delete file with id ${id}`)
    })
  })
}

export default delete_file