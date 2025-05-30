"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutGrid,
  ChefHat,
  UtensilsCrossed,
  Users,
  ClipboardList,
  Truck,
  Settings,
  LogOut
} from "lucide-react"

const routes = [
  {
    label: "Panel Principal",
    icon: LayoutGrid,
    href: "/dashboard",
  },
  {
    label: "Punto de Venta",
    icon: UtensilsCrossed,
    href: "/dashboard/pos",
  },
  {
    label: "Gestión de Salón",
    icon: Users,
    href: "/dashboard/salon",
  },
  {
    label: "Cocina",
    icon: ChefHat,
    href: "/dashboard/cocina",
  },
  {
    label: "Pedidos",
    icon: ClipboardList,
    href: "/dashboard/pedidos",
  },
  {
    label: "Delivery",
    icon: Truck,
    href: "/dashboard/delivery",
  },
  {
    label: "Configuración",
    icon: Settings,
    href: "/dashboard/configuracion",
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-black text-white">
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold">
          MaxiRest
        </h2>
      </div>
      <ScrollArea className="flex-1 px-3">
        <div className="space-y-1">
          {routes.map((route) => (
            <Button
              key={route.href}
              asChild
              variant={pathname === route.href ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start",
                pathname === route.href ? "bg-white/10" : "hover:bg-white/10"
              )}
            >
              <Link href={route.href}>
                <route.icon className="mr-2 h-5 w-5" />
                {route.label}
              </Link>
            </Button>
          ))}
        </div>
      </ScrollArea>
      <div className="px-3 py-2">
        <Button
          variant="ghost"
          className="w-full justify-start text-red-500 hover:bg-red-500/10 hover:text-red-500"
        >
          <LogOut className="mr-2 h-5 w-5" />
          Cerrar Sesión
        </Button>
      </div>
    </div>
  )
}
