import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { COLORS } from '../config/constants';
import { theme } from '../styles/theme';
import Button from '../components/ui/Button';
import { FiUser, FiLogOut, FiEdit2, FiCheck, FiX, FiPackage, FiMapPin, FiPhone, FiMail } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+91 (033) 6789-0123',
    address: 'Sector V, Salt Lake',
    city: 'Kolkata',
    state: 'West Bengal',
    country: 'India',
    postalCode: '700091'
  });

  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const mockOrders = [
    {
      id: 'ORD-001',
      date: '2024-01-15',
      total: 299.99,
      status: 'delivered',
      items: 3,
      trackingUrl: '#'
    },
    {
      id: 'ORD-002',
      date: '2024-01-10',
      total: 149.99,
      status: 'processing',
      items: 1,
      trackingUrl: '#'
    },
    {
      id: 'ORD-003',
      date: '2024-01-05',
      total: 89.99,
      status: 'shipped',
      items: 2,
      trackingUrl: '#'
    }
  ];

  const mockAddresses = [
    {
      id: 1,
      type: 'Home',
      address: 'Sector V, Salt Lake, Kolkata, West Bengal 700091',
      default: true
    },
    {
      id: 2,
      type: 'Work',
      address: 'EM Bypass, New Town, Kolkata, West Bengal 700156',
      default: false
    }
  ];

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getStatusLabel = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <PageContainer>
      <Container>
        <Sidebar>
          <ProfileCard>
            <ProfileAvatar>
              <FiUser size={40} />
            </ProfileAvatar>
            <ProfileName>{user?.name || 'User'}</ProfileName>
            <ProfileEmail>{user?.email || 'email@example.com'}</ProfileEmail>
            
            <NavTabs>
              <NavTab active={activeTab === 'profile'} onClick={() => setActiveTab('profile')}>
                👤 Profile
              </NavTab>
              <NavTab active={activeTab === 'orders'} onClick={() => setActiveTab('orders')}>
                📦 Orders
              </NavTab>
              <NavTab active={activeTab === 'addresses'} onClick={() => setActiveTab('addresses')}>
                📍 Addresses
              </NavTab>
            </NavTabs>

            <LogoutButton onClick={handleLogout}>
              <FiLogOut size={18} />
              Logout
            </LogoutButton>
          </ProfileCard>
        </Sidebar>

        <MainContent>
          {activeTab === 'profile' && (
            <ContentCard>
              <CardHeader>
                <Title>Personal Information</Title>
                {!isEditing && (
                  <EditButton onClick={handleEdit}>
                    <FiEdit2 size={18} />
                    Edit
                  </EditButton>
                )}
              </CardHeader>

              {isEditing ? (
                <Form>
                  <FormRow>
                    <FormGroup>
                      <Label>Full Name</Label>
                      <Input
                        type="text"
                        name="name"
                        value={editData.name}
                        onChange={handleChange}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label>Email</Label>
                      <Input
                        type="email"
                        name="email"
                        value={editData.email}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </FormRow>

                  <FormRow>
                    <FormGroup>
                      <Label>Phone</Label>
                      <Input
                        type="tel"
                        name="phone"
                        value={editData.phone}
                        onChange={handleChange}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label>Address</Label>
                      <Input
                        type="text"
                        name="address"
                        value={editData.address}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </FormRow>

                  <FormRow>
                    <FormGroup>
                      <Label>City</Label>
                      <Input
                        type="text"
                        name="city"
                        value={editData.city}
                        onChange={handleChange}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label>State</Label>
                      <Input
                        type="text"
                        name="state"
                        value={editData.state}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </FormRow>

                  <FormRow>
                    <FormGroup>
                      <Label>Country</Label>
                      <Input
                        type="text"
                        name="country"
                        value={editData.country}
                        onChange={handleChange}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label>Postal Code</Label>
                      <Input
                        type="text"
                        name="postalCode"
                        value={editData.postalCode}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </FormRow>

                  <ButtonGroup>
                    <Button onClick={handleSave}>
                      <FiCheck size={18} />
                      Save Changes
                    </Button>
                    <Button secondary onClick={handleCancel}>
                      <FiX size={18} />
                      Cancel
                    </Button>
                  </ButtonGroup>
                </Form>
              ) : (
                <InfoGrid>
                  <InfoItem>
                    <InfoLabel>
                      <FiUser size={18} />
                      Full Name
                    </InfoLabel>
                    <InfoValue>{editData.name}</InfoValue>
                  </InfoItem>
                  <InfoItem>
                    <InfoLabel>
                      <FiMail size={18} />
                      Email
                    </InfoLabel>
                    <InfoValue>{editData.email}</InfoValue>
                  </InfoItem>
                  <InfoItem>
                    <InfoLabel>
                      <FiPhone size={18} />
                      Phone
                    </InfoLabel>
                    <InfoValue>{editData.phone}</InfoValue>
                  </InfoItem>
                  <InfoItem>
                    <InfoLabel>
                      <FiMapPin size={18} />
                      Address
                    </InfoLabel>
                    <InfoValue>{editData.address}</InfoValue>
                  </InfoItem>
                  <InfoItem>
                    <InfoLabel>City</InfoLabel>
                    <InfoValue>{editData.city}</InfoValue>
                  </InfoItem>
                  <InfoItem>
                    <InfoLabel>State</InfoLabel>
                    <InfoValue>{editData.state}</InfoValue>
                  </InfoItem>
                  <InfoItem>
                    <InfoLabel>Country</InfoLabel>
                    <InfoValue>{editData.country}</InfoValue>
                  </InfoItem>
                  <InfoItem>
                    <InfoLabel>Postal Code</InfoLabel>
                    <InfoValue>{editData.postalCode}</InfoValue>
                  </InfoItem>
                </InfoGrid>
              )}
            </ContentCard>
          )}

          {activeTab === 'orders' && (
            <ContentCard>
              <CardHeader>
                <Title>
                  <FiPackage size={24} />
                  My Orders
                </Title>
              </CardHeader>

              <OrdersList>
                {mockOrders.map(order => (
                  <OrderCard key={order.id}>
                    <OrderHeader>
                      <OrderInfo>
                        <OrderId>{order.id}</OrderId>
                        <OrderDate>{new Date(order.date).toLocaleDateString()}</OrderDate>
                      </OrderInfo>
                      <OrderStatus status={order.status}>
                        {getStatusLabel(order.status)}
                      </OrderStatus>
                    </OrderHeader>
                    <OrderDetails>
                      <DetailRow>
                        <DetailLabel>Items: {order.items}</DetailLabel>
                        <DetailValue>${order.total.toFixed(2)}</DetailValue>
                      </DetailRow>
                    </OrderDetails>
                    <OrderActions>
                      <OrderLink href={order.trackingUrl}>View Details</OrderLink>
                      {order.status === 'delivered' && (
                        <OrderLink href="#">Write Review</OrderLink>
                      )}
                    </OrderActions>
                  </OrderCard>
                ))}
              </OrdersList>
            </ContentCard>
          )}

          {activeTab === 'addresses' && (
            <ContentCard>
              <CardHeader>
                <Title>
                  <FiMapPin size={24} />
                  Saved Addresses
                </Title>
                <Button>+ Add New Address</Button>
              </CardHeader>

              <AddressList>
                {mockAddresses.map(address => (
                  <AddressCard key={address.id} default={address.default}>
                    <AddressHeader>
                      <AddressType>{address.type}</AddressType>
                      {address.default && <DefaultBadge>Default</DefaultBadge>}
                    </AddressHeader>
                    <AddressValue>{address.address}</AddressValue>
                    <AddressActions>
                      <AddressLink href="#">Edit</AddressLink>
                      {!address.default && (
                        <AddressLink href="#">Delete</AddressLink>
                      )}
                    </AddressActions>
                  </AddressCard>
                ))}
              </AddressList>
            </ContentCard>
          )}
        </MainContent>
      </Container>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  min-height: 100vh;
  background: ${COLORS.BG_PRIMARY};
  padding: ${theme.spacing['2xl']} ${theme.spacing.lg};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: ${theme.spacing['3xl']};

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const Sidebar = styled.div`
  height: fit-content;
  position: sticky;
  top: 100px;
`;

