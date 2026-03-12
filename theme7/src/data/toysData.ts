export interface Review {
    id: number;
    user: string;
    rating: number;
    comment: string;
    date: string;
}

export interface Specification {
    label: string;
    value: string;
}

export interface Product {
    id: number;
    name: string;
    brand: string;
    price: number;
    oldPrice?: number;
    images: string[];
    rating: number;
    reviewCount: number;
    category: string;
    isNew?: boolean;
    isTopRated?: boolean;
    stockStatus: 'In Stock' | 'Low Stock' | 'Out of Stock';
    stockCount?: number;
    description: string;
    specifications: Specification[];
    safetyFeatures: string[];
    reviews: Review[];
}

export const bannerImages = [
    '/images/hero_banner_1_1773298853665.png',
    '/images/hero_banner_2_1773298876754.png',
    '/images/hero_banner_3_1773298895719.png',
];

export const products: Product[] = [
    {
        id: 1,
        name: 'Wooden Safari Giraffe',
        brand: 'WildWoods',
        price: 1999,
        oldPrice: 2499,
        images: [
            '/images/toy_giraffe_1773298917765.png',
            '/images/hero_banner_1_1773298853665.png',
            '/images/toy_giraffe_1773298917765.png',
            '/images/hero_banner_1_1773298853665.png',
            '/images/toy_giraffe_1773298917765.png',
        ],
        rating: 4.8,
        reviewCount: 156,
        category: 'Educational',
        isTopRated: true,
        stockStatus: 'Low Stock',
        stockCount: 5,
        description: 'A beautifully crafted wooden giraffe pull toy designed to help toddlers develop motor skills and coordination while exploring the animal kingdom.',
        specifications: [
            { label: 'Age Group', value: '18 Months - 3 Years' },
            { label: 'Material', value: 'Natural Beech Wood' },
            { label: 'Dimensions', value: '15 x 8 x 25 cm' },
            { label: 'Weight', value: '450g' },
        ],
        safetyFeatures: [
            'Non-toxic water-based paint',
            'Smooth edges for safety',
            'BPA-free materials',
            'Sturdy pull cord'
        ],
        reviews: [
            { id: 1, user: 'Priya S.', rating: 5, comment: 'Beautiful quality and my son loves pulling it around!', date: '2024-02-15' },
            { id: 2, user: 'Rahul M.', rating: 4, comment: 'Very sturdy, but a bit smaller than expected.', date: '2024-03-01' },
        ]
    },
    {
        id: 2,
        name: 'Architect Building Blocks',
        brand: 'ToyLand',
        price: 799,
        oldPrice: 999,
        images: [
            '/images/toy_blocks_1773298935469.png',
            '/images/hero_banner_2_1773298876754.png',
            '/images/toy_blocks_1773298935469.png',
            '/images/hero_banner_2_1773298876754.png',
            '/images/toy_blocks_1773298935469.png',
        ],
        rating: 4.5,
        reviewCount: 210,
        category: 'Educational',
        isNew: true,
        stockStatus: 'In Stock',
        description: 'This colorful building block set helps children improve creativity, motor skills, and problem-solving abilities with 120 unique pieces.',
        specifications: [
            { label: 'Age Group', value: '3 - 6 Years' },
            { label: 'Material', value: 'Non-toxic high-grade plastic' },
            { label: 'Pieces', value: '120 blocks' },
            { label: 'Category', value: 'Educational Toys' },
        ],
        safetyFeatures: [
            'BPA free',
            'Child safe edges',
            'Educational learning toy',
            'Improves creativity & motor skills'
        ],
        reviews: [
            { id: 1, user: 'Amit K.', rating: 5, comment: 'Great educational toy! My 5-year-old loves it.', date: '2024-02-20' },
        ]
    },
    {
        id: 3,
        name: 'Cuddle Buddy Bear',
        brand: 'SoftSnuggles',
        price: 1299,
        oldPrice: 1599,
        images: [
            '/images/toy_bear_1773298956244.png',
            '/images/hero_banner_3_1773298895719.png',
            '/images/toy_bear_1773298956244.png',
            '/images/hero_banner_3_1773298895719.png',
        ],
        rating: 4.7,
        reviewCount: 342,
        category: 'By Age',
        isTopRated: true,
        stockStatus: 'In Stock',
        description: 'The softest teddy bear you will ever meet. Perfect for bedtime snuggles and comforting young children.',
        specifications: [
            { label: 'Age Group', value: '0+ Months' },
            { label: 'Material', value: 'Ultra-soft Plush' },
            { label: 'Height', value: '30 cm' },
        ],
        safetyFeatures: [
            'Hypoallergenic fabric',
            'Securely stitched eyes',
            'Machine washable'
        ],
        reviews: [
            { id: 1, user: 'Sneha R.', rating: 5, comment: 'So soft! My daughter takes it everywhere.', date: '2024-01-10' },
        ]
    },
    {
        id: 4,
        name: 'Sparky the Robot',
        brand: 'TechToys',
        price: 3499,
        oldPrice: 4299,
        images: [
            '/images/toy_robot_1773298977373.png',
            '/images/hero_banner_1_1773298853665.png',
            '/images/toy_robot_1773298977373.png',
            '/images/hero_banner_3_1773298895719.png',
        ],
        rating: 5.0,
        reviewCount: 89,
        category: 'New Arrivals',
        isNew: true,
        stockStatus: 'Low Stock',
        stockCount: 2,
        description: 'An interactive companion that teaches basic coding and logic through fun games and voice commands.',
        specifications: [
            { label: 'Age Group', value: '6 - 10 Years' },
            { label: 'Battery', value: 'Rechargeable Li-ion' },
            { label: 'Features', value: 'Voice recognition, Programmable' },
        ],
        safetyFeatures: [
            'Enclosed battery compartment',
            'Non-toxic plastic',
            'Volume control limited for safety'
        ],
        reviews: [
            { id: 1, user: 'Vikram L.', rating: 5, comment: 'Incredible robot, really engages the kids in STEM.', date: '2024-03-05' },
        ]
    },
    {
        id: 5,
        name: 'Speedster Kids Bicycle',
        brand: 'GearUp',
        price: 5499,
        oldPrice: 6999,
        images: [
            '/images/hero_banner_2_1773298876754.png',
            '/images/hero_banner_1_1773298853665.png',
            '/images/hero_banner_2_1773298876754.png',
        ],
        rating: 4.9,
        reviewCount: 45,
        category: 'Outdoor',
        isNew: true,
        stockStatus: 'In Stock',
        description: 'A robust and flashy bicycle for young adventurers. Features training wheels, a sturdy frame, and powerful brakes for safety.',
        specifications: [
            { label: 'Age Group', value: '4 - 7 Years' },
            { label: 'Frame', value: 'High-tensile Steel' },
            { label: 'Wheel Size', value: '14 Inches' },
        ],
        safetyFeatures: [
            'Training wheels included',
            'Fully enclosed chain guard',
            'Safety reflectors',
            'Soft padded seat'
        ],
        reviews: [
            { id: 1, user: 'Rajesh G.', rating: 5, comment: 'Fantastic bike! My daughter learned to ride in a week.', date: '2024-03-10' },
        ]
    },
    {
        id: 6,
        name: 'Remote Control Rally Car',
        brand: 'NitroSpin',
        price: 2499,
        oldPrice: 2999,
        images: [
            '/images/hero_banner_3_1773298895719.png',
            '/images/hero_banner_3_1773298895719.png',
            '/images/hero_banner_3_1773298895719.png',
        ],
        rating: 4.6,
        reviewCount: 128,
        category: 'Outdoor',
        stockStatus: 'In Stock',
        description: 'High-speed RC car with off-road capabilities. Perfect for racing in the park or backyard.',
        specifications: [
            { label: 'Age Group', value: '6+ Years' },
            { label: 'Top Speed', value: '15 km/h' },
            { label: 'Remote Range', value: '30 Meters' },
        ],
        safetyFeatures: [
            'Durable shock-absorbent body',
            'Rechargeable battery with safety cut-off',
            'Smooth-edged remote design'
        ],
        reviews: [
            { id: 1, user: 'Arun V.', rating: 5, comment: 'Very fast and takes a lot of crashes well!', date: '2024-02-28' },
        ]
    },
    {
        id: 7,
        name: 'Turbo Water Gun Blaster',
        brand: 'AquaSplash',
        price: 899,
        oldPrice: 1199,
        images: [
            '/images/hero_banner_1_1773298853665.png',
            '/images/hero_banner_1_1773298853665.png',
        ],
        rating: 4.4,
        reviewCount: 320,
        category: 'Outdoor',
        isNew: true,
        stockStatus: 'Low Stock',
        stockCount: 8,
        description: 'Ultimate water blaster for summer fun. High capacity tank and long-range shooting capabilities.',
        specifications: [
            { label: 'Age Group', value: '5+ Years' },
            { label: 'Range', value: 'Up to 10 Meters' },
            { label: 'Tank Capacity', value: '1.5 Liters' },
        ],
        safetyFeatures: [
            'BPA-free plastic',
            'No small parts',
            'Safe pressure release valve'
        ],
        reviews: [
            { id: 1, user: 'Sonia M.', rating: 4, comment: 'Kids had a blast! Range is really good.', date: '2024-03-05' },
        ]
    },
    {
        id: 8,
        name: 'Mini Pro Football Set',
        brand: 'GoalKick',
        price: 1499,
        oldPrice: 1999,
        images: [
            '/images/hero_banner_2_1773298876754.png',
            '/images/hero_banner_2_1773298876754.png',
        ],
        rating: 4.8,
        reviewCount: 76,
        category: 'Outdoor',
        stockStatus: 'In Stock',
        description: 'Complete mini football set including goal posts, a soft football, and a pump. Perfect for garden play.',
        specifications: [
            { label: 'Age Group', value: '3 - 8 Years' },
            { label: 'Goal Size', value: '90 x 60 cm' },
            { label: 'Material', value: 'Lightweight PVC' },
        ],
        safetyFeatures: [
            'Soft-edged goal posts',
            'Safe, low-pressure football',
            'Stable anchor pins for grass'
        ],
        reviews: [
            { id: 1, user: 'Karan P.', rating: 5, comment: 'Perfect size for the backyard. Easy to set up.', date: '2024-02-12' },
        ]
    },
];
