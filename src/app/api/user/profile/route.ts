import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import connectMongoDB from '@/lib/mongodb'
import User from '@/models/User'
import fs from 'fs'
import path from 'path'

export async function GET(req: NextRequest) {
    try {
        // Establish MongoDB connection
        await connectMongoDB()

        // Get server-side session
        const session = await getServerSession(authOptions)
        
        // Check if user is authenticated
        if (!session || !session.user?.email) {
            console.error('Unauthorized access: No session found')
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        // Get email from query params or session
        const url = new URL(req.url)
        const emailParam = url.searchParams.get('email')
        const email = emailParam || session.user.email

        // Log request details
        console.log('Fetching profile for:', email)

        // Find user in database
        const user = await User.findOne({ email }).select('-password')
        
        if (!user) {
            console.error('No user found with email:', email)
            return NextResponse.json({ 
                error: 'User not found', 
            }, { status: 404 })
        }

        // Check if profile image exists on disk
        let profileImage = user.profileImage
        let image = user.image

        // If profile image exists in database but not on disk, try to find a valid image
        if (profileImage) {
            const imagePath = path.join(process.cwd(), 'public', profileImage)
            if (!fs.existsSync(imagePath)) {
                console.warn(`Profile image not found at ${imagePath}, trying to find alternative`)
                profileImage = null
            }
        }

        // If no valid profile image, try to use the image field
        if (!profileImage && image) {
            const imagePath = path.join(process.cwd(), 'public', image)
            if (fs.existsSync(imagePath)) {
                console.log(`Using image field as profile image: ${image}`)
                profileImage = image
            } else {
                console.warn(`Image not found at ${imagePath}`)
                image = null
            }
        }

        // Log the final image paths
        console.log('Final image paths:', { profileImage, image })

        // Return user profile data
        return NextResponse.json({
            name: user.name,
            email: user.email,
            role: user.role,
            country: user.country,
            phoneNumber: user.phoneNumber,
            profileImage: profileImage,
            image: image,
            walletAddress: user.walletAddress,
            createdAt: user.createdAt
        })
    } catch (error) {
        console.error('Error fetching user profile:', error)
        return NextResponse.json({ 
            error: 'Failed to fetch user profile', 
            details: error instanceof Error ? error.message : 'Unknown error' 
        }, { status: 500 })
    }
} 