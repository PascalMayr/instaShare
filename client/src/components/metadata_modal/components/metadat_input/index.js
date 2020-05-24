import React, { useState } from 'react';

const MetadataInput = (props) => {
  const { value, onChange, hint = '' } = props
  const [inputvalue, setInputValue] = useState(value)
  let inputType = typeof value === 'boolean' ? 'checkbox' : 'string'
  const toggle = () => setInputValue(!inputvalue);
  return (
    <span className="metadataInputHint">
      <input 
        value={inputvalue}
        checked={inputvalue}
        type={inputType}
        onChange={e => {
          if(inputType === 'checkbox'){
            toggle()
          }
          else{
            setInputValue(e.target.value);
          }
          onChange(e.target.value)
        }}
      />
      &nbsp;
      {hint}
    </span>
  )
}

export default MetadataInput;