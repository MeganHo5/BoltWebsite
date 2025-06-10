import React from 'react'
import { Calendar, User, Tag } from 'lucide-react'
import type { Post } from '../types/blog'

interface PostCardProps {
  post: Post
  onPostClick: (slug: string) => void
  featured?: boolean
}

export default function PostCard({ post, onPostClick, featured = false }: PostCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const authorName = post.author?.UserName && post.author?.UserSurname 
    ? `${post.author.UserName} ${post.author.UserSurname}`
    : 'Anonymous'

  if (featured) {
    return (
      <article 
        className="group cursor-pointer bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
        onClick={() => onPostClick(post.slug)}
      >
        {post.featured_image && (
          <div className="aspect-video overflow-hidden">
            <img
              src={post.featured_image}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        
        <div className="p-6">
          {post.category && (
            <span className="inline-block px-3 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-full mb-3">
              {post.category.name}
            </span>
          )}
          
          <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
            {post.title}
          </h2>
          
          {post.excerpt && (
            <p className="text-gray-600 mb-4 line-clamp-3">
              {post.excerpt}
            </p>
          )}
          
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <User className="h-4 w-4" />
                <span>{authorName}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(post.published_at || post.created_at)}</span>
              </div>
            </div>
          </div>
        </div>
      </article>
    )
  }

  return (
    <article 
      className="group cursor-pointer bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden border border-gray-100"
      onClick={() => onPostClick(post.slug)}
    >
      <div className="flex">
        {post.featured_image && (
          <div className="w-48 h-32 flex-shrink-0 overflow-hidden">
            <img
              src={post.featured_image}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        
        <div className="flex-1 p-4">
          {post.category && (
            <span className="inline-block px-2 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded mb-2">
              {post.category.name}
            </span>
          )}
          
          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
            {post.title}
          </h3>
          
          {post.excerpt && (
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {post.excerpt}
            </p>
          )}
          
          <div className="flex items-center text-xs text-gray-500 space-x-3">
            <div className="flex items-center space-x-1">
              <User className="h-3 w-3" />
              <span>{authorName}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="h-3 w-3" />
              <span>{formatDate(post.published_at || post.created_at)}</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}