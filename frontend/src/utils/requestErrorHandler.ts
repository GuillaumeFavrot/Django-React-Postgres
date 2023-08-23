import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";

export default function requestErrorHandler(error: FetchBaseQueryError) {
    let statusCode = '';
    let statusText = '';

    //Handles basic non typed errors
    if (typeof error.status === 'number') {
        statusCode = error.status.toString();
        if (error.data && error.data !== '') {
            statusText = error.data.toString();
        }  else {
            statusText = 'No message provided';
        }
    }

    //Handles undefined errors
    if (error.status === undefined || error.status === 'CUSTOM_ERROR') {
        statusCode = 'Unknown';
        statusText = 'Unknown';
    }

    //Handles 'FETCH_ERROR' errors
    if (error.status === 'FETCH_ERROR') {
        statusCode = '500';
        statusText = 'Unable to reach the server';
    }

    //Handles 'PARSING_ERROR' errors
    if (error.status === 'PARSING_ERROR') {
        statusCode = error.originalStatus.toString();
        statusText = error.data.toString();
    }

    //Handles 'TIMEOUT_ERROR' errors
    if (error.status === 'TIMEOUT_ERROR' || error.status === 408) {
        statusCode = '408';
        statusText = 'Request timed out';
    }

    return {statusCode, statusText};
}