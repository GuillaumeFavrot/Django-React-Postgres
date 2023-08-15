import { api } from './index';


describe('api', () => {
  it('should have the correct baseURL', () => {
    expect(api.defaults.baseURL).toBe('http://127.0.0.1:8000');
  });

  it('should have the correct headers', () => {
    expect(api.defaults.headers.Accept).toBe('application/json');
    expect(api.defaults.headers['Content-Type']).toBe('application/json');
  });
});


