export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full w-full flex flex-col overflow-y-auto">
      <div className="grow">{children}</div>
    </div>
  );
}
