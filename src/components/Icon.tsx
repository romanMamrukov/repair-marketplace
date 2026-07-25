import { Building2, Car, House, Laptop, Smartphone, WashingMachine, Wrench } from 'lucide-react'

const icons = { Building2, Car, House, Laptop, Smartphone, WashingMachine, Wrench }

export function CategoryIcon({ name, size = 24 }: { name: string; size?: number }) {
  const Component = icons[name as keyof typeof icons] ?? Wrench
  return <Component size={size} aria-hidden="true" />
}
