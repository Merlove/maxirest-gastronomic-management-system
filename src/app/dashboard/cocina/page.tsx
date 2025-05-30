"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { OrderCard } from "@/components/kitchen/order-card"
import { Badge } from "@/components/ui/badge"
import { Clock, CheckCircle2 } from "lucide-react"

// Mock data - In a real app, this would come from an API
const orders = [
  {
    id: "1",
    table: "Mesa 4",
    status: "pending",
    time: "10:30",
    items: [
      { name: "Hamburguesa Clásica", quantity: 2, notes: "Sin cebolla" },
      { name: "Papas Fritas", quantity: 2, notes: "" },
    ],
  },
  {
    id: "2",
    table: "Mesa 7",
    status: "in_progress",
    time: "10:35",
    items: [
      { name: "Pizza Margherita", quantity: 1, notes: "Extra queso" },
      { name: "Ensalada César", quantity: 1, notes: "Sin anchoas" },
    ],
  },
  {
    id: "3",
    table: "Delivery #123",
    status: "ready",
    time: "10:25",
    items: [
      { name: "Pasta Carbonara", quantity: 1, notes: "" },
      { name: "Pan de Ajo", quantity: 1, notes: "" },
    ],
  },
]

export default function KitchenPage() {
  const [activeOrders, setActiveOrders] = useState(orders)

  const handleStatusChange = (orderId: string, newStatus: string) => {
    setActiveOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ))
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Monitor de Cocina</h1>
        <div className="flex items-center space-x-4">
          <Badge variant="outline" className="flex items-center space-x-2">
            <Clock className="h-4 w-4" />
            <span>Actualizado: 10:45</span>
          </Badge>
          <Badge variant="secondary" className="flex items-center space-x-2">
            <CheckCircle2 className="h-4 w-4" />
            <span>Órdenes Completadas: 15</span>
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">Todas</TabsTrigger>
          <TabsTrigger value="pending">Pendientes</TabsTrigger>
          <TabsTrigger value="in_progress">En Preparación</TabsTrigger>
          <TabsTrigger value="ready">Listas</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pending" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeOrders
              .filter((order) => order.status === "pending")
              .map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  onStatusChange={handleStatusChange}
                />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="in_progress" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeOrders
              .filter((order) => order.status === "in_progress")
              .map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  onStatusChange={handleStatusChange}
                />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="ready" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeOrders
              .filter((order) => order.status === "ready")
              .map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  onStatusChange={handleStatusChange}
                />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
