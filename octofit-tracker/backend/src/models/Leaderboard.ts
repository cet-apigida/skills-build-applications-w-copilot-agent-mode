import mongoose from 'mongoose';

export interface LeaderboardDocument {
  userId?: mongoose.Types.ObjectId;
  teamId?: mongoose.Types.ObjectId;
  scope: 'user' | 'team';
  points: number;
  rank: number;
  weekOf: Date;
}

const leaderboardSchema = new mongoose.Schema<LeaderboardDocument>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    teamId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
    scope: { type: String, required: true, enum: ['user', 'team'] },
    points: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
    weekOf: { type: Date, required: true },
  },
  { timestamps: true }
);

const Leaderboard =
  mongoose.models.Leaderboard || mongoose.model<LeaderboardDocument>('Leaderboard', leaderboardSchema);

export default Leaderboard;
