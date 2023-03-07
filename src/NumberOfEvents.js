import React, { Component } from "react";

class NumberOfEvents extends Component {

    state = {
        eventsNumber: 32,
        errorText: ""
    }

    handleInputChange = (event) => {

        const value = parseInt(event.target.value);

        if (value < 1 || value > 256) {
            this.setState({ errorText: "Specify a number between 1 and 256" });
        } else {
            this.setState({ eventsNumber: value })
        }

    }

    render() {
        return (
            <div className="numberOfEvents">
                <label className="events-number-label" htmlFor="events-number-search">Number of Events</label>
                <input
                type="number"
                className="events-number-search"
                value={this.state.eventsNumber}
                onChange={this.handleInputChange}
                />

                {this.state.errorText && (
                 <div className="error-message">{this.state.errorText}</div>
                )}
            </div>
        );
    }
}

export default NumberOfEvents;

