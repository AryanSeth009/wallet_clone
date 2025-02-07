import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import connectMongoDB from '@/lib/mongodb'
import User from '@/lib/models/User'
import { writeFile } from 'fs/promises'
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

        // Log incoming request details
        console.log('Incoming profile update request for:', session.user.email)

        // Parse form data
        const formData = await req.formData()
        
        // Detailed form data logging
        console.log('Form Data Keys:', Array.from(formData.keys()))
        for (let [key, value] of formData.entries()) {
            if (key === 'profileImage') {
                const file = value as File
                console.log(`Form Data - ${key}:`, {
                    name: file.name,
                    type: file.type,
                    size: file.size
                })
            } else {
                console.log(`Form Data - ${key}:`, value)
            }
        }

        const name = formData.get('name') as string
        const role = formData.get('role') as string
        const country = formData.get('country') as string
        const phoneNumber = formData.get('phoneNumber') as string
        const profileImage = formData.get('profileImage') as File | null

        let updateData: any = {
            name,
            role,
            country,
            phoneNumber,
        }

        // Handle profile image upload
        if (profileImage && profileImage.size > 0) {
            try {
                // Convert image to Base64 Data URL
                const arrayBuffer = await profileImage.arrayBuffer()
                const buffer = Buffer.from(arrayBuffer)
                
                // Generate a unique filename
                const filename = `profile_${session.user.email}_${Date.now()}${path.extname(profileImage.name)}`
                const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'profiles')
                
                // Ensure directory exists
                await writeFile(path.join(uploadDir, filename), buffer)

                // Construct public URL path
                const publicImagePath = `/uploads/profiles/${filename}`

                // Update data to include profile image
                updateData.profileImage = publicImagePath
                updateData.image = publicImagePath

                console.log('Profile Image Upload:', {
                    originalSize: profileImage.size,
                    savedPath: publicImagePath,
                    contentType: profileImage.type
                })
            } catch (uploadError) {
                console.error('Image upload error:', uploadError)
                return NextResponse.json({ 
                    error: 'Failed to process image', 
                    details: uploadError instanceof Error ? uploadError.message : 'Unknown error' 
                }, { status: 500 })
            }
        }

        // Update user in database
        try {
            // Find the user first to ensure they exist
            const existingUser = await User.findOne({ email: session.user.email })
            if (!existingUser) {
                console.error('No user found with email:', session.user.email)
                return NextResponse.json({ 
                    error: 'User not found', 
                }, { status: 404 })
            }

            // Perform the update
            const updatedUser = await User.findOneAndUpdate(
                { email: session.user.email }, 
                updateData, 
                { 
                    new: true, 
                    runValidators: true,
                    upsert: true 
                }
            )

            if (!updatedUser) {
                console.error('Update failed for user:', session.user.email)
                return NextResponse.json({ 
                    error: 'Failed to update user', 
                }, { status: 500 })
            }

            // Force save to ensure all fields are updated
            await updatedUser.save()

            // Detailed logging of updated user
            console.log('User updated successfully:', {
                name: updatedUser.name,
                hasProfileImage: !!updatedUser.profileImage,
                profileImagePath: updatedUser.profileImage,
                imageFieldSet: !!updatedUser.image,
                imageFieldValue: updatedUser.image
            })

            return NextResponse.json({ 
                message: 'Profile updated successfully',
                imageUrl: updatedUser.image || null
            })
        } catch (dbError) {
            console.error('Database update error:', dbError)
            return NextResponse.json({ 
                error: 'Failed to update user profile', 
                details: dbError instanceof Error ? dbError.message : 'Unknown error' 
            }, { status: 500 })
        }
    } catch (error) {
        console.error('Unexpected error in profile update:', error)
        return NextResponse.json({ 
            error: 'Unexpected error', 
            details: error instanceof Error ? error.message : 'Unknown error' 
        }, { status: 500 })
    }
}
