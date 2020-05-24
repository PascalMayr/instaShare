import React from 'react';
import { Table } from 'reactstrap';
import File from '../file'

const Files = (props) => {
  return (
      <Table dark className="rounded">
        <thead>
          <tr>
            <th scope="col">Filename</th>
            <th scope="col">Type</th>
            <th scope="col">Size (MB)</th>
            <th scope="col">Status</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            props.files && props.files.length > 0 &&
            props.files.map((file, index) => <File file={file} key={file.filename + index} {...props}/>)
          }
        </tbody>
      </Table>
  );
};

export default Files;