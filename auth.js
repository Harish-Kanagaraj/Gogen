class AuthService {
    // Simulated user data (replace with actual implementation)
    static users = [
      { username: 'user1', password: 'password1', name: 'User One' },
      { username: 'user2', password: 'password2', name: 'User Two' }
    ];
  
    // Login method to authenticate user
    static login(username, password) {
      const user = this.users.find(user => user.username === username && user.password === password);
      if (user) {
        // Mock generating JWT token (replace with actual implementation)
        const token = 'mocked_jwt_token';
        localStorage.setItem('token', token);
        return true;
      }
      return false;
    }
  
    // Logout method to clear token
    static logout() {
      localStorage.removeItem('token');
    }
  
    // Check if user is authenticated
    static isAuthenticated() {
      return localStorage.getItem('token') !== null;
    }
  }
  
  export default AuthService;
  