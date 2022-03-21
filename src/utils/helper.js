import axios from "axios";
import { config } from './constants';

const baseURL = config.APP_URL;

//GET request using axios
function getRequest(url) {
    const headers = {
        Accept: 'application/json',
    };
    const requestUrl = baseURL + url;

    return axios({
        method: 'GET',
        url: requestUrl,
        headers,
    });
}

//POST Request using axios
function postRequest(url, params) {
    const headers = {
        Accept: 'application/json',
    };
    const requestUrl = baseURL + url;

    return axios({
        method: 'POST',
        url: requestUrl,
        data: params,
        headers,
    });
}


// program to generate random strings
function generateString(string_lenght) {
    // declare all characters
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    
    string_lenght = string_lenght ? string_lenght : 10 ;
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < string_lenght; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result.toUpperCase();
}

function validateEmail(email) {
    const re = /[\w'+-]+(\.[\w'+-]+)*@\w+([-.]\w+)*\.\w{2,24}/;
    return re.test(String(email).toLowerCase());
}


export {
    getRequest,
    postRequest,
    generateString,
    validateEmail
};
