import mongoose from 'mongoose';

export interface TeamDocument {
  name: string;
  city: string;
  captainName: string;
  memberIds: mongoose.Types.ObjectId[];
}

const teamSchema = new mongoose.Schema<TeamDocument>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    city: { type: String, required: true, trim: true },
    captainName: { type: String, required: true, trim: true },
    memberIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
  },
  { timestamps: true }
);

const Team = mongoose.models.Team || mongoose.model<TeamDocument>('Team', teamSchema);

export default Team;
