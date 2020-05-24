import React, { useState } from 'react';
import { Button } from 'reactstrap';
import update_metadata from '../../modules/update_metadata'

const File = (props) => {
  const { file } = props
  const [filename, setFilename] =  useState(file.filename)
  const [status, setStatus] =  useState(200)
  return (
    <tr>
      <th>
        { /* let the user change the filename */}
      <input 
        placeholder="change filename"
        className="form-control"
        value={filename}
        onChange={e => {
          update_metadata(file._id, e.target.value)
          setStatus(202)
          setFilename(e.target.value);
          // user feedback
          setTimeout(() => setStatus(200), 1000)
        }}
      />
      </th>
      <td>{file.contentType}</td>
    </tr>
  );
};

export default File;