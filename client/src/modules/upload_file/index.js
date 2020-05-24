import axios from 'axios'
import is_user_logged_in from '../is_user_logged_in'
import throw_error  from '../throw_error'

const upload_file = (file, callback = () => {}) => {
  is_user_logged_in((jwt, user) => {
    let formData = new FormData();
    
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${jwt}`
      }
    }

    axios.post(process.env.REACT_APP_SERVER_HOST + "upload/" + user, formData, config)
    .then((result) => {
      callback(result.data)
      if(result.data.error === undefined){
        console.log(result.data)
      }
      else{
        throw_error(result.data.error, "couldn't upload file")
      }
    })
    .catch((err) => {
      throw_error(err, "couldn't upload file")
    })
  })
}

export default upload_file