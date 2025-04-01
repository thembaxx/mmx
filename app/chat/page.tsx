"use client";

import Container from "@/components/container";
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
    <Container>
      <UseLayoutEffectParent>
        <Channel />
      </UseLayoutEffectParent>
    </Container>
  );
}

export default ChatPage;
