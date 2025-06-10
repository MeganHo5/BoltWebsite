import React, { useState } from 'react'
import Header from './components/Header'
import HomePage from './components/HomePage'
import PostDetail from './components/PostDetail'
import CategoryPage from './components/CategoryPage'
import AboutPage from './components/AboutPage'
import AdminApp from './components/AdminApp'

type Page = 'home' | 'post' | 'category' | 'about' | 'admin'

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home')
  const [currentSlug, setCurrentSlug] = useState<string>('')

  // Check if we're on admin route
  React.useEffect(() => {
    const path = window.location.pathname
    if (path === '/admin' || path.startsWith('/admin/')) {
      setCurrentPage('admin')
    }
  }, [])

  const handleNavigation = (page: string, slug?: string) => {
    setCurrentPage(page as Page)
    if (slug) {
      setCurrentSlug(slug)
    }
    
    // Update URL without page reload
    if (page === 'admin') {
      window.history.pushState({}, '', '/admin')
    } else {
      window.history.pushState({}, '', '/')
    }
  }

  const handlePostClick = (slug: string) => {
    setCurrentPage('post')
    setCurrentSlug(slug)
  }

  const handleBack = () => {
    setCurrentPage('home')
    setCurrentSlug('')
  }

  // Admin interface
  if (currentPage === 'admin') {
    return <AdminApp />
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onPostClick={handlePostClick} />
      case 'post':
        return <PostDetail slug={currentSlug} onBack={handleBack} />
      case 'category':
        return (
          <CategoryPage
            categorySlug={currentSlug}
            onPostClick={handlePostClick}
            onBack={handleBack}
          />
        )
      case 'about':
        return <AboutPage onBack={handleBack} />
      default:
        return <HomePage onPostClick={handlePostClick} />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onNavigate={handleNavigation} currentPage={currentPage} />
      {renderPage()}
      
      {/* Admin Access Button - Hidden in production */}
      <button
        onClick={() => handleNavigation('admin')}
        className="fixed bottom-4 right-4 bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 transition-colors z-40"
        title="Admin Access"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
        </svg>
      </button>
    </div>
  )
}

export default App