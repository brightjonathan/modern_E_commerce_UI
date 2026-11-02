
//Navigation data
export const mainNav = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/products" },
  {
    label: "Categories",
    href: "/products",
    children: [
      { label: "Electronics", href: "/categories/electronics", emoji: "💻" },
      { label: "Audio", href: "/categories/audio", emoji: "🎧" },
      { label: "Fashion", href: "/categories/fashion", emoji: "👟" },
      { label: "Home & Living", href: "/categories/home-living", emoji: "🛋️" },
      { label: "Beauty", href: "/categories/beauty", emoji: "✨" },
      { label: "Sports", href: "/categories/sports", emoji: "🏋️" },
    ],
  },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];


//Announcements data 
export const announcements = [
  "🚚 Free shipping on orders over $75",
  "🎁 Use code WELCOME10 for 10% off your first order",
  "↩️ 30-day hassle-free returns",
];
