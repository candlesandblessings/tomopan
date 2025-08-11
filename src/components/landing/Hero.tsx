import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import { Users, Wifi, Zap } from "lucide-react";
import { useUser } from "@/contexts/UserContext";

const Aurora = () => {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute left-1/2 top-1/2 h-[60vh] w-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl opacity-40" style={{
        background: "radial-gradient(60% 60% at 50% 50%, hsl(var(--primary) / 0.4) 0%, transparent 60%), radial-gradient(60% 60% at 70% 30%, hsl(var(--accent) / 0.35) 0%, transparent 60%)"
      }} />
    </div>
  );
};

const Hero = () => {
  const { user } = useUser();

  return (
    <section className="relative py-20 md:py-28">
      <Aurora />
      <div className="container mx-auto text-center max-w-4xl">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary mb-4 animate-fade-in">
          <Wifi className="h-4 w-4" /> Online multiplayer only
        </span>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight mb-6">
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">ȚOMAPAN Online</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
          Play ȚOMAPAN (Țări, Orașe, Munți, Ape, Plante, Animale, Nume) with your friends online — fast rounds, fair letters, zero setup.
        </p>
        <div className="flex items-center justify-center gap-3">
          {user ? (
            <>
              <NavLink to="/create">
                <Button variant="hero" size="xl">Create Room</Button>
              </NavLink>
              <NavLink to="/join">
                <Button variant="outline" size="lg">Join Room</Button>
              </NavLink>
            </>
          ) : (
            <NavLink to="/login">
              <Button variant="hero" size="xl">Get Started</Button>
            </NavLink>
          )}
        </div>
        <div className="mt-10 flex items-center justify-center gap-6 text-sm text-muted-foreground">
          <div className="inline-flex items-center gap-2"><Users className="h-4 w-4" /> Up to 8 players</div>
          <div className="inline-flex items-center gap-2"><Zap className="h-4 w-4" /> Lightning fast rounds</div>
        </div>
      </div>
    </section>
  );
};

export default Hero;