import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST() {
  try {
    const response = NextResponse.json({ message: "Sesión cerrada exitosamente" })
    response.cookies.delete("auth-token")
    return response
  } catch (error) {
    console.error("Logout error:", error)
    return NextResponse.json(
      { message: "Error al cerrar sesión" },
      { status: 500 }
    )
  }
}
