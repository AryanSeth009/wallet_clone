import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import connectMongoDB from '@/lib/mongodb'
import User from '@/models/User'
import fs from 'fs'
import path from 'path'

export async function POST(req: NextRequest) {
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

        // Get form data
        const formData = await req.formData()
        
        // Log incoming request details
        console.log('Incoming profile update request for:', session.user.email)
        console.log('Form Data Keys:', Array.from(formData.keys()))
        
        // Extract form fields
        const name = formData.get('name') as string
        const role = formData.get('role') as string
        const country = formData.get('country') as string
        const phoneNumber = formData.get('phoneNumber') as string
        const profileImage = formData.get('profileImage') as File | null

        // Log form data for debugging
        console.log('Form Data - name:', name)
        console.log('Form Data - role:', role)
        console.log('Form Data - country:', country)
        console.log('Form Data - phoneNumber:', phoneNumber)
        if (profileImage) {
            console.log('Form Data - profileImage:', {
                name: profileImage.name,
                type: profileImage.type,
                size: profileImage.size
            })
        }

        // Find user in database
        const user = await User.findOne({ email: session.user.email })
        
        if (!user) {
            console.error('No user found with email:', session.user.email)
            return NextResponse.json({ 
                error: 'User not found', 
            }, { status: 404 })
        }

        // Handle profile image upload if provided
        let imageUrl = user.profileImage || user.image
        
        if (profileImage) {
            try {
                // Create uploads directory if it doesn't exist
                const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'profiles')
                if (!fs.existsSync(uploadsDir)) {
                    console.log('Creating uploads directory:', uploadsDir)
                    fs.mkdirSync(uploadsDir, { recursive: true })
                }

                // Convert file to buffer
                const bytes = await profileImage.arrayBuffer()
                const buffer = Buffer.from(bytes)
                
                // Generate unique filename
                const timestamp = Date.now()
                const filename = `profile_${session.user.email}_${timestamp}.${profileImage.name.split('.').pop()}`
                const filePath = path.join(uploadsDir, filename)
                
                // Save file to disk
                await fs.promises.writeFile(filePath, buffer)
                
                // Update image URL - use absolute path for better reliability
                imageUrl = `/uploads/profiles/${filename}`
                console.log('Profile image saved to:', imageUrl)
                
                // Clean up old profile images if they exist
                if (user.profileImage && user.profileImage !== imageUrl) {
                    try {
                        const oldImagePath = path.join(process.cwd(), 'public', user.profileImage)
                        if (fs.existsSync(oldImagePath)) {
                            fs.unlinkSync(oldImagePath)
                            console.log('Deleted old profile image:', oldImagePath)
                        }
                    } catch (cleanupError) {
                        console.error('Error cleaning up old profile image:', cleanupError)
                    }
                }
            } catch (error) {
                console.error('Image upload error:', error)
                // Continue with profile update even if image upload fails
            }
        }

        // Update user in database
        const updatedUser = await User.findOneAndUpdate(
            { email: session.user.email },
            { 
                name,
                role,
                country,
                phoneNumber,
                profileImage: imageUrl,
                image: imageUrl // Also update the image field to ensure consistency
            },
            { new: true }
        ).select('-password')

        if (!updatedUser) {
            console.error('Failed to update user in database')
            return NextResponse.json({ 
                error: 'Failed to update profile', 
            }, { status: 500 })
        }

        // Return success response with complete user data
        return NextResponse.json({
            success: true,
            message: 'Profile updated successfully',
            user: updatedUser,
            imageUrl
        })
    } catch (error) {
        console.error('Error updating profile:', error)
        return NextResponse.json({ 
            error: 'Failed to update profile', 
            details: error instanceof Error ? error.message : 'Unknown error' 
        }, { status: 500 })
    }
}
