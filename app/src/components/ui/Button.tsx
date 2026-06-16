import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "disabled";
  size?: "sm" | "md";
  children: React.ReactNode;
}

const variants = {
  primary: "bg-primary-green hover:bg-secondary-green-dark text-white font-semibold transition-colors",
  secondary: "bg-primary-blue hover:bg-secondary-navy text-white font-semibold transition-colors",
  outline: "border-2 border-primary-blue text-primary-blue hover:bg-surface-blue transition-colors",
  disabled: "bg-surface-green text-secondary-navy cursor-not-allowed opacity-60",
};

const sizes = {
  sm: "px-4 py-2 text-sm rounded-full",
  md: "px-6 py-3 text-base rounded-full",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", children, className = "", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`
          ${variants[variant]}
          ${sizes[size]}
          ${className}
          font-poppins
          transition-all
          duration-200
          active:scale-95
        `}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
