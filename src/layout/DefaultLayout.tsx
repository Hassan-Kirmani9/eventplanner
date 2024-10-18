// DefaultLayout.tsx
import React, { useState, ReactNode } from 'react';
import Header from '../components/Header/index';
import Sidebar from '../components/Sidebar/index';
import { useNavigate } from 'react-router-dom';

interface DefaultLayoutProps {
  children: ReactNode;
  currentUser: string | null; // Add currentUser prop
  setCurrentUser: (username: any) => void; // Prop to set current user
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children, currentUser, setCurrentUser }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("User logged out");
    setCurrentUser(null); // Clear current user on logout
    navigate('/'); // Navigate to the sign-in page
  };

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      <div className="flex h-screen overflow-hidden">
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          username={currentUser || 'Guest'} // Show 'Guest' if no user is logged in
          onLogout={handleLogout}
        />
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
