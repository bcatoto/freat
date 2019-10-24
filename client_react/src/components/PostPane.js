import React from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Searchbar from './Searchbar'
import PostsFeed from './PostsFeed'

export default function PostPane() {
  return (
    <>
      <Searchbar />
      <PostsFeed />
    </>
  );
}
