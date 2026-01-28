import React, { useState } from 'react';
import styled from 'styled-components';
import { COLORS } from '../../config/constants';
import { theme } from '../../styles/theme';
import Button from '../../components/ui/Button';
import { FiPlus, FiUpload, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    productName: '',
    category: '',
    description: '',
    price: '',
    costPrice: '',
    gst: '18',
    hsnCode: '9999',
    sku: '',
    quantity: '',
    unit: 'pcs',
    images: [],
    certifications: '',
    manufacturingDate: '',
    expiryDate: '',
    currency: '₹',
    location: 'Kolkata, West Bengal',
    address: {
      street: 'Sector V, Salt Lake',
      city: 'Kolkata',
      state: 'West Bengal',
      pincode: '700091',
      country: 'India'
    }
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [imagePreview, setImagePreview] = useState([]);

  const categories = [
    { name: 'Textiles & Fabrics', hsn: '6204' },
    { name: 'Handicrafts', hsn: '9406' },
    { name: 'Spices & Food', hsn: '0907' },
    { name: 'Jewelry', hsn: '7113' },
    { name: 'Ceramics & Pottery', hsn: '6910' },
    { name: 'Leather Goods', hsn: '4202' },
    { name: 'Electronics', hsn: '8528' },
    { name: 'Home Decor', hsn: '9406' },
    { name: 'Cosmetics & Beauty', hsn: '3304' },
    { name: 'Others', hsn: '9999' }
  ];

  const gstRates = ['0', '5', '12', '18', '28'];
  const units = ['pcs', 'kg', 'liter', 'meter', 'dozen', 'box'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = categories.find(cat => cat.name === e.target.value);
    setFormData(prev => ({
      ...prev,
      category: e.target.value,
      hsnCode: selectedCategory?.hsn || '9999'
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [name]: value
      }
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + imagePreview.length > 5) {
      setMessage({ type: 'error', text: 'Maximum 5 images allowed' });
      return;
    }

    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(prev => [...prev, {
          file,
          preview: event.target.result
        }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setImagePreview(prev => prev.filter((_, i) => i !== index));
  };

  const calculateSellingPrice = () => {
    const costPrice = parseFloat(formData.costPrice) || 0;
    const gst = parseFloat(formData.gst) || 0;
    return (costPrice * (1 + gst / 100)).toFixed(2);
  };

  const formatIndianPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(price);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      // Validation
      if (!formData.productName || !formData.category || !formData.price || !formData.quantity) {
        setMessage({ type: 'error', text: 'Please fill all required fields' });
        setLoading(false);
        return;
      }

      if (imagePreview.length === 0) {
        setMessage({ type: 'error', text: 'Please upload at least one product image' });
        setLoading(false);
        return;
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      setMessage({ 
        type: 'success', 
        text: `Product "${formData.productName}" added successfully!` 
      });

      // Reset form
      setFormData({
        productName: '',
        category: '',
        description: '',
        price: '',
        costPrice: '',
        gst: '18',
        hsnCode: '',
        sku: '',
        quantity: '',
        unit: 'pcs',
        images: [],
        certifications: '',
        manufacturingDate: '',
        expiryDate: '',
        address: {
          street: '',
          city: 'Kolkata',
          state: 'West Bengal',
          pincode: '700091',
          country: 'India'
        }
      });
      setImagePreview([]);
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to add product. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const hsnCodeExamples = {
    'Textiles & Fabrics': '6204',
    'Handicrafts': '9406',
    'Spices & Food': '0907',
    'Jewelry': '7113',
    'Ceramics & Pottery': '6910',
    'Leather Goods': '4202',
    'Electronics': '8528',
    'Home Decor': '9406',
    'Cosmetics & Beauty': '3304',
    'Others': '9999'
  };

  return (
    <PageContainer>
      <Container>
        <Header>
          <HeaderTitle>
            <FiPlus size={32} />
            Add New Product
          </HeaderTitle>
          <HeaderSubtitle>Complete all details to list your product on Indilink</HeaderSubtitle>
        </Header>

        {message && (
          <MessageBox type={message.type}>
            {message.type === 'success' ? <FiCheckCircle /> : <FiAlertCircle />}
            {message.text}
          </MessageBox>
        )}

        <FormWrapper onSubmit={handleSubmit}>
          {/* Basic Information */}
          <FormSection>
            <SectionTitle>Basic Information</SectionTitle>
            
            <FormGroup>
              <Label>Product Name *</Label>
              <Input
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleInputChange}
                placeholder="e.g., Premium Handwoven Cotton Saree"
              />
            </FormGroup>

            <FormGroup>
              <Label>Category *</Label>
              <Select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
              >
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </Select>
            </FormGroup>

            <FormGroup>
              <Label>Description</Label>
              <TextArea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe your product in detail (materials, features, care instructions, etc.)"
                rows="4"
              />
            </FormGroup>
          </FormSection>

          {/* Pricing Information */}
          <FormSection>
            <SectionTitle>Pricing & Tax Information</SectionTitle>
            
            <TwoColumnGrid>
              <FormGroup>
                <Label>Cost Price (₹) *</Label>
                <Input
                  type="number"
                  name="costPrice"
                  value={formData.costPrice}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  step="0.01"
                />
                <HelperText>Your cost per unit</HelperText>
              </FormGroup>

              <FormGroup>
                <Label>GST Rate (%)</Label>
                <Select name="gst" value={formData.gst} onChange={handleInputChange}>
                  {gstRates.map(rate => (
                    <option key={rate} value={rate}>{rate}%</option>
                  ))}
                </Select>
                <HelperText>GST applicable on product</HelperText>
              </FormGroup>
            </TwoColumnGrid>

            <FormGroup>
              <Label>Selling Price (₹) *</Label>
              <PriceBox>
                <PriceDisplay>₹{calculateSellingPrice()}</PriceDisplay>
                <PriceInfo>Auto-calculated with {formData.gst}% GST</PriceInfo>
              </PriceBox>
            </FormGroup>

            <TwoColumnGrid>
              <FormGroup>
                <Label>HSN Code</Label>
                <Input
                  type="text"
                  name="hsnCode"
                  value={formData.hsnCode}
                  onChange={handleInputChange}
                  placeholder={hsnCodeExamples[formData.category] || '0000'}
                />
                <HelperText>{formData.category ? `Suggested: ${hsnCodeExamples[formData.category]}` : 'Harmonized System Nomenclature code'}</HelperText>
              </FormGroup>

              <FormGroup>
                <Label>SKU</Label>
                <Input
                  type="text"
                  name="sku"
                  value={formData.sku}
                  onChange={handleInputChange}
                  placeholder="e.g., SAREE-001-RED-L"
                />
                <HelperText>Stock Keeping Unit (optional)</HelperText>
              </FormGroup>
            </TwoColumnGrid>
          </FormSection>

          {/* Inventory */}
          <FormSection>
            <SectionTitle>Inventory</SectionTitle>
            
            <TwoColumnGrid>
              <FormGroup>
                <Label>Quantity *</Label>
                <Input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  placeholder="0"
                  min="1"
                />
              </FormGroup>

              <FormGroup>
                <Label>Unit of Measurement</Label>
                <Select name="unit" value={formData.unit} onChange={handleInputChange}>
                  {units.map(unit => (
                    <option key={unit} value={unit}>{unit}</option>
                  ))}
                </Select>
              </FormGroup>
            </TwoColumnGrid>
          </FormSection>

          {/* Product Images */}
          <FormSection>
            <SectionTitle>Product Images *</SectionTitle>
            <Label>Upload up to 5 images (JPG, PNG)</Label>
            
            <ImageUploadArea>
              <FileInput
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                id="imageInput"
              />
              <label htmlFor="imageInput">
                <FiUpload size={32} />
                <div>Click to upload or drag and drop</div>
                <small>PNG, JPG up to 5MB each</small>
              </label>
            </ImageUploadArea>

            {imagePreview.length > 0 && (
              <ImagePreviewGrid>
                {imagePreview.map((img, idx) => (
                  <ImagePreviewCard key={idx}>
                    <img src={img.preview} alt={`Preview ${idx + 1}`} />
                    <RemoveBtn onClick={() => removeImage(idx)}>×</RemoveBtn>
                    <ImageLabel>Image {idx + 1}</ImageLabel>
                  </ImagePreviewCard>
                ))}
              </ImagePreviewGrid>
            )}
          </FormSection>

          {/* Dates & Certifications */}
          <FormSection>
            <SectionTitle>Additional Information</SectionTitle>
            
            <TwoColumnGrid>
              <FormGroup>
                <Label>Manufacturing Date</Label>
                <Input
                  type="date"
                  name="manufacturingDate"
                  value={formData.manufacturingDate}
                  onChange={handleInputChange}
                />
              </FormGroup>

              <FormGroup>
                <Label>Expiry Date</Label>
                <Input
                  type="date"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                />
              </FormGroup>
            </TwoColumnGrid>

            <FormGroup>
              <Label>Certifications & Documents</Label>
              <TextArea
                name="certifications"
                value={formData.certifications}
                onChange={handleInputChange}
                placeholder="e.g., ISO 9001, BIS Certificate, Organic Certified, etc."
                rows="3"
              />
            </FormGroup>
          </FormSection>

          {/* Manufacturing Location */}
          <FormSection>
            <SectionTitle>Manufacturing Location</SectionTitle>
            <LocationHighlight>
              <LocationLabel>📍 Branch Location</LocationLabel>
              <LocationText>Kolkata Salt Lake, West Bengal, India</LocationText>
            </LocationHighlight>
            
            <FormGroup>
              <Label>Street Address</Label>
              <Input
                type="text"
                name="street"
                value={formData.address.street}
                onChange={handleAddressChange}
                placeholder="e.g., Sector V, Salt Lake"
              />
            </FormGroup>

            <TwoColumnGrid>
              <FormGroup>
                <Label>City</Label>
                <Input
                  type="text"
                  name="city"
                  value={formData.address.city}
                  disabled
                />
              </FormGroup>

              <FormGroup>
                <Label>PIN Code</Label>
                <Input
                  type="text"
                  name="pincode"
                  value={formData.address.pincode}
                  disabled
                />
              </FormGroup>
            </TwoColumnGrid>

            <TwoColumnGrid>
              <FormGroup>
                <Label>State</Label>
                <Input
                  type="text"
                  name="state"
                  value={formData.address.state}
                  disabled
                />
              </FormGroup>

              <FormGroup>
                <Label>Country</Label>
                <Input
                  type="text"
                  name="country"
                  value={formData.address.country}
                  disabled
                />
              </FormGroup>
            </TwoColumnGrid>
          </FormSection>

          {/* Submit */}
          <ButtonGroup>
            <Button 
              type="submit" 
              primary
              disabled={loading}
            >
              {loading ? 'Adding Product...' : 'Add Product'}
            </Button>
            <Button 
              type="button" 
              secondary
              onClick={() => window.history.back()}
            >
              Cancel
            </Button>
          </ButtonGroup>
        </FormWrapper>
      </Container>
    </PageContainer>
  );
};

export default AddProduct;

// Styled Components
const PageContainer = styled.div`
  min-height: 100vh;
  background: ${COLORS.BG_PRIMARY};
  padding: ${theme.spacing['2xl']} ${theme.spacing.lg};
`;

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const Header = styled.div`
  margin-bottom: ${theme.spacing['3xl']};
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
  font-size: ${theme.fontSizes.lg};
  color: ${COLORS.TEXT_SECONDARY};
  margin: 0;
`;

const MessageBox = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.lg};
  background: ${props => props.type === 'success' ? '#d4edda' : '#f8d7da'};
  color: ${props => props.type === 'success' ? '#155724' : '#721c24'};
  border: 1px solid ${props => props.type === 'success' ? '#c3e6cb' : '#f5c6cb'};

  svg {
    flex-shrink: 0;
  }
`;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing['2xl']};
`;

const FormSection = styled.div`
  background: ${COLORS.WHITE};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing['2xl']};
  box-shadow: ${theme.shadows.md};
`;

const SectionTitle = styled.h2`
  font-size: ${theme.fontSizes.xl};
  font-weight: ${theme.fontWeights.bold};
  color: ${COLORS.TEXT_PRIMARY};
  margin: 0 0 ${theme.spacing.lg} 0;
  padding-bottom: ${theme.spacing.lg};
  border-bottom: 2px solid ${COLORS.BG_SECONDARY};
`;

const FormGroup = styled.div`
  margin-bottom: ${theme.spacing.lg};

  &:last-child {
    margin-bottom: 0;
  }
`;

const Label = styled.label`
  display: block;
  font-size: ${theme.fontSizes.base};
  font-weight: ${theme.fontWeights.semibold};
  color: ${COLORS.TEXT_PRIMARY};
  margin-bottom: ${theme.spacing.sm};
`;

const Input = styled.input`
  width: 100%;
  padding: ${theme.spacing.md};
  border: 1px solid ${COLORS.BG_TERTIARY};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.fontSizes.base};
  transition: all ${theme.transitions.fast};
  background: ${props => props.disabled ? COLORS.BG_SECONDARY : COLORS.WHITE};
  color: ${props => props.disabled ? COLORS.TEXT_SECONDARY : COLORS.TEXT_PRIMARY};

  &:focus {
    outline: none;
    border-color: ${COLORS.PRIMARY};
    box-shadow: 0 0 0 3px ${COLORS.PRIMARY}20;
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: ${theme.spacing.md};
  border: 1px solid ${COLORS.BG_TERTIARY};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.fontSizes.base};
  background: ${COLORS.WHITE};
  color: ${COLORS.TEXT_PRIMARY};
  cursor: pointer;
  transition: all ${theme.transitions.fast};

  &:focus {
    outline: none;
    border-color: ${COLORS.PRIMARY};
    box-shadow: 0 0 0 3px ${COLORS.PRIMARY}20;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: ${theme.spacing.md};
  border: 1px solid ${COLORS.BG_TERTIARY};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.fontSizes.base};
  font-family: inherit;
  resize: vertical;
  transition: all ${theme.transitions.fast};

  &:focus {
    outline: none;
    border-color: ${COLORS.PRIMARY};
    box-shadow: 0 0 0 3px ${COLORS.PRIMARY}20;
  }
`;

const TwoColumnGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.lg};

  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const HelperText = styled.small`
  display: block;
  margin-top: ${theme.spacing.xs};
  color: ${COLORS.TEXT_SECONDARY};
  font-size: ${theme.fontSizes.xs};
`;

const PriceBox = styled.div`
  background: ${COLORS.BG_SECONDARY};
  border: 2px solid ${COLORS.PRIMARY}40;
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const PriceDisplay = styled.div`
  font-size: ${theme.fontSizes['2xl']};
  font-weight: ${theme.fontWeights.bold};
  color: ${COLORS.PRIMARY};
`;

const PriceInfo = styled.div`
  font-size: ${theme.fontSizes.sm};
  color: ${COLORS.TEXT_SECONDARY};
`;

const ImageUploadArea = styled.div`
  border: 2px dashed ${COLORS.BG_TERTIARY};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing['2xl']};
  text-align: center;
  transition: all ${theme.transitions.fast};
  cursor: pointer;
  background: ${COLORS.BG_SECONDARY};

  &:hover {
    border-color: ${COLORS.PRIMARY};
    background: ${COLORS.PRIMARY}10;
  }

  label {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${theme.spacing.md};

    svg {
      color: ${COLORS.PRIMARY};
    }

    div {
      font-weight: ${theme.fontWeights.semibold};
      color: ${COLORS.TEXT_PRIMARY};
    }

    small {
      color: ${COLORS.TEXT_SECONDARY};
    }
  }
