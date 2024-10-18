// SignInForm.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignInForm = ({ setCurrentUser }: { setCurrentUser: (username: string) => void }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Replace this with your actual user validation logic
    const validUsers = {
      super_admin:"admin",
      hr_user: 'hr_password',
      ceo_user: 'ceo_password',
      finance_user: 'finance_password',
    };

    if (validUsers[username] && validUsers[username] === password) {
      localStorage.setItem('currentUser', username); // Store user in localStorage
      setCurrentUser(username); // Update the state in App.tsx
      navigate('/events'); 
    } else {
      alert('Invalid username or password'); // Error handling
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-xl mb-4">Sign In</h2>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-500"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignInForm;
