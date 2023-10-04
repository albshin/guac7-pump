import {
  Container,
  Flex,
  Heading,
  Text,
  Link,
  keyframes,
  Box,
} from '@chakra-ui/react';
import { Link as RemixLink } from '@remix-run/react';
import Markdown from 'react-markdown';
import ChakraUIRenderer from '~/chakraMarkdown';
import gfm from 'remark-gfm';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { motion, useScroll } from 'framer-motion';
import styled from '@emotion/styled';

const markdown = `
### ℹ️ General Information
- **Entry Cap**: 32 players
- **Registration Deadline**: November 10, 2023, 11:59pm EST 
- **Version**: Pump It Up Phoenix (2023)
- **Eligible Songs**: All songs included in Pump It Up Phoenix

Rules are subject to change **within reason** to accomodate schedule changes or a change in player count. No changes will be made that invalidate the integrity of the tournament.

### 📞 Tournament Organizer Information
- **Name**: Albert Shin
- **Discord**: deadcake
- **Pump Username**: DEADCAKE

If you have any questions about the ruleset or tournament, please reach out to me through Discord.

### 💰 Prizes
Prize pool will increase based on number of entrants.

**Prize Pool**
- **Base**: $250
- **25 Entrants**: $325
- **32 Entrants**: $400

**Split**
- **1st Place**: 40%
- **2nd Place**: 25%
- **3rd Place**: 20%
- **4th Place**: 10%
- **5th Place**: 5%

### 📖 General Rules
- Both brackets will be played in Normal judgment (no HJ).
- All speed mods, noteskins, and mods from the display category are allowed.
- Mods from the PATH and JUDGE categories may not be used.
- Down scroll path mod (DR) will be allowed however players who will use this mod will be required to notify the tournament organizer ahead of time in order to make special accommodations. If the tournament organizer is not notified ahead of time, the player will have to play with normal scroll.
- BGA Dark will be on by default. Both players must consent to BGA On if it is wanted.
- Any attempt to unfairly impact the game is grounds for disqualification at the tournament organizer's discretion.
- In the case that any event unfairly impacts a player mid-song, the tournament organizer may allow both players to replay a song. Pad issue calls must be able to be immediately replicated.
- Baby powder usage is allowed, however it must be applied off pads.
- Once a song is completed, players must step off the pads and avoid hitting the center yellow panel. If by any chance a song score cannot be recorded and it is deemed to be the player's fault, the player will receive a score of 0.
- Players are expected to be punctual to their matches within reason. Tournament organizers reserve the right to disqualify competitors due to tardiness at their own discretion.


### 📋 Format
The bracket will be split into two phases:

- **Gauntlet**: Waterfall (Top 2 advance to Pro Division)
- **Pro Division**: Double Elimination (Top 12)

Rounds may be adjusted during the tournament based on the number of registrants. Bracket difficulties are also subject to change and will be communicated to all players.

### 🚀 Qualification
All players must submit TWO qualifying scores by **November 10, 2023, 11:59pm EST**.

There are eight qualifying songs in total. Players will receive a rating based on Pump It Up Phoenix's rating system for both song played. The achieved rating of the two songs chosen will be added together and used for seeding. The top 10 seeds will be seeded into the Pro Bracket while all other seeds will be seeded into the Amateur Bracket.

Players will be allowed to submit scores from either an XX cab or a Phoenix cab. Scores from Pump It Up XX will be converted as accurately as possible to Phoenix's score system. Please note that the organizers are not responsible for any mistypes into the qualifier submission form that may affect seeding.

#### Qualification Chart Pool

- **S10**: District 1
- **S12**: Black Swan
- **S14**: Heart Rabbit Coaster
- **S16**: A Site De La Rue
- **S18**: Nihilism -Another Ver.-
- **S20**: Sarabande 
- **S22**: Skeptic
- **D24**: Achluoias

#### Qualifier Scoring

Qualifying rating will be calculated using a modified version of the Phoenix rating system where failed scores will still give rating in the qualifying leaderboard and scores of 875,000 points or lower will be given a rating of 0 for that qualifying score.

#### Qualifier Tiebreakers
Tiebreakers will be broken by the total score of the two qualifying charts submitted. Second tiebreaker will be the earliest score submission.

Photos are required with every score submission. Rules for photo submissions:
1. Modifiers must be clearly visible (Normal judgment must be used)
1. Score must be legible
1. Song must be identifiable from image
1. Your username must be visible

**Failure to submit qualifiers by the deadline could result in disqualification from the tournament.**

### 🎓 Gauntlet

#### Details
- **Date**: November 11th, 2023
- **Format**: Waterfall (Pools of 4 Players)
  - **Grand Finals**: Round Robin (Pool of 4 / Round Robin)
- **Player Count**: Max 22
- **Difficulty Range**
  - **General**: S13 - S21
  - **Grand Finals**: S20 - D21

#### Pools
There are two rounds for each pool with 4 players each. Two songs will be played each round.

##### Round 1

1. 6 songs will be randomly drawn from the pool difficulty range
1. Players will ban one song starting from lowest seed to highest seed until two remain
1. The bottom 2 seeds play first followed by the top 2 seeds
1. The player with the highest cumulative score will advance onto the next pool

All other players advance onto Round 2.

##### Round 2
1. 5 songs will be randomly drawn from the pool difficulty range
1. Players will ban one song starting from lowest seed to highest seed until two remain
1. The bottom 2 seeds play first followed by the remaining top seed
1. The player with the highest cumulative score will advance onto the next pool

All other players are eliminated.

##### Grand Finals
Last Pool is a round robin with the top 4 players in the Gauntlet. 4 songs will be played by all players.

Players will be awarded points based on their score on each song in comparison to the other players in the round. The two players with the highest point totals will quality for Pro Division and the bottom two players are eliminated. In the event of a tie affecting more than one player, a randomly drawn tiebreaker chart will be played between the affected players.

**Points Awarded**
- 1st place: 5 points
- 2nd place: 3 points
- 3rd place: 2 points
- 4th place: 1 point

Point allocation may be adjusted depending on the number of tournament entrants. 

**Procedure**
1. 8 songs will be randomly drawn from the pool difficulty range
1. Players will ban one song starting from lowest seed to highest seed until four remain
1. The bottom 2 seeds play first followed by the remaining top 2 seeds
1. Repeat step 2 - 3 until all four songs are played 

**The top two players from this pool will advance and be seeded into the bottom of Pro Division.**
(🥇 11th seed, 🥈 12th seed)

### 🎮 Pro Division

#### Details
- **Date**: November 12th, 2023
- **Format**: Double Elimination
  - **General**: BO3
  - **Loser's/Winner's/Grand Finals**: BO5
- **Player Count**: 12 (10 Qualified, 2 from the Gauntlet)
- **Difficulty Range**
  - **Winner's R1**: S21 - D23 
  - **Winner's Quarters**: S22 - D24 
  - **Loser's R1**: S22 - D24 
  - **Loser's R2**: S23 - D24 
  - **Winner's Semis**: S23 - D25
  - **Loser's Quarters**: S23 - D25
  - **Loser's Semis**: S24 - D25
  - **Winner's Finals**: S24 - D26 
  - **Loser's Finals**: S25 - D26 
  - **Grand Finals**: S25/D25+ 

#### Card Draw
GUAC 7 introduces new rules to reduce the amount of duplicate songs and add more strategy into the tournament

- The number of bans will be reduced to prevent players from favoring the same songs across tournaments
- Competitors all start with two re-draws that can be used throughout the bracket
  - Re-draws allow competitors to choose any song in the draw and re-randomize it after initial bans are complete
  - A player can re-draw up to twice in a single match
  - Players can only hold up to a maximum of two re-draws at any time
  - Players who reach the following stages will receive an additional re-draw
    - Winner's Semis
    - Loser's Quarters
    - Loser's Finals
    - Grand Finals
- For each round in the tournament, the song pool will be split evenly based on the number of matches in the round
  - This ensures that all songs across each match in a round are unique
  - With the exception: Loser's Finals and Winner's Finals are grouped together as one round
  - Splits per Round
    - Winner's R1: 4
    - Winner's Quarters: 4
    - Loser's R1: 4
    - Loser's R2: 2
    - Winner's Semis: 2
    - Loser's Quarters: 2
    - Loser's Semis: 1 (no split)
    - Loser's Finals/Winner's Finals: 2 (split between the two matches)
    - Grand Finals: 1 (no split)

#### Best of 3 (BO3)
5 songs will be drawn and 2 songs will be banned. Players will then choose to re-draw if they have any reminaing. Lower seed bans/re-draws first.

1. Lower seed bans
1. Higher seed bans
1. Lower seed optionally uses re-draw if they have any remaining
1. Higher seed optionally uses re-draw if they have any remaining
1. Lower seed optionally uses re-draw if they have any remaining
1. Higher seed optionally uses re-draw if they have any remaining
1. Players play the 3 remaining songs

#### Best of 5 (BO5)
9 songs will be drawn and 4 songs will be banned. Players will then choose to re-draw if they have any remaining. Lower seed bans/re-draws first.

1. Lower seed bans
1. Higher seed bans
1. Lower seed bans
1. Higher seed bans
1. Lower seed optionally uses re-draw if they have any remaining
1. Higher seed optionally uses re-draw if they have any remaining
1. Lower seed optionally uses re-draw if they have any remaining
1. Higher seed optionally uses re-draw if they have any remaining
1. Players play the 5 remaining songs
`;
const fadeInHero = keyframes({
  '0%': {
    opacity: 0,
    transform: 'translate(0px, 10px)',
  },
  '100%': {
    opacity: 1,
  },
});

const fadeIn = keyframes({
  '0%': {
    opacity: 0,
  },
  '100%': {
    opacity: 1,
  },
});

const ScrollBar = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 8px;
  background: var(--chakra-colors-purple-500);
  transform-origin: 0%;
`;

const Rules = () => {
  const { scrollYProgress } = useScroll();
  return (
    <>
      <ScrollBar className="progress-bar" style={{ scaleX: scrollYProgress }} />
      <Flex
        bgColor={'green.600'}
        p={6}
        h="200px"
        justifyContent="center"
        alignItems="center"
      >
        <Heading
          as="h1"
          textAlign="center"
          mb={4}
          animation={`${fadeInHero} 1.2s linear`}
        >
          Rules
        </Heading>
      </Flex>
      <Container py="12" maxW="container.lg">
        <Link as={RemixLink} to="/" color="green.200" textDecor="underline">
          <Flex alignItems="center" mb={12}>
            <ArrowBackIcon mr={3} />
            <Text fontWeight="bold">Back to Home</Text>
          </Flex>
        </Link>
        <Box animation={`${fadeIn} 1.2s linear`} fontSize="sm">
          <Markdown remarkPlugins={[gfm]} components={ChakraUIRenderer()}>
            {markdown}
          </Markdown>
        </Box>
      </Container>
    </>
  );
};

export default Rules;
