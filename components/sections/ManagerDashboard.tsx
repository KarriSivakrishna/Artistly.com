"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import { Search, RefreshCw, Users, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import TableRowComponent from "@/components/TableRow"
import SubmissionDetailsModal from "@/components/SubmissionDetailsModal"
import type { ArtistSubmission } from "@/types/submission"
import submissionsData from "@/data/submissions.json"

interface ManagerDashboardProps {
  initialSubmissions?: ArtistSubmission[]
}

export default function ManagerDashboard({ initialSubmissions }: ManagerDashboardProps) {
  const [submissions, setSubmissions] = useState<ArtistSubmission[]>(
    (initialSubmissions || submissionsData) as ArtistSubmission[],
  )
  const [filteredSubmissions, setFilteredSubmissions] = useState<ArtistSubmission[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [selectedSubmission, setSelectedSubmission] = useState<ArtistSubmission | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [actionLoading, setActionLoading] = useState<number | null>(null)
  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null)

  // Initialize filtered submissions
  useEffect(() => {
    setFilteredSubmissions(submissions)
  }, [submissions])

  // Filter submissions based on search term
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredSubmissions(submissions)
    } else {
      const filtered = submissions.filter(
        (submission) =>
          submission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          submission.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          submission.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
          submission.email.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setFilteredSubmissions(filtered)
    }
  }, [submissions, searchTerm])

  const loadSubmissions = async () => {
    try {
      setIsLoading(true)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800))
      const data = submissionsData as ArtistSubmission[]
      setSubmissions(data)
      setFilteredSubmissions(data)
    } catch (error) {
      console.error("Failed to load submissions:", error)
      showAlert("error", "Failed to load submissions. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const refreshSubmissions = async () => {
    try {
      setIsRefreshing(true)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800))
      const data = submissionsData as ArtistSubmission[]
      setSubmissions(data)
      setFilteredSubmissions(data)
      showAlert("success", "Submissions refreshed successfully!")
    } catch (error) {
      console.error("Failed to refresh submissions:", error)
      showAlert("error", "Failed to refresh submissions. Please try again.")
    } finally {
      setIsRefreshing(false)
    }
  }

  const handleApprove = async (submission: ArtistSubmission) => {
    try {
      setActionLoading(submission.id)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      console.log(`=== SUBMISSION APPROVED ===`)
      console.log(`Submission ID: ${submission.id}`)
      console.log(`Artist Name: ${submission.name}`)
      console.log(`Timestamp: ${new Date().toISOString()}`)
      console.log(`=== END APPROVAL ===`)

      setSubmissions((prev) => prev.map((s) => (s.id === submission.id ? { ...s, status: "approved" as const } : s)))
      showAlert("success", `${submission.name}'s submission has been approved!`)
    } catch (error) {
      console.error("Failed to approve submission:", error)
      showAlert("error", "Failed to approve submission. Please try again.")
    } finally {
      setActionLoading(null)
    }
  }

  const handleReject = async (submission: ArtistSubmission) => {
    try {
      setActionLoading(submission.id)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      console.log(`=== SUBMISSION REJECTED ===`)
      console.log(`Submission ID: ${submission.id}`)
      console.log(`Artist Name: ${submission.name}`)
      console.log(`Timestamp: ${new Date().toISOString()}`)
      console.log(`=== END REJECTION ===`)

      setSubmissions((prev) => prev.map((s) => (s.id === submission.id ? { ...s, status: "rejected" as const } : s)))
      showAlert("success", `${submission.name}'s submission has been rejected.`)
    } catch (error) {
      console.error("Failed to reject submission:", error)
      showAlert("error", "Failed to reject submission. Please try again.")
    } finally {
      setActionLoading(null)
    }
  }

  const handleDelete = async (submission: ArtistSubmission) => {
    if (!confirm(`Are you sure you want to delete ${submission.name}'s submission? This action cannot be undone.`)) {
      return
    }

    try {
      setActionLoading(submission.id)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      console.log(`=== SUBMISSION DELETED ===`)
      console.log(`Submission ID: ${submission.id}`)
      console.log(`Artist Name: ${submission.name}`)
      console.log(`Timestamp: ${new Date().toISOString()}`)
      console.log(`=== END DELETION ===`)

      setSubmissions((prev) => prev.filter((s) => s.id !== submission.id))
      showAlert("success", `${submission.name}'s submission has been deleted.`)
    } catch (error) {
      console.error("Failed to delete submission:", error)
      showAlert("error", "Failed to delete submission. Please try again.")
    } finally {
      setActionLoading(null)
    }
  }

  const handleView = (submission: ArtistSubmission) => {
    setSelectedSubmission(submission)
    setIsModalOpen(true)
  }

  const showAlert = (type: "success" | "error", message: string) => {
    setAlert({ type, message })
    setTimeout(() => setAlert(null), 5000)
  }

  // Calculate statistics
  const stats = {
    total: submissions.length,
    pending: submissions.filter((s) => s.status === "pending").length,
    approved: submissions.filter((s) => s.status === "approved").length,
    rejected: submissions.filter((s) => s.status === "rejected").length,
  }

  const renderTableSkeleton = () => (
    <div className="space-y-3">
      {[...Array(5)].map((_, index) => (
        <div key={index} className="flex space-x-4">
          <Skeleton className="h-12 w-full" />
        </div>
      ))}
    </div>
  )

  const renderEmptyState = () => (
    <div className="text-center py-12">
      <div className="max-w-md mx-auto">
        <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-foreground mb-2">No submissions yet</h3>
        <p className="text-muted-foreground mb-6">
          {searchTerm
            ? "No submissions match your search criteria. Try adjusting your search terms."
            : "Artist submissions will appear here once they start applying to join your platform."}
        </p>
        {searchTerm && (
          <Button variant="outline" onClick={() => setSearchTerm("")}>
            Clear Search
          </Button>
        )}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Manager Dashboard</h1>
            <p className="text-muted-foreground mt-1">Manage artist submissions and applications</p>
          </div>
          <Button onClick={refreshSubmissions} disabled={isRefreshing} variant="outline">
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>

        {/* Alert */}
        {alert && (
          <Alert className={`mb-6 ${alert.type === "error" ? "border-red-500" : "border-green-500"}`}>
            {alert.type === "error" ? <AlertCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
            <AlertDescription>{alert.message}</AlertDescription>
          </Alert>
        )}

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total</p>
                  <p className="text-2xl font-bold text-foreground">{stats.total}</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold text-foreground">{stats.pending}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Approved</p>
                  <p className="text-2xl font-bold text-foreground">{stats.approved}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Rejected</p>
                  <p className="text-2xl font-bold text-foreground">{stats.rejected}</p>
                </div>
                <XCircle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Submissions Table */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <CardTitle>Artist Submissions ({filteredSubmissions.length})</CardTitle>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search submissions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              renderTableSkeleton()
            ) : filteredSubmissions.length === 0 ? (
              renderEmptyState()
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead className="hidden md:table-cell">Category</TableHead>
                      <TableHead className="hidden sm:table-cell">City</TableHead>
                      <TableHead>Fee</TableHead>
                      <TableHead className="hidden lg:table-cell">Status</TableHead>
                      <TableHead className="hidden xl:table-cell">Submitted</TableHead>
                      <TableHead className="w-[70px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSubmissions.map((submission) => (
                      <TableRowComponent
                        key={submission.id}
                        submission={submission}
                        onApprove={handleApprove}
                        onReject={handleReject}
                        onDelete={handleDelete}
                        onView={handleView}
                        isLoading={actionLoading === submission.id}
                      />
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Submission Details Modal */}
        <SubmissionDetailsModal
          submission={selectedSubmission}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      </div>
    </div>
  )
}
