'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { AlertCircle, Clock, CheckCircle, FileText } from 'lucide-react'

interface AdminComplaintCardProps {
  id: string
  title: string
  description: string
  category: string
  priority: 'low' | 'medium' | 'high'
  status: 'submitted' | 'under_review' | 'in_progress' | 'resolved'
  citizenName: string
  citizenPhone: string
  location: string
  submittedDate: string
  unreadMessages?: number
}

const statusConfig = {
  submitted: { label: 'Submitted', icon: FileText, color: 'bg-blue-100 text-blue-800' },
  under_review: { label: 'Under Review', icon: Clock, color: 'bg-yellow-100 text-yellow-800' },
  in_progress: { label: 'In Progress', icon: AlertCircle, color: 'bg-orange-100 text-orange-800' },
  resolved: { label: 'Resolved', icon: CheckCircle, color: 'bg-green-100 text-green-800' },
}

const priorityConfig = {
  low: 'bg-blue-100 text-blue-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-red-100 text-red-800',
}

const categoryConfig = {
  'Infrastructure': 'bg-purple-100 text-purple-800',
  'Sanitation': 'bg-indigo-100 text-indigo-800',
  'Maintenance': 'bg-cyan-100 text-cyan-800',
  'Traffic': 'bg-green-100 text-green-800',
  'Safety': 'bg-red-100 text-red-800',
  'Other': 'bg-gray-100 text-gray-800',
}

export function AdminComplaintCard(props: AdminComplaintCardProps) {
  const statusConfig_ = statusConfig[props.status]
  const StatusIcon = statusConfig_.icon

  return (
    <Link href={`/dashboard/admin/${props.id}`}>
      <Card className="hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-primary">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <CardTitle className="text-lg truncate">{props.title}</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                From: {props.citizenName}
              </p>
            </div>
            {props.unreadMessages ? (
              <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">
                {props.unreadMessages}
              </div>
            ) : null}
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-foreground line-clamp-2">{props.description}</p>

          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className={categoryConfig[props.category as keyof typeof categoryConfig]}>
              {props.category}
            </Badge>
            <Badge className={priorityConfig[props.priority]}>
              {props.priority.charAt(0).toUpperCase() + props.priority.slice(1)} Priority
            </Badge>
            <Badge className={statusConfig_.color}>
              <StatusIcon className="w-3 h-3 mr-1" />
              {statusConfig_.label}
            </Badge>
          </div>

          <div className="pt-2 border-t space-y-1 text-xs text-muted-foreground">
            <p>📍 {props.location}</p>
            <p>📞 {props.citizenPhone}</p>
            <p>📅 {new Date(props.submittedDate).toLocaleDateString()}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
