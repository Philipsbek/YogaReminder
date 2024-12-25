import React from 'react';
import { Crown, LogIn } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface NavigationProps {
  onUpgradeClick: () => void;
}

export function Navigation({ onUpgradeClick }: NavigationProps) {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-semibold text-gray-800">
          Daily Yoga
        </Link>
        <div className="flex gap-4">
          {user ? (
            <button
              onClick={onUpgradeClick}
              className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition-colors"
            >
              <Crown size={18} />
              Upgrade
            </button>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition-colors"
            >
              <LogIn size={18} />
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}