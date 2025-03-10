import Navbar from "@/components/channels/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full w-full flex flex-col">
      <div className="w-full h-16">
        <Navbar />
      </div>
      <div className="grow">{children}</div>
    </div>
  );
}
