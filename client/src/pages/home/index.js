import React, { useState } from 'react';
import { Jumbotron, Button, Container, Alert } from 'reactstrap';

const Home = () => {
  return (
    <div>
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
    </div>
  );
};

export default Home;