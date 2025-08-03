import React from 'react';

interface QRCodeProps {
  title: string;
  description?: string;
  imageSrc: string;
  imageAlt?: string;
}

const QRCode: React.FC<QRCodeProps> = ({ 
  title, 
  description = "扫码关注公众号", 
  imageSrc, 
  imageAlt = "公众号二维码" 
}) => {
  return (
    <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
      <div className="w-32 h-32 mb-4 overflow-hidden rounded-lg border-2 border-gray-200 dark:border-gray-600">
        <img 
          src={imageSrc} 
          alt={imageAlt}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 text-center">
        {title}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
        {description}
      </p>
    </div>
  );
};

export default QRCode; 