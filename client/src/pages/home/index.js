import React, { useState } from 'react';
import { Jumbotron, Button, Container, Alert } from 'reactstrap';
import is_user_logged_in from '../../modules/is_user_logged_in'
import Dropzone from 'react-dropzone'
import upload_file from '../../modules/upload_file'
import get_userassociated_files from '../../modules/get_userassociated_files'

const Home = () => {
  const [alert, setAlert ] =  useState('')
  const [files, setFiles ] =  useState([]) // the current list of files
  const [getFiles, setGetFiles ] =  useState(true)
  if(getFiles){
    get_userassociated_files((data) => {
      if(data.length === 0){
        setGetFiles(false)
      }
      if(data.length > 0){
        setGetFiles(false)
        setFiles(data)
      }
    })
  } // getting all files for the current user
  return (
    <div>
      {
        !is_user_logged_in() ?
        <Jumbotron>
          <p className="lead">This is a simple application to upload large files which can be shared instantly.</p>
          <p className="lead">
            <a href="/users/">
              <Button color="primary">Upload a file now</Button>
            </a>
          </p>
          <hr className="my-2" />
          <p>The app is using GridFS - a feature provided by mongodb for storing and retrieving files that exceed the BSON-document size limit of 16 MB.</p>
          <p className="lead">
            <a href="https://docs.mongodb.com/manual/core/gridfs/">
              <Button color="secondary">Learn More</Button>
            </a>
          </p>
        </Jumbotron>
        :
        <Container>
          <Dropzone onDrop={
            acceptedFiles => upload_file(acceptedFiles[0], (data) =>{
              setAlert(data.message)
              setTimeout(() => {
                setAlert('')
              }, 5000)
            })}>
            {({getRootProps, getInputProps}) => (
              <section>
                <div {...getRootProps()} className="dropzone">
                  <input {...getInputProps()} />
                  <svg className="bi bi-cloud-upload" width="3em" height="3em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.887 6.2l-.964-.165A2.5 2.5 0 1 0 3.5 11H6v1H3.5a3.5 3.5 0 1 1 .59-6.95 5.002 5.002 0 1 1 9.804 1.98A2.501 2.501 0 0 1 13.5 12H10v-1h3.5a1.5 1.5 0 0 0 .237-2.981L12.7 7.854l.216-1.028a4 4 0 1 0-7.843-1.587l-.185.96z"/>
                    <path fillRule="evenodd" d="M5 8.854a.5.5 0 0 0 .707 0L8 6.56l2.293 2.293A.5.5 0 1 0 11 8.146L8.354 5.5a.5.5 0 0 0-.708 0L5 8.146a.5.5 0 0 0 0 .708z"/>
                    <path fillRule="evenodd" d="M8 6a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0v-8A.5.5 0 0 1 8 6z"/>
                  </svg>
                  <p></p>
                  <span>Drag 'n' drop a file here, or click to select a file</span>
                </div>
              </section>
            )}
          </Dropzone>
          <p></p>
          {
            alert !== '' && <Alert color='success'>{alert}</Alert>
          }
          <p></p>
        </Container>
      }
    </div>
  );
};

export default Home;