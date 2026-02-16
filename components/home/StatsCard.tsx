import { GiPaperBagFolded } from "react-icons/gi";

export default function StatsCard() {
  return (
    <div className="rounded-lg overflow-hidden bg-[#30343d]">
      <div className="flex items-center justify-between py-6 px-5">
        <div className="stats-icon lg:p-1.5 xl:p-3 bg-[#24272e] rounded-lg">
          <GiPaperBagFolded size={46} className="text-gray-300" />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm text-end">Total Orders</span>
          <span className="text-xl font-semibold text-end">176</span>
        </div>
      </div>
      <div className="flex items-center justify-between py-3 px-5 bg-[#262830]">
        <div className="flex items-center gap-2">
          <span className="text-sm text-emerald-500">10.6%</span>
          <span className="text-[12px]">Last Month</span>
        </div>
        <div className="text-[12px] font-semibold">View More</div>
      </div>
    </div>
  );
}
