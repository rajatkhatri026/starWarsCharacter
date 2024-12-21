// LoginForm.tsx
import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card, CardBody, CardTitle, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Import login function

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth()

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
    <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <Row>
        <Col xs={12}>
          <Card>
            <CardBody>
              <CardTitle className="text-center">Login</CardTitle>
              {error && <p className="text-danger text-center">{error}</p>}
              <Form onSubmit={handleSubmit}>
                <FormGroup controlid="formUsername" className="mb-3">
                  <Label>Username</Label>
                  <Input
                    type="text"
                    data-cy="username-input"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </FormGroup>

                <FormGroup controlid="formPassword" className="mb-3">
                  <Label>Password</Label>
                  <Input
                    type="password"
                    data-cy="password-input"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormGroup>

                <Button aria-label='login' data-cy="login-button" variant="primary" type="submit" className="w-100">
                  Log In
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
