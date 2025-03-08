import Channel from "@/components/chat/channel";
import UseLayoutEffectParent from "@/components/use-layout-effect-parent";

function ChatPage() {
  return (
    <div className="h-full w-full">
      <UseLayoutEffectParent>
        <Channel />
      </UseLayoutEffectParent>
    </div>
  );
}

export default ChatPage;
