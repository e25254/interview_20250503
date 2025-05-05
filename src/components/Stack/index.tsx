import React, { forwardRef } from "react";

interface StackProps {
  children?: React.ReactNode;
  className?: string;
  ref?: React.Ref<HTMLDivElement>;
}

const Stack = forwardRef(function Stack(
  { children = null, className = "" }: StackProps,
  ref: React.Ref<HTMLDivElement>
) {
  return (
    <div ref={ref} className={`flex flex-col ${className}`} tabIndex={0}>
      {children}
    </div>
  );
});

Stack.displayName = "Stack";

export default Stack;
