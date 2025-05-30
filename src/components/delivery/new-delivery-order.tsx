"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { PlusCircle, MinusCircle } from "lucide-react"

interface NewDeliveryOrderProps {
  open: boolean
  onClose: () => void
  onSubmit: (order: any) => void
}

// Mock products - In a real app, this would come from an API
const products = [
  { id: 1, name: "Pizza Margherita", price: 15.99 },
  { id: 2, name: "Hamburguesa Completa", price: 12.99 },
  { id: 3, name: "Papas Fritas", price: 4.99 },
  { id: 4, name: "Coca-Cola 2L", price: 3.99 },
  { id: 5, name: "Sprite 1.5L", price: 2.99 },
]

export function NewDeliveryOrder({ open, onClose, onSubmit }: NewDeliveryOrderProps) {
  const [customerInfo, setCustomerInfo] = useState({
    customer: "",
    address: "",
    phone: "",
  })

  const [orderItems, setOrderItems] = useState<Array<{
    id: number
    name: string
    quantity: number
    price: number
  }>>([])

  const handleAddItem = (product: typeof products[0]) => {
    const existingItem = orderItems.find(item => item.id === product.id)
    
    if (existingItem) {
      setOrderItems(orderItems.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ))
    } else {
      setOrderItems([...orderItems, { ...product, quantity: 1 }])
    }
  }

  const handleRemoveItem = (productId: number) => {
    setOrderItems(orderItems.map(item =>
      item.id === productId && item.quantity > 0
        ? { ...item, quantity: item.quantity - 1 }
        : item
    ).filter(item => item.quantity > 0))
  }

  const calculateTotal = () => {
    return orderItems.reduce((total, item) => total + (item.quantity * item.price), 0)
  }

  const handleSubmit = () => {
    const newOrder = {
      ...customerInfo,
      items: orderItems,
      total: calculateTotal(),
      status: "pending",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }
    onSubmit(newOrder)
    setCustomerInfo({ customer: "", address: "", phone: "" })
    setOrderItems([])
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Nuevo Pedido de Delivery</DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="customer">Cliente</Label>
              <Input
                id="customer"
                value={customerInfo.customer}
                onChange={(e) => setCustomerInfo({ ...customerInfo, customer: e.target.value })}
                placeholder="Nombre del cliente"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Dirección</Label>
              <Input
                id="address"
                value={customerInfo.address}
                onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                placeholder="Dirección de entrega"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Teléfono</Label>
              <Input
                id="phone"
                value={customerInfo.phone}
                onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                placeholder="Número de teléfono"
              />
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <Label>Productos</Label>
            <ScrollArea className="h-[200px] rounded-md border p-4">
              <div className="space-y-4">
                {products.map((product) => {
                  const orderItem = orderItems.find(item => item.id === product.id)
                  return (
                    <div key={product.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">
                          ${product.price.toFixed(2)}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleRemoveItem(product.id)}
                          disabled={!orderItem}
                        >
                          <MinusCircle className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center">
                          {orderItem?.quantity || 0}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleAddItem(product)}
                        >
                          <PlusCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </ScrollArea>
          </div>

          <div className="flex items-center justify-between font-bold">
            <span>Total</span>
            <span>${calculateTotal().toFixed(2)}</span>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={
              !customerInfo.customer ||
              !customerInfo.address ||
              !customerInfo.phone ||
              orderItems.length === 0
            }
          >
            Crear Pedido
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
