'use client';
import { motion } from 'framer-motion'
import { useSession } from 'next-auth/react'
import { useState, useRef, ChangeEvent, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { useVerificationStore } from '@/stores/verificationStore'

// Define step types
type ProfileStep = 'basic' | 'contact' | 'verification';

export default function ProfilePage() {
    const { data: session, update } = useSession()
    const [isEditing, setIsEditing] = useState(false)
    const [currentStep, setCurrentStep] = useState<ProfileStep>('basic')
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [previewImage, setPreviewImage] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [userProfile, setUserProfile] = useState<any>(null)
    const { emailVerified, phoneVerified, kycVerified, setVerification } = useVerificationStore()
    const [isVerifying, setIsVerifying] = useState<'email' | 'phone' | 'kyc' | null>(null)

    // Profile steps configuration
    const steps = [
        { id: 'basic', label: 'Basic Information', icon: '👤' },
        { id: 'contact', label: 'Contact Details', icon: '📞' },
        { id: 'verification', label: 'Verification Status', icon: '✓' },
    ]

    // Fetch user profile data from backend
    useEffect(() => {
        const fetchUserProfile = async () => {
            if (!session?.user?.email) return;
            
            try {
                setIsLoading(true);
                const response = await fetch(`/api/user/profile?email=${encodeURIComponent(session.user.email)}`);
                
                if (!response.ok) {
                    throw new Error('Failed to fetch profile data');
                }
                
                const data = await response.json();
                console.log('Fetched profile data:', data);
                setUserProfile(data);
                
                // Update form data with fetched profile data
                setFormData({
                    name: data.name || session.user.name || "Not Available",
                    role: data.role || "User",
                    country: data.country || "Not Specified",
                    phoneNumber: data.phoneNumber || "Not Available"
                });
                
                // Set preview image if available
                if (data.profileImage || data.image) {
                    const imageUrl = data.profileImage || data.image;
                    console.log('Setting preview image to:', imageUrl);
                    setPreviewImage(imageUrl);
                }
                
            } catch (error) {
                console.error('Error fetching profile:', error);
                toast.error('Failed to load profile data');
            } finally {
                setIsLoading(false);
            }
        };
        
        fetchUserProfile();
    }, [session]);

    // Derive profile data from session or fetched data
    const profileData = {
        name: userProfile?.name || session?.user?.name || "Not Available",
        email: session?.user?.email || "Not Available",
        image: previewImage || userProfile?.profileImage || userProfile?.image || session?.user?.image || "/placeholder.svg",
        role: userProfile?.role || "User",
        country: userProfile?.country || "Not Specified",
        phoneNumber: userProfile?.phoneNumber || "Not Available",
        emailVerified: userProfile?.emailVerified || false,
        phoneVerified: userProfile?.phoneVerified || false,
        kycVerified: userProfile?.kycVerified || false
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
            // Convert entries to array first to avoid TypeScript iterator issue
            const entries = Array.from(uploadData.entries());
            for (let [key, value] of entries) {
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

            // Force a session refresh to update the navbar
            const event = new Event('visibilitychange');
            document.dispatchEvent(event);

            // Update local state with new profile data
            setUserProfile({
                ...userProfile,
                name: formData.name,
                role: formData.role,
                country: formData.country,
                phoneNumber: formData.phoneNumber,
                profileImage: result.imageUrl || userProfile?.profileImage,
                image: result.imageUrl || userProfile?.image
            })

            // Set the preview image to the new image URL
            if (result.imageUrl) {
                setPreviewImage(result.imageUrl);
            }

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
            reader.readAsDataURL(file)
            reader.onload = () => resolve(reader.result as string)
            reader.onerror = error => reject(error)
        })
    }

    const handleVerification = async (type: 'email' | 'phone' | 'kyc') => {
        setIsVerifying(type)
        try {
            // Simulate verification process
            await new Promise(resolve => setTimeout(resolve, 1500))
            setVerification(type, true)
            toast.success(`${type.toUpperCase()} verification completed successfully!`)
        } catch (error) {
            toast.error(`Failed to verify ${type}`)
        } finally {
            setIsVerifying(null)
        }
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
        <div className="min-h-screen pt-28 mb-auto bg-[var(--background-primary)] p-6 relative overflow-hidden">
            {/* Background gradients */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-[30%] -right-[10%] w-[800px] h-[800px] rounded-full bg-gradient-to-r from-[var(--accent-primary)]/20 to-[var(--accent-secondary)]/20 blur-3xl" />
                <div className="absolute -bottom-[40%] -left-[10%] w-[1000px] h-[1000px] rounded-full bg-gradient-to-r from-[var(--accent-secondary)]/10 to-[var(--accent-primary)]/10 blur-3xl" />
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-5xl mx-auto bg-[var(--card-bg)] rounded-2xl shadow-2xl overflow-hidden border border-[var(--card-border)]"
            >
                {/* Steps Navigation */}
                <nav className="flex items-center justify-between px-6 py-4 border-b border-[var(--card-border)]">
                    {steps.map((step) => (
                        <button
                            key={step.id}
                            onClick={() => setCurrentStep(step.id as ProfileStep)}
                            className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 ${
                                currentStep === step.id
                                    ? 'bg-[var(--accent-primary)]/20 text-[var(--accent-primary)]'
                                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                            }`}
                        >
                            <span className="mr-2">{step.icon}</span>
                            <span className="text-sm font-medium">{step.label}</span>
                        </button>
                    ))}
                </nav>

                {/* Content Sections */}
                <div className="p-8">
                    {/* Basic Information Section */}
                    {currentStep === 'basic' && (
                        <div className="space-y-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-semibold text-[var(--text-primary)]">Basic Information</h2>
                                {!isEditing ? (
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="button-secondary flex items-center gap-2"
                                    >
                                        <span className="text-sm">Edit Profile</span>
                                    </button>
                                ) : (
                                    <div className="flex gap-2">
                                        <button
                                            onClick={handleSaveProfile}
                                            className="button-primary"
                                            disabled={isLoading}
                                        >
                                            Save Changes
                                        </button>
                                        <button
                                            onClick={() => setIsEditing(false)}
                                            className="button-secondary"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Profile Image */}
                            <div className="flex justify-center mb-6">
                                <div className="relative">
                                    <img
                                        src={profileData.image}
                                        alt={profileData.name}
                                        className="w-32 h-32 rounded-full object-cover border-4 border-[var(--accent-primary)]/30"
                                    />
                                    {isEditing && (
                                        <>
                                            <input
                                                type="file"
                                                ref={fileInputRef}
                                                onChange={handleFileChange}
                                                accept="image/jpeg,image/png,image/gif"
                                                className="hidden"
                                            />
                                            <button
                                                onClick={triggerFileInput}
                                                className="absolute bottom-0 right-0 bg-[var(--accent-primary)] text-white p-2 rounded-full hover:bg-[var(--accent-secondary)] transition-colors"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                </svg>
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Basic Information Form */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                                        Name
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className="input w-full"
                                        />
                                    ) : (
                                        <p className="text-[var(--text-primary)]">{profileData.name}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                                        Email
                                    </label>
                                    <p className="text-[var(--text-primary)]">{profileData.email}</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                                        Role
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="role"
                                            value={formData.role}
                                            onChange={handleInputChange}
                                            className="input w-full"
                                        />
                                    ) : (
                                        <p className="text-[var(--text-primary)]">{profileData.role}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Contact Information Section */}
                    {currentStep === 'contact' && (
                        <div className="space-y-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-semibold text-[var(--text-primary)]">Contact Information</h2>
                                {!isEditing ? (
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="button-secondary flex items-center gap-2"
                                    >
                                        <span className="text-sm">Edit Contact</span>
                                    </button>
                                ) : (
                                    <div className="flex gap-2">
                                        <button
                                            onClick={handleSaveProfile}
                                            className="button-primary"
                                            disabled={isLoading}
                                        >
                                            Save Changes
                                        </button>
                                        <button
                                            onClick={() => setIsEditing(false)}
                                            className="button-secondary"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                                        Phone Number
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="tel"
                                            name="phoneNumber"
                                            value={formData.phoneNumber}
                                            onChange={handleInputChange}
                                            className="input w-full"
                                        />
                                    ) : (
                                        <p className="text-[var(--text-primary)]">{profileData.phoneNumber}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                                        Country
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="country"
                                            value={formData.country}
                                            onChange={handleInputChange}
                                            className="input w-full"
                                        />
                                    ) : (
                                        <p className="text-[var(--text-primary)]">{profileData.country}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Verification Status Section */}
                    {currentStep === 'verification' && (
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Verification Status</h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                                    <div className="flex items-center space-x-3">
                                        <MailIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                                        <span className="text-sm font-medium text-gray-900 dark:text-white">Email Verification</span>
                                    </div>
                                    <button
                                        onClick={() => handleVerification('email')}
                                        disabled={isVerifying === 'email' || emailVerified}
                                        className={`px-3 py-1 text-sm font-medium rounded-full ${
                                            emailVerified
                                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                                : isVerifying === 'email'
                                                ? 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 cursor-wait'
                                                : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800'
                                        }`}
                                    >
                                        {emailVerified ? 'Verified' : isVerifying === 'email' ? 'Verifying...' : 'Verify'}
                                    </button>
                                </div>

                                <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                                    <div className="flex items-center space-x-3">
                                        <PhoneIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                                        <span className="text-sm font-medium text-gray-900 dark:text-white">Phone Verification</span>
                                    </div>
                                    <button
                                        onClick={() => handleVerification('phone')}
                                        disabled={isVerifying === 'phone' || phoneVerified}
                                        className={`px-3 py-1 text-sm font-medium rounded-full ${
                                            phoneVerified
                                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                                : isVerifying === 'phone'
                                                ? 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 cursor-wait'
                                                : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800'
                                        }`}
                                    >
                                        {phoneVerified ? 'Verified' : isVerifying === 'phone' ? 'Verifying...' : 'Verify'}
                                    </button>
                                </div>

                                <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                                    <div className="flex items-center space-x-3">
                                        <ShieldCheckIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                                        <span className="text-sm font-medium text-gray-900 dark:text-white">KYC Verification</span>
                                    </div>
                                    <button
                                        onClick={() => handleVerification('kyc')}
                                        disabled={isVerifying === 'kyc' || kycVerified}
                                        className={`px-3 py-1 text-sm font-medium rounded-full ${
                                            kycVerified
                                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                                : isVerifying === 'kyc'
                                                ? 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 cursor-wait'
                                                : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800'
                                        }`}
                                    >
                                        {kycVerified ? 'Verified' : isVerifying === 'kyc' ? 'Verifying...' : 'Verify'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
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

interface IconProps {
    className?: string;
}

function MailIcon({ className }: IconProps) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
        </svg>
    )
}

function PhoneIcon({ className }: IconProps) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
        </svg>
    )
}

function ShieldCheckIcon({ className }: IconProps) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            <polyline points="9 12 11 14 15 10"></polyline>
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
