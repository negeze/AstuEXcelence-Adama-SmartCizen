'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Navigation } from '@/components/navigation'
import { ChatMessage } from '@/components/chat-message'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { ArrowLeft, Send, AlertCircle, Clock, CheckCircle, FileText } from 'lucide-react'

interface ComplaintDetail {
  id: string
  title: string
  description: string
  category: string
  priority: 'low' | 'medium' | 'high'
  status: 'submitted' | 'under_review' | 'in_progress' | 'resolved'
  citizenName: string
  citizenPhone: string
  citizenEmail: string
  location: string
  submittedDate: string
  images?: string[]
}

interface Message {
  id: string
  author: string
  role: 'citizen' | 'admin'
  message: string
  timestamp: string
  isRead: boolean
}

const mockComplaints: Record<string, ComplaintDetail> = {
  '1': {
    id: '1',
    title: 'Broken Street Light on Main Avenue',
    description: 'The street light at the corner of Main Ave and 5th St has been broken for 2 weeks. This is a safety concern for pedestrians. The area is very dark at night and it is unsafe for people to walk.',
    category: 'Infrastructure',
    priority: 'high',
    status: 'in_progress',
    citizenName: 'John Doe',
    citizenPhone: '+1 (555) 123-4567',
    citizenEmail: 'john.doe@example.com',
    location: 'Main Ave & 5th St',
    submittedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  '2': {
    id: '2',
    title: 'Road Pothole Near School',
    description: 'A large pothole has appeared on the road near Lincoln Elementary School. It poses a risk to vehicles and cyclists. The pothole is about 2 feet wide and 6 inches deep.',
    category: 'Maintenance',
    priority: 'high',
    status: 'under_review',
    citizenName: 'Sarah Johnson',
    citizenPhone: '+1 (555) 234-5678',
    citizenEmail: 'sarah.johnson@example.com',
    location: 'Lincoln School Road',
    submittedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  '3': {
    id: '3',
    title: 'Garbage Not Collected',
    description: 'Garbage has not been collected from my area for 3 weeks. There is a foul smell and it is attracting rats. The garbage bins are overflowing.',
    category: 'Sanitation',
    priority: 'high',
    status: 'submitted',
    citizenName: 'Michael Chen',
    citizenPhone: '+1 (555) 345-6789',
    citizenEmail: 'michael.chen@example.com',
    location: 'Maple Street Area',
    submittedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  '4': {
    id: '4',
    title: 'Traffic Light Malfunction',
    description: 'The traffic light at the intersection of Park Ave and Oak St is stuck on red. It is causing traffic congestion during peak hours.',
    category: 'Traffic',
    priority: 'medium',
    status: 'in_progress',
    citizenName: 'Jessica Williams',
    citizenPhone: '+1 (555) 456-7890',
    citizenEmail: 'jessica.williams@example.com',
    location: 'Park Ave & Oak St',
    submittedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  '5': {
    id: '5',
    title: 'Broken Park Bench',
    description: 'The park bench near the community center is broken and unsafe to sit on.',
    category: 'Maintenance',
    priority: 'low',
    status: 'resolved',
    citizenName: 'David Brown',
    citizenPhone: '+1 (555) 567-8901',
    citizenEmail: 'david.brown@example.com',
    location: 'Community Center Park',
    submittedDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
  },
  '6': {
    id: '6',
    title: 'Unsafe Pedestrian Crossing',
    description: 'The pedestrian crossing near the market is not clearly marked and is a safety hazard.',
    category: 'Safety',
    priority: 'high',
    status: 'under_review',
    citizenName: 'Emily Rodriguez',
    citizenPhone: '+1 (555) 678-9012',
    citizenEmail: 'emily.rodriguez@example.com',
    location: 'Market Area Crossing',
    submittedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  '7': {
    id: '7',
    title: 'Water Leak in Park',
    description: 'There is a water leak near the fountain in Central Park. Water is running down the street.',
    category: 'Infrastructure',
    priority: 'medium',
    status: 'submitted',
    citizenName: 'Robert Miller',
    citizenPhone: '+1 (555) 789-0123',
    citizenEmail: 'robert.miller@example.com',
    location: 'Central Park',
    submittedDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
  },
  '8': {
    id: '8',
    title: 'Graffiti on Building Wall',
    description: 'Offensive graffiti has been spray painted on the side of the community center building.',
    category: 'Maintenance',
    priority: 'low',
    status: 'under_review',
    citizenName: 'Patricia White',
    citizenPhone: '+1 (555) 890-1234',
    citizenEmail: 'patricia.white@example.com',
    location: 'Community Center',
    submittedDate: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
  },
}

const mockMessages: Record<string, Message[]> = {
  '1': [
    {
      id: '1',
      author: 'John Doe',
      role: 'citizen',
      message: 'Hi, I submitted a complaint about the broken street light on Main Avenue. When can it be fixed?',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      isRead: true,
    },
    {
      id: '2',
      author: 'Admin - Road Maintenance',
      role: 'admin',
      message: 'Thank you for reporting this issue. We have logged it and assigned it to our maintenance team. They will inspect the area within 2-3 days.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      isRead: true,
    },
    {
      id: '3',
      author: 'Admin - Road Maintenance',
      role: 'admin',
      message: 'Update: Our team has inspected the location and ordered a replacement light. Installation is scheduled for tomorrow afternoon.',
      timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      isRead: true,
    },
    {
      id: '4',
      author: 'John Doe',
      role: 'citizen',
      message: 'That is great news! Thank you for the quick response. I appreciate it.',
      timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
      isRead: true,
    },
  ],
  '2': [
    {
      id: '1',
      author: 'Sarah Johnson',
      role: 'citizen',
      message: 'Good morning, I reported a pothole near Lincoln School. My concern is that children could get injured. Please prioritize this.',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      isRead: true,
    },
    {
      id: '2',
      author: 'Admin - Safety Inspector',
      role: 'admin',
      message: 'Thank you for bringing this to our attention. Safety is our priority. We are currently reviewing this complaint and will send an inspector within 48 hours.',
      timestamp: new Date(Date.now() - 1.5 * 24 * 60 * 60 * 1000).toISOString(),
      isRead: true,
    },
  ],
  '3': [
    {
      id: '1',
      author: 'Michael Chen',
      role: 'citizen',
      message: 'The garbage has not been collected for 3 weeks now. This is getting out of hand!',
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
      isRead: true,
    },
  ],
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

export default function ComplaintDetail() {
  const router = useRouter()
  const params = useParams()
  const complaintId = params.id as string

  const [complaint, setComplaint] = useState<ComplaintDetail | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [status, setStatus] = useState<ComplaintDetail['status']>('submitted')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const adminAuth = localStorage.getItem('adminAuth')
    if (!adminAuth) {
      router.push('/auth/admin-login')
      return
    }

    setIsAuthenticated(true)

    // Load complaint details
    const complaintData = mockComplaints[complaintId]
    if (complaintData) {
      setComplaint(complaintData)
      setStatus(complaintData.status)
      setMessages(mockMessages[complaintId] || [])
    }

    setLoading(false)
  }, [complaintId, router])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const message: Message = {
      id: String(messages.length + 1),
      author: 'Admin - Support Team',
      role: 'admin',
      message: newMessage,
      timestamp: new Date().toISOString(),
      isRead: true,
    }

    setMessages([...messages, message])
    setNewMessage('')
  }

  const handleStatusChange = (newStatus: ComplaintDetail['status']) => {
    setStatus(newStatus)
    // In a real app, this would update the backend
  }

  if (!isAuthenticated && !loading) {
    return null
  }

  if (loading || !complaint) {
    return (
      <>
        <Navigation />
        <main className="min-h-screen bg-background">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center">
              <p className="text-muted-foreground">Loading complaint details...</p>
            </div>
          </div>
        </main>
      </>
    )
  }

  const statusConfig_ = statusConfig[status]
  const StatusIcon = statusConfig_.icon

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          {/* Back Button */}
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="mb-6 flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Complaint Details */}
            <div className="lg:col-span-1 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{complaint.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Description</p>
                    <p className="text-sm">{complaint.description}</p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Badges</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge className={priorityConfig[complaint.priority]}>
                        {complaint.priority.charAt(0).toUpperCase() + complaint.priority.slice(1)} Priority
                      </Badge>
                      <Badge className={statusConfig_.color}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {statusConfig_.label}
                      </Badge>
                    </div>
                  </div>

                  <div className="pt-2 border-t space-y-2 text-sm">
                    <p>
                      <span className="font-semibold">Category:</span> {complaint.category}
                    </p>
                    <p>
                      <span className="font-semibold">Location:</span> {complaint.location}
                    </p>
                    <p>
                      <span className="font-semibold">Date:</span> {new Date(complaint.submittedDate).toLocaleDateString()}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Citizen Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Citizen Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div>
                    <p className="text-muted-foreground">Name</p>
                    <p className="font-semibold">{complaint.citizenName}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Email</p>
                    <p className="font-semibold">{complaint.citizenEmail}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Phone</p>
                    <p className="font-semibold">{complaint.citizenPhone}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Status Management */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Update Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <select
                    value={status}
                    onChange={(e) => handleStatusChange(e.target.value as ComplaintDetail['status'])}
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="submitted">Submitted</option>
                    <option value="under_review">Under Review</option>
                    <option value="in_progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                  </select>
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                    Save Status
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Chat Section */}
            <div className="lg:col-span-2">
              <Card className="h-full flex flex-col">
                <CardHeader>
                  <CardTitle>Communication</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Chat with {complaint.citizenName} about this complaint
                  </p>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto mb-4 space-y-4 max-h-96 pr-2">
                    {messages.length === 0 ? (
                      <div className="text-center text-muted-foreground py-8">
                        <p>No messages yet. Start a conversation with the citizen.</p>
                      </div>
                    ) : (
                      <>
                        {messages.map((message) => (
                          <ChatMessage
                            key={message.id}
                            author={message.author}
                            role={message.role}
                            message={message.message}
                            timestamp={message.timestamp}
                            isRead={message.isRead}
                          />
                        ))}
                        <div ref={messagesEndRef} />
                      </>
                    )}
                  </div>

                  {/* Message Input */}
                  <div className="border-t pt-4">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Type your message here..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault()
                            handleSendMessage()
                          }
                        }}
                        className="flex-1"
                      />
                      <Button
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                        className="bg-primary text-primary-foreground hover:bg-primary/90"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Press Enter to send, Shift+Enter for new line
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
