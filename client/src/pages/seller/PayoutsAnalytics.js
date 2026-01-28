import React, { useState } from 'react';
import styled from 'styled-components';
import { COLORS } from '../../config/constants';
import { theme } from '../../styles/theme';
import Button from '../../components/ui/Button';
import { FiTrendingUp, FiDollarSign, FiDownload, FiCalendar, FiBank, FiArrowUpRight } from 'react-icons/fi';

const PayoutsAnalytics = () => {
  const [dateRange, setDateRange] = useState({
    startDate: '2024-01-01',
    endDate: '2024-01-31'
  });

  const [payouts, setPayouts] = useState([
    {
      id: 'PAY-2024-001',
      date: '2024-01-15',
      amount: 45000,
      status: 'completed',
      method: 'NEFT Bank Transfer',
      bank: 'HDFC Bank',
      reference: 'NEFT-IND001',
      period: 'Jan 1-15, 2024',
      currency: '₹'
    },
    {
      id: 'PAY-2024-002',
      date: '2024-01-31',
      amount: 67500,
      status: 'completed',
      method: 'NEFT Bank Transfer',
      bank: 'ICICI Bank',
      reference: 'NEFT-IND002',
      period: 'Jan 16-31, 2024',
      currency: '₹'
    }
  ]);

  const analytics = {
    totalRevenue: 456000,
    totalCommission: 45600,
    totalPayouts: 112500,
    pendingPayout: 28900,
    commissionRate: 10,
    avgOrderValue: 1450,
    currency: '₹',
    location: 'Kolkata, West Bengal'
  };

  const monthlyData = [
    { month: 'Dec', revenue: 320000, payout: 80000 },
    { month: 'Jan', revenue: 456000, payout: 112500 },
    { month: 'Feb', revenue: 389000, payout: 97250 }
  ];

  const paymentMethods = [
    { id: 1, method: 'HDFC Bank', bank: 'HDFC Bank', account: '****1234', ifsc: 'HDFC0001234', accountType: 'Savings', isDefault: true },
    { id: 2, method: 'ICICI Bank', bank: 'ICICI Bank', account: '****5678', ifsc: 'ICIC0000001', accountType: 'Current', isDefault: false }
  ];

  const [showPaymentMethodForm, setShowPaymentMethodForm] = useState(false);
  const [newPaymentMethod, setNewPaymentMethod] = useState({
    bankName: '',
    accountNumber: '',
    ifscCode: '',
    accountHolder: '',
    accountType: 'savings'
  });

  const handleRequestPayout = (amount) => {
    if (amount > 0) {
      alert(`Payout request for ₹${amount.toLocaleString('en-IN')} initiated. You will receive confirmation within 2-3 business days at Kolkata, West Bengal.`);
    }
  };

  const handleDownloadStatement = () => {
    const csv = [
      ['Payout Statement Report - Kolkata, West Bengal'],
      ['Period:', `${dateRange.startDate} to ${dateRange.endDate}`],
      [''],
      ['Payout ID', 'Date', 'Amount (₹)', 'Status', 'Method', 'Bank', 'Reference'],
      ...payouts.map(p => [
        p.id,
        p.date,
        p.amount,
        p.status,
        p.method,
        p.bank,
        p.reference
      ]),
      [''],
      ['Summary'],
      ['Total Revenue (₹)', analytics.totalRevenue],
      ['Commission (₹)', analytics.totalCommission],
      ['Total Payouts (₹)', analytics.totalPayouts],
      ['Pending Payout (₹)', analytics.pendingPayout]
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `payout-statement-kolkata-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <PageContainer>
      <Container>
        <Header>
          <HeaderSection>
            <HeaderTitle>
              <FiDollarSign size={32} />
              Payouts & Analytics
            </HeaderTitle>
            <HeaderSubtitle>Track your earnings and manage payouts with ease</HeaderSubtitle>
          </HeaderSection>

          <DownloadButton onClick={handleDownloadStatement}>
            <FiDownload size={18} />
            Download Statement
          </DownloadButton>
        </Header>

        {/* Key Metrics */}
        <MetricsGrid>
          <MetricCard>
            <MetricLabel>Total Revenue</MetricLabel>
            <MetricValue>₹{analytics.totalRevenue.toLocaleString('en-IN')}</MetricValue>
            <MetricSubtext>All-time earnings</MetricSubtext>
          </MetricCard>

          <MetricCard highlight>
            <MetricLabel>Pending Payout</MetricLabel>
            <MetricValue>₹{analytics.pendingPayout.toLocaleString('en-IN')}</MetricValue>
            <MetricSubtext>Available for withdrawal</MetricSubtext>
            <QuickActionBtn onClick={() => handleRequestPayout(analytics.pendingPayout)}>
              Request Payout
            </QuickActionBtn>
          </MetricCard>

          <MetricCard>
            <MetricLabel>Commission Rate</MetricLabel>
            <MetricValue>{analytics.commissionRate}%</MetricValue>
            <MetricSubtext>Platform fee</MetricSubtext>
          </MetricCard>

          <MetricCard>
            <MetricLabel>Average Order Value</MetricLabel>
            <MetricValue>₹{analytics.avgOrderValue.toLocaleString('en-IN')}</MetricValue>
            <MetricSubtext>Per transaction</MetricSubtext>
          </MetricCard>

          <MetricCard>
            <MetricLabel>Total Commission</MetricLabel>
            <MetricValue>₹{analytics.totalCommission.toLocaleString('en-IN')}</MetricValue>
            <MetricSubtext>Total deducted</MetricSubtext>
          </MetricCard>

          <MetricCard>
            <MetricLabel>Total Payouts</MetricLabel>
            <MetricValue>₹{analytics.totalPayouts.toLocaleString('en-IN')}</MetricValue>
            <MetricSubtext>Received</MetricSubtext>
          </MetricCard>
        </MetricsGrid>

        {/* Charts & Details */}
        <ContentGrid>
          {/* Monthly Trends */}
          <ChartSection>
            <SectionTitle>Monthly Trends</SectionTitle>
            <ChartContainer>
              <MonthlyTable>
                <thead>
                  <tr>
                    <th>Month</th>
                    <th>Revenue (₹)</th>
                    <th>Payout (₹)</th>
                    <th>Growth</th>
                  </tr>
                </thead>
                <tbody>
                  {monthlyData.map((data, idx) => (
                    <tr key={idx}>
                      <td>{data.month}</td>
                      <td>{data.revenue.toLocaleString('en-IN')}</td>
                      <td>{data.payout.toLocaleString('en-IN')}</td>
                      <td>
                        <GrowthBadge>
                          <FiArrowUpRight size={14} />
                          {idx === 0 ? '-' : '+12.3%'}
                        </GrowthBadge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </MonthlyTable>
            </ChartContainer>
          </ChartSection>

          {/* Payout History */}
          <PayoutSection>
            <SectionTitle>Payout History</SectionTitle>
            <PayoutList>
              {payouts.map(payout => (
                <PayoutItem key={payout.id}>
                  <PayoutItemHeader>
                    <PayoutId>{payout.id}</PayoutId>
                    <StatusBadge completed={payout.status === 'completed'}>
                      {payout.status.charAt(0).toUpperCase() + payout.status.slice(1)}
                    </StatusBadge>
                  </PayoutItemHeader>
                  <PayoutDetails>
                    <DetailItem>
                      <DetailLabel>Period</DetailLabel>
                      <DetailValue>{payout.period}</DetailValue>
                    </DetailItem>
                    <DetailItem>
                      <DetailLabel>Amount</DetailLabel>
                      <DetailValue highlight>₹{payout.amount.toLocaleString('en-IN')}</DetailValue>
                    </DetailItem>
                    <DetailItem>
                      <DetailLabel>Method</DetailLabel>
                      <DetailValue>{payout.method}</DetailValue>
                    </DetailItem>
                    <DetailItem>
                      <DetailLabel>Reference</DetailLabel>
                      <DetailValue>{payout.reference}</DetailValue>
                    </DetailItem>
                    <DetailItem>
                      <DetailLabel>Date</DetailLabel>
                      <DetailValue>{payout.date}</DetailValue>
                    </DetailItem>
                  </PayoutDetails>
                </PayoutItem>
              ))}
            </PayoutList>
          </PayoutSection>
        </ContentGrid>

        {/* Payment Methods */}
        <PaymentMethodsSection>
          <PaymentHeader>
            <SectionTitle>Payment Methods</SectionTitle>
            <AddMethodButton onClick={() => setShowPaymentMethodForm(!showPaymentMethodForm)}>
              Add Payment Method
            </AddMethodButton>
          </PaymentHeader>

          {showPaymentMethodForm && (
            <FormSection>
              <FormTitle>Add Bank Account</FormTitle>
              <Form>
                <TwoColumnGrid>
                  <FormGroup>
                    <Label>Bank Name *</Label>
                    <Input
                      type="text"
                      placeholder="e.g., HDFC Bank"
                      value={newPaymentMethod.bankName}
                      onChange={(e) => setNewPaymentMethod({...newPaymentMethod, bankName: e.target.value})}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Account Type *</Label>
                    <Select
                      value={newPaymentMethod.accountType}
                      onChange={(e) => setNewPaymentMethod({...newPaymentMethod, accountType: e.target.value})}
                    >
                      <option value="savings">Savings</option>
                      <option value="current">Current</option>
                    </Select>
                  </FormGroup>
                </TwoColumnGrid>

                <FormGroup>
                  <Label>Account Holder Name *</Label>
                  <Input
                    type="text"
                    placeholder="Name as per bank records"
                    value={newPaymentMethod.accountHolder}
                    onChange={(e) => setNewPaymentMethod({...newPaymentMethod, accountHolder: e.target.value})}
                  />
                </FormGroup>

                <TwoColumnGrid>
                  <FormGroup>
                    <Label>Account Number *</Label>
                    <Input
                      type="text"
                      placeholder="16-digit account number"
                      value={newPaymentMethod.accountNumber}
                      onChange={(e) => setNewPaymentMethod({...newPaymentMethod, accountNumber: e.target.value})}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>IFSC Code *</Label>
                    <Input
                      type="text"
                      placeholder="e.g., HDFC0001234"
                      value={newPaymentMethod.ifscCode}
                      onChange={(e) => setNewPaymentMethod({...newPaymentMethod, ifscCode: e.target.value})}
                    />
                  </FormGroup>
                </TwoColumnGrid>

                <InfoBox>
                  ℹ️ Make sure your account details match your registered seller name
                </InfoBox>

                <ButtonGroup>
                  <Button primary type="button">Add Account</Button>
                  <Button secondary type="button" onClick={() => setShowPaymentMethodForm(false)}>Cancel</Button>
                </ButtonGroup>
              </Form>
            </FormSection>
          )}

          <PaymentMethodsList>
            {paymentMethods.map(method => (
              <PaymentMethodCard key={method.id} default={method.isDefault}>
                <CardHeader>
                  <BankIcon>🏦</BankIcon>
                  <BankDetails>
                    <BankName>{method.bank}</BankName>
                    <AccountType>{method.accountType.charAt(0).toUpperCase() + method.accountType.slice(1)} Account</AccountType>
                  </BankDetails>
                  {method.isDefault && <DefaultBadge>Default</DefaultBadge>}
                </CardHeader>
                <AccountDetails>
                  <AccountRow>
                    <AccountLabel>Account Number:</AccountLabel>
                    <AccountValue>{method.account}</AccountValue>
                  </AccountRow>
                  <AccountRow>
                    <AccountLabel>IFSC Code:</AccountLabel>
                    <AccountValue>{method.ifsc}</AccountValue>
                  </AccountRow>
                </AccountDetails>
                <CardActions>
                  {!method.isDefault && (
                    <ActionBtn>Set as Default</ActionBtn>
                  )}
                  <ActionBtn danger>Remove</ActionBtn>
                </CardActions>
              </PaymentMethodCard>
            ))}
          </PaymentMethodsList>
        </PaymentMethodsSection>

        {/* Tax Information */}
        <TaxSection>
          <SectionTitle>Tax Information</SectionTitle>
          <TaxGrid>
            <TaxItem>
              <TaxLabel>PAN (Permanent Account Number)</TaxLabel>
              <TaxValue>XXXXXXXXX5678</TaxValue>
              <EditLink>Update</EditLink>
            </TaxItem>
            <TaxItem>
              <TaxLabel>GST Number (if applicable)</TaxLabel>
              <TaxValue>27AABCT1234H1Z0</TaxValue>
              <EditLink>Update</EditLink>
            </TaxItem>
            <TaxItem>
              <TaxLabel>Annual Tax Filing</TaxLabel>
              <TaxValue>Required</TaxValue>
              <EditLink>View Documents</EditLink>
            </TaxItem>
          </TaxGrid>
        </TaxSection>
      </Container>
    </PageContainer>
  );
};

export default PayoutsAnalytics;

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
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: ${theme.spacing['3xl']};
  flex-wrap: wrap;
  gap: ${theme.spacing.lg};
`;

const HeaderSection = styled.div``;

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

const DownloadButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
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

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing['3xl']};
`;

const MetricCard = styled.div`
  background: ${COLORS.WHITE};
  padding: ${theme.spacing['2xl']};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.md};
  border-top: 4px solid ${props => props.highlight ? COLORS.PRIMARY : COLORS.BG_SECONDARY};
  transition: all ${theme.transitions.fast};

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${theme.shadows.lg};
  }
