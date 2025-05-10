interface SkeletonProps {
  className?: string;
}

export default function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={`w-full animate-pulse rounded-md bg-now-price-equal ${className}`}
    />
  );
}
