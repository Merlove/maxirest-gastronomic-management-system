"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Calendar, CheckCircle2, AlertCircle } from "lucide-react"

export function SubscriptionSettings() {
  const [plan, setPlan] = useState("premium")
  const [paymentMethod, setPaymentMethod] = useState("card")

  // Mock subscription data - In a real app, this would come from an API
  const subscriptionData = {
    status: "active",
    nextBilling: "2024-04-01",
    amount: 49.99,
    features: [
      "Acceso completo al sistema",
      "Soporte prioritario 24/7",
      "Múltiples usuarios",
      "Reportes avanzados",
      "Backup automático",
    ],
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-2xl font-bold tracking-tight">Plan Actual</h3>
          <p className="text-sm text-muted-foreground">
            Tu suscripción se renovará el {subscriptionData.nextBilling}
          </p>
        </div>
        <Badge variant="secondary" className="flex items-center">
          <CheckCircle2 className="mr-2 h-4 w-4" />
          Activa
        </Badge>
      </div>

      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Plan Premium</CardTitle>
            <CardDescription>
              ${subscriptionData.amount}/mes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              {subscriptionData.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                  {feature}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Método de Pago</CardTitle>
            <CardDescription>
              Selecciona tu método de pago preferido
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup
              defaultValue={paymentMethod}
              onValueChange={setPaymentMethod}
              className="grid grid-cols-3 gap-4"
            >
              <div>
                <RadioGroupItem
                  value="card"
                  id="card"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="card"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <CreditCard className="mb-3 h-6 w-6" />
                  Tarjeta
                </Label>
              </div>
              <div>
                <RadioGroupItem
                  value="mercadopago"
                  id="mercadopago"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="mercadopago"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <img
                    src="https://http2.mlstatic.com/frontend-assets/mp-web-navigation/logo-mercadopago.png"
                    alt="Mercado Pago"
                    className="mb-3 h-6"
                  />
                  Mercado Pago
                </Label>
              </div>
              <div>
                <RadioGroupItem
                  value="transfer"
                  id="transfer"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="transfer"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <Calendar className="mb-3 h-6 w-6" />
                  Transferencia
                </Label>
              </div>
            </RadioGroup>

            {paymentMethod === "card" && (
              <div className="mt-6 space-y-4">
                <div className="space-y-2">
                  <Label>Número de Tarjeta</Label>
                  <Input placeholder="1234 5678 9012 3456" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Fecha de Vencimiento</Label>
                    <Input placeholder="MM/YY" />
                  </div>
                  <div className="space-y-2">
                    <Label>CVV</Label>
                    <Input placeholder="123" />
                  </div>
                </div>
              </div>
            )}

            <div className="mt-6">
              <Button className="w-full">
                Actualizar Método de Pago
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Historial de Pagos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium">Marzo 2024</p>
                  <p className="text-sm text-muted-foreground">01/03/2024</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">${subscriptionData.amount}</p>
                  <Badge variant="outline" className="ml-2">Pagado</Badge>
                </div>
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium">Febrero 2024</p>
                  <p className="text-sm text-muted-foreground">01/02/2024</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">${subscriptionData.amount}</p>
                  <Badge variant="outline" className="ml-2">Pagado</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
