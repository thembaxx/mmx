import CreateChannelCard from "@/components/channels/create/card";

function CreateChannelPage() {
  return (
    <div className="p-6 h-full w-full space-y-6">
      <header className="space-y-1">
        <h1 className="font-bold text-xl">Create Channel</h1>
        <p className="text-sm text-secondary-foreground/80">
          Create your channel and invite your friends
        </p>
      </header>
      <CreateChannelCard />
    </div>
  );
}

export default CreateChannelPage;