`;

const MetricLabel = styled.div`
  font-size: ${theme.fontSizes.sm};
  color: ${COLORS.TEXT_SECONDARY};
  margin-bottom: ${theme.spacing.sm};
`;

const MetricValue = styled.div`
  font-size: ${theme.fontSizes['2xl']};
  font-weight: ${theme.fontWeights.bold};
  color: ${COLORS.PRIMARY};
  margin-bottom: ${theme.spacing.xs};
`;

const MetricSubtext = styled.div`
  font-size: ${theme.fontSizes.xs};
  color: ${COLORS.TEXT_SECONDARY};
`;

const QuickActionBtn = styled.button`
  margin-top: ${theme.spacing.lg};
  width: 100%;
  padding: ${theme.spacing.md};
  background: ${COLORS.PRIMARY};
  color: ${COLORS.WHITE};
  border: none;
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
  font-weight: ${theme.fontWeights.semibold};
  transition: all ${theme.transitions.fast};

  &:hover {
    transform: scale(1.02);
    box-shadow: ${theme.shadows.md};
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing['3xl']};

  @media (max-width: ${theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`;

const ChartSection = styled.div`
  background: ${COLORS.WHITE};
  padding: ${theme.spacing['2xl']};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.md};
`;

const SectionTitle = styled.h2`
  margin: 0 0 ${theme.spacing.lg} 0;
  color: ${COLORS.TEXT_PRIMARY};
  font-size: ${theme.fontSizes.lg};
  padding-bottom: ${theme.spacing.lg};
  border-bottom: 2px solid ${COLORS.BG_SECONDARY};
`;

const ChartContainer = styled.div``;

const MonthlyTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  thead {
    background: ${COLORS.BG_SECONDARY};

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

const GrowthBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  padding: ${theme.spacing.xs} ${theme.spacing.md};
  background: #d4edda;
  color: #155724;
  border-radius: 12px;
  font-size: ${theme.fontSizes.sm};
  font-weight: ${theme.fontWeights.semibold};
`;

const PayoutSection = styled.div`
  background: ${COLORS.WHITE};
  padding: ${theme.spacing['2xl']};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.md};
`;

const PayoutList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

const PayoutItem = styled.div`
  border: 1px solid ${COLORS.BG_TERTIARY};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
`;

const PayoutItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.lg};
`;

const PayoutId = styled.div`
  font-weight: ${theme.fontWeights.bold};
  color: ${COLORS.TEXT_PRIMARY};
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: ${theme.spacing.xs} ${theme.spacing.md};
  background: ${props => props.completed ? '#d4edda' : '#fff3cd'};
  color: ${props => props.completed ? '#155724' : '#856404'};
  border-radius: 12px;
  font-size: ${theme.fontSizes.xs};
  font-weight: ${theme.fontWeights.bold};
