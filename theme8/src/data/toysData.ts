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
    '/images/premium_toy_banner_1.png',
    '/images/premium_toy_banner_2.png',
    '/images/premium_toy_banner_3.png',
];

export const products: Product[] = [
    {
        id: 1,
        name: 'Wooden Safari Giraffe',
        brand: 'WildWoods',
        price: 1999,
        oldPrice: 2499,
        images: ['/images/toys/giraffe.png'],
        rating: 4.8,
        reviewCount: 342,
        category: 'Baby',
        isTopRated: true,
        stockStatus: 'In Stock',
        description: 'A beautifully crafted wooden giraffe pull toy designed to help toddlers develop motor skills and coordination while exploring the animal kingdom.',
        specifications: [
            { label: 'Age Group', value: '18 Months - 3 Years' },
            { label: 'Material', value: 'Natural Beech Wood' },
            { label: 'Dimensions', value: '15 x 8 x 25 cm' }
        ],
        safetyFeatures: [
            'Non-toxic water-based paint',
            'Smooth edges for safety',
            'BPA-free materials'
        ],
        reviews: [
            { id: 1, user: 'Priya S.', rating: 5, comment: 'Beautiful quality and my son loves pulling it around!', date: '2024-02-15' }
        ]
    },
    {
        id: 2,
        name: 'Architect Building Blocks',
        brand: 'ToyLand',
        price: 2499,
        oldPrice: 3200,
        images: ['/images/toys/blocks.png'],
        rating: 4.5,
        reviewCount: 210,
        category: 'Educational',
        isNew: true,
        stockStatus: 'In Stock',
        stockCount: 45,
        description: 'This colorful building block set helps children improve creativity, motor skills, and problem-solving abilities with 120 unique pieces.',
        specifications: [
            { label: 'Age Group', value: '3 - 6 Years' },
            { label: 'Material', value: 'Non-toxic high-grade plastic' },
            { label: 'Pieces', value: '120 blocks' }
        ],
        safetyFeatures: [
            'BPA free',
            'Child safe edges',
            'Improves creativity & motor skills'
        ],
        reviews: [
            { id: 1, user: 'Amit K.', rating: 5, comment: 'Great educational toy! My 5-year-old loves it.', date: '2024-02-20' }
        ]
    },
    {
        id: 3,
        name: 'Soft Snuggle Bear',
        brand: 'SoftSnuggles',
        price: 1299,
        oldPrice: 1599,
        images: ['/images/toys/bear.png'],
        rating: 4.9,
        reviewCount: 560,
        category: 'Plush',
        isTopRated: true,
        stockStatus: 'In Stock',
        description: 'The softest teddy bear you will ever meet. Perfect for bedtime snuggles and comforting young children.',
        specifications: [
            { label: 'Age Group', value: '0+ Months' },
            { label: 'Material', value: 'Ultra-soft Plush' },
            { label: 'Height', value: '30 cm' }
        ],
        safetyFeatures: [
            'Hypoallergenic fabric',
            'Securely stitched eyes',
            'Machine washable'
        ],
        reviews: [
            { id: 1, user: 'Sneha R.', rating: 5, comment: 'So soft! My daughter takes it everywhere.', date: '2024-01-10' }
        ]
    },
    {
        id: 4,
        name: 'Sparky the Robot',
        brand: 'TechToys',
        price: 4999,
        oldPrice: 5999,
        images: ['/images/toys/robot.png'],
        rating: 4.7,
        reviewCount: 156,
        category: 'Electronics',
        isNew: true,
        stockStatus: 'In Stock',
        description: 'An interactive companion robot that teaches basics of coding and problem solving through voice commands and interactive sensors.',
        specifications: [
            { label: 'Battery', value: 'Rechargeable Li-ion' },
            { label: 'Connectivity', value: 'Bluetooth 5.0' },
            { label: 'Sensors', value: 'Touch & Proximity' }
        ],
        safetyFeatures: [
            'UL Certified',
            'Child-safe battery compartment',
            'Volume control mapping'
        ],
        reviews: []
    },
    {
        id: 5,
        name: 'Speedster Kids Bicycle',
        brand: 'GearUp',
        price: 5499,
        oldPrice: 6999,
        images: ['/images/toys/bicycle.png'],
        rating: 4.9,
        reviewCount: 204,
        category: 'Outdoor',
        stockStatus: 'In Stock',
        stockCount: 12,
        description: 'A durable and lightweight bicycle designed for young adventurers with safety brakes and training wheels.',
        specifications: [
            { label: 'Wheel Size', value: '16 inch' },
            { label: 'Frame', value: 'Lightweight Aluminum' },
            { label: 'Weight', value: '8kg' }
        ],
        safetyFeatures: [
            'Dual braking system',
            'Reflective strips',
            'Training wheels included'
        ],
        reviews: []
    },
    {
        id: 6,
        name: 'Remote Control Rally Car',
        brand: 'NitroSpin',
        price: 2999,
        oldPrice: 3599,
        images: ['/images/toys/rc_car.png'],
        rating: 4.6,
        reviewCount: 89,
        category: 'Electronics',
        stockStatus: 'In Stock',
        description: 'High-speed remote control rally car with all-terrain tires and professional suspension system.',
        specifications: [
            { label: 'Top Speed', value: '20km/h' },
            { label: 'Control Range', value: '50 Meters' },
            { label: 'Scale', value: '1:14' }
        ],
        safetyFeatures: [
            'Impact resistant body',
            'Protected electronics',
            'Rechargeable safety cut-off'
        ],
        reviews: []
    },
    {
        id: 7,
        name: 'Turbo Water Gun Blaster',
        brand: 'AquaSplash',
        price: 1299,
        oldPrice: 1799,
        images: ['/images/toys/water_gun.png'],
        rating: 4.4,
        reviewCount: 42,
        category: 'Outdoor',
        stockStatus: 'Low Stock',
        stockCount: 5,
        description: 'Drench your friends with this high-capacity turbo water blaster. Shoots up to 10 meters with ease.',
        specifications: [
            { label: 'Capacity', value: '2 Liters' },
            { label: 'Range', value: '10 Meters' },
            { label: 'Action', value: 'Pump Action' }
        ],
        safetyFeatures: [
            'BPA Free plastic',
            'No sharp edges',
            'Leak-proof design'
        ],
        reviews: []
    },
    {
        id: 8,
        name: 'Mini Pro Football Set',
        brand: 'GoalKick',
        price: 1999,
        oldPrice: 2699,
        images: ['/images/toys/football_set.png'],
        rating: 4.8,
        reviewCount: 112,
        category: 'Outdoor',
        isNew: true,
        stockStatus: 'In Stock',
        description: 'A complete football setup for your backyard including a durable net, soft match ball and high-volume pump.',
        specifications: [
            { label: 'Net Size', value: '120 x 80 cm' },
            { label: 'Ball Type', value: 'Soft PU Match Ball' },
            { label: 'Portable', value: 'Easy Assembly' }
        ],
        safetyFeatures: [
            'Soft impact materials',
            'Secure grounding stakes',
            'BPA Free pump'
        ],
        reviews: []
    },
    {
        id: 9,
        name: 'StarGazer Kids Telescope',
        brand: 'Orion',
        price: 7499,
        oldPrice: 8999,
        images: ['/images/toys/telescope.png'],
        rating: 4.9,
        reviewCount: 64,
        category: 'Educational',
        isNew: true,
        stockStatus: 'In Stock',
        description: 'Explore the wonders of the night sky with this professional-grade beginner telescope for kids.',
        specifications: [
            { label: 'Magnification', value: '70x' },
            { label: 'Aperture', value: '70mm' },
            { label: 'Tripod', value: 'Adjustable Aluminum' }
        ],
        safetyFeatures: [
            'Solid build quality',
            'Safe optical lenses'
        ],
        reviews: []
    },
    {
        id: 10,
        name: 'Explorer Digital Microscope',
        brand: 'LabTech',
        price: 3999,
        oldPrice: 4999,
        images: ['/images/toys/microscope.png'],
        rating: 4.7,
        reviewCount: 92,
        category: 'Educational',
        stockStatus: 'In Stock',
        description: 'A high-definition digital microscope that makes biology fun and accessible for young scientists.',
        specifications: [
            { label: 'Zoom', value: '400x' },
            { label: 'Screen', value: '4.3 inch LED' },
            { label: 'Power', value: 'Rechargeable' }
        ],
        safetyFeatures: [
            'Non-toxic housing',
            'Safe LED light source'
        ],
        reviews: []
    },
    {
        id: 11,
        name: 'WonderWood Dollhouse',
        brand: 'Handicraft',
        price: 8999,
        oldPrice: 10999,
        images: ['/images/toys/dollhouse.png'],
        rating: 5.0,
        reviewCount: 128,
        category: 'By Age',
        isTopRated: true,
        stockStatus: 'In Stock',
        description: 'A handcrafted premium wooden dollhouse with three floors and fully furnished rooms.',
        specifications: [
            { label: 'Material', value: 'Solid Oak & Pine' },
            { label: 'Floors', value: '3 Storeys' },
            { label: 'Furniture', value: '15 Pieces included' }
        ],
        safetyFeatures: [
            'Eco-friendly lacquer',
            'Smoothened corners'
        ],
        reviews: []
    },
    {
        id: 12,
        name: 'Mountain Express Train Set',
        brand: 'LocoFlow',
        price: 4599,
        oldPrice: 5499,
        images: ['/images/toys/train_set.png'],
        rating: 4.8,
        reviewCount: 184,
        category: 'Educational',
        stockStatus: 'In Stock',
        description: 'Classic wooden railway system with elevated mountain bridges and scenic landscapes.',
        specifications: [
            { label: 'Track Length', value: '5 Meters' },
            { label: 'Pieces', value: '60' },
            { label: 'Expansion', value: 'Compatible with major brands' }
        ],
        safetyFeatures: [
            'Lead-free paint',
            'Secure track connectors'
        ],
        reviews: []
    },
    {
        id: 13,
        name: 'Modulus Geometric Blocks',
        brand: 'CreativeMinds',
        price: 1599,
        oldPrice: 1999,
        images: ['/images/toys/blocks_advanced.png'],
        rating: 4.6,
        reviewCount: 76,
        category: 'Educational',
        isNew: true,
        stockStatus: 'In Stock',
        description: 'Advanced geometric building blocks designed to foster spatial reasoning and architectural thinking.',
        specifications: [
            { label: 'Shapes', value: 'Various 3D Prisms' },
            { label: 'Finish', value: 'Matte Pastel' },
            { label: 'Pieces', value: '48' }
        ],
        safetyFeatures: [
            'Choking hazard warning',
            'ASTM Certified'
        ],
        reviews: []
    }
];
