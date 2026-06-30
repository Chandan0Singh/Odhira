require('dotenv').config();
const mongoose = require('mongoose');

// ─── Inline Schema (so seed runs standalone) ────────────────────────────────

const blogSchema = new mongoose.Schema(
  {
    title:         { type: String, required: true },
    description:   { type: String, trim: true, maxlength: 300 },
    category:      { type: String, required: true },
    content:       { type: String, required: true },
    featuredImage: String,
    status:        { type: String, enum: ['Published', 'Draft'], default: 'Draft' },
    author:        { type: String, default: 'Chandan Singh' },
    views:         { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Blog = mongoose.model('Blog', blogSchema);

// ─── Seed Data ───────────────────────────────────────────────────────────────

const blogsData = [
  {
    title:         'How to Style a Saree for Modern Occasions',
    description:   'From office to evening — five ways to wear a saree without losing its timeless charm.',
    category:      'Styling Tips',
    content:
      'The saree has long been a symbol of grace, but it does not have to feel reserved for weddings ' +
      'and festivals alone. Pair a Banarasi silk with a structured crop top and statement belt for a ' +
      'modern fusion look, or drape a lightweight cotton saree with sneakers for an easy daytime outfit. ' +
      'The key is in the accessories: swap traditional jewellery for minimal gold studs and a sleek potli ' +
      'bag when dressing it down, and lean into Kundan pieces when dressing it up. Confidence, more than ' +
      'fabric, is what makes a saree feel current.',
    featuredImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1200&q=80',
    status:        'Published',
    author:        'Chandan Singh',
    views:         482,
  },
  {
    title:         'The Art of Block Printing: A Craft Worth Preserving',
    description:   'A look into the centuries-old Ajrakh block printing tradition and the artisans keeping it alive.',
    category:      'Heritage & Craft',
    content:
      'Ajrakh block printing traces its roots back centuries, with techniques passed down through generations ' +
      'of artisan families in Gujarat and Sindh. Each piece goes through multiple stages of resist-dyeing, ' +
      'natural pigments, and hand-carved wooden blocks before a single stole or dupatta is complete. In an age ' +
      'of fast fashion, choosing hand block-printed textiles is both a style statement and a quiet act of ' +
      'preservation — supporting artisan communities whose craft cannot be replicated by machine.',
    featuredImage: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=1200&q=80',
    status:        'Published',
    author:        'Chandan Singh',
    views:         317,
  },
  {
    title:         '5 Bag Essentials Every Woman Needs This Season',
    description:   'Building a versatile bag wardrobe that works for work, travel, and everything between.',
    category:      'Buying Guides',
    content:
      'A well-edited bag collection does not need to be large — it needs to be intentional. Start with a ' +
      'structured tote for work, a compact sling for errands, an evening clutch for celebrations, a roomy ' +
      'duffel for weekend trips, and one statement piece that adds personality to an otherwise simple outfit. ' +
      'Investing in quality over quantity means each bag earns its place, and a good leather or vegan-leather ' +
      'piece will outlast several seasons of trends.',
    featuredImage: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1200&q=80',
    status:        'Published',
    author:        'Chandan Singh',
    views:         905,
  },
  {
    title:         'Packing Light: A Guide to the Perfect Travel Duffel',
    description:   'What to look for in a travel bag, and how to pack it efficiently for short getaways.',
    category:      'Travel',
    content:
      'A good travel duffel strikes a balance between structure and flexibility — enough shape to protect ' +
      'your belongings, but soft enough to squeeze into an overhead bin. Look for water-resistant fabric, ' +
      'a separate shoe compartment, and a strap that distributes weight evenly across the shoulder. When ' +
      'packing, roll rather than fold to save space, and use the interior pockets for items you will need ' +
      'first, like chargers or a change of clothes for a layover.',
    featuredImage: 'https://images.unsplash.com/photo-1598532163257-0bf54057d37a?w=1200&q=80',
    status:        'Published',
    author:        'Chandan Singh',
    views:         211,
  },
  {
    title:         'Caring for Leather: Tips to Make It Last a Lifetime',
    description:   'Simple maintenance habits that keep leather bags looking new for years.',
    category:      'Care Guides',
    content:
      'Genuine leather ages well when it is cared for, often looking better with time as it develops a natural ' +
      'patina. Condition your leather bags every few months with a quality leather cream, avoid prolonged sun ' +
      'exposure which can dry and crack the surface, and store bags with stuffing to help them hold their shape. ' +
      'If your bag gets wet, let it air dry naturally away from direct heat — never use a hairdryer, as it can ' +
      'cause the leather to stiffen and crack.',
    featuredImage: 'https://m.media-amazon.com/images/I/61JDYw+5P6L._AC_UY1100_.jpg',
    status:        'Draft',
    author:        'Chandan Singh',
    views:         0,
  },
  {
    title:         'Gifting Guide: Accessories for Every Personality',
    description:   'A curated gifting guide for the festive season, organized by who you are shopping for.',
    category:      'Gift Guides',
    content:
      'Finding the right gift starts with knowing who you are shopping for. For the minimalist, a pair of ' +
      'oxidised silver bangles works as an understated everyday accessory. For someone who loves color and ' +
      'pattern, a hand-painted potli bag makes a memorable statement piece. The traditionalist will appreciate ' +
      'a hand-embroidered clutch, while the practical dresser will get the most use out of a versatile ikat ' +
      'woven belt that pairs with both ethnic and western outfits.',
    featuredImage: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1200&q=80',
    status:        'Draft',
    author:        'Chandan Singh',
    views:         0,
  },
];

// ─── Main Seeder ─────────────────────────────────────────────────────────────

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('✅ Connected to MongoDB');

  // Clear old data
  await Blog.deleteMany({});
  console.log('🗑️  Cleared old blog data');

  // Insert blogs
  const inserted = await Blog.insertMany(blogsData);
  console.log(`✅ ${inserted.length} blogs inserted successfully!`);

  await mongoose.disconnect();
  console.log('🔌 Disconnected from MongoDB');
}

seed().catch((err) => {
  console.error('❌ Seed error:', err);
  mongoose.disconnect();
});