// src/pages/SellerDashboard.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { COLORS } from '../config/constants';
import { theme } from '../styles/theme';
import Button from '../components/ui/Button';
import { FiPlus, FiPackage, FiShoppingCart, FiDollarSign, FiMapPin, FiTrendingUp, FiBarChart2 } from 'react-icons/fi';

const SellerDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data
  const stats = {
    totalProducts: 58,
    totalOrders: 324,
    totalRevenue: 456000,
    pendingOrders: 12,
    monthlyGrowth: 23,
    avgRating: 4.8,
    currency: '₹',
    location: 'Kolkata, West Bengal, India'
  };

  const quickActions = [
    {
      title: 'Add Product',
      description: 'List a new product with GST & HSN details',
      icon: <FiPlus size={28} />,
      action: '/seller/add-product',
      color: 'primary'
    },
    {
      title: 'Manage Products',
      description: 'Edit, delete, or update existing products',
      icon: <FiPackage size={28} />,
      action: '/seller/manage-products',
      color: 'blue'
    },
    {
      title: 'Orders',
      description: 'Track and manage customer orders',
      icon: <FiShoppingCart size={28} />,
      action: '/seller/orders',
      color: 'green'
    },
    {
      title: 'Branch Management',
      description: 'Manage branches - Kolkata Salt Lake',
      icon: <FiMapPin size={28} />,
      action: '/seller/branch-management',
      color: 'purple'
    },
    {
      title: 'Payouts & Analytics',
      description: 'View earnings and payment methods (INR ₹)',
      icon: <FiDollarSign size={28} />,
      action: '/seller/payouts-analytics',
      color: 'orange'
    }
  ];

  const recentOrders = [
    { id: 'ORD-2024-001', customer: 'Rajesh Kumar', amount: 2499, status: 'delivered', location: 'Kolkata' },
    { id: 'ORD-2024-002', customer: 'Priya Sharma', amount: 1499, status: 'in-transit', location: 'Kolkata' },
    { id: 'ORD-2024-003', customer: 'Amit Singh', amount: 3995, status: 'processing', location: 'Kolkata' }
  ];

  const formatIndianCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  return (
    <PageContainer>
      <Container>
        {/* Header */}
        <Header>
          <HeaderContent>
            <HeaderTitle>Seller Dashboard</HeaderTitle>
            <HeaderSubtitle>Manage your products, orders, and earnings on Indilink</HeaderSubtitle>
          </HeaderContent>
          <BranchInfo>
            📍 <strong>Branch:</strong> Kolkata Salt Lake, West Bengal, India 🇮🇳
          </BranchInfo>
        </Header>

        {/* Stats Grid */}
        <StatsGrid>
          <StatCard>
            <StatIcon>📦</StatIcon>
            <StatLabel>Total Products</StatLabel>
            <StatValue>{stats.totalProducts}</StatValue>
          </StatCard>
          <StatCard>
            <StatIcon>🛒</StatIcon>
            <StatLabel>Total Orders</StatLabel>
            <StatValue>{stats.totalOrders}</StatValue>
          </StatCard>
          <StatCard highlight>
            <StatIcon>💰</StatIcon>
            <StatLabel>Total Revenue</StatLabel>
            <StatValue>{formatIndianCurrency(stats.totalRevenue)}</StatValue>
          </StatCard>
          <StatCard>
            <StatIcon>📈</StatIcon>
            <StatLabel>Monthly Growth</StatLabel>
            <StatValue>{stats.monthlyGrowth}%</StatValue>
          </StatCard>
        </StatsGrid>

        {/* Quick Actions */}
        <QuickActionsSection>
          <SectionTitle>Quick Actions</SectionTitle>
          <QuickActionsGrid>
            {quickActions.map((action, idx) => (
              <QuickActionCard 
                key={idx}
                onClick={() => navigate(action.action)}
                color={action.color}
              >
                <ActionIcon>{action.icon}</ActionIcon>
                <ActionTitle>{action.title}</ActionTitle>
                <ActionDesc>{action.description}</ActionDesc>
                <ArrowIcon>→</ArrowIcon>
              </QuickActionCard>
            ))}
          </QuickActionsGrid>
        </QuickActionsSection>

        {/* Recent Orders */}
        <RecentOrdersSection>
          <SectionHeader>
            <SectionTitle>Recent Orders</SectionTitle>
            <ViewMoreBtn onClick={() => navigate('/seller/orders')}>
              View All Orders
            </ViewMoreBtn>
          </SectionHeader>
          <OrdersTable>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map(order => (
                <tr key={order.id}>
                  <td><strong>{order.id}</strong></td>
                  <td>{order.customer}</td>
                  <td><strong>₹{order.amount}</strong></td>
                  <td>
                    <StatusBadge status={order.status}>
                      {order.status}
                    </StatusBadge>
                  </td>
                </tr>
              ))}
            </tbody>
          </OrdersTable>
        </RecentOrdersSection>

        {/* Performance Tips */}
        <TipsSection>
          <TipsTitle>📊 Performance Tips</TipsTitle>
          <TipsList>
            <TipItem>
              <TipIcon>✓</TipIcon>
              <TipText>Ensure all products have clear images and detailed descriptions for better conversion</TipText>
            </TipItem>
            <TipItem>
              <TipIcon>✓</TipIcon>
              <TipText>Maintain accurate GST and HSN codes for compliance</TipText>
            </TipItem>
            <TipItem>
              <TipIcon>✓</TipIcon>
              <TipText>Process orders within 24 hours to maintain high ratings</TipText>
            </TipItem>
            <TipItem>
              <TipIcon>✓</TipIcon>
              <TipText>Check payouts weekly - Payments processed every 15 days to your registered bank account</TipText>
            </TipItem>
          </TipsList>
        </TipsSection>
      </Container>
    </PageContainer>
  );
};

