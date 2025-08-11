import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useUser } from "@/contexts/UserContext";
import HeadSEO from "@/components/seo/HeadSEO";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const { signIn, signUp } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (isSignUp) {
        await signUp(email, password, firstName, lastName);
      } else {
        await signIn(email, password);
        navigate("/");
      }
    } catch (error) {
      console.error("Authentication error:", error);
    }
  };

  return (
    <main className="container mx-auto py-10 flex items-center justify-center min-h-[calc(100vh-4rem)]">
      <HeadSEO 
        title={isSignUp ? "Sign Up - ȚOMAPAN Online" : "Login - ȚOMAPAN Online"} 
        description={isSignUp ? "Create an account to play ȚOMAPAN online" : "Login to your ȚOMAPAN account"} 
        canonical={isSignUp ? "/signup" : "/login"} 
      />
      
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{isSignUp ? "Create Account" : "Login"}</CardTitle>
          <CardDescription>
            {isSignUp 
              ? "Create an account to play ȚOMAPAN online with friends" 
              : "Enter your credentials to access your account"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required={isSignUp}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required={isSignUp}
                    />
                  </div>
                </div>
              </>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <Button type="submit" className="w-full">
              {isSignUp ? "Create Account" : "Login"}
            </Button>
          </form>
          
          <div className="mt-4 text-center">
            <Button
              variant="link"
              onClick={() => setIsSignUp(!isSignUp)}
              className="p-0 h-auto"
            >
              {isSignUp
                ? "Already have an account? Login"
                : "Don't have an account? Sign up"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default Login;