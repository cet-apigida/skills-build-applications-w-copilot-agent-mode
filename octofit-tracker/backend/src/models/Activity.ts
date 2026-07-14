import mongoose from 'mongoose';

export interface ActivityDocument {
  userId: mongoose.Types.ObjectId;
  teamId?: mongoose.Types.ObjectId;
  type: 'run' | 'cycle' | 'strength' | 'yoga' | 'swim';
  durationMinutes: number;
  caloriesBurned: number;
  performedAt: Date;
}

const activitySchema = new mongoose.Schema<ActivityDocument>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    teamId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
    type: {
      type: String,
      required: true,
      enum: ['run', 'cycle', 'strength', 'yoga', 'swim'],
    },
    durationMinutes: { type: Number, required: true, min: 1 },
    caloriesBurned: { type: Number, required: true, min: 1 },
    performedAt: { type: Date, required: true },
  },
  { timestamps: true }
);

const Activity = mongoose.models.Activity || mongoose.model<ActivityDocument>('Activity', activitySchema);

export default Activity;
