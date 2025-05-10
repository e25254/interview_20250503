interface SkeletonProps {
  className?: string;
}

export default function Skeleton({ className }: SkeletonProps) {
  return (
    <div className={`w-full animate-pulse  bg-now-price-equal ${className}`} />
  );
}
