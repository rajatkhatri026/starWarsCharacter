import React, { useState } from 'react';
import {
  Button,
  Container,
  Card,
  CardBody,
  Input,
  Row,
  Col,
  FormGroup,
  Label,
} from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Import login function

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Attempt login (mocked with static check)
    if (login(username, password)) {
      navigate('/star-wars-characters'); // Redirect on successful login
    } else {
      setError('Invalid credentials, please try again.');
    }
  };
  return (
    <Container fluid className="container">
      <Row className="g-0 align-items-center">
        <Col md="6">
          <Card className="my-5 cascading-right first-col" style={{ background: 'hsla(0, 0%, 100%, 0.55)', backdropFilter: 'blur(30px)' }}>
            <CardBody className="p-5 shadow-5 text-center">

              <h2 className="fw-bold mb-5">Sign in</h2>

              <Row>
                <Col md="12">
                  <FormGroup className='fields'>
                    <Label className='text-start'>Email</Label>
                    <Input
                      type="text"
                      data-cy="username-input"
                      placeholder="Enter username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </FormGroup>
                </Col>

                <Col md="12">
                  <FormGroup className='fields'>
                    <Label>Password</Label>
                    <Input
                      type="password"
                      data-cy="password-input"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Button onClick={(e) => handleSubmit(e)} className="w-100 mb-4" size="md">Sign up</Button>
              {error && <span className='text-danger'>{error}</span>}
            </CardBody>
          </Card>
        </Col>

        <Col md="6">
          <img src="https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg" className="w-100 rounded-4 shadow-4" alt="" />
        </Col>

      </Row>

    </Container>
  );
}

export default LoginForm;
