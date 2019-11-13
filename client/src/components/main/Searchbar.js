import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function Searchbar() {
  return (
    <Form inline className="p-3">
      <Form.Control id="form-search" type="text" placeholder="Search for food..." />
      <Button variant="search"><i className="fas fa-search"></i></Button>
    </Form>
  );
}