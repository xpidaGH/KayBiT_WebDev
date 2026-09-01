import React, { useState, useMemo } from 'react';
import { ShoppingCart, Search, Filter, Star, Plus, Minus, Trash2, X, Check, ArrowRight, ShieldCheck, Truck, RefreshCw, Eye } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  category: 'Keyboards' | 'Audio' | 'Displays' | 'Hardware';
  price: number;
  rating: number;
  reviewsCount: number;
  stock: number;
  image: string;
  description: string;
  specs: string[];
}

interface CartItem extends Product {
  quantity: number;
}

const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Luminary Pro 75% Custom Mechanical Keyboard',
    category: 'Keyboards',
    price: 189,
    rating: 4.9,
    reviewsCount: 142,
    stock: 12,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&auto=format&fit=crop&q=80',
    description: 'Hot-swappable gasket mount board with custom pre-lubed linear switches, sound dampening foam, and PBT dye-sub keycaps.',
    specs: ['Gasket Mount Structure', 'Tri-Mode Wireless & USB-C', 'South-Facing RGB', 'QMK / VIA Programmable'],
  },
  {
    id: 'prod-2',
    name: 'AcousticShield ANC Studio Reference Headphones',
    category: 'Audio',
    price: 279,
    rating: 4.8,
    reviewsCount: 88,
    stock: 5,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=80',
    description: 'Ultra-low latency active noise cancelling headphones with 45mm planar magnetic drivers and 40-hour battery life for uninterrupted deep focus.',
    specs: ['Active Noise Cancellation (42dB)', '40h Battery Life', 'Bluetooth 5.3 & Lossless DAC', 'Memory Foam Ear Cushions'],
  },
  {
    id: 'prod-3',
    name: 'UltraVision 34" Curved OLED Developer Monitor',
    category: 'Displays',
    price: 649,
    rating: 4.9,
    reviewsCount: 64,
    stock: 3,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&auto=format&fit=crop&q=80',
    description: '3440x1440 WQHD 175Hz curved QD-OLED display with 90W USB-C Power Delivery and hardware KVM switch for multi-machine setups.',
    specs: ['34" 3440x1440p QD-OLED', '175Hz Refresh / 0.03ms Response', 'Built-in KVM Switcher', '90W USB-C Charging Hub'],
  },
  {
    id: 'prod-4',
    name: 'DevNode Cluster Micro-Server Rack (4-Core)',
    category: 'Hardware',
    price: 320,
    rating: 4.7,
    reviewsCount: 31,
    stock: 8,
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500&auto=format&fit=crop&q=80',
    description: 'Self-hosted home lab micro cluster for local Kubernetes nodes, Docker containers, and edge AI model deployment.',
    specs: ['64GB DDR5 ECC RAM', '1TB NVMe PCIe 4.0', 'Dual 2.5GbE Ethernet', 'Silent Fanless Aluminum Chassis'],
  },
  {
    id: 'prod-5',
    name: 'ErgoGlide Precision Vertical Trackball Mouse',
    category: 'Keyboards',
    price: 95,
    rating: 4.6,
    reviewsCount: 57,
    stock: 19,
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&auto=format&fit=crop&q=80',
    description: 'Ergonomic 57-degree natural handshake angle to eliminate wrist strain during extended software development sprints.',
    specs: ['57° Ergonomic Sculpted Angle', 'Precision Optical Sensor 4000 DPI', 'Rechargeable USB-C', 'Customizable Flow Gesture Keys'],
  },
  {
    id: 'prod-6',
    name: 'SoundWave Boom Pro USB-C Podcast Condenser Mic',
    category: 'Audio',
    price: 139,
    rating: 4.8,
    reviewsCount: 92,
    stock: 14,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&auto=format&fit=crop&q=80',
    description: 'Studio-grade 24-bit/96kHz cardioid condenser microphone with built-in DSP limiter, pop filter, and zero-latency monitoring.',
    specs: ['Cardioid & Omni Polar Patterns', 'Built-in Hardware DSP Limiter', 'Touch-to-Mute Sensor', 'Shockmount & Boom Arm Included'],
  }
];

export function EcommerceTemplate() {
  const [products] = useState<Product[]>(PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [maxPrice, setMaxPrice] = useState<number>(700);
  const [cart, setCart] = useState<CartItem[]>([
    { ...PRODUCTS[0], quantity: 1 },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const categories = ['All', 'Keyboards', 'Audio', 'Displays', 'Hardware'];

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice = p.price <= maxPrice;
      return matchesCategory && matchesSearch && matchesPrice;
    });
  }, [products, selectedCategory, searchQuery, maxPrice]);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, quantity: item.quantity + delta } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = subtotal * appliedDiscount;
  const estimatedTax = (subtotal - discountAmount) * 0.08;
  const total = subtotal - discountAmount + estimatedTax;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === 'STUDENT10') {
      setAppliedDiscount(0.1);
    } else {
      alert('Invalid coupon! Try entering "STUDENT10" for 10% student discount.');
    }
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderComplete(true);
      setCart([]);
    }, 1200);
  };

  return (
    <div className="bg-slate-950 text-slate-100 min-h-full font-sans pb-16">
      {/* Store Header */}
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur sticky top-0 z-30 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold shadow-lg shadow-emerald-600/20">
              ⚡
            </div>
            <div>
              <h1 className="text-lg font-bold font-display text-white tracking-tight">ByteForge Gear</h1>
              <p className="text-xs text-slate-400">Developer Hardware & Workstation Ergonomics</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Search tech & gear..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative bg-slate-800 hover:bg-slate-700 text-white p-2.5 rounded-xl transition flex items-center gap-2 border border-slate-700"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="text-xs font-bold font-mono">
                {cart.reduce((sum, i) => sum + i.quantity, 0)}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Storefront Layout */}
      <div className="max-w-7xl mx-auto px-6 pt-8 grid lg:grid-cols-4 gap-8">
        {/* Faceted Filters Sidebar */}
        <aside className="lg:col-span-1 space-y-6">
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <Filter className="w-4 h-4 text-emerald-400" /> Filters & Categories
              </h3>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setMaxPrice(700);
                  setSearchQuery('');
                }}
                className="text-[11px] text-slate-400 hover:text-white"
              >
                Reset
              </button>
            </div>

            {/* Category Pills */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-2 uppercase tracking-wider">
                Category
              </label>
              <div className="space-y-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs transition flex justify-between items-center ${
                      selectedCategory === cat
                        ? 'bg-emerald-600 text-white font-semibold'
                        : 'bg-slate-950/60 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span>{cat}</span>
                    <span className="text-[11px] opacity-70">
                      {cat === 'All'
                        ? products.length
                        : products.filter((p) => p.category === cat).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Slider */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-300 mb-2">
                <span className="uppercase tracking-wider">Max Price</span>
                <span className="text-emerald-400 font-mono font-bold">${maxPrice}</span>
              </div>
              <input
                type="range"
                min="50"
                max="700"
                step="25"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-emerald-500 bg-slate-800"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>$50</span>
                <span>$700</span>
              </div>
            </div>

            {/* Student Promo Banner */}
            <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-xl p-3.5 text-xs text-emerald-300">
              <div className="font-bold flex items-center gap-1.5 mb-1">
                <span>🎓</span> Student Discount
              </div>
              <p className="text-[11px] text-emerald-200/80 leading-relaxed">
                Use promo code <code className="bg-slate-950 px-1.5 py-0.5 rounded font-mono font-bold text-emerald-400">STUDENT10</code> at checkout for 10% off.
              </p>
            </div>
          </div>

          {/* Value Props */}
          <div className="grid grid-cols-1 gap-3 text-xs text-slate-400">
            <div className="flex items-center gap-3 p-3 bg-slate-900/40 border border-slate-800 rounded-xl">
              <Truck className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <div className="font-semibold text-slate-200">Global Express Shipping</div>
                <div className="text-[11px]">Free delivery on orders over $150</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-slate-900/40 border border-slate-800 rounded-xl">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <div className="font-semibold text-slate-200">2-Year Developer Warranty</div>
                <div className="text-[11px]">Instant replacement guarantee</div>
              </div>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <main className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-mono">
              Showing {filteredProducts.length} of {products.length} products
            </span>
          </div>

          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition flex flex-col group"
              >
                {/* Product Image */}
                <div className="relative aspect-video bg-slate-950 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur text-slate-300 text-[10px] uppercase font-bold font-mono px-2 py-0.5 rounded border border-slate-700">
                    {product.category}
                  </span>
                  <button
                    onClick={() => setQuickViewProduct(product)}
                    className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur hover:bg-slate-800 text-slate-300 p-1.5 rounded-lg border border-slate-700 transition"
                    title="Quick View"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Info */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs text-amber-400 mb-1">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="font-bold">{product.rating}</span>
                      <span className="text-slate-500 font-normal">({product.reviewsCount})</span>
                    </div>
                    <h3 className="font-bold text-sm text-white line-clamp-1 group-hover:text-emerald-400 transition">
                      {product.name}
                    </h3>
                    <p className="text-slate-400 text-xs mt-1.5 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-400">Price</span>
                      <div className="text-lg font-bold font-mono text-emerald-400">
                        ${product.price}
                      </div>
                    </div>
                    <button
                      onClick={() => addToCart(product)}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition shadow-lg shadow-emerald-600/20"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Cart Drawer Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex justify-end">
          <div className="bg-slate-900 border-l border-slate-800 w-full max-w-md h-full flex flex-col justify-between shadow-2xl p-6 overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <h3 className="font-bold text-base text-white flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4 text-emerald-400" />
                  Your Cart ({cart.reduce((sum, i) => sum + i.quantity, 0)})
                </h3>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Items List */}
              {cart.length === 0 ? (
                <div className="py-16 text-center text-slate-500 text-xs">
                  Your cart is empty. Add products from the catalog!
                </div>
              ) : (
                <div className="divide-y divide-slate-800/80 my-4">
                  {cart.map((item) => (
                    <div key={item.id} className="py-3.5 flex gap-3">
                      <img src={item.image} alt="" className="w-14 h-14 rounded-lg object-cover bg-slate-950 shrink-0" />
                      <div className="flex-1">
                        <div className="text-xs font-semibold text-white line-clamp-1">{item.name}</div>
                        <div className="text-xs text-emerald-400 font-mono mt-0.5">${item.price} each</div>
                        <div className="flex items-center gap-3 mt-2">
                          <div className="flex items-center border border-slate-700 rounded-lg bg-slate-950">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="px-2 py-0.5 text-slate-400 hover:text-white text-xs"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 text-xs font-mono font-bold">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="px-2 py-0.5 text-slate-400 hover:text-white text-xs"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-slate-500 hover:text-rose-400 text-xs transition"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Coupon Form */}
              {cart.length > 0 && (
                <form onSubmit={handleApplyCoupon} className="flex gap-2 mt-4 pt-4 border-t border-slate-800">
                  <input
                    type="text"
                    placeholder="Coupon code (STUDENT10)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 flex-1 uppercase font-mono"
                  />
                  <button
                    type="submit"
                    className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium px-3 py-1.5 rounded-lg border border-slate-700"
                  >
                    Apply
                  </button>
                </form>
              )}
            </div>

            {/* Cart Summary & Checkout Button */}
            {cart.length > 0 && (
              <div className="pt-4 border-t border-slate-800 space-y-3">
                <div className="space-y-1.5 text-xs text-slate-400">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span className="font-mono text-slate-200">${subtotal.toFixed(2)}</span>
                  </div>
                  {appliedDiscount > 0 && (
                    <div className="flex justify-between text-emerald-400">
                      <span>Discount (10%):</span>
                      <span className="font-mono">-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Est. Tax (8%):</span>
                    <span className="font-mono text-slate-200">${estimatedTax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-slate-800">
                    <span>Order Total:</span>
                    <span className="font-mono text-emerald-400">${total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-2 transition shadow-lg shadow-emerald-600/30"
                >
                  {isCheckingOut ? (
                    <span className="flex items-center gap-2">
                      <RefreshCw className="w-4 h-4 animate-spin" /> Authorizing Payment...
                    </span>
                  ) : (
                    <>
                      <span>Secure Checkout</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Quick View Product Modal */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-4 right-4 p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="grid md:grid-cols-2 gap-6">
              <img
                src={quickViewProduct.image}
                alt=""
                className="w-full h-56 md:h-full rounded-xl object-cover bg-slate-950"
              />
              <div className="space-y-4">
                <span className="text-[10px] bg-slate-800 text-emerald-400 font-mono font-bold px-2 py-0.5 rounded uppercase">
                  {quickViewProduct.category}
                </span>
                <h2 className="text-lg font-bold text-white">{quickViewProduct.name}</h2>
                <div className="text-2xl font-bold font-mono text-emerald-400">${quickViewProduct.price}</div>
                <p className="text-xs text-slate-300 leading-relaxed">{quickViewProduct.description}</p>

                <div className="space-y-1.5 pt-2">
                  <div className="text-[11px] font-bold uppercase text-slate-400">Technical Specs:</div>
                  <ul className="text-xs text-slate-300 space-y-1">
                    {quickViewProduct.specs.map((s) => (
                      <li key={s} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400" /> {s}
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => {
                    addToCart(quickViewProduct);
                    setQuickViewProduct(null);
                  }}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition"
                >
                  <Plus className="w-4 h-4" /> Add to Cart (${quickViewProduct.price})
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Order Complete Success Toast Modal */}
      {orderComplete && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-emerald-500/40 rounded-2xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto text-2xl">
              ✓
            </div>
            <h3 className="text-lg font-bold text-white">Order Confirmed!</h3>
            <p className="text-xs text-slate-300">
              Receipt and tracking details have been generated. Thank you for testing the e-commerce prototype!
            </p>
            <button
              onClick={() => setOrderComplete(false)}
              className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-6 py-2 rounded-xl transition"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
