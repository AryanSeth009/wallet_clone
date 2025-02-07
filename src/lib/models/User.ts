import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: false },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  image: { type: String, required: false }, // For NextAuth profile picture
  profileImage: { type: String, required: false }, // Direct Base64 string storage
  role: { type: String, required: false },
  country: { type: String, required: false },
  phoneNumber: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Create a unique index on email
UserSchema.index({ email: 1 }, { unique: true });

// Update timestamp middleware
UserSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Prevent multiple model creation
export default mongoose.models.User || mongoose.model('User', UserSchema);
