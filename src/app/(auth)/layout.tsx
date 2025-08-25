interface Props {
  children: React.ReactNode;
}
export default function Layout({ children }: Props) {
  return (
    <div className="bg-muted flex flex-col min-h-screen justify-center items-center w-full">
      <div className="w-xs sm:w-xl md:w-2xl lg:w-3xl p-6 md:p-4">
        {children}
      </div>
    </div>
  );
}
