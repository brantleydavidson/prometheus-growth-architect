
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/layout/Footer';

const NotFound = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-[70vh] p-4 text-center">
        <h1 className="text-6xl font-bold text-prometheus-navy mb-2">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8 max-w-md">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link to="/">
          <Button>
            Go Home
          </Button>
        </Link>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;
