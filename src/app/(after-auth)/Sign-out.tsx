"use client";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";

const SignOut = () => {
  const { push } = useRouter();

  return (
    <button
      className="p-2 bg-blue-700 cursor-pointer w-full"
      onClick={() => {
        deleteCookie("user");
        push("/");
      }}
      type="button"
    >
      Sign-out
    </button>
  );
};

export default SignOut;
