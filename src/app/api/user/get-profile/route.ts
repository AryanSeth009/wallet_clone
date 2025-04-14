import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import connectMongoDB from '@/lib/mongodb'
import User from '@/models/User'

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

        // Find user in database
        const user = await User.findOne({ email: session.user.email })
            .select('-password') // Exclude password from the response
        
        if (!user) {
            console.error('No user found with email:', session.user.email)
            return NextResponse.json({ 
                error: 'User not found', 
            }, { status: 404 })
        }

        // Return user data
        return NextResponse.json({
            success: true,
            user: {
                name: user.name || '',
                email: user.email,
                role: user.role || 'User',
                country: user.country || 'Not Specified',
                phoneNumber: user.phoneNumber || 'Not Available',
                profileImage: user.profileImage || user.image || null,
                walletAddress: user.walletAddress || null
            }
        })
    } catch (error) {
        console.error('Error fetching profile:', error)
        return NextResponse.json({ 
            error: 'Failed to fetch profile', 
            details: error instanceof Error ? error.message : 'Unknown error' 
        }, { status: 500 })
    }
} 