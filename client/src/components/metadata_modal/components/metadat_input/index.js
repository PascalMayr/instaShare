import React, { useState } from 'react';

const MetadataInput = (props) => {
  const { value, onChange, hint = '' } = props
  const [inputValue, setInputValue] = useState(value)
  let inputType = typeof value === 'boolean' ? 'checkbox' : 'string'
  const toggle = () => { 
    onChange(!inputValue)
    setInputValue(!inputValue);
  };
  return (
    <span className="metadataInputHint">
      <input 
        value={inputValue}
        checked={inputValue}
        type={inputType}
        onChange={e => {
          if(inputType === 'checkbox'){
            toggle()
          }
          else{
            setInputValue(e.target.value);
            onChange(e.target.value)
          }
        }}
      />
      &nbsp;
      {hint}
    </span>
  )
}

export default MetadataInput;