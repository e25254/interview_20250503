import React from "react";

export default function Arrow({ ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      role="presentation"
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      fill="none"
      fillRule="nonzero"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <polyline points="19 12 12 19 5 12"></polyline>
    </svg>
  );
}
