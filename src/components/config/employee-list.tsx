"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, Pencil, Trash2 } from "lucide-react"

// Mock data - In a real app, this would come from an API
const initialEmployees = [
  {
    id: "1",
    name: "Juan Pérez",
    email: "juan@example.com",
    role: "WAITER",
    status: "active",
  },
  {
    id: "2",
    name: "María González",
    email: "maria@example.com",
    role: "KITCHEN",
    status: "active",
  },
  {
    id: "3",
    name: "Carlos López",
    email: "carlos@example.com",
    role: "DELIVERY",
    status: "active",
  },
]

export function EmployeeList() {
  const [employees, setEmployees] = useState(initialEmployees)
  const [isAddingEmployee, setIsAddingEmployee] = useState(false)
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    email: "",
    role: "WAITER",
  })

  const handleAddEmployee = () => {
    const employee = {
      id: (employees.length + 1).toString(),
      ...newEmployee,
      status: "active",
    }
    setEmployees([...employees, employee])
    setNewEmployee({ name: "", email: "", role: "WAITER" })
    setIsAddingEmployee(false)
  }

  const handleDeleteEmployee = (id: string) => {
    setEmployees(employees.filter(emp => emp.id !== id))
  }

  const getRoleBadge = (role: string) => {
    const variants: Record<string, string> = {
      ADMIN: "default",
      WAITER: "secondary",
      KITCHEN: "outline",
      DELIVERY: "destructive",
    }
    return <Badge variant={variants[role] as any}>{role}</Badge>
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Dialog open={isAddingEmployee} onOpenChange={setIsAddingEmployee}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Agregar Empleado
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Agregar Nuevo Empleado</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre</Label>
                <Input
                  id="name"
                  value={newEmployee.name}
                  onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newEmployee.email}
                  onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Rol</Label>
                <Select
                  value={newEmployee.role}
                  onValueChange={(value) => setNewEmployee({ ...newEmployee, role: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar rol" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ADMIN">Administrador</SelectItem>
                    <SelectItem value="WAITER">Mozo</SelectItem>
                    <SelectItem value="KITCHEN">Cocina</SelectItem>
                    <SelectItem value="DELIVERY">Delivery</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                onClick={handleAddEmployee}
                disabled={!newEmployee.name || !newEmployee.email}
              >
                Agregar Empleado
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Rol</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{getRoleBadge(employee.role)}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="capitalize">
                    {employee.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button variant="ghost" size="icon">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteEmployee(employee.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