export default SellerDashboard;

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
  margin-bottom: ${theme.spacing['3xl']};
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: ${theme.spacing.lg};
`;

const HeaderContent = styled.div``;

const HeaderTitle = styled.h1`
  font-size: ${theme.fontSizes['3xl']};
  font-weight: ${theme.fontWeights.bold};
  color: ${COLORS.TEXT_PRIMARY};
  margin: 0 0 ${theme.spacing.sm} 0;
`;

const HeaderSubtitle = styled.p`
  color: ${COLORS.TEXT_SECONDARY};
  margin: 0;
`;

const BranchInfo = styled.div`
  background: linear-gradient(135deg, ${COLORS.PRIMARY}20, ${COLORS.SECONDARY}20);
  padding: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.lg};
  font-size: ${theme.fontSizes.sm};
  color: ${COLORS.TEXT_PRIMARY};
  border-left: 4px solid ${COLORS.PRIMARY};
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing['3xl']};
`;

const StatCard = styled.div`
  background: ${COLORS.WHITE};
  padding: ${theme.spacing['2xl']};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.md};
  text-align: center;
  border-top: 4px solid ${props => props.highlight ? COLORS.PRIMARY : COLORS.BG_SECONDARY};
  transition: all ${theme.transitions.fast};

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${theme.shadows.lg};
  }
`;

const StatIcon = styled.div`
  font-size: 32px;
  margin-bottom: ${theme.spacing.md};
`;

const StatLabel = styled.div`
  color: ${COLORS.TEXT_SECONDARY};
  font-size: ${theme.fontSizes.sm};
  margin-bottom: ${theme.spacing.sm};
`;

const StatValue = styled.div`
  font-size: ${theme.fontSizes['2xl']};
  font-weight: ${theme.fontWeights.bold};
  color: ${COLORS.PRIMARY};
`;

const QuickActionsSection = styled.div`
  margin-bottom: ${theme.spacing['3xl']};
`;

const SectionTitle = styled.h2`
  font-size: ${theme.fontSizes.xl};
  font-weight: ${theme.fontWeights.bold};
  color: ${COLORS.TEXT_PRIMARY};
  margin: 0 0 ${theme.spacing.lg} 0;
`;

const QuickActionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: ${theme.spacing.lg};
`;

