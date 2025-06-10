import React, { useState } from 'react'
import AdminLogin from './admin/AdminLogin'
import AdminLayout from './admin/AdminLayout'
import AdminDashboard from './admin/AdminDashboard'
import PostsList from './admin/PostsList'
import PostEditor from './admin/PostEditor'
import CategoriesManager from './admin/CategoriesManager'
import CommentsManager from './admin/CommentsManager'

export default function AdminApp() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentSection, setCurrentSection] = useState('dashboard')
  const [loginLoading, setLoginLoading] = useState(false)
  const [loginError, setLoginError] = useState<string | null>(null)

  const handleLogin = async (credentials: { username: string; password: string }) => {
    setLoginLoading(true)
    setLoginError(null)

    // Simple demo authentication - in production, this should be secure
    if (credentials.username === 'admin' && credentials.password === 'admin123') {
      setTimeout(() => {
        setIsAuthenticated(true)
        setLoginLoading(false)
      }, 1000)
    } else {
      setTimeout(() => {
        setLoginError('Invalid username or password')
        setLoginLoading(false)
      }, 1000)
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setCurrentSection('dashboard')
  }

  const handleNavigate = (section: string) => {
    setCurrentSection(section)
  }

  const renderContent = () => {
    if (currentSection.startsWith('posts-edit-')) {
      const postId = currentSection.replace('posts-edit-', '')
      return (
        <PostEditor
          postId={postId}
          onBack={() => setCurrentSection('posts')}
          onSave={() => setCurrentSection('posts')}
        />
      )
    }

    switch (currentSection) {
      case 'dashboard':
        return <AdminDashboard onNavigate={handleNavigate} />
      case 'posts':
        return <PostsList onNavigate={handleNavigate} />
      case 'posts-new':
        return (
          <PostEditor
            onBack={() => setCurrentSection('posts')}
            onSave={() => setCurrentSection('posts')}
          />
        )
      case 'categories':
        return <CategoriesManager onNavigate={handleNavigate} />
      case 'comments':
        return <CommentsManager onNavigate={handleNavigate} />
      default:
        return <AdminDashboard onNavigate={handleNavigate} />
    }
  }

  if (!isAuthenticated) {
    return (
      <AdminLogin
        onLogin={handleLogin}
        loading={loginLoading}
        error={loginError}
      />
    )
  }

  return (
    <AdminLayout
      currentSection={currentSection}
      onNavigate={handleNavigate}
      onLogout={handleLogout}
    >
      {renderContent()}
    </AdminLayout>
  )
}