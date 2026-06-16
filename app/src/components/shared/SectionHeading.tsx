import React from "react";

interface SectionHeadingProps {
  subtitle?: string;
  title: string;
  titleBlue?: string;
  titleGreen?: string;
  description?: string;
  centered?: boolean;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  subtitle,
  title,
  titleBlue,
  titleGreen,
  description,
  centered = false,
}) => {
  return (
    <div className={`${centered ? "text-center" : ""} mb-12`}>
      {subtitle && (
        <p className="text-primary-green font-semibold text-sm uppercase tracking-widest mb-2">
          {subtitle}
        </p>
      )}
      <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
        {titleBlue && (
          <>
            <span className="text-primary-blue">{titleBlue}</span>{" "}
          </>
        )}
        {title}
        {titleGreen && (
          <>
            {" "}
            <span className="text-primary-green">{titleGreen}</span>
          </>
        )}
      </h2>
      {description && (
        <p className="text-lg text-slate-blue max-w-2xl mt-4">
          {description}
        </p>
      )}
    </div>
  );
};
