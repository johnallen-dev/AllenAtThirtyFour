"use client";

import { useEffect, useState } from "react";
import AdminLogin from "@/components/AdminLogin";
import AdminDashboard, { type AdminData } from "@/components/AdminDashboard";

type Screen = "checking" | "login" | "dashboard";

export default function AdminPage() {
  const [screen, setScreen] = useState<Screen>("checking");
  const [data, setData] = useState<AdminData | null>(null);

  async function loadData() {
    const res = await fetch("/api/admin/data");
    if (res.ok) {
      const json = (await res.json()) as AdminData;
      setData(json);
      setScreen("dashboard");
    } else {
      setScreen("login");
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleDelete(type: "giver" | "receiver" | "charity", id: number) {
    await fetch("/api/admin/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, id }),
    });
    await loadData();
  }

  if (screen === "checking") {
    return (
      <div className="max-w-sm mx-auto px-4 py-16 text-center text-purple-400">
        Loading...
      </div>
    );
  }

  if (screen === "login") {
    return <AdminLogin onSuccess={loadData} />;
  }

  if (!data) {
    return (
      <div className="max-w-sm mx-auto px-4 py-16 text-center text-purple-400">
        Loading...
      </div>
    );
  }

  return <AdminDashboard data={data} onDelete={handleDelete} />;
}
