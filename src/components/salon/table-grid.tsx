"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Table {
  id: string
  number: number
  capacity: number
  status: string
}

interface TableGridProps {
  tables: Table[]
  onTableClick: (tableId: string) => void
  selectedTableId: string | null
}

export function TableGrid({ tables, onTableClick, selectedTableId }: TableGridProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "free":
        return "bg-green-100 hover:bg-green-200 border-green-500"
      case "occupied":
        return "bg-red-100 hover:bg-red-200 border-red-500"
      case "reserved":
        return "bg-blue-100 hover:bg-blue-200 border-blue-500"
      case "waiting":
        return "bg-yellow-100 hover:bg-yellow-200 border-yellow-500"
      default:
        return "bg-gray-100 hover:bg-gray-200 border-gray-500"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "free":
        return "Libre"
      case "occupied":
        return "Ocupada"
      case "reserved":
        return "Reservada"
      case "waiting":
        return "Esperando"
      default:
        return status
    }
  }

  return (
    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {tables.map((table) => (
        <Button
          key={table.id}
          variant="outline"
          className={cn(
            "h-32 p-4 flex flex-col items-center justify-center border-2",
            getStatusColor(table.status),
            selectedTableId === table.id && "ring-2 ring-black ring-offset-2"
          )}
          onClick={() => onTableClick(table.id)}
        >
          <span className="text-xl font-bold mb-1">Mesa {table.number}</span>
          <span className="text-sm mb-1">{table.capacity} personas</span>
          <span className="text-xs text-muted-foreground">
            {getStatusText(table.status)}
          </span>
        </Button>
      ))}
    </div>
  )
}
