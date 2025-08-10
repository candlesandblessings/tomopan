import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import HeadSEO from "@/components/seo/HeadSEO";
import { toast } from "@/hooks/use-toast";

const CreateRoom = () => {
  return (
    <main className="container mx-auto py-10">
      <HeadSEO title="Create ȚOMAPAN Room" description="Create an online room to play ȚOMAPAN with friends." canonical="/create" />
      <section className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Create a Room</span>
        </h1>
        <p className="text-muted-foreground">Online multiplayer coming soon. For now, this is a preview UI.</p>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Room details</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 max-w-md">
          <div className="space-y-2">
            <Label htmlFor="name">Your name</Label>
            <Input id="name" placeholder="e.g. Andrei" />
          </div>
          <div className="flex gap-3">
            <Button variant="hero" onClick={() => toast({ title: "Coming soon", description: "Online rooms will be enabled next." })}>Create</Button>
            <Button variant="secondary" onClick={() => toast({ title: "Try local mode", description: "Use the Start Game button to play locally." })}>Try local</Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default CreateRoom;
