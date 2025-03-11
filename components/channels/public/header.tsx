function Header() {
  return (
    <header>
      <div className="h-full w-full flex flex-col space-y-8">
        <div className="space-y-1 text-left">
          <h1 className="text-2xl font-extrabold text-pretty ">
            Public Channels
          </h1>
          <p className="text-[0.95rem] text-pretty max-w-xs text-secondary-foreground/85">
            By the community—for the community
          </p>
        </div>
      </div>
    </header>
  );
}

export default Header;
