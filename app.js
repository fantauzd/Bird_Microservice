// bird_microservice.js
const express = require("express");

const app = express();
const PORT = 23111;

app.use(express.json());
//various sources master list
const birdBreeds = [
    { name: 'Budgerigar (Budgie)', size: 2, energyLevel: 8, sociability: 9, noiseLevel: 6, livingSpace: 3, experienceWithBirds: 2 },
    { name: 'Cockatiel', size: 3, energyLevel: 7, sociability: 8, noiseLevel: 5, livingSpace: 3, experienceWithBirds: 3 },
    { name: 'African Grey Parrot', size: 7, energyLevel: 5, sociability: 8, noiseLevel: 8, livingSpace: 6, experienceWithBirds: 8 },
    { name: 'Macaw', size: 10, energyLevel: 8, sociability: 9, noiseLevel: 10, livingSpace: 9, experienceWithBirds: 9 },
    { name: 'Conure', size: 4, energyLevel: 8, sociability: 9, noiseLevel: 7, livingSpace: 4, experienceWithBirds: 5 },
    { name: 'Lovebird', size: 2, energyLevel: 7, sociability: 9, noiseLevel: 6, livingSpace: 2, experienceWithBirds: 3 },
    { name: 'Canary', size: 1, energyLevel: 5, sociability: 6, noiseLevel: 4, livingSpace: 2, experienceWithBirds: 2 },
    { name: 'Parrotlet', size: 2, energyLevel: 7, sociability: 8, noiseLevel: 5, livingSpace: 3, experienceWithBirds: 3 },
    { name: 'Cockatoo', size: 8, energyLevel: 7, sociability: 9, noiseLevel: 9, livingSpace: 7, experienceWithBirds: 8 },
    { name: 'Finch', size: 1, energyLevel: 6, sociability: 5, noiseLevel: 3, livingSpace: 2, experienceWithBirds: 2 },
    { name: 'Amazon Parrot', size: 6, energyLevel: 7, sociability: 8, noiseLevel: 8, livingSpace: 5, experienceWithBirds: 6 },
    { name: 'Eclectus Parrot', size: 7, energyLevel: 6, sociability: 8, noiseLevel: 6, livingSpace: 5, experienceWithBirds: 7 }
];

function calculateScore(userCriteria, breed) {
    let score = 0;
    score += Math.abs(userCriteria.size - breed.size);
    score += Math.abs(userCriteria.energyLevel - breed.energyLevel);
    score += Math.abs(userCriteria.sociability - breed.sociability);
    score += Math.abs(userCriteria.noiseLevel - breed.noiseLevel);
    score += Math.abs(userCriteria.livingSpace - breed.livingSpace);
    score += Math.abs(userCriteria.experienceWithBirds - breed.experienceWithBirds);
    return score;
}

app.post('/bird-breed', (req, res) => {
    const userCriteria = req.body;

    let bestMatch = null;
    let lowestScore = Infinity;

    birdBreeds.forEach(breed => {
        const score = calculateScore(userCriteria, breed);
        if (score < lowestScore) {
            lowestScore = score;
            bestMatch = breed;
        }
    });

    res.json({ breed: bestMatch.name });
});

app.listen(PORT, () => {
    console.log(`Bird breed recommendation microservice listening on port ${PORT}`);
});
