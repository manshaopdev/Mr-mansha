import { useState, useEffect, useCallback } from 'react';
import { AuthUser } from '../types/fiverr';

const STORAGE_KEY = 'figerfree_auth_user';

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // ignore
    }
    // Default demo user so the app is instantly usable with real freelance workflows
    return {
      id: 'usr_default_seller',
      name: 'Shahzaib Hassan',
      username: 'shahzaib_pro',
      email: 'shahzaib@figerfree.com',
      phone: '03262636289',
      role: 'seller',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      bio: 'Full-stack software developer & UI designer crafting high-converting modern web applications.',
      skills: ['React', 'Next.js', 'Tailwind CSS', 'Node.js', 'E-Commerce'],
      country: 'Pakistan',
      rating: 5.0,
      level: 'Level 2 Seller',
      ordersCompleted: 24,
      createdAt: new Date().toISOString()
    };
  });

  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // ignore
    }
  }, [user]);

  // Login
  const login = useCallback(async (identifier: string, password: string) => {
    setIsLoading(true);
    setAuthError(null);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, password }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Login failed. Please verify credentials.');
      }
      setUser(data.user);
      return { success: true, user: data.user };
    } catch (err: any) {
      setAuthError(err.message || 'Login failed');
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Register
  const register = useCallback(async (payload: {
    name: string;
    username?: string;
    email?: string;
    phone?: string;
    password: string;
    role: 'buyer' | 'seller';
    bio?: string;
    skills?: string[];
    country?: string;
    avatar?: string;
  }) => {
    setIsLoading(true);
    setAuthError(null);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Registration failed.');
      }
      setUser(data.user);
      return { success: true, user: data.user };
    } catch (err: any) {
      setAuthError(err.message || 'Registration failed');
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Switch Role (Between Buyer and Seller, like on Fiverr)
  const switchRole = useCallback(async () => {
    if (!user) return;
    const newRole: 'buyer' | 'seller' = user.role === 'seller' ? 'buyer' : 'seller';
    const updatedUser = { ...user, role: newRole };
    setUser(updatedUser);
    try {
      await fetch('/api/auth/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, role: newRole }),
      });
    } catch {
      // ignore
    }
  }, [user]);

  // Update Profile
  const updateProfile = useCallback(async (updates: Partial<AuthUser>) => {
    if (!user) return;
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    try {
      await fetch('/api/auth/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, ...updates }),
      });
    } catch {
      // ignore
    }
  }, [user]);

  // Logout
  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  // Fast Quick-Login Demo Account
  const quickDemoLogin = useCallback((role: 'buyer' | 'seller' = 'seller') => {
    const demo: AuthUser = role === 'seller' ? {
      id: 'usr_seller_pro',
      name: 'Hamza Tariq',
      username: 'hamza_architect',
      email: 'hamza@figerfree.com',
      phone: '03001234567',
      role: 'seller',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      bio: 'Top Rated Full-Stack Web Architect on Figer Free specializing in React, Next.js, and High Performance Systems.',
      skills: ['React', 'Next.js', 'Node.js', 'Tailwind', 'MongoDB'],
      country: 'Pakistan',
      rating: 4.9,
      level: 'Top Rated Seller',
      ordersCompleted: 58,
      createdAt: new Date().toISOString()
    } : {
      id: 'usr_buyer_corp',
      name: 'Ayesha Khan',
      username: 'ayesha_client',
      email: 'ayesha@brandgrowth.pk',
      phone: '03219876543',
      role: 'buyer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      bio: 'Brand director sourcing top creative talent and developers on Figer Free.',
      country: 'Pakistan',
      createdAt: new Date().toISOString()
    };
    setUser(demo);
  }, []);

  return {
    user,
    isLoading,
    authError,
    setAuthError,
    login,
    register,
    switchRole,
    updateProfile,
    logout,
    quickDemoLogin,
  };
}
