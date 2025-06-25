"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Calendar, Mail, Phone, MapPin, DollarSign, User, Tag, Check, X } from "lucide-react"
import type { ArtistSubmission } from "@/types/submission"

interface SubmissionDetailsModalProps {
  submission: ArtistSubmission | null
  isOpen: boolean
  onClose: () => void
  onApprove: (submission: ArtistSubmission) => void
  onReject: (submission: ArtistSubmission) => void
}

export default function SubmissionDetailsModal({
  submission,
  isOpen,
  onClose,
  onApprove,
  onReject,
}: SubmissionDetailsModalProps) {
  if (!submission) return null

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
      approved: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      rejected: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    }
    return variants[status as keyof typeof variants] || variants.pending
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Artist Submission Details</span>
            <Badge className={getStatusBadge(submission.status)}>{submission.status}</Badge>
          </DialogTitle>
          <DialogDescription>Review the artist submission information below.</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <User className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Name</p>
                <p className="font-semibold">{submission.name}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Tag className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Category</p>
                <p className="font-semibold">{submission.category}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">City</p>
                <p className="font-semibold">{submission.city}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <DollarSign className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Fee Range</p>
                <p className="font-semibold">{submission.fee}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Email</p>
                  <p className="font-medium">{submission.email}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Phone</p>
                  <p className="font-medium">{submission.phone}</p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Submission Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Submission Information</h3>
            <div className="flex items-center space-x-3">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Submitted At</p>
                <p className="font-medium">{formatDate(submission.submittedAt)}</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          {submission.status === "pending" && (
            <>
              <Separator />
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={() => {
                    onApprove(submission)
                    onClose()
                  }}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  <Check className="mr-2 h-4 w-4" />
                  Approve Submission
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    onReject(submission)
                    onClose()
                  }}
                  className="flex-1"
                >
                  <X className="mr-2 h-4 w-4" />
                  Reject Submission
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
