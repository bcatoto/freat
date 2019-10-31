import React from 'react';
import Searchbar from './Searchbar'
import PostsFeed from './PostsFeed'

export default function PostPane(props) {
  return (
    <>
      <Searchbar />
      <PostsFeed id="posts-feed" posts={props.posts}/>
    </>
  );
}
