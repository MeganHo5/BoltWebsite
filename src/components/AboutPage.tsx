import React from 'react'
import { ArrowLeft, Users, Target, Heart } from 'lucide-react'

interface AboutPageProps {
  onBack: () => void
}

export default function AboutPage({ onBack }: AboutPageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 mb-8 font-medium transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to home</span>
        </button>

        {/* About Content */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 md:p-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About BlogSpace</h1>
            <p className="text-xl text-blue-100 max-w-2xl">
              A modern platform for sharing stories, insights, and ideas with the world.
            </p>
          </div>

          <div className="p-8 md:p-12">
            {/* Mission */}
            <div className="mb-12">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Target className="h-6 w-6 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                BlogSpace was created to provide a beautiful, modern platform where writers and readers 
                can connect through compelling content. We believe in the power of storytelling to inspire, 
                educate, and bring people together from all walks of life.
              </p>
            </div>

            {/* Values */}
            <div className="mb-12">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Heart className="h-6 w-6 text-purple-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Our Values</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Quality Content</h3>
                  <p className="text-gray-600">
                    We prioritize well-crafted, thoughtful content that provides real value to our readers.
                  </p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Community First</h3>
                  <p className="text-gray-600">
                    Building a supportive community where writers and readers can engage meaningfully.
                  </p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Innovation</h3>
                  <p className="text-gray-600">
                    Continuously improving our platform with modern technology and user-centered design.
                  </p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Accessibility</h3>
                  <p className="text-gray-600">
                    Making great content accessible to everyone, regardless of their background or abilities.
                  </p>
                </div>
              </div>
            </div>

            {/* Team */}
            <div className="mb-12">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-green-100 p-3 rounded-lg">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Our Team</h2>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed mb-8">
                BlogSpace is built and maintained by a passionate team of developers, designers, and content 
                creators who believe in the power of great storytelling. We're committed to creating the best 
                possible experience for both writers and readers.
              </p>
              
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Join Our Community</h3>
                <p className="text-gray-700 mb-6">
                  Whether you're a writer looking to share your stories or a reader seeking great content, 
                  we'd love to have you as part of the BlogSpace community.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                    Start Writing
                  </button>
                  <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                    Contact Us
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}