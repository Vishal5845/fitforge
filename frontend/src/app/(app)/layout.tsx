import { ReactNode } from "react";
import AppLayout from "@/components/layout/AppLayout";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return <AppLayout>{children}</AppLayout>;
}