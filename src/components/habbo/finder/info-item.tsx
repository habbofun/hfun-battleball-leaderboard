import type { ReactNode } from 'react';
import React from 'react';

interface InfoItemProps {
  icon: ReactNode;
  label: string;
  value: string;
}

export function InfoItem({ icon, label, value }: InfoItemProps) {
  return (
    <div className="flex items-center space-x-3">
      <div>{icon}</div>
      <div>
        <label className="text-sm font-medium">{label}</label>
        <p className="font-semibold">{value}</p>
      </div>
    </div>
  );
}
