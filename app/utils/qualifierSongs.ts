import aSiteDeLaRue from '../routes/assets/asitedelarue.png';
import sarabande from '../routes/assets/sarabande.png';
import skeptic from '../routes/assets/skeptic.png';

const qualifierSongs = [
  { difficulty: 'S10' },
  { difficulty: 'S12' },
  { difficulty: 'S14' },
  {
    name: 'A Site De La Rue',
    difficulty: 'S16',
    image: aSiteDeLaRue,
  },
  { difficulty: 'S18' },
  { name: 'Sarabande', difficulty: 'S20', image: sarabande },
  { name: 'Skeptic', difficulty: 'S22', image: skeptic },
  { difficulty: 'D24', border: 'green.400' },
];

export { qualifierSongs };
