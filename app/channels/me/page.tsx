import Header from "@/components/channels/me/header";
import List from "@/components/channels/me/List";

function MyChannelsPage() {
  return (
    <div className="p-6 space-y-8 flex flex-col h-full overflow-y-auto">
      <Header />
      <div className="grow">
        <List />
      </div>
    </div>
  );
}

export default MyChannelsPage;
