import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  Image,
  Link,
  SimpleGrid,
  Stack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  keyframes,
} from '@chakra-ui/react';
import hero from './assets/guHero.png';
import guLogo from './assets/gulogo.png';
import jaekim from './assets/jaekim.png';
import graeme from './assets/graeme.png';
import tusa from './assets/tusa.png';
import sel from './assets/sel.png';
import guac7GauntletSchedule from './assets/guac7GauntletSchedule.png';
import guac7ProSchedule from './assets/guac7ProSchedule.png';
import PrizePool from '../components/PrizePool';
import {
  FaBookBookmark,
  FaDiscord,
  FaEarthAmericas,
  FaMoneyBillWave,
  FaRecordVinyl,
} from 'react-icons/fa6';
import { Link as RemixLink, useLoaderData } from '@remix-run/react';
import { motion } from 'framer-motion';
import { qualifierSongs } from '~/utils/qualifierSongs';
import { LoaderFunction, json } from '@remix-run/node';
import { createSupabaseServerClient } from '~/utils/supabase.server';

const pictureFadeIn = keyframes({
  '0%': {
    opacity: 0,
    transform: 'translate(20px, 0px)',
  },
  '100%': {
    opacity: 1,
  },
});

const fadeIn = keyframes({
  '0%': {
    opacity: 0,
    transform: 'translate(0px, 20px)',
  },
  '100%': {
    opacity: 1,
  },
});

const playerAnimation = {
  initial: {
    opacity: 0,
  },
  animate: (index: number) => ({
    opacity: 1,
    transition: {
      delay: 0.15 * index,
      duration: 0.65,
    },
  }),
};

const qualifierAnimation = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 + 0.15 * index,
      duration: 0.65,
    },
  }),
};

export const loader: LoaderFunction = async ({ request }) => {
  const response = new Response();
  const supabase = createSupabaseServerClient({
    request,
    response,
  });

  const { data } = await supabase
    .from('qualifiers')
    .select('*')
    .neq('total_rating', 0)
    .is('hidden', null)
    .order('total_rating', { ascending: false });

  const newData = data?.sort(
    (a, b) =>
      b.total_rating - a.total_rating ||
      b.song_one.score +
        b.song_two.score -
        (a.song_one.score + a.song_two.score)
  );

  return json({ data: newData ?? [] }, { headers: response.headers });
};

