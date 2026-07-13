import mongoose from 'mongoose';

export interface UserDocument {
  name: string;
  email: string;
  age: number;
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
  teamName?: string;
}

const userSchema = new mongoose.Schema<UserDocument>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    age: { type: Number, required: true, min: 13 },
    fitnessLevel: {
      type: String,
      required: true,
      enum: ['beginner', 'intermediate', 'advanced'],
    },
    teamName: { type: String, trim: true },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model<UserDocument>('User', userSchema);

export default User;
