import React, { useState, useEffect } from 'react'
import { 
  BarChart3, 
  FileText, 
  Users, 
  MessageSquare, 
  Tags, 
  Folder,
  Plus,
  TrendingUp,
  Calendar
} from 'lucide-react'
import { getPosts, getCategories } from '../../lib/blog'
import { getAdminStats } from '../../lib/admin'
import type { Post, Category } from '../../types/blog'

interface AdminDashboardProps {
  onNavigate: (section: string) => void
}

interface Stats {
  totalPosts: number
  publishedPosts: number
  draftPosts: number
  totalCategories: number
  totalComments: number
  recentPosts: Post[]
}

export default function AdminDashboard({ onNavigate }: AdminDashboardProps) {
  const [stats, setStats] = useState<Stats>({
    totalPosts: 0,
    publishedPosts: 0,
    draftPosts: 0,
    totalCategories: 0,
    totalComments: 0,
    recentPosts: []
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      const [posts, categories, adminStats] = await Promise.all([
        getPosts(5),
        getCategories(),
        getAdminStats()
      ])

      setStats({
        ...adminStats,
        totalCategories: categories.length,
        recentPosts: posts
      })
    } catch (error) {
      console.error('Error loading dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your blog.</p>
        </div>
        <button
          onClick={() => onNavigate('posts-new')}
          className="mt-4 sm:mt-0 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>New Post</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Posts</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalPosts}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-600 font-medium">{stats.publishedPosts} published</span>
            <span className="text-gray-500 ml-2">• {stats.draftPosts} drafts</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Categories</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalCategories}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <Folder className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4">
            <button
              onClick={() => onNavigate('categories')}
              className="text-sm text-purple-600 hover:text-purple-700 font-medium"
            >
              Manage categories →
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Comments</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalComments}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <MessageSquare className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4">
            <button
              onClick={() => onNavigate('comments')}
              className="text-sm text-green-600 hover:text-green-700 font-medium"
            >
              Review comments →
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">This Month</p>
              <p className="text-3xl font-bold text-gray-900">
                {stats.recentPosts.filter(post => {
                  const postDate = new Date(post.created_at)
                  const now = new Date()
                  return postDate.getMonth() === now.getMonth() && postDate.getFullYear() === now.getFullYear()
                }).length}
              </p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <TrendingUp className="h-6 w-6 text-orange-600" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-gray-500">New posts published</span>
          </div>
        </div>
      </div>

      {/* Recent Posts */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Recent Posts</h2>
            <button
              onClick={() => onNavigate('posts')}
              className="text-blue-600 hover:text-blue-700 font-medium text-sm"
            >
              View all →
            </button>
          </div>
        </div>
        <div className="p-6">
          {stats.recentPosts.length > 0 ? (
            <div className="space-y-4">
              {stats.recentPosts.map((post) => (
                <div key={post.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 mb-1">{post.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(post.created_at)}</span>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        post.status === 'published' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {post.status}
                      </span>
                      {post.category && (
                        <span className="text-blue-600">{post.category.name}</span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => onNavigate(`posts-edit-${post.id}`)}
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                  >
                    Edit
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No posts yet. Create your first post!</p>
              <button
                onClick={() => onNavigate('posts-new')}
                className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Create Post
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button
          onClick={() => onNavigate('posts-new')}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-left hover:shadow-md transition-shadow"
        >
          <div className="bg-blue-100 p-3 rounded-lg w-fit mb-4">
            <Plus className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Create New Post</h3>
          <p className="text-gray-600 text-sm">Write and publish a new blog post</p>
        </button>

        <button
          onClick={() => onNavigate('categories')}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-left hover:shadow-md transition-shadow"
        >
          <div className="bg-purple-100 p-3 rounded-lg w-fit mb-4">
            <Folder className="h-6 w-6 text-purple-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Manage Categories</h3>
          <p className="text-gray-600 text-sm">Organize your content with categories</p>
        </button>

        <button
          onClick={() => onNavigate('comments')}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-left hover:shadow-md transition-shadow"
        >
          <div className="bg-green-100 p-3 rounded-lg w-fit mb-4">
            <MessageSquare className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Review Comments</h3>
          <p className="text-gray-600 text-sm">Moderate and respond to comments</p>
        </button>
      </div>
    </div>
  )
}