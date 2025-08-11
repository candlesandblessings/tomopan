import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import HeadSEO from "@/components/seo/HeadSEO";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, we would handle login/signup here
    navigate("/");
  };

  return (
    <main className="container mx-auto py-6 px-2 flex items-center justify-center min-h-[calc(100vh-4rem)]">
      <HeadSEO 
        title={isSignUp ? "Sign Up - ȚOMAPAN Online" : "Login - ȚOMAPAN Online"} 
        description={isSignUp ? "Create an account to play ȚOMAPAN online" : "Login to your ȚOMAPAN account"} 
        canonical={isSignUp ? "/signup" : "/login"} 
      />
      
      <Card className="w-full max-w-md">
        <CardHeader className="py-4 px-5">
          <CardTitle className="text-lg">{isSignUp ? "Create Account" : "Login"}</CardTitle>
          <CardDescription className="text-sm">
            {isSignUp 
              ? "Create an account to play ȚOMAPAN online with friends" 
              : "Enter your credentials to access your account"}
          </CardDescription>
        </CardHeader>
        <CardContent className="py-4 px-5">
          <form onSubmit={handleSubmit} className="space-y-3">
            {isSignUp && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm">First Name</Label>
                    <Input
                      id="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required={isSignUp}
                      className="py-2 px-3 text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-sm">Last Name</Label>
                    <Input
                      id="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required={isSignUp}
                      className="py-2 px-3 text-sm"
                    />
                  </div>
                </div>
              </>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="py-2 px-3 text-sm"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="py-2 px-3 text-sm"
              />
            </div>
            
            <Button type="submit" className="w-full py-2 text-sm">
              {isSignUp ? "Create Account" : "Login"}
            </Button>
          </form>
          
          <div className="mt-3 text-center">
            <Button
              variant="link"
              onClick={() => setIsSignUp(!isSignUp)}
              className="p-0 h-auto text-sm"
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