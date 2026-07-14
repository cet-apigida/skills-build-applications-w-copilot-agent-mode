"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = __importDefault(require("../models/User"));
const Team_1 = __importDefault(require("../models/Team"));
const Activity_1 = __importDefault(require("../models/Activity"));
const Leaderboard_1 = __importDefault(require("../models/Leaderboard"));
const Workout_1 = __importDefault(require("../models/Workout"));
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose_1.default.connect(connectionString);
        console.log('Connected to octofit_db');
        console.log('Seed the octofit_db database with test data');
        await Promise.all([
            User_1.default.deleteMany({}),
            Team_1.default.deleteMany({}),
            Activity_1.default.deleteMany({}),
            Leaderboard_1.default.deleteMany({}),
            Workout_1.default.deleteMany({}),
        ]);
        const users = await User_1.default.insertMany([
            {
                name: 'Ava Thompson',
                email: 'ava.thompson@octofit.test',
                age: 29,
                fitnessLevel: 'advanced',
                teamName: 'Pulse Predators',
            },
            {
                name: 'Noah Rivera',
                email: 'noah.rivera@octofit.test',
                age: 34,
                fitnessLevel: 'intermediate',
                teamName: 'Endurance Engine',
            },
            {
                name: 'Mia Chen',
                email: 'mia.chen@octofit.test',
                age: 26,
                fitnessLevel: 'beginner',
                teamName: 'Pulse Predators',
            },
            {
                name: 'Liam Brooks',
                email: 'liam.brooks@octofit.test',
                age: 31,
                fitnessLevel: 'intermediate',
                teamName: 'Endurance Engine',
            },
        ]);
        const [ava, noah, mia, liam] = users;
        const teams = await Team_1.default.insertMany([
            {
                name: 'Pulse Predators',
                city: 'Seattle',
                captainName: ava.name,
                memberIds: [ava._id, mia._id],
            },
            {
                name: 'Endurance Engine',
                city: 'Austin',
                captainName: noah.name,
                memberIds: [noah._id, liam._id],
            },
        ]);
        const [pulsePredators, enduranceEngine] = teams;
        await Activity_1.default.insertMany([
            {
                userId: ava._id,
                teamId: pulsePredators._id,
                type: 'run',
                durationMinutes: 52,
                caloriesBurned: 610,
                performedAt: new Date('2026-07-08T06:30:00Z'),
            },
            {
                userId: mia._id,
                teamId: pulsePredators._id,
                type: 'yoga',
                durationMinutes: 35,
                caloriesBurned: 180,
                performedAt: new Date('2026-07-09T17:15:00Z'),
            },
            {
                userId: noah._id,
                teamId: enduranceEngine._id,
                type: 'cycle',
                durationMinutes: 47,
                caloriesBurned: 540,
                performedAt: new Date('2026-07-10T12:10:00Z'),
            },
            {
                userId: liam._id,
                teamId: enduranceEngine._id,
                type: 'strength',
                durationMinutes: 58,
                caloriesBurned: 490,
                performedAt: new Date('2026-07-11T18:45:00Z'),
            },
        ]);
        await Workout_1.default.insertMany([
            {
                userId: ava._id,
                teamId: pulsePredators._id,
                title: 'Tempo Run + Core',
                goal: 'Improve 10k race pace and trunk stability',
                intensity: 'high',
                scheduledFor: new Date('2026-07-14T06:00:00Z'),
            },
            {
                userId: mia._id,
                teamId: pulsePredators._id,
                title: 'Mobility Flow',
                goal: 'Increase flexibility and recovery quality',
                intensity: 'low',
                scheduledFor: new Date('2026-07-14T16:00:00Z'),
            },
            {
                userId: noah._id,
                teamId: enduranceEngine._id,
                title: 'Threshold Ride',
                goal: 'Boost aerobic threshold for longer rides',
                intensity: 'moderate',
                scheduledFor: new Date('2026-07-15T11:30:00Z'),
            },
            {
                userId: liam._id,
                teamId: enduranceEngine._id,
                title: 'Strength Circuit',
                goal: 'Build total-body strength endurance',
                intensity: 'high',
                scheduledFor: new Date('2026-07-15T18:00:00Z'),
            },
        ]);
        await Leaderboard_1.default.insertMany([
            {
                scope: 'team',
                teamId: pulsePredators._id,
                points: 1280,
                rank: 1,
                weekOf: new Date('2026-07-13T00:00:00Z'),
            },
            {
                scope: 'team',
                teamId: enduranceEngine._id,
                points: 1210,
                rank: 2,
                weekOf: new Date('2026-07-13T00:00:00Z'),
            },
            {
                scope: 'user',
                userId: ava._id,
                points: 670,
                rank: 1,
                weekOf: new Date('2026-07-13T00:00:00Z'),
            },
            {
                scope: 'user',
                userId: noah._id,
                points: 640,
                rank: 2,
                weekOf: new Date('2026-07-13T00:00:00Z'),
            },
            {
                scope: 'user',
                userId: liam._id,
                points: 595,
                rank: 3,
                weekOf: new Date('2026-07-13T00:00:00Z'),
            },
            {
                scope: 'user',
                userId: mia._id,
                points: 520,
                rank: 4,
                weekOf: new Date('2026-07-13T00:00:00Z'),
            },
        ]);
        console.log('Database seeding complete');
        await mongoose_1.default.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
