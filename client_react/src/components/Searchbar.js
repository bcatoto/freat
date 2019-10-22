import React from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/Row'

export default function Searchbar() {
  return (
    <Form>
      <FormControl type="text" placeholder="Search" />
      <Button variant="outline-success">Search</Button>
    </Form>
  );
}
