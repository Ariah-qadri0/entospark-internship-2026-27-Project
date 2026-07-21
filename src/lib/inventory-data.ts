export type Category =
  | "Stationery"
  | "Notebooks"
  | "Academic Books"
  | "Sports"
  | "Uniforms";

export const CATEGORIES: Category[] = [
  "Stationery",
  "Notebooks",
  "Academic Books",
  "Sports",
  "Uniforms",
];

export type Condition = "New" | "Like New" | "Good" | "Used";

export interface Item {
  id: string;
  title: string;
  description: string;
  price: number;
  category: Category;
  condition: Condition;
  seller: string;
  college: string;
  image: string;
  /** Optional emoji/icon shown instead of image when set. */
  icon?: string;
  stock: number;
  createdAt: number;
}

const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=80`;

export const SEED_ITEMS: Item[] = [
  {
    id: "seed-1",
    title: "A5 Ruled Notebook (200 pages)",
    description:
      "Barely used A5 hardbound notebook, 200 pages, perfectly ruled. Great for lecture notes.",
    price: 80,
    category: "Notebooks",
    condition: "Like New",
    seller: "Aarav Mehta",
    college: "IIT Bombay",
    image: img("photo-1531346878377-a5be20888e57"),
    stock: 4,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
  },
  {
    id: "seed-2",
    title: "Engineering Mathematics — B.S. Grewal",
    description:
      "43rd edition, all pages intact. Minor highlights in chapter 3. A must-have for semester 1 & 2.",
    price: 320,
    category: "Academic Books",
    condition: "Good",
    seller: "Priya Sharma",
    college: "NIT Trichy",
    image: img("photo-1544947950-fa07a98d237f"),
    stock: 1,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 5,
  },
  {
    id: "seed-3",
    title: "Rotring 600 Mechanical Pencil 0.5mm",
    description:
      "Iconic all-metal drafting pencil. Comes with spare leads and eraser.",
    price: 950,
    category: "Stationery",
    condition: "Like New",
    seller: "Rohit Verma",
    college: "BITS Pilani",
    image: img("photo-1455390582262-044cdead277a"),
    stock: 2,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 1,
  },
  {
    id: "seed-4",
    title: "Spalding Street Basketball — Size 7",
    description:
      "Outdoor rubber basketball, used two seasons, still bouncy. Perfect for campus courts.",
    price: 650,
    category: "Sports",
    condition: "Good",
    seller: "Kabir Singh",
    college: "Delhi University",
    image: img("photo-1546519638-68e109498ffc"),
    stock: 1,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 7,
  },
  {
    id: "seed-5",
    title: "College Uniform Blazer — Size M",
    description:
      "Navy blazer with college crest. Dry-cleaned and ready. Fits chest 38–40.",
    price: 1200,
    category: "Uniforms",
    condition: "Like New",
    seller: "Ananya Nair",
    college: "Christ University",
    image: img("photo-1516762689617-e1cffcef479d"),
    stock: 1,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 3,
  },
  {
    id: "seed-6",
    title: "Pilot G2 Gel Pens — Pack of 6",
    description: "Blue and black gel pens, 0.7mm. Two lightly used, four unopened.",
    price: 220,
    category: "Stationery",
    condition: "Like New",
    seller: "Ishaan Kapoor",
    college: "VIT Vellore",
    image: img("photo-1583485088034-697b5bc36b92"),
    stock: 8,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 4,
  },
  {
    id: "seed-7",
    title: "Introduction to Algorithms — CLRS",
    description:
      "3rd edition, hardcover. Standard reference for DSA courses. Minor cover wear.",
    price: 850,
    category: "Academic Books",
    condition: "Good",
    seller: "Meera Iyer",
    college: "IIIT Hyderabad",
    image: img("photo-1512820790803-83ca734da794"),
    stock: 1,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 10,
  },
  {
    id: "seed-8",
    title: "Yonex Badminton Racket + 3 shuttles",
    description:
      "Nanoray light racket with cover, plus a tube of nylon shuttles. Well maintained.",
    price: 1400,
    category: "Sports",
    condition: "Good",
    seller: "Devansh Rao",
    college: "SRM Chennai",
    image: img("photo-1626224583764-f87db24ac4ea"),
    stock: 1,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 6,
  },
  {
    id: "seed-9",
    title: "Sports Kit — White Shorts & Tee",
    description:
      "Standard PE uniform set, size L. Washed and pressed. Ideal for freshers.",
    price: 450,
    category: "Uniforms",
    condition: "Good",
    seller: "Sneha Pillai",
    college: "Loyola Chennai",
    image: img("photo-1556906781-9a412961c28c"),
    stock: 3,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 8,
  },
  {
    id: "seed-10",
    title: "Grid Notebook — Dotted A4",
    description:
      "Dotted A4 notebook, 160gsm paper. Great for bullet journaling and design.",
    price: 260,
    category: "Notebooks",
    condition: "New",
    seller: "Zoya Khan",
    college: "Jamia Millia",
    image: img("photo-1519337265831-281ec6cc8514"),
    stock: 5,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 1,
  },
  {
    id: "seed-11",
    title: "Casio FX-991ES Plus Calculator",
    description:
      "Non-programmable scientific calculator, approved for most exams. Working perfectly.",
    price: 700,
    category: "Stationery",
    condition: "Good",
    seller: "Aditya Joshi",
    college: "COEP Pune",
    image: img("photo-1587145820266-a5951ee6f620"),
    stock: 1,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 12,
  },
  {
    id: "seed-12",
    title: "Signals & Systems — Oppenheim",
    description:
      "2nd edition, Prentice Hall. Course reference for EE/ECE. Notes lightly written in pencil.",
    price: 520,
    category: "Academic Books",
    condition: "Used",
    seller: "Nikhil Das",
    college: "IIT Madras",
    image: img("photo-1497633762265-9d179a990aa6"),
    stock: 1,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 15,
  },
];
