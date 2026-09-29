import {
  Activity,
  Archive,
  Bell,
  Cpu,
  Database,
  FileText,
  Layers,
  Lock,
  ScrollText,
  Search,
  ShieldCheck,
  Users,
  Wallet,
  Zap,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  Activity,
  Archive,
  Bell,
  Cpu,
  Database,
  FileText,
  Layers,
  Lock,
  ScrollText,
  Search,
  ShieldCheck,
  Users,
  Wallet,
  Zap,
};

export function Icon({ name, className }: { name: string; className?: string }) {
  const Cmp = ICONS[name] ?? Activity;
  return <Cmp className={className} />;
}
