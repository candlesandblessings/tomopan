import Hero from "@/components/landing/Hero";
import HeadSEO from "@/components/seo/HeadSEO";
import { Card, CardContent } from "@/components/ui/card";
import { Users, ShieldCheck, Wifi, Globe } from "lucide-react";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <HeadSEO
        title="ȚOMAPAN Online — Play with Friends"
        description="Play ȚOMAPAN online with friends. Create or join rooms and enjoy a premium, modern UI."
        canonical="/"
      />
      <Hero />
      <section className="container mx-auto pb-20">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-6">Why you'll love online play</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="hover:shadow-[var(--shadow-glow)] transition-shadow">
            <CardContent className="p-6 space-y-2">
              <Users className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Play with friends</h3>
              <p className="text-sm text-muted-foreground">Invite and play up to 8 players in a room.</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-[var(--shadow-glow)] transition-shadow">
            <CardContent className="p-6 space-y-2">
              <Wifi className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Real-time gameplay</h3>
              <p className="text-sm text-muted-foreground">See your friends' answers as they type.</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-[var(--shadow-glow)] transition-shadow">
            <CardContent className="p-6 space-y-2">
              <Globe className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Anywhere access</h3>
              <p className="text-sm text-muted-foreground">Play from any device with internet.</p>
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