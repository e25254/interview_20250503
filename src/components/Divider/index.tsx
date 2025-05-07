type DividerProps = {
  className?: string;
  orientation?: "horizontal" | "vertical";
};

export default function Divider({
  className = "",
  orientation = "horizontal",
}: DividerProps) {
  const orientationClassObj = {
    horizontal: "w-full border-t-[1px] border-l-0",
    vertical: "h-full border-l-[1px] border-t-0",
  };
  return (
    <hr
      className={`border-gray-500 opacity-10 ${orientationClassObj[orientation]} ${className}`}
    />
  );
}
