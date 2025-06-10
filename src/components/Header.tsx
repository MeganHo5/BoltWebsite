import React, { useState, useEffect } from 'react'
import { Menu, X, Search, BookOpen } from 'lucide-react'
import { getCategories } from '../lib/blog'
import type { Category } from '../types/blog'

interface HeaderProps {
  onNavigate: (page: string, slug?: string) => void
  currentPage: string
}

export default function Header({ onNavigate, currentPage }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = async () => {
    try {
      const data = await getCategories()
      setCategories(data)
    } catch (error) {
      console.error('Error loading categories:', error)
    }
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer group"
            onClick={() => onNavigate('home')}
          >
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg group-hover:shadow-lg transition-shadow">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              BlogSpace
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => onNavigate('home')}
              className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                currentPage === 'home' ? 'text-blue-600' : 'text-gray-700'
              }`}
            >
              Home
            </button>
            
            {/* Categories Dropdown */}
            <div className="relative group">
              <button className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors flex items-center">
                Categories
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="py-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => onNavigate('category', category.slug)}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigate('about')}
              className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                currentPage === 'about' ? 'text-blue-600' : 'text-gray-700'
              }`}
            >
              About
            </button>
          </nav>

          {/* Search and Mobile Menu */}
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <Search className="h-5 w-5" />
            </button>
            
            <button
              className="md:hidden p-2 text-gray-400 hover:text-gray-600 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-100 py-4">
            <div className="space-y-4">
              <button
                onClick={() => {
                  onNavigate('home')
                  setIsMenuOpen(false)
                }}
                className="block text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
              >
                Home
              </button>
              
              <div className="space-y-2">
                <div className="text-sm font-medium text-gray-900">Categories</div>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      onNavigate('category', category.slug)
                      setIsMenuOpen(false)
                    }}
                    className="block text-sm text-gray-600 hover:text-blue-600 transition-colors ml-4"
                  >
                    {category.name}
                  </button>
                ))}
              </div>
              
              <button
                onClick={() => {
                  onNavigate('about')
                  setIsMenuOpen(false)
                }}
                className="block text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
              >
                About
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}