`;

const PayoutDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: ${theme.spacing.lg};
`;

const DetailItem = styled.div``;

const DetailLabel = styled.div`
  font-size: ${theme.fontSizes.xs};
  color: ${COLORS.TEXT_SECONDARY};
  margin-bottom: ${theme.spacing.xs};
`;

const DetailValue = styled.div`
  font-size: ${theme.fontSizes.sm};
  font-weight: ${theme.fontWeights.semibold};
  color: ${props => props.highlight ? COLORS.PRIMARY : COLORS.TEXT_PRIMARY};
`;

const PaymentMethodsSection = styled.div`
  background: ${COLORS.WHITE};
  padding: ${theme.spacing['2xl']};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.md};
  margin-bottom: ${theme.spacing['3xl']};
`;

const PaymentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing['2xl']};
`;

const AddMethodButton = styled.button`
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  background: ${COLORS.PRIMARY};
  color: ${COLORS.WHITE};
  border: none;
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
  font-weight: ${theme.fontWeights.semibold};
`;

const FormSection = styled.div`
  background: ${COLORS.BG_SECONDARY};
  padding: ${theme.spacing['2xl']};
  border-radius: ${theme.borderRadius.lg};
  margin-bottom: ${theme.spacing['2xl']};
`;

const FormTitle = styled.h3`
  margin: 0 0 ${theme.spacing.lg} 0;
  color: ${COLORS.TEXT_PRIMARY};
