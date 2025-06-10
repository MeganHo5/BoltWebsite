export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  created_at: string
}

export interface Tag {
  id: string
  name: string
  slug: string
  created_at: string
}

export interface Post {
  id: string
  title: string
  slug: string
  content: string
  excerpt?: string
  featured_image?: string
  author_id: number
  category_id?: string
  status: 'draft' | 'published' | 'archived'
  published_at?: string
  created_at: string
  updated_at: string
  category?: Category
  author?: {
    UserName?: string
    UserSurname?: string
  }
  tags?: Tag[]
}

export interface Comment {
  id: string
  post_id: string
  author_name: string
  author_email: string
  content: string
  status: 'pending' | 'approved' | 'rejected'
  created_at: string
}