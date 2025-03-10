import Authenticate from "@/components/auth/authenticate";
import Header from "@/components/home/header";

export default function Home() {
  return (
    <div className="h-full w-full px-6 py-12 flex flex-col items-center justify-center">
      <div className="w-full max-w-md space-y-8">
        <Header />
        <Authenticate />
      </div>
    </div>
  );
}
