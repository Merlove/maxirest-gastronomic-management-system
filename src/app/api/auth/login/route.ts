import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { sign } from "jsonwebtoken"

// Mock user data - In a real app, this would come from a database
const MOCK_USER = {
  id: "1",
  email: "admin@maxirest.com",
  name: "Admin",
  role: "ADMIN",
  password: "admin123", // In a real app, this would be hashed
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    // In a real app, validate credentials against database
    if (email === MOCK_USER.email && password === MOCK_USER.password) {
      // Create session token
      const token = sign(
        {
          id: MOCK_USER.id,
          email: MOCK_USER.email,
          role: MOCK_USER.role,
        },
        process.env.NEXTAUTH_SECRET || "your-secret-key",
        { expiresIn: "1d" }
      )

      // Create response with user data
      const response = NextResponse.json({ 
        user: {
          id: MOCK_USER.id,
          email: MOCK_USER.email,
          name: MOCK_USER.name,
          role: MOCK_USER.role
        }
      })

      // Set cookie in response
      response.cookies.set("auth-token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 86400, // 1 day
        path: "/",
      })

      return response
    }

    return NextResponse.json(
      { message: "Credenciales inválidas" },
      { status: 401 }
    )
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json(
      { message: "Error al procesar la solicitud" },
      { status: 500 }
    )
  }
}
