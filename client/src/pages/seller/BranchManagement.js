import React, { useState } from 'react';
import styled from 'styled-components';
import { COLORS } from '../../config/constants';
import { theme } from '../../styles/theme';
import Button from '../../components/ui/Button';
import { FiMapPin, FiEdit, FiPlus, FiPhone, FiMail, FiNavigation } from 'react-icons/fi';

const BranchManagement = () => {
  const [branches, setBranches] = useState([
    {
      id: 1,
      name: 'Kolkata Salt Lake (Main)',
      type: 'Main Branch',
      address: 'Sector V, Salt Lake, Kolkata',
      city: 'Kolkata',
      state: 'West Bengal',
      pincode: '700091',
      phone: '+91-9876543210',
      email: 'kolkata.saltlake@indilink.com',
      manager: 'Rajesh Kumar',
      products: 128,
      staff: 12,
      isActive: true,
      coordinates: {
        lat: 22.5726,
        lng: 88.3639
      },
      country: 'India',
      currency: '₹'
    }
  ]);

  const [selectedBranch, setSelectedBranch] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: 'warehouse',
    address: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
    email: '',
    manager: ''
  });

  const [editingId, setEditingId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingId) {
      setBranches(branches.map(b => 
        b.id === editingId 
          ? { ...b, ...formData }
          : b
      ));
      setEditingId(null);
    } else {
      const newBranch = {
        ...formData,
        id: Math.max(...branches.map(b => b.id), 0) + 1,
        products: 0,
        staff: 0,
        isActive: true,
        coordinates: { lat: 22.5726, lng: 88.3639 }
      };
      setBranches([...branches, newBranch]);
    }

    setFormData({
      name: '',
      type: 'warehouse',
      address: '',
      city: '',
      state: '',
      pincode: '',
      phone: '',
      email: '',
      manager: ''
    });
    setShowAddForm(false);
  };

  const handleEdit = (branch) => {
    setEditingId(branch.id);
    setFormData({
      name: branch.name,
      type: branch.type,
      address: branch.address,
      city: branch.city,
      state: branch.state,
      pincode: branch.pincode,
      phone: branch.phone,
      email: branch.email,
      manager: branch.manager
    });
    setShowAddForm(true);
  };

  const handleDelete = (id) => {
    setBranches(branches.filter(b => b.id !== id));
    setSelectedBranch(null);
  };

  const handleToggleActive = (id) => {
    setBranches(branches.map(b =>
      b.id === id ? { ...b, isActive: !b.isActive } : b
    ));
  };

  return (
    <PageContainer>
      <Container>
        <Header>
          <HeaderTitle>
            <FiMapPin size={32} />
            Branch Management
          </HeaderTitle>
          <HeaderSubtitle>Manage your manufacturing and distribution branches</HeaderSubtitle>
        </Header>

        {/* Branch Statistics */}
        <StatsGrid>
          <StatCard>
            <StatLabel>Total Branches</StatLabel>
            <StatValue>{branches.length}</StatValue>
          </StatCard>
          <StatCard>
            <StatLabel>Active Branches</StatLabel>
            <StatValue>{branches.filter(b => b.isActive).length}</StatValue>
          </StatCard>
          <StatCard>
            <StatLabel>Total Products</StatLabel>
            <StatValue>{branches.reduce((sum, b) => sum + b.products, 0)}</StatValue>
          </StatCard>
          <StatCard>
            <StatLabel>Total Staff</StatLabel>
            <StatValue>{branches.reduce((sum, b) => sum + b.staff, 0)}</StatValue>
          </StatCard>
        </StatsGrid>

        {/* Branches List & Form Container */}
        <MainContent>
          {/* Left: Branches List */}
          <BranchesList>
            <ListHeader>
              <ListTitle>Branches</ListTitle>
              <AddButton onClick={() => {
                setShowAddForm(!showAddForm);
                setEditingId(null);
              }}>
                <FiPlus size={20} />
                Add Branch
              </AddButton>
            </ListHeader>

            {branches.map(branch => (
              <BranchItem 
                key={branch.id}
                selected={selectedBranch?.id === branch.id}
                onClick={() => setSelectedBranch(branch)}
              >
                <BranchItemHeader>
                  <BranchName>{branch.name}</BranchName>
                  <BranchType>{branch.type}</BranchType>
                </BranchItemHeader>
                <BranchItemMeta>
                  <MetaItem>
                    <FiMapPin size={14} />
                    {branch.city}, {branch.state}
                  </MetaItem>
                  <StatusBadge active={branch.isActive}>
                    {branch.isActive ? 'Active' : 'Inactive'}
                  </StatusBadge>
                </BranchItemMeta>
              </BranchItem>
            ))}
          </BranchesList>

          {/* Right: Branch Details or Form */}
          <BranchDetailsPanel>
            {showAddForm ? (
              <FormSection>
                <FormTitle>{editingId ? 'Edit Branch' : 'Add New Branch'}</FormTitle>
                <BranchForm onSubmit={handleSubmit}>
                  <FormGroup>
                    <Label>Branch Name *</Label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g., Kolkata Salt Lake Warehouse"
                      required
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>Branch Type *</Label>
                    <Select name="type" value={formData.type} onChange={handleInputChange}>
                      <option value="main">Main Branch</option>
                      <option value="warehouse">Warehouse</option>
                      <option value="distribution">Distribution Center</option>
                      <option value="retail">Retail Store</option>
                    </Select>
                  </FormGroup>

                  <FormGroup>
                    <Label>Street Address *</Label>
                    <Input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="e.g., Sector V, Salt Lake"
                      required
                    />
                  </FormGroup>

                  <TwoColumnGrid>
                    <FormGroup>
                      <Label>City *</Label>
                      <Input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="Kolkata"
                        required
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label>State *</Label>
                      <Input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        placeholder="West Bengal"
                        required
                      />
                    </FormGroup>
                  </TwoColumnGrid>

                  <FormGroup>
                    <Label>PIN Code *</Label>
                    <Input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      placeholder="700091"
                      required
                    />
                  </FormGroup>

                  <TwoColumnGrid>
                    <FormGroup>
                      <Label>Phone *</Label>
                      <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+91-XXXXXXXXXX"
                        required
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label>Email *</Label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="branch@indilink.com"
                        required
                      />
                    </FormGroup>
                  </TwoColumnGrid>

                  <FormGroup>
                    <Label>Branch Manager *</Label>
                    <Input
                      type="text"
                      name="manager"
                      value={formData.manager}
                      onChange={handleInputChange}
                      placeholder="Manager Name"
                      required
                    />
                  </FormGroup>

                  <ButtonGroup>
                    <Button type="submit" primary>
                      {editingId ? 'Update Branch' : 'Add Branch'}
                    </Button>
                    <Button 
                      type="button" 
                      secondary 
                      onClick={() => {
                        setShowAddForm(false);
                        setEditingId(null);
                      }}
                    >
                      Cancel
                    </Button>
                  </ButtonGroup>
                </BranchForm>
              </FormSection>
            ) : selectedBranch ? (
              <DetailsSection>
                <DetailsHeader>
                  <DetailsTitle>{selectedBranch.name}</DetailsTitle>
                  <DetailsActions>
                    <IconButton onClick={() => handleEdit(selectedBranch)}>
                      <FiEdit />
                    </IconButton>
                  </DetailsActions>
                </DetailsHeader>

                <DetailGrid>
                  <DetailItem>
                    <DetailLabel>Type</DetailLabel>
                    <DetailValue>{selectedBranch.type}</DetailValue>
                  </DetailItem>
                  <DetailItem>
                    <DetailLabel>Status</DetailLabel>
                    <DetailValue>
                      <StatusBadge active={selectedBranch.isActive}>
                        {selectedBranch.isActive ? 'Active' : 'Inactive'}
                      </StatusBadge>
                    </DetailValue>
                  </DetailItem>
                </DetailGrid>

                <DetailSection>
                  <SectionTitle>Address Information</SectionTitle>
                  <DetailText>
                    {selectedBranch.address}<br />
                    {selectedBranch.city}, {selectedBranch.state} {selectedBranch.pincode}
                  </DetailText>
                </DetailSection>

                <DetailSection>
                  <SectionTitle>Contact Information</SectionTitle>
                  <ContactItem>
                    <FiPhone size={20} />
                    <div>
                      <ContactLabel>Phone</ContactLabel>
                      <ContactValue>{selectedBranch.phone}</ContactValue>
                    </div>
                  </ContactItem>
                  <ContactItem>
                    <FiMail size={20} />
                    <div>
                      <ContactLabel>Email</ContactLabel>
                      <ContactValue>{selectedBranch.email}</ContactValue>
                    </div>
                  </ContactItem>
                </DetailSection>

                <DetailSection>
                  <SectionTitle>Management</SectionTitle>
                  <DetailText>
                    <strong>Branch Manager:</strong> {selectedBranch.manager}
                  </DetailText>
                </DetailSection>

                <DetailSection>
                  <SectionTitle>Operations</SectionTitle>
                  <DetailGrid>
                    <DetailItem>
                      <DetailLabel>Products Listed</DetailLabel>
                      <DetailValue>{selectedBranch.products}</DetailValue>
                    </DetailItem>
                    <DetailItem>
                      <DetailLabel>Staff Members</DetailLabel>
                      <DetailValue>{selectedBranch.staff}</DetailValue>
                    </DetailItem>
                  </DetailGrid>
                </DetailSection>

                <ActionSection>
                  <Button 
                    onClick={() => handleToggleActive(selectedBranch.id)}
                    secondary
                  >
                    {selectedBranch.isActive ? 'Deactivate Branch' : 'Activate Branch'}
                  </Button>
                  <Button 
                    onClick={() => handleDelete(selectedBranch.id)}
                    danger
                  >
                    Delete Branch
                  </Button>
                </ActionSection>
              </DetailsSection>
            ) : (
              <EmptyState>
                <EmptyIcon>📍</EmptyIcon>
                <EmptyTitle>Select a branch to view details</EmptyTitle>
                <EmptyText>Or click "Add Branch" to create a new branch</EmptyText>
              </EmptyState>
            )}
          </BranchDetailsPanel>
        </MainContent>
      </Container>
    </PageContainer>
  );
};

