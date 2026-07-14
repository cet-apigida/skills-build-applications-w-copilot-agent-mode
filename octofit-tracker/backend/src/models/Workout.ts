import mongoose from 'mongoose';

export interface WorkoutDocument {
  userId: mongoose.Types.ObjectId;
  teamId?: mongoose.Types.ObjectId;
  title: string;
  goal: string;
  intensity: 'low' | 'moderate' | 'high';
  scheduledFor: Date;
}

const workoutSchema = new mongoose.Schema<WorkoutDocument>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    teamId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
    title: { type: String, required: true, trim: true },
    goal: { type: String, required: true, trim: true },
    intensity: { type: String, required: true, enum: ['low', 'moderate', 'high'] },
    scheduledFor: { type: Date, required: true },
  },
  { timestamps: true }
);

const Workout = mongoose.models.Workout || mongoose.model<WorkoutDocument>('Workout', workoutSchema);

export default Workout;
