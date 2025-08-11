import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Wifi, LogOut, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const { session, signOut, profile } = useAuth();

  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b border-border pt-[env(safe-area-inset-top)]">
      <nav className="container mx-auto flex items-center justify-between h-14 px-2">
        <NavLink to="/" className="flex items-center gap-2">
          <span aria-hidden className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-[var(--shadow-glow)]">
            <Wifi className="h-3 w-3" />
          </span>
          <span className="text-base font-semibold tracking-tight">ȚOMAPAN Online</span>
        </NavLink>
        
        <div className="flex items-center gap-2">
          {session ? (
            <>
              <NavLink to="/create">
                <Button variant="hero" size="sm">Create Room</Button>
              </NavLink>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                    <User className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>{profile?.username || session.user.email}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <NavLink to="/auth">
              <Button variant="hero" size="sm">Login</Button>
            </NavLink>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;