import React from "react";
import './WelcomeScreen.css';
import EventList from "./EventList";
import { welcomeData } from "./welcomeData";

function WelcomeScreen(props) {
    return props.showWelcomeScreen ?
    (
        <div className="WelcomeScreen">
        <h1>Welcome to the Meet app</h1>
        <div>
            <EventList events = {welcomeData} eventsNumber={32}/>
        </div>
        <h4>
            We invite you into the world of programming!<br/>
            Simply sign in with Google to get more than 100 events all around the world!
        </h4>
        <div className="google-btn">
            <div className="google-icon-wrapper">
                <img
                    className="google-icon"
                    src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                    alt="Google sign-in"
                />
            </div>
            <button
                onClick={() => {
                props.getAccessToken();
                }}
                rel="nofollow noopener"
                className="btn-text"
            >
                <b>Sign in with google</b>
            </button>
        </div>
        <a
            href="https://ecspecial.github.io/meet/privacy.html"
            rel="nofollow noopener"
        >
            Privacy policy
        </a>
    </div>
    )
: null
}
export default WelcomeScreen;