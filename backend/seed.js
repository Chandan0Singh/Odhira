require('dotenv').config();
const mongoose = require('mongoose');
const slugify = require('slugify');

// ─── Inline Schemas (so seed runs standalone) ───────────────────────────────

const categorySchema = new mongoose.Schema(
  {
    name:        { type: String, required: true, unique: true },
    slug:        { type: String, unique: true },
    image:       String,
    description: String,
    sortOrder:   { type: Number, default: 0 },
    isFeatured:  { type: Boolean, default: false },
    status:      { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
  },
  { timestamps: true }
);

const collectionSchema = new mongoose.Schema(
  {
    name:        { type: String, required: true, unique: true },
    slug:        { type: String, unique: true },
    banner:      String,
    description: String,
    status:      { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
  },
  { timestamps: true }
);

const variantSchema = new mongoose.Schema(
  {
    sku:             { type: String, trim: true },
    size:            { type: String, enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Free Size', 'Custom'] },
    color:           { type: String, trim: true },
    colorHex:        String,
    image:           String,
    price:           Number,
    discountedPrice: Number,
    stock:           { type: Number, default: 0 },
  },
  { _id: false }
);

const reviewSchema = new mongoose.Schema(
  {
    user:    { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rating:  { type: Number, min: 1, max: 5, required: true },
    comment: String,
  },
  { timestamps: true }
);

const imageSchema = new mongoose.Schema(
  {
    url:       String,
    alt:       String,
    isPrimary: { type: Boolean, default: false },
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    title:            { type: String, required: true, trim: true },
    slug:             { type: String, unique: true, lowercase: true },
    shortDescription: String,
    description:      String,

    category:   { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    collection: { type: mongoose.Schema.Types.ObjectId, ref: 'Collection' },
    brand:      { type: String, default: 'Odhira' },
    tags:       [String],

    images: [imageSchema],

    price:           { type: Number, required: true },
    discountedPrice: Number,
    gst:             { type: Number, default: 0 },

    variants:      [variantSchema],
    totalStock:    { type: Number, default: 0 },
    sold:          { type: Number, default: 0 },
    wishlistCount: { type: Number, default: 0 },
    views:         { type: Number, default: 0 },

    fabric:           String,
    handwork:         String,
    sleeveType:       String,
    neckline:         String,
    fit:              String,
    careInstructions: String,
    customizable:     { type: Boolean, default: false },
    occasion:         [String],

    weight: Number,
    length: Number,
    width:  Number,
    height: Number,

    isFeatured:  { type: Boolean, default: false },
    isBestSeller:{ type: Boolean, default: false },
    isNewArrival:{ type: Boolean, default: false },
    isSale:      { type: Boolean, default: false },

    status: { type: String, enum: ['Draft', 'Active', 'Inactive', 'Archived'], default: 'Draft' },

    metaTitle:       String,
    metaDescription: String,
    metaKeywords:    [String],

    lookbookImages: [String],
    styleNotes:     String,

    reviews:       [reviewSchema],
    averageRating: { type: Number, default: 0 },
    totalReviews:  { type: Number, default: 0 },
  },
  { timestamps: true }
);

productSchema.pre('save', function (next) {
  if (!this.slug) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  if (this.variants.length) {
    this.totalStock = this.variants.reduce((sum, v) => sum + v.stock, 0);
  }
  if (this.reviews.length) {
    this.totalReviews  = this.reviews.length;
    this.averageRating = this.reviews.reduce((sum, r) => sum + r.rating, 0) / this.reviews.length;
  }
  next();
});

const Category  = mongoose.model('Category',  categorySchema);
const Collection= mongoose.model('Collection', collectionSchema);
const Product   = mongoose.model('Product',    productSchema);

// ─── Seed Data ───────────────────────────────────────────────────────────────

const categoriesData = [
  {
    name:        'Kids Bags',
    slug:        'kids-bags',
    image:       'https://m.media-amazon.com/images/I/61vPyGqS0uL._AC_UY1100_.jpg',
    description: 'Fun, colourful bags designed for children — backpacks, slings and more.',
    sortOrder:   1,
    isFeatured:  true,
    status:      'Active',
  },
  {
    name:        'Teen Bags',
    slug:        'teen-bags',
    image:       'https://m.media-amazon.com/images/I/81z5vl5YrDL._AC_UY1100_.jpg',
    description: 'Trendy backpacks, slings and totes for teenagers.',
    sortOrder:   2,
    isFeatured:  true,
    status:      'Active',
  },
  {
    name:        'Women Bags',
    slug:        'women-bags',
    image:       'https://m.media-amazon.com/images/I/61x5q+zB0qL._AC_UY1100_.jpg',
    description: 'Stylish totes, clutches, satchels and handbags for women.',
    sortOrder:   3,
    isFeatured:  true,
    status:      'Active',
  },
  {
    name:        'Men Bags',
    slug:        'men-bags',
    image:       'https://m.media-amazon.com/images/I/91ogt8ED2EL._AC_UY1100_.jpg',
    description: 'Laptop bags, messenger bags, backpacks and duffels for men.',
    sortOrder:   4,
    isFeatured:  false,
    status:      'Active',
  },
  {
    name:        'Unisex Bags',
    slug:        'unisex-bags',
    image:       'https://m.media-amazon.com/images/I/71LGukjcZeL._AC_UY1100_.jpg',
    description: 'Gender-neutral bags for everyday use.',
    sortOrder:   5,
    isFeatured:  false,
    status:      'Active',
  },
  {
    name:        'Elder Bags',
    slug:        'elder-bags',
    image:       'https://s.alicdn.com/@sc04/kf/Hc944b3a6d9b244ae964e5eb829394b10X.png_300x300.jpg',
    description: 'Classic, comfortable bags suited for mature users.',
    sortOrder:   6,
    isFeatured:  false,
    status:      'Active',
  },
];

const collectionsData = [
  {
    name:        'New Arrivals',
    slug:        'new-arrivals',
    banner:      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1200&q=80',
    description: 'Fresh styles added to the store.',
    status:      'Active',
  },
  {
    name:        'Best Sellers',
    slug:        'best-sellers',
    banner:      'https://images.unsplash.com/photo-1598532163257-0bf54057d37a?w=1200&q=80',
    description: 'Our most-loved bags chosen by customers.',
    status:      'Active',
  },
  {
    name:        'Sale',
    slug:        'sale',
    banner:      'https://images.unsplash.com/photo-1594224457816-29f4c435ef23?w=1200&q=80',
    description: 'Special discounts — limited time only.',
    status:      'Active',
  },
  {
    name:        'Limited Edition',
    slug:        'limited-edition',
    banner:      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1200&q=80',
    description: 'Exclusive designs available in small quantities.',
    status:      'Active',
  },
  {
    name:        'Trending Now',
    slug:        'trending-now',
    banner:      'https://images.unsplash.com/photo-1598532163257-0bf54057d37a?w=1200&q=80',
    description: 'What people are buying right now.',
    status:      'Active',
  },
];

// Helper to build a slug
const makeSlug = (text) => slugify(text, { lower: true, strict: true });

// ─── Main Seeder ─────────────────────────────────────────────────────────────

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('✅ Connected to MongoDB');

  // Clear old data
  await Product.deleteMany({});
  await Category.deleteMany({});
  await Collection.deleteMany({});
  console.log('🗑️  Cleared old data');

  // Insert categories
  const categories = await Category.insertMany(categoriesData);
  const catMap = Object.fromEntries(categories.map((c) => [c.slug, c._id]));
  console.log('✅ Categories inserted');

  // Insert collections
  const collections = await Collection.insertMany(collectionsData);
  const colMap = Object.fromEntries(collections.map((c) => [c.slug, c._id]));
  console.log('✅ Collections inserted');

  // ── Product Definitions ────────────────────────────────────────────────────
  // Each product is fully mapped to the Product schema.
  // category  → one of the slugs defined above
  // collection→ optional; pick the most relevant one

  const productsData = [
    // ── KIDS ──────────────────────────────────────────────────────────────────
    {
      title:            'Kids Pink Mini Bag',
      slug:             makeSlug('Kids Pink Mini Bag'),
      shortDescription: 'Adorable pink mini bag perfect for little girls on the go.',
      description:      'A lightweight and cute pink mini bag ideal for young girls. Features an adjustable strap, zip closure, and enough space for daily essentials. Made from durable vegan leather.',
      category:         catMap['kids-bags'],
      collection:       colMap['sale'],
      brand:            'Odhira',
      tags:             ['popular', 'pink', 'mini', 'girls'],
      images: [
        { url: 'https://rukminim2.flixcart.com/image/750/900/xif0q/sling-bag/f/n/v/-original-imagz49ehhb5azrp.jpeg?q=20&crop=false', alt: 'Kids Pink Mini Bag', isPrimary: true },
      ],
      price:           999,
      discountedPrice: 849,
      gst:             12,
      variants: [
        { sku: 'KID-PINK-FS', size: 'Free Size', color: 'Pink', colorHex: '#FFB6C1', stock: 50 },
      ],
      fabric:           'Vegan Leather',
      careInstructions: 'Wipe with a damp cloth.',
      occasion:         ['School', 'Casual', 'Outing'],
      weight:           300,
      isFeatured:       true,
      isBestSeller:     false,
      isNewArrival:     true,
      isSale:           true,
      status:           'Active',
      metaTitle:        'Kids Pink Mini Bag – Odhira',
      metaDescription:  'Cute and compact pink mini bag for girls. Shop now at Odhira.',
      metaKeywords:     ['kids bag', 'pink bag', 'girls mini bag'],
    },
    {
      title:            'Kids Blue Cartoon Bag',
      slug:             makeSlug('Kids Blue Cartoon Bag'),
      shortDescription: 'Fun cartoon-themed blue bag for boys.',
      description:      'Brighten up school days with this vibrant blue cartoon bag. Spacious main compartment, front pocket, and padded back panel for comfort.',
      category:         catMap['kids-bags'],
      collection:       colMap['trending-now'],
      brand:            'Odhira',
      tags:             ['trending', 'classic', 'boys', 'cartoon'],
      images: [
        { url: 'https://m.media-amazon.com/images/I/71akHUAdSEL._AC_UY1100_.jpg', alt: 'Kids Blue Cartoon Bag', isPrimary: true },
      ],
      price:           899,
      discountedPrice: 809,
      gst:             12,
      variants: [
        { sku: 'KID-BLUE-FS', size: 'Free Size', color: 'Blue', colorHex: '#4169E1', stock: 60 },
      ],
      fabric:           'Polyester',
      careInstructions: 'Hand wash recommended.',
      occasion:         ['School', 'Casual'],
      weight:           400,
      isFeatured:       false,
      isBestSeller:     true,
      isNewArrival:     false,
      isSale:           true,
      status:           'Active',
      metaTitle:        'Kids Blue Cartoon Bag – Odhira',
      metaDescription:  'Trendy blue cartoon backpack for boys. Buy online at Odhira.',
      metaKeywords:     ['kids blue bag', 'cartoon bag', 'boys school bag'],
    },
    {
      title:            'Kids Unicorn Backpack',
      slug:             makeSlug('Kids Unicorn Backpack'),
      shortDescription: 'Magical unicorn-themed backpack for girls.',
      description:      "Let your child's imagination run wild with this enchanting unicorn backpack. Sparkling print, cushioned shoulder straps, and a roomy interior.",
      category:         catMap['kids-bags'],
      collection:       colMap['best-sellers'],
      brand:            'Odhira',
      tags:             ['popular', 'unicorn', 'girls', 'backpack'],
      images: [
        { url: 'https://m.media-amazon.com/images/I/61vPyGqS0uL._AC_UY1100_.jpg', alt: 'Kids Unicorn Backpack', isPrimary: true },
      ],
      price:           999,
      discountedPrice: 849,
      gst:             12,
      variants: [
        { sku: 'KID-UNI-FS', size: 'Free Size', color: 'Purple', colorHex: '#9B59B6', stock: 45 },
      ],
      fabric:           'Nylon',
      careInstructions: 'Wipe clean.',
      occasion:         ['School', 'Birthday Party'],
      weight:           350,
      isFeatured:       true,
      isBestSeller:     true,
      isNewArrival:     false,
      isSale:           true,
      status:           'Active',
      metaTitle:        'Kids Unicorn Backpack – Odhira',
      metaDescription:  'Magical unicorn backpack for girls. Shop at Odhira.',
      metaKeywords:     ['unicorn backpack', 'kids bag', 'girls bag'],
    },
    {
      title:            'Kids Dino Fun Bag',
      slug:             makeSlug('Kids Dino Fun Bag'),
      shortDescription: 'Roar into fun with this dinosaur-themed bag.',
      description:      'A playful dinosaur bag that kids will love. Features a 3D dino head design, zip closure, and padded straps for all-day comfort.',
      category:         catMap['kids-bags'],
      collection:       colMap['new-arrivals'],
      brand:            'Odhira',
      tags:             ['new', 'dino', 'boys', 'fun'],
      images: [
        { url: 'https://m.media-amazon.com/images/I/718dA6eDoWL._AC_UY1100_.jpg', alt: 'Kids Dino Fun Bag', isPrimary: true },
      ],
      price:           849,
      discountedPrice: 764,
      gst:             12,
      variants: [
        { sku: 'KID-DINO-FS', size: 'Free Size', color: 'Green', colorHex: '#228B22', stock: 40 },
      ],
      fabric:           'Polyester',
      careInstructions: 'Spot clean only.',
      occasion:         ['School', 'Casual'],
      weight:           380,
      isFeatured:       false,
      isBestSeller:     false,
      isNewArrival:     true,
      isSale:           true,
      status:           'Active',
      metaTitle:        'Kids Dino Fun Bag – Odhira',
      metaDescription:  'Dinosaur-themed kids bag. Buy now at Odhira.',
      metaKeywords:     ['dino bag', 'kids backpack', 'boys bag'],
    },
    {
      title:            'Kids Space Adventure Backpack',
      slug:             makeSlug('Kids Space Adventure Backpack'),
      shortDescription: 'Blast off to school with this galaxy-print backpack.',
      description:      'An out-of-this-world space-themed backpack featuring a galaxy print exterior, multiple compartments, and reflective strips for safety.',
      category:         catMap['kids-bags'],
      collection:       colMap['new-arrivals'],
      brand:            'Odhira',
      tags:             ['popular', 'new', 'space', 'boys'],
      images: [
        { url: 'https://images.unsplash.com/photo-1598532163257-0bf54057d37a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60', alt: 'Kids Space Adventure Backpack', isPrimary: true },
      ],
      price:           950,
      discountedPrice: 808,
      gst:             12,
      variants: [
        { sku: 'KID-SPACE-FS', size: 'Free Size', color: 'Dark Blue', colorHex: '#00008B', stock: 35 },
      ],
      fabric:           'Polyester',
      careInstructions: 'Hand wash, air dry.',
      occasion:         ['School', 'Travel'],
      weight:           420,
      isFeatured:       true,
      isBestSeller:     false,
      isNewArrival:     true,
      isSale:           true,
      status:           'Active',
      metaTitle:        'Kids Space Adventure Backpack – Odhira',
      metaDescription:  'Galaxy-print space backpack for kids. Shop at Odhira.',
      metaKeywords:     ['space backpack', 'kids bag', 'galaxy bag'],
    },

    // ── TEEN ──────────────────────────────────────────────────────────────────
    {
      title:            'Teen Boy Black Sling',
      slug:             makeSlug('Teen Boy Black Sling'),
      shortDescription: 'Sleek black sling bag for the modern teen boy.',
      description:      'A minimalist black sling bag perfect for teens on the move. Features a USB charging port, anti-scratch exterior, and adjustable crossbody strap.',
      category:         catMap['teen-bags'],
      collection:       colMap['trending-now'],
      brand:            'Odhira',
      tags:             ['trending', 'popular', 'black', 'sling'],
      images: [
        { url: 'https://m.media-amazon.com/images/I/61UBT3Gn+oL._SX679_.jpg', alt: 'Teen Boy Black Sling', isPrimary: true },
      ],
      price:           1299,
      discountedPrice: 1039,
      gst:             18,
      variants: [
        { sku: 'TEEN-BLK-FS', size: 'Free Size', color: 'Black', colorHex: '#000000', stock: 55 },
      ],
      fabric:           'Oxford Cloth',
      careInstructions: 'Wipe with damp cloth.',
      occasion:         ['School', 'Casual', 'Travel'],
      weight:           350,
      isFeatured:       true,
      isBestSeller:     true,
      isNewArrival:     false,
      isSale:           true,
      status:           'Active',
      metaTitle:        'Teen Boy Black Sling Bag – Odhira',
      metaDescription:  'Stylish black sling bag for teen boys. Buy at Odhira.',
      metaKeywords:     ['teen sling', 'black sling bag', 'boys sling'],
    },
    {
      title:            'Teen Girl Floral Backpack',
      slug:             makeSlug('Teen Girl Floral Backpack'),
      shortDescription: 'Pretty floral backpack every teen girl will adore.',
      description:      'A feminine floral-print backpack with a padded laptop sleeve, multiple pockets, and soft carry handles. Perfect for school and weekend outings.',
      category:         catMap['teen-bags'],
      collection:       colMap['best-sellers'],
      brand:            'Odhira',
      tags:             ['popular', 'premium', 'floral', 'girls'],
      images: [
        { url: 'https://m.media-amazon.com/images/I/81z5vl5YrDL._AC_UY1100_.jpg', alt: 'Teen Girl Floral Backpack', isPrimary: true },
      ],
      price:           1399,
      discountedPrice: 1189,
      gst:             18,
      variants: [
        { sku: 'TEEN-FLRL-FS', size: 'Free Size', color: 'Multicolour', colorHex: '#FF69B4', stock: 40 },
      ],
      fabric:           'Canvas',
      careInstructions: 'Spot clean only.',
      occasion:         ['School', 'Casual', 'Shopping'],
      weight:           500,
      isFeatured:       true,
      isBestSeller:     false,
      isNewArrival:     false,
      isSale:           true,
      status:           'Active',
      metaTitle:        'Teen Girl Floral Backpack – Odhira',
      metaDescription:  'Stylish floral backpack for teen girls. Shop at Odhira.',
      metaKeywords:     ['teen backpack', 'floral bag', 'girls backpack'],
    },
    {
      title:            'Teen Girl Pink Sling Bag',
      slug:             makeSlug('Teen Girl Pink Sling Bag'),
      shortDescription: 'Chic pink sling bag for fashion-forward teen girls.',
      description:      'This trendy pink sling bag features a sleek zip closure, interior organiser pocket, and an adjustable strap. Lightweight and stylish for everyday wear.',
      category:         catMap['teen-bags'],
      collection:       colMap['trending-now'],
      brand:            'Odhira',
      tags:             ['trending', 'pink', 'girls', 'sling'],
      images: [
        { url: 'https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Teen Girl Pink Sling Bag', isPrimary: true },
      ],
      price:           1299,
      discountedPrice: 1039,
      gst:             18,
      variants: [
        { sku: 'TEEN-PNKS-FS', size: 'Free Size', color: 'Pink', colorHex: '#FF69B4', stock: 30 },
      ],
      fabric:           'Vegan Leather',
      careInstructions: 'Wipe with dry cloth.',
      occasion:         ['School', 'Casual', 'Party'],
      weight:           300,
      isFeatured:       false,
      isBestSeller:     false,
      isNewArrival:     false,
      isSale:           true,
      status:           'Active',
      metaTitle:        'Teen Girl Pink Sling Bag – Odhira',
      metaDescription:  'Trendy pink sling bag for teen girls. Buy online at Odhira.',
      metaKeywords:     ['teen sling bag', 'pink bag', 'girls bag'],
    },
    {
      title:            'College Backpack - Unisex',
      slug:             makeSlug('College Backpack Unisex'),
      shortDescription: 'Spacious and sturdy college backpack for students.',
      description:      'Designed for the campus lifestyle, this unisex college backpack offers a dedicated laptop sleeve (up to 15.6"), side water-bottle pockets, and ergonomic shoulder straps.',
      category:         catMap['teen-bags'],
      collection:       colMap['best-sellers'],
      brand:            'Odhira',
      tags:             ['popular', 'college', 'unisex', 'laptop'],
      images: [
        { url: 'https://m.media-amazon.com/images/I/71tFOp+E8qL._AC_UY1100_.jpg', alt: 'College Backpack Unisex', isPrimary: true },
      ],
      price:           1099,
      discountedPrice: 824,
      gst:             18,
      variants: [
        { sku: 'COL-UNI-BLK', size: 'Free Size', color: 'Black', colorHex: '#000000', stock: 70 },
        { sku: 'COL-UNI-GRY', size: 'Free Size', color: 'Grey',  colorHex: '#808080', stock: 50 },
      ],
      fabric:           'Polyester',
      careInstructions: 'Machine wash gentle, air dry.',
      occasion:         ['College', 'Travel', 'Casual'],
      weight:           650,
      customizable:     false,
      isFeatured:       true,
      isBestSeller:     true,
      isNewArrival:     false,
      isSale:           true,
      status:           'Active',
      metaTitle:        'Unisex College Backpack – Odhira',
      metaDescription:  'Spacious college backpack for boys and girls. Shop at Odhira.',
      metaKeywords:     ['college bag', 'unisex backpack', 'student bag'],
    },

    // ── WOMEN ─────────────────────────────────────────────────────────────────
    {
      title:            'Adult Woman Tote',
      slug:             makeSlug('Adult Woman Tote'),
      shortDescription: 'Versatile everyday tote for the modern woman.',
      description:      'A spacious tote crafted from premium canvas with a zip top closure, interior card slots, and a detachable wrist strap. Ideal for work, shopping, or a day out.',
      category:         catMap['women-bags'],
      collection:       colMap['trending-now'],
      brand:            'Odhira',
      tags:             ['trending', 'tote', 'everyday'],
      images: [
        { url: 'https://m.media-amazon.com/images/I/61x5q+zB0qL._AC_UY1100_.jpg', alt: 'Adult Woman Tote', isPrimary: true },
      ],
      price:           2499,
      gst:             18,
      variants: [
        { sku: 'WOM-TOTE-BLK', size: 'Free Size', color: 'Black', colorHex: '#000000', stock: 40 },
        { sku: 'WOM-TOTE-BEG', size: 'Free Size', color: 'Beige', colorHex: '#F5F5DC', stock: 35 },
      ],
      fabric:           'Canvas',
      careInstructions: 'Hand wash cold.',
      occasion:         ['Work', 'Shopping', 'Casual'],
      weight:           550,
      isFeatured:       true,
      isBestSeller:     false,
      isNewArrival:     false,
      isSale:           false,
      status:           'Active',
      metaTitle:        'Women\'s Tote Bag – Odhira',
      metaDescription:  'Versatile canvas tote for women. Buy at Odhira.',
      metaKeywords:     ['women tote', 'canvas bag', 'everyday tote'],
    },
    {
      title:            'Luxury Leather Tote - Women',
      slug:             makeSlug('Luxury Leather Tote Women'),
      shortDescription: 'Premium genuine-leather tote — an everyday luxury.',
      description:      'Handcrafted from full-grain leather, this luxury tote features gold-toned hardware, suede lining, and two interior slip pockets. A timeless investment piece.',
      category:         catMap['women-bags'],
      collection:       colMap['limited-edition'],
      brand:            'Odhira',
      tags:             ['limited', 'new', 'luxury', 'leather'],
      images: [
        { url: 'https://m.media-amazon.com/images/I/61JDYw+5P6L._AC_UY1100_.jpg', alt: 'Luxury Leather Tote Women', isPrimary: true },
      ],
      price:           4599,
      discountedPrice: null,
      gst:             18,
      variants: [
        { sku: 'WOM-LUX-TAN', size: 'Free Size', color: 'Tan',   colorHex: '#D2B48C', stock: 20 },
        { sku: 'WOM-LUX-BLK', size: 'Free Size', color: 'Black', colorHex: '#000000', stock: 15 },
      ],
      fabric:           'Full-Grain Leather',
      careInstructions: 'Use leather conditioner monthly. Avoid water exposure.',
      occasion:         ['Work', 'Formal', 'Evening'],
      weight:           800,
      isFeatured:       true,
      isBestSeller:     false,
      isNewArrival:     true,
      isSale:           false,
      status:           'Active',
      metaTitle:        'Luxury Leather Tote for Women – Odhira',
      metaDescription:  'Premium leather tote bag for women. Shop at Odhira.',
      metaKeywords:     ['luxury tote', 'leather bag women', 'premium handbag'],
    },
    {
      title:            'Glitter Party Clutch',
      slug:             makeSlug('Glitter Party Clutch'),
      shortDescription: 'Dazzle at every event with this glitter clutch.',
      description:      'A sparkling evening clutch covered in fine glitter, featuring a fold-over magnetic closure, satin lining, and a detachable chain strap for hands-free carry.',
      category:         catMap['women-bags'],
      collection:       colMap['trending-now'],
      brand:            'Odhira',
      tags:             ['trending', 'popular', 'party', 'clutch'],
      images: [
        { url: 'https://m.media-amazon.com/images/I/71GknhNhgCL._AC_UY1100_.jpg', alt: 'Glitter Party Clutch', isPrimary: true },
      ],
      price:           899,
      discountedPrice: 719,
      gst:             18,
      variants: [
        { sku: 'WOM-GLTR-GLD', size: 'Free Size', color: 'Gold',   colorHex: '#FFD700', stock: 60 },
        { sku: 'WOM-GLTR-SLV', size: 'Free Size', color: 'Silver', colorHex: '#C0C0C0', stock: 50 },
        { sku: 'WOM-GLTR-ROS', size: 'Free Size', color: 'Rose',   colorHex: '#FF007F', stock: 40 },
      ],
      fabric:           'Glitter Fabric',
      careInstructions: 'Wipe with soft dry cloth only.',
      occasion:         ['Party', 'Wedding', 'Evening'],
      weight:           200,
      isFeatured:       false,
      isBestSeller:     true,
      isNewArrival:     false,
      isSale:           true,
      status:           'Active',
      metaTitle:        'Glitter Party Clutch – Odhira',
      metaDescription:  'Sparkling glitter clutch for parties. Buy at Odhira.',
      metaKeywords:     ['glitter clutch', 'party bag', 'evening clutch'],
    },
    {
      title:            'Red Sling Bag for Women',
      slug:             makeSlug('Red Sling Bag for Women'),
      shortDescription: 'Bold red sling bag that makes a statement.',
      description:      'Make a bold impression with this vibrant red sling bag. Crafted from vegan leather with a top zip closure, back safety pocket, and adjustable strap.',
      category:         catMap['women-bags'],
      collection:       colMap['best-sellers'],
      brand:            'Odhira',
      tags:             ['popular', 'red', 'sling'],
      images: [
        { url: 'https://m.media-amazon.com/images/I/61mPrCYoR7L._AC_UY1100_.jpg', alt: 'Red Sling Bag for Women', isPrimary: true },
      ],
      price:           1199,
      discountedPrice: 1019,
      gst:             18,
      variants: [
        { sku: 'WOM-SLNG-RED', size: 'Free Size', color: 'Red', colorHex: '#DC143C', stock: 45 },
      ],
      fabric:           'Vegan Leather',
      careInstructions: 'Wipe with damp cloth.',
      occasion:         ['Casual', 'Shopping', 'Date Night'],
      weight:           320,
      isFeatured:       false,
      isBestSeller:     true,
      isNewArrival:     false,
      isSale:           true,
      status:           'Active',
      metaTitle:        'Red Sling Bag Women – Odhira',
      metaDescription:  'Bold red sling bag for women. Shop now at Odhira.',
      metaKeywords:     ['red sling bag', 'women sling', 'vegan leather bag'],
    },
    {
      title:            'Adult Woman Evening Clutch',
      slug:             makeSlug('Adult Woman Evening Clutch'),
      shortDescription: 'Elegant clutch for formal evenings and celebrations.',
      description:      'A sophisticated evening clutch featuring a satin exterior, crystal clasp closure, and a slim interior with card slots and a phone pocket.',
      category:         catMap['women-bags'],
      collection:       colMap['trending-now'],
      brand:            'Odhira',
      tags:             ['trending', 'clutch', 'evening'],
      images: [
        { url: 'https://m.media-amazon.com/images/I/61vRt6qY8xL._AC_UY1100_.jpg', alt: 'Adult Woman Evening Clutch', isPrimary: true },
      ],
      price:           999,
      discountedPrice: 749,
      gst:             18,
      variants: [
        { sku: 'WOM-EVN-BLK', size: 'Free Size', color: 'Black',  colorHex: '#000000', stock: 35 },
        { sku: 'WOM-EVN-GLD', size: 'Free Size', color: 'Gold',   colorHex: '#FFD700', stock: 30 },
        { sku: 'WOM-EVN-NVY', size: 'Free Size', color: 'Navy',   colorHex: '#001F5B', stock: 25 },
      ],
      fabric:           'Satin',
      careInstructions: 'Dry clean only.',
      occasion:         ['Wedding', 'Party', 'Formal'],
      weight:           180,
      isFeatured:       true,
      isBestSeller:     false,
      isNewArrival:     false,
      isSale:           true,
      status:           'Active',
      metaTitle:        'Evening Clutch for Women – Odhira',
      metaDescription:  'Elegant evening clutch for special occasions. Buy at Odhira.',
      metaKeywords:     ['evening clutch', 'women clutch', 'party bag'],
    },

    // ── MEN ───────────────────────────────────────────────────────────────────
    {
      title:            'Adult Man Laptop Bag',
      slug:             makeSlug('Adult Man Laptop Bag'),
      shortDescription: 'Professional laptop bag for the modern working man.',
      description:      'A sleek laptop bag with a padded 15.6" sleeve, multiple organiser pockets, waterproof exterior, and a trolley strap for easy travel.',
      category:         catMap['men-bags'],
      collection:       colMap['new-arrivals'],
      brand:            'Odhira',
      tags:             ['new', 'laptop', 'office', 'men'],
      images: [
        { url: 'https://m.media-amazon.com/images/I/91ogt8ED2EL._AC_UY1100_.jpg', alt: 'Adult Man Laptop Bag', isPrimary: true },
      ],
      price:           2799,
      gst:             18,
      variants: [
        { sku: 'MEN-LAP-BLK', size: 'Free Size', color: 'Black', colorHex: '#000000', stock: 50 },
        { sku: 'MEN-LAP-GRY', size: 'Free Size', color: 'Grey',  colorHex: '#808080', stock: 30 },
      ],
      fabric:           'Nylon + Vegan Leather Trim',
      careInstructions: 'Wipe clean with dry cloth.',
      occasion:         ['Work', 'Travel', 'Business'],
      weight:           700,
      customizable:     false,
      isFeatured:       true,
      isBestSeller:     false,
      isNewArrival:     true,
      isSale:           false,
      status:           'Active',
      metaTitle:        'Men\'s Laptop Bag – Odhira',
      metaDescription:  'Professional laptop bag for men. Shop now at Odhira.',
      metaKeywords:     ['laptop bag', 'men office bag', 'work bag'],
    },
    {
      title:            'Men\'s Travel Backpack',
      slug:             makeSlug('Mens Travel Backpack'),
      shortDescription: 'Roomy travel backpack built for weekend adventures.',
      description:      'Built for the explorer, this 40L travel backpack features an expandable main compartment, side compression straps, a rain cover, and an ergonomic back system.',
      category:         catMap['men-bags'],
      collection:       colMap['trending-now'],
      brand:            'Odhira',
      tags:             ['trending', 'travel', 'men', 'backpack'],
      images: [
        { url: 'https://m.media-amazon.com/images/I/81l3rZK4lnL._AC_UY1100_.jpg', alt: 'Mens Travel Backpack', isPrimary: true },
      ],
      price:           2199,
      discountedPrice: 1979,
      gst:             18,
      variants: [
        { sku: 'MEN-TRV-BLK', size: 'Free Size', color: 'Black',   colorHex: '#000000', stock: 35 },
        { sku: 'MEN-TRV-KHK', size: 'Free Size', color: 'Khaki',   colorHex: '#C3B091', stock: 25 },
        { sku: 'MEN-TRV-NVY', size: 'Free Size', color: 'Navy',    colorHex: '#001F5B', stock: 20 },
      ],
      fabric:           'Cordura Nylon',
      careInstructions: 'Wipe with damp cloth.',
      occasion:         ['Travel', 'Trekking', 'Weekend Trip'],
      weight:           900,
      isFeatured:       true,
      isBestSeller:     false,
      isNewArrival:     false,
      isSale:           true,
      status:           'Active',
      metaTitle:        'Men\'s Travel Backpack – Odhira',
      metaDescription:  'Spacious travel backpack for men. Buy at Odhira.',
      metaKeywords:     ['travel backpack', 'men backpack', 'weekend bag'],
    },
    {
      title:            'Mens Brown Messenger Bag',
      slug:             makeSlug('Mens Brown Messenger Bag'),
      shortDescription: 'Classic brown messenger bag for everyday carry.',
      description:      'A timeless messenger bag in rich brown leather with a magnetic flap closure, adjustable crossbody strap, and multiple interior pockets for organisation.',
      category:         catMap['men-bags'],
      collection:       colMap['trending-now'],
      brand:            'Odhira',
      tags:             ['trending', 'messenger', 'brown', 'leather'],
      images: [
        { url: 'https://m.media-amazon.com/images/I/61+Z5b8kYrL._AC_UY1100_.jpg', alt: 'Mens Brown Messenger Bag', isPrimary: true },
      ],
      price:           1899,
      gst:             18,
      variants: [
        { sku: 'MEN-MSG-BRN', size: 'Free Size', color: 'Brown', colorHex: '#8B4513', stock: 30 },
      ],
      fabric:           'Genuine Leather',
      careInstructions: 'Condition monthly with leather cream.',
      occasion:         ['Work', 'Casual', 'College'],
      weight:           600,
      isFeatured:       false,
      isBestSeller:     false,
      isNewArrival:     false,
      isSale:           false,
      status:           'Active',
      metaTitle:        'Men\'s Brown Messenger Bag – Odhira',
      metaDescription:  'Classic leather messenger bag for men. Shop at Odhira.',
      metaKeywords:     ['messenger bag', 'men leather bag', 'brown bag'],
    },

    // ── UNISEX ────────────────────────────────────────────────────────────────
    {
      title:            'Unisex Duffel Gym Bag',
      slug:             makeSlug('Unisex Duffel Gym Bag'),
      shortDescription: 'High-capacity gym duffel for your workout essentials.',
      description:      'A durable gym duffel with a wet-dry compartment, shoe pocket, ventilated mesh side pockets, and a detachable shoulder strap. Perfect for gym, swimming, or sports.',
      category:         catMap['unisex-bags'],
      collection:       colMap['trending-now'],
      brand:            'Odhira',
      tags:             ['trending', 'popular', 'gym', 'duffel'],
      images: [
        { url: 'https://m.media-amazon.com/images/I/71LGukjcZeL._AC_UY1100_.jpg', alt: 'Unisex Duffel Gym Bag', isPrimary: true },
      ],
      price:           1599,
      discountedPrice: 1279,
      gst:             18,
      variants: [
        { sku: 'UNI-DFL-BLK', size: 'Free Size', color: 'Black', colorHex: '#000000', stock: 60 },
        { sku: 'UNI-DFL-RED', size: 'Free Size', color: 'Red',   colorHex: '#DC143C', stock: 40 },
        { sku: 'UNI-DFL-NVY', size: 'Free Size', color: 'Navy',  colorHex: '#001F5B', stock: 35 },
      ],
      fabric:           'Polyester',
      careInstructions: 'Machine wash cold, tumble dry low.',
      occasion:         ['Gym', 'Sports', 'Travel'],
      weight:           650,
      isFeatured:       true,
      isBestSeller:     true,
      isNewArrival:     false,
      isSale:           true,
      status:           'Active',
      metaTitle:        'Unisex Gym Duffel Bag – Odhira',
      metaDescription:  'High-capacity gym bag for men and women. Buy at Odhira.',
      metaKeywords:     ['gym bag', 'duffel bag', 'sports bag'],
    },
    {
      title:            'Formal Laptop Office Bag',
      slug:             makeSlug('Formal Laptop Office Bag'),
      shortDescription: 'Smart and sleek office bag for professionals.',
      description:      'A polished office bag featuring a 15.6" laptop compartment, document section, pen holders, and a trolley-sleeve for pairing with luggage during business travel.',
      category:         catMap['unisex-bags'],
      collection:       colMap['new-arrivals'],
      brand:            'Odhira',
      tags:             ['new', 'office', 'laptop', 'formal'],
      images: [
        { url: 'https://m.media-amazon.com/images/I/71yE+nDnUnL._AC_UY1100_.jpg', alt: 'Formal Laptop Office Bag', isPrimary: true },
      ],
      price:           1999,
      gst:             18,
      variants: [
        { sku: 'UNI-OFC-BLK', size: 'Free Size', color: 'Black', colorHex: '#000000', stock: 50 },
        { sku: 'UNI-OFC-NVY', size: 'Free Size', color: 'Navy',  colorHex: '#001F5B', stock: 30 },
      ],
      fabric:           'Nylon',
      careInstructions: 'Wipe with dry cloth.',
      occasion:         ['Work', 'Business Travel'],
      weight:           750,
      isFeatured:       false,
      isBestSeller:     false,
      isNewArrival:     true,
      isSale:           false,
      status:           'Active',
      metaTitle:        'Formal Laptop Office Bag – Odhira',
      metaDescription:  'Professional laptop office bag for men and women. Shop at Odhira.',
      metaKeywords:     ['office bag', 'laptop bag', 'formal bag'],
    },
    {
      title:            'Unisex Travel Duffel Bag',
      slug:             makeSlug('Unisex Travel Duffel Bag'),
      shortDescription: 'Compact travel duffel for weekend getaways.',
      description:      'A lightweight 30L travel duffel with a waterproof coating, exterior zip pocket, carry handles, and a detachable shoulder strap. Folds flat for easy storage.',
      category:         catMap['unisex-bags'],
      collection:       colMap['best-sellers'],
      brand:            'Odhira',
      tags:             ['popular', 'travel', 'duffel'],
      images: [
        { url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60', alt: 'Unisex Travel Duffel Bag', isPrimary: true },
      ],
      price:           1999,
      discountedPrice: 1599,
      gst:             18,
      variants: [
        { sku: 'UNI-TRV-BLK', size: 'Free Size', color: 'Black',  colorHex: '#000000', stock: 45 },
        { sku: 'UNI-TRV-OLV', size: 'Free Size', color: 'Olive',  colorHex: '#808000', stock: 30 },
      ],
      fabric:           'Polyester with PU coating',
      careInstructions: 'Wipe with damp cloth.',
      occasion:         ['Travel', 'Weekend Trip', 'Gym'],
      weight:           600,
      isFeatured:       false,
      isBestSeller:     true,
      isNewArrival:     false,
      isSale:           true,
      status:           'Active',
      metaTitle:        'Unisex Travel Duffel Bag – Odhira',
      metaDescription:  'Compact travel duffel for all. Buy at Odhira.',
      metaKeywords:     ['travel duffel', 'unisex bag', 'weekend bag'],
    },

    // ── ELDER ─────────────────────────────────────────────────────────────────
    {
      title:            'Elder Man Leather Bag',
      slug:             makeSlug('Elder Man Leather Bag'),
      shortDescription: 'Distinguished leather carry bag for the mature gentleman.',
      description:      'A refined full-grain leather bag with a spacious main compartment, internal dividers, and a top-zip closure. Ideal for everyday essentials or light travel.',
      category:         catMap['elder-bags'],
      collection:       null,
      brand:            'Odhira',
      tags:             ['leather', 'classic', 'men'],
      images: [
        { url: 'https://s.alicdn.com/@sc04/kf/Hc944b3a6d9b244ae964e5eb829394b10X.png_300x300.jpg', alt: 'Elder Man Leather Bag', isPrimary: true },
      ],
      price:           3499,
      gst:             18,
      variants: [
        { sku: 'ELD-MEN-TAN', size: 'Free Size', color: 'Tan',   colorHex: '#D2B48C', stock: 20 },
        { sku: 'ELD-MEN-BRN', size: 'Free Size', color: 'Brown', colorHex: '#8B4513', stock: 15 },
      ],
      fabric:           'Full-Grain Leather',
      careInstructions: 'Polish monthly. Store in dust bag.',
      occasion:         ['Casual', 'Travel', 'Formal'],
      weight:           900,
      isFeatured:       false,
      isBestSeller:     false,
      isNewArrival:     false,
      isSale:           false,
      status:           'Active',
      metaTitle:        'Elder Man Leather Bag – Odhira',
      metaDescription:  'Classic leather bag for men. Shop at Odhira.',
      metaKeywords:     ['elder men bag', 'leather bag', 'classic bag'],
    },
    {
      title:            'Elder Woman Classic Handbag',
      slug:             makeSlug('Elder Woman Classic Handbag'),
      shortDescription: 'Timeless handbag crafted for style and comfort.',
      description:      'An elegant classic handbag with structured shape, top handles, a zip closure, suede lining, and interior slip pockets. Built to last a lifetime.',
      category:         catMap['elder-bags'],
      collection:       colMap['limited-edition'],
      brand:            'Odhira',
      tags:             ['limited', 'classic', 'women', 'handbag'],
      images: [
        { url: 'https://m.media-amazon.com/images/I/71jQgFDHfdL._AC_UY1100_.jpg', alt: 'Elder Woman Classic Handbag', isPrimary: true },
      ],
      price:           1999,
      gst:             18,
      variants: [
        { sku: 'ELD-WOM-BLK', size: 'Free Size', color: 'Black',  colorHex: '#000000', stock: 20 },
        { sku: 'ELD-WOM-BRN', size: 'Free Size', color: 'Brown',  colorHex: '#8B4513', stock: 15 },
        { sku: 'ELD-WOM-BEG', size: 'Free Size', color: 'Beige',  colorHex: '#F5F5DC', stock: 10 },
      ],
      fabric:           'Structured PU Leather',
      careInstructions: 'Wipe with dry cloth. Store with stuffing.',
      occasion:         ['Casual', 'Shopping', 'Religious Visit'],
      weight:           550,
      isFeatured:       true,
      isBestSeller:     false,
      isNewArrival:     false,
      isSale:           false,
      status:           'Active',
      metaTitle:        'Elder Woman Classic Handbag – Odhira',
      metaDescription:  'Timeless classic handbag for women. Buy at Odhira.',
      metaKeywords:     ['elder women bag', 'classic handbag', 'structured bag'],
    },
  ];

  // Insert products one-by-one using save() so pre-save middleware runs
  let count = 0;
  for (const data of productsData) {
    const p = new Product(data);
    await p.save();
    count++;
  }

  console.log(`✅ ${count} products inserted successfully!`);
  await mongoose.disconnect();
  console.log('🔌 Disconnected from MongoDB');
}

seed().catch((err) => {
  console.error('❌ Seed error:', err);
  mongoose.disconnect();
});