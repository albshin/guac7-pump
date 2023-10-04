import district1 from '../routes/assets/district1.png';
import blackswan from '../routes/assets/blackswan.png';
import heartrabbitcoaster from '../routes/assets/heartrabbitcoaster.png';
import nihilism from '../routes/assets/nihilism.png';
import asitedelarue from '../routes/assets/asitedelarue.png';
import sarabande from '../routes/assets/sarabande.png';
import skeptic from '../routes/assets/skeptic.png';
import achluoias from '../routes/assets/achluoias.png';

export const qualifierTotalNotes = {
  'District 1': 559,
  'Black Swan': 635,
  'Heart Rabbit Coaster': 623,
  'A Site De La Rue': 838,
  'Nihilism -Another Ver.-': 1147,
  Sarabande: 1111,
  Skeptic: 1131,
  Achluoias: 1500,
};

export const qualifierBaseRating = {
  'District 1': 100,
  'Black Swan': 130,
  'Heart Rabbit Coaster': 200,
  'A Site De La Rue': 310,
  'Nihilism -Another Ver.-': 460,
  Sarabande: 650,
  Skeptic: 880,
  Achluoias: 1150,
};

export const qualifierDifficulty = {
  'District 1': 'S10',
  'Black Swan': 'S12',
  'Heart Rabbit Coaster': 'S14',
  'A Site De La Rue': 'S16',
  'Nihilism -Another Ver.-': 'S18',
  Sarabande: 'S20',
  Skeptic: 'S22',
  Achluoias: 'D24',
};

const qualifierSongs = [
  { name: 'District 1', difficulty: 'S10', image: district1 },
  { name: 'Black Swan', difficulty: 'S12', image: blackswan },
  {
    name: 'Heart Rabbit Coaster',
    difficulty: 'S14',
    image: heartrabbitcoaster,
  },
  {
    name: 'A Site De La Rue',
    difficulty: 'S16',
    image: asitedelarue,
  },
  { name: 'Nihilism -Another Ver.-', difficulty: 'S18', image: nihilism },
  { name: 'Sarabande', difficulty: 'S20', image: sarabande },
  { name: 'Skeptic', difficulty: 'S22', image: skeptic },
  {
    name: 'Achluoias',
    difficulty: 'D24',
    border: 'green.400',
    image: achluoias,
  },
];

export { qualifierSongs };
