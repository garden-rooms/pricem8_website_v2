import {
  RefreshCw,
  Briefcase,
  Receipt,
  Wrench,
  Zap,
  Trees,
  Hammer,
  Home,
  Warehouse,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Music2,
  TrendingUp,
  FileText,
  LucideIcon
} from 'lucide-react'

// Map of icon names to Lucide components
const iconMap: { [key: string]: LucideIcon } = {
  refresh: RefreshCw,
  toolbox: Briefcase,
  receipt: Receipt,
  wrench: Wrench,
  bolt: Zap,
  tree: Trees,
  hammer: Hammer,
  home: Home,
  box: Warehouse,
  facebook: Facebook,
  twitter: Twitter,
  linkedin: Linkedin,
  instagram: Instagram,
  tiktok: Music2,
  'trending-up': TrendingUp,
  'file-text': FileText,
}

export const getIcon = (iconName: string, className?: string) => {
  const IconComponent = iconMap[iconName]
  if (!IconComponent) return null

  return <IconComponent className={className} />
}

