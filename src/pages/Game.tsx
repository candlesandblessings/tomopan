import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import HeadSEO from "@/components/seo/HeadSEO";
import { toast } from "@/hooks/use-toast";

const CATEGORIES = [
  "Țări",
  "Orașe",
  "Munți",
  "Ape",
  "Plante",
  "Animale",
  "Nume",
] as const;

type Category = typeof CATEGORIES[number];

const LETTERS = [
  "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
  "Ă","Â","Î","Ș","Ț"
];

const pickLetter = () => LETTERS[Math.floor(Math.random() * LETTERS.length)];

const Game = () => {
  const [duration, setDuration] = useState(90);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [running, setRunning] = useState(false);
  const [letter, setLetter] = useState<string>("—");
  const [values, setValues] = useState<Record<Category, string>>({
    "Țări": "",
    "Orașe": "",
    "Munți": "",
    "Ape": "",
    "Plante": "",
    "Animale": "",
    "Nume": "",
  });
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, []);

  const startRound = () => {
    if (running) return;
    const l = pickLetter();
    setLetter(l);
    setSecondsLeft(duration);
    setRunning(true);
    toast({ title: "Round started", description: `Letter: ${l}` });
    intervalRef.current = window.setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          stopRound();
          return 0;
        }
        return s - 1;
      });
    }, 1000);
  };

  const stopRound = () => {
    if (intervalRef.current) window.clearInterval(intervalRef.current);
    intervalRef.current = null;
    setRunning(false);
    toast({ title: "Round finished", description: "Time is up!" });
  };

  const onChange = (key: Category, v: string) =>
    setValues((prev) => ({ ...prev, [key]: v }));

  const timeFmt = useMemo(() => {
    const m = Math.floor(secondsLeft / 60);
    const s = (secondsLeft % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }, [secondsLeft]);

  return (
    <main className="container mx-auto py-10">
      <HeadSEO
        title="Play ȚOMAPAN — Local Game"
        description="Local ȚOMAPAN round with timer and categories."
        canonical="/game"
      />

      <section className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">ȚOMAPAN — Local Game</span>
        </h1>
        <p className="text-muted-foreground">Practice the rules and flow. Online rooms coming soon.</p>
      </section>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="text-5xl font-extrabold tracking-tighter">{letter}</div>
              <div className="text-sm text-muted-foreground">Current letter</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  type="number"
                  min={30}
                  max={240}
                  value={duration}
                  onChange={(e) => setDuration(Math.max(30, Math.min(240, Number(e.target.value) || 0)))}
                  className="w-24"
                />
                <span className="text-sm text-muted-foreground">sec</span>
              </div>
              {!running ? (
                <Button variant="hero" size="lg" onClick={startRound}>Start</Button>
              ) : (
                <Button variant="destructive" size="lg" onClick={stopRound}>Stop</Button>
              )}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline gap-4 mb-6">
            <span className="text-sm text-muted-foreground">Time left</span>
            <span className="text-3xl font-semibold tabular-nums">{timeFmt}</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {CATEGORIES.map((c) => (
              <div key={c} className="space-y-2">
                <Label htmlFor={c}>{c}</Label>
                <Input
                  id={c}
                  value={values[c]}
                  disabled={!running}
                  onChange={(e) => onChange(c, e.target.value)}
                  placeholder={`Începe cu litera “${letter}”`}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default Game;
