import React from 'react';

interface JsonViewProps {
  data: any;
}

const JsonView: React.FC<JsonViewProps> = ({ data }) => {
  const formatJson = (obj: any) => {
    return JSON.stringify(obj, null, 2)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(
        /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
        (match) => {
          let cls = 'text-blue-600';
          if (/^"/.test(match)) {
            if (/:$/.test(match)) {
              cls = 'text-red-600';
            } else {
              cls = 'text-green-600';
            }
          } else if (/true|false/.test(match)) {
            cls = 'text-purple-600';
          } else if (/null/.test(match)) {
            cls = 'text-gray-600';
          }
          return `<span class="${cls}">${match}</span>`;
        },
      );
  };

  return (
    <pre
      className="text-sm"
      dangerouslySetInnerHTML={{ __html: formatJson(data) }}
    />
  );
};

export default JsonView;
