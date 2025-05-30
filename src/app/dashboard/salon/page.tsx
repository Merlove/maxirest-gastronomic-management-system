"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TableGrid } from "@/components/salon/table-grid"
import { TableDetails } from "@/components/salon/table-details"
import { Badge } from "@/components/ui/badge"
import { Users } from "lucide-react"

// Mock data - In a real app, this would come from an API
const initialTables = [
  { id: "1", number: 1, capacity: 4, status: "free" },
  { id: "2", number: 2, capacity: 2, status: "occupied" },
  { id: "3", number: 3, capacity: 6, status: "reserved" },
  { id: "4", number: 4, capacity: 4, status: "waiting" },
  { id: "5", number: 5, capacity: 8, status: "free" },
  { id: "6", number: 6, capacity: 4, status: "occupied" },
  { id: "7", number: 7, capacity: 2, status: "free" },
  { id: "8", number: 8, capacity: 4, status: "waiting" },
  { id: "9", number: 9, capacity: 6, status: "occupied" },
  { id: "10", number: 10, capacity: 4, status: "free" },
  { id: "11", number: 11, capacity: 2, status: "reserved" },
  { id: "12", number: 12, capacity: 4, status: "free" },
]

export default function SalonPage() {
  const [tables, setTables] = useState(initialTables)
  const [selectedTable, setSelectedTable] = useState<string | null>(null)

  const handleTableClick = (tableId: string) => {
    setSelectedTable(tableId)
  }

  const handleTableUpdate = (tableId: string, updates: any) => {
    setTables(tables.map(table => 
      table.id === tableId ? { ...table, ...updates } : table
    ))
  }

  const getStatusCounts = () => {
    return tables.reduce((acc, table) => {
      acc[table.status] = (acc[table.status] || 0) + 1
      return acc
    }, {} as Record<string, number>)
  }

  const statusCounts = getStatusCounts()

  return (
    <div className="flex h-screen">
      <div className="flex-1 p-6 overflow-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Gestión de Salón</h1>
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Capacidad Total: {tables.reduce((acc, table) => acc + table.capacity, 0)}</span>
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{statusCounts.free || 0}</div>
              <p className="text-xs text-muted-foreground">Mesas Libres</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{statusCounts.occupied || 0}</div>
              <p className="text-xs text-muted-foreground">Mesas Ocupadas</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{statusCounts.reserved || 0}</div>
              <p className="text-xs text-muted-foreground">Mesas Reservadas</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{statusCounts.waiting || 0}</div>
              <p className="text-xs text-muted-foreground">Mesas Esperando</p>
            </CardContent>
          </Card>
        </div>

        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Distribución de Mesas</CardTitle>
          </CardHeader>
          <CardContent>
            <TableGrid 
              tables={tables}
              onTableClick={handleTableClick}
              selectedTableId={selectedTable}
            />
          </CardContent>
        </Card>
      </div>

      {selectedTable && (
        <TableDetails
          table={tables.find(t => t.id === selectedTable)!}
          onClose={() => setSelectedTable(null)}
          onUpdate={(updates) => handleTableUpdate(selectedTable, updates)}
        />
      )}
    </div>
  )
}
