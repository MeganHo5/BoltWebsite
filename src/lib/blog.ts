import { supabase } from './supabase'
import type { Post, Category, Tag, Comment } from '../types/blog'

export async function getPosts(limit = 10, offset = 0) {
  const { data, error } = await supabase
    .from('posts')
    .select(`
      *,
      category:categories(*),
      author:UserTable(UserName, UserSurname),
      tags:post_tags(tag:tags(*))
    `)
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) throw error
  return data as Post[]
}

export async function getPostBySlug(slug: string) {
  const { data, error } = await supabase
    .from('posts')
    .select(`
      *,
      category:categories(*),
      author:UserTable(UserName, UserSurname),
      tags:post_tags(tag:tags(*))
    `)
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (error) throw error
  return data as Post
}

export async function getCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name')

  if (error) throw error
  return data as Category[]
}

export async function getPostsByCategory(categorySlug: string, limit = 10) {
  const { data, error } = await supabase
    .from('posts')
    .select(`
      *,
      category:categories!inner(*),
      author:UserTable(UserName, UserSurname)
    `)
    .eq('category.slug', categorySlug)
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(limit)

  if (error) throw error
  return data as Post[]
}

export async function getCommentsByPost(postId: string) {
  const { data, error } = await supabase
    .from('comments')
    .select('*')
    .eq('post_id', postId)
    .eq('status', 'approved')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as Comment[]
}

export async function createComment(comment: Omit<Comment, 'id' | 'created_at' | 'status'>) {
  const { data, error } = await supabase
    .from('comments')
    .insert([comment])
    .select()
    .single()

  if (error) throw error
  return data as Comment
}

export async function getFeaturedPosts(limit = 3) {
  const { data, error } = await supabase
    .from('posts')
    .select(`
      *,
      category:categories(*),
      author:UserTable(UserName, UserSurname)
    `)
    .eq('status', 'published')
    .not('featured_image', 'is', null)
    .order('published_at', { ascending: false })
    .limit(limit)

  if (error) throw error
  return data as Post[]
}