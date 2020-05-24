import React, { useState } from 'react';
import { Button } from 'reactstrap';
import update_metadata from '../../modules/update_metadata'
import delete_file  from '../../modules/delete_file'

const File = (props) => {
  const { file } = props
  const [filename, setFilename] =  useState(file.filename)
  const [status, setStatus] =  useState(200)
  const downloadURI = process.env.REACT_APP_SERVER_HOST + "download/" + file._id
  return (
    <tr>
      <th>
        { /* let the user change the filename */}
      <input 
        placeholder="change filename"
        className="form-control"
        value={filename}
        onChange={e => {
          update_metadata(file._id, e.target.value, () => {}, (err) => {
            setStatus(401)
            props.alertFunction('There was a problem updating the file')
          })
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
          :
          status === 401 ?
          <svg className="bi bi-exclamation-circle" width="1.5em" height="1.5em" viewBox="0 0 16 16" fill="red" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
            <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
          </svg>
          :
          // else show a spinning arrow
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
        {/* download button */}
        <Button color="primary" onClick={e => {
            window.location.href = downloadURI
          }}>
          <svg className="bi bi-cloud-download" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.887 5.2l-.964-.165A2.5 2.5 0 1 0 3.5 10H6v1H3.5a3.5 3.5 0 1 1 .59-6.95 5.002 5.002 0 1 1 9.804 1.98A2.501 2.501 0 0 1 13.5 11H10v-1h3.5a1.5 1.5 0 0 0 .237-2.981L12.7 6.854l.216-1.028a4 4 0 1 0-7.843-1.587l-.185.96z"/>
            <path fillRule="evenodd" d="M5 12.5a.5.5 0 0 1 .707 0L8 14.793l2.293-2.293a.5.5 0 1 1 .707.707l-2.646 2.646a.5.5 0 0 1-.708 0L5 13.207a.5.5 0 0 1 0-.707z"/>
            <path fillRule="evenodd" d="M8 6a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0v-8A.5.5 0 0 1 8 6z"/>
          </svg>
          </Button>
          {/* share button */}
          <Button
            onClick={e => {
            navigator.clipboard.writeText(downloadURI)
            .then(() => {
              let success = 'Link copied to clipboard'
              props.alertFunction(success)
              setTimeout(() => {
                props.alertFunction('')
              }, 2000)
              console.log(success);
            })
            .catch(() => {
              console.log('Failed to copy text.');
            });
          }}>
          <svg className="bi bi-reply-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.079 11.9l4.568-3.281a.719.719 0 0 0 0-1.238L9.079 4.1A.716.716 0 0 0 8 4.719V6c-1.5 0-6 0-7 8 2.5-4.5 7-4 7-4v1.281c0 .56.606.898 1.079.62z"/>
          </svg>
          </Button>
      </td>
    </tr>
  );
};

export default File;