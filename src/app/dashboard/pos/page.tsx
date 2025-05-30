"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProductGrid } from "@/components/pos/product-grid"
import { OrderSummary } from "@/components/pos/order-summary"
import { PaymentModal } from "@/components/pos/payment-modal"

export default function POSPage() {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Products Section */}
      <div className="flex-1 p-6 overflow-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Punto de Venta</h1>
        </div>

        <Tabs defaultValue="todos" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="todos">Todos</TabsTrigger>
            <TabsTrigger value="comidas">Comidas</TabsTrigger>
            <TabsTrigger value="bebidas">Bebidas</TabsTrigger>
            <TabsTrigger value="postres">Postres</TabsTrigger>
          </TabsList>
          <TabsContent value="todos">
            <ProductGrid category="todos" />
          </TabsContent>
          <TabsContent value="comidas">
            <ProductGrid category="comidas" />
          </TabsContent>
          <TabsContent value="bebidas">
            <ProductGrid category="bebidas" />
          </TabsContent>
          <TabsContent value="postres">
            <ProductGrid category="postres" />
          </TabsContent>
        </Tabs>
      </div>

      {/* Order Summary Section */}
      <Card className="w-[400px] h-screen rounded-none border-l">
        <CardHeader>
          <CardTitle>Orden Actual</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col h-[calc(100vh-140px)]">
          <OrderSummary />
          <div className="mt-auto space-y-4">
            <div className="flex items-center justify-between text-lg font-bold">
              <span>Total</span>
              <span>$2,458.00</span>
            </div>
            <Button 
              className="w-full" 
              size="lg"
              onClick={() => setIsPaymentModalOpen(true)}
            >
              Proceder al Pago
            </Button>
          </div>
        </CardContent>
      </Card>

      <PaymentModal 
        open={isPaymentModalOpen} 
        onClose={() => setIsPaymentModalOpen(false)}
      />
    </div>
  )
}
