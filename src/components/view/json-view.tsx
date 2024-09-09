'use client';

import React, { useEffect } from 'react';

import Prism from 'prismjs';
import 'prismjs/components/prism-json';
import 'prismjs/themes/prism-tomorrow.css';

interface JsonViewProps {
  data: any;
  className?: string;
}

const JsonView: React.FC<JsonViewProps> = ({ data, className = '' }) => {
  useEffect(() => {
    Prism.highlightAll();
  }, [data]);

  const jsonString = JSON.stringify(data, null, 2);

  return (
    <pre className={`overflow-auto bg-gray-800 p-4 language-json ${className}`}>
      <code className="language-json">{jsonString}</code>
    </pre>
  );
};

export default JsonView;
