/*
  # Create Blog Tables

  1. New Tables
    - `categories`
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `slug` (text, unique)
      - `description` (text, optional)
      - `created_at` (timestamp)
    - `posts`
      - `id` (uuid, primary key)
      - `title` (text)
      - `slug` (text, unique)
      - `content` (text)
      - `excerpt` (text, optional)
      - `featured_image` (text, optional)
      - `author_id` (bigint, references UserTable)
      - `category_id` (uuid, references categories)
      - `status` (text, default 'draft')
      - `published_at` (timestamp, optional)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    - `comments`
      - `id` (uuid, primary key)
      - `post_id` (uuid, references posts)
      - `author_name` (text)
      - `author_email` (text)
      - `content` (text)
      - `status` (text, default 'pending')
      - `created_at` (timestamp)
    - `tags`
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `slug` (text, unique)
      - `created_at` (timestamp)
    - `post_tags`
      - `post_id` (uuid, references posts)
      - `tag_id` (uuid, references tags)
      - Primary key on both columns

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access to published posts
    - Add policies for authenticated users to manage their content
*/

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  created_at timestamptz DEFAULT now()
);

-- Posts table
CREATE TABLE IF NOT EXISTS posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  content text NOT NULL,
  excerpt text,
  featured_image text,
  author_id bigint REFERENCES "UserTable"(id),
  category_id uuid REFERENCES categories(id),
  status text DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  published_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Comments table
CREATE TABLE IF NOT EXISTS comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid REFERENCES posts(id) ON DELETE CASCADE,
  author_name text NOT NULL,
  author_email text NOT NULL,
  content text NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at timestamptz DEFAULT now()
);

-- Tags table
CREATE TABLE IF NOT EXISTS tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  slug text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Post tags junction table
CREATE TABLE IF NOT EXISTS post_tags (
  post_id uuid REFERENCES posts(id) ON DELETE CASCADE,
  tag_id uuid REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

-- Enable RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_tags ENABLE ROW LEVEL SECURITY;

-- Categories policies
CREATE POLICY "Categories are viewable by everyone"
  ON categories FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can manage categories"
  ON categories FOR ALL
  TO authenticated
  USING (true);

-- Posts policies
CREATE POLICY "Published posts are viewable by everyone"
  ON posts FOR SELECT
  TO public
  USING (status = 'published');

CREATE POLICY "Authors can view their own posts"
  ON posts FOR SELECT
  TO authenticated
  USING (auth.uid()::text = author_id::text);

CREATE POLICY "Authors can create posts"
  ON posts FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid()::text = author_id::text);

CREATE POLICY "Authors can update their own posts"
  ON posts FOR UPDATE
  TO authenticated
  USING (auth.uid()::text = author_id::text);

-- Comments policies
CREATE POLICY "Approved comments are viewable by everyone"
  ON comments FOR SELECT
  TO public
  USING (status = 'approved');

CREATE POLICY "Anyone can create comments"
  ON comments FOR INSERT
  TO public
  WITH CHECK (true);

-- Tags policies
CREATE POLICY "Tags are viewable by everyone"
  ON tags FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can manage tags"
  ON tags FOR ALL
  TO authenticated
  USING (true);

-- Post tags policies
CREATE POLICY "Post tags are viewable by everyone"
  ON post_tags FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can manage post tags"
  ON post_tags FOR ALL
  TO authenticated
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_posts_status ON posts(status);
CREATE INDEX IF NOT EXISTS idx_posts_published_at ON posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_author ON posts(author_id);
CREATE INDEX IF NOT EXISTS idx_posts_category ON posts(category_id);
CREATE INDEX IF NOT EXISTS idx_comments_post ON comments(post_id);
CREATE INDEX IF NOT EXISTS idx_comments_status ON comments(status);

-- Insert sample data
INSERT INTO categories (name, slug, description) VALUES
  ('Technology', 'technology', 'Latest trends and insights in technology'),
  ('Lifestyle', 'lifestyle', 'Tips and stories about modern living'),
  ('Travel', 'travel', 'Adventures and travel guides from around the world'),
  ('Food', 'food', 'Recipes, reviews, and culinary experiences')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO tags (name, slug) VALUES
  ('React', 'react'),
  ('JavaScript', 'javascript'),
  ('Web Development', 'web-development'),
  ('Design', 'design'),
  ('Tutorial', 'tutorial'),
  ('Tips', 'tips')
ON CONFLICT (slug) DO NOTHING;