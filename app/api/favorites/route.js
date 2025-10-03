import { NextResponse } from 'next/server'
import connectDB from '../../../db'
import Image from '../../../models/Image'

export async function GET(request, { params }) {
  try {
    await connectDB()
    
    const { searchParams } = new URL(request.url)
    const username = searchParams.get('username') || params?.username
    
    if (!username) {
      return NextResponse.json({ error: 'Username is required' }, { status: 400 })
    }

    const favorites = await Image.find({ username })
    return NextResponse.json(favorites)
  } catch (error) {
    console.error('Error fetching favorites:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    await connectDB()
    
    const { imageUrl, username, title } = await request.json()
    
    if (!imageUrl || !username) {
      return NextResponse.json({ error: 'Image URL and username are required' }, { status: 400 })
    }

    const existingImage = await Image.findOne({ url: imageUrl, username })
    if (existingImage) {
      return NextResponse.json({ error: 'Image already in favorites' }, { status: 409 })
    }

    const newImage = new Image({
      url: imageUrl,
      username,
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
    
    const { imageUrl, username, newTitle } = await request.json()
    
    if (!imageUrl || !username || !newTitle) {
      return NextResponse.json({ error: 'Image URL, username, and new title are required' }, { status: 400 })
    }

    const updatedImage = await Image.findOneAndUpdate(
      { url: imageUrl, username },
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
    
    const { imageUrl, username } = await request.json()
    
    if (!imageUrl || !username) {
      return NextResponse.json({ error: 'Image URL and username are required' }, { status: 400 })
    }

    const deletedImage = await Image.findOneAndDelete({ url: imageUrl, username })

    if (!deletedImage) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Image removed from favorites' })
  } catch (error) {
    console.error('Error removing favorite:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
