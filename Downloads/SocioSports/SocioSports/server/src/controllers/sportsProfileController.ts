import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createProfile = async (req: Request, res: Response) => {
    try {
        const { sportsId, name, email, phone, role, sport, profession, location, image } = req.body;

        // Check if profile already exists with this Sports ID
        const existingProfile = await prisma.sportsProfile.findUnique({
            where: { sportsId }
        });

        if (existingProfile) {
            // Update existing if found (idempotency for re-submissions)
            const updated = await prisma.sportsProfile.update({
                where: { sportsId },
                data: { name, email, phone, role, sport, profession, location, image }
            });
            res.json(updated);
            return;
        }

        const profile = await prisma.sportsProfile.create({
            data: {
                sportsId,
                name,
                email,
                phone,
                role,
                sport,
                profession,
                location,
                image
            }
        });
        res.status(201).json(profile);
    } catch (error) {
        console.error('Create Profile Error:', error);
        res.status(500).json({ error: 'Failed to create profile' });
    }
};

export const searchProfiles = async (req: Request, res: Response) => {
    try {
        const { query } = req.query;

        if (!query || typeof query !== 'string' || query.trim() === '') {
            const profiles = await prisma.sportsProfile.findMany({
                take: 20,
                orderBy: { createdAt: 'desc' }
            });
            res.json(profiles);
            return;
        }

        const searchTerm = query.trim();

        // Search logic:
        // 1. Exact match on Sports ID
        // 2. Contains match on Name (case insensitive)
        const profiles = await prisma.sportsProfile.findMany({
            where: {
                OR: [
                    { sportsId: { equals: searchTerm } }, // Case sensitive usually for IDs, but could be insensitive
                    { name: { contains: searchTerm } } // SQLite verify case sensitivity
                ]
            },
            take: 20, // Limit results
            orderBy: { createdAt: 'desc' }
        });

        res.json(profiles);
    } catch (error) {
        console.error('Search Profile Error:', error);
        res.status(500).json({ error: 'Failed to search profiles' });
    }
};
