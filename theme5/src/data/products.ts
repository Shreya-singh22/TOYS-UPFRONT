export interface Product {
    id: string;
    name: string;
    price: number;
    rating: number;
    reviews: number;
    age: string;
    category: string;
    image: string;
    images?: string[];
    description: string;
    longDescription?: string;
    skills: string[];
    specifications?: Record<string, string>;
    featured?: boolean;
    trending?: boolean;
    badge?: string;
    originalPrice?: number;
    dateAdded: string;
    tags?: string[];
}

export const products: Product[] = [
    {
        id: "1",
        name: "Magnetic Building Blocks",
        price: 1299,
        rating: 4.9,
        reviews: 2140,
        age: "3-5 Years",
        category: "Learning Toys",
        image: "/images/products/magnetic_blocks.png",
        images: ["/images/products/magnetic_blocks.png", "/images/products/magnetic_blocks.png"],
        description: "Spark your child's imagination with our 3D Magnetic Building Blocks. Perfect for developing spatial reasoning and motor skills.",
        longDescription: "Our Magnetic Building Blocks are designed to inspire creativity and cognitive development. With 64 vibrant, high-quality pieces, children can build anything from simple houses to complex geometric structures. The magnets are securely encased in durable, non-toxic ABS plastic, ensuring safety and longevity.",
        skills: ["Creativity", "Problem Solving", "Motor Skills"],
        specifications: {
            "Material": "Non-Toxic ABS Plastic",
            "Pieces": "64",
            "Box Weight": "1.2kg",
            "Safety": "ASTM & EN71 Certified"
        },
        featured: true,
        trending: true,
        badge: "Best Seller",
        originalPrice: 1599,
        dateAdded: "2024-01-15",
        tags: ["STEM", "Creative"]
    },
    {
        id: "2",
        name: "Dino Adventure Set",
        price: 899,
        rating: 4.7,
        reviews: 850,
        age: "3-5 Years",
        category: "Creative Toys",
        image: "/images/products/dino_set.png",
        images: ["/images/products/dino_set.png", "/images/products/dino_set.png"],
        description: "Travel back in time with this interactive dinosaur playset. includes 12 realistic dinosaurs and a play mat.",
        longDescription: "The Dino Adventure Set is more than just a toy; it's a gateway to the prehistoric world. Featuring 12 hand-painted, realistic dinosaur figures and a large, durable play mat, it encourages hours of imaginative play and social interaction. Perfect for young paleontologists.",
        skills: ["Imagination", "Social Skills"],
        specifications: {
            "Material": "BPA-Free PVC",
            "Figures": "12",
            "Mat Size": "80cm x 70cm",
            "Age Range": "3-8 Years"
        },
        featured: true,
        badge: "New",
        originalPrice: 1199,
        dateAdded: "2024-03-01",
        tags: ["Outdoor", "Adventure"]
    },
    {
        id: "3",
        name: "Solar System STEM Kit",
        price: 1499,
        rating: 4.8,
        reviews: 124,
        age: "9-12 Years",
        category: "STEM Toys",
        image: "/images/products/solar_system.png",
        images: ["/images/products/solar_system.png", "/images/products/solar_system.png"],
        description: "Build and paint your own glowing solar system model. A perfect introduction to astronomy and science.",
        longDescription: "Unlock the mysteries of the universe with our Solar System STEM Kit. This comprehensive kit contains everything kids need to assemble and paint a realistic, rotating model of our solar system. The planets glow in the dark, adding a magical touch to any bedroom. Includes a detailed educational guide.",
        skills: ["STEM", "Cognitive Skills", "Creativity"],
        specifications: {
            "Includes": "8 Planets, Sun, Stand, Paint, Brush",
            "Special Feature": "Glow-in-the-dark paint",
            "Difficulty": "Intermediate",
            "Educational Focus": "Astronomy"
        },
        featured: true,
        trending: true,
        badge: "STEM Choice",
        originalPrice: 1899,
        dateAdded: "2024-02-10",
        tags: ["STEM", "Science"]
    },
    {
        id: "4",
        name: "Wooden Alphabet Puzzle",
        price: 499,
        rating: 4.6,
        reviews: 430,
        age: "0-2 Years",
        category: "Learning Toys",
        image: "/images/products/alphabet_puzzle.png",
        images: ["/images/products/alphabet_puzzle.png", "/images/products/alphabet_puzzle.png"],
        description: "Chunky wooden letters that are easy for small hands to grasp. Helps with letter recognition and coordination.",
        longDescription: "Our Wooden Alphabet Puzzle is the perfect first step into the world of letters. Each letter is crafted from solid sustainable wood and painted with child-safe, water-based paints. The chunky pieces are easy for toddlers to hold and fit perfectly into the corresponding slots, developing fine motor skills and letter shape awareness.",
        skills: ["Language", "Motor Skills"],
        specifications: {
            "Material": "Sustainable Beech Wood",
            "Coating": "Water-based Non-toxic Ink",
            "Dimensions": "30cm x 22cm",
            "Age": "12 Months+"
        },
        featured: true,
        trending: true,
        badge: "Top Rated",
        dateAdded: "2023-12-20",
        tags: ["Learning", "Toddler"]
    },
    {
        id: "5",
        name: "Remote Control Stunt Car",
        price: 1999,
        rating: 4.9,
        reviews: 3200,
        age: "6-8 Years",
        category: "Vehicles",
        image: "/images/products/magnetic_blocks.png",
        description: "High-speed stunt car with 360-degree rotation. Built for durability and endless racing fun.",
        longDescription: "Get ready for high-octane excitement! This RC Stunt Car features double-sided driving and amazing 360-degree flips. With a robust 2.4GHz remote system, multiple cars can race at once without interference. Built with high-quality ABS plastic to withstand tumbles and crashes.",
        skills: ["Coordination", "Reflexes"],
        specifications: {
            "Battery": "Rechargeable 500mAh",
            "Range": "30 Meters",
            "Speed": "12 km/h",
            "Charging Time": "60 Minutes"
        },
        featured: true,
        badge: "Fast Seller",
        originalPrice: 2499,
        dateAdded: "2024-03-05",
        tags: ["RC", "Action"]
    },
    {
        id: "6",
        name: "Watercolor Painting Station",
        price: 749,
        rating: 4.5,
        reviews: 680,
        age: "6-8 Years",
        category: "Arts & Crafts",
        image: "/images/lifestyle/kids_playing.png",
        description: "Complete watercolor set with 24 vibrant colors, brushes, and professional-grade paper.",
        longDescription: "Unleash your inner artist with our premium Watercolor Painting Station. This all-in-one kit includes 24 highly pigmented, non-toxic watercolor cakes, three anti-shedding brushes, and a pad of 300gsm professional watercolor paper. The portable case also serves as a mixing palette.",
        skills: ["Creativity", "Fine Motor Skills"],
        specifications: {
            "Colors": "24 Vibrant Shades",
            "Paper": "10 Sheets 300gsm",
            "Safety": "AP Certified Non-Toxic",
            "Brushes": "3 Nylon Detail Brushes"
        },
        featured: true,
        trending: true,
        originalPrice: 999,
        dateAdded: "2024-02-25",
        tags: ["Art", "Creative"]
    }
];

export const categories = [
    { title: "Educational Toys", icon: "🧠", color: "#FF7A59" },
    { title: "Puzzles & Games", icon: "🧩", color: "#6BCBFF" },
    { title: "Vehicles", icon: "🚗", color: "#FFD93D" },
    { title: "Arts & Crafts", icon: "🎨", color: "#FF7A59" },
    { title: "Outdoor Toys", icon: "🌿", color: "#6BCBFF" },
    { title: "Plush Toys", icon: "🧸", color: "#FFD93D" }
];

export const ageCategories = [
    { title: "Sensory Toys", age: "0-2 Years", icon: "👶", color: "#6BCBFF", image: "/images/products/alphabet_puzzle.png" },
    { title: "Learning Toys", age: "3-5 Years", icon: "🏫", color: "#FF7A59", image: "/images/products/dino_set.png" },
    { title: "Creative Toys", age: "6-8 Years", icon: "🎨", color: "#FFD93D", image: "/images/products/magnetic_blocks.png" },
    { title: "STEM Toys", age: "9-12 Years", icon: "🚀", color: "#6BCBFF", image: "/images/products/solar_system.png" }
];

export const testimonials = [
    {
        rating: 5,
        text: "Finally a toy store that focuses on learning toys. My kids love the puzzles!",
        author: "Riya Sharma",
        location: "Delhi",
        avatar: "/images/parent1.png"
    },
    {
        rating: 5,
        text: "Great quality toys and fast delivery. The magnetic blocks are a huge hit.",
        author: "Amit Patel",
        location: "Mumbai",
        avatar: "/images/parent2.png"
    },
    {
        rating: 5,
        text: "Love the educational focus. The STEM kits are very engaging for my 10-year-old.",
        author: "Sneha Kapur",
        location: "Bangalore",
        avatar: "/images/parent3.png"
    }
];

export const blogPosts = [
    {
        title: "10 Toys That Improve Creativity",
        image: "/images/lifestyle/kids_playing.png",
        date: "March 10, 2024"
    },
    {
        title: "Best Toys for 3 Year Olds",
        image: "/images/lifestyle/hero_child_playing.png",
        date: "March 5, 2024"
    },
    {
        title: "STEM Toys Every Kid Should Try",
        image: "/images/products/solar_system.png",
        date: "Feb 28, 2024"
    }
];
