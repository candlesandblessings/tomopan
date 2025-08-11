import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import { Users, Wifi, Zap } from "lucide-react";

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
  return (
    <section className="relative py-12 md:py-20">
      <Aurora />
      <div className="container mx-auto text-center max-w-4xl">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs text-primary mb-3 animate-fade-in">
          <Wifi className="h-3 w-3" /> Online multiplayer only
        </span>
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight mb-4">
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">ȚOMAPAN Online</span>
        </h1>
        <p className="text-base md:text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
          Play ȚOMAPAN (Țări, Orașe, Munți, Ape, Plante, Animale, Nume) with your friends online — fast rounds, fair letters, zero setup.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <NavLink to="/create" className="w-full sm:w-auto">
            <Button variant="hero" size="lg" className="w-full sm:w-auto">Create Room</Button>
          </NavLink>
          <NavLink to="/join" className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">Join Room</Button>
          </NavLink>
        </div>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-muted-foreground">
          <div className="inline-flex items-center gap-2"><Users className="h-3 w-3" /> Up to 8 players</div>
          <div className="inline-flex items-center gap-2"><Zap className="h-3 w-3" /> Lightning fast rounds</div>
        </div>
      </div>
    </section>
  );
};

export default Hero;