import { Container, Flex, Heading, Text, Link } from '@chakra-ui/react';
import { Link as RemixLink } from '@remix-run/react';
import Markdown from 'react-markdown';
import ChakraUIRenderer from '~/chakraMarkdown';
import gfm from 'remark-gfm';
import { ArrowBackIcon } from '@chakra-ui/icons';

const markdown = `
### General Information
- **Entry Cap**: 32 players
- **Registration Deadline**: November 10, 2023, 11:59pm EST 
- **Version**: Pump It Up Phoenix (2023)
- **Eligible Songs**: All songs included in Pump It Up Phoenix

### Tournament Organizer Information
- **Name**: Albert Shin
- **Discord**: deadcake
- **Pump Username**: DEADCAKE

If you have any questions about the ruleset or tournament, please reach out to me through Discord. Please read the entire document before asking questions; I may not answer during busy times or if the answer is in the ruleset.

### Format
The bracket will be split into three phases:

- **AM**: Waterfall (Top 2 advance to Pro Division)
- **Pro Division**: Double Elimination (Top 12)

Rounds may be adjusted during the tournament based on the number of registrants. Bracket difficulties are also subject to change.

### Prizes
A base prize pool will be split amongst the top five players of the bracket. Upon reaching 25 entrants, the prize pool will be increased to $325. Upon reaching 32 entrants, the prize pool will be increased to $400. The split will be as follows:

- **1st Place**: 40%
- **2nd Place**: 25%
- **3rd Place**: 20%
- **4th Place**: 10%
- **5th Place**: 5%

### Qualification
All players must submit TWO qualifying scores by **November 10, 2023, 11:59pm EST**. There are eight qualifying songs in total. The qualifying rating of the two qualifying songs you choose will be added together as your qualifying score. Your qualifying rating will be used to seed you at the event. Top 10 seeds will be seeded into the Pro Bracket. All other seeds will be seeded into the Amateur Bracket.

Players will be allowed to submit scores from either an XX cab or a Phoenix cab. Please see later in the section to read on how to submit scores for each cab type.

#### Qualification Chart Pool

#### Qualifier Scoring

Qualifying rating will be calculated using a modified version of the Phoenix rating system where failed scores will still give rating in the qualifying leaderboard and scores of 875,000 points or lower will be given a rating of 0 for that qualifying score.

#### Tiebreakers

Phoenix rating ties will be broken by the total score of the two qualifying charts submitted. Second tiebreaker will be the earliest score submission.


Photos are required with every score submission. Rules for photo submissions:
1. Modifiers must be clearly visible (Normal judgment must be used)
1. Score must be legible
1. Song must be identifiable from image
1. Your username must be visible

**Failure to submit qualifiers by the deadline could result in disqualification from the tournament.**

If you don't know which songs should submit scores for, in general you should play the hardest chart you think/know you can pass and the chart below that. For example, if you have passed a S20 or think you could pass it if you tried your hardest, you should submit scores for the S20 and S18.


`;

const Rules = () => {
  return (
    <>
      <Flex
        bgColor={'green.600'}
        p={6}
        h="200px"
        justifyContent="center"
        alignItems="center"
      >
        <Heading as="h1" textAlign="center" mb={4}>
          Rules
        </Heading>
      </Flex>
      <Container py="12" maxW="container.lg">
        <Link as={RemixLink} to="/" color="green.200" textDecor="underline">
          <Flex alignItems="center">
            <ArrowBackIcon mr={3} />
            <Text fontWeight="bold">Back to Home</Text>
          </Flex>
        </Link>
        <Markdown remarkPlugins={[gfm]} components={ChakraUIRenderer()}>
          {markdown}
        </Markdown>
      </Container>
    </>
  );
};

export default Rules;
