import React, { Component } from "react";
 
class Alert extends Component {
    constructor(props) {
        super(props);
        this.color = null;
    }

    getStyle = () => {
        return {
            color: this.color,
        };
    }

    render() {
        return (
            <div className="Alert">
                <p style={this.getStyle()}>{this.props.text}</p>
            </div>
        )
    };
}

class InfoAlert extends Alert {
    constructor(props) {
        super(props);
        this.color = '#FFD700';
    }
}

class WarningAlert extends Alert {
    constructor(props) {
        super(props);
        this.color = '#FF7F50';
    }
}

class ErrorAlert extends Alert {
    constructor(props) {
        super(props);
        this.color = '#EE82EE';
    }
}

export { InfoAlert, WarningAlert, ErrorAlert };