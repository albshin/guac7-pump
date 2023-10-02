import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Link,
  Progress,
  SimpleGrid,
  Stack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import hero from './assets/guHero.png';
import guLogo from './assets/gulogo.png';
import jaekim from './assets/jaekim.png';
import graeme from './assets/graeme.png';
import skeptic from './assets/skeptic.png';
import aSiteDeLaRue from './assets/asitedelarue.png';
import sarabande from './assets/sarabande.png';
import {
  InfoIcon,
  AtSignIcon,
  PlusSquareIcon,
  ViewIcon,
} from '@chakra-ui/icons';
import { Link as RemixLink } from '@remix-run/react';

const Index = () => {
  return (
    <>
      <Box bgColor={'green.600'} p={6} h="350px">
        <Flex alignItems="center" justifyContent="center" h="100%">
          <Image src={guLogo} h="240px" marginTop="40px" mr="3" />
          <Box>
            <Heading as="h1" size="4xl" color="white" mb="2">
              GUAC 7 Pump
            </Heading>
            <Heading as="h3" color="white">
              November 11 - 12
            </Heading>
          </Box>
        </Flex>
      </Box>
      <Container py="12" maxW="container.lg">
        <Stack
          direction={['column', 'column', 'row']}
          mb={10}
          mx={16}
          spacing={4}
        >
          <Link
            href="https://www.start.gg/tournament/game-underground-arcade-championship-7/details"
            flex="1"
          >
            <Button size="lg" colorScheme="green" w="100%">
              Register
            </Button>
          </Link>
          <Box flex="1">
            <RemixLink to="/rules">
              <Button size="lg" w="100%" colorScheme="gray">
                Rules
              </Button>
            </RemixLink>
          </Box>
          <Link flex="1">
            <Button size="lg" variant="outline" w="100%">
              Submit Qualifiers
            </Button>
          </Link>
        </Stack>
        <Stack
          direction={['column', 'column', 'row']}
          mb={[8, 8, 2]}
          justify="center"
        >
          <Stack flex="1" gap={4} py={8}>
            <Box>
              <Flex alignItems={'center'} mb={1}>
                <AtSignIcon mr={3} color="green.500" />
                <Text fontWeight="bold">Regional Competition</Text>
              </Flex>
              <Text>
                Featuring players from Oregon, Texas, Pennsylvania, New York,
                and Vancouver
              </Text>
            </Box>
            <Box>
              <Flex alignItems={'center'} mb={1}>
                <PlusSquareIcon mr={3} color="green.500" />
                <Text fontWeight="bold">Prize Pool</Text>
              </Flex>
              <Text>
                Featuring a $250 base prize pool! The top 5 players will receive
                payouts
              </Text>
            </Box>
            <Box>
              <Flex alignItems={'center'} mb={1}>
                <ViewIcon mr={3} color="green.500" />
                <Text fontWeight="bold">Improved Stream</Text>
              </Flex>
              <Text>New dedicated stream setup and modern equipment</Text>
            </Box>
            <Box>
              <Flex alignItems={'center'} mb={1}>
                <InfoIcon mr={3} color="green.500" />
                <Text fontWeight="bold">Updated Ruleset</Text>
              </Flex>
              <Text>
                New and exciting ruleset designed to keep each round feeling
                fresh
              </Text>
            </Box>
          </Stack>
          <Image
            boxSize="sm"
            objectFit="cover"
            borderRadius="md"
            bgColor="whiteAlpha.100"
            src={hero}
          />
        </Stack>
        <Box>
          <Heading as="h2" mb="3">
            Prize Pool
          </Heading>
          <Text fontWeight="semibold" mb={6}>
            The prize pool will increase at 25 entrants and once more at 32
            entrants!
          </Text>
          <Flex justifyContent="space-between" mb={2} fontWeight="bold">
            <Text>$250</Text>
            <Text>$325</Text>
            <Text>$400</Text>
          </Flex>
          <Progress
            value={8}
            colorScheme="whiteAlpha"
            borderRadius="md"
            h="20px"
          />
        </Box>
      </Container>
      <Box bg="green.600">
        <Container py="12" maxW="container.lg">
          <Flex flexDirection="column" alignItems="center" mb="6">
            <Heading as="h2" color="white" mb="3">
              Featured Players
            </Heading>
          </Flex>
          <SimpleGrid columns={[2, 2, 3, 4]} gap={4}>
            {[
              { name: 'Another86', location: 'NYC', subtitle: ['🥈 BITE 6'] },
              {
                name: '4199',
                location: 'Vancouver, BC',
                subtitle: ['🥈 CHQ AC', '🥈 Boston INNOVATED'],
                picture: graeme,
              },
              {
                name: 'sel',
                location: 'Oregon',
                subtitle: ['Expert 3', 'First East Coast Apperance'],
              },
              {
                name: 'Jaekim',
                location: 'Boston, MA',
                subtitle: ['BITE 6 Commentary'],
                picture: jaekim,
              },
              {
                name: 'TUSA',
                location: 'Dallas, TX',
                subtitle: ['BITE 6 Commentary'],
              },
            ].map((player) => (
              <Flex flexDir="column" alignItems="center" key={player.name}>
                <Avatar
                  name={player.name}
                  size="xl"
                  mb={4}
                  src={player.picture ?? undefined}
                />
                <Text fontWeight="bold" textAlign="center">
                  {player.name}
                </Text>
                <Text fontWeight="semibold">{player.location}</Text>
                {player.subtitle.map((item) => (
                  <Text>{item}</Text>
                ))}
              </Flex>
            ))}
          </SimpleGrid>
        </Container>
      </Box>
      <Container py="12" maxW="container.lg">
        <Flex flexDirection="column" alignItems="center" mb="6">
          <Heading as="h2" color="white" mb="3">
            Schedule
          </Heading>
          <Text color="white" fontWeight="semibold">
            TBD!
          </Text>
        </Flex>
      </Container>
      <Box bgColor="green.600">
        <Container py="12" maxW="container.lg">
          <Flex flexDirection="column" alignItems="center" mb="6">
            <Heading as="h2" color="white" mb="3">
              Qualifiers
            </Heading>
            <Text color="white" fontWeight="semibold">
              Players must choose TWO songs to play. A rating will be calculated
              based on the player's performance and the song's difficulty.
              Performing better on harder songs will net you a higher rating.
            </Text>
          </Flex>
          <SimpleGrid columns={[1, 2, 3, 4]} spacing={[4, 6, 6, 10]}>
            {[
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
            ].map((song) => (
              <Box key={song.difficulty}>
                <Box
                  border="3px red solid"
                  borderRadius="md"
                  borderColor={song.border ?? 'red'}
                  bgColor="whiteAlpha.100"
                  bgImage={song.image}
                  bgRepeat="no-repeat"
                  bgPos="center"
                  bgSize="cover"
                  height="200px"
                  mb={4}
                />
                <Text fontWeight="bold" textAlign="center">
                  {song.name} {song.difficulty}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        </Container>
      </Box>
      <Container py="12" maxW="container.lg">
        <Flex flexDirection="column" alignItems="center" mb="6">
          <Heading as="h2" color="white" mb="3">
            Leaderboard
          </Heading>
          <Text color="white" fontWeight="semibold">
            The top 10 players are placed in the Pro Division.
          </Text>
        </Flex>
        <TableContainer borderRadius="md" bg="whiteAlpha.100">
          <Table variant="striped" colorScheme="whiteAlpha">
            <Thead>
              <Tr>
                <Th>Seed</Th>
                <Th>Player</Th>
                <Th>Rating</Th>
                <Th>Song 1</Th>
                <Th>Song 2</Th>
              </Tr>
            </Thead>
            <Tbody></Tbody>
            <TableCaption fontWeight="bold" p="6">
              No submissions yet!
            </TableCaption>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

export default Index;
