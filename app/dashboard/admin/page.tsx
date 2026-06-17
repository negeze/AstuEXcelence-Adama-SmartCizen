'use client'

import { useState, useEffect } from 'react'
import { Navigation } from '@/components/navigation'
import { AdminDashboardStats } from '@/components/admin-dashboard-stats'
import { AdminComplaintCard } from '@/components/admin-complaint-card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Search, Filter } from 'lucide-react'

interface Complaint {
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

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [complaints, setComplaints] = useState<Complaint[]>([])
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is authenticated (in real app, check from auth context)
    const adminAuth = localStorage.getItem('adminAuth')
    if (!adminAuth) {
      window.location.href = '/auth/admin-login'
      return
    }

    setIsAuthenticated(true)

    // Load mock complaints data
    const mockComplaints: Complaint[] = [
      {
        id: '1',
        title: 'Broken Street Light on Main Avenue',
        description: 'The street light at the corner of Main Ave and 5th St has been broken for 2 weeks. This is a safety concern for pedestrians.',
        category: 'Infrastructure',
        priority: 'high',
        status: 'in_progress',
        citizenName: 'John Doe',
        citizenPhone: '+1 (555) 123-4567',
        location: 'Main Ave & 5th St',
        submittedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        unreadMessages: 2,
      },
      {
        id: '2',
        title: 'Road Pothole Near School',
        description: 'A large pothole has appeared on the road near Lincoln Elementary School. It poses a risk to vehicles and cyclists.',
        category: 'Maintenance',
        priority: 'high',
        status: 'under_review',
        citizenName: 'Sarah Johnson',
        citizenPhone: '+1 (555) 234-5678',
        location: 'Lincoln School Road',
        submittedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        unreadMessages: 1,
      },
      {
        id: '3',
        title: 'Garbage Not Collected',
        description: 'Garbage has not been collected from my area for 3 weeks. There is a foul smell and it is attracting rats.',
        category: 'Sanitation',
        priority: 'high',
        status: 'submitted',
        citizenName: 'Michael Chen',
        citizenPhone: '+1 (555) 345-6789',
        location: 'Maple Street Area',
        submittedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '4',
        title: 'Traffic Light Malfunction',
        description: 'The traffic light at the intersection of Park Ave and Oak St is stuck on red. It is causing traffic congestion.',
        category: 'Traffic',
        priority: 'medium',
        status: 'in_progress',
        citizenName: 'Jessica Williams',
        citizenPhone: '+1 (555) 456-7890',
        location: 'Park Ave & Oak St',
        submittedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '5',
        title: 'Broken Park Bench',
        description: 'The park bench near the community center is broken and unsafe to sit on.',
        category: 'Maintenance',
        priority: 'low',
        status: 'resolved',
        citizenName: 'David Brown',
        citizenPhone: '+1 (555) 567-8901',
        location: 'Community Center Park',
        submittedDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '6',
        title: 'Unsafe Pedestrian Crossing',
        description: 'The pedestrian crossing near the market is not clearly marked and is a safety hazard.',
        category: 'Safety',
        priority: 'high',
        status: 'under_review',
        citizenName: 'Emily Rodriguez',
        citizenPhone: '+1 (555) 678-9012',
        location: 'Market Area Crossing',
        submittedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '7',
        title: 'Water Leak in Park',
        description: 'There is a water leak near the fountain in Central Park. Water is running down the street.',
        category: 'Infrastructure',
        priority: 'medium',
        status: 'submitted',
        citizenName: 'Robert Miller',
        citizenPhone: '+1 (555) 789-0123',
        location: 'Central Park',
        submittedDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '8',
        title: 'Graffiti on Building Wall',
        description: 'Offensive graffiti has been spray painted on the side of the community center building.',
        category: 'Maintenance',
        priority: 'low',
        status: 'under_review',
        citizenName: 'Patricia White',
        citizenPhone: '+1 (555) 890-1234',
        location: 'Community Center',
        submittedDate: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ]

    setComplaints(mockComplaints)
    setLoading(false)
  }, [])

  if (!isAuthenticated && !loading) {
    return null
  }

  // Filter complaints based on search and filters
  const filteredComplaints = complaints.filter((complaint) => {
    const matchesSearch =
      complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.citizenName.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = selectedStatus === 'all' || complaint.status === selectedStatus
    const matchesCategory = selectedCategory === 'all' || complaint.category === selectedCategory

    return matchesSearch && matchesStatus && matchesCategory
  })

  // Calculate stats
  const stats = {
    total: complaints.length,
    submitted: complaints.filter((c) => c.status === 'submitted').length,
    underReview: complaints.filter((c) => c.status === 'under_review').length,
    inProgress: complaints.filter((c) => c.status === 'in_progress').length,
    resolved: complaints.filter((c) => c.status === 'resolved').length,
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
              Head Office Dashboard
            </h1>
            <p className="text-lg text-foreground/70">
              Manage and respond to citizen complaints
            </p>
          </div>

          {/* Stats */}
          <AdminDashboardStats
            totalComplaints={stats.total}
            submitted={stats.submitted}
            underReview={stats.underReview}
            inProgress={stats.inProgress}
            resolved={stats.resolved}
          />

          {/* Filters and Search */}
          <Card className="p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative lg:col-span-2">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search complaints by title, description, or citizen..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Status Filter */}
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">All Status</option>
                <option value="submitted">Submitted</option>
                <option value="under_review">Under Review</option>
                <option value="in_progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>

              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">All Categories</option>
                <option value="Infrastructure">Infrastructure</option>
                <option value="Sanitation">Sanitation</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Traffic">Traffic</option>
                <option value="Safety">Safety</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </Card>

          {/* Complaints List */}
          <div className="space-y-4">
            {filteredComplaints.length > 0 ? (
              <>
                <p className="text-sm text-muted-foreground">
                  Showing {filteredComplaints.length} of {complaints.length} complaints
                </p>
                <div className="grid grid-cols-1 gap-4">
                  {filteredComplaints.map((complaint) => (
                    <AdminComplaintCard key={complaint.id} {...complaint} />
                  ))}
                </div>
              </>
            ) : (
              <Card className="p-12 text-center">
                <p className="text-muted-foreground text-lg">No complaints found matching your filters.</p>
                <p className="text-muted-foreground text-sm mt-2">Try adjusting your search or filters.</p>
              </Card>
            )}
          </div>
        </div>
      </main>
    </>
  )
}
