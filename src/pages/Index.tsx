import Hero from "@/components/landing/Hero";
import HeadSEO from "@/components/seo/HeadSEO";
import { Card, CardContent } from "@/components/ui/card";
import { Users, ShieldCheck, Grid3X3, Timer } from "lucide-react";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <HeadSEO
        title="ȚOMAPAN Online — Play with Friends"
        description="Play ȚOMAPAN online with friends. Start a game, create or join rooms, and enjoy a premium, modern UI."
        canonical="/"
      />
      <Hero />
      <section className="container mx-auto pb-20">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-6">Why you'll love it</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="hover:shadow-[var(--shadow-glow)] transition-shadow">
            <CardContent className="p-6 space-y-2">
              <Users className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Made for friends</h3>
              <p className="text-sm text-muted-foreground">Invite and play up to 8 players in a room.</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-[var(--shadow-glow)] transition-shadow">
            <CardContent className="p-6 space-y-2">
              <Timer className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Smart timer</h3>
              <p className="text-sm text-muted-foreground">Smooth rounds with adjustable durations.</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-[var(--shadow-glow)] transition-shadow">
            <CardContent className="p-6 space-y-2">
              <Grid3X3 className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Clean grid</h3>
              <p className="text-sm text-muted-foreground">Focus on answers with a modern, calm grid.</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-[var(--shadow-glow)] transition-shadow">
            <CardContent className="p-6 space-y-2">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Fair play</h3>
              <p className="text-sm text-muted-foreground">Consistent letter generator and anti-cheat.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
};

export default Index;
