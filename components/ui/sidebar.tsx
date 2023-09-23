"use client";
import { useState } from "react";
import { LayoutDashboard } from "lucide-react";
export const SideBar = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="fixed top-0 left-0 h-screen w-16">
      <div>
        <div className="flex flex-col items-start justify-evenly">
          <div className="flex flex-row items-start">
            <div>
              <LayoutDashboard size={20} />
            </div>
            <span>Dashboard</span>
          </div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};
