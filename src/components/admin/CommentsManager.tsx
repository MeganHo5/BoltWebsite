import React, { useState, useEffect } from 'react'
import { MessageSquare, Check, X, Trash2 } from 'lucide-react'
import { getAllComments, updateCommentStatus, deleteComment } from '../../lib/admin'
import type { Comment } from '../../types/blog'

interface CommentsManagerProps {
  onNavigate: (section: string) => void
}

export default function CommentsManager({ onNavigate }: CommentsManagerProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all')

  useEffect(() => {
    loadComments()
  }, [])

  const loadComments = async () => {
    try {
      const data = await getAllComments()
      setComments(data)
    } catch (error) {
      console.error('Error loading comments:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusUpdate = async (commentId: string, status: 'approved' | 'rejected') => {
    try {
      await updateCommentStatus(commentId, status)
      setComments(comments.map(comment => 
        comment.id === commentId 
          ? { ...comment, status }
          : comment
      ))
    } catch (error) {
      console.error('Error updating comment status:', error)
      alert('Error updating comment status. Please try again.')
    }
  }

  const handleDelete = async (commentId: string) => {
    if (!confirm('Are you sure you want to delete this comment?')) return

    try {
      await deleteComment(commentId)
      setComments(comments.filter(comment => comment.id !== commentId))
    } catch (error) {
      console.error('Error deleting comment:', error)
      alert('Error deleting comment. Please try again.')
    }
  }

  const filteredComments = comments.filter(comment => 
    statusFilter === 'all' || comment.status === statusFilter
  )

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-yellow-100 text-yellow-800'
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Comments</h1>
          <p className="text-gray-600 mt-1">Moderate and manage user comments</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Comments</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {filteredComments.length > 0 ? (
          filteredComments.map((comment) => (
            <div key={comment.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-semibold text-gray-900">{comment.author_name}</h3>
                    <span className="text-gray-500 text-sm">{comment.author_email}</span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(comment.status)}`}>
                      {comment.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mb-3">
                    {formatDate(comment.created_at)}
                  </p>
                  <p className="text-gray-700 leading-relaxed">{comment.content}</p>
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  {comment.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleStatusUpdate(comment.id, 'approved')}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Approve comment"
                      >
                        <Check className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(comment.id, 'rejected')}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Reject comment"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </>
                  )}
                  {comment.status === 'approved' && (
                    <button
                      onClick={() => handleStatusUpdate(comment.id, 'rejected')}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Reject comment"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                  {comment.status === 'rejected' && (
                    <button
                      onClick={() => handleStatusUpdate(comment.id, 'approved')}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      title="Approve comment"
                    >
                      <Check className="h-4 w-4" />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(comment.id)}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                    title="Delete comment"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
            <MessageSquare className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {statusFilter === 'all' ? 'No comments yet' : `No ${statusFilter} comments`}
            </h3>
            <p className="text-gray-500">
              {statusFilter === 'all' 
                ? 'Comments will appear here when users start engaging with your posts'
                : `No comments with ${statusFilter} status found`
              }
            </p>
          </div>
        )}
      </div>
    </div>
  )
}