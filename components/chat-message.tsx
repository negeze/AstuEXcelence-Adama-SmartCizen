'use client'

import { cn } from '@/lib/utils'
import { formatDistanceToNow } from 'date-fns'

interface ChatMessageProps {
  author: string
  role: 'citizen' | 'admin'
  message: string
  timestamp: string
  isRead?: boolean
}

export function ChatMessage({ author, role, message, timestamp, isRead = true }: ChatMessageProps) {
  const isAdmin = role === 'admin'

  return (
    <div className={cn('flex mb-4', isAdmin ? 'justify-end' : 'justify-start')}>
      <div
        className={cn(
          'max-w-xs lg:max-w-md px-4 py-2 rounded-lg',
          isAdmin
            ? 'bg-primary text-primary-foreground rounded-br-none'
            : 'bg-muted text-foreground rounded-bl-none'
        )}
      >
        <div className="flex items-baseline gap-2 mb-1">
          <p className="font-semibold text-sm">{author}</p>
          <p className={cn('text-xs', isAdmin ? 'text-primary-foreground/70' : 'text-muted-foreground')}>
            {formatDistanceToNow(new Date(timestamp), { addSuffix: true })}
          </p>
        </div>
        <p className="text-sm break-words">{message}</p>
        {!isRead && !isAdmin && (
          <p className={cn('text-xs mt-1', isAdmin ? 'text-primary-foreground/70' : 'text-muted-foreground')}>
            Unread
          </p>
        )}
      </div>
    </div>
  )
}
