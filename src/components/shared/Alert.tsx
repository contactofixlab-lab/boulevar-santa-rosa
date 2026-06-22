import { CheckCircle2, Info, AlertTriangle } from "lucide-react";

interface AlertProps {
  variant: "success" | "info" | "warning";
  title: string;
  description?: string;
  className?: string;
}

const variants = {
  success: {
    bg: "bg-surface-green",
    border: "border-primary-green",
    icon: "text-primary-green",
    Icon: CheckCircle2,
  },
  info: {
    bg: "bg-surface-blue",
    border: "border-primary-blue",
    icon: "text-primary-blue",
    Icon: Info,
  },
  warning: {
    bg: "bg-amber-50",
    border: "border-warning",
    icon: "text-warning",
    Icon: AlertTriangle,
  },
};

export const Alert = ({ variant, title, description, className = "" }: AlertProps) => {
  const v = variants[variant];
  return (
    <div className={`flex items-start gap-3 ${v.bg} border-l-4 ${v.border} rounded-r-lg px-4 py-3 ${className}`}>
      <v.Icon size={20} className={`${v.icon} flex-shrink-0 mt-0.5`} aria-hidden="true" />
      <div>
        <p className="text-secondary-navy font-semibold text-sm">{title}</p>
        {description && <p className="text-slate-blue text-xs mt-0.5">{description}</p>}
      </div>
    </div>
  );
};