const QuickActionCard = styled.div`
  background: ${COLORS.WHITE};
  padding: ${theme.spacing['2xl']};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.md};
  cursor: pointer;
  transition: all ${theme.transitions.fast};
  border-left: 4px solid ${props => {
    switch(props.color) {
      case 'primary': return COLORS.PRIMARY;
      case 'blue': return '#3498db';
      case 'green': return '#27ae60';
      case 'purple': return '#9b59b6';
      case 'orange': return '#f39c12';
      default: return COLORS.BG_SECONDARY;
    }
  }};
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-6px);
    box-shadow: ${theme.shadows.lg};

    svg {
      opacity: 0.15;
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 100px;
    height: 100px;
    background: ${props => {
      switch(props.color) {
        case 'primary': return COLORS.PRIMARY;
        case 'blue': return '#3498db';
        case 'green': return '#27ae60';
        case 'purple': return '#9b59b6';
        case 'orange': return '#f39c12';
        default: return COLORS.BG_SECONDARY;
      }
    }};
    opacity: 0.05;
    border-radius: 50%;
  }
`;

const ActionIcon = styled.div`
  font-size: 32px;
  margin-bottom: ${theme.spacing.lg};
  color: ${COLORS.PRIMARY};
`;

const ActionTitle = styled.div`
  font-size: ${theme.fontSizes.lg};
  font-weight: ${theme.fontWeights.bold};
  color: ${COLORS.TEXT_PRIMARY};
  margin-bottom: ${theme.spacing.sm};
`;

const ActionDesc = styled.div`
  font-size: ${theme.fontSizes.sm};
  color: ${COLORS.TEXT_SECONDARY};
  margin-bottom: ${theme.spacing.lg};
`;

const ArrowIcon = styled.div`
  position: absolute;
  bottom: ${theme.spacing.lg};
  right: ${theme.spacing.lg};
  font-size: ${theme.fontSizes.xl};
  color: ${COLORS.PRIMARY};
  opacity: 0;
  transition: all ${theme.transitions.fast};

  ${QuickActionCard}:hover & {
    opacity: 1;
    transform: translateX(4px);
  }
`;

const RecentOrdersSection = styled.div`
  background: ${COLORS.WHITE};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.md};
  padding: ${theme.spacing['2xl']};
  margin-bottom: ${theme.spacing['3xl']};
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.lg};

  @media (max-width: ${theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${theme.spacing.lg};
  }
`;

const ViewMoreBtn = styled.button`
  padding: ${theme.spacing.md} ${theme.spacing.lg};
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

const OrdersTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  thead {
    background: ${COLORS.BG_SECONDARY};
    border-bottom: 2px solid ${COLORS.BG_TERTIARY};

    th {
      padding: ${theme.spacing.lg};
      text-align: left;
      font-weight: ${theme.fontWeights.semibold};
      color: ${COLORS.TEXT_PRIMARY};
    }
  }

  tbody tr {
    border-bottom: 1px solid ${COLORS.BG_TERTIARY};

    &:hover {
      background: ${COLORS.BG_SECONDARY};
    }
  }

  td {
    padding: ${theme.spacing.lg};
  }
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: ${theme.spacing.xs} ${theme.spacing.md};
  border-radius: 12px;
  font-size: ${theme.fontSizes.xs};
  font-weight: ${theme.fontWeights.bold};
  background: ${props => {
    switch(props.status) {
      case 'delivered': return '#d4edda';
      case 'in-transit': return '#d1ecf1';
      case 'processing': return '#fff3cd';
      default: return COLORS.BG_SECONDARY;
    }
  }};
  color: ${props => {
    switch(props.status) {
      case 'delivered': return '#155724';
      case 'in-transit': return '#0c5460';
      case 'processing': return '#856404';
      default: return COLORS.TEXT_PRIMARY;
    }
  }};
`;

const TipsSection = styled.div`
  background: linear-gradient(135deg, ${COLORS.PRIMARY}10, ${COLORS.SECONDARY}10);
  border: 1px solid ${COLORS.PRIMARY}30;
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing['2xl']};
`;

const TipsTitle = styled.h3`
  margin: 0 0 ${theme.spacing.lg} 0;
  color: ${COLORS.TEXT_PRIMARY};
  font-size: ${theme.fontSizes.lg};
`;

const TipsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${theme.spacing.lg};
`;

const TipItem = styled.div`
  display: flex;
  gap: ${theme.spacing.lg};
`;

const TipIcon = styled.div`
  color: ${COLORS.PRIMARY};
  font-weight: bold;
  font-size: ${theme.fontSizes.lg};
  flex-shrink: 0;
`;

const TipText = styled.div`
  color: ${COLORS.TEXT_PRIMARY};
  font-size: ${theme.fontSizes.sm};
  line-height: 1.6;
`;
