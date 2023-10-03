import aSiteDeLaRue from '../routes/assets/asitedelarue.png';
import sarabande from '../routes/assets/sarabande.png';
import skeptic from '../routes/assets/skeptic.png';

const qualifierSongs = [
  { name: 'District 1', difficulty: 'S10' },
  { name: 'Black Swan', difficulty: 'S12' },
  { name: 'Heart Rabbit Coaster', difficulty: 'S14' },
  {
    name: 'A Site De La Rue',
    difficulty: 'S16',
    image: aSiteDeLaRue,
  },
  { name: 'Nihilism', difficulty: 'S18' },
  { name: 'Sarabande', difficulty: 'S20', image: sarabande },
  { name: 'Skeptic', difficulty: 'S22', image: skeptic },
  { name: 'Vanish', difficulty: 'D24', border: 'green.400' },
];

export { qualifierSongs };
