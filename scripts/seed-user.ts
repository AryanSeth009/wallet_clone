import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../src/models/User';
import { connectToDatabase } from '../src/lib/db';

async function seedUser() {
  try {
    // Connect to the database
    await connectToDatabase();

    // Check if a user already exists
    const existingUser = await User.findOne({ email: 'test@example.com' });
    if (existingUser) {
      console.log('User already exists');
      return;
    }

    // Create a new user
    const hashedPassword = await bcrypt.hash('testpassword', 10);
    const user = new User({
      email: 'test@example.com',
      password: hashedPassword,
      name: 'Test User'
    });

    // Save the user
    await user.save();
    console.log('User seeded successfully');
  } catch (error) {
    console.error('Error seeding user:', error);
  } finally {
    // Close the database connection
    await mongoose.connection.close();
  }
}

seedUser();
