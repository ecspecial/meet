import axios from "axios";
import NProgress from "nprogress";
import { mockData } from "./mock-data";

const checkToken = async (accessToken) => {
    const result = await fetch(
        `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
    )
        .then((res) => res.json())
        .catch((error) => error.json());

        return result;
};

export const getAccessToken = async () => {
    const accessToken = localStorage.getItem('access_token');

    const tokenCheck = accessToken && (await checkToken(accessToken));

    if (!accessToken || tokenCheck.error) {
        await localStorage.removeItem('access_token');
        const searchParams = new URLSearchParams(window.location.search);
        const code = await searchParams.get('code');
        if (!code) {
            const results = await axios.get(
            'https://xu4zqkq10e.execute-api.eu-central-1.amazonaws.com/dev/api/get-auth-url'
            );
            const { authUrl } = results.data;
            return (window.location.href = authUrl);
        }
        return code && getToken(code);
    }
    return accessToken;
};

export const getEvents = async () => {
    NProgress.start();
    
    if (window.location.href.startsWith('http://localhost')) {
        NProgress.done();
        return mockData;
    }

    const token = await getAccessToken();

    if (token) {
        removeQuery();
        const url = `https://xu4zqkq10e.execute-api.eu-central-1.amazonaws.com/dev/api/get-events/${token}`;

        try {
            const response = await axios.get(url);

            let events = await response.data.events;
            localStorage.setItem('lastEvents', JSON.stringify(events));

            let locations = extractLocations(events);
            localStorage.setItem('locations', JSON.stringify(locations));

            NProgress.done();

            return events;

        } catch (error ){
            NProgress.done();
            console.error(error.response);

        }
    }
};

export const extractLocations = (events) => {
    var extractLocations = events.map((event) => event.location);
    var locations = [...new Set(extractLocations)];
    return locations;
};

const removeQuery = () => {
    if (window.history.pushState && window.location.pathname) {
        var newUrl = 
            window.location.protocol +
            '//' +
            window.location.host +
            window.location.pathname;
        window.history.pushState('', '', newUrl);
    } else {
        var newUrl = window.location.protocol + '//' + window.location.host;
        window.history.pushState('', '', newUrl);
    }
};

const getToken = async (code) => {

    try {
        const encodedCode = encodeURIComponent(code);
        const response = await fetch(`https://xu4zqkq10e.execute-api.eu-central-1.amazonaws.com/dev/api/token/${encodedCode}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const { access_token } = await response.json();
        access_token && localStorage.setItem('access_token', access_token);

        return access_token;

    } catch (error) {
        error.json();
    }
};