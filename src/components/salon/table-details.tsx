"use client"

import { useState } from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Users, Clock, Receipt, Ban } from "lucide-react"

interface Table {
  id: string
  number: number
  capacity: number
  status: string
}

interface TableDetailsProps {
  table: Table
  onClose: () => void
  onUpdate: (updates: TableUpdates) => void
}

interface TableUpdates {
  status?: string
  capacity?: number
}

export function TableDetails({ table, onClose, onUpdate }: TableDetailsProps) {
  const [orderItems, setOrderItems] = useState([
    { id: 1, name: "Hamburguesa Clásica", quantity: 2, price: 12.99 },
    { id: 2, name: "Coca-Cola", quantity: 2, price: 3.99 },
  ])

  const calculateTotal = () => {
    return orderItems.reduce((total, item) => total + (item.quantity * item.price), 0)
  }

  return (
    <Sheet open={true} onOpenChange={onClose}>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Mesa {table.number}</SheetTitle>
        </SheetHeader>
        
        <div className="py-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Estado</Label>
              <Select
                value={table.status}
                onValueChange={(value) => onUpdate({ status: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="free">Libre</SelectItem>
                  <SelectItem value="occupied">Ocupada</SelectItem>
                  <SelectItem value="reserved">Reservada</SelectItem>
                  <SelectItem value="waiting">Esperando</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Capacidad</Label>
              <Select
                value={table.capacity.toString()}
                onValueChange={(value) => onUpdate({ capacity: parseInt(value) })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar capacidad" />
                </SelectTrigger>
                <SelectContent>
                  {[2, 4, 6, 8, 10].map((cap) => (
                    <SelectItem key={cap} value={cap.toString()}>
                      {cap} personas
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {table.status === "occupied" && (
            <>
              <Separator />
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Orden Actual</h3>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="mr-1 h-4 w-4" />
                    <span>19:30</span>
                  </div>
                </div>

                <ScrollArea className="h-[200px] rounded-md border p-4">
                  <div className="space-y-4">
                    {orderItems.map((item) => (
                      <div key={item.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">
                            ${item.price.toFixed(2)} x {item.quantity}
                          </p>
                        </div>
                        <p className="font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                <div className="flex items-center justify-between font-bold">
                  <span>Total</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>

                <div className="flex space-x-2">
                  <Button className="flex-1">
                    <Receipt className="mr-2 h-4 w-4" />
                    Cerrar Cuenta
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Users className="mr-2 h-4 w-4" />
                    Dividir Cuenta
                  </Button>
                </div>
              </div>
            </>
          )}

          {table.status === "free" && (
            <Button className="w-full" variant="outline">
              <Users className="mr-2 h-4 w-4" />
              Asignar Mesa
            </Button>
          )}

          {table.status === "reserved" && (
            <Button className="w-full" variant="outline">
              <Ban className="mr-2 h-4 w-4" />
              Cancelar Reserva
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
