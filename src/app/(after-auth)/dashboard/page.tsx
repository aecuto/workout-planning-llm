/* eslint-disable react/no-children-prop */
"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";

import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import SignOut from "@/app/(after-auth)/Sign-out";

export default function Dashboard() {
  const { push } = useRouter();
  const [plan, setPlan] = useState<any[]>([]);

  const [open, setOpen] = useState(-1);

  const handleOpen = (value: number) => setOpen(value);

  useEffect(() => {
    axios
      .get("/api/plan", {
        headers: { Authorization: `${getCookie("user")}` },
      })
      .then((res) => setPlan(res.data));
  }, []);

  return (
    <div className="max-w-screen-md">
      <SignOut />
      <button
        onClick={() => push("/planning")}
        className="bg-red-500 w-full rounded p-2  mb-[50px]"
      >
        Create Planing
      </button>
      <p className="text-3xl text-bold mb-5">Dashboard</p>
      {plan.map((data, index) => (
        <Accordion open={open === index} key={data._id}>
          <AccordionHeader
            onClick={() => handleOpen(index)}
            className="text-white hover:text-green-500"
          >
            {data.name}
          </AccordionHeader>
          <AccordionBody className="text-white">
            <pre>{data.content}</pre>
          </AccordionBody>
        </Accordion>
      ))}
    </div>
  );
}
