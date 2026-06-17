'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Navigation } from '@/components/navigation'

interface Complaint {
  id: string
  title: string
  description: string
  category: string
  status: 'submitted' | 'under_review' | 'in_progress' | 'resolved'
  priority: 'low' | 'medium' | 'high'
  submittedDate: string
  location: string
}

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [showForm, setShowForm] = useState(false)
  const [complaints, setComplaints] = useState<Complaint[]>([
    {
      id: '1',
      title: 'Pothole on Main Street',
      description: 'Large pothole causing traffic hazards near intersection',
      category: 'Infrastructure',
      status: 'in_progress',
      priority: 'high',
      submittedDate: '2024-06-10',
      location: 'Main Street, Downtown',
    },
    {
      id: '2',
      title: 'Street Light Not Working',
      description: 'Street light at corner of 5th and Park is out',
      category: 'Maintenance',
      status: 'under_review',
      priority: 'medium',
      submittedDate: '2024-06-08',
      location: '5th Avenue, Park Street',
    },
    {
      id: '3',
      title: 'Trash Collection Delay',
      description: 'Garbage not collected for 2 weeks in residential area',
      category: 'Sanitation',
      status: 'resolved',
      priority: 'medium',
      submittedDate: '2024-06-01',
      location: 'Residential District',
    },
  ])

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Infrastructure',
    priority: 'medium',
    location: '',
  })

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (!userData) {
      router.push('/auth/login')
      return
    }
    setUser(JSON.parse(userData))
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('user')
    router.push('/')
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmitComplaint = (e: React.FormEvent) => {
    e.preventDefault()
    const newComplaint: Complaint = {
      id: String(complaints.length + 1),
      ...formData,
      status: 'submitted',
      submittedDate: new Date().toISOString().split('T')[0],
    }
    setComplaints([newComplaint, ...complaints])
    setFormData({
      title: '',
      description: '',
      category: 'Infrastructure',
      priority: 'medium',
      location: '',
    })
    setShowForm(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'bg-blue-100 text-blue-800'
      case 'under_review':
        return 'bg-yellow-100 text-yellow-800'
      case 'in_progress':
        return 'bg-purple-100 text-purple-800'
      case 'resolved':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600'
      case 'medium':
        return 'text-orange-600'
      case 'low':
        return 'text-green-600'
      default:
        return 'text-gray-600'
    }
  }

  if (!user) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background">
        {/* Header */}
        <div className="border-b border-border bg-card sticky top-16 z-10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
              <p className="text-foreground/70">Welcome, {user.name || user.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors text-foreground"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-sm font-medium text-foreground/70 mb-2">Total Complaints</h3>
              <p className="text-3xl font-bold text-primary">{complaints.length}</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-sm font-medium text-foreground/70 mb-2">Under Review</h3>
              <p className="text-3xl font-bold text-orange-600">
                {complaints.filter((c) => c.status === 'under_review').length}
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-sm font-medium text-foreground/70 mb-2">In Progress</h3>
              <p className="text-3xl font-bold text-purple-600">
                {complaints.filter((c) => c.status === 'in_progress').length}
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-sm font-medium text-foreground/70 mb-2">Resolved</h3>
              <p className="text-3xl font-bold text-green-600">
                {complaints.filter((c) => c.status === 'resolved').length}
              </p>
            </div>
          </div>

          {/* Complaint Form */}
          <div className="bg-card border border-border rounded-lg p-8 mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-foreground">Submit a Complaint</h2>
              <button
                onClick={() => setShowForm(!showForm)}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                {showForm ? 'Cancel' : 'New Complaint'}
              </button>
            </div>

            {showForm && (
              <form onSubmit={handleSubmitComplaint} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-foreground mb-2">
                      Title
                    </label>
                    <input
                      id="title"
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Brief title of the complaint"
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-foreground mb-2">
                      Category
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option>Infrastructure</option>
                      <option>Sanitation</option>
                      <option>Maintenance</option>
                      <option>Traffic</option>
                      <option>Safety</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-foreground mb-2">
                    Location
                  </label>
                  <input
                    id="location"
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="Street address or area name"
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-foreground mb-2">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Provide detailed description of the issue..."
                    rows={4}
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="priority" className="block text-sm font-medium text-foreground mb-2">
                      Priority Level
                    </label>
                    <select
                      id="priority"
                      name="priority"
                      value={formData.priority}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  Submit Complaint
                </button>
              </form>
            )}
          </div>

          {/* Complaints List */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">Your Complaints</h2>
            <div className="space-y-4">
              {complaints.length === 0 ? (
                <div className="text-center py-12 bg-card border border-border rounded-lg">
                  <p className="text-foreground/70">No complaints submitted yet</p>
                </div>
              ) : (
                complaints.map((complaint) => (
                  <div key={complaint.id} className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-foreground">{complaint.title}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(complaint.status)}`}>
                            {complaint.status.replace('_', ' ').toUpperCase()}
                          </span>
                        </div>
                        <p className="text-foreground/70 mb-3">{complaint.description}</p>
                        <div className="flex flex-wrap gap-4 text-sm text-foreground/70">
                          <span>📍 {complaint.location}</span>
                          <span>📅 {complaint.submittedDate}</span>
                          <span className={getPriorityColor(complaint.priority)}>
                            Priority: {complaint.priority.toUpperCase()}
                          </span>
                          <span>🏷️ {complaint.category}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
