import React from "react";

type LayoutProps = { className?: string; children: React.ReactNode };

const Layout = ({ children, className }: LayoutProps) => {
  return (
    <main
      className={`
      bg-slate-800 h-dvh max-h-dvh w-dvw p-5 text-white
      overflow-y-auto
      ${className ?? ""}
      `}
    >
      {children}
    </main>
  );
};

export default Layout;
