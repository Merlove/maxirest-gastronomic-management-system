"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Minus, Plus, Trash2 } from "lucide-react"

// Mock data - In a real app, this would come from a state management solution
const orderItems = [
  {
    id: 1,
    name: "Hamburguesa Clásica",
    price: 12.99,
    quantity: 2,
  },
  {
    id: 2,
    name: "Coca-Cola",
    price: 3.99,
    quantity: 3,
  },
  {
    id: 3,
    name: "Pizza Margherita",
    price: 15.99,
    quantity: 1,
  },
]

export function OrderSummary() {
  const handleIncreaseQuantity = (itemId: number) => {
    // In a real app, this would update the state
    console.log("Increasing quantity for item:", itemId)
  }

  const handleDecreaseQuantity = (itemId: number) => {
    // In a real app, this would update the state
    console.log("Decreasing quantity for item:", itemId)
  }

  const handleRemoveItem = (itemId: number) => {
    // In a real app, this would update the state
    console.log("Removing item:", itemId)
  }

  return (
    <ScrollArea className="flex-1 pr-4">
      <div className="space-y-4">
        {orderItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between space-x-4 border-b pb-4"
          >
            <div className="flex-1 space-y-1">
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-muted-foreground">
                ${item.price.toFixed(2)} c/u
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => handleDecreaseQuantity(item.id)}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center">{item.quantity}</span>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => handleIncreaseQuantity(item.id)}
              >
                <Plus className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-red-500 hover:text-red-600"
                onClick={() => handleRemoveItem(item.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}
