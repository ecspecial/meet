import React, { Component } from "react";

class Event extends Component {

  state = {
    details: false
  };

  toggleDetails = () => {
    this.setState((prevState) => ({
      details: !prevState.details
    }))
  }

  render() {

    const { event } = this.props;
    const { details } = this.state;

    return (
          <div className="event">
            <div className="event-header">
              <h3 className="event-summary">
                {event.summary}
              </h3>
              <p className="event-start">
                {new Date(event.start.dateTime).toString()}
              </p>
              <p className="event-location">
                {`@${event.summary} | ${event.location}`}
              </p>
            </div>

            {
              details && (
                <div className="event-details">
                  <h2 className="about-event-header">
                    About event:
                  </h2>
                  <a className="event-link" href={event.htmlLink} target="_blank" rel="noopener noreferrer">
                    See details on Google Calendar
                  </a>
                  <p className="event-description">
                    {event.description}
                  </p>
                </div>
              )
            }

              <button className="details-btn" onClick={() => this.toggleDetails()}>
                {details ? "hide details" : "show details"}
              </button>
            
        </div>          

    );

  }
}
export default Event;