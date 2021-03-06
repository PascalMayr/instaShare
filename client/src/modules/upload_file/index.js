import axios from 'axios'
import is_user_logged_in from '../is_user_logged_in'
import throw_error  from '../throw_error'

const upload_file = (file, callback = () => {}) => {
  is_user_logged_in((jwt, user) => {
    let formData = new FormData();
    formData.append("file1", file); // adding file as formData
    
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${jwt}`
      } // protected routes need an Authorization header
    }

    axios.post(process.env.REACT_APP_SERVER_HOST + "upload/" + user, formData, config)
    .then((result) => {
      if(result.data.error === undefined){
        callback(result.data)
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