'use client';
import { motion } from 'framer-motion'
import { useSession } from 'next-auth/react'
import { useState, useRef, ChangeEvent, useEffect } from 'react'
import { toast } from 'react-hot-toast'

export default function ProfilePage() {
    const { data: session, update } = useSession()
    const [isEditing, setIsEditing] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [previewImage, setPreviewImage] = useState<string | null>(null)

    // Derive profile data from session
    const profileData = {
        name: session?.user?.name || "Not Available",
        email: session?.user?.email || "Not Available",
        image: previewImage || session?.user?.image || "/placeholder.svg",
        role: "User",
        country: "Not Specified",
        phoneNumber: "Not Available"
    }

    const [formData, setFormData] = useState({
        name: profileData.name,
        role: profileData.role,
        country: profileData.country,
        phoneNumber: profileData.phoneNumber
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (files && files.length > 0) {
            const file = files[0]
            
            // Validate file size (e.g., max 5MB)
            const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
            if (file.size > MAX_FILE_SIZE) {
                toast.error('File is too large. Maximum size is 5MB.')
                e.target.value = '' // Clear the file input
                return
            }

            // Validate file type
            const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif']
            if (!ALLOWED_TYPES.includes(file.type)) {
                toast.error('Invalid file type. Please upload a JPEG, PNG, or GIF.')
                e.target.value = '' // Clear the file input
                return
            }

            // Detailed file logging
            console.group('File Upload Details')
            console.log('File Name:', file.name)
            console.log('File Type:', file.type)
            console.log('File Size:', file.size, 'bytes')
            console.log('Last Modified:', new Date(file.lastModified).toISOString())
            console.groupEnd()

            // Create object URL for preview
            const objectUrl = URL.createObjectURL(file)
            
            setSelectedFile(file)
            setPreviewImage(objectUrl)
        }
    }

    const triggerFileInput = () => {
        fileInputRef.current?.click()
    }

    const handleSaveProfile = async () => {
        try {
            // Validate form data
            if (!formData.name.trim()) {
                toast.error('Name cannot be empty')
                return
            }

            // Create form data for upload
            const uploadData = new FormData()
            uploadData.append('name', formData.name)
            uploadData.append('role', formData.role)
            uploadData.append('country', formData.country)
            uploadData.append('phoneNumber', formData.phoneNumber)
            
            if (selectedFile) {
                console.group('Uploading Profile Image')
                console.log('File Details:', {
                    name: selectedFile.name,
                    type: selectedFile.type,
                    size: selectedFile.size,
                })
                uploadData.append('profileImage', selectedFile)
                console.groupEnd()
            } else {
                console.warn('No file selected for upload')
            }

            // Log all form data for debugging
            console.group('Form Data Entries')
            for (let [key, value] of uploadData.entries()) {
                console.log(`${key}:`, value)
            }
            console.groupEnd()

            const response = await fetch('/api/user/update-profile', {
                method: 'POST',
                body: uploadData
            })

            const result = await response.json()

            console.group('Profile Update Response')
            console.log('Response Status:', response.status)
            console.log('Response Body:', result)
            console.groupEnd()

            // Enhanced error handling
            if (!response.ok) {
                console.error('Profile update error response:', result)
                throw new Error(result.error || 'Failed to update profile')
            }

            // Update session with new data
            await update({
                name: formData.name,
                image: result.imageUrl || session?.user?.image
            })

            // Ensure localStorage is only used client-side
            if (typeof window !== 'undefined') {
                try {
                    localStorage.setItem('profileUpdateMessage', 'Profile updated successfully!')
                    console.log('Message saved to localStorage')
                } catch (localStorageError) {
                    console.error('localStorage error:', localStorageError)
                }
            }

            toast.success('Profile updated successfully!')
            setIsEditing(false)
        } catch (error) {
            console.error('Full profile update error:', error)
            toast.error(error instanceof Error ? error.message : 'Failed to update profile')
        }
    }

    useEffect(() => {
        // Ensure localStorage is only used client-side
        if (typeof window !== 'undefined') {
            try {
                const profileUpdateMessage = localStorage.getItem('profileUpdateMessage')
                console.log('Retrieved localStorage message:', profileUpdateMessage)
                
                if (profileUpdateMessage) {
                    toast.success(profileUpdateMessage)
                    localStorage.removeItem('profileUpdateMessage')
                    console.log('Message removed from localStorage')
                }
            } catch (localStorageError) {
                console.error('localStorage retrieval error:', localStorageError)
            }
        }
    }, []);

    // Utility function to convert file to base64 for logging
    const fileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = () => resolve(reader.result as string)
            reader.onerror = reject
            reader.readAsDataURL(file)
        })
    }

    // If no session, show login prompt
    if (!session) {
        return (
            <div className="min-h-screen pt-28 bg-[#0A0B0F] flex items-center justify-center text-white">
                <div className="text-center">
                    <p className="text-2xl mb-4">Please log in to view your profile</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen pt-28 mb-auto bg-[#0A0B0F] p-6 relative overflow-hidden">
            {/* Background gradients */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-[30%] -right-[10%] w-[800px] h-[800px] rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-3xl" />
                <div className="absolute -bottom-[40%] -left-[10%] w-[1000px] h-[1000px] rounded-full bg-gradient-to-r from-purple-600/10 to-blue-600/10 blur-3xl" />
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-5xl mx-auto bg-gradient-to-b from-[#1a1a2e] to-[#16213e] rounded-2xl shadow-2xl overflow-hidden border border-gray-800/50"
            >
                {/* Navigation */}
                <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-800/50">
                    <NavItem icon={<UserIcon />} label="Profile" active />
                    <NavItem 
                        icon={<EditIcon />} 
                        label="Edit Profile" 
                        onClick={() => setIsEditing(!isEditing)} 
                    />
                    <NavItem icon={<PhoneIcon />} label="Phone Verification" />
                    <NavItem icon={<IDIcon />} label="ID Verification" />
                    <NavItem icon={<KeyIcon />} label="Reset Password" />
                    <NavItem icon={<ActivityIcon />} label="Activity Log" />
                </nav>

                {isEditing ? (
                    <div className="p-8 space-y-6">
                        <h2 className="text-2xl font-semibold text-white mb-6">Edit Profile</h2>
                        
                        {/* Profile Image Upload */}
                        <div className="flex justify-center mb-6">
                            <div className="relative">
                                <input 
                                    type="file" 
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    accept="image/jpeg,image/png,image/gif"
                                    className="hidden" 
                                />
                                <div 
                                    className="w-40 h-40 rounded-full overflow-hidden bg-gray-800 border-4 border-purple-500/30 cursor-pointer hover:opacity-70 transition"
                                    onClick={triggerFileInput}
                                >
                                    <img 
                                        src={previewImage || profileData.image} 
                                        alt="Profile" 
                                        className="w-full h-full object-cover" 
                                    />
                                </div>
                                <div 
                                    className="absolute inset-0 flex items-center justify-center text-white opacity-0 hover:opacity-100 transition bg-black/50 rounded-full"
                                    onClick={triggerFileInput}
                                >
                                    Change Photo
                                </div>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-400 mb-2">Name</label>
                                <input 
                                    type="text" 
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full bg-[#0f1229]/80 border border-gray-700/50 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-400 mb-2">Email</label>
                                <input 
                                    type="email" 
                                    name="email"
                                    value={profileData.email}
                                    disabled
                                    className="w-full bg-[#0f1229]/80 border border-gray-700/50 rounded-xl p-3 text-white opacity-50"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-400 mb-2">Role</label>
                                <input 
                                    type="text" 
                                    name="role"
                                    value={formData.role}
                                    onChange={handleInputChange}
                                    className="w-full bg-[#0f1229]/80 border border-gray-700/50 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-400 mb-2">Country</label>
                                <input 
                                    type="text" 
                                    name="country"
                                    value={formData.country}
                                    onChange={handleInputChange}
                                    className="w-full bg-[#0f1229]/80 border border-gray-700/50 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-400 mb-2">Phone Number</label>
                                <input 
                                    type="tel" 
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleInputChange}
                                    className="w-full bg-[#0f1229]/80 border border-gray-700/50 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end space-x-4 mt-6">
                            <button 
                                onClick={() => setIsEditing(false)}
                                className="px-4 py-2 bg-gray-700 text-white rounded-xl hover:bg-gray-600 transition"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={handleSaveProfile}
                                className="px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition"
                            >
                                Save Profile
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-[250px_1fr] gap-8 p-8">
                        {/* Profile Card */}
                        <div className="flex flex-col items-center text-center space-y-4">
                            <div className="w-40 h-40 rounded-full overflow-hidden bg-gray-800 border-4 border-purple-500/30">
                                <img 
                                    src={profileData.image} 
                                    alt={profileData.name} 
                                    className="w-full h-full object-cover" 
                                />
                            </div>
                            <div>
                                <h2 className="text-2xl font-semibold text-white">{profileData.name}</h2>
                                <p className="text-gray-400">{profileData.email}</p>
                                <p className="text-gray-400">{profileData.country}</p>
                            </div>
                        </div>

                        {/* Profile Details */}
                        <div className="space-y-4">
                            <ProfileField icon={<UserCircleIcon />} label="Name" value={profileData.name} />
                            <ProfileField icon={<BriefcaseIcon />} label="Role" value={profileData.role} />
                            <ProfileField icon={<MailIcon />} label="Email" value={profileData.email} />
                            <ProfileField 
                                icon={<MailIcon />}
                                label="Email Verification" 
                                value={session?.user?.emailVerified ? "Verified" : "Pending"} 
                                valueClassName={session?.user?.emailVerified ? "text-green-400" : "text-orange-400"}
                            />
                            <ProfileField icon={<PhoneCallIcon />} label="Contact" value={profileData.phoneNumber} />
                            <ProfileField 
                                icon={<PhoneIcon />}
                                label="Mobile Verification" 
                                value="Pending" 
                                valueClassName="text-orange-400"
                            />
                            <ProfileField 
                                icon={<CheckCircleIcon />}
                                label="Status" 
                                value="Active" 
                                valueClassName="text-green-400"
                            />
                        </div>
                    </div>
                )}
            </motion.div>
        </div>
    )
}

function NavItem({ icon, label, active = false, onClick }: { 
    icon: React.ReactNode
    label: string
    active?: boolean 
    onClick?: () => void
}) {
    return (
        <div 
            className={`flex flex-col items-center gap-1 cursor-pointer group relative ${active ? 'text-purple-600' : 'text-gray-500'}`}
            onClick={onClick}
        >
            {icon}
            <span className="text-xs font-medium">{label}</span>
            {active && (
                <div className="h-0.5 w-full bg-purple-600 absolute -bottom-4" />
            )}
        </div>
    )
}

function ProfileField({
    icon,
    label,
    value,
    valueClassName = ""
}: {
    icon: React.ReactNode
    label: string
    value: string
    valueClassName?: string
}) {
    return (
        <div className="grid grid-cols-[auto_1fr_2fr] gap-4 items-center bg-[#0f1229]/80 rounded-xl p-4 border border-gray-700/50">
            <div className="text-gray-400">{icon}</div>
            <span className="text-gray-400 text-sm">{label}</span>
            <span className={`text-white ${valueClassName}`}>{value}</span>
        </div>
    )
}

function UserIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
        </svg>
    )
}

function EditIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
        </svg>
    )
}

function PhoneIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
        </svg>
    )
}

function IDIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="16" rx="2" ry="2"></rect>
            <line x1="7" y1="8" x2="7" y2="8"></line>
            <line x1="7" y1="12" x2="7" y2="12"></line>
            <line x1="7" y1="16" x2="7" y2="16"></line>
            <line x1="11" y1="8" x2="17" y2="8"></line>
            <line x1="11" y1="12" x2="17" y2="12"></line>
            <line x1="11" y1="16" x2="17" y2="16"></line>
        </svg>
    )
}

function KeyIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path>
        </svg>
    )
}

function ActivityIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
        </svg>
    )
}

function UserCircleIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 20a6 6 0 0 0-12 0"></path>
            <circle cx="12" cy="10" r="4"></circle>
            <circle cx="12" cy="12" r="10"></circle>
        </svg>
    )
}

function BriefcaseIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
        </svg>
    )
}

function MailIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v14a2 2 0 0 0-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
        </svg>
    )
}

function PhoneCallIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
        </svg>
    )
}

function CheckCircleIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
    )
}
