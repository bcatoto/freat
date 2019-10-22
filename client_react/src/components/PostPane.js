import React from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Searchbar from './Searchbar'

export default function PostPane() {
  return (
    <Container>
      <Row>
        <Searchbar />
      </Row>
      <Row>
      </Row>
    </Container>
  );
}
