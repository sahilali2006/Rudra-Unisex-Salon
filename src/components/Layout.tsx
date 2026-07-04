import type { ReactNode } from "react";
import type { Page } from "../App";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

export function Layout({
  children,
  currentPage,
  onNavigate,
}: {
  children: ReactNode;
  currentPage: Page;
  onNavigate: (page: Page) => void;
}) {
  return (
    <div className="app-shell">
      <Navbar currentPage={currentPage} onNavigate={onNavigate} />
      <main>{children}</main>
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
