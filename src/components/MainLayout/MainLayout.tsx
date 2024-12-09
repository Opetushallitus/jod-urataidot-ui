interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="mx-auto w-full max-w-[1140px] grow px-4 pb-6 pt-4 sm:px-6 print:p-0">
      <main role="main">{children}</main>
    </div>
  );
};
