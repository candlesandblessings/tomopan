import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-2">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-3">404</h1>
        <p className="text-lg text-muted-foreground mb-4">Oops! Page not found</p>
        <a href="/" className="text-primary underline-offset-4 hover:underline text-sm">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;