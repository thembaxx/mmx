// "Fluid conversations, instant responses.";
// "Human connection, digital speed.";
// "Chat naturally, resolve instantly.";

import { siteConfig } from "@/config/site";

function Header() {
  return (
    <div className=" w-full flex flex-col items-center space-y-12">
      <div className="space-y-3">
        <h1 className="text-4xl font-extrabold text-center text-pretty ">
          Connect in Real-Time with{" "}
          <span className="bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent">
            {siteConfig.name}
          </span>
        </h1>
        <p className="text-[0.95rem] text-center text-pretty max-w-xs text-secondary-foreground/85">
          Experience conversations that flow as naturally as face-to-face.
        </p>
      </div>
    </div>
  );
}

export default Header;
