const mongoose = require("mongoose");
const slugify = require("slugify");

// ====================== VARIANT ======================

const variantSchema = new mongoose.Schema(
  {
    sku: {
      type: String,
      trim: true,
    },

    size: {
      type: String,
      enum: ["XS", "S", "M", "L", "XL", "XXL", "Free Size", "Custom"],
    },

    color: {
      type: String,
      trim: true,
    },

    colorHex: String,

    image: String,

    price: Number,

    discountedPrice: Number,

    stock: {
      type: Number,
      default: 0,
    },
  },
  { _id: false }
);

// ====================== REVIEW ======================

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },

    comment: String,
  },
  {
    timestamps: true,
  }
);

// ====================== IMAGE ======================

const imageSchema = new mongoose.Schema(
  {
    url: String,
    alt: String,
    isPrimary: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false }
);

// ====================== PRODUCT ======================

const productSchema = new mongoose.Schema(
  {
    // BASIC

    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },

    shortDescription: String,

    description: String,

    // CATEGORY

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    collection: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Collection",
    },

    brand: {
      type: String,
      default: "Odhira",
    },

    tags: [String],

    // IMAGES

    images: [imageSchema],

    // PRICING

    price: {
      type: Number,
      required: true,
    },

    discountedPrice: Number,

    gst: {
      type: Number,
      default: 0,
    },

    // INVENTORY

    variants: [variantSchema],

    totalStock: {
      type: Number,
      default: 0,
    },

    sold: {
      type: Number,
      default: 0,
    },

    wishlistCount: {
      type: Number,
      default: 0,
    },

    views: {
      type: Number,
      default: 0,
    },

    // DETAILS

    fabric: String,

    handwork: String,

    sleeveType: String,

    neckline: String,

    fit: String,

    careInstructions: String,

    customizable: {
      type: Boolean,
      default: false,
    },

    occasion: [
      {
        type: String,
      },
    ],

    // SHIPPING

    weight: Number,

    length: Number,

    width: Number,

    height: Number,

    // FLAGS

    isFeatured: {
      type: Boolean,
      default: false,
    },

    isBestSeller: {
      type: Boolean,
      default: false,
    },

    isNewArrival: {
      type: Boolean,
      default: false,
    },

    isSale: {
      type: Boolean,
      default: false,
    },

    // STATUS

    status: {
      type: String,
      enum: ["Draft", "Active", "Inactive", "Archived"],
      default: "Draft",
    },

    // SEO

    metaTitle: String,

    metaDescription: String,

    metaKeywords: [String],

    // LOOKBOOK

    lookbookImages: [String],

    styleNotes: String,

    // REVIEWS

    reviews: [reviewSchema],

    averageRating: {
      type: Number,
      default: 0,
    },

    totalReviews: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// ====================== INDEXES ======================

productSchema.index({ slug: 1 });

productSchema.index({ category: 1 });

productSchema.index({ collection: 1 });

productSchema.index({ status: 1 });

productSchema.index({ isFeatured: 1 });

productSchema.index({ price: 1 });

productSchema.index({ sold: -1 });

// ====================== VIRTUAL ======================

productSchema.virtual("discountPercent").get(function () {
  if (!this.discountedPrice) return 0;

  return Math.round(
    ((this.price - this.discountedPrice) / this.price) * 100
  );
});

// ====================== MIDDLEWARE ======================

productSchema.pre("save", function (next) {
  if (!this.slug) {
    this.slug = slugify(this.title, {
      lower: true,
      strict: true,
    });
  }

  if (this.variants.length) {
    this.totalStock = this.variants.reduce(
      (sum, item) => sum + item.stock,
      0
    );
  }

  if (this.totalStock === 0) {
    this.isSale = this.discountedPrice ? true : false;
  }

  if (this.reviews.length) {
    this.totalReviews = this.reviews.length;

    this.averageRating =
      this.reviews.reduce((sum, item) => sum + item.rating, 0) /
      this.reviews.length;
  }

  next();
});

module.exports = mongoose.model("Product", productSchema);