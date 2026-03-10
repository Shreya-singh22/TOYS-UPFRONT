import toyStacker from "@/assets/toy-stacker.jpg";
import toyBlocks from "@/assets/toy-blocks.jpg";
import toyDuck from "@/assets/toy-duck.jpg";
import toyTrain from "@/assets/toy-train.jpg";
import toyPuzzle from "@/assets/toy-puzzle.jpg";
import toyTop from "@/assets/toy-top.jpg";
import toyXylophone from "@/assets/toy-xylophone.jpg";
import toySailboat from "@/assets/toy-sailboat.jpg";
import toyRobot from "@/assets/toy-robot.jpg";
import toyMagneticTiles from "@/assets/toy-magnetic-tiles.jpg";
import toyAlphabet from "@/assets/toy-alphabet.jpg";
import toyBicycle from "@/assets/toy-bicycle.jpg";
import toyFootball from "@/assets/toy-football.jpg";
import toyWater from "@/assets/toy-water.jpg";
import toyMath from "@/assets/toy-math.jpg";

export type Product = {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: any;
  category: "educational" | "outdoor" | "new" | "stem";
  ageRange: string;
  rating: number;
  reviews: number;
  badge?: "sale" | "new" | "parent-favorite";
  description?: string;
  highlights?: string[];
  features?: { title: string; desc: string }[];
  faqs?: { q: string; a: string }[];
  lifestyleImage?: any;
};


export const products: Product[] = [
  {
    id: "1",
    name: "Rainbow Stacker",
    price: 1499,
    image: toyStacker,
    category: "educational",
    ageRange: "0-2 Years",
    rating: 4.8,
    reviews: 240,
    badge: "parent-favorite",
    description: "The Classic Rainbow Stacker is a must-have for every nursery. These colorful wooden rings help develop fine motor skills and color recognition through creative play.",
    highlights: [
      "Develops fine motor skills",
      "Handcrafted from sustainable wood",
      "Non-toxic, child-safe paints",
      "Perfect for sensory development"
    ],
    features: [
      { title: "Eco-Friendly", desc: "Made from FSC-certified wood." },
      { title: "Safe Play", desc: "Tested for safety standards." }
    ],
    faqs: [
      { q: "Is it safe for toddlers?", a: "Yes, it is designed for ages 0 and up with non-toxic materials." }
    ]
  },
  {
    id: "2",
    name: "Building Blocks Set",
    price: 2499,
    image: toyBlocks,
    category: "educational",
    ageRange: "2-4 Years",
    rating: 4.9,
    reviews: 189,
    description: "The 50-piece Building Blocks Set encourages open-ended play and structural thinking. High-quality wooden blocks in various shapes and colors.",
    highlights: [
      "Encourages creative building",
      "Improve hand-eye coordination",
      "Includes storage bag",
      "Durable and long-lasting"
    ]
  },
  { id: "3", name: "Pull-Along Duck", price: 899, image: toyDuck, category: "outdoor", ageRange: "1-3 Years", rating: 4.7, reviews: 156 },
  { id: "4", name: "Classic Train Set", price: 2999, image: toyTrain, category: "educational", ageRange: "3-5 Years", rating: 4.9, reviews: 312, badge: "parent-favorite" },
  { id: "5", name: "Shape Puzzle Board", price: 1299, image: toyPuzzle, category: "educational", ageRange: "2-4 Years", rating: 4.6, reviews: 98 },
  { id: "6", name: "Spinning Top", price: 599, originalPrice: 999, image: toyTop, category: "new", ageRange: "3-6 Years", rating: 4.5, reviews: 67, badge: "sale" },
  { id: "7", name: "Rainbow Xylophone", price: 1799, image: toyXylophone, category: "educational", ageRange: "2-5 Years", rating: 4.8, reviews: 201 },
  { id: "8", name: "Wooden Sailboat", price: 1599, image: toySailboat, category: "outdoor", ageRange: "4-8 Years", rating: 4.7, reviews: 143 },
  {
    id: "9",
    name: "STEM Robot Kit",
    price: 3999,
    image: toyRobot,
    category: "stem",
    ageRange: "6-12 Years",
    rating: 4.9,
    reviews: 278,
    badge: "parent-favorite",
    description: "The STEM Coding Robot Kit introduces children to robotics and programming in a fun and interactive way. Kids can assemble the robot and program simple movements.",
    highlights: [
      "Develops problem-solving skills",
      "Safe and eco-friendly materials",
      "Easy to assemble",
      "Perfect gift for kids"
    ],
    features: [
      { title: "STEM Learning", desc: "Introduces basic coding logic." },
      { title: "Interactive", desc: "Responds to sound and touch." }
    ],
    faqs: [
      { q: "Are batteries included?", a: "No, 4 AA batteries are required." },
      { q: "Is assembly required?", a: "Yes, clear step-by-step instructions are included." }
    ]
  },
  { id: "10", name: "Magnetic Tiles", price: 3499, image: toyMagneticTiles, category: "stem", ageRange: "3-8 Years", rating: 4.9, reviews: 456, badge: "parent-favorite" },
  { id: "11", name: "Alphabet Puzzle", price: 1199, image: toyAlphabet, category: "educational", ageRange: "2-5 Years", rating: 4.6, reviews: 134 },
  { id: "12", name: "Kids Balance Bike", price: 5499, originalPrice: 7999, image: toyBicycle, category: "outdoor", ageRange: "3-6 Years", rating: 4.8, reviews: 267, badge: "sale" },
  { id: "13", name: "Football Goal Set", price: 2199, image: toyFootball, category: "outdoor", ageRange: "4-10 Years", rating: 4.5, reviews: 89, badge: "new" },
  { id: "14", name: "Bath Toy Collection", price: 899, image: toyWater, category: "outdoor", ageRange: "1-4 Years", rating: 4.4, reviews: 178 },
  { id: "15", name: "Math Counting Board", price: 1699, image: toyMath, category: "educational", ageRange: "3-6 Years", rating: 4.7, reviews: 156 },
];



export const bestSellers = products.filter(p => p.reviews > 200);
export const parentFavorites = products.filter(p => p.badge === "parent-favorite");
export const educationalProducts = products.filter(p => p.category === "educational");
export const outdoorProducts = products.filter(p => p.category === "outdoor");
export const newArrivals = products.filter(p => p.badge === "new" || p.category === "new");
export const stemProducts = products.filter(p => p.category === "stem");
