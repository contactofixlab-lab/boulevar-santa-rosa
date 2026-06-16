import React from "react";
import { LucideIcon } from "lucide-react";

interface DataCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

export const DataCard: React.FC<DataCardProps> = ({
  icon: Icon,
  title,
  description,
  className = "",
}) => {
  return (
    <div
      className={`
        bg-white rounded-lg p-6 text-center
        border border-surface-blue
        hover:shadow-lg hover:border-primary-blue
        transition-all duration-300
        ${className}
      `}
    >
      <div className="flex justify-center mb-4">
        <div className="w-12 h-12 bg-surface-green rounded-lg flex items-center justify-center">
          <Icon className="w-6 h-6 text-primary-green" />
        </div>
      </div>
      <h3 className="text-lg font-bold text-primary-blue mb-2">{title}</h3>
      <p className="text-sm text-slate-blue leading-relaxed">{description}</p>
    </div>
  );
};
