import React, { useState } from 'react';
import {
  Container, Col, Form,
  FormGroup, Label, Input,
  Button, Alert
} from 'reactstrap';
import action_on_enter from '../../modules/action_on_enter'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validate = function(){
  }
  return (
  <main>
  <Container>
    <h2>Sign In</h2>
    <Form className="form">
      <Col>
        <FormGroup>
          <Label>Email</Label>
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="myemail@email.com"
            onChange={e => setEmail(e.target.value)}
            onKeyDown={e =>  action_on_enter(e, validate)}
          />
        </FormGroup>
      </Col>
      <Col>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="********"
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e =>  action_on_enter(e, validate)}
          />
        </FormGroup>
      </Col>
      <Button onClick={validate}>Submit</Button>
    </Form>
  </Container>
  </main>
  );
};

export default Login;