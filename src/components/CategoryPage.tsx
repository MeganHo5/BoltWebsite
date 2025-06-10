import React, { useState, useEffect } from 'react'
import { ArrowLeft, Folder } from 'lucide-react'
import { getPostsByCategory } from '../lib/blog'
import PostCard from './PostCard'
import type { Post } from '../types/blog'

interface CategoryPageProps {
  categorySlug: string
  onPostClick: (slug: string) => void
  onBack: () => void
}

export default function CategoryPage({ categorySlug, onPostClick, onBack }: CategoryPageProps) {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [categoryName, setCategoryName] = useState('')

  useEffect(() => {
    loadPosts()
  }, [categorySlug])

  const loadPosts = async () => {
    try {
      const data = await getPostsByCategory(categorySlug)
      setPosts(data)
      if (data.length > 0 && data[0].category) {
        setCategoryName(data[0].category.name)
      }
    } catch (error) {
      console.error('Error loading category posts:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 mb-8 font-medium transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to home</span>
        </button>

        {/* Category Header */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Folder className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {categoryName || categorySlug}
              </h1>
              <p className="text-gray-600 mt-1">
                {posts.length} {posts.length === 1 ? 'post' : 'posts'} in this category
              </p>
            </div>
          </div>
        </div>

        {/* Posts */}
        {posts.length > 0 ? (
          <div className="space-y-6">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onPostClick={onPostClick}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <Folder className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No posts found</h2>
            <p className="text-gray-500">
              There are no published posts in this category yet.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}