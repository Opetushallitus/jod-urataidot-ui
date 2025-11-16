interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="mx-auto mt-11 mb-[80px] w-full max-w-[1140px] grow flex-col px-5 sm:px-6 print:p-0">
      <main role="main">{children}</main>
    </div>
  );
};
