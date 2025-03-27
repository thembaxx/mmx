"use client";

import UseLayoutEffectParent from "@/components/use-layout-effect-parent";
import dynamic from "next/dynamic";
const Channel = dynamic(
  () => Promise.resolve(import("@/components/chat/channel")),
  {
    ssr: false,
  }
);

function ChatPage() {
  return (
    <div className="h-full w-full overflow-hidden">
      <UseLayoutEffectParent>
        <Channel />
      </UseLayoutEffectParent>
    </div>
  );
}

export default ChatPage;