const ProfileCard = styled.div`
  background: ${COLORS.WHITE};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing['2xl']};
  box-shadow: ${theme.shadows.md};
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

const ProfileAvatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: ${COLORS.PRIMARY_GRADIENT};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${COLORS.WHITE};
  margin: 0 auto;
`;

const ProfileName = styled.h3`
  margin: 0;
  color: ${COLORS.TEXT_PRIMARY};
  font-size: ${theme.fontSizes.lg};
`;

const ProfileEmail = styled.p`
  margin: 0;
  color: ${COLORS.TEXT_SECONDARY};
  font-size: ${theme.fontSizes.sm};
`;

const NavTabs = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.lg} 0;
  border-top: 1px solid ${COLORS.BG_TERTIARY};
  border-bottom: 1px solid ${COLORS.BG_TERTIARY};
`;

const NavTab = styled.button`
  background: ${props => props.active ? COLORS.BG_SECONDARY : 'transparent'};
  border: none;
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
  color: ${props => props.active ? COLORS.PRIMARY : COLORS.TEXT_SECONDARY};
  font-weight: ${props => props.active ? theme.fontWeights.semibold : theme.fontWeights.medium};
  transition: all ${theme.transitions.fast};

  &:hover {
    background: ${COLORS.BG_SECONDARY};
    color: ${COLORS.PRIMARY};
  }
