import Header from "@/components/channels/me/header";
import List from "@/components/channels/me/List";
import Container from "@/components/container";

function MyChannelsPage() {
  return (
    <Container>
      <Header />
      <div className="grow">
        <List />
      </div>
    </Container>
  );
}

export default MyChannelsPage;
