import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Notifications from "./pages/Notifications";
import StudentCorner from "./pages/StudentCorner";
import Canteen from "./pages/Canteen";
import Discussions from "./pages/Discussions";
import Guidelines from "./pages/Guidelines";
import Hostel from "./pages/Hostel";
import Chat from "./pages/Chat";
import Complaints from "./pages/Complaints";
import Feedback from "./pages/Feedback";
import Results from "./pages/Results";
import Admissions from "./pages/Admissions";
import ExamCell from "./pages/ExamCell";
import Fees from "./pages/Fees";
import Handlers from "./pages/Handlers";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* Protected Routes */}
            <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
            <Route path="/student-corner" element={<ProtectedRoute><StudentCorner /></ProtectedRoute>} />
            <Route path="/canteen" element={<ProtectedRoute><Canteen /></ProtectedRoute>} />
            <Route path="/discussions" element={<ProtectedRoute><Discussions /></ProtectedRoute>} />
            <Route path="/guidelines" element={<ProtectedRoute><Guidelines /></ProtectedRoute>} />
            <Route path="/hostel" element={<ProtectedRoute><Hostel /></ProtectedRoute>} />
            <Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
            <Route path="/complaints" element={<ProtectedRoute><Complaints /></ProtectedRoute>} />
            <Route path="/feedback" element={<ProtectedRoute><Feedback /></ProtectedRoute>} />
            <Route path="/results" element={<ProtectedRoute><Results /></ProtectedRoute>} />
            <Route path="/admissions" element={<ProtectedRoute><Admissions /></ProtectedRoute>} />
            <Route path="/exam-cell" element={<ProtectedRoute><ExamCell /></ProtectedRoute>} />
            <Route path="/fees" element={<ProtectedRoute><Fees /></ProtectedRoute>} />
            <Route path="/handlers" element={<ProtectedRoute><Handlers /></ProtectedRoute>} />
            
            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
