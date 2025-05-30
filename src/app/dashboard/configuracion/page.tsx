"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { EmployeeList } from "@/components/config/employee-list"
import { SubscriptionSettings } from "@/components/config/subscription-settings"
import { RestaurantSettings } from "@/components/config/restaurant-settings"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, CreditCard, Settings2 } from "lucide-react"

export default function ConfigurationPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Configuración</h1>
          <p className="text-muted-foreground">
            Administra la configuración de tu restaurante
          </p>
        </div>
        <Badge variant="secondary" className="flex items-center">
          <CreditCard className="mr-2 h-4 w-4" />
          Suscripción Activa
        </Badge>
      </div>

      <Tabs defaultValue="restaurant" className="space-y-6">
        <TabsList>
          <TabsTrigger value="restaurant">
            <Settings2 className="mr-2 h-4 w-4" />
            Restaurante
          </TabsTrigger>
          <TabsTrigger value="employees">
            <Users className="mr-2 h-4 w-4" />
            Empleados
          </TabsTrigger>
          <TabsTrigger value="subscription">
            <CreditCard className="mr-2 h-4 w-4" />
            Suscripción
          </TabsTrigger>
        </TabsList>

        <TabsContent value="restaurant">
          <Card>
            <CardHeader>
              <CardTitle>Configuración del Restaurante</CardTitle>
              <CardDescription>
                Administra la información y configuración general de tu restaurante
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RestaurantSettings />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="employees">
          <Card>
            <CardHeader>
              <CardTitle>Gestión de Empleados</CardTitle>
              <CardDescription>
                Administra los empleados y sus roles en el sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <EmployeeList />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subscription">
          <Card>
            <CardHeader>
              <CardTitle>Suscripción</CardTitle>
              <CardDescription>
                Administra tu plan de suscripción y métodos de pago
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SubscriptionSettings />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
