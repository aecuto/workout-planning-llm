"use client";

import axios from "axios";
import { useEffect } from "react";

export default function Dashboard() {
  useEffect(() => {
    axios
      .get("/api/plan", {
        headers: { Authorization: `${localStorage.getItem("user")}` },
      })
      .then(console.log);
  }, []);
  return <div>Dashboard</div>;
}
