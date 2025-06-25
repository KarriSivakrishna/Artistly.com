"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TableCell, TableRow as UITableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Eye, Check, X, Trash2 } from "lucide-react"
import type { ArtistSubmission } from "@/types/submission"

interface TableRowProps {
  submission: ArtistSubmission
  onApprove: (submission: ArtistSubmission) => void
  onReject: (submission: ArtistSubmission) => void
  onDelete: (submission: ArtistSubmission) => void
  onView: (submission: ArtistSubmission) => void
  isLoading?: boolean
}

export default function TableRow({
  submission,
  onApprove,
  onReject,
  onDelete,
  onView,
  isLoading = false,
}: TableRowProps) {
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
      month: "short",
      day: "numeric",
    })
  }

  return (
    <UITableRow className="hover:bg-muted/50 transition-colors">
      {/* Name - Always visible */}
      <TableCell className="font-medium">
        <div className="flex flex-col">
          <span className="font-semibold">{submission.name}</span>
          <span className="text-sm text-muted-foreground md:hidden">{submission.category}</span>
        </div>
      </TableCell>

      {/* Category - Hidden on mobile */}
      <TableCell className="hidden md:table-cell">{submission.category}</TableCell>

      {/* City - Hidden on small screens */}
      <TableCell className="hidden sm:table-cell">{submission.city}</TableCell>

      {/* Fee */}
      <TableCell>
        <div className="flex flex-col">
          <span className="font-medium">{submission.fee}</span>
          <span className="text-sm text-muted-foreground sm:hidden">{submission.city}</span>
        </div>
      </TableCell>

      {/* Status - Hidden on mobile, shown in actions dropdown */}
      <TableCell className="hidden lg:table-cell">
        <Badge className={getStatusBadge(submission.status)}>{submission.status}</Badge>
      </TableCell>

      {/* Submitted Date - Hidden on mobile */}
      <TableCell className="hidden xl:table-cell text-sm text-muted-foreground">
        {formatDate(submission.submittedAt)}
      </TableCell>

      {/* Actions */}
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0" disabled={isLoading}>
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => onView(submission)} className="cursor-pointer">
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </DropdownMenuItem>

            {submission.status === "pending" && (
              <>
                <DropdownMenuItem onClick={() => onApprove(submission)} className="cursor-pointer text-green-600">
                  <Check className="mr-2 h-4 w-4" />
                  Approve
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onReject(submission)} className="cursor-pointer text-red-600">
                  <X className="mr-2 h-4 w-4" />
                  Reject
                </DropdownMenuItem>
              </>
            )}

            <DropdownMenuItem onClick={() => onDelete(submission)} className="cursor-pointer text-red-600">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>

            {/* Mobile-only status display */}
            <div className="lg:hidden">
              <div className="px-2 py-1.5 text-sm">
                <span className="text-muted-foreground">Status: </span>
                <Badge className={getStatusBadge(submission.status)}>{submission.status}</Badge>
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </UITableRow>
  )
}
