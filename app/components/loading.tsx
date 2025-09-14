import React from "react";
import { Loader } from "lucide-react";

const LoadingSpinner = ({
  className,
  loaderClass,
}: {
  className?: string;
  loaderClass?: string;
}) => {
  return (
    <div className={`${className}`}>
      <Loader className={`animate-spin ${loaderClass}`} />
    </div>
  );
};

export default LoadingSpinner;