export default BranchManagement;

// Styled Components
const PageContainer = styled.div`
  min-height: 100vh;
  background: ${COLORS.BG_PRIMARY};
  padding: ${theme.spacing['2xl']} ${theme.spacing.lg};
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const Header = styled.div`
  margin-bottom: ${theme.spacing['2xl']};
`;

const HeaderTitle = styled.h1`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.lg};
  font-size: ${theme.fontSizes['3xl']};
  font-weight: ${theme.fontWeights.bold};
  color: ${COLORS.TEXT_PRIMARY};
  margin: 0 0 ${theme.spacing.sm} 0;

  svg {
    color: ${COLORS.PRIMARY};
  }
`;

const HeaderSubtitle = styled.p`
  color: ${COLORS.TEXT_SECONDARY};
  margin: 0;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing['2xl']};
`;

const StatCard = styled.div`
  background: ${COLORS.WHITE};
  padding: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.sm};
`;

const StatLabel = styled.div`
  font-size: ${theme.fontSizes.sm};
  color: ${COLORS.TEXT_SECONDARY};
  margin-bottom: ${theme.spacing.xs};
`;

const StatValue = styled.div`
  font-size: ${theme.fontSizes['2xl']};
  font-weight: ${theme.fontWeights.bold};
  color: ${COLORS.PRIMARY};
