import React, { Component } from "react";

class CitySearch extends Component {
  state = {
    query: "",
    selectedCity: "",
    showSuggestions: false,
  };

  handleInputChanged = (event) => {
    const value = event.target.value;
    const suggestions = this.props.locations.filter((location) => {
      return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
    });
    this.setState({
      query: value,
      showSuggestions: true,
      selectedCity: "",
    });
  };

  handleCitySelected = (event) => {
    const value = event.target.value;
    this.setState({
      query: value,
      showSuggestions: false,
      selectedCity: value,
    });
    this.props.updateEvents(value);
  };

  render() {
    const { query, selectedCity, showSuggestions } = this.state;
    const { locations } = this.props;
    const filteredLocations = locations.filter((location) => {
      return location.toUpperCase().indexOf(query.toUpperCase()) > -1;
    });

    return (
      <div className="CitySearch">
        <input
          type="text"
          className="city"
          value={query}
          onChange={this.handleInputChanged}
        />
        {showSuggestions && (
          <div className="suggestions">
            {filteredLocations.map((location) => (
              <label key={location}>
                <input
                  type="radio"
                  name="city"
                  value={location}
                  checked={selectedCity === location}
                  onChange={this.handleCitySelected}
                />
                {location}
              </label>
            ))}
            <label>
              <input
                type="radio"
                name="city"
                value="all"
                checked={selectedCity === "all"}
                onChange={this.handleCitySelected}
              />
              See all cities
            </label>
          </div>
        )}
      </div>
    );
  }
}

export default CitySearch;