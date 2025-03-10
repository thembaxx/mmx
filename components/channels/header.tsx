import { Avatar, AvatarImage } from "../ui/avatar";
import { MaterialSymbolsVerifiedRounded } from "../chat/profile";
import { SettingsIcon } from "../assets/icons";

function Header() {
  return (
    <div className="flex items-center gap-3 border rounded-xl p-3">
      <div className="relative">
        <Avatar className="h-10 w-10">
          <AvatarImage
            src={`https://www.tapback.co/api/avatar/user55?color=3`}
          />
        </Avatar>
        <div className="absolute bottom-0 right-0 -mb-0.5 z-20">
          <MaterialSymbolsVerifiedRounded className="text-blue-600 w-4 h-4" />
        </div>
      </div>
      <div className="space-y-1 text-left grow">
        <h2 className="font-bold truncate text-sm leading-none">
          Themba Mndebele
        </h2>
        <p className="text-muted-foreground text-[0.8rem] truncate">
          work@themba.dev
        </p>
      </div>
      <div className="h-8 w-8 flex items-center justify-center">
        <SettingsIcon className="w-4 h-4 text-icon-secondary" />
      </div>
    </div>
  );
}

export default Header;
