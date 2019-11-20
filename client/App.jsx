import React, { Component } from "react";
import extractIngredients from "../apiHelpers/extractIngredients.js";
import Ingredient from "./Components/Ingredient.jsx";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: [],
      recipe: "",
      ownedIngredients: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({ recipe: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    extractIngredients(this.state.recipe).then(data => {
      this.setState({ ingredients: data });
    });
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Recipe Link:
            <input
              type="text"
              value={this.state.recipe}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
        {this.state.ingredients.map(ingredient => {
          return <Ingredient ingredient={ingredient} />;
        })}
      </div>
    );
  }
}
