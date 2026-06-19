import { eq, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, customRequests, reviews, blogPosts, CustomRequest, Review, BlogPost } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Custom Requests Queries
export async function createCustomRequest(data: {
  name: string;
  email: string;
  whatsapp: string;
  itemDescription: string;
}): Promise<CustomRequest> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(customRequests).values(data);
  const id = result[0].insertId;
  
  const created = await db.select().from(customRequests).where(eq(customRequests.id, id as number)).limit(1);
  return created[0]!;
}

export async function getCustomRequests() {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(customRequests).orderBy(desc(customRequests.createdAt));
}

// Reviews Queries
export async function createReview(data: {
  customerName: string;
  email: string;
  rating: number;
  reviewText: string;
}): Promise<Review> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(reviews).values(data);
  const id = result[0].insertId;
  
  const created = await db.select().from(reviews).where(eq(reviews.id, id as number)).limit(1);
  return created[0]!;
}

export async function getApprovedReviews() {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(reviews).where(eq(reviews.isApproved, true)).orderBy(desc(reviews.createdAt));
}

export async function getAllReviews() {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(reviews).orderBy(desc(reviews.createdAt));
}

export async function approveReview(reviewId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.update(reviews).set({ isApproved: true }).where(eq(reviews.id, reviewId));
}

// Blog Posts Queries
export async function createBlogPost(data: {
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  category?: string;
  isPublished?: boolean;
}): Promise<BlogPost> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(blogPosts).values(data);
  const id = result[0].insertId;
  
  const created = await db.select().from(blogPosts).where(eq(blogPosts.id, id as number)).limit(1);
  return created[0]!;
}

export async function getPublishedBlogPosts() {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(blogPosts).where(eq(blogPosts.isPublished, true)).orderBy(desc(blogPosts.createdAt));
}

export async function getBlogPostBySlug(slug: string) {
  const db = await getDb();
  if (!db) return null;

  const result = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function getAllBlogPosts() {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));
}
