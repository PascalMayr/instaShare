const is_user_logged_in = (callback = () => {}) => {
  let jwt, user;
  if(typeof  window !== 'undefined'){
    jwt  = sessionStorage.getItem('jwt')
    user = sessionStorage.getItem('user') 
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