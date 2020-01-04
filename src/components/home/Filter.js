import React from "react";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import Container from "react-bootstrap/Container";

export default class Filter extends React.Component {
  constructor(props) {
    super(props);

    this.diets = [
      {
        value: 0,
        name: "Vegetarian"
      },
      {
        value: 1,
        name: "Vegan"
      },
      {
        value: 2,
        name: "Kosher"
      },
      {
        value: 3,
        name: "Halal"
      },
      {
        value: 4,
        name: "Gluten-Free"
      },
    ];

    this.state = {
      value: []
    };
  }

  handleChange = value => {
    this.setState({ value });
    this.props.changeFilter(value);
  }

  renderButtons() {
    return this.diets.map(diet =>
      <ToggleButton variant="filter" value={diet.value}>
        {diet.name}
      </ToggleButton>
    );
  }

  render() {
    return (
      <ToggleButtonGroup type="checkbox"
        value={this.state.value}
        onChange={this.handleChange}
      >
        {this.renderButtons()}
      </ToggleButtonGroup>
    );
  }
}
