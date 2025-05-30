"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, ChefHat, CheckCircle } from "lucide-react"

interface OrderItem {
  name: string
  quantity: number
  notes?: string
}

interface Order {
  id: string
  table: string
  status: string
  time: string
  items: OrderItem[]
}

interface OrderCardProps {
  order: Order
  onStatusChange: (orderId: string, newStatus: string) => void
}

export function OrderCard({ order, onStatusChange }: OrderCardProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="destructive">Pendiente</Badge>
      case "in_progress":
        return <Badge variant="secondary">En Preparación</Badge>
      case "ready":
        return <Badge variant="default">Listo</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getNextStatus = (currentStatus: string) => {
    switch (currentStatus) {
      case "pending":
        return "in_progress"
      case "in_progress":
        return "ready"
      default:
        return currentStatus
    }
  }

  const getActionButton = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Button
            className="w-full"
            onClick={() => onStatusChange(order.id, "in_progress")}
          >
            <ChefHat className="mr-2 h-4 w-4" />
            Comenzar Preparación
          </Button>
        )
      case "in_progress":
        return (
          <Button
            className="w-full"
            onClick={() => onStatusChange(order.id, "ready")}
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            Marcar como Listo
          </Button>
        )
      case "ready":
        return (
          <Button
            variant="secondary"
            className="w-full"
            disabled
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            Orden Lista
          </Button>
        )
      default:
        return null
    }
  }

  return (
    <Card className={order.status === "ready" ? "opacity-60" : ""}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <h3 className="font-bold">{order.table}</h3>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="mr-1 h-4 w-4" />
            {order.time}
          </div>
        </div>
        {getStatusBadge(order.status)}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            {order.items.map((item, index) => (
              <div
                key={index}
                className="flex items-start justify-between border-b pb-2 last:border-0"
              >
                <div>
                  <p className="font-medium">
                    {item.quantity}x {item.name}
                  </p>
                  {item.notes && (
                    <p className="text-sm text-muted-foreground">
                      Nota: {item.notes}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
          {getActionButton(order.status)}
        </div>
      </CardContent>
    </Card>
  )
}
