"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { Save, Upload } from "lucide-react"

export function RestaurantSettings() {
  // Mock data - In a real app, this would come from an API
  const [settings, setSettings] = useState({
    name: "Mi Restaurante",
    description: "El mejor restaurante de la ciudad",
    address: "Av. Principal 123",
    phone: "+54 11 1234-5678",
    email: "contacto@mirestaurante.com",
    openTime: "11:00",
    closeTime: "23:00",
    features: {
      delivery: true,
      reservations: true,
      onlineOrders: true,
      qrMenu: true,
    },
    notifications: {
      newOrders: true,
      lowStock: true,
      reservations: true,
    },
  })

  const handleSave = () => {
    // In a real app, this would make an API call
    toast.success("Configuración guardada exitosamente")
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6">
        <div className="space-y-2">
          <Label htmlFor="logo">Logo del Restaurante</Label>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-center">
                <div className="relative h-32 w-32">
                  <div className="absolute inset-0 flex items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25">
                    <Button variant="outline">
                      <Upload className="mr-2 h-4 w-4" />
                      Subir Logo
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre del Restaurante</Label>
            <Input
              id="name"
              value={settings.name}
              onChange={(e) =>
                setSettings({ ...settings, name: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              value={settings.description}
              onChange={(e) =>
                setSettings({ ...settings, description: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="address">Dirección</Label>
              <Input
                id="address"
                value={settings.address}
                onChange={(e) =>
                  setSettings({ ...settings, address: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Teléfono</Label>
              <Input
                id="phone"
                value={settings.phone}
                onChange={(e) =>
                  setSettings({ ...settings, phone: e.target.value })
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={settings.email}
              onChange={(e) =>
                setSettings({ ...settings, email: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="openTime">Horario de Apertura</Label>
              <Input
                id="openTime"
                type="time"
                value={settings.openTime}
                onChange={(e) =>
                  setSettings({ ...settings, openTime: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="closeTime">Horario de Cierre</Label>
              <Input
                id="closeTime"
                type="time"
                value={settings.closeTime}
                onChange={(e) =>
                  setSettings({ ...settings, closeTime: e.target.value })
                }
              />
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Características</h3>
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="delivery">Delivery</Label>
              <Switch
                id="delivery"
                checked={settings.features.delivery}
                onCheckedChange={(checked) =>
                  setSettings({
                    ...settings,
                    features: { ...settings.features, delivery: checked },
                  })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="reservations">Reservas</Label>
              <Switch
                id="reservations"
                checked={settings.features.reservations}
                onCheckedChange={(checked) =>
                  setSettings({
                    ...settings,
                    features: { ...settings.features, reservations: checked },
                  })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="onlineOrders">Pedidos Online</Label>
              <Switch
                id="onlineOrders"
                checked={settings.features.onlineOrders}
                onCheckedChange={(checked) =>
                  setSettings({
                    ...settings,
                    features: { ...settings.features, onlineOrders: checked },
                  })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="qrMenu">Menú QR</Label>
              <Switch
                id="qrMenu"
                checked={settings.features.qrMenu}
                onCheckedChange={(checked) =>
                  setSettings({
                    ...settings,
                    features: { ...settings.features, qrMenu: checked },
                  })
                }
              />
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Notificaciones</h3>
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="newOrders">Nuevos Pedidos</Label>
              <Switch
                id="newOrders"
                checked={settings.notifications.newOrders}
                onCheckedChange={(checked) =>
                  setSettings({
                    ...settings,
                    notifications: { ...settings.notifications, newOrders: checked },
                  })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="lowStock">Stock Bajo</Label>
              <Switch
                id="lowStock"
                checked={settings.notifications.lowStock}
                onCheckedChange={(checked) =>
                  setSettings({
                    ...settings,
                    notifications: { ...settings.notifications, lowStock: checked },
                  })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="notifyReservations">Reservas</Label>
              <Switch
                id="notifyReservations"
                checked={settings.notifications.reservations}
                onCheckedChange={(checked) =>
                  setSettings({
                    ...settings,
                    notifications: { ...settings.notifications, reservations: checked },
                  })
                }
              />
            </div>
          </div>
        </div>

        <Button onClick={handleSave} className="w-full">
          <Save className="mr-2 h-4 w-4" />
          Guardar Cambios
        </Button>
      </div>
    </div>
  )
}
