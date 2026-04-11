import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Heart, Eye, ArrowLeft } from "lucide-react";
import { useState } from "react";

const brandProductsData: { [key: string]: any[] } = {
  nike: [
    {
      id: 1001,
      name: "Air Max Revolution",
      brand: "Nike",
      price: 179,
      originalPrice: 199,
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop&crop=center",
      hoverImage:
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop&crop=center",
      rating: 4.8,
      reviews: 124,
      isNew: true,
      category: "Running",
      colors: ["Red", "Black", "White"],
    },
    {
      id: 1002,
      name: "Air Zoom Pegasus",
      brand: "Nike",
      price: 219,
      originalPrice: 249,
      image:
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop&crop=center",
      hoverImage:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop&crop=center",
      rating: 4.8,
      reviews: 342,
      isNew: true,
      category: "Running",
      colors: ["Blue", "Black", "White"],
    },
    {
      id: 1003,
      name: "Air Max Professional",
      brand: "Nike",
      price: 199,
      originalPrice: 249,
      image:
        "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/efbef650-d3bf-4808-8988-f1212d3dcce4/air-max-90-shoes-kkLZj6.png",
      hoverImage:
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop&crop=center",
      rating: 4.8,
      reviews: 156,
      isNew: true,
      category: "Training",
      colors: ["Black", "White", "Red"],
    },
    {
      id: 1004,
      name: "Metcon 8",
      brand: "Nike",
      price: 199,
      originalPrice: 229,
      image:
        "https://www.febbuy.com/uploads/Nike_SB_Shoes/NIke_Dunk_SB_Hi/Nike_SFB_Jungle_Dunk_High_Men_Shoes_Lifestyle_Fashion_White_Blue_Black.jpg",
      hoverImage:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=center",
      rating: 4.7,
      reviews: 298,
      isNew: true,
      category: "Training",
      colors: ["Black", "Orange", "White"],
    },
    {
      id: 1005,
      name: "Blazer Mid '77",
      brand: "Nike",
      price: 149,
      originalPrice: 169,
      image:
        "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=400&h=400&fit=crop&crop=center",
      hoverImage:
        "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=400&h=400&fit=crop&crop=center",
      rating: 4.5,
      reviews: 387,
      isNew: true,
      category: "Lifestyle",
      colors: ["White", "Black", "Cream"],
    },
    {
      id: 1006,
      name: "Rose Gold Runner",
      brand: "Nike",
      price: 189,
      originalPrice: 219,
      image:
        "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400&h=400&fit=crop&crop=center",
      hoverImage:
        "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=400&fit=crop&crop=center",
      rating: 4.9,
      reviews: 234,
      isNew: true,
      category: "Women",
      colors: ["Rose Gold", "White", "Pink"],
    },
    {
      id: 1007,
      name: "Air Force 1 Low",
      brand: "Nike",
      price: 119,
      originalPrice: null,
      image:
        "https://image-cdn.hypb.st/https://hypebeast.com/image/2019/04/nike-vaporfly-4-flyknit-bright-crimson-sapphire-release-1.jpg?q=75&w=800&cbr=1&fit=max",
      hoverImage:
        "https://images.unsplash.com/photo-1520256862855-398228c41684?w=400&h=400&fit=crop&crop=center",
      rating: 4.7,
      reviews: 892,
      isNew: false,
      category: "Lifestyle",
      colors: ["White", "Black", "Red"],
    },
    {
      id: 1008,
      name: "React Element 55",
      brand: "Nike",
      price: 169,
      originalPrice: 199,
      image:
        "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/8a9efd65-db93-482c-94f0-ad34a3b21265/air-max-270-mens-shoes-KkLcGR.png",
      hoverImage:
        "https://images.unsplash.com/photo-1539185441755-769473a23570?w=400&h=400&fit=crop&crop=center",
      rating: 4.6,
      reviews: 445,
      isNew: false,
      category: "Running",
      colors: ["Gray", "Blue", "Black"],
    },
    {
      id: 1009,
      name: "Dunk Low Premium",
      brand: "Nike",
      price: 139,
      originalPrice: null,
      image:
        "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop&crop=center",
      hoverImage:
        "https://images.unsplash.com/photo-1544966503-7cc5ac882d2f?w=400&h=400&fit=crop&crop=center",
      rating: 4.8,
      reviews: 567,
      isNew: true,
      category: "Lifestyle",
      colors: ["White", "Green", "Orange"],
    },
  ],
  adidas: [
    {
      id: 2001,
      name: "UltraBoost DNA",
      brand: "Adidas",
      price: 199,
      originalPrice: null,
      image:
        "https://footwearnews.com/wp-content/uploads/2023/02/Ultraboost_Light_Running_Shoes_Black_HQ6339_01_standard-e1677164866275.jpg",
      hoverImage:
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop&crop=center",
      rating: 4.7,
      reviews: 287,
      isNew: false,
      category: "Running",
      colors: ["White", "Black", "Gray"],
    },
    {
      id: 2002,
      name: "Stan Smith Classic",
      brand: "Adidas",
      price: 129,
      originalPrice: 149,
      image:
        "https://assets.adidas.com/images/w_600,f_auto,q_auto/3e0a851dc25f4404981abd72fe8d02ee_9366/Solarcontrol_2.0_Shoes_Black_HP9648_01_standard.jpg",
      hoverImage:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=center",
      rating: 4.6,
      reviews: 456,
      isNew: false,
      category: "Casual",
      colors: ["White", "Green", "Navy"],
    },
    {
      id: 2003,
      name: "Forum Low",
      brand: "Adidas",
      price: 139,
      originalPrice: null,
      image:
        "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/3ddf058eeae74c769a571c9500b0f19a_9366/Ultraboost_5_Shoes_White_JH9070_HM1.jpg",
      hoverImage:
        "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=400&h=400&fit=crop&crop=center",
      rating: 4.4,
      reviews: 234,
      isNew: false,
      category: "Lifestyle",
      colors: ["White", "Blue", "Black"],
    },
    {
      id: 2004,
      name: "DropSet Trainer",
      brand: "Adidas",
      price: 189,
      originalPrice: 219,
      image:
        "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/90c6a6fa827a4da18102d9ede0382778_9366/Adizero_Boston_12_Shoes_Black_ID4234_HM1.jpg",
      hoverImage:
        "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop&crop=center",
      rating: 4.8,
      reviews: 167,
      isNew: true,
      category: "Training",
      colors: ["Gray", "Black", "Green"],
    },
    {
      id: 2007,
      name: "Superstar Shell Toe",
      brand: "Adidas",
      price: 99,
      originalPrice: null,
      image:
        "https://assets.adidas.com/images/w_383,h_383,f_auto,q_auto,fl_lossy,c_fill,g_auto/f3d1378302174857a14819683114d7cf_9366/adizero-boston-12-running-shoes.jpg",
      hoverImage:
        "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop&crop=center",
      rating: 4.8,
      reviews: 1234,
      isNew: false,
      category: "Lifestyle",
      colors: ["White", "Black", "Gold"],
    },
    {
      id: 2008,
      name: "NMD R1 V2",
      brand: "Adidas",
      price: 179,
      originalPrice: 199,
      image:
        "https://assets.adidas.com/images/w_383,h_383,f_auto,q_auto,fl_lossy,c_fill,g_auto/d5949e110c4d46618e34adf9017834ec_9366/solarglide-5-shoes.jpg",
      hoverImage:
        "https://images.unsplash.com/photo-1539185441755-769473a23570?w=400&h=400&fit=crop&crop=center",
      rating: 4.5,
      reviews: 678,
      isNew: true,
      category: "Lifestyle",
      colors: ["Black", "Red", "Blue"],
    },
    {
      id: 2009,
      name: "Solar Glide 5",
      brand: "Adidas",
      price: 149,
      originalPrice: null,
      image:
        "https://assets.adidas.com/images/w_383,h_383,f_auto,q_auto,fl_lossy,c_fill,g_auto/21ba89e1a28e4ce6961d0b4eeb044354_9366/adizero-sl2-running-shoes.jpg",
      hoverImage:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop&crop=center",
      rating: 4.6,
      reviews: 345,
      isNew: false,
      category: "Running",
      colors: ["Blue", "Orange", "White"],
    },
  ],
  puma: [
    {
      id: 3001,
      name: "Velocity Nitro",
      brand: "Puma",
      price: 159,
      originalPrice: null,
      image:
        "https://images-static.nykaa.com/media/catalog/product/d/a/da48daa19325616_n5_.jpg",
      hoverImage:
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop&crop=center",
      rating: 4.5,
      reviews: 167,
      isNew: false,
      category: "Running",
      colors: ["Green", "Black", "Yellow"],
    },
    {
      id: 3002,
      name: "Suede Classic",
      brand: "Puma",
      price: 119,
      originalPrice: 139,
      image:
        "https://img.tatacliq.com/images/i12/658Wx734H/MP000000018611159_658Wx734H_202308071422044.jpeg",
      hoverImage:
        "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=400&h=400&fit=crop&crop=center",
      rating: 4.3,
      reviews: 198,
      isNew: false,
      category: "Casual",
      colors: ["Blue", "Red", "Black"],
    },
    {
      id: 3003,
      name: "Cross Trainer Elite",
      brand: "Puma",
      price: 159,
      originalPrice: 179,
      image:
        "https://images-static.nykaa.com/media/catalog/product/tr:h-800,w-800,cm-pad_resize/a/b/abb4d85puma-38059802_1.jpg",
      hoverImage:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=center",
      rating: 4.4,
      reviews: 143,
      isNew: false,
      category: "Training",
      colors: ["Yellow", "Black", "Blue"],
    },
    {
      id: 3007,
      name: "RS-X Puzzle",
      brand: "Puma",
      price: 129,
      originalPrice: 149,
      image:
        "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_2000,h_2000/global/194286/01/sv01/fnd/GBR/fmt/png/Axelion-Mesh-Shoes-Kids",
      hoverImage:
        "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop&crop=center",
      rating: 4.4,
      reviews: 289,
      isNew: true,
      category: "Lifestyle",
      colors: ["Multi", "Black", "White"],
    },
    {
      id: 3008,
      name: "Clyde All-Pro",
      brand: "Puma",
      price: 189,
      originalPrice: null,
      image:
        "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_300,h_300/global/378068/24/fnd/PNA/fmt/png/Softride-Enzo-Evo-Women's-Running-Shoes",
      hoverImage:
        "https://images.unsplash.com/photo-1539185441755-769473a23570?w=400&h=400&fit=crop&crop=center",
      rating: 4.7,
      reviews: 156,
      isNew: false,
      category: "Training",
      colors: ["White", "Red", "Blue"],
    },
    {
      id: 3009,
      name: "AMG casual shoes",
      brand: "Puma",
      price: 189,
      originalPrice: null,
      image:
        "https://th.bing.com/th/id/R.e8307b43eef08b16af8f8a8e4aafb361?rik=ci72eaCM2FOcRQ&riu=http%3a%2f%2frukmini1.flixcart.com%2fimage%2f300%2f300%2fxif0q%2fshoe%2fg%2fc%2fe%2f-original-imahfhnrbk2zkyxf.jpeg&ehk=3h78Y1icpo1XnPwfFG5iXsRjoyXiprQGsmMg%2fbqeghY%3d&risl=&pid=ImgRaw&r=0",
      hoverImage:
        "https://images.unsplash.com/photo-1539185441755-769473a23570?w=400&h=400&fit=crop&crop=center",
      rating: 4.7,
      reviews: 156,
      isNew: false,
      category: "Training",
      colors: ["White", "Red", "Blue"],
    },
  ],
  converse: [
    {
      id: 4001,
      name: "Chuck Taylor All Star",
      brand: "Converse",
      price: 89,
      originalPrice: null,
      image:
        "https://media3.cgtrader.com/variants/YiEnGraq7pXgf168cqXJpngw/e44aa6a6359827c9089792cde0c079681b83d3b5c3037cc0525c25607e54355b/02e68861-f990-4e2c-82f2-a57c080f8a65.jpg",
      hoverImage:
        "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=400&h=400&fit=crop&crop=center",
      rating: 4.4,
      reviews: 623,
      isNew: false,
      category: "Casual",
      colors: ["Black", "White", "Red"],
    },
    {
      id: 4002,
      name: "Classic Canvas",
      brand: "Converse",
      price: 49,
      originalPrice: 89,
      image:
        "https://wallpapercave.com/wp/wp2924223.jpg",
      hoverImage:
        "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=400&h=400&fit=crop&crop=center",
      rating: 4.4,
      reviews: 289,
      isNew: false,
      category: "Lifestyle",
      colors: ["Black", "White", "Red"],
    },
    {
      id: 4007,
      name: "Chuck 70 High Top",
      brand: "Converse",
      price: 109,
      originalPrice: null,
      image:
        "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=400&h=400&fit=crop&crop=center",
      hoverImage:
        "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop&crop=center",
      rating: 4.6,
      reviews: 445,
      isNew: false,
      category: "Lifestyle",
      colors: ["Black", "White", "Cream"],
    },
    {
      id: 4008,
      name: "Run Star Hike",
      brand: "Converse",
      price: 129,
      originalPrice: 149,
      image:
        "https://tse3.mm.bing.net/th/id/OIP.Fyp_72m9v3yZ5L4i_f-swgHaHa?w=1000&h=1000&rs=1&pid=ImgDetMain&o=7&rm=3",
      hoverImage:
        "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=400&h=400&fit=crop&crop=center",
      rating: 4.3,
      reviews: 267,
      isNew: true,
      category: "Lifestyle",
      colors: ["Black", "Pink", "Yellow"],
    },
  ],
  reebok: [
    {
      id: 5001,
      name: "Nano X2",
      brand: "Reebok",
      price: 179,
      originalPrice: null,
      image:
        "https://5.imimg.com/data5/KV/VO/MY-17913176/reebok-one-distance-2-0-running-shoes-500x500.jpg",
      hoverImage:
        "https://images.unsplash.com/photo-1544966503-7cc5ac882d2f?w=400&h=400&fit=crop&crop=center",
      rating: 4.6,
      reviews: 234,
      isNew: false,
      category: "Training",
      colors: ["Blue", "Black", "Red"],
    },
    {
      id: 5002,
      name: "Classic Leather",
      brand: "Reebok",
      price: 119,
      originalPrice: 139,
      image:
        "https://tse3.mm.bing.net/th/id/OIP.ipvtKnkF-fZ9z-LRKck0VAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
      hoverImage:
        "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=400&h=400&fit=crop&crop=center",
      rating: 4.6,
      reviews: 198,
      isNew: false,
      category: "Lifestyle",
      colors: ["White", "Black", "Gray"],
    },
  ],
  "new balance": [
    {
      id: 6001,
      name: "Fresh Foam X",
      brand: "New Balance",
      price: 169,
      originalPrice: null,
      image:
        "https://d3nt9em9l1urz8.cloudfront.net/media/catalog/product/cache/3/image/9df78eab33525d08d6e5fb8d27136e95/n/b/nbm990gr2_1.jpg",
      hoverImage:
        "https://images.unsplash.com/photo-1544966503-7cc5ac882d2f?w=400&h=400&fit=crop&crop=center",
      rating: 4.6,
      reviews: 156,
      isNew: false,
      category: "Running",
      colors: ["Gray", "Blue", "White"],
    },
    {
      id: 6002,
      name: "Training Flex1",
      brand: "New Balance",
      price: 149,
      originalPrice: null,
      image:
        "https://tse3.mm.bing.net/th/id/OIP.s9_ampNtyfUMpmLQoFiPUwAAAA?rs=1&pid=ImgDetMain&o=7&rm=3",
      hoverImage:
        "https://images.unsplash.com/photo-1544966503-7cc5ac882d2f?w=400&h=400&fit=crop&crop=center",
      rating: 4.6,
      reviews: 198,
      isNew: true,
      category: "Training",
      colors: ["Navy", "Gray", "White"],
    },
    {
      id: 6003,
      name: "Training Flex2D",
      brand: "New Balance",
      price: 149,
      originalPrice: null,
      image:
        "https://tse1.mm.bing.net/th/id/OIP.JNwsN7a3wIKQuVBRwGfZygAAAA?w=474&h=474&rs=1&pid=ImgDetMain&o=7&rm=3",
      hoverImage:
        "https://images.unsplash.com/photo-1544966503-7cc5ac882d2f?w=400&h=400&fit=crop&crop=center",
      rating: 4.6,
      reviews: 198,
      isNew: true,
      category: "Training",
      colors: ["Navy", "Gray", "White"],
    },
    {
      id: 6004,
      name: "Training Flex3X",
      brand: "New Balance",
      price: 149,
      originalPrice: null,
      image:
        "https://tse4.mm.bing.net/th/id/OIP.RiXYe7zaDB71dTferMmi5gHaHa?w=2048&h=2048&rs=1&pid=ImgDetMain&o=7&rm=3",
      hoverImage:
        "https://images.unsplash.com/photo-1544966503-7cc5ac882d2f?w=400&h=400&fit=crop&crop=center",
      rating: 4.6,
      reviews: 198,
      isNew: true,
      category: "Training",
      colors: ["Navy", "Gray", "White"],
    },
    {
      id: 6005,
      name: "Training Flex4Y",
      brand: "New Balance",
      price: 149,
      originalPrice: null,
      image:
        "https://tse4.mm.bing.net/th/id/OIP.qxoZx63f4DFMf6JMVrsrlAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
      hoverImage:
        "https://images.unsplash.com/photo-1544966503-7cc5ac882d2f?w=400&h=400&fit=crop&crop=center",
      rating: 4.6,
      reviews: 198,
      isNew: true,
      category: "Training",
      colors: ["Navy", "Gray", "White"],
    },
    {
      id: 6006,
      name: "Training Flex6X",
      brand: "New Balance",
      price: 149,
      originalPrice: null,
      image:
        "https://tse3.mm.bing.net/th/id/OIP.WHzoGtKJhzBnZsZwOwEAcgAAAA?rs=1&pid=ImgDetMain&o=7&rm=3",
      hoverImage:
        "https://images.unsplash.com/photo-1544966503-7cc5ac882d2f?w=400&h=400&fit=crop&crop=center",
      rating: 4.6,
      reviews: 198,
      isNew: true,
      category: "Training",
      colors: ["Navy", "Gray", "White"],
    },
  ],
  vans: [
    {
      id: 7001,
      name: "Old Skool",
      brand: "Vans",
      price: 99,
      originalPrice: null,
      image:
        "https://tse3.mm.bing.net/th/id/OIP.fHT5EHrmeDfWWEEMHAfcawHaEK?rs=1&pid=ImgDetMain&o=7&rm=3",
      hoverImage:
        "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=400&h=400&fit=crop&crop=center",
      rating: 4.7,
      reviews: 342,
      isNew: false,
      category: "Casual",
      colors: ["Black", "White", "Checkered"],
    },
    {
      id: 7002,
      name: "Old Skool",
      brand: "Vans",
      price: 99,
      originalPrice: null,
      image:
        "https://i.pinimg.com/originals/6c/c2/95/6cc29585681bc41da68be8add240aba3.jpg",
      hoverImage:
        "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=400&h=400&fit=crop&crop=center",
      rating: 4.7,
      reviews: 342,
      isNew: false,
      category: "Casual",
      colors: ["Black", "White", "Checkered"],
    },
    {
      id: 7003,
      name: "Old Skool",
      brand: "Vans",
      price: 99,
      originalPrice: null,
      image:
        "https://cdna.lystit.com/520/650/n/photos/vans/8d09ff65/vans-Green-Ultrarange-Exo-Shoes.jpeg",
      hoverImage:
        "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=400&h=400&fit=crop&crop=center",
      rating: 4.7,
      reviews: 342,
      isNew: false,
      category: "Casual",
      colors: ["Black", "White", "Checkered"],
    },
    {
      id: 7004,
      name: "Old Skool",
      brand: "Vans",
      price: 99,
      originalPrice: null,
      image:
        "https://www.bluezonesports.com/prodimages/alt_images/large/vn0a4u1k4m01-shoes.png",
      hoverImage:
        "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=400&h=400&fit=crop&crop=center",
      rating: 4.7,
      reviews: 342,
      isNew: false,
      category: "Casual",
      colors: ["Black", "White", "Checkered"],
    },
    {
      id: 7005,
      name: "Old Skool",
      brand: "Vans",
      price: 99,
      originalPrice: null,
      image:
        "https://i.pinimg.com/originals/83/21/25/832125c2019684f732cf5b3e3b1588c2.jpg",
      hoverImage:
        "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=400&h=400&fit=crop&crop=center",
      rating: 4.7,
      reviews: 342,
      isNew: false,
      category: "Casual",
      colors: ["Black", "White", "Checkered"],
    },
    {
      id: 7006,
      name: "Old Skool",
      brand: "Vans",
      price: 99,
      originalPrice: null,
      image:
        "https://cdn11.bigcommerce.com/s-4p95v359ow/images/stencil/1280x1280/products/4804/7572/Screen_Shot_2021-10-19_at_8.38.12_PM__10980.1634701274.png?c=1",
      hoverImage:
        "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=400&h=400&fit=crop&crop=center",
      rating: 4.7,
      reviews: 342,
      isNew: false,
      category: "Casual",
      colors: ["Black", "White", "Checkered"],
    },
  ],
  "under armour": [
    {
      id: 8001,
      name: "HIIT Trainer",
      brand: "Under Armour",
      price: 169,
      originalPrice: null,
      image:
        "https://i5.walmartimages.com/asr/69bec7fa-1707-4fcf-9820-c7df8a03012b_1.978b106a3b5ab65ffb6e88d092c98e94.jpeg",
      hoverImage:
        "https://images.unsplash.com/photo-1539185441755-769473a23570?w=400&h=400&fit=crop&crop=center",
      rating: 4.5,
      reviews: 189,
      isNew: false,
      category: "Training",
      colors: ["Red", "Black", "White"],
    },
    {
      id: 8002,
      name: "HIIT Trainer",
      brand: "Under Armour",
      price: 169,
      originalPrice: null,
      image:
        "https://cdna.lystit.com/photos/underarmour/3000356-402-Midnight%20Navy-067595f2-.jpeg",
      hoverImage:
        "https://images.unsplash.com/photo-1539185441755-769473a23570?w=400&h=400&fit=crop&crop=center",
      rating: 4.5,
      reviews: 189,
      isNew: false,
      category: "Training",
      colors: ["Red", "Black", "White"],
    },
    {
      id: 8003,
      name: "HIIT Trainer",
      brand: "Under Armour",
      price: 169,
      originalPrice: null,
      image:
        "https://www.sportsdirect.com/images/products/21308203_h.jpg",
      hoverImage:
        "https://images.unsplash.com/photo-1539185441755-769473a23570?w=400&h=400&fit=crop&crop=center",
      rating: 4.5,
      reviews: 189,
      isNew: false,
      category: "Training",
      colors: ["Red", "Black", "White"],
    },
    {
      id: 8004,
      name: "HIIT Trainer",
      brand: "Under Armour",
      price: 169,
      originalPrice: null,
      image:
        "https://tse2.mm.bing.net/th/id/OIP.VqOCRO_0pGq6qSZlHBpvgQHaHa?pid=ImgDet&w=184&h=184&c=7&dpr=1.3&o=7&rm=3",
      hoverImage:
        "https://images.unsplash.com/photo-1539185441755-769473a23570?w=400&h=400&fit=crop&crop=center",
      rating: 4.5,
      reviews: 189,
      isNew: false,
      category: "Training",
      colors: ["Red", "Black", "White"],
    },
    {
      id: 8005,
      name: "HIIT Trainer",
      brand: "Under Armour",
      price: 169,
      originalPrice: null,
      image:
        "https://tse2.mm.bing.net/th/id/OIP.iUQvsX1EmqeKX2Wp2my3pwHaHa?pid=ImgDet&w=184&h=184&c=7&dpr=1.3&o=7&rm=3",
      hoverImage:
        "https://images.unsplash.com/photo-1539185441755-769473a23570?w=400&h=400&fit=crop&crop=center",
      rating: 4.5,
      reviews: 189,
      isNew: false,
      category: "Training",
      colors: ["Red", "Black", "White"],
    },
    {
      id: 8006,
      name: "HIIT Trainer",
      brand: "Under Armour",
      price: 169,
      originalPrice: null,
      image:
        "https://tse4.mm.bing.net/th/id/OIP.HA8zKyGw2kPKmz84KL0gHAHaHa?pid=ImgDet&w=184&h=184&c=7&dpr=1.3&o=7&rm=3",
      hoverImage:
        "https://images.unsplash.com/photo-1539185441755-769473a23570?w=400&h=400&fit=crop&crop=center",
      rating: 4.5,
      reviews: 189,
      isNew: false,
      category: "Training",
      colors: ["Red", "Black", "White"],
    },
  ],
  asics: [
    {
      id: 9001,
      name: "Gel-Nimbus 24",
      brand: "ASICS",
      price: 189,
      originalPrice: 219,
      image:
        "https://tse1.mm.bing.net/th/id/OIP.P0UI3-uV_qkCsOKgyhMAiAHaE8?pid=ImgDet&w=184&h=122&c=7&dpr=1.3&o=7&rm=3",
      hoverImage:
        "https://images.unsplash.com/photo-1539185441755-769473a23570?w=400&h=400&fit=crop&crop=center",
      rating: 4.9,
      reviews: 198,
      isNew: true,
      category: "Running",
      colors: ["Orange", "Blue", "Black"],
    },
    {
      id: 9002,
      name: "Gel-Nimbus 24",
      brand: "ASICS",
      price: 189,
      originalPrice: 219,
      image:
        "https://tse2.mm.bing.net/th/id/OIP.bzium5vU4b2cUt0jRAcr8wHaFj?pid=ImgDet&w=184&h=138&c=7&dpr=1.3&o=7&rm=3",
      hoverImage:
        "https://images.unsplash.com/photo-1539185441755-769473a23570?w=400&h=400&fit=crop&crop=center",
      rating: 4.9,
      reviews: 198,
      isNew: true,
      category: "Running",
      colors: ["Orange", "Blue", "Black"],
    },
    {
      id: 9003,
      name: "Gel-Nimbus 24",
      brand: "ASICS",
      price: 189,
      originalPrice: 219,
      image:
        "https://tse2.mm.bing.net/th/id/OIP.IdeflvaDpBFseBMKHO1apgHaFS?pid=ImgDet&w=184&h=131&c=7&dpr=1.3&o=7&rm=3",
      hoverImage:
        "https://images.unsplash.com/photo-1539185441755-769473a23570?w=400&h=400&fit=crop&crop=center",
      rating: 4.9,
      reviews: 198,
      isNew: true,
      category: "Running",
      colors: ["Orange", "Blue", "Black"],
    },
    {
      id: 9004,
      name: "Gel-Nimbus 24",
      brand: "ASICS",
      price: 189,
      originalPrice: 219,
      image:
        "https://tse2.mm.bing.net/th/id/OIP.jc7CLEmvgNr4fsPBEDvyowAAAA?pid=ImgDet&w=184&h=184&c=7&dpr=1.3&o=7&rm=3",
      hoverImage:
        "https://images.unsplash.com/photo-1539185441755-769473a23570?w=400&h=400&fit=crop&crop=center",
      rating: 4.9,
      reviews: 198,
      isNew: true,
      category: "Running",
      colors: ["Orange", "Blue", "Black"],
    },
    {
      id: 9005,
      name: "Gel-Nimbus 24",
      brand: "ASICS",
      price: 189,
      originalPrice: 219,
      image:
        "https://tse1.mm.bing.net/th/id/OIP.UmKkWhTdcnU652-NrwBrTgHaEo?pid=ImgDet&w=184&h=115&c=7&dpr=1.3&o=7&rm=3",
      hoverImage:
        "https://images.unsplash.com/photo-1539185441755-769473a23570?w=400&h=400&fit=crop&crop=center",
      rating: 4.9,
      reviews: 198,
      isNew: true,
      category: "Running",
      colors: ["Orange", "Blue", "Black"],
    },
    {
      id: 9006,
      name: "Gel-Nimbus 24",
      brand: "ASICS",
      price: 189,
      originalPrice: 219,
      image:
        "https://images.contentstack.io/v3/assets/bltbb5996c454cd1f4d/bltf4bbe88d00ed1c57/662fca28b0544117199a27f0/asics_homepage_cards_superblast_050124.jpg?quality=80",
      hoverImage:
        "https://images.unsplash.com/photo-1539185441755-769473a23570?w=400&h=400&fit=crop&crop=center",
      rating: 4.9,
      reviews: 198,
      isNew: true,
      category: "Running",
      colors: ["Orange", "Blue", "Black"],
    },
  ],
  brooks: [
    {
      id: 10001,
      name: "Ghost 14",
      brand: "Brooks",
      price: 179,
      originalPrice: 199,
      image:
        "https://th.bing.com/th/id/OIP.C0--Ej3m4uPJeB4XP6i7ZAHaE7?w=279&h=186&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
      hoverImage:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=center",
      rating: 4.8,
      reviews: 234,
      isNew: true,
      category: "Running",
      colors: ["Black", "Red", "White"],
    },
    {
      id: 10002,
      name: "Ghost 14",
      brand: "Brooks",
      price: 179,
      originalPrice: 199,
      image:
        "https://tse2.mm.bing.net/th/id/OIP.hksdBTxR8W-ywTNTqxUFsgHaD4?pid=ImgDet&w=184&h=96&c=7&dpr=1.3&o=7&rm=3",
      hoverImage:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=center",
      rating: 4.8,
      reviews: 234,
      isNew: true,
      category: "Running",
      colors: ["Black", "Red", "White"],
    },
    {
      id: 10003,
      name: "Ghost 14",
      brand: "Brooks",
      price: 179,
      originalPrice: 199,
      image:
        "https://tse1.mm.bing.net/th/id/OIP.teBZbg_M-LVSHQi76e0VMQHaHa?pid=ImgDet&w=184&h=184&c=7&dpr=1.3&o=7&rm=3",
      hoverImage:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=center",
      rating: 4.8,
      reviews: 234,
      isNew: true,
      category: "Running",
      colors: ["Black", "Red", "White"],
    },
    {
      id: 10004,
      name: "Ghost 14",
      brand: "Brooks",
      price: 179,
      originalPrice: 199,
      image:
        "https://tse2.mm.bing.net/th/id/OIP.HGmL_WRxqzXaQi-OIcj-OgHaHa?pid=ImgDet&w=184&h=184&c=7&dpr=1.3&o=7&rm=3",
      hoverImage:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=center",
      rating: 4.8,
      reviews: 234,
      isNew: true,
      category: "Running",
      colors: ["Black", "Red", "White"],
    },
    {
      id: 10005,
      name: "Ghost 14",
      brand: "Brooks",
      price: 179,
      originalPrice: 199,
      image:
        "https://tse4.mm.bing.net/th/id/OIP.Ua8gFzlg-G1LtKAinCqXdQAAAA?pid=ImgDet&w=184&h=137&c=7&dpr=1.3&o=7&rm=3",
      hoverImage:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=center",
      rating: 4.8,
      reviews: 234,
      isNew: true,
      category: "Running",
      colors: ["Black", "Red", "White"],
    },
    {
      id: 10006,
      name: "Ghost 14",
      brand: "Brooks",
      price: 179,
      originalPrice: 199,
      image:
        "https://tse3.mm.bing.net/th/id/OIP.MjA6VmNZJId_MOe7JdQjQQAAAA?pid=ImgDet&w=184&h=184&c=7&dpr=1.3&o=7&rm=3",
      hoverImage:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=center",
      rating: 4.8,
      reviews: 234,
      isNew: true,
      category: "Running",
      colors: ["Black", "Red", "White"],
    },
  ],
  timberland: [
    {
      id: 11001,
      name: "Classic Leather Boot",
      brand: "Timberland",
      price: 249,
      originalPrice: null,
      image:
        "https://media.endclothing.com/media/catalog/product/2/7/27-10-2022_ECC_TB0A2AU1F13_m1_1.jpg",
      hoverImage:
        "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop&crop=center",
      rating: 4.7,
      reviews: 203,
      isNew: false,
      category: "Outdoor",
           colors: ["Brown", "Black", "Tan"],
    },
    {
      id: 11002,
      name: "Classic Leather Boot",
      brand: "Timberland",
      price: 249,
      originalPrice: null,
      image:
        "https://media.endclothing.com/media/catalog/product/1/3/13-03-2023-BLR_TB0A5RDGDH41_1_1.jpg",
      hoverImage:
        "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop&crop=center",
      rating: 4.7,
      reviews: 203,
      isNew: false,
      category: "Outdoor",
      colors: ["Brown", "Black", "Tan"],
    },
    {
      id: 11003,
      name: "Classic Leather Boot",
      brand: "Timberland",
      price: 249,
      originalPrice: null,
      image:
        "https://tse2.mm.bing.net/th/id/OIP.Dc6K0o1X25U5MVuUY3h3AQAAAA?w=400&h=502&rs=1&pid=ImgDetMain&o=7&rm=3",
      hoverImage:
        "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop&crop=center",
      rating: 4.7,
      reviews: 203,
      isNew: false,
      category: "Outdoor",
      colors: ["Brown", "Black", "Tan"],
    },
    {
      id: 11004,
      name: "Classic Leather Boot",
      brand: "Timberland",
      price: 249,
      originalPrice: null,
      image:
        "https://ts3.mm.bing.net/th?id=OIP.6boJKB5-EWCgiRG3x5a5UQHaI4&pid=15.1",
      hoverImage:
        "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop&crop=center",
      rating: 4.7,
      reviews: 203,
      isNew: false,
      category: "Outdoor",
      colors: ["Brown", "Black", "Tan"],
    },
    {
      id: 11005,
      name: "Classic Leather Boot",
      brand: "Timberland",
      price: 249,
      originalPrice: null,
      image:
        "https://tse4.mm.bing.net/th/id/OIP.XBePOqJc5HeZz39xwzIS3AHaHa?pid=ImgDet&w=184&h=184&c=7&dpr=1.3&o=7&rm=3",
      hoverImage:
        "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop&crop=center",
      rating: 4.7,
      reviews: 203,
      isNew: false,
      category: "Outdoor",
      colors: ["Brown", "Black", "Tan"],
    },
    {
      id: 11006,
      name: "Classic Leather Boot",
      brand: "Timberland",
      price: 249,
      originalPrice: null,
      image:
        "https://i.stpost.com/timberland-6-premium-boots-waterproof-insulated-for-men-in-dark-beige-nubuck~p~ds593_02~1500.2.jpg",
      hoverImage:
        "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop&crop=center",
      rating: 4.7,
      reviews: 203,
      isNew: false,
      category: "Outdoor",
      colors: ["Brown", "Black", "Tan"],
    },
  ],
  skechers: [
    {
      id: 12001,
      name: "Princess Sparkle",
      brand: "Skechers",
      price: 59,
      originalPrice: null,
      image:
        "https://i5.walmartimages.com/asr/46a00315-01c9-4b37-ac3b-6fcd7ba9dcc0_1.39b2d111588ae2fdcdb8dd49a24a30ed.jpeg",
      hoverImage:
        "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=400&h=400&fit=crop&crop=center",
      rating: 4.9,
      reviews: 203,
      isNew: false,
      category: "Casual",
      colors: ["Pink", "Purple", "Silver"],
    },
    {
      id: 12002,
      name: "Princess Sparkle",
      brand: "Skechers",
      price: 59,
      originalPrice: null,
      image:
        "https://th.bing.com/th/id/OIP.QZSSuJy4QLNhf4ndPc8JrgHaFj?w=255&h=191&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
      hoverImage:
        "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=400&h=400&fit=crop&crop=center",
      rating: 4.9,
      reviews: 203,
      isNew: false,
      category: "Casual",
      colors: ["Pink", "Purple", "Silver"],
    },
    {
      id: 12003,
      name: "Princess Sparkle",
      brand: "Skechers",
      price: 59,
      originalPrice: null,
      image:
        "https://th.bing.com/th/id/OIP.SHBZefbfT97M9h_qLPtYqgHaGJ?w=229&h=190&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
      hoverImage:
        "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=400&h=400&fit=crop&crop=center",
      rating: 4.9,
      reviews: 203,
      isNew: false,
      category: "Casual",
      colors: ["Pink", "Purple", "Silver"],
    },
    {
      id: 12004,
      name: "Princess Sparkle",
      brand: "Skechers",
      price: 59,
      originalPrice: null,
      image:
        "https://cdna.lystit.com/photos/amazon/810c9abe/skechers-Black-Max-Protect-Trainers.jpeg",
      hoverImage:
        "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=400&h=400&fit=crop&crop=center",
      rating: 4.9,
      reviews: 203,
      isNew: false,
      category: "Casual",
      colors: ["Pink", "Purple", "Silver"],
    },
    {
      id: 12005,
      name: "Princess Sparkle",
      brand: "Skechers",
      price: 59,
      originalPrice: null,
      image:
        "https://tse4.mm.bing.net/th/id/OIP.TSo2S1f0wxGvgpfS6_6h9gAAAA?pid=ImgDet&w=184&h=184&c=7&dpr=1.3&o=7&rm=3",
      hoverImage:
        "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=400&h=400&fit=crop&crop=center",
      rating: 4.9,
      reviews: 203,
      isNew: false,
      category: "Casual",
      colors: ["Pink", "Purple", "Silver"],
    },
    {
      id: 12006,
      name: "Princess Sparkle",
      brand: "Skechers",
      price: 59,
      originalPrice: null,
      image:
        "https://cdna.lystit.com/1200/630/tr/photos/zappos/f178bf7c/skechers-Black-Skech-Air-Ventura.jpeg",
      hoverImage:
        "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=400&h=400&fit=crop&crop=center",
      rating: 4.9,
      reviews: 203,
      isNew: false,
      category: "Casual",
      colors: ["Pink", "Purple", "Silver"],
    },
  ],
};

interface BrandProductsProps {
  brandName: string;
  onBack: () => void;
  onAddToWishlist: (product: any) => void;
  onAddToCart: (product: any) => void;
}

export default function BrandProducts({
  brandName,
  onBack,
  onAddToWishlist,
  onAddToCart,
}: BrandProductsProps) {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  const products = brandProductsData[brandName.toLowerCase()] || [];
  const brandDisplayName =
    brandName.charAt(0).toUpperCase() + brandName.slice(1);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/30 dark:to-orange-900/30 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-6 hover:scale-105 transition-transform duration-300"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Brands
          </Button>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            {brandDisplayName} Collection
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Discover the complete {brandDisplayName} collection. Premium quality
            and innovative design in every pair.
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {products.length === 0 ? (
            <div className="text-center py-16">
              <h2 className="text-2xl font-bold mb-4">Coming Soon</h2>
              <p className="text-muted-foreground">
                {brandDisplayName} products will be available soon. Check back
                later!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <Card
                  key={product.id}
                  className="group cursor-pointer hover:shadow-2xl transition-all duration-500 overflow-hidden border-0 transform hover:scale-105 hover:-translate-y-3"
                  onMouseEnter={() => setHoveredProduct(product.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-muted/50 to-card">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover p-4 group-hover:scale-110 transition-all duration-500 ease-out"
                    />
                    {product.isNew && (
                      <Badge className="absolute top-3 left-3 bg-red-500 animate-bounce">
                        New
                      </Badge>
                    )}
                    <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                      <Button
                        variant="secondary"
                        size="icon"
                        className="w-8 h-8 hover:scale-110 transition-transform duration-300"
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddToWishlist(product);
                        }}
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="secondary"
                        size="icon"
                        className="w-8 h-8 hover:scale-110 transition-transform duration-300"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                    {product.originalPrice && (
                      <Badge
                        variant="destructive"
                        className="absolute bottom-3 left-3 animate-pulse"
                      >
                        Sale
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-6 space-y-4">
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground font-medium">
                        {product.brand}
                      </p>
                      <h3 className="font-semibold text-lg group-hover:text-red-600 transition-colors duration-300">
                        {product.name}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">
                          {product.rating}
                        </span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        ({product.reviews})
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold">
                          ₹{product.price * 80}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            ₹{product.originalPrice * 80}
                          </span>
                        )}
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {product.category}
                      </Badge>
                    </div>
                    <Button
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/80 transition-all duration-300 transform group-hover:scale-105"
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(product);
                      }}
                    >
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
