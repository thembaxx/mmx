// import Header from "@/components/channels/public/header";
import List from "@/components/channels/public/List";

function PublicChannelsPage() {
  return (
    <div className="w-full h-full flex justify-center">
      <div className="p-6 space-y-8 flex flex-col h-full max-w-md w-full">
        {/* <Header /> */}
        <div className="grow">
          <List />
        </div>
      </div>
    </div>
  );
}

export default PublicChannelsPage;
