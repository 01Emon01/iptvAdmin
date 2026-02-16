"use client";
import { NodeApi } from "@/api/axios";
import { useRouter } from "next/navigation";
import { CiLogin } from "react-icons/ci";

export default function Logout() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await NodeApi.post("/logout", {});
      router.refresh();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <li className="nav-item">
      <div className="nav-link cursor-pointer" onClick={handleLogout}>
        <div className="nav-icon">
          <CiLogin />
        </div>
        <div className="nav-text">Logout</div>
      </div>
    </li>
  );
}
