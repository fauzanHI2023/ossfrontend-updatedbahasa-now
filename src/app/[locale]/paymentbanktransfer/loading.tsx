import { Spinner } from '@/components/ui/spinner';

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="flex items-center gap-3">
      <Spinner>Loading...</Spinner>
      <Spinner className="text-red-400">
        <span className="text-red-400">Loading with custom style</span>
      </Spinner>
    </div>
  );
}
