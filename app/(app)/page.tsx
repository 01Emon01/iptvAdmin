import OrderChart from "@/components/home/OrderChart";
import RecentOrders from "@/components/home/RecentOrders";
import StatsCard from "@/components/home/StatsCard";

export default async function Home() {
  return (
    <>
      <div className="flex flex-wrap gap-y-4 mb-4">
        <div className="w-full xl:w-1/2">
          <div className="flex flex-wrap gap-y-4">
            <div className="w-1/2 px-2">
              <StatsCard />
            </div>
            <div className="w-1/2 px-2">
              <StatsCard />
            </div>
            <div className="w-1/2 px-2">
              <StatsCard />
            </div>
            <div className="w-1/2 px-2">
              <StatsCard />
            </div>
          </div>
        </div>
        <div className="w-full xl:w-1/2 px-2">
          <OrderChart />
        </div>
      </div>
      <div className="px-2">
        <RecentOrders />
      </div>
    </>
  );
}
