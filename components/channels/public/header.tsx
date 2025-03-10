function Header() {
  return (
    <header>
      <div className="h-full w-full flex flex-col items-center space-y-8">
        <div className="space-y-1">
          <h1 className="text-2xl font-extrabold text-center text-pretty ">
            Public Channels
          </h1>
          <p className="text-[0.95rem] text-center text-pretty max-w-xs text-secondary-foreground/85">
            Join channels created by the community
          </p>
        </div>
      </div>
    </header>
  );
}

export default Header;
