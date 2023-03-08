import React, { Component } from "react";
import Event from "./Event";

class EventList extends Component {
    render() {
        const { events, eventsNumber } = this.props;
        return (
            <ul className="EventList">
                { (eventsNumber ? events.slice(0, eventsNumber) : events).map(event =>
                    <li key={event.id}>
                        <Event event={event} />
                    </li>
                    )}
            </ul>
        );
    }
}

export default EventList;