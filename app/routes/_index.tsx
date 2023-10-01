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
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import hero from './assets/guHero.png';
import guLogo from './assets/gulogo.png';
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
        <Stack direction={['column', 'row']} mb={10} mx={16} spacing={4}>
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
        <Stack direction={['column', 'row']}>
          <Flex flex="1" justifyContent="space-between" flexDir="column" py={8}>
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
          </Flex>
          <Image
            boxSize="sm"
            objectFit="cover"
            borderRadius="md"
            bgColor="whiteAlpha.100"
            src={hero}
          />
        </Stack>
        <Box mt={4}>
          <Heading as="h2" mb="3">
            Prize Pool
          </Heading>
          <Text fontWeight="semibold" mb={6}>
            The prize pool will increase at 25 entrants and once more at 32
            entrants!
          </Text>
          <Flex justifyContent="space-between" mb={2}>
            <Text>$250 (Base)</Text>
            <Text>$325 (25 entrants)</Text>
            <Text>$400 (32 entrants)</Text>
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
          <Wrap justify="center" alignItems="center" spacing="16">
            <WrapItem flexDir="column" alignItems="center">
              <Avatar name="Another48" size="xl" mb={4} />
              <Text fontWeight="bold" textAlign="center">
                Another48
              </Text>
              <Text fontWeight="semibold">NYC</Text>
              <Text>🥈 BITE 6</Text>
            </WrapItem>
            <WrapItem flexDir="column" alignItems="center">
              <Avatar name="4199" size="xl" mb={4} />
              <Text fontWeight="bold" textAlign="center">
                4199
              </Text>
              <Text fontWeight="semibold">Vancouver, BC</Text>
              <Text>🥈 CHQ AC</Text>
              <Text>🥈 Boston INNOVATED</Text>
            </WrapItem>
            <WrapItem flexDir="column" alignItems="center">
              <Avatar name="sel" size="xl" mb={4} />
              <Text fontWeight="bold" textAlign="center">
                sel (jhlee0133)
              </Text>
              <Text fontWeight="semibold">Oregon</Text>
              <Text>Expert 3</Text>
              <Text>First East Coast Appearance</Text>
            </WrapItem>
            <WrapItem flexDir="column" alignItems="center">
              <Avatar name="Jaekim" size="xl" mb={4} />
              <Text fontWeight="bold" textAlign="center">
                Jaekim
              </Text>
              <Text fontWeight="semibold">Boston, MA</Text>
              <Text>BITE 6 Commentary</Text>
            </WrapItem>
            <WrapItem flexDir="column" alignItems="center">
              <Avatar name="TUSA" size="xl" mb={4} />
              <Text fontWeight="bold" textAlign="center">
                TUSA
              </Text>
              <Text fontWeight="semibold">Dallas, TX</Text>
              <Text>BITE 6 Commentary</Text>
            </WrapItem>
          </Wrap>
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
          <SimpleGrid columns={4} spacing={10}>
            {['S10', 'S12', 'S14', 'S16', 'S18', 'S20', 'S22', 'D24'].map(
              (song) => (
                <Box key={song}>
                  <Box
                    borderRadius="md"
                    bgColor="whiteAlpha.100"
                    height="200px"
                    mb={4}
                  />
                  <Text fontWeight="bold" textAlign="center">
                    {song}
                  </Text>
                </Box>
              )
            )}
          </SimpleGrid>
        </Container>
      </Box>
      <Container py="12" maxW="container.lg">
        <Flex flexDirection="column" alignItems="center" mb="6">
          <Heading as="h2" color="white" mb="3">
            Leaderboard
          </Heading>
          <Text color="white" fontWeight="semibold">
            The top 10 players are placed in the Pro Division. The top 2 players
            from the AM bracket will move onto the Pro Division.
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
