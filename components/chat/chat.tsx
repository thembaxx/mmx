import ChatInput from "./chat-input";
import Image from "next/image";

function Chat() {
  return (
    <div className="w-full h-full bg-background">
      <div className="absolute top-0 left-0 h-full w-full">
        <div className="flex flex-col gap-4 h-full items-center justify-center -mt-24">
          <div className="p-4 opacity-60">
            <Image
              src="/empty-messages.svg"
              alt="No messages"
              height={192}
              width={192}
            />
          </div>
          <p className="text-sm">No messages yet</p>
          <p className="text-xs text-secondary-foreground/70">
            Text, attachments and audio
          </p>
        </div>
      </div>
      <footer className="p-4 fixed bottom-0 left-0 w-full">
        <ChatInput />
      </footer>
    </div>
  );
}

export default Chat;