`;

const Form = styled.div``;

const TwoColumnGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.lg};

  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div``;

const Label = styled.label`
  display: block;
  font-weight: ${theme.fontWeights.semibold};
  color: ${COLORS.TEXT_PRIMARY};
  margin-bottom: ${theme.spacing.sm};
  font-size: ${theme.fontSizes.sm};
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
  cursor: pointer;
`;

const InfoBox = styled.div`
  background: #e7f3ff;
  color: #0066cc;
  padding: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.md};
  margin: ${theme.spacing.lg} 0;
  font-size: ${theme.fontSizes.sm};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${theme.spacing.lg};
  margin-top: ${theme.spacing.lg};
`;

const PaymentMethodsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${theme.spacing.lg};
`;

const PaymentMethodCard = styled.div`
  border: 2px solid ${props => props.default ? COLORS.PRIMARY : COLORS.BG_TERTIARY};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
  background: ${props => props.default ? COLORS.PRIMARY + '05' : COLORS.WHITE};
`;

const CardHeader = styled.div`
  display: flex;
  gap: ${theme.spacing.lg};
  align-items: start;
  margin-bottom: ${theme.spacing.lg};
  padding-bottom: ${theme.spacing.lg};
  border-bottom: 1px solid ${COLORS.BG_TERTIARY};
`;