`;

const MainContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: ${theme.spacing.lg};

  @media (max-width: ${theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`;

const BranchesList = styled.div`
  background: ${COLORS.WHITE};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.md};
  display: flex;
  flex-direction: column;
  height: fit-content;
`;

const ListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${theme.spacing.lg};
  border-bottom: 2px solid ${COLORS.BG_SECONDARY};
`;

const ListTitle = styled.h3`
  margin: 0;
  color: ${COLORS.TEXT_PRIMARY};
  font-size: ${theme.fontSizes.lg};
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  background: ${COLORS.PRIMARY};
  color: ${COLORS.WHITE};
  border: none;
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
  font-weight: ${theme.fontWeights.semibold};
  transition: all ${theme.transitions.fast};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.md};
  }
`;

const BranchItem = styled.div`
  padding: ${theme.spacing.lg};
  border-bottom: 1px solid ${COLORS.BG_TERTIARY};
  cursor: pointer;
  transition: all ${theme.transitions.fast};
  background: ${props => props.selected ? COLORS.PRIMARY + '10' : 'transparent'};
  border-left: 3px solid ${props => props.selected ? COLORS.PRIMARY : 'transparent'};

  &:hover {
    background: ${COLORS.BG_SECONDARY};
  }

  &:last-child {
    border-bottom: none;
  }
`;

const BranchItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: ${theme.spacing.sm};
`;

const BranchName = styled.div`
  font-weight: ${theme.fontWeights.semibold};
  color: ${COLORS.TEXT_PRIMARY};
`;

const BranchType = styled.div`
  font-size: ${theme.fontSizes.xs};
  background: ${COLORS.BG_SECONDARY};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.sm};
  color: ${COLORS.TEXT_SECONDARY};
`;

const BranchItemMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${theme.fontSizes.sm};
  color: ${COLORS.TEXT_SECONDARY};
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: ${theme.spacing.xs} ${theme.spacing.md};
  border-radius: 12px;
  font-size: ${theme.fontSizes.xs};
  font-weight: ${theme.fontWeights.bold};
  background: ${props => props.active ? '#d4edda' : '#f8d7da'};
  color: ${props => props.active ? '#155724' : '#721c24'};
`;

const BranchDetailsPanel = styled.div`
  background: ${COLORS.WHITE};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.md};
  padding: ${theme.spacing['2xl']};
`;

const FormSection = styled.div``;

const FormTitle = styled.h2`
  margin: 0 0 ${theme.spacing.lg} 0;
  color: ${COLORS.TEXT_PRIMARY};
`;

const BranchForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

const FormGroup = styled.div``;

const Label = styled.label`
  display: block;
  font-weight: ${theme.fontWeights.semibold};
  color: ${COLORS.TEXT_PRIMARY};
  margin-bottom: ${theme.spacing.xs};
`;

const Input = styled.input`
  width: 100%;
  padding: ${theme.spacing.md};
  border: 1px solid ${COLORS.BG_TERTIARY};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.fontSizes.base};

  &:focus {
    outline: none;
    border-color: ${COLORS.PRIMARY};
    box-shadow: 0 0 0 3px ${COLORS.PRIMARY}20;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: ${theme.spacing.md};
  border: 1px solid ${COLORS.BG_TERTIARY};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.fontSizes.base};
  background: ${COLORS.WHITE};
  cursor: pointer;
`;

const TwoColumnGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.lg};

  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${theme.spacing.lg};
  margin-top: ${theme.spacing.lg};
`;

const DetailsSection = styled.div``;

const DetailsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing['2xl']};
  padding-bottom: ${theme.spacing.lg};
  border-bottom: 2px solid ${COLORS.BG_SECONDARY};
`;

const DetailsTitle = styled.h2`
  margin: 0;
  color: ${COLORS.TEXT_PRIMARY};
`;

const DetailsActions = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
`;

const IconButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid ${COLORS.BG_TERTIARY};
  background: ${COLORS.WHITE};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${COLORS.PRIMARY};
  transition: all ${theme.transitions.fast};

  &:hover {
    background: ${COLORS.PRIMARY}10;
    transform: scale(1.1);
  }
`;

const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing['2xl']};
`;

const DetailItem = styled.div``;

const DetailLabel = styled.div`
  font-size: ${theme.fontSizes.sm};
  color: ${COLORS.TEXT_SECONDARY};
  margin-bottom: ${theme.spacing.xs};
`;

const DetailValue = styled.div`
  font-size: ${theme.fontSizes.base};
  font-weight: ${theme.fontWeights.semibold};
  color: ${COLORS.TEXT_PRIMARY};
`;

const SectionTitle = styled.h3`
  margin: 0 0 ${theme.spacing.lg} 0;
  color: ${COLORS.TEXT_PRIMARY};
  font-size: ${theme.fontSizes.lg};
  padding-bottom: ${theme.spacing.md};
  border-bottom: 1px solid ${COLORS.BG_TERTIARY};
`;

const DetailText = styled.p`
  color: ${COLORS.TEXT_PRIMARY};
  margin: 0;
  line-height: 1.6;
`;

const DetailSection = styled.div`
  margin-bottom: ${theme.spacing['2xl']};
`;

const ContactItem = styled.div`
  display: flex;
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.lg};
  color: ${COLORS.PRIMARY};

  svg {
    flex-shrink: 0;
  }
`;

const ContactLabel = styled.div`
  font-size: ${theme.fontSizes.sm};
  color: ${COLORS.TEXT_SECONDARY};
`;

const ContactValue = styled.div`
  font-weight: ${theme.fontWeights.semibold};
  color: ${COLORS.TEXT_PRIMARY};
`;

const ActionSection = styled.div`
  display: flex;
  gap: ${theme.spacing.lg};
  margin-top: ${theme.spacing['2xl']};
  padding-top: ${theme.spacing['2xl']};
  border-top: 2px solid ${COLORS.BG_SECONDARY};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${theme.spacing['3xl']};
`;

const EmptyIcon = styled.div`
  font-size: 60px;
  margin-bottom: ${theme.spacing.lg};
`;

const EmptyTitle = styled.h3`
  color: ${COLORS.TEXT_PRIMARY};
  margin: 0 0 ${theme.spacing.sm} 0;
`;

const EmptyText = styled.p`
  color: ${COLORS.TEXT_SECONDARY};
  margin: 0;
`;
