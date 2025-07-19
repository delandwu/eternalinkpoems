import { defineCollection, z } from "astro:content";

// Pages collection schema
const pagesCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    meta_title: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    draft: z.boolean().optional(),
  }),
});

// FAQ collection schema
const faqCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    meta_title: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    draft: z.boolean().optional(),
    enable: z.boolean().default(true),
    faqs: z.array(z.object({
      question: z.string(),
      answer: z.string(),
      category: z.string().optional(),
    })),
  }),
});

// Reviews collection schema
const reviewsCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    meta_title: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    draft: z.boolean().optional(),
    enable: z.boolean().default(true),
    aggregateRating: z.object({
      ratingValue: z.number(),
      reviewCount: z.number(),
      bestRating: z.number().default(5),
      worstRating: z.number().default(1),
    }),
    reviews: z.array(z.object({
      author: z.string(),
      rating: z.number(),
      reviewBody: z.string(),
      datePublished: z.string(),
      title: z.string().optional(),
    })),
  }),
});

// Export collections
export const collections = {
  pages: pagesCollection,
  faq: faqCollection,
  reviews: reviewsCollection,
};
