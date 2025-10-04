import { NextResponse } from 'next/server'
import connectDB from '../../../../db'
import User from '../../../../models/User'

export async function POST(request) {
  try {
    await connectDB()
    
    const { email, password } = await request.json()
    
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    const user = await User.findOne({ email })
    
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    const isPasswordValid = await user.comparePassword(password)
    
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    user.lastLogin = new Date()
    await user.save()

    const { password: _, ...userWithoutPassword } = user.toObject()

    return NextResponse.json(
      {
        message: 'Login successful',
        user: userWithoutPassword
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
