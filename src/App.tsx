import React, { useState } from 'react'
import Header from './components/Header'
import HomePage from './components/HomePage'
import PostDetail from './components/PostDetail'
import CategoryPage from './components/CategoryPage'
import AboutPage from './components/AboutPage'

type Page = 'home' | 'post' | 'category' | 'about'

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home')
  const [currentSlug, setCurrentSlug] = useState<string>('')

  const handleNavigation = (page: string, slug?: string) => {
    setCurrentPage(page as Page)
    if (slug) {
      setCurrentSlug(slug)
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
    </div>
  )
}

export default App