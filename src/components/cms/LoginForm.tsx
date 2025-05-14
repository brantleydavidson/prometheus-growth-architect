
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (mode === 'login') {
        const { data, error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) throw signInError;

        if (data.session) {
          toast({
            title: "Login successful",
            description: "Welcome to the Prometheus CMS.",
          });
          navigate("/admin");
        }
      } else {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });

        if (signUpError) throw signUpError;

        if (data.user) {
          toast({
            title: "Registration successful",
            description: "Please check your email for verification. You can now log in.",
          });
          setMode('login');
        }
      }
    } catch (err: any) {
      setError(err.message || "Authentication failed");
      console.error("Authentication error:", err);
      toast({
        title: "Authentication failed",
        description: err.message || "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Prometheus CMS</CardTitle>
          <CardDescription>
            {mode === 'login' 
              ? 'Login to manage your website content' 
              : 'Create an account to use the CMS'}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleAuth}>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
              <p className="text-xs text-muted-foreground">
                {mode === 'signup' && 'Password must be at least 6 characters long'}
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading 
                ? (mode === 'login' ? "Logging in..." : "Signing up...") 
                : (mode === 'login' ? "Login" : "Sign Up")}
            </Button>
            
            <div className="text-sm text-center">
              {mode === 'login' ? (
                <p>
                  Don't have an account?{" "}
                  <Button variant="link" className="p-0 h-auto" onClick={() => setMode('signup')}>
                    Sign up
                  </Button>
                </p>
              ) : (
                <p>
                  Already have an account?{" "}
                  <Button variant="link" className="p-0 h-auto" onClick={() => setMode('login')}>
                    Log in
                  </Button>
                </p>
              )}
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default LoginForm;
