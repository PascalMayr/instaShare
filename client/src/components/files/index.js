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
      </Table>
  );
};

export default Files;