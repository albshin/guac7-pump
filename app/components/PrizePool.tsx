import { Box, Flex, Heading, Progress, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

const PrizePool = () => {
  const [progress, setProgress] = useState(0);

  // TODO: Replace with fetch from start.gg
  useEffect(() => {
    const delay = setTimeout(() => setProgress(56), 800);

    return () => {
      clearTimeout(delay);
    };
  }, []);

  return (
    <Box color="white">
      <Heading as="h2" mb="3">
        Prize Pool
      </Heading>
      <Text fontWeight="semibold" mb={6}>
        The prize pool will increase at 25 entrants and once more at 32
        entrants!
      </Text>
      <Flex justifyContent="space-between" mb={2} fontWeight="bold">
        <Text flexBasis="78%">$400</Text>
        <Text flex="1">$475</Text>
        <Text>$550</Text>
      </Flex>
      <Progress
        value={progress}
        colorScheme="whiteAlpha"
        borderRadius="md"
        h="20px"
        sx={{
          '& > div:first-child': {
            transition: '1s width ease-in-out',
          },
        }}
      />
    </Box>
  );
};

export default PrizePool;