`;

const LogoutButton = styled.button`
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid ${COLORS.ERROR};
  color: ${COLORS.ERROR};
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
  font-weight: ${theme.fontWeights.semibold};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  transition: all ${theme.transitions.fast};

  &:hover {
    background: ${COLORS.ERROR};
    color: ${COLORS.WHITE};
  }
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing['2xl']};
`;

const ContentCard = styled.div`
  background: ${COLORS.WHITE};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing['2xl']};
  box-shadow: ${theme.shadows.md};
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing['2xl']};
  padding-bottom: ${theme.spacing.lg};
  border-bottom: 1px solid ${COLORS.BG_TERTIARY};
`;

const Title = styled.h2`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  margin: 0;
  color: ${COLORS.TEXT_PRIMARY};
  font-size: ${theme.fontSizes.xl};
`;

const EditButton = styled.button`
  background: ${COLORS.BG_SECONDARY};
  border: 1px solid ${COLORS.BG_TERTIARY};
  color: ${COLORS.PRIMARY};
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.lg};
  cursor: pointer;
  font-weight: ${theme.fontWeights.semibold};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  transition: all ${theme.transitions.fast};

  &:hover {
    background: ${COLORS.PRIMARY};
    color: ${COLORS.WHITE};
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.lg};

  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

const Label = styled.label`
  font-weight: ${theme.fontWeights.semibold};
  color: ${COLORS.TEXT_PRIMARY};
  font-size: ${theme.fontSizes.sm};
`;

const Input = styled.input`
  padding: ${theme.spacing.md} ${theme.spacing.lg};
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

const ButtonGroup = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.lg};
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing['2xl']};

  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const InfoItem = styled.div`
  padding: ${theme.spacing.lg};
  background: ${COLORS.BG_SECONDARY};
  border-radius: ${theme.borderRadius.lg};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

const InfoLabel = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  color: ${COLORS.TEXT_SECONDARY};
  font-size: ${theme.fontSizes.sm};
  font-weight: ${theme.fontWeights.semibold};
`;

const InfoValue = styled.div`
  color: ${COLORS.TEXT_PRIMARY};
  font-size: ${theme.fontSizes.base};
  font-weight: ${theme.fontWeights.medium};
`;

const OrdersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

const OrderCard = styled.div`
  border: 1px solid ${COLORS.BG_TERTIARY};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
  transition: all ${theme.transitions.fast};

  &:hover {
    border-color: ${COLORS.PRIMARY};
    box-shadow: ${theme.shadows.md};
  }
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const OrderInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
`;

const OrderId = styled.div`
  font-weight: ${theme.fontWeights.bold};
  color: ${COLORS.TEXT_PRIMARY};
