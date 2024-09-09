import React, { useState, useEffect } from "react";
import { Form, Input, Select, Button, Row, Col, Typography, message } from "antd";
import Head from "../../components/layout/navbar/Head";
import "../Supplier/supform.css";
import axios from 'axios';

const { Option } = Select;
const { Title } = Typography;

const SupForm1 = () => {
  const [form] = Form.useForm();
  const [contactDetails, setContactDetails] = useState([]);
  const [supplierIds, setSupplierIds] = useState([]);

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/suppliers/66ceadee66a547519569c626"); // Replace with your API endpoint
        const data = response.data;

        
        setContactDetails(data.contactDetails || []);
        setSupplierIds(data.supplierIds || []);

      
        form.setFieldsValue({
          companyName: data.companyName || '',
          addressLine1: data.addressLine1 || '',
          addressLine2: data.addressLine2 || '',
          state: data.state || '',
          country: data.country || '',
          zipcode: data.zipcode || ''
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        message.error(`Error: ${error.response?.data || error.message}`);
      }
    };

    fetchData();
  }, [form]);

  const handleOnChange = (index, field, value, type) => {
    if (type === "contact") {
      const newContactDetails = [...contactDetails];
      newContactDetails[index][field] = value;
      setContactDetails(newContactDetails);
    } else if (type === "supplier") {
      const newSupplierIds = [...supplierIds];
      newSupplierIds[index][field] = value;
      setSupplierIds(newSupplierIds);
    }
  };

  const addContactDetail = () => {
    setContactDetails([...contactDetails, { firstName: "", lastName: "", email: "", phoneNumber: "", userType: "", designation: "" }]);
  };

  const removeContactDetail = (index) => {
    if (contactDetails.length > 1) {
      setContactDetails(contactDetails.filter((_, i) => i !== index));
    }
  };

  const addSupplierId = () => {
    setSupplierIds([...supplierIds, { supplierId: "", countryCode: "" }]);
  };

  const removeSupplierId = (index) => {
    if (supplierIds.length > 1) {
      setSupplierIds(supplierIds.filter((_, i) => i !== index));
    }
  };

  const onFinish = async (values) => {
    const formattedData = {
      companyName: values.companyName,
      addressLine1: values.addressLine1,
      addressLine2: values.addressLine2,
      state: values.state,
      country: values.country,
      zipcode: values.zipcode,
      contactDetails: contactDetails,
      supplierIds: supplierIds,
    };

    console.log("Formatted Data:", [formattedData]);  // Enclosed in array

    try {
      const response = await axios.post("http://localhost:8080/api/suppliers", [formattedData]);
      message.success("Form submitted successfully!");
      console.log("Response:", response);
    } catch (error) {
      console.error("Error submitting form:", error);
      message.error(`Error: ${error.response?.data || error.message}`);
    }
  };

  return (
    <>
      <Head />
      <div className="sup-form-container">
        <Form form={form} name="supplier_form" onFinish={onFinish} layout="vertical">
          <Title level={4}>Supplier Details</Title>
          <div className="form-section">
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item
                  name="companyName"
                  label="Company Name"
                  rules={[{ required: true, message: "Company Name is required" }]}
                >
                  <Input placeholder="Company Name" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="addressLine1"
                  label="Address Line 1"
                  rules={[{ required: true, message: "Address Line 1 is required" }]}
                >
                  <Input placeholder="Address Line 1" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="addressLine2" label="Address Line 2">
                  <Input placeholder="Address Line 2" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="state"
                  label="State"
                  rules={[{ required: true, message: "State is required" }]}
                >
                  <Select placeholder="Select state">
                    <Option value="state1">State 1</Option>
                    <Option value="state2">State 2</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="country"
                  label="Country"
                  rules={[{ required: true, message: "Country is required" }]}
                >
                  <Select placeholder="Select country">
                    <Option value="country1">Country 1</Option>
                    <Option value="country2">Country 2</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="zipcode"
                  label="Zipcode"
                  rules={[
                    { required: true, message: "Zipcode is required" },
                    { len: 6, message: "Zipcode must be 6 digits" },
                  ]}
                >
                  <Input placeholder="Zipcode" />
                </Form.Item>
              </Col>
            </Row>
          </div>

          <Title level={4}>Contact Details</Title>
          <div className="form-section">
            {contactDetails.map((contact, index) => (
              <div key={index} className="contact-detail-card">
                <div className="contact-detail-fields">
                  <Row gutter={16}>
                    <Col span={8}>
                      <Input
                        placeholder="First Name"
                        value={contact.firstName}
                        onChange={(e) => handleOnChange(index, 'firstName', e.target.value, 'contact')}
                      />
                    </Col>
                    <Col span={8}>
                      <Input
                        placeholder="Last Name"
                        value={contact.lastName}
                        onChange={(e) => handleOnChange(index, 'lastName', e.target.value, 'contact')}
                      />
                    </Col>
                    <Col span={8}>
                      <Input
                        placeholder="Email ID"
                        value={contact.email}
                        onChange={(e) => handleOnChange(index, 'email', e.target.value, 'contact')}
                      />
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={8}>
                      <Input
                        placeholder="Phone Number"
                        value={contact.phoneNumber}
                        onChange={(e) => handleOnChange(index, 'phoneNumber', e.target.value, 'contact')}
                      />
                    </Col>
                    <Col span={8}>
                      <Select
                        placeholder="User Type"
                        value={contact.userType}
                        onChange={(value) => handleOnChange(index, 'userType', value, 'contact')}
                      >
                        <Option value="admin">Admin</Option>
                        <Option value="user">User</Option>
                      </Select>
                    </Col>
                    <Col span={8}>
                      <Input
                        placeholder="Designation"
                        value={contact.designation}
                        onChange={(e) => handleOnChange(index, 'designation', e.target.value, 'contact')}
                      />
                    </Col>
                  </Row>
                </div>
                <div className="remove-button-container">
                  {contactDetails.length > 1 && (
                    <Button
                      type="link"
                      danger
                      onClick={() => removeContactDetail(index)}
                    >
                      Delete
                    </Button>
                  )}
                </div>
              </div>
            ))}
            <div className="add-button-container">
              <Button
                type="dashed"
                onClick={addContactDetail}
              >
                Add
              </Button>
            </div>
          </div>

          <Title level={4}>Supplier IDs</Title>
          <div className="form-section">
            {supplierIds.map((supplier, index) => (
              <div key={index} className="supplier-id-card">
                <div className="supplier-id-fields">
                  <Row gutter={16}>
                    <Col span={12}>
                      <Input
                        placeholder="Supplier ID"
                        value={supplier.supplierId}
                        onChange={(e) => handleOnChange(index, 'supplierId', e.target.value, 'supplier')}
                      />
                    </Col>
                    <Col span={12}>
                      <Input
                        placeholder="Country Code"
                        value={supplier.countryCode}
                        onChange={(e) => handleOnChange(index, 'countryCode', e.target.value, 'supplier')}
                      />
                    </Col>
                  </Row>
                </div>
                <div className="remove-button-container">
                  {supplierIds.length > 1 && (
                    <Button
                      type="link"
                      danger
                      onClick={() => removeSupplierId(index)}
                    >
                      Delete
                    </Button>
                  )}
                </div>
              </div>
            ))}
            <div className="add-button-container">
              <Button
                type="dashed"
                onClick={addSupplierId}
              >
                Add
              </Button>
            </div>
          </div>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginTop: "20px" }}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default SupForm1;
