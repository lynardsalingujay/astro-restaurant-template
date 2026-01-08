// Mock data for fallback when Strapi is unavailable
// This ensures the website remains functional even when CMS is down

import type {
  MenuItem,
  StrapiResponse,
  HomepageResponse,
  HeroSection,
  MenuItemAttributes,
} from "./strapi";

// Mock Menu Items with placeholder images
export const mockMenuItems: StrapiResponse<MenuItem> = {
  data: [
    {
      id: 1,
      attributes: {
        name: "Grilled Salmon",
        description:
          "Fresh Atlantic salmon grilled to perfection, served with seasonal vegetables and lemon butter sauce",
        price: 24.99,
        isMadeToOrder: true,
        image: {
          data: {
            id: 1,
            attributes: {
              url: "/placeholders/dish-1.svg",
              alternativeText: "Grilled Salmon",
              width: 800,
              height: 600,
              formats: {
                thumbnail: {
                  url: "/placeholders/dish-1.svg",
                  width: 245,
                  height: 156,
                },
              },
            },
          },
        },
        cuisine: {
          data: {
            id: 1,
            attributes: {
              name: "Seafood",
            },
          },
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        publishedAt: new Date().toISOString(),
      },
    },
    {
      id: 2,
      attributes: {
        name: "Classic Burger",
        description:
          "Juicy beef patty with lettuce, tomato, pickles, and our special sauce on a toasted brioche bun",
        price: 16.99,
        isMadeToOrder: true,
        image: {
          data: {
            id: 2,
            attributes: {
              url: "/placeholders/dish-2.svg",
              alternativeText: "Classic Burger",
              width: 800,
              height: 600,
              formats: {
                thumbnail: {
                  url: "/placeholders/dish-2.svg",
                  width: 245,
                  height: 156,
                },
              },
            },
          },
        },
        cuisine: {
          data: {
            id: 2,
            attributes: {
              name: "American",
            },
          },
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        publishedAt: new Date().toISOString(),
      },
    },
    {
      id: 3,
      attributes: {
        name: "Margherita Pizza",
        description:
          "Traditional Italian pizza with fresh mozzarella, tomatoes, and basil on a wood-fired crust",
        price: 18.99,
        isMadeToOrder: true,
        image: {
          data: {
            id: 3,
            attributes: {
              url: "/placeholders/dish-3.svg",
              alternativeText: "Margherita Pizza",
              width: 800,
              height: 600,
              formats: {
                thumbnail: {
                  url: "/placeholders/dish-3.svg",
                  width: 245,
                  height: 156,
                },
              },
            },
          },
        },
        cuisine: {
          data: {
            id: 3,
            attributes: {
              name: "Italian",
            },
          },
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        publishedAt: new Date().toISOString(),
      },
    },
    {
      id: 4,
      attributes: {
        name: "Caesar Salad",
        description:
          "Crisp romaine lettuce with parmesan cheese, croutons, and house-made Caesar dressing",
        price: 12.99,
        isMadeToOrder: false,
        image: {
          data: {
            id: 4,
            attributes: {
              url: "/placeholders/dish-4.svg",
              alternativeText: "Caesar Salad",
              width: 800,
              height: 600,
              formats: {
                thumbnail: {
                  url: "/placeholders/dish-4.svg",
                  width: 245,
                  height: 156,
                },
              },
            },
          },
        },
        cuisine: {
          data: {
            id: 4,
            attributes: {
              name: "Salads",
            },
          },
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        publishedAt: new Date().toISOString(),
      },
    },
    {
      id: 5,
      attributes: {
        name: "Chicken Alfredo Pasta",
        description:
          "Creamy fettuccine pasta with grilled chicken in our signature Alfredo sauce",
        price: 19.99,
        isMadeToOrder: true,
        image: {
          data: {
            id: 5,
            attributes: {
              url: "/placeholders/dish-1.svg",
              alternativeText: "Chicken Alfredo Pasta",
              width: 800,
              height: 600,
              formats: {
                thumbnail: {
                  url: "/placeholders/dish-1.svg",
                  width: 245,
                  height: 156,
                },
              },
            },
          },
        },
        cuisine: {
          data: {
            id: 3,
            attributes: {
              name: "Italian",
            },
          },
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        publishedAt: new Date().toISOString(),
      },
    },
    {
      id: 6,
      attributes: {
        name: "Steak Frites",
        description:
          "8oz ribeye steak cooked to your preference with crispy french fries and garlic butter",
        price: 32.99,
        isMadeToOrder: true,
        image: {
          data: {
            id: 6,
            attributes: {
              url: "/placeholders/dish-2.svg",
              alternativeText: "Steak Frites",
              width: 800,
              height: 600,
              formats: {
                thumbnail: {
                  url: "/placeholders/dish-2.svg",
                  width: 245,
                  height: 156,
                },
              },
            },
          },
        },
        cuisine: {
          data: {
            id: 5,
            attributes: {
              name: "French",
            },
          },
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        publishedAt: new Date().toISOString(),
      },
    },
  ],
  meta: {
    pagination: {
      page: 1,
      pageSize: 25,
      pageCount: 1,
      total: 6,
    },
  },
};

// Mock Homepage Hero Section
export const mockHomepage: HomepageResponse = {
  data: {
    id: 1,
    attributes: {
      heroSection: {
        heroTitle: "Delicious Food, Made Fresh Daily",
        heroSubtitle:
          "Experience the finest culinary creations. We bring authentic flavors and quality ingredients to every dish we serve.",
        heroImage: {
          data: {
            id: 1,
            attributes: {
              url: "/placeholders/hero.svg",
              alternativeText: "Restaurant Hero Image",
              width: 1920,
              height: 1080,
              formats: {
                large: {
                  url: "/placeholders/hero.svg",
                  width: 1000,
                  height: 563,
                },
                medium: {
                  url: "/placeholders/hero.svg",
                  width: 750,
                  height: 422,
                },
                small: {
                  url: "/placeholders/hero.svg",
                  width: 500,
                  height: 281,
                },
                thumbnail: {
                  url: "/placeholders/hero.svg",
                  width: 245,
                  height: 138,
                },
              },
            },
          },
        },
        primaryCtaText: "View Menu",
        primaryCtaLink: "/menu",
        secondaryCtaText: "Order Now",
        secondaryCtaLink: "/contact",
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      publishedAt: new Date().toISOString(),
    },
  },
  meta: {},
};

// Mock Testimonials (for future use)
export interface Testimonial {
  id: number;
  attributes: {
    customerName: string;
    content: string;
    rating: number;
    isFeatured: boolean;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

export const mockTestimonials: StrapiResponse<Testimonial> = {
  data: [
    {
      id: 1,
      attributes: {
        customerName: "Sarah Johnson",
        content:
          "Absolutely amazing! The food was incredible and the service was top-notch. Best dining experience I've had in years.",
        rating: 5,
        isFeatured: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        publishedAt: new Date().toISOString(),
      },
    },
    {
      id: 2,
      attributes: {
        customerName: "Michael Chen",
        content:
          "The grilled salmon was cooked to perfection. Fresh ingredients and wonderful presentation. Highly recommend!",
        rating: 5,
        isFeatured: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        publishedAt: new Date().toISOString(),
      },
    },
    {
      id: 3,
      attributes: {
        customerName: "Emily Rodriguez",
        content:
          "Great atmosphere and delicious food. The staff made us feel welcome and the menu has something for everyone.",
        rating: 5,
        isFeatured: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        publishedAt: new Date().toISOString(),
      },
    },
  ],
  meta: {
    pagination: {
      page: 1,
      pageSize: 25,
      pageCount: 1,
      total: 3,
    },
  },
};

// Helper function to get featured testimonials
export function getFeaturedTestimonials(
  testimonials: StrapiResponse<Testimonial>
): Testimonial[] {
  return testimonials.data.filter((t) => t.attributes.isFeatured);
}
