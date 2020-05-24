// check if the user is logged  in

const is_user_logged_in = (callback = () => {}) => {
  let jwt, user;
  if(typeof  window !== 'undefined'){
    jwt  = sessionStorage.getItem('jwt') // storing the temporary auth token in sessionStorage
    user = sessionStorage.getItem('user') // storing current user id in sessionStorage
    if(jwt === null && user === null){
      return false
    }
    else{
      callback(jwt, user)
      return true
    }
  }
  else{
    return false
  }
}

export default is_user_logged_in