import React, { useState } from "react";
import { Form, Select, Button, Row, Col, Typography, message } from "antd";
import axios from 'axios';
import FormInput from "../../components/common/FormInput/FormInput";
import Head from "../../components/layout/navbar/Head";
import "../Supplier/supform.css";

const { Option } = Select;
const { Title } = Typography;

const SuppliersPage = () => {
  const [form] = Form.useForm();

  const [contactDetails, setContactDetails] = useState([
    { firstName: "", lastName: "", email: "", phoneNumber: "", userType: "", designation: "" }
  ]);
  const [supplierIds, setSupplierIds] = useState([
    { supplierId: "", countryCode: "" }
  ]);

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

    console.log("Formatted Data:", [formattedData]);

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
      <div style={{ padding: "20px" }}>
        <Form form={form} name="supplier_form" onFinish={onFinish} layout="vertical">
          <Title level={4} id="title">Supplier Details</Title>
          <div
            style={{
              border: "1px solid #A1BAD1",
              borderRadius: "15px",
              width: "100%",
              maxWidth: "1115px",
              backgroundColor: "#F8FAFC",
              marginBottom: "20px",
              padding: "20px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <Row gutter={16}>
              <Col span={8}>
                <FormInput name="companyName" label="Company Name" rules={[{ required: true, message: "Company Name is required" }]} placeholder="Company Name" />
              </Col>
              <Col span={8}>
                <FormInput name="addressLine1" label="Address Line 1" rules={[{ required: true, message: "Address Line 1 is required" }]} placeholder="Address Line 1" />
              </Col>
              <Col span={8}>
                <FormInput name="addressLine2" label="Address Line 2" placeholder="Address Line 2" />
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
                <FormInput name="zipcode" label="Zipcode" rules={[
                  { required: true, message: "Zipcode is required" },
                  { len: 6, message: "Zipcode must be 6 digits" },
                ]} placeholder="Zipcode" />
              </Col>
            </Row>
          </div>

          <Title level={4} id="title">Contact Details</Title>
          <div
            style={{
              border: "1px solid #A1BAD1",
              borderRadius: "15px",
              width: "100%",
              maxWidth: "1115px",
              backgroundColor: "#F8FAFC",
              padding: "20px",
              marginBottom: "20px",
              marginLeft: "auto",
              marginRight: "auto",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {contactDetails.map((contact, index) => (
              <div
                key={index}
                style={{
                  border: "1px solid #CECECE",
                  borderRadius: "15px",
                  backgroundColor: "#F8FAFC",
                  padding: "20px",
                  marginBottom: "20px",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ flex: 1 }}>
                  <Row gutter={16}>
                    <Col span={8}>
                      <FormInput name={[`contactDetails[${index}]`, "firstName"]} label="First Name" rules={[{ required: true, message: "First Name is required" }]} placeholder="First Name" value={contact.firstName} onChange={(e) => handleOnChange(index, 'firstName', e.target.value, 'contact')} />
                    </Col>
                    <Col span={8}>
                      <FormInput name={[`contactDetails[${index}]`, "lastName"]} label="Last Name" rules={[{ required: true, message: "Last Name is required" }]} placeholder="Last Name" value={contact.lastName} onChange={(e) => handleOnChange(index, 'lastName', e.target.value, 'contact')} />
                    </Col>
                    <Col span={8}>
                      <FormInput name={[`contactDetails[${index}]`, "email"]} label="Email ID" rules={[{ required: true, type: "email", message: "Valid Email ID is required" }]} placeholder="Email ID" value={contact.email} onChange={(e) => handleOnChange(index, 'email', e.target.value, 'contact')} />
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={8}>
                      <FormInput name={[`contactDetails[${index}]`, "phoneNumber"]} label="Phone Number" rules={[{ required: true, message: "Phone Number is required" }]} placeholder="Phone Number" value={contact.phoneNumber} onChange={(e) => handleOnChange(index, 'phoneNumber', e.target.value, 'contact')} />
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        name={[`contactDetails[${index}]`, "userType"]}
                        label="User Type"
                        rules={[{ required: true, message: "User Type is required" }]}
                      >
                        <Select
                          placeholder="User Type"
                          value={contact.userType}
                          onChange={(value) => handleOnChange(index, 'userType', value, 'contact')}
                        >
                          <Option value="admin">Admin</Option>
                          <Option value="user">User</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <FormInput name={[`contactDetails[${index}]`, "designation"]} label="Designation" rules={[{ required: true, message: "Designation is required" }]} placeholder="Designation" value={contact.designation} onChange={(e) => handleOnChange(index, 'designation', e.target.value, 'contact')} />
                    </Col>
                  </Row>
                </div>
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                  {contactDetails.length > 1 && (
                    <Button
                      type="link"
                      danger
                      onClick={() => removeContactDetail(index)}
                      style={{ marginLeft: "10px", marginRight: "10px" }}
                    >
                      Delete
                    </Button>
                  )}
                  {index === contactDetails.length - 1 && (
                    <Button type="link" onClick={addContactDetail}>
                      Add
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <Title level={4} id="title">Supplier ID Details</Title>
          <div
            style={{
              border: "1px solid #A1BAD1",
              borderRadius: "15px",
              width: "100%",
              maxWidth: "1115px",
              backgroundColor: "#F8FAFC",
              padding: "20px",
              marginLeft: "auto",
              marginRight: "auto",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {supplierIds.map((supplier, index) => (
              <div
                key={index}
                style={{
                  border: "1px solid #CECECE",
                  borderRadius: "15px",
                  backgroundColor: "#F8FAFC",
                  padding: "20px",
                  marginBottom: "20px",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ flex: 1 }}>
                  <Row gutter={16}>
                    <Col span={8}>
                      <FormInput name={[`supplierIds[${index}]`, "supplierId"]} label="Supplier ID" rules={[{ required: true, message: "Supplier ID is required" }]} placeholder="Supplier ID" value={supplier.supplierId} onChange={(e) => handleOnChange(index, 'supplierId', e.target.value, 'supplier')} />
                    </Col>
                    <Col span={8}>
                      <FormInput name={[`supplierIds[${index}]`, "countryCode"]} label="Country Code" rules={[{ required: true, message: "Country Code is required" }]} placeholder="Country Code" value={supplier.countryCode} onChange={(e) => handleOnChange(index, 'countryCode', e.target.value, 'supplier')} />
                    </Col>
                  </Row>
                </div>
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                  {supplierIds.length > 1 && (
                    <Button
                      type="link"
                      danger
                      onClick={() => removeSupplierId(index)}
                      style={{ marginLeft: "10px", marginRight: "10px" }}
                    >
                      Delete
                    </Button>
                  )}
                  {index === supplierIds.length - 1 && (
                    <Button type="link" onClick={addSupplierId}>
                      Add
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <Button type="primary" htmlType="submit" style={{ marginTop: "20px" }}>
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
};

export default SuppliersPage;
