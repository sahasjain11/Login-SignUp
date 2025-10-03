import React, { useState, useEffect } from 'react';
import { LogOut, User, Lock, Mail, ChevronRight, CheckCircle, Smartphone, AlertTriangle } from 'lucide-react';

// --- Global Variable Declarations (Simplified Mock Environment) ---
// Note: These variables are kept for structure but are now hardcoded mocks.
const appId = 'auth-suite-default-mock'; 
// Firebase config and auth token variables are removed.

// The voice of the application: a modern, dark glassmorphic design
const darkGlass = "bg-gray-900/40 backdrop-blur-xl border border-gray-700/50 shadow-2xl rounded-2xl p-6 md:p-10 transition-all duration-500 ease-in-out";
const buttonBase = "w-full py-3 rounded-xl font-semibold transition-all duration-300 transform active:scale-95 flex items-center justify-center space-x-2";
const primaryButton = `bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/50 ${buttonBase}`;
const secondaryButton = `bg-gray-700 hover:bg-gray-600 text-gray-200 ${buttonBase}`;
const inputStyle = "w-full px-4 py-3 bg-gray-800/60 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300";

// --- Application Component ---

const App = () => {
  // Removed db and auth state variables.
  const [userId, setUserId] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('login'); // 'login', 'register', 'forgot', 'mfa', 'dashboard'
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // 1. Initial Load Effect (Mock: Simulates ready state immediately)
  useEffect(() => {
    // If we detect a local 'session', move to dashboard (for demonstration)
    if (userId) {
        setView('dashboard');
    }
    setLoading(false);
  }, []);
  
  // --- Mock Authentication Handlers ---

  const mockSignIn = () => {
    // Simulating a successful login that provides user ID and profile data
    const mockId = 'usr-ab1c2d-34ef-56gh-78ij-90klmnopq';
    setUserId(mockId);
    setUserProfile({
        id: mockId,
        email: 'mock.user@high-end-app.com',
        lastLogin: new Date().toLocaleTimeString(),
        status: 'Active (Simulated Session)',
    });
  };

  const handleAction = (flowName, nextView) => {
    // Simulate API delay
    setMessage('');
    setError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (flowName === 'login') {
        // High-end login requires MFA check first
        setMessage("Login successful. Proceeding to Multi-Factor Verification...");
        setView('mfa');
      } else if (flowName === 'mfa') {
        setMessage("MFA successful. Welcome to the Dashboard!");
        mockSignIn(); // Establish mock session
        setView('dashboard');
      } else if (flowName === 'register') {
        setMessage("Account created. Please log in with your new credentials.");
        setView('login');
      } else if (flowName === 'forgot') {
        setMessage("Password reset link sent to your email (simulated).");
        setView('login');
      }
    }, 1500);
  };

  const handleLogout = () => {
    // Clear local mock session
    setView('login');
    setUserProfile(null);
    setUserId(null);
    setMessage("Successfully signed out.");
  };


  // --- Component Definitions ---

  const AuthCard = ({ title, children }) => (
    <div className={`${darkGlass} w-full max-w-md mx-auto`}>
      <h2 className="text-3xl font-extrabold text-white mb-2 tracking-tight">{title}</h2>
      <p className="text-sm text-indigo-400 mb-8">Access the secure platform (Frontend Simulation).</p>
      {children}
      {loading && (
        <div className="mt-6 flex justify-center items-center space-x-2 text-indigo-400">
          <svg className="animate-spin h-5 w-5 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Processing...</span>
        </div>
      )}
      {message && <div className="mt-4 p-3 bg-indigo-900/50 text-indigo-300 rounded-lg flex items-center"><CheckCircle className="h-5 w-5 mr-2" />{message}</div>}
      {error && <div className="mt-4 p-3 bg-red-900/50 text-red-300 rounded-lg flex items-center"><AlertTriangle className="h-5 w-5 mr-2" />{error}</div>}
    </div>
  );

  const LoginView = () => (
    <AuthCard title="Secure Sign In">
      <form onSubmit={(e) => { e.preventDefault(); handleAction('login', 'mfa'); }} className="space-y-6">
        <div>
          <label className="text-sm font-medium text-gray-300 block mb-2" htmlFor="email">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-indigo-400" />
            <input
              id="email"
              type="email"
              placeholder="user@domain.com"
              className={`${inputStyle} pl-10`}
              required
              disabled={loading}
              defaultValue="test@user.com" // Pre-fill for quick demo
            />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-300 block mb-2" htmlFor="password">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-indigo-400" />
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className={`${inputStyle} pl-10`}
              required
              disabled={loading}
              defaultValue="password123" // Pre-fill for quick demo
            />
          </div>
        </div>
        <button type="submit" className={primaryButton} disabled={loading}>
          <span>Sign In & Verify</span>
          <ChevronRight className="h-5 w-5" />
        </button>
      </form>
      <div className="mt-6 space-y-3">
        <button onClick={() => setView('forgot')} className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors block text-center w-full" disabled={loading}>
          Forgot Password?
        </button>
        <button onClick={() => setView('register')} className={secondaryButton} disabled={loading}>
          Create New Account
        </button>
        <div className="mt-4 pt-4 border-t border-gray-700">
             <p className="text-center text-xs text-gray-500">
                 Or sign in with a **High-End** partner:
             </p>
             <div className="flex justify-center space-x-4 mt-2">
                 <button className="text-2xl hover:scale-110 transition-transform">
                    <img alt="Google" src="https://placehold.co/24x24/1a202c/ffffff?text=G" className="w-6 h-6 rounded-full" />
                 </button>
                 <button className="text-2xl hover:scale-110 transition-transform">
                     <img alt="Apple" src="https://placehold.co/24x24/1a202c/ffffff?text=A" className="w-6 h-6 rounded-full" />
                 </button>
                 <button className="text-2xl hover:scale-110 transition-transform">
                     <img alt="Github" src="https://placehold.co/24x24/1a202c/ffffff?text=Gh" className="w-6 h-6 rounded-full" />
                 </button>
             </div>
        </div>
      </div>
    </AuthCard>
  );

  const RegisterView = () => (
    <AuthCard title="New User Registration">
      <form onSubmit={(e) => { e.preventDefault(); handleAction('register', 'login'); }} className="space-y-6">
        <div>
          <label className="text-sm font-medium text-gray-300 block mb-2" htmlFor="reg-email">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-indigo-400" />
            <input id="reg-email" type="email" placeholder="new.user@domain.com" className={`${inputStyle} pl-10`} required disabled={loading} />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-300 block mb-2" htmlFor="reg-password">Create Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-indigo-400" />
            <input id="reg-password" type="password" placeholder="•••••••• (Min 8 characters)" className={`${inputStyle} pl-10`} required disabled={loading} />
          </div>
        </div>
        <button type="submit" className={primaryButton} disabled={loading}>
          <span>Register Account</span>
          <ChevronRight className="h-5 w-5" />
        </button>
      </form>
      <div className="mt-6">
        <button onClick={() => setView('login')} className="text-sm text-gray-400 hover:text-white transition-colors block text-center w-full" disabled={loading}>
          Back to Sign In
        </button>
      </div>
    </AuthCard>
  );

  const ForgotPasswordView = () => (
    <AuthCard title="Reset Password">
      <form onSubmit={(e) => { e.preventDefault(); handleAction('forgot', 'login'); }} className="space-y-6">
        <p className="text-gray-400 text-sm">Enter your registered email address to receive a secure password reset link.</p>
        <div>
          <label className="text-sm font-medium text-gray-300 block mb-2" htmlFor="reset-email">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-indigo-400" />
            <input id="reset-email" type="email" placeholder="user@domain.com" className={`${inputStyle} pl-10`} required disabled={loading} />
          </div>
        </div>
        <button type="submit" className={primaryButton} disabled={loading}>
          <span>Send Reset Link</span>
          <ChevronRight className="h-5 w-5" />
        </button>
      </form>
      <div className="mt-6">
        <button onClick={() => setView('login')} className="text-sm text-gray-400 hover:text-white transition-colors block text-center w-full" disabled={loading}>
          Cancel
        </button>
      </div>
    </AuthCard>
  );

  const MFAVerificationView = () => (
    <AuthCard title="Multi-Factor Verification">
      <form onSubmit={(e) => { e.preventDefault(); handleAction('mfa', 'dashboard'); }} className="space-y-6">
        <p className="text-gray-400 text-sm flex items-center space-x-2">
            <Smartphone className="h-5 w-5 text-indigo-400" />
            <span>A 6-digit code has been sent to your registered device (Simulated).</span>
        </p>
        <div>
          <label className="text-sm font-medium text-gray-300 block mb-2" htmlFor="mfa-code">Verification Code</label>
          <input
            id="mfa-code"
            type="text"
            placeholder="000 000"
            maxLength="6"
            className={`${inputStyle} text-center tracking-widest text-lg font-mono`}
            required
            disabled={loading}
          />
        </div>
        <button type="submit" className={primaryButton} disabled={loading}>
          <span>Verify & Log In</span>
          <ChevronRight className="h-5 w-5" />
        </button>
      </form>
      <div className="mt-6 space-y-3">
        <button className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors block text-center w-full" disabled={loading}>
          Resend Code
        </button>
      </div>
    </AuthCard>
  );

  const DashboardView = () => (
    <div className={`${darkGlass} w-full max-w-2xl mx-auto`}>
      <h2 className="text-3xl font-extrabold text-green-400 mb-4 tracking-tight flex items-center">
        <CheckCircle className="h-8 w-8 mr-3" />
        Access Granted
      </h2>
      <p className="text-gray-300 mb-6">You have successfully completed the high-end, multi-factor authentication flow. This is a front-end simulation showing mock user data.</p>

      <div className="space-y-4 p-4 bg-gray-800/60 rounded-xl border border-gray-700">
        <h3 className="text-xl font-semibold text-white border-b border-gray-700 pb-2">User Details (Simulated Session Data)</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-400">Application ID:</p>
            <p className="text-indigo-300 font-mono break-all">{appId}</p>
          </div>
          <div>
            <p className="text-gray-400">Authenticated User ID:</p>
            <p className="text-indigo-300 font-mono break-all">{userId || 'N/A'}</p>
          </div>
          <div>
            <p className="text-gray-400">Status (From Profile):</p>
            <p className="text-white font-medium">{userProfile?.status || 'Loading...'}</p>
          </div>
          <div>
            <p className="text-gray-400">Email (From Profile):</p>
            <p className="text-white font-medium break-all">{userProfile?.email || 'Loading...'}</p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <button onClick={handleLogout} className={secondaryButton}>
          <LogOut className="h-5 w-5" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  const renderView = () => {
    if (loading && !userId) {
        return (
            <div className={`${darkGlass} w-full max-w-md mx-auto flex flex-col items-center justify-center h-48`}>
                 <svg className="animate-spin h-8 w-8 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                 </svg>
                 <p className="mt-4 text-indigo-400">Starting Application...</p>
                 {error && <div className="mt-4 p-2 bg-red-900/50 text-red-300 rounded-lg flex items-center text-sm"><AlertTriangle className="h-4 w-4 mr-1" />{error}</div>}
            </div>
        );
    }
    switch (view) {
      case 'register':
        return <RegisterView />;
      case 'forgot':
        return <ForgotPasswordView />;
      case 'mfa':
        return <MFAVerificationView />;
      case 'dashboard':
        return <DashboardView />;
      case 'login':
      default:
        return <LoginView />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 p-4 flex items-center justify-center font-['Inter']">
      <style>{`
        /* Custom CSS for smoother background */
        body { margin: 0; background-color: #030712; }
        .font-['Inter'] { font-family: 'Inter', sans-serif; }
      `}</style>
      {renderView()}
    </div>
  );
};

export default App;
