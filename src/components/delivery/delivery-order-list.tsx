"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Truck, CheckCircle, MapPin, Phone } from "lucide-react"

interface DeliveryOrder {
  id: string
  customer: string
  address: string
  phone: string
  status: string
  items: Array<{
    name: string
    quantity: number
    price: number
  }>
  total: number
  time: string
}

interface DeliveryOrderListProps {
  orders: DeliveryOrder[]
  onStatusChange: (orderId: string, newStatus: string) => void
}

export function DeliveryOrderList({ orders, onStatusChange }: DeliveryOrderListProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="destructive">Pendiente</Badge>
      case "in_transit":
        return <Badge variant="secondary">En Tránsito</Badge>
      case "delivered":
        return <Badge variant="default">Entregado</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getActionButton = (order: DeliveryOrder) => {
    switch (order.status) {
      case "pending":
        return (
          <Button
            size="sm"
            onClick={() => onStatusChange(order.id, "in_transit")}
          >
            <Truck className="mr-2 h-4 w-4" />
            Iniciar Entrega
          </Button>
        )
      case "in_transit":
        return (
          <Button
            size="sm"
            onClick={() => onStatusChange(order.id, "delivered")}
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            Marcar Entregado
          </Button>
        )
      case "delivered":
        return (
          <Button size="sm" variant="outline" disabled>
            <CheckCircle className="mr-2 h-4 w-4" />
            Entregado
          </Button>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <Card key={order.id}>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{order.customer}</h3>
                  {getStatusBadge(order.status)}
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="mr-2 h-4 w-4" />
                    {order.address}
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Phone className="mr-2 h-4 w-4" />
                    {order.phone}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span>
                        {item.quantity}x {item.name}
                      </span>
                      <span className="font-medium">
                        ${(item.quantity * item.price).toFixed(2)}
                      </span>
                    </div>
                  ))}
                  <div className="flex justify-between font-bold pt-2 border-t">
                    <span>Total</span>
                    <span>${order.total.toFixed(2)}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Hora: {order.time}
                  </span>
                  {getActionButton(order)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
