export interface BlogCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
  created_at: Date;
  updated_at: Date;
}

export interface BlogTag {
  id: number;
  name: string;
  slug: string;
  created_at: Date;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  category_id?: number;
  author_id?: number;
  status: 'draft' | 'published';
  featured_image?: string;
  created_at: Date;
  updated_at: Date;
  published_at?: Date;
}

export interface CreateBlogPostInput {
  title: string;
  content: string;
  excerpt?: string;
  category_id?: number;
  author_id?: number;
  status?: 'draft' | 'published';
  featured_image?: string;
  tags?: number[];
}

export interface UpdateBlogPostInput extends Partial<CreateBlogPostInput> {
  id: number;
}
