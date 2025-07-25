"use client";
import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";

function Header() {
  const path = usePathname();
  const { user } = useUser();
  const selected = "text-[#FF9202] font-extrabold";
  useEffect(() => {
    console.log(path);
  }, []);
  return (
    <div className="flex justify-between p-3 bg-gray-200">
      <div
        className="text-[#FF9202] text-3xl font-[900]"
        style={{ fontFamily: "cursive", cursor: "pointer" }}
      >
        Ace<span className="text-gray-700">That</span>!
      </div>
      <div className="w-[40%]">
        <ul
          className="flex justify-between list-none text-xl"
          style={{ cursor: "pointer" }}
        >
          <Link href={"/dashboard"}>
            <li
              className={`hover:text-[#FF9202] hover:font-extrabold ${
                path == "/dashboard" ? `${selected}` : ""
              }`}
            >
              Dashboard
            </li>
          </Link>
          <li
            className={`hover:text-[#FF9202] hover:font-extrabold ${
              path == "dashboard/questions" ? `${selected}` : ""
            }`}
          >
            Questions
          </li>
          <li
            className={`hover:text-[#FF9202] hover:font-extrabold ${
              path == "dashboard/upgrade" ? `${selected}` : ""
            }`}
          >
            Upgrade
          </li>
          <li
            className={`hover:text-[#FF9202] hover:font-extrabold ${
              path == "dashboard/how" ? `${selected}` : ""
            }`}
          >
            How it Works?
          </li>
        </ul>
      </div>
      <div className="flex justify-center gap-2 items-center">
        <h1 className="font-bold">{user?.fullName}</h1>
        <UserButton />
      </div>
    </div>
  );
}

export default Header;
