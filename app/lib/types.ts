export interface Product {
  id: string;
  tag: string;
  title: string;
  category: string;
  summary: string;
  features: string[];
  metrics: { label: string; value: string }[];
  stack: string[];
  imageUrl?: string;
  platform?: string;      // e.g. "Web App" | "Mobile App" | "Desktop App" | "Backend & Systems" | "ERP & Enterprise"
  pricingType?: string;   // e.g. "Open Source" | "Paid" | "Enterprise"
  priceLabel?: string;    // e.g. "MIT License" | "$49" | "Custom Quote"
  status?: string;        // e.g. "Production" | "v2.4" | "Beta"
  demoUrl?: string;
  repoUrl?: string;
  order?: number;
  createdAt?: number;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  category: string;
  readTime: string;
  date: string;
  tags: string[];
  imageUrl?: string;
  published?: boolean;
  createdAt?: number;
}
