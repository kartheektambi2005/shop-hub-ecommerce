import newSeasonImage from '../../assets/hero-banner.svg';
import electronicsImage from '../../assets/hero-electronics.svg';
import fashionImage from '../../assets/hero-fashion.svg';
import beautyHomeImage from '../../assets/hero-beauty-home.svg';

export const HERO_SLIDES = [
  {
    id: 'new-season',
    theme: 'blue',
    badge: 'New Season Arrivals',
    title: 'Everything you need, one cart away.',
    text: 'Electronics, fashion, beauty and home essentials, sourced from trusted brands and delivered to your door.',
    cta: { label: 'Shop Now', to: '/products' },
    image: newSeasonImage,
  },
  {
    id: 'electronics',
    theme: 'indigo',
    badge: 'Electronics',
    title: 'Smart tech at smarter prices.',
    text: 'Phones, laptops and accessories from brands you trust, with fast delivery.',
    cta: { label: 'Shop Electronics', to: '/products?category=smartphones' },
    image: electronicsImage,
  },
  {
    id: 'fashion',
    theme: 'plum',
    badge: 'Fashion',
    title: 'Style that fits every moment.',
    text: 'Dresses, shirts, shoes and accessories to refresh your wardrobe this season.',
    cta: { label: 'Shop Fashion', to: '/products?category=womens-dresses' },
    image: fashionImage,
  },
  {
    id: 'beauty-home',
    theme: 'green',
    badge: 'Beauty & Home',
    title: 'Glow up your space and yourself.',
    text: 'Beauty favourites and home decor picked to make everyday feel a little special.',
    cta: { label: 'Shop Beauty', to: '/products?category=beauty' },
    image: beautyHomeImage,
  },
];
