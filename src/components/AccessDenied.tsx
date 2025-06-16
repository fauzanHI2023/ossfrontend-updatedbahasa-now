import Link from "next/link";
import { FaKey } from "react-icons/fa6";
import { GiPadlock } from "react-icons/gi";

type Props = {};

const AccessDenied = (props: Props) => {
  return (
    <main className="flex min-h-screen flex-col justify-center items-center gap-y-4 p-24">
      <div className="flex flex-row bg-sky-100 p-4 w-[320] h-[192px] rounded-b-[80px] rounded-l-[60px]">
          <FaKey className="text-sky-400 text-[128px]"/>
          <GiPadlock className="text-sky-400 text-[128px]"/>
      </div>
      <h4 className="text-zinc-700 text-xl">
        Sorry, your email is not registered yet
      </h4>
      <Link className="text-sky-600 text-lg" href="/">
        return to home page
      </Link>
      <Link className="text-white bg-sky-600 rounded-[50px] py-3 w-40 text-center" href={"/register"}>
        Register Now
      </Link>
    </main>
  );
};

export default AccessDenied;
