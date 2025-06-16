import LoadingSkeleton from "@/components/ui/utility/LoadingDashboard";
import DashboardLayout from "@/components/ui/dashboard/DashboardLayout";

export default function Loading() {
    //UI inside Loading, including a Skeleton.
    return (
        <DashboardLayout>
                <LoadingSkeleton />
        </DashboardLayout>
    )
  }