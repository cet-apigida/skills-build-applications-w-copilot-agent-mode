"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const workoutSchema = new mongoose_1.default.Schema({
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true },
    teamId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Team' },
    title: { type: String, required: true, trim: true },
    goal: { type: String, required: true, trim: true },
    intensity: { type: String, required: true, enum: ['low', 'moderate', 'high'] },
    scheduledFor: { type: Date, required: true },
}, { timestamps: true });
const Workout = mongoose_1.default.models.Workout || mongoose_1.default.model('Workout', workoutSchema);
exports.default = Workout;
