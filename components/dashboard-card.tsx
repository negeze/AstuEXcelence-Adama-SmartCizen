interface DashboardCardProps {
  icon?: React.ReactNode
  title: string
  description?: string
  value?: string
  trend?: string
  accent?: string
}

export function DashboardCard({
  icon,
  title,
  description,
  value,
  trend,
  accent = 'primary',
}: DashboardCardProps) {
  const accentClasses = {
    primary: 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800',
    secondary: 'bg-emerald-50 dark:bg-emerald-950 border-emerald-200 dark:border-emerald-800',
    accent: 'bg-teal-50 dark:bg-teal-950 border-teal-200 dark:border-teal-800',
  }

  return (
    <div className={`rounded-lg border p-6 ${accentClasses[accent as keyof typeof accentClasses]}`}>
      {icon && (
        <div className="mb-4 text-primary text-2xl">{icon}</div>
      )}

      <h3 className="font-bold text-lg text-foreground mb-2">{title}</h3>

      {value && (
        <div className="mb-2">
          <span className="text-3xl font-bold text-primary">{value}</span>
        </div>
      )}

      {description && (
        <p className="text-sm text-foreground/70 mb-2">{description}</p>
      )}

      {trend && (
        <div className="text-sm font-medium text-primary">{trend}</div>
      )}
    </div>
  )
}