const Index = () => {
  const { data } = useLoaderData<typeof loader>();

  return (
    <>
      <Box bgColor={'green.600'} p={6} h="350px">
        <Flex
          alignItems="center"
          justifyContent="center"
          h="100%"
          animation={`${fadeIn} 1.2s ease-in-out`}
        >
          <Image src={guLogo} h="150px" mr={8} />
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
          <Link as={RemixLink} to="/rules" flex="1">
            <Button size="lg" w="100%" colorScheme="gray">
              Rules
            </Button>
          </Link>
          <Link as={RemixLink} to="/qualifiers" flex="1">
            <Button size="lg" variant="outline" w="100%">
              Submit Qualifiers
            </Button>
          </Link>
          <Link href="https://discord.gg/4MZXqJbgz" target="_blank" flex="1">
            <Button size="lg" colorScheme="blue" w="100%">
              <Icon as={FaDiscord} mr={3} /> Discord
            </Button>
          </Link>
        </Stack>
        <Stack
          direction={['column', 'column', 'row']}
          mb={12}
          justify="center"
          color="white"
          columnGap="80px"
        >
          <Stack flex="1" gap={6} py={8}>
            <Box>
              <Flex alignItems={'center'} mb={1}>
                <Icon as={FaEarthAmericas} mr={3} color="green.500" />
                <Text fontWeight="bold" fontSize="xl">
                  Regional Competition
                </Text>
              </Flex>
              <Text>
                Featuring the best players from New England, Oregon, Texas,
                Pennsylvania, New York, and Vancouver, BC
              </Text>
            </Box>
            <Box>
              <Flex alignItems={'center'} mb={1}>
                <Icon as={FaMoneyBillWave} mr={3} color="green.500" />
                <Text fontWeight="bold" fontSize="lg">
                  Prize Pool
                </Text>
              </Flex>
              <Text>
                Featuring a $400 base prize pool! The top 5 players will receive
                payouts
              </Text>
            </Box>
            <Box>
              <Flex alignItems={'center'} mb={1}>
                <Icon as={FaRecordVinyl} mr={3} color="green.500" />
                <Text fontWeight="bold" fontSize="lg">
                  Improved Stream
                </Text>
              </Flex>
              <Text>New dedicated stream setup and modern equipment</Text>
            </Box>
            <Box>
              <Flex alignItems={'center'} mb={1}>
                <Icon as={FaBookBookmark} mr={3} color="green.500" />
                <Text fontWeight="bold" fontSize="lg">
                  Updated Ruleset
                </Text>
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
            animation={`${pictureFadeIn} 1s ease-in-out`}
            src={hero}
          />
        </Stack>
        <PrizePool />
      </Container>
      <Box bg="green.600" fontSize="sm">
        <Container py="12" maxW="container.lg">
          <Flex flexDirection="column" alignItems="center" mb="6">
            <Heading as="h2" color="white" mb="3">
              Featuring
            </Heading>
          </Flex>
          <SimpleGrid columns={[2, 2, 3, 4]} gap={4}>
            {[
              {
                name: 'Jaekim',
                location: 'Boston, MA',
                subtitle: ['🥈 GUAC 6', 'BITE 6 Commentary'],
                picture: jaekim,
              },
              {
                name: '4199',
                location: 'Vancouver, BC',
                subtitle: ['🥈 CHQ AC', '🥈 Boston INNOVATED'],
                picture: graeme,
              },
              {
                name: 'Sel',
                location: 'Oregon',
                subtitle: ['Expert 3', 'First East Coast Apperance'],
                picture: sel,
              },
              {
                name: 'TUSA',
                location: 'Dallas, TX',
                subtitle: ['🥉 GUAC 6', 'BITE 6 Commentary'],
                picture: tusa,
              },
            ].map((player, i) => (
              <motion.div
                key={player.name}
                variants={playerAnimation}
                initial="initial"
                whileInView="animate"
                viewport={{
                  once: true,
                }}
                custom={i}
              >
                <Flex flexDir="column" alignItems="center">
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
                    <Text key={item}>{item}</Text>
                  ))}
                </Flex>
              </motion.div>
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
        <TableContainer borderRadius="md" bg="whiteAlpha.100" px={3} py={3}>
          <Table colorScheme="whiteAlpha">
            <Thead>
              <Tr>
                <Th>Seed</Th>
                <Th>Player</Th>
                <Th>Rating</Th>
                <Th>Song 1</Th>
                <Th>Song 2</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((qualifier: any, i: number) => (
                <Tr key={qualifier.email} fontWeight="semibold">
                  <Td>{`${i <= 9 ? '⭐ ' : ''}${i + 1}`}</Td>
                  <Td>{qualifier.username}</Td>
                  <Td>{qualifier.total_rating}</Td>
                  <Td fontSize="sm">
                    <Box>
                      <Text>
                        {`${qualifier.song_one.name} ${qualifier.song_one.difficulty}`}
                      </Text>
                      <Text fontWeight="normal">
                        {`${Intl.NumberFormat().format(
                          qualifier.song_one.score
                        )} (Rating: ${qualifier.song_one.rating})`}
                      </Text>
                    </Box>
                  </Td>
                  <Td fontSize="sm">
                    <Box>
                      <Text>
                        {`${qualifier.song_two.name} ${qualifier.song_two.difficulty}`}
                      </Text>
                      <Text fontWeight="normal">
                        {`${Intl.NumberFormat().format(
                          qualifier.song_two.score
                        )} (Rating: ${qualifier.song_two.rating})`}
                      </Text>
                    </Box>
                  </Td>
                </Tr>
              ))}
            </Tbody>
            {data.length === 0 && (
              <TableCaption fontWeight="bold" p="6">
                No submissions yet!
              </TableCaption>
            )}
          </Table>
        </TableContainer>
      </Container>
      <Box bgColor="green.600">
        <Container py="12" maxW="container.lg">
          <Flex flexDirection="column" alignItems="center" mb="6">
            <Heading as="h2" color="white" mb="3">
              Qualifiers
            </Heading>
            <Text color="white" fontWeight="semibold">
              A rating will be calculated based on the player's performance and
              the song's difficulty. Performing better on harder songs will net
              you a higher rating.
            </Text>
          </Flex>
          <SimpleGrid columns={[1, 2, 3, 4]} spacing={[4, 6, 6, 10]}>
            {qualifierSongs.map((song, i) => (
              <motion.div
                key={song.difficulty}
                variants={qualifierAnimation}
                initial="initial"
                whileInView="animate"
                viewport={{
                  once: true,
                }}
                custom={i}
              >
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
              </motion.div>
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
            Schedule is subject to change. A finalized schedule will be released
            closer to the event.
          </Text>
          <Flex
            justify="center"
            align="center"
            flexDir={['column', 'column', 'row']}
          >
            <Image maxW={['100%', '100%', '50%']} src={guac7GauntletSchedule} />
            <Image maxW={['100%', '100%', '50%']} src={guac7ProSchedule} />
          </Flex>
        </Flex>
      </Container>
    </>
  );
};

export default Index;