`;

const FileInput = styled.input`
  display: none;
`;

const ImagePreviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: ${theme.spacing.lg};
  margin-top: ${theme.spacing.lg};
`;

const ImagePreviewCard = styled.div`
  position: relative;
  border-radius: ${theme.borderRadius.md};
  overflow: hidden;
  aspect-ratio: 1;
  box-shadow: ${theme.shadows.sm};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const RemoveBtn = styled.button`
  position: absolute;
  top: -8px;
  right: -8px;
  width: 32px;
  height: 32px;
  background: ${COLORS.PRIMARY};
  color: ${COLORS.WHITE};
  border: none;
  border-radius: 50%;
  font-size: ${theme.fontSizes.xl};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ${theme.transitions.fast};

  &:hover {
    transform: scale(1.1);
    background: ${COLORS.PRIMARY_DARK};
  }
`;

const ImageLabel = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0,0,0,0.6);
  color: ${COLORS.WHITE};
  padding: ${theme.spacing.xs};
  font-size: ${theme.fontSizes.xs};
  text-align: center;
`;

const LocationHighlight = styled.div`
  background: linear-gradient(135deg, ${COLORS.PRIMARY}20, ${COLORS.SECONDARY}20);
  border-left: 4px solid ${COLORS.PRIMARY};
  padding: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.md};
  margin-bottom: ${theme.spacing.lg};
`;

const LocationLabel = styled.div`
  font-size: ${theme.fontSizes.sm};
  font-weight: ${theme.fontWeights.semibold};
  color: ${COLORS.TEXT_SECONDARY};
`;

const LocationText = styled.div`
  font-size: ${theme.fontSizes.lg};
  font-weight: ${theme.fontWeights.bold};
  color: ${COLORS.PRIMARY};
  margin-top: ${theme.spacing.xs};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${theme.spacing.lg};
  margin-top: ${theme.spacing['2xl']};

  @media (max-width: ${theme.breakpoints.sm}) {
    flex-direction: column;
  }

  button {
    flex: 1;
  }
`;
