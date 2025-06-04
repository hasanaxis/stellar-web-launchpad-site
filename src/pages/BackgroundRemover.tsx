
import React from 'react';
import Header from '@/components/Header';
import BackgroundRemover from '@/components/BackgroundRemover';

const BackgroundRemoverPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="pt-24">
        <BackgroundRemover />
      </div>
    </div>
  );
};

export default BackgroundRemoverPage;
