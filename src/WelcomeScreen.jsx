import React from "react";
import './WelcomeScreen.css';

function WelcomeScreen(props) {
    return props.showWelcomeScreen ?
    (
        <div className="WelcomeScreen">
            <h1>Welcome to the Meet app</h1>
            <h4>
            Log in to see upcoming events around the world for full-stack developers
            </h4>
            <div className="button_cont">
                <button
                    className="google-btn"
                    onClick={() => {
                        props.getAccessToken();
                    }}
                    rel="nofollow noopener"
                >
                    <div className="google-icon-wrapper">
                        <img
                            className="google-icon"
                            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                            alt="Google sign-in"
                        />
                    </div>
                    <span className="btn-text">Sign in with Google</span>
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