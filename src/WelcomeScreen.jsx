import React from "react";
import './WelcomeScreen.css';

function WelcomeScreen(props) {
    return props.showWelcomeScreen ?
    (
        <div className="WelcomeScreen fixed top-0 flex items-center flex-col text-neutral-50 py-10 gap-6">
            <h1 className="text-5xl font-extrabold">Welcome to <span className="header-app-name">Meet Again</span></h1>
            <h4 className="text-xl">Sign in to see upcoming events around the world for full-stack developers</h4>
            <div className="button_cont">
                <div className="google-button flex flex-row rounded">
                        <img
                        className="google-icon bg-white p-3 rounded"
                        src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                        alt="Google sign-in"
                        />
                        <button
                            className="btn-text px-3 rounded"
                            onClick={() => {
                            props.getAccessToken();
                            }}
                            rel="nofollow noopener"
                        >
                            Sign in with Google
                        </button>
                    </div>
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