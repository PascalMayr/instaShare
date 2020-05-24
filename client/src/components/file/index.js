import React, { useState } from 'react';
import { Button } from 'reactstrap';
import update_metadata from '../../modules/update_metadata'
import delete_file  from '../../modules/delete_file'

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
      <td>{((file.length / 1024) / 1024).toFixed(2)}</td>
      <td>
        {
          status === 200 ? // on status 200 show check
          <svg className="bi bi-check2-circle" width="1.5em" height="1.5em" viewBox="0 0 16 16" fill="lightgreen" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M15.354 2.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L8 9.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
            <path fillRule="evenodd" d="M8 2.5A5.5 5.5 0 1 0 13.5 8a.5.5 0 0 1 1 0 6.5 6.5 0 1 1-3.25-5.63.5.5 0 1 1-.5.865A5.472 5.472 0 0 0 8 2.5z"/>
          </svg>
          :  // else show a spinning arrow
          <svg className="bi bi-arrow-clockwise" width="1.5em" height="1.5em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M3.17 6.706a5 5 0 0 1 7.103-3.16.5.5 0 1 0 .454-.892A6 6 0 1 0 13.455 5.5a.5.5 0 0 0-.91.417 5 5 0 1 1-9.375.789z"/>
            <path fillRule="evenodd" d="M8.147.146a.5.5 0 0 1 .707 0l2.5 2.5a.5.5 0 0 1 0 .708l-2.5 2.5a.5.5 0 1 1-.707-.708L10.293 3 8.147.854a.5.5 0 0 1 0-.708z"/>
          </svg>
        }
      </td>
      <td className="actions">
        {/* delete button */}
        <Button
          color="danger"
          onClick={e => {
            delete_file(file._id);
            window.location.href = '/'
          }}
        >
          <svg className="bi bi-trash-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
          </svg>
        </Button>
      </td>
    </tr>
  );
};

export default File;