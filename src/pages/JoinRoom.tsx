import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import HeadSEO from "@/components/seo/HeadSEO";
import { toast } from "@/hooks/use-toast";

const JoinRoom = () => {
  return (
    <main className="container mx-auto py-10">
      <HeadSEO title="Join ȚOMAPAN Room" description="Join an online ȚOMAPAN room with a code." canonical="/join" />
      <section className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Join a Room</span>
        </h1>
        <p className="text-muted-foreground">Online multiplayer coming soon. For now, this is a preview UI.</p>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Enter code</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 max-w-md">
          <div className="space-y-2">
            <Label htmlFor="code">Room code</Label>
            <Input id="code" placeholder="e.g. X9JQ" />
          </div>
          <Button variant="hero" onClick={() => toast({ title: "Coming soon", description: "Online rooms will be enabled next." })}>Join</Button>
        </CardContent>
      </Card>
    </main>
  );
};

export default JoinRoom;
