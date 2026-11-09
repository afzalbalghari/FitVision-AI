"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import type { WeeklyPoint } from "@/types/analytics";

function weekday(date: string): string {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", { weekday: "short" });
}

export function WeeklyActivityChart({ days }: { days: WeeklyPoint[] }) {
  const data = days.map((d) => ({ day: weekday(d.date), workouts: d.workouts }));

  return (
    <div className="h-56 w-full" role="img" aria-label="Workouts completed per day this week">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 0, bottom: 0, left: -20 }}>
          <CartesianGrid vertical={false} stroke="#2a312e" />
          <XAxis dataKey="day" tickLine={false} axisLine={false} stroke="#8f9a95" fontSize={12} />
          <YAxis allowDecimals={false} tickLine={false} axisLine={false} stroke="#8f9a95" fontSize={12} />
          <Tooltip
            cursor={{ fill: "#1d2220" }}
            contentStyle={{ background: "#161a18", border: "1px solid #2a312e", borderRadius: 12, color: "#f1f4f2" }}
          />
          <Bar dataKey="workouts" name="Workouts" fill="#3dff8b" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
