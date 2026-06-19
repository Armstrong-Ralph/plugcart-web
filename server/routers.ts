import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import {
  createCustomRequest,
  getCustomRequests,
  createReview,
  getApprovedReviews,
  getAllReviews,
  approveReview,
  createBlogPost,
  getPublishedBlogPosts,
  getBlogPostBySlug,
  getAllBlogPosts,
} from "./db";
import { notifyOwner } from "./_core/notification";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  customRequests: router({
    create: publicProcedure
      .input(
        z.object({
          name: z.string().min(1, "Name is required"),
          email: z.string().email("Valid email is required"),
          whatsapp: z.string().min(10, "Valid WhatsApp number is required"),
          itemDescription: z.string().min(10, "Please describe what you need"),
        })
      )
      .mutation(async ({ input }) => {
        const request = await createCustomRequest(input);
        
        await notifyOwner({
          title: "New Custom Request from Ask the Plug",
          content: `${input.name} (${input.email}) requested: ${input.itemDescription}\n\nWhatsApp: ${input.whatsapp}`,
        });

        return request;
      }),

    list: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user?.role !== "admin") {
        throw new Error("Unauthorized");
      }
      return getCustomRequests();
    }),
  }),

  reviews: router({
    create: publicProcedure
      .input(
        z.object({
          customerName: z.string().min(1, "Name is required"),
          email: z.string().email("Valid email is required"),
          rating: z.number().min(1).max(5, "Rating must be between 1 and 5"),
          reviewText: z.string().min(10, "Review must be at least 10 characters"),
        })
      )
      .mutation(async ({ input }) => {
        const review = await createReview(input);
        
        await notifyOwner({
          title: "New Review Submitted",
          content: `${input.customerName} left a ${input.rating}-star review: ${input.reviewText}`,
        });

        return review;
      }),

    listApproved: publicProcedure.query(() => getApprovedReviews()),

    listAll: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user?.role !== "admin") {
        throw new Error("Unauthorized");
      }
      return getAllReviews();
    }),

    approve: protectedProcedure
      .input(z.object({ reviewId: z.number() }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== "admin") {
          throw new Error("Unauthorized");
        }
        await approveReview(input.reviewId);
        return { success: true };
      }),
  }),

  blog: router({
    create: protectedProcedure
      .input(
        z.object({
          title: z.string().min(1, "Title is required"),
          slug: z.string().min(1, "Slug is required"),
          excerpt: z.string().optional(),
          content: z.string().min(1, "Content is required"),
          category: z.string().default("skincare"),
          isPublished: z.boolean().default(false),
        })
      )
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== "admin") {
          throw new Error("Unauthorized");
        }
        return createBlogPost(input);
      }),

    listPublished: publicProcedure.query(() => getPublishedBlogPosts()),

    listAll: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user?.role !== "admin") {
        throw new Error("Unauthorized");
      }
      return getAllBlogPosts();
    }),

    getBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(({ input }) => getBlogPostBySlug(input.slug)),
  }),
});

export type AppRouter = typeof appRouter;
