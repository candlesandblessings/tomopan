import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "@/components/layout/Header";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Game from "./pages/Game";
import CreateRoom from "./pages/CreateRoom";
import JoinRoom from "./pages/JoinRoom";
import Room from "./pages/Room";
import GameRoom from "./pages/GameRoom";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/game" element={<Game />} />
          <Route path="/create" element={
            <ProtectedRoute>
              <CreateRoom />
            </ProtectedRoute>
          } />
          <Route path="/join" element={
            <ProtectedRoute>
              <JoinRoom />
            </ProtectedRoute>
          } />
          <Route path="/room/:roomId" element={
            <ProtectedRoute>
              <Room />
            </ProtectedRoute>
          } />
          <Route path="/game/:roomId" element={
            <ProtectedRoute>
              <GameRoom />
            </ProtectedRoute>
          } />
          <Route path="/login" element={<Login />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;