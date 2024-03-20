import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function SkeletonLoader() {
  return (
    <SkeletonTheme highlightColor="#E8DAEF" height="300px">
      <p>
        <Skeleton />
      </p>
    </SkeletonTheme>
  );
}
