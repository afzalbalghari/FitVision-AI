import {
  Camera,
  ChartColumn,
  History,
  LayoutDashboard,
  MessageSquare,
  User,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

export const DASHBOARD_NAV: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/workout", label: "Workout", icon: Camera },
  { href: "/dashboard/history", label: "History", icon: History },
  { href: "/dashboard/analytics", label: "Analytics", icon: ChartColumn },
  { href: "/dashboard/coach", label: "Coach", icon: MessageSquare },
  { href: "/dashboard/profile", label: "Profile", icon: User },
];
