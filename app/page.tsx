import Authenticate from "@/components/auth/authenticate";
import Header from "@/components/home/header";

export default function Home() {
  return (
    <div className="h-full w-full p-6 flex flex-col items-center justify-center overflow-hidden">
      <div className="max-w-md space-y-8">
        <Header />
        <Authenticate />
      </div>
    </div>
  );
}