const BankIcon = styled.div`
  font-size: 32px;
`;

const BankDetails = styled.div`
  flex: 1;
`;

const BankName = styled.div`
  font-weight: ${theme.fontWeights.bold};
  color: ${COLORS.TEXT_PRIMARY};
`;

const AccountType = styled.div`
  font-size: ${theme.fontSizes.sm};
  color: ${COLORS.TEXT_SECONDARY};
`;

const DefaultBadge = styled.div`
  background: ${COLORS.PRIMARY};
  color: ${COLORS.WHITE};
  padding: ${theme.spacing.xs} ${theme.spacing.md};
  border-radius: 12px;
  font-size: ${theme.fontSizes.xs};
  font-weight: ${theme.fontWeights.bold};
`;

const AccountDetails = styled.div``;

const AccountRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${theme.spacing.sm} 0;
  font-size: ${theme.fontSizes.sm};
`;

const AccountLabel = styled.div`
  color: ${COLORS.TEXT_SECONDARY};
`;

const AccountValue = styled.div`
  font-weight: ${theme.fontWeights.semibold};
  color: ${COLORS.TEXT_PRIMARY};
  font-family: 'Courier New', monospace;
`;

const CardActions = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.lg};
`;

const ActionBtn = styled.button`
  flex: 1;
  padding: ${theme.spacing.md};
  border: 1px solid ${COLORS.BG_TERTIARY};
  background: ${COLORS.WHITE};
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
  font-weight: ${theme.fontWeights.semibold};
  color: ${props => props.danger ? '#dc3545' : COLORS.TEXT_PRIMARY};
  transition: all ${theme.transitions.fast};

  &:hover {
    background: ${props => props.danger ? '#dc354510' : COLORS.BG_SECONDARY};
  }
`;

const TaxSection = styled.div`
  background: ${COLORS.WHITE};
  padding: ${theme.spacing['2xl']};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.md};
`;

const TaxGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${theme.spacing.lg};
`;

const TaxItem = styled.div`
  padding: ${theme.spacing.lg};
  background: ${COLORS.BG_SECONDARY};
  border-radius: ${theme.borderRadius.md};
`;

const TaxLabel = styled.div`
  font-size: ${theme.fontSizes.sm};
  color: ${COLORS.TEXT_SECONDARY};
  margin-bottom: ${theme.spacing.sm};
`;

const TaxValue = styled.div`
  font-weight: ${theme.fontWeights.bold};
  color: ${COLORS.TEXT_PRIMARY};
  margin-bottom: ${theme.spacing.md};
  font-family: 'Courier New', monospace;
`;

const EditLink = styled.button`
  background: none;
  border: none;
  color: ${COLORS.PRIMARY};
  cursor: pointer;
  font-weight: ${theme.fontWeights.semibold};
  text-decoration: underline;
  padding: 0;

  &:hover {
    opacity: 0.8;
  }
`;
