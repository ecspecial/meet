import React, { Component } from "react";

class CitySearch extends Component {
    state = {
        query: '',
        suggestions: [],
        showSuggestions: false // initialize showSuggestions to false
    };

    componentDidMount() {
        // add a click event listener to the window object
        window.addEventListener("click", this.handleClickOutside);
    }

    componentWillUnmount() {
        // remove the click event listener when the component unmounts
        window.removeEventListener("click", this.handleClickOutside);
    }

    handleClickOutside = (event) => {
        // if the user clicked outside of the CitySearch component, hide the suggestions
        if (this.searchContainer && !this.searchContainer.contains(event.target)) {
            this.setState({ showSuggestions: false });
        }
    };

    handleInputChanged = (event) => {
        const value = event.target.value;
        const suggestions = this.props.locations.filter((location) => {
            return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
        });
        this.setState({
            query: value,
            suggestions,
            showSuggestions: true // show suggestions when the input is changed
        });
    };

    handleItemClicked = (suggestion) => {
        this.setState({
            query: suggestion,
            showSuggestions: false // hide suggestions when an item is clicked
        });

        this.props.updateEvents(suggestion);
    };

    render() {
        return (
            <div className="CitySearch" ref={(ref) => (this.searchContainer = ref)}>
                <input 
                    type = "text"
                    placeholder="City"
                    className = "city"
                    value = {this.state.query}
                    onChange = {this.handleInputChanged}
                    onFocus = { () => { this.setState({ showSuggestions: true }) }}
                />
                <ul 
                    className="suggestions" 
                    style={this.state.showSuggestions ? {} : { display: 'none' }}
                >
                    {this.state.suggestions.map((suggestion) => (
                        <li 
                            key={suggestion}
                            onClick={() => this.handleItemClicked(suggestion)}
                        >
                            {suggestion}
                        </li>
                    ))}
                    <li key="all" onClick={() => this.handleItemClicked("all")}>
                        <b>See all cities</b>
                    </li>
                </ul>
            </div>
        );
    }
}

export default CitySearch;