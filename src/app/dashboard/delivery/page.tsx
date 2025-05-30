"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DeliveryOrderList } from "@/components/delivery/delivery-order-list"
import { NewDeliveryOrder } from "@/components/delivery/new-delivery-order"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PlusCircle, Truck, Clock, CheckCircle } from "lucide-react"

// Mock data - In a real app, this would come from an API
const initialOrders = [
  {
    id: "1",
    customer: "Juan Pérez",
    address: "Av. Principal 123",
    phone: "+54 11 1234-5678",
    status: "pending",
    items: [
      { name: "Pizza Margherita", quantity: 1, price: 15.99 },
      { name: "Coca-Cola 2L", quantity: 1, price: 3.99 },
    ],
    total: 19.98,
    time: "19:30",
  },
  {
    id: "2",
    customer: "María González",
    address: "Calle 456",
    phone: "+54 11 8765-4321",
    status: "in_transit",
    items: [
      { name: "Hamburguesa Completa", quantity: 2, price: 12.99 },
      { name: "Papas Fritas", quantity: 2, price: 4.99 },
      { name: "Sprite 1.5L", quantity: 1, price: 2.99 },
    ],
    total: 38.95,
    time: "19:15",
  },
]

export default function DeliveryPage() {
  const [showNewOrder, setShowNewOrder] = useState(false)
  const [orders, setOrders] = useState(initialOrders)

  const handleStatusChange = (orderId: string, newStatus: string) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ))
  }

  const handleNewOrder = (order: any) => {
    setOrders([...orders, { ...order, id: (orders.length + 1).toString() }])
    setShowNewOrder(false)
  }

  const getStatusCounts = () => {
    return orders.reduce((acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1
      return acc
    }, {} as Record<string, number>)
  }

  const statusCounts = getStatusCounts()

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Gestión de Delivery</h1>
        <Button onClick={() => setShowNewOrder(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Nuevo Pedido
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Pendientes
                </p>
                <p className="text-2xl font-bold">{statusCounts.pending || 0}</p>
              </div>
              <Clock className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  En Tránsito
                </p>
                <p className="text-2xl font-bold">{statusCounts.in_transit || 0}</p>
              </div>
              <Truck className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Entregados
                </p>
                <p className="text-2xl font-bold">{statusCounts.delivered || 0}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="flex-1">
        <CardHeader>
          <CardTitle>Pedidos</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList>
              <TabsTrigger value="all">Todos</TabsTrigger>
              <TabsTrigger value="pending">Pendientes</TabsTrigger>
              <TabsTrigger value="in_transit">En Tránsito</TabsTrigger>
              <TabsTrigger value="delivered">Entregados</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-4">
              <DeliveryOrderList
                orders={orders}
                onStatusChange={handleStatusChange}
              />
            </TabsContent>

            <TabsContent value="pending" className="mt-4">
              <DeliveryOrderList
                orders={orders.filter(order => order.status === "pending")}
                onStatusChange={handleStatusChange}
              />
            </TabsContent>

            <TabsContent value="in_transit" className="mt-4">
              <DeliveryOrderList
                orders={orders.filter(order => order.status === "in_transit")}
                onStatusChange={handleStatusChange}
              />
            </TabsContent>

            <TabsContent value="delivered" className="mt-4">
              <DeliveryOrderList
                orders={orders.filter(order => order.status === "delivered")}
                onStatusChange={handleStatusChange}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <NewDeliveryOrder
        open={showNewOrder}
        onClose={() => setShowNewOrder(false)}
        onSubmit={handleNewOrder}
      />
    </div>
  )
}
