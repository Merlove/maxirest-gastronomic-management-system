import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verify } from "jsonwebtoken"

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")

    if (!token?.value) {
      return NextResponse.json({ user: null })
    }

    try {
      const decoded = verify(
        token.value,
        process.env.NEXTAUTH_SECRET || "your-secret-key"
      ) as {
        id: string
        email: string
        role: string
      }

      // In a real app, fetch user data from database using decoded token
      const user = {
        id: decoded.id,
        email: decoded.email,
        role: decoded.role,
      }

      return NextResponse.json({ user })
    } catch (verifyError) {
      console.error("Token verification error:", verifyError)
      // If token is invalid, return null user
      return NextResponse.json({ user: null })
    }
  } catch (error) {
    console.error("Session error:", error)
    return NextResponse.json({ user: null })
  }
}
