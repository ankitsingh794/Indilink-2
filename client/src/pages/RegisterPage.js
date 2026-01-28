import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { COLORS } from '../config/constants';
import { theme } from '../styles/theme';
import Button from '../components/ui/Button';
import { FiUser, FiMail, FiLock, FiPhone } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState('buyer');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact_number: '',
    password: '',
    confirmPassword: '',
    address: '',
    city: '',
    state: '',
    country: '',
    postal_code: '',
    productDetails: ''
  });

  const navigate = useNavigate();
  const { login: authLogin } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        const response = await axios.post('http://localhost:5000/api/login', {
          email: formData.email,
          password: formData.password
        });

        if (response.data.status) {
          authLogin(response.data.data);
          navigate('/');
        } else {
          setError(response.data.message || 'Login failed');
        }
      } else {
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          setLoading(false);
          return;
        }

        const endpoint = userType === 'buyer' 
          ? 'http://localhost:5000/api/register' 
          : 'http://localhost:5000/api/seller-register';

        const response = await axios.post(endpoint, formData);

        if (response.data.status) {
          setFormData({
            name: '',
            email: '',
            contact_number: '',
            password: '',
            confirmPassword: '',
            address: '',
            city: '',
            state: '',
            country: '',
            postal_code: '',
            productDetails: ''
          });
          setIsLogin(true);
          setError('');
        } else {
          setError(response.data.message || 'Registration failed');
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <Container>
        <FormCard>
          <FormHeader>
            <Logo>Indilink</Logo>
            <h1>{isLogin ? 'Welcome Back' : 'Join Indilink'}</h1>
            <p>{isLogin ? 'Sign in to your account' : 'Create your account to get started'}</p>
          </FormHeader>

          {!isLogin && (
            <UserTypeSelector>
              <UserTypeButton
                type="button"
                active={userType === 'buyer'}
                onClick={() => setUserType('buyer')}
              >
                👤 Buyer
              </UserTypeButton>
              <UserTypeButton
                type="button"
                active={userType === 'seller'}
                onClick={() => setUserType('seller')}
              >
                🏪 Seller
              </UserTypeButton>
            </UserTypeSelector>
          )}

          {error && <ErrorAlert>{error}</ErrorAlert>}

          <Form onSubmit={handleSubmit}>
            {!isLogin && (
              <>
                <FormGroup>
                  <Label>Full Name</Label>
                  <InputWrapper>
                    <Icon><FiUser size={18} /></Icon>
                    <Input
                      type="text"
                      name="name"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </InputWrapper>
                </FormGroup>

                <FormGroup>
                  <Label>Phone Number</Label>
                  <InputWrapper>
                    <Icon><FiPhone size={18} /></Icon>
                    <Input
                      type="tel"
                      name="contact_number"
                      placeholder="Your phone number"
                      value={formData.contact_number}
                      onChange={handleChange}
                      required
                    />
                  </InputWrapper>
                </FormGroup>

                <FormGroup>
                  <Label>Address</Label>
                  <InputWrapper>
                    <Input
                      type="text"
                      name="address"
                      placeholder="Street address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                    />
                  </InputWrapper>
                </FormGroup>

                <FormRow>
                  <FormGroup flex>
                    <Label>City</Label>
                    <InputWrapper>
                      <Input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleChange}
                        required
                      />
                    </InputWrapper>
                  </FormGroup>
                  <FormGroup flex>
                    <Label>State</Label>
                    <InputWrapper>
                      <Input
                        type="text"
                        name="state"
                        placeholder="State"
                        value={formData.state}
                        onChange={handleChange}
                        required
                      />
                    </InputWrapper>
                  </FormGroup>
                </FormRow>

                <FormRow>
                  <FormGroup flex>
                    <Label>Country</Label>
                    <InputWrapper>
                      <Input
                        type="text"
                        name="country"
                        placeholder="Country"
                        value={formData.country}
                        onChange={handleChange}
                        required
                      />
                    </InputWrapper>
                  </FormGroup>
                  <FormGroup flex>
                    <Label>Postal Code</Label>
                    <InputWrapper>
                      <Input
                        type="text"
                        name="postal_code"
                        placeholder="Postal code"
                        value={formData.postal_code}
                        onChange={handleChange}
                        required
                      />
                    </InputWrapper>
                  </FormGroup>
                </FormRow>

                {userType === 'seller' && (
                  <FormGroup>
                    <Label>Product Details</Label>
                    <Textarea
                      name="productDetails"
                      placeholder="Describe what you sell..."
                      value={formData.productDetails}
                      onChange={handleChange}
                      rows={4}
                    />
                  </FormGroup>
                )}
              </>
            )}

            <FormGroup>
              <Label>Email Address</Label>
              <InputWrapper>
                <Icon><FiMail size={18} /></Icon>
                <Input
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </InputWrapper>
            </FormGroup>

            <FormGroup>
              <Label>Password</Label>
              <InputWrapper>
                <Icon><FiLock size={18} /></Icon>
                <Input
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </InputWrapper>
            </FormGroup>

            {!isLogin && (
              <FormGroup>
                <Label>Confirm Password</Label>
                <InputWrapper>
                  <Icon><FiLock size={18} /></Icon>
                  <Input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </InputWrapper>
              </FormGroup>
            )}

            <SubmitButton>
              <Button type="submit" disabled={loading} fullWidth>
                {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
              </Button>
            </SubmitButton>
          </Form>

          <Divider>or</Divider>

          <ToggleText>
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <ToggleLink onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? 'Sign Up' : 'Sign In'}
            </ToggleLink>
          </ToggleText>
        </FormCard>

        <InfoCard>
          <InfoTitle>{isLogin ? 'New to Indilink?' : 'Why Join Indilink?'}</InfoTitle>
          <InfoList>
            <InfoItem>✨ Authentic handcrafted products</InfoItem>
            <InfoItem>🌍 Global marketplace community</InfoItem>
            <InfoItem>🛡️ Secure & verified transactions</InfoItem>
            <InfoItem>🚚 Fast & reliable shipping</InfoItem>
            {!isLogin && userType === 'seller' && (
              <>
                <InfoItem>💰 Reach global customers</InfoItem>
                <InfoItem>📊 Analytics dashboard</InfoItem>
              </>
            )}
          </InfoList>
        </InfoCard>
      </Container>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  min-height: 100vh;
  background: ${COLORS.PRIMARY_GRADIENT};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing.lg};
