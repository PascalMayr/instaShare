const action_on_enter  = function(e, callback = () => {}) {
  if (e.key === 'Enter') {
    callback()
  }
}

export default action_on_enter