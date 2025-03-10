import { StarIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { MaterialSymbolsVerifiedRounded } from "./chat/profile";

function Profile() {
  return (
    <div>
      <div>
        <div className="h-12 w-12 mb-4 relative">
          <Avatar className="h-12 w-12">
            <AvatarImage
              src={`https://www.tapback.co/api/avatar/user55?color=3`}
              alt={"Themba Mndebele"}
            />
            <AvatarFallback className="text-sm">TP</AvatarFallback>
          </Avatar>
          <div className="absolute -mb-0.5 bottom-0 right-0 z-10">
            <MaterialSymbolsVerifiedRounded className="text-blue-600 w-5 h-5" />
          </div>
        </div>
        <div className="space-y-0 text-left">
          <h2 className="font-bold truncate">Themba Mndebele</h2>
          <p className="text-muted-foreground text-[0.85rem]">
            work@themba.dev
          </p>
          <div className="flex gap-4 items-center pt-4">
            <Badge>Job seeker</Badge>
            <div className="flex items-center gap-2">
              <StarIcon className="h-4 w-4 text-[#FF990A]" />
              <span className="text-[0.85rem]">4.3</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