`;

const Container = styled.div`
  max-width: 1000px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing['3xl']};

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.lg};
  }
`;

const FormCard = styled.div`
  background: ${COLORS.WHITE};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing['3xl']};
  box-shadow: ${theme.shadows.xl};
`;

const FormHeader = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing['2xl']};
`;

const Logo = styled.div`
  font-size: ${theme.fontSizes['2xl']};
  font-weight: ${theme.fontWeights.bold};
  background: ${COLORS.PRIMARY_GRADIENT};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: ${theme.spacing.md};
`;

const UserTypeSelector = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing['2xl']};
`;

const UserTypeButton = styled.button`
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border: 2px solid ${COLORS.BG_TERTIARY};
  background: ${props => props.active ? COLORS.PRIMARY : COLORS.WHITE};
  color: ${props => props.active ? COLORS.WHITE : COLORS.TEXT_PRIMARY};
  border-color: ${props => props.active ? COLORS.PRIMARY : COLORS.BG_TERTIARY};
  border-radius: ${theme.borderRadius.lg};
  cursor: pointer;
  font-weight: ${theme.fontWeights.semibold};
  transition: all ${theme.transitions.fast};

  &:hover {
    border-color: ${COLORS.PRIMARY};
  }
`;

const ErrorAlert = styled.div`
  background: rgba(239, 68, 68, 0.1);
  color: ${COLORS.ERROR};
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.md};
  margin-bottom: ${theme.spacing.lg};
  font-size: ${theme.fontSizes.sm};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
  flex: ${props => props.flex ? 1 : 'initial'};
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.md};
`;

const Label = styled.label`
  font-weight: ${theme.fontWeights.semibold};
  color: ${COLORS.TEXT_PRIMARY};
  font-size: ${theme.fontSizes.sm};
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const Icon = styled.span`
  position: absolute;
  left: ${theme.spacing.md};
  color: ${COLORS.TEXT_SECONDARY};
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  padding: ${theme.spacing.md} ${theme.spacing.md} ${theme.spacing.md} ${theme.spacing['3xl']};
  border: 1px solid ${COLORS.BG_TERTIARY};
  border-radius: ${theme.borderRadius.lg};
  font-size: ${theme.fontSizes.base};
  transition: all ${theme.transitions.fast};

  &:focus {
    outline: none;
    border-color: ${COLORS.PRIMARY};
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: ${theme.spacing.md};
  border: 1px solid ${COLORS.BG_TERTIARY};
  border-radius: ${theme.borderRadius.lg};
  font-size: ${theme.fontSizes.base};
  font-family: inherit;
  resize: vertical;
  transition: all ${theme.transitions.fast};

  &:focus {
    outline: none;
    border-color: ${COLORS.PRIMARY};
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const SubmitButton = styled.div`
  margin-top: ${theme.spacing.lg};
`;

const Divider = styled.div`
  text-align: center;
  color: ${COLORS.TEXT_SECONDARY};
  font-size: ${theme.fontSizes.sm};
  position: relative;
  padding: ${theme.spacing.lg} 0;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    width: 100%;
    height: 1px;
    background: ${COLORS.BG_TERTIARY};
  }

  &::after {
    content: attr(data-content);
    background: ${COLORS.WHITE};
    padding: 0 ${theme.spacing.md};
    position: relative;
  }
`;

const ToggleText = styled.p`
  text-align: center;
  color: ${COLORS.TEXT_SECONDARY};
  margin: 0;
  font-size: ${theme.fontSizes.sm};
`;

const ToggleLink = styled.button`
  background: none;
  border: none;
  color: ${COLORS.PRIMARY};
  cursor: pointer;
  font-weight: ${theme.fontWeights.semibold};
  text-decoration: none;
  transition: color ${theme.transitions.fast};

  &:hover {
    color: ${COLORS.PRIMARY_DARK};
    text-decoration: underline;
  }
`;

const InfoCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing['2xl']};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
  height: fit-content;

  @media (max-width: ${theme.breakpoints.md}) {
    display: none;
  }
`;

const InfoTitle = styled.h3`
  margin: 0;
  color: ${COLORS.TEXT_PRIMARY};
  font-size: ${theme.fontSizes.lg};
  font-weight: ${theme.fontWeights.bold};
`;

const InfoList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

const InfoItem = styled.li`
  color: ${COLORS.TEXT_SECONDARY};
  font-size: ${theme.fontSizes.base};
  line-height: 1.6;
`;

export default RegisterPage;
