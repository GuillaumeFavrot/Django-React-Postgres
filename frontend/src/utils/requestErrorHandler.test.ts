import requestErrorHandler from './requestErrorHandler';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

describe('requestErrorHandler', () => {
  it('should handle basic non typed errors', () => {
    const error: FetchBaseQueryError = {
      status: 404,
      data: 'Not found',
    };
    const result = requestErrorHandler(error);
    expect(result.statusCode).toEqual('404');
    expect(result.statusText).toEqual('Not found');
  });

  it('should handle FETCH_ERROR errors', () => {
    const error: FetchBaseQueryError = {
      status: 'FETCH_ERROR',
      error: 'Unable to reach the server',
    };
    const result = requestErrorHandler(error);
    expect(result.statusCode).toEqual('500');
    expect(result.statusText).toEqual('Unable to reach the server');
  });

  it('should handle PARSING_ERROR errors', () => {
    const error: FetchBaseQueryError = {
      status: 'PARSING_ERROR',
      originalStatus: 400,
      data: 'Invalid JSON',
      error: 'Invalid JSON',
    };
    const result = requestErrorHandler(error);
    expect(result.statusCode).toEqual('400');
    expect(result.statusText).toEqual('Invalid JSON');
  });

  it('should handle TIMEOUT_ERROR errors', () => {
    const error: FetchBaseQueryError = {
      status: 'TIMEOUT_ERROR',
      error: 'Request timed out',
    };
    const result = requestErrorHandler(error);
    expect(result.statusCode).toEqual('408');
    expect(result.statusText).toEqual('Request timed out');
  });

  it('should handle 408 status code errors', () => {
    const error: FetchBaseQueryError = {
      status: 408,
      data: 'Request timed out',
    };
    const result = requestErrorHandler(error);
    expect(result.statusCode).toEqual('408');
    expect(result.statusText).toEqual('Request timed out');
  });

  it('should handle custom errors', () => {
    const error: FetchBaseQueryError = {
      status: 'CUSTOM_ERROR',
      error: 'Custom error',
    };
    const result = requestErrorHandler(error);
    expect(result.statusCode).toEqual('Unknown');
    expect(result.statusText).toEqual('Custom error');
  });
});
