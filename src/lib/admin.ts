import { supabase } from './supabase'
import type { Post, Category, Comment } from '../types/blog'

// Posts
export async function getAllPosts() {
  const { data, error } = await supabase
    .from('posts')
    .select(`
      *,
      category:categories(*),
      author:UserTable(UserName, UserSurname)
    `)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as Post[]
}

export async function getPostById(id: string) {
  const { data, error } = await supabase
    .from('posts')
    .select(`
      *,
      category:categories(*),
      author:UserTable(UserName, UserSurname)
    `)
    .eq('id', id)
    .single()

  if (error) throw error
  return data as Post
}

export async function createPost(post: Omit<Post, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('posts')
    .insert([{
      ...post,
      published_at: post.status === 'published' ? new Date().toISOString() : null
    }])
    .select()
    .single()

  if (error) throw error
  return data as Post
}

export async function updatePost(id: string, post: Partial<Post>) {
  const updateData = {
    ...post,
    updated_at: new Date().toISOString()
  }

  // Set published_at when publishing for the first time
  if (post.status === 'published') {
    const { data: currentPost } = await supabase
      .from('posts')
      .select('published_at')
      .eq('id', id)
      .single()

    if (!currentPost?.published_at) {
      updateData.published_at = new Date().toISOString()
    }
  }

  const { data, error } = await supabase
    .from('posts')
    .update(updateData)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data as Post
}

export async function deletePost(id: string) {
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', id)

  if (error) throw error
}

// Categories
export async function createCategory(category: Omit<Category, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('categories')
    .insert([category])
    .select()
    .single()

  if (error) throw error
  return data as Category
}

export async function updateCategory(id: string, category: Partial<Category>) {
  const { data, error } = await supabase
    .from('categories')
    .update(category)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data as Category
}

export async function deleteCategory(id: string) {
  const { error } = await supabase
    .from('categories')
    .delete()
    .eq('id', id)

  if (error) throw error
}

// Comments
export async function getAllComments() {
  const { data, error } = await supabase
    .from('comments')
    .select(`
      *,
      post:posts(title, slug)
    `)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as (Comment & { post?: { title: string; slug: string } })[]
}

export async function updateCommentStatus(id: string, status: 'approved' | 'rejected') {
  const { data, error } = await supabase
    .from('comments')
    .update({ status })
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data as Comment
}

export async function deleteComment(id: string) {
  const { error } = await supabase
    .from('comments')
    .delete()
    .eq('id', id)

  if (error) throw error
}

// Dashboard Stats
export async function getAdminStats() {
  const [postsResult, commentsResult] = await Promise.all([
    supabase.from('posts').select('status'),
    supabase.from('comments').select('id')
  ])

  const posts = postsResult.data || []
  const comments = commentsResult.data || []

  return {
    totalPosts: posts.length,
    publishedPosts: posts.filter(p => p.status === 'published').length,
    draftPosts: posts.filter(p => p.status === 'draft').length,
    totalComments: comments.length
  }
}