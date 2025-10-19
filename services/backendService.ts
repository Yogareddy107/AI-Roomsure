import type { Property } from '../types.ts';

const allProperties: Property[] = [
    {
      id: 1,
      name: "Cozy Studio Koramangala",
      type: "Apartment",
      address: "1st Block, Koramangala, Bangalore",
      price: 25000,
      rating: 4.5,
      amenities: ["WiFi", "AC", "Geyser", "Parking", "TV"],
      imageUrls: [
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=800&auto=format&fit=crop"
      ],
      lat: 12.9279,
      lng: 77.6271,
      isFavorite: false,
      description: "A compact and modern studio apartment perfect for a single professional or a couple. Located in the heart of Koramangala with easy access to cafes and tech parks."
    },
    {
      id: 2,
      name: "Gents PG Indiranagar",
      type: "PG",
      address: "CMH Road, Indiranagar, Bangalore",
      price: 12000,
      rating: 4.2,
      amenities: ["WiFi", "Power Backup", "Washing Machine", "Food"],
      imageUrls: [
        "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1595526114035-0d45ed16433d?q=80&w=800&auto=format&fit=crop",
      ],
      lat: 12.9784,
      lng: 77.6408,
      isFavorite: false,
      description: "Affordable and clean paying guest accommodation for men. Includes three meals a day and high-speed internet. Close to Indiranagar metro station."
    },
    {
      id: 3,
      name: "Private Room HSR Layout",
      type: "Room",
      address: "Sector 4, HSR Layout, Bangalore",
      price: 18000,
      rating: 4.8,
      amenities: ["AC", "Geyser", "Parking", "Washing Machine"],
      imageUrls: [
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1618221118493-9cfa1a1202c1?q=80&w=800&auto=format&fit=crop"
      ],
      lat: 12.9121,
      lng: 77.6446,
      isFavorite: false,
      description: "A spacious private room in a shared 2BHK flat. The room has an attached bathroom and a balcony. Ideal for working professionals looking for a quiet space."
    },
    {
      id: 4,
      name: "Luxury 2BHK Jayanagar",
      type: "Apartment",
      address: "4th Block, Jayanagar, Bangalore",
      price: 45000,
      rating: 4.9,
      amenities: ["WiFi", "AC", "Power Backup", "Geyser", "TV", "Parking", "Washing Machine"],
      imageUrls: [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1613553424164-52570487b32d?q=80&w=800&auto=format&fit=crop"
      ],
      lat: 12.9308,
      lng: 77.5838,
      isFavorite: false,
      description: "A premium 2BHK apartment in a gated society with all modern amenities including a swimming pool and gym. Perfect for families."
    },
    {
        id: 5,
        name: "Ladies PG BTM Layout",
        type: "PG",
        address: "2nd Stage, BTM Layout, Bangalore",
        price: 9500,
        rating: 3.9,
        amenities: ["WiFi", "Food", "Washing Machine", "Geyser"],
        imageUrls: [
            "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=800&auto=format&fit=crop"
        ],
        lat: 12.9166,
        lng: 77.6101,
        isFavorite: false,
        description: "Budget-friendly and safe PG for women with homely food. Twin sharing rooms available. Close to major bus routes."
    },
    {
        id: 6,
        name: "Single Room Marathahalli",
        type: "Room",
        address: "Outer Ring Road, Marathahalli, Bangalore",
        price: 15000,
        rating: 4.0,
        amenities: ["WiFi", "AC", "Power Backup"],
        imageUrls: [
            "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1590490359854-dfba59585b73?q=80&w=800&auto=format&fit=crop"
        ],
        lat: 12.9569,
        lng: 77.7011,
        isFavorite: false,
        description: "An independent room for rent in a quiet residential area. Suitable for students or bachelors. No landlord interference."
    },
    {
      id: 7,
      name: "Modern 1BHK Whitefield",
      type: "Apartment",
      address: "ITPL Main Road, Whitefield, Bangalore",
      price: 22000,
      rating: 4.3,
      amenities: ["WiFi", "AC", "Power Backup", "Parking", "Geyser"],
      imageUrls: [
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=800&auto=format&fit=crop"
      ],
      lat: 12.9860,
      lng: 77.7499,
      isFavorite: false,
      description: "Well-furnished 1BHK flat near major IT parks in Whitefield. Comes with a modular kitchen and a dedicated parking spot."
    },
    {
      id: 8,
      name: "Student PG near Christ University",
      type: "PG",
      address: "Hosur Road, S.G. Palya, Bangalore",
      price: 8000,
      rating: 3.5,
      amenities: ["WiFi", "Food"],
      imageUrls: [
        "https://images.unsplash.com/photo-1608198093002-ad4b005f7633?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=800&auto=format&fit=crop"
      ],
      lat: 12.9348,
      lng: 77.6083,
      isFavorite: false,
      description: "Basic and affordable PG accommodation for students. Walking distance from Christ University. Triple and quad sharing rooms."
    },
    {
      id: 9,
      name: "Independent Room Malleshwaram",
      type: "Room",
      address: "8th Cross, Malleshwaram, Bangalore",
      price: 13000,
      rating: 4.1,
      amenities: ["Geyser", "Parking"],
      imageUrls: [
        "https://images.unsplash.com/photo-1571504211935-1c936b327211?q=80&w=800&auto=format&fit=crop"
      ],
      lat: 12.9982,
      lng: 77.5700,
      isFavorite: false,
      description: "A single room with a separate entrance in a traditional Bangalore house. Located in a peaceful and green neighborhood."
    },
    {
      id: 10,
      name: "Penthouse with Terrace",
      type: "Apartment",
      address: "Sadashivanagar, Bangalore",
      price: 50000,
      rating: 5.0,
      amenities: ["WiFi", "AC", "Power Backup", "Geyser", "TV", "Parking", "Washing Machine", "Food"],
      imageUrls: [
        "https://images.unsplash.com/photo-1613490493576-75de62addb69?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=800&auto=format&fit=crop"
      ],
      lat: 13.0068,
      lng: 77.5813,
      isFavorite: false,
      description: "Experience luxury living in this stunning penthouse with a private terrace garden. Offers panoramic views of the city. For those who want the best."
    }
];

export const fetchProperties = async (): Promise<Property[]> => {
  // Simulate network delay to show loading state
  await new Promise(resolve => setTimeout(resolve, 800));
  // Return a deep copy to prevent mutation of the original data
  return JSON.parse(JSON.stringify(allProperties));
};

export const getAboutDescription = async (): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return "PropertyFinder is a modern property rental platform designed to simplify your search for the perfect home. Leveraging the power of Google's Gemini AI, we offer an intuitive natural language search experience, allowing you to find PGs, rooms, and apartments that match your exact needs. Explore listings on our interactive map, compare your top choices side-by-side, and save your favorites with ease. Our mission is to make finding your next home a seamless and enjoyable journey.";
};