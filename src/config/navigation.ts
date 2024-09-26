import { Book, Home, Search, Star, Trophy, Users } from 'lucide-react';

export const navigationLinks = [
  { href: '/', icon: Home, label: 'home' },
  { href: '/catalog', icon: Book, label: 'catalog' },
  { href: '/leaderboard', icon: Trophy, label: 'leaderboard' },
  { href: '/finder', icon: Search, label: 'finder' },
  { href: '/team', icon: Users, label: 'team' },
  { href: '/hobbas', icon: Star, label: 'hobbas' },
] as const;

export type NavigationLink = (typeof navigationLinks)[number];
