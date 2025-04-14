import { create } from 'zustand'

interface VerificationState {
  emailVerified: boolean
  phoneVerified: boolean
  kycVerified: boolean
  setVerification: (type: 'email' | 'phone' | 'kyc', value: boolean) => void
  isFullyVerified: () => boolean
}

export const useVerificationStore = create<VerificationState>((set, get) => ({
  emailVerified: false,
  phoneVerified: false,
  kycVerified: false,
  setVerification: (type, value) => {
    set((state) => ({
      ...state,
      [type + 'Verified']: value
    }))
  },
  isFullyVerified: () => {
    const state = get()
    const verifiedCount = [
      state.emailVerified,
      state.phoneVerified,
      state.kycVerified
    ].filter(Boolean).length
    return verifiedCount >= 2
  }
})) 