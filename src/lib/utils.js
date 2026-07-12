import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import {
  Bot,
  Workflow,
  Factory,
  Code2,
  Cloud,
  Smartphone,
  Lock,
  Sparkles,
  BarChart3,
  Settings,
  Database,
  Layers,
  Server,
  TrendingUp,
  Users,
  Target,
  Zap,
  Shield,
  CheckCircle,
} from 'lucide-react'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

const ICON_MAP = {
  bot: Bot,
  workflow: Workflow,
  factory: Factory,
  code: Code2,
  cloud: Cloud,
  smartphone: Smartphone,
  mobile: Smartphone,
  lock: Lock,
  security: Lock,
  sparkles: Sparkles,
  barchart: BarChart3,
  analytics: BarChart3,
  settings: Settings,
  database: Database,
  layers: Layers,
  integration: Layers,
  server: Server,
  devops: Server,
  trending: TrendingUp,
  growth: TrendingUp,
  users: Users,
  team: Users,
  target: Target,
  design: Target,
  zap: Zap,
  performance: Zap,
  shield: Shield,
  reliability: Shield,
  check: CheckCircle,
}

export function resolveIcon(iconHint) {
  if (!iconHint) return Sparkles
  const key = iconHint.toLowerCase().replace(/[^a-z0-9]/g, '')
  return ICON_MAP[key] || Sparkles
}
