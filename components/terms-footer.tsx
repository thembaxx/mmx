import { siteConfig } from "@/config/site";
import Link from "next/link";

function TermsFooter() {
  return (
    <div className="text-[0.73rem] inline-block text-card-foreground/60 text-center text-pretty leading-5 tracking-wide">
      By continuing, you agree to {siteConfig.name}&apos;s{" "}
      <Link className="underline" href="/">
        Consumer Terms
      </Link>{" "}
      and{" "}
      <Link className="underline" href="/">
        Usage Policy
      </Link>
      , and acknowledge their{" "}
      <Link className="underline" href="/">
        Privacy Policy
      </Link>
      .
    </div>
  );
}

export default TermsFooter;
