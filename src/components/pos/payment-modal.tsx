"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent } from "@/components/ui/card"
import { CreditCard, QrCode, Wallet, Receipt } from "lucide-react"

interface PaymentModalProps {
  open: boolean
  onClose: () => void
}

const paymentMethods = [
  {
    id: "card",
    name: "Tarjeta",
    icon: CreditCard,
  },
  {
    id: "qr",
    name: "QR",
    icon: QrCode,
  },
  {
    id: "cash",
    name: "Efectivo",
    icon: Wallet,
  },
  {
    id: "transfer",
    name: "Transferencia",
    icon: Receipt,
  },
]

export function PaymentModal({ open, onClose }: PaymentModalProps) {
  const [selectedMethod, setSelectedMethod] = useState("card")
  const [amount, setAmount] = useState("2458.00") // In a real app, this would come from the order total

  const handlePayment = () => {
    // In a real app, this would process the payment
    console.log("Processing payment:", {
      method: selectedMethod,
      amount,
    })
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Procesar Pago</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6">
          <div className="space-y-2">
            <Label>Método de Pago</Label>
            <RadioGroup
              defaultValue={selectedMethod}
              onValueChange={setSelectedMethod}
              className="grid grid-cols-2 gap-4"
            >
              {paymentMethods.map((method) => (
                <Card key={method.id}>
                  <CardContent className="flex items-center space-x-4 p-4">
                    <RadioGroupItem value={method.id} id={method.id} className="peer" />
                    <Label
                      htmlFor={method.id}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <method.icon className="h-5 w-5" />
                      <span>{method.name}</span>
                    </Label>
                  </CardContent>
                </Card>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Monto a Cobrar</Label>
            <Input
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              type="number"
              step="0.01"
              min="0"
            />
          </div>

          {selectedMethod === "cash" && (
            <div className="space-y-2">
              <Label htmlFor="received">Monto Recibido</Label>
              <Input
                id="received"
                type="number"
                step="0.01"
                min="0"
                placeholder="Ingrese el monto recibido"
              />
            </div>
          )}

          <Button onClick={handlePayment} className="w-full">
            Procesar Pago
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
