"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged, 
  User 
} from "firebase/auth";
import { auth, isFirebaseConfigured } from "../lib/firebase";
import { 
  getProducts, 
  saveProduct, 
  deleteProduct, 
  getBlogs, 
  saveBlog, 
  deleteBlog, 
  uploadImage,
  seedInitialData 
} from "../lib/firestoreService";
import { Product, BlogPost } from "../lib/types";
import { 
  Layers, 
  BookOpen, 
  Plus, 
  Trash2, 
  Edit3, 
  LogOut, 
  ArrowLeft, 
  Check, 
  Copy, 
  ExternalLink,
  ShieldCheck,
  AlertCircle
} from "lucide-react";

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState<"products" | "blogs">("products");

  // Data states
  const [products, setProducts] = useState<Product[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [actionMessage, setActionMessage] = useState("");
  const [copiedEnv, setCopiedEnv] = useState(false);

  // Product Form Modal state
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [productUploading, setProductUploading] = useState(false);

  // Blog Form Modal state
  const [editingBlog, setEditingBlog] = useState<Partial<BlogPost> | null>(null);
  const [blogModalOpen, setBlogModalOpen] = useState(false);
  const [blogUploading, setBlogUploading] = useState(false);

  // Listen to Auth State
  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }

    let resolved = false;
    const fallbackTimer = setTimeout(() => {
      if (!resolved) {
        setLoading(false);
      }
    }, 1500);

    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        resolved = true;
        clearTimeout(fallbackTimer);
        setUser(currentUser);
        setLoading(false);
        if (currentUser) {
          loadData();
        }
      },
      (error) => {
        resolved = true;
        clearTimeout(fallbackTimer);
        console.error("Auth state listener error:", error);
        setAuthError(error.message);
        setLoading(false);
      }
    );

    return () => {
      clearTimeout(fallbackTimer);
      unsubscribe();
    };
  }, []);

  const loadData = async () => {
    setIsDataLoading(true);
    try {
      const [prods, blgs] = await Promise.all([getProducts(), getBlogs()]);
      setProducts(prods);
      setBlogs(blgs);
    } catch (err) {
      console.error("Error loading admin data:", err);
    } finally {
      setIsDataLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    if (!auth) {
      setAuthError("Firebase Auth instance not initialized. Please ensure browser window is loaded.");
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Authentication failed";
      setAuthError(message);
    }
  };

  const handleLogout = async () => {
    if (!auth) return;
    await signOut(auth);
    setUser(null);
  };

  const handleSeedData = async () => {
    if (!confirm("Seed Firestore with the initial 4 Products and 4 Blog posts?")) return;
    setIsDataLoading(true);
    try {
      const result = await seedInitialData();
      setActionMessage(`Successfully seeded ${result.productsCount} products and ${result.blogsCount} blogs!`);
      await loadData();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to seed data";
      setActionMessage(`Error: ${message}`);
    } finally {
      setIsDataLoading(false);
      setTimeout(() => setActionMessage(""), 4000);
    }
  };

  // ---------------- PRODUCT HANDLERS ----------------

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct?.title) return;
    setProductUploading(true);
    try {
      await saveProduct(editingProduct, editingProduct.id);
      setProductModalOpen(false);
      setEditingProduct(null);
      setActionMessage("Product saved successfully!");
      await loadData();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error saving product";
      alert(msg);
    } finally {
      setProductUploading(false);
      setTimeout(() => setActionMessage(""), 3000);
    }
  };

  const handleDeleteProduct = async (id: string, title: string) => {
    if (!confirm(`Delete product "${title}"?`)) return;
    try {
      await deleteProduct(id);
      setActionMessage("Product deleted.");
      await loadData();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error deleting product";
      alert(msg);
    }
  };

  const handleProductImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setProductUploading(true);
    try {
      const url = await uploadImage(file, "products");
      setEditingProduct((prev) => ({ ...(prev || {}), imageUrl: url }));
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to upload image";
      alert(msg);
    } finally {
      setProductUploading(false);
    }
  };

  // ---------------- BLOG HANDLERS ----------------

  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBlog?.title) return;
    setBlogUploading(true);
    try {
      await saveBlog(editingBlog, editingBlog.id);
      setBlogModalOpen(false);
      setEditingBlog(null);
      setActionMessage("Blog post saved successfully!");
      await loadData();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error saving blog post";
      alert(msg);
    } finally {
      setBlogUploading(false);
      setTimeout(() => setActionMessage(""), 3000);
    }
  };

  const handleDeleteBlog = async (id: string, title: string) => {
    if (!confirm(`Delete blog post "${title}"?`)) return;
    try {
      await deleteBlog(id);
      setActionMessage("Blog post deleted.");
      await loadData();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error deleting blog post";
      alert(msg);
    }
  };

  const handleBlogImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBlogUploading(true);
    try {
      const url = await uploadImage(file, "blogs");
      setEditingBlog((prev) => ({ ...(prev || {}), imageUrl: url }));
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to upload image";
      alert(msg);
    } finally {
      setBlogUploading(false);
    }
  };

  const envTemplate = `NEXT_PUBLIC_FIREBASE_API_KEY="your-api-key"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="developer-sandaruwan.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="developer-sandaruwan"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="developer-sandaruwan.appspot.com"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="your-sender-id"
NEXT_PUBLIC_FIREBASE_APP_ID="your-app-id"`;

  const copyEnvTemplate = () => {
    navigator.clipboard.writeText(envTemplate);
    setCopiedEnv(true);
    setTimeout(() => setCopiedEnv(false), 2000);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-[#08090d] text-zinc-900 dark:text-zinc-100 flex items-center justify-center font-mono text-xs">
        Initializing Administrative Boundary...
      </div>
    );
  }

  // Not authenticated screen
  if (!user) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-[#08090d] text-zinc-900 dark:text-zinc-100 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors mb-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Portfolio Overview</span>
            </Link>
            <div className="w-10 h-10 mx-auto rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Systems Administrator</h1>
            <p className="text-xs text-zinc-500">
              Sign in to manage dynamic architecture products and engineering blog posts.
            </p>
          </div>

          {!isFirebaseConfigured && (
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-700 dark:text-amber-400 space-y-2">
              <div className="flex items-center gap-2 font-semibold">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>Firebase Environment Variables Pending</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Add your Firebase Web credentials to <code>.env.local</code> in the project root to authenticate and sync directly with Firestore.
              </p>
              <button
                onClick={copyEnvTemplate}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-500/20 hover:bg-amber-500/30 text-[11px] font-mono transition-colors"
              >
                {copiedEnv ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                <span>{copiedEnv ? "Copied .env template" : "Copy .env.local template"}</span>
              </button>
            </div>
          )}

          <form onSubmit={handleLogin} className="p-6 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
            {authError && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-xs text-red-600 dark:text-red-400">
                {authError}
              </div>
            )}

            <div>
              <label className="block text-[11px] font-mono text-zinc-500 dark:text-zinc-400 mb-1">
                ADMIN EMAIL
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@domain.com"
                className="w-full px-3 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono text-zinc-500 dark:text-zinc-400 mb-1">
                PASSWORD
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-3 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-semibold text-xs hover:opacity-90 transition-opacity"
            >
              Authenticate Session
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Authenticated Admin Dashboard
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#08090d] text-zinc-900 dark:text-zinc-100 flex flex-col font-sans">
      {/* Top Bar */}
      <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/50 backdrop-blur-md sticky top-0 z-30 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            title="Return to public site"
          >
            <ArrowLeft className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
          </Link>
          <div>
            <div className="text-xs font-bold font-mono tracking-tight text-zinc-900 dark:text-white flex items-center gap-2">
              <span>SYSTEMS ADMIN</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium">LIVE</span>
            </div>
            <div className="text-[11px] text-zinc-500 font-mono">
              Authenticated as {user.email}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleSeedData}
            title="Seed defaults into Firestore"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs font-mono transition-colors"
          >
            <span>Seed Initial Data</span>
          </button>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-200/70 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-xs font-medium transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 flex-1 space-y-6">
        {actionMessage && (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-600 dark:text-emerald-400 font-mono flex items-center gap-2">
            <Check className="w-4 h-4" />
            <span>{actionMessage}</span>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("products")}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
                activeTab === "products"
                  ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-xs"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Products ({products.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("blogs")}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
                activeTab === "blogs"
                  ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-xs"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Blog Posts ({blogs.length})</span>
            </button>
          </div>

          {activeTab === "products" ? (
            <button
              onClick={() => {
                setEditingProduct({
                  title: "",
                  tag: "PRODUCT // SYSTEMS",
                  category: "Distributed Systems",
                  summary: "",
                  features: [],
                  metrics: [{ label: "Throughput", value: "50k+ msg/s" }],
                  stack: ["Java", "Kafka"],
                  order: products.length + 1,
                });
                setProductModalOpen(true);
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Product</span>
            </button>
          ) : (
            <button
              onClick={() => {
                setEditingBlog({
                  title: "",
                  id: `blog-${Date.now()}`,
                  excerpt: "",
                  content: "",
                  category: "Distributed Systems",
                  readTime: "5 min read",
                  date: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
                  tags: ["Architecture", "Engineering"],
                  published: true,
                });
                setBlogModalOpen(true);
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Blog Post</span>
            </button>
          )}
        </div>

        {/* TAB 1: PRODUCTS LIST */}
        {activeTab === "products" && (
          <div className="space-y-4">
            {isDataLoading && products.length === 0 ? (
              <div className="text-center py-12 text-xs font-mono text-zinc-500">Loading products...</div>
            ) : products.length === 0 ? (
              <div className="text-center py-12 text-xs font-mono text-zinc-500">No products found. Click &quot;Seed Initial Data&quot; or create one!</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="p-5 rounded-2xl bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                          {product.tag}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                          {product.category}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-1.5">
                        {product.title}
                      </h3>
                      <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed mb-3 line-clamp-2">
                        {product.summary}
                      </p>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {product.stack?.map((tech) => (
                          <span
                            key={tech}
                            className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between">
                      <span className="text-[10px] font-mono text-zinc-400">ID: {product.id}</span>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => {
                            setEditingProduct(product);
                            setProductModalOpen(true);
                          }}
                          className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                          title="Edit Product"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id, product.title)}
                          className="p-1.5 rounded-lg border border-red-200 dark:border-red-900/40 hover:bg-red-50 dark:hover:bg-red-950/40 text-red-600 dark:text-red-400"
                          title="Delete Product"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: BLOGS LIST */}
        {activeTab === "blogs" && (
          <div className="space-y-4">
            {isDataLoading && blogs.length === 0 ? (
              <div className="text-center py-12 text-xs font-mono text-zinc-500">Loading blog posts...</div>
            ) : blogs.length === 0 ? (
              <div className="text-center py-12 text-xs font-mono text-zinc-500">No blog posts found. Click &quot;Seed Initial Data&quot; or create one!</div>
            ) : (
              <div className="space-y-3">
                {blogs.map((post) => (
                  <div
                    key={post.id}
                    className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold">
                          {post.category}
                        </span>
                        <span className="text-[11px] font-mono text-zinc-400">
                          {post.date} • {post.readTime}
                        </span>
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white">
                        {post.title}
                      </h3>
                      <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-1">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => {
                          setEditingBlog(post);
                          setBlogModalOpen(true);
                        }}
                        className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                        title="Edit Blog Post"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteBlog(post.id, post.title)}
                        className="p-2 rounded-lg border border-red-200 dark:border-red-900/40 hover:bg-red-50 dark:hover:bg-red-950/40 text-red-600 dark:text-red-400"
                        title="Delete Blog Post"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* PRODUCT MODAL */}
      {productModalOpen && editingProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 space-y-4 my-8 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
              <h2 className="text-base font-bold text-zinc-900 dark:text-white">
                {editingProduct.id ? "Edit Architecture Product" : "New Architecture Product"}
              </h2>
              <button
                onClick={() => setProductModalOpen(false)}
                className="text-xs font-mono text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
              >
                Close ✕
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono text-zinc-500 mb-1">PRODUCT TITLE</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.title || ""}
                    onChange={(e) => setEditingProduct({ ...editingProduct, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs"
                    placeholder="e.g. Distributed Telemetry Pipeline"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-zinc-500 mb-1">TAG (HEADER)</label>
                  <input
                    type="text"
                    value={editingProduct.tag || ""}
                    onChange={(e) => setEditingProduct({ ...editingProduct, tag: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs"
                    placeholder="e.g. PRODUCT 01 // TELEMETRY"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-zinc-500 mb-1">CATEGORY</label>
                <input
                  type="text"
                  value={editingProduct.category || ""}
                  onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs"
                  placeholder="e.g. Distributed Systems & High Concurrency"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-zinc-500 mb-1">EXECUTIVE SUMMARY</label>
                <textarea
                  rows={3}
                  required
                  value={editingProduct.summary || ""}
                  onChange={(e) => setEditingProduct({ ...editingProduct, summary: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs resize-none"
                  placeholder="Describe the system architecture, throughput, and impact..."
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-zinc-500 mb-1">
                  TECH STACK (COMMA SEPARATED)
                </label>
                <input
                  type="text"
                  value={editingProduct.stack?.join(", ") || ""}
                  onChange={(e) => setEditingProduct({ 
                    ...editingProduct, 
                    stack: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) 
                  })}
                  className="w-full px-3 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs"
                  placeholder="Java, Apache Kafka, Redis, PostgreSQL, Docker"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-zinc-500 mb-1">
                  KEY CAPABILITIES (ONE PER LINE)
                </label>
                <textarea
                  rows={4}
                  value={editingProduct.features?.join("\n") || ""}
                  onChange={(e) => setEditingProduct({ 
                    ...editingProduct, 
                    features: e.target.value.split("\n").filter((f) => f.trim()) 
                  })}
                  className="w-full px-3 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs font-mono resize-none"
                  placeholder="Asynchronous non-blocking workers&#10;In-memory Redis caching&#10;Zero packet loss"
                />
              </div>

              {/* IMAGE UPLOAD */}
              <div>
                <label className="block text-[11px] font-mono text-zinc-500 mb-1">
                  PRODUCT DIAGRAM / ARCHITECTURE IMAGE
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProductImageUpload}
                    className="text-xs text-zinc-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-zinc-200 dark:file:bg-zinc-800 file:text-zinc-900 dark:file:text-white"
                  />
                  {editingProduct.imageUrl && (
                    <a
                      href={editingProduct.imageUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 underline font-mono"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>View Uploaded</span>
                    </a>
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setProductModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={productUploading}
                  className="px-5 py-2 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-semibold hover:opacity-90 disabled:opacity-50"
                >
                  {productUploading ? "Uploading & Saving..." : "Save Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* BLOG MODAL */}
      {blogModalOpen && editingBlog && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 space-y-4 my-8 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
              <h2 className="text-base font-bold text-zinc-900 dark:text-white">
                {editingBlog.id ? "Edit Systems Article" : "New Systems Article"}
              </h2>
              <button
                onClick={() => setBlogModalOpen(false)}
                className="text-xs font-mono text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
              >
                Close ✕
              </button>
            </div>

            <form onSubmit={handleSaveBlog} className="space-y-4 text-xs">
              <div>
                <label className="block text-[11px] font-mono text-zinc-500 mb-1">ARTICLE TITLE</label>
                <input
                  type="text"
                  required
                  value={editingBlog.title || ""}
                  onChange={(e) => setEditingBlog({ ...editingBlog, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs"
                  placeholder="e.g. Deconstructing Distributed Bottlenecks"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-mono text-zinc-500 mb-1">CATEGORY</label>
                  <input
                    type="text"
                    value={editingBlog.category || ""}
                    onChange={(e) => setEditingBlog({ ...editingBlog, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs"
                    placeholder="Distributed Systems"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-zinc-500 mb-1">READ TIME</label>
                  <input
                    type="text"
                    value={editingBlog.readTime || ""}
                    onChange={(e) => setEditingBlog({ ...editingBlog, readTime: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs"
                    placeholder="7 min read"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-zinc-500 mb-1">PUBLISH DATE</label>
                  <input
                    type="text"
                    value={editingBlog.date || ""}
                    onChange={(e) => setEditingBlog({ ...editingBlog, date: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs"
                    placeholder="November 2026"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-zinc-500 mb-1">EXCERPT (PREVIEW)</label>
                <textarea
                  rows={2}
                  required
                  value={editingBlog.excerpt || ""}
                  onChange={(e) => setEditingBlog({ ...editingBlog, excerpt: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs resize-none"
                  placeholder="Summary for list view..."
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-zinc-500 mb-1">FULL ARTICLE CONTENT (MARKDOWN / TEXT)</label>
                <textarea
                  rows={7}
                  value={editingBlog.content || ""}
                  onChange={(e) => setEditingBlog({ ...editingBlog, content: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs font-mono resize-none leading-relaxed"
                  placeholder="Write full article body here..."
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-zinc-500 mb-1">
                  TAGS (COMMA SEPARATED)
                </label>
                <input
                  type="text"
                  value={editingBlog.tags?.join(", ") || ""}
                  onChange={(e) => setEditingBlog({ 
                    ...editingBlog, 
                    tags: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) 
                  })}
                  className="w-full px-3 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs"
                  placeholder="Kafka, Java, Distributed Systems"
                />
              </div>

              {/* IMAGE UPLOAD */}
              <div>
                <label className="block text-[11px] font-mono text-zinc-500 mb-1">
                  COVER / DIAGRAM IMAGE
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleBlogImageUpload}
                    className="text-xs text-zinc-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-zinc-200 dark:file:bg-zinc-800 file:text-zinc-900 dark:file:text-white"
                  />
                  {editingBlog.imageUrl && (
                    <a
                      href={editingBlog.imageUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 underline font-mono"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>View Uploaded</span>
                    </a>
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setBlogModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={blogUploading}
                  className="px-5 py-2 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-semibold hover:opacity-90 disabled:opacity-50"
                >
                  {blogUploading ? "Uploading & Saving..." : "Save Article"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