`;

const OrderDate = styled.div`
  color: ${COLORS.TEXT_SECONDARY};
  font-size: ${theme.fontSizes.sm};
`;

const OrderStatus = styled.span`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  background: ${props => {
    switch (props.status) {
      case 'delivered':
        return `${COLORS.SUCCESS}20`;
      case 'shipped':
        return `${COLORS.ACCENT}20`;
      case 'processing':
        return `${COLORS.WARNING}20`;
      case 'cancelled':
        return `${COLORS.ERROR}20`;
      default:
        return `${COLORS.TEXT_SECONDARY}20`;
    }
  }};
  color: ${props => {
    switch (props.status) {
      case 'delivered':
        return COLORS.SUCCESS;
      case 'shipped':
        return COLORS.ACCENT;
      case 'processing':
        return COLORS.WARNING;
      case 'cancelled':
        return COLORS.ERROR;
      default:
        return COLORS.TEXT_SECONDARY;
    }
  }};
  border-radius: ${theme.borderRadius.md};
  font-weight: ${theme.fontWeights.semibold};
  font-size: ${theme.fontSizes.sm};
`;

const OrderDetails = styled.div`
  display: flex;
  gap: ${theme.spacing.xl};
`;

const DetailRow = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
`;

const DetailLabel = styled.span`
  color: ${COLORS.TEXT_SECONDARY};
  font-size: ${theme.fontSizes.sm};
`;

const DetailValue = styled.span`
  font-weight: ${theme.fontWeights.bold};
  color: ${COLORS.TEXT_PRIMARY};
`;

const OrderActions = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  padding-top: ${theme.spacing.md};
  border-top: 1px solid ${COLORS.BG_TERTIARY};
`;

const OrderLink = styled.a`
  color: ${COLORS.PRIMARY};
  text-decoration: none;
  font-weight: ${theme.fontWeights.semibold};
  font-size: ${theme.fontSizes.sm};
  cursor: pointer;
  transition: color ${theme.transitions.fast};

  &:hover {
    color: ${COLORS.PRIMARY_DARK};
    text-decoration: underline;
  }
`;

const AddressList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.lg};

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const AddressCard = styled.div`
  border: 2px solid ${props => props.default ? COLORS.PRIMARY : COLORS.BG_TERTIARY};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
  background: ${props => props.default ? 'rgba(102, 126, 234, 0.05)' : 'transparent'};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

const AddressHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AddressType = styled.div`
  font-weight: ${theme.fontWeights.bold};
  color: ${COLORS.TEXT_PRIMARY};
`;

const DefaultBadge = styled.span`
  background: ${COLORS.PRIMARY};
  color: ${COLORS.WHITE};
  padding: ${theme.spacing.xs} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.fontSizes.xs};
  font-weight: ${theme.fontWeights.bold};
`;

const AddressValue = styled.div`
  color: ${COLORS.TEXT_SECONDARY};
  font-size: ${theme.fontSizes.sm};
  line-height: 1.6;
`;

const AddressActions = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  padding-top: ${theme.spacing.md};
  border-top: 1px solid ${COLORS.BG_TERTIARY};
`;

const AddressLink = styled.a`
  color: ${COLORS.PRIMARY};
  text-decoration: none;
  font-weight: ${theme.fontWeights.semibold};
  font-size: ${theme.fontSizes.sm};
  cursor: pointer;
  transition: color ${theme.transitions.fast};

  &:hover {
    color: ${COLORS.PRIMARY_DARK};
    text-decoration: underline;
  }
`;

const ProfileContainer = styled.div``;

const ContentWrapper = styled.div``;

const ProfileHeader = styled.div``;

const ProfileGrid = styled.div``;

const Section = styled.div``;

const SectionTitle = styled.div``;

const ProfileInfo = styled.div``;

const InfoItemOld = styled.div``;

const InfoLabelOld = styled.label``;

const InfoValueOld = styled.div``;

const TrackingSection = styled.div``;

const EmptyState = styled.div``;

const ActionButtons = styled.div``;

export default UserProfile;
