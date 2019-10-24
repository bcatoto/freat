import React from 'react';
import Container from 'react-bootstrap/Container'
import Accordion from 'react-bootstrap/Accordion'
import Post from './Post'

import berries from './../assets/images/berries.png'
import blueberries from './../assets/images/blueberries.png'

export default function PostsFeed() {
  return (
    <Accordion>
      <Post title="Test Title 1" body="Test description 1!"/>
      <Post title="Test Title 2" body="Test description 2!"/>
      <Post title="Test Title 3" body="Test description 3!"/>
    </Accordion>
  );
}
