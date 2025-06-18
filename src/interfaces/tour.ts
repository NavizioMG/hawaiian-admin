// /src/interfaces/tour.ts
export interface Tour {
    id: string;
    created_at: string;
    title: string;
    description: string;
    item_id: string;
    slug: string;
    location: "Oahu" | "Maui" | "Big Island" | "Kauai" | "";
    category: string;
    custom_category?: string;
    tags: string[];
    image: string;
    affiliate_url: string;
    is_featured: boolean;
    is_vip: boolean;
    is_pinned: boolean;
    show_on_homepage: boolean;
    is_unforgettable: boolean;
    title_description_tags_fts?: string;
  }