import { UserData } from "@/stores/use-user-store";
import { MaterialSymbolsVerifiedRounded } from "../assets/icons";

interface Props {
  user: UserData;
}

function Profile({ user }: Props) {
  return (
    <div className="space-y-1 text-left">
      <div className="w-full flex items-center">
        <h2 className="font-bold truncate">{user.name}</h2>
        <MaterialSymbolsVerifiedRounded className="text-blue-600 w-6 h-6 ml-2" />
      </div>
      <p className="text-muted-foreground text-[0.85rem]">{user.email}</p>
    </div>
  );
}

export default Profile;
