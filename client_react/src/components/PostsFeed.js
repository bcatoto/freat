import React from "react";
import Accordion from "react-bootstrap/Accordion"
import Post from "./Post"

export default function PostsFeed() {
  return (
    <Accordion>
      <Post title="Test Title 1" body="Test description 1!"/>
      <Post title="Test Title 2" body="Test description 2!"/>
      <Post title="Test Title 3" body="Test description 3!"/>
    </Accordion>
  );
}
