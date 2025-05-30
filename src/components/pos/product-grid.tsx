"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"

// Mock data - In a real app, this would come from an API
const products = [
  {
    id: 1,
    name: "Hamburguesa Clásica",
    price: 12.99,
    category: "comidas",
    image: "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg"
  },
  {
    id: 2,
    name: "Pizza Margherita",
    price: 15.99,
    category: "comidas",
    image: "https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg"
  },
  {
    id: 3,
    name: "Coca-Cola",
    price: 3.99,
    category: "bebidas",
    image: "https://images.pexels.com/photos/2983100/pexels-photo-2983100.jpeg"
  },
  {
    id: 4,
    name: "Tiramisú",
    price: 8.99,
    category: "postres",
    image: "https://images.pexels.com/photos/6341984/pexels-photo-6341984.jpeg"
  },
  // Add more products as needed
]

interface ProductGridProps {
  category: string
}

export function ProductGrid({ category }: ProductGridProps) {
  const filteredProducts = category === "todos" 
    ? products 
    : products.filter(product => product.category === category)

  const handleAddToOrder = (productId: number) => {
    // In a real app, this would dispatch an action to add the product to the order
    console.log("Adding product to order:", productId)
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {filteredProducts.map((product) => (
        <Card key={product.id} className="overflow-hidden">
          <div className="relative h-48">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
          <CardContent className="p-4">
            <div className="space-y-2">
              <h3 className="font-semibold">{product.name}</h3>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold">
                  ${product.price.toFixed(2)}
                </span>
                <Button 
                  size="sm"
                  onClick={() => handleAddToOrder(product.id)}
                >
                  Agregar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
