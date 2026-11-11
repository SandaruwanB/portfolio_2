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

