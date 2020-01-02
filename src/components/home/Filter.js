import React from "react";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import Container from "react-bootstrap/Container";

export default class Filter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: []
    };
  }

  handleChange = value => {
    this.setState({ value });
    this.props.changeFilter(value);
  }

  render() {
    return (
      <Container fluid id="filter-options" className="center">
        <ToggleButtonGroup type="checkbox"
          value={this.state.value}
          onChange={this.handleChange}
        >
          <ToggleButton variant="filter" value={0}>Vegetarian</ToggleButton>
          <ToggleButton variant="filter" value={1}>Vegan</ToggleButton>
          <ToggleButton variant="filter" value={2}>Kosher</ToggleButton>
          <ToggleButton variant="filter" value={3}>Halal</ToggleButton>
          <ToggleButton variant="filter" value={4}>Gluten-Free</ToggleButton>
        </ToggleButtonGroup>
      </Container>
    );
  }
}
