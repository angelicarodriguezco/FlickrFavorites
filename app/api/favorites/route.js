import { NextResponse } from 'next/server'
import connectDB from '../../../db'
import Image from '../../../models/Image'

export async function GET(request) {
  try {
    await connectDB()
    
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    
    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    const favorites = await Image.find({ userId }).populate('userId', 'username email')
    return NextResponse.json(favorites)
  } catch (error) {
    console.error('Error fetching favorites:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    await connectDB()
    
    const { imageUrl, userId, title } = await request.json()
    
    if (!imageUrl || !userId) {
      return NextResponse.json({ error: 'Image URL and user ID are required' }, { status: 400 })
    }

    const existingImage = await Image.findOne({ url: imageUrl, userId })
    if (existingImage) {
      return NextResponse.json({ error: 'Image already in favorites' }, { status: 409 })
    }

    const newImage = new Image({
      url: imageUrl,
      userId,
      title: title || 'Untitled'
    })

    await newImage.save()
    return NextResponse.json({ message: 'Image added to favorites', image: newImage })
  } catch (error) {
    console.error('Error adding favorite:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(request) {
  try {
    await connectDB()
    
    const { imageUrl, userId, newTitle } = await request.json()
    
    if (!imageUrl || !userId || !newTitle) {
      return NextResponse.json({ error: 'Image URL, user ID, and new title are required' }, { status: 400 })
    }

    const updatedImage = await Image.findOneAndUpdate(
      { url: imageUrl, userId },
      { title: newTitle },
      { new: true }
    )

    if (!updatedImage) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Title updated successfully', image: updatedImage })
  } catch (error) {
    console.error('Error updating title:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(request) {
  try {
    await connectDB()
    
    const { imageUrl, userId } = await request.json()
    
    if (!imageUrl || !userId) {
      return NextResponse.json({ error: 'Image URL and user ID are required' }, { status: 400 })
    }

    const deletedImage = await Image.findOneAndDelete({ url: imageUrl, userId })

    if (!deletedImage) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Image removed from favorites' })
  } catch (error) {
    console.error('Error removing favorite:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
