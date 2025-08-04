import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full bg-transparent border-t border-gray-200 dark:border-gray-700 mt-8">
      <div className="max-w-[684px] mx-auto py-4 px-4 md:px-0">
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 dark:text-gray-400">
          <div className="mb-3 md:mb-0">
            <p className="text-center md:text-left">
              © {currentYear} NeoMatrix. All rights reserved.
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-4">
            <a 
              href="https://beian.miit.gov.cn/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200"
            >
              辽ICP备2023000799号
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 