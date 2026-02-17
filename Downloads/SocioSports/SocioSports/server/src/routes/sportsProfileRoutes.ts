import express from 'express';
import { createProfile, searchProfiles } from '../controllers/sportsProfileController';

const router = express.Router();

router.post('/', createProfile);
router.get('/search', searchProfiles);

export default router;
