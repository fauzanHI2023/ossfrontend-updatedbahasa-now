import React from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

const LogoMobile = () => {
  const pathname = usePathname();

  const isHome = pathname === "/";
  return (
    <Link
      href="/"
      className={`${
        isHome ? "bg-logo-blue" : "bg-logo-blue"
      } flex sm:hidden w-32 h-12 bg-no-repeat bg-contain title-font font-medium items-center text-gray-900 mb-0`}
    ></Link>
  );
};

export default LogoMobile;
