// a universal error function to control error logging

const throw_error = (error = {}, message = "") => {
  console.error(error);
  console.log(message);
}

export default throw_error