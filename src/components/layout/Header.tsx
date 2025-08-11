import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Wifi } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b border-border">
      <nav className="container mx-auto flex items-center justify-between h-16">
        <NavLink to="/" className="flex items-center gap-2">
          <span aria-hidden className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-[var(--shadow-glow)]">
            <Wifi className="h-4 w-4" />
          </span>
          <span className="text-lg font-semibold tracking-tight">ȚOMAPAN Online</span>
        </NavLink>
        <div className="flex items-center gap-3">
          <NavLink to="/join" className="hidden sm:block">
            <Button variant="outline">Join Room</Button>
          </NavLink>
          <NavLink to="/create">
            <Button variant="hero" size="lg">Create Room</Button>
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Header;