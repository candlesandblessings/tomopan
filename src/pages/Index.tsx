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
      
      <section className="container mx-auto pb-12 px-2">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-4">Why you'll love online play</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <Card className="hover:shadow-[var(--shadow-glow)] transition-shadow">
            <CardContent className="p-4 space-y-2">
              <Users className="h-4 w-4 text-primary" />
              <h3 className="font-semibold text-sm">Play with friends</h3>
              <p className="text-xs text-muted-foreground">Invite and play up to 8 players in a room.</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-[var(--shadow-glow)] transition-shadow">
            <CardContent className="p-4 space-y-2">
              <Wifi className="h-4 w-4 text-primary" />
              <h3 className="font-semibold text-sm">Real-time gameplay</h3>
              <p className="text-xs text-muted-foreground">See your friends' answers as they type.</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-[var(--shadow-glow)] transition-shadow">
            <CardContent className="p-4 space-y-2">
              <Globe className="h-4 w-4 text-primary" />
              <h3 className="font-semibold text-sm">Anywhere access</h3>
              <p className="text-xs text-muted-foreground">Play from any device with internet.</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-[var(--shadow-glow)] transition-shadow">
            <CardContent className="p-4 space-y<dyad-chat-summary>Improving mobile layouts for ȚOMAPAN game</dyad-chat-summary>
I've improved the mobile layouts for all the key pages of the ȚOMAPAN game:

1. GameRoom page - Made all elements more compact with smaller text, reduced padding, and better spacing for mobile screens
2. Room page - Improved responsive design with better button sizing and information layout
3. CreateRoom page - Adjusted form elements and spacing for better mobile experience
4. JoinRoom page - Made similar improvements to form layout and text sizing
5. Header - Reduced height and icon sizes for better mobile display
6. Hero section - Made text and buttons more responsive with better wrapping
7. Index page - Improved card layout and text sizing for mobile devices

The changes include:
- Smaller font sizes and padding on mobile
- Better responsive button sizing
- Improved spacing and layout for small screens
- More compact card designs
- Better text wrapping and alignment
- Responsive grid layouts that work well on all screen sizes

All pages now have a much better mobile experience while maintaining the same functionality and visual appeal on tablets and desktops.I notice the Index page update was cut off. Let me complete it:

<dyad-write path="src/pages/Index.tsx" description="Completing mobile layout improvements for Index page">
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
      
      <section className="container mx-auto pb-12 px-2">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-4">Why you'll love online play</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <Card className="hover:shadow-[var(--shadow-glow)] transition-shadow">
            <CardContent className="p-4 space-y-2">
              <Users className="h-4 w-4 text-primary" />
              <h3 className="font-semibold text-sm">Play with friends</h3>
              <p className="text-xs text-muted-foreground">Invite and play up to 8 players in a room.</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-[var(--shadow-glow)] transition-shadow">
            <CardContent className="p-4 space-y-2">
              <Wifi className="h-4 w-4 text-primary" />
              <h3 className="font-semibold text-sm">Real-time gameplay</h3>
              <p className="text-xs text-muted-foreground">See your friends' answers as they type.</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-[var(--shadow-glow)] transition-shadow">
            <CardContent className="p-4 space-y-2">
              <Globe className="h-4 w-4 text-primary" />
              <h3 className="font-semibold text-sm">Anywhere access</h3>
              <p className="text-xs text-muted-foreground">Play from any device with internet.</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-[var(--shadow-glow)] transition-shadow">
            <CardContent className="p-4 space-y-2">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <h3 className="font-semibold text-sm">Fair play</h3>
              <p className="text-xs text-muted-foreground">Consistent letter generator and anti-cheat.</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
};

export default Index;