'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, Clock, AlertCircle, CheckCircle, TrendingUp } from 'lucide-react'

interface AdminDashboardStatsProps {
  totalComplaints: number
  submitted: number
  underReview: number
  inProgress: number
  resolved: number
}

export function AdminDashboardStats(props: AdminDashboardStatsProps) {
  const stats = [
    {
      title: 'Total Complaints',
      value: props.totalComplaints,
      icon: FileText,
      color: 'bg-blue-100 text-blue-600',
      trend: '+12% this month',
    },
    {
      title: 'Submitted',
      value: props.submitted,
      icon: FileText,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      title: 'Under Review',
      value: props.underReview,
      icon: Clock,
      color: 'bg-yellow-100 text-yellow-600',
    },
    {
      title: 'In Progress',
      value: props.inProgress,
      icon: AlertCircle,
      color: 'bg-orange-100 text-orange-600',
    },
    {
      title: 'Resolved',
      value: props.resolved,
      icon: CheckCircle,
      color: 'bg-green-100 text-green-600',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className={`p-2 rounded-lg ${stat.color}`}>
                <Icon className="w-4 h-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              {stat.trend && <p className="text-xs text-muted-foreground mt-1">{stat.trend}</p>}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
