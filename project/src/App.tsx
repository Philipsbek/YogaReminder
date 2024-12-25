import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { Navigation } from './components/Navigation';
import { LoginPage } from './pages/LoginPage';
import { PremiumPage } from './pages/PremiumPage';
import { SubscriptionPage } from './pages/SubscriptionPage';
import { LandingPage } from './pages/LandingPage';
import { SessionPage } from './pages/SessionPage';
import { AuthRoute } from './components/AuthRoute';

export default function App() {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/premium" element={
            <AuthRoute>
              <PremiumPage />
            </AuthRoute>
          } />
          <Route path="/session/:sessionId" element={
            <AuthRoute>
              <SessionPage />
            </AuthRoute>
          } />
          <Route path="/subscribe" element={<SubscriptionPage />} />
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}