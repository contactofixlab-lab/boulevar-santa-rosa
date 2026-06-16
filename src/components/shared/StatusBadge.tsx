import React from "react";

interface StatusBadgeProps {
  status: "available" | "presale" | "last-units" | "sold";
  children: React.ReactNode;
  className?: string;
}

const statusStyles = {
  available: "bg-surface-green text-secondary-navy border border-primary-green",
  presale: "bg-surface-blue text-primary-blue border border-primary-blue",
  "last-units": "bg-yellow-100 text-yellow-800 border border-yellow-300",
  sold: "bg-gray-200 text-gray-600 border border-gray-300",
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  children,
  className = "",
}) => {
  return (
    <span
      className={`
        inline-flex
        items-center
        px-3
        py-1
        rounded-full
        text-xs
        font-semibold
        ${statusStyles[status]}
        ${className}
      `}
    >
      {children}
    </span>
  );
};
