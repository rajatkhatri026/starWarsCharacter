// MainContent.tsx
import React from 'react';
import { Outlet } from 'react-router-dom'; // For rendering nested routes
import Header from './layout/Header';

const ProtectedRoutes: React.FC = () => {
  return (
    <div>
        <Header /> {/* Display the Header */}
        <main className='main-body-content'>
            <Outlet /> {/* This will render the content for the active route */}
        </main>
    </div>
  );
};

export default ProtectedRoutes;
