const validateEmail = function(email, callback = () => {}){
  let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if(!emailPattern.test(email)){
    callback(false)
  }
  else{
    callback(true)
  }
}

export default validateEmail