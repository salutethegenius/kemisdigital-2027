import { Router } from 'express';
import { db } from '../db';
import type { CreateBlogPostInput, UpdateBlogPostInput } from '../types/blog';
import slugify from 'slugify';

const router = Router();

// Get all blog posts
router.get('/posts', async (req, res) => {
  try {
    const { status, category, tag } = req.query;
    let query = `
      SELECT 
        p.*,
        c.name as category_name,
        COALESCE(array_agg(t.name) FILTER (WHERE t.name IS NOT NULL), ARRAY[]::text[]) as tags
      FROM blog_posts p
      LEFT JOIN blog_categories c ON p.category_id = c.id
      LEFT JOIN blog_posts_tags pt ON p.id = pt.post_id
      LEFT JOIN blog_tags t ON pt.tag_id = t.id
    `;

    const conditions = [];
    if (status) conditions.push(`p.status = '${status}'`);
    if (category) conditions.push(`c.slug = '${category}'`);
    if (tag) conditions.push(`t.slug = '${tag}'`);

    if (conditions.length > 0) {
      query += ` WHERE ${conditions.join(' AND ')}`;
    }

    query += ` GROUP BY p.id, c.name ORDER BY p.created_at DESC`;

    const posts = await db.query(query);
    res.json(posts.rows);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    res.status(500).json({ error: 'Failed to fetch blog posts' });
  }
});

// Get a single blog post by slug
router.get('/posts/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const post = await db.query(`
      SELECT 
        p.*,
        c.name as category_name,
        COALESCE(array_agg(t.name) FILTER (WHERE t.name IS NOT NULL), ARRAY[]::text[]) as tags
      FROM blog_posts p
      LEFT JOIN blog_categories c ON p.category_id = c.id
      LEFT JOIN blog_posts_tags pt ON p.id = pt.post_id
      LEFT JOIN blog_tags t ON pt.tag_id = t.id
      WHERE p.slug = $1
      GROUP BY p.id, c.name
    `, [slug]);

    if (!post.rows[0]) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json(post.rows[0]);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    res.status(500).json({ error: 'Failed to fetch blog post' });
  }
});

// Create a new blog post
router.post('/posts', async (req, res) => {
  try {
    const post: CreateBlogPostInput = req.body;
    const slug = slugify(post.title, { lower: true });

    const result = await db.query(`
      INSERT INTO blog_posts (
        title, slug, content, excerpt, category_id, 
        author_id, status, featured_image, 
        published_at
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *
    `, [
      post.title,
      slug,
      post.content,
      post.excerpt,
      post.category_id,
      post.author_id,
      post.status || 'draft',
      post.featured_image,
      post.status === 'published' ? new Date() : null
    ]);

    // Add tags if provided
    if (post.tags?.length) {
      await Promise.all(post.tags.map(tagId =>
        db.query(
          'INSERT INTO blog_posts_tags (post_id, tag_id) VALUES ($1, $2)',
          [result.rows[0].id, tagId]
        )
      ));
    }

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating blog post:', error);
    res.status(500).json({ error: 'Failed to create blog post' });
  }
});

// Update a blog post
router.put('/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const post: UpdateBlogPostInput = req.body;
    const updates: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    if (post.title) {
      updates.push(`title = $${paramCount}`);
      values.push(post.title);
      updates.push(`slug = $${paramCount + 1}`);
      values.push(slugify(post.title, { lower: true }));
      paramCount += 2;
    }

    ['content', 'excerpt', 'category_id', 'author_id', 'status', 'featured_image'].forEach(field => {
      if (post[field as keyof UpdateBlogPostInput] !== undefined) {
        updates.push(`${field} = $${paramCount}`);
        values.push(post[field as keyof UpdateBlogPostInput]);
        paramCount++;
      }
    });

    if (post.status === 'published') {
      updates.push(`published_at = $${paramCount}`);
      values.push(new Date());
      paramCount++;
    }

    updates.push(`updated_at = $${paramCount}`);
    values.push(new Date());

    values.push(id);

    const result = await db.query(`
      UPDATE blog_posts
      SET ${updates.join(', ')}
      WHERE id = $${paramCount + 1}
      RETURNING *
    `, values);

    // Update tags if provided
    if (post.tags) {
      await db.query('DELETE FROM blog_posts_tags WHERE post_id = $1', [id]);
      await Promise.all(post.tags.map(tagId =>
        db.query(
          'INSERT INTO blog_posts_tags (post_id, tag_id) VALUES ($1, $2)',
          [id, tagId]
        )
      ));
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating blog post:', error);
    res.status(500).json({ error: 'Failed to update blog post' });
  }
});

// Delete a blog post
router.delete('/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM blog_posts WHERE id = $1', [id]);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting blog post:', error);
    res.status(500).json({ error: 'Failed to delete blog post' });
  }
});

// Category endpoints
router.get('/categories', async (req, res) => {
  try {
    const categories = await db.query('SELECT * FROM blog_categories ORDER BY name');
    res.json(categories.rows);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

router.post('/categories', async (req, res) => {
  try {
    const { name, description } = req.body;
    const slug = slugify(name, { lower: true });
    const result = await db.query(
      'INSERT INTO blog_categories (name, slug, description) VALUES ($1, $2, $3) RETURNING *',
      [name, slug, description]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ error: 'Failed to create category' });
  }
});

// Tag endpoints
router.get('/tags', async (req, res) => {
  try {
    const tags = await db.query('SELECT * FROM blog_tags ORDER BY name');
    res.json(tags.rows);
  } catch (error) {
    console.error('Error fetching tags:', error);
    res.status(500).json({ error: 'Failed to fetch tags' });
  }
});

router.post('/tags', async (req, res) => {
  try {
    const { name } = req.body;
    const slug = slugify(name, { lower: true });
    const result = await db.query(
      'INSERT INTO blog_tags (name, slug) VALUES ($1, $2) RETURNING *',
      [name, slug]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating tag:', error);
    res.status(500).json({ error: 'Failed to create tag' });
  }
});

export default router;
