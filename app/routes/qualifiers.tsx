import { ArrowBackIcon } from '@chakra-ui/icons';
import {
  Container,
  Flex,
  Heading,
  Link,
  keyframes,
  Text,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Checkbox,
  Select,
  HStack,
  Box,
  Divider,
  FormErrorMessage,
} from '@chakra-ui/react';
import { Link as RemixLink } from '@remix-run/react';
import { useState } from 'react';
import {
  Controller,
  FieldErrors,
  FieldValues,
  UseFormRegister,
  useForm,
} from 'react-hook-form';
import { qualifierSongs } from '~/utils/qualifierSongs';

const fadeInHero = keyframes({
  '0%': {
    opacity: 0,
    transform: 'translate(0px, 10px)',
  },
  '100%': {
    opacity: 1,
  },
});

interface SongQualiferProps {
  index: 1 | 2;
  version: 'XX' | 'Phoenix';
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  isSubmitting: boolean;
}

const SongQualifier = ({
  register,
  errors,
  isSubmitting,
  version,
  index,
}: SongQualiferProps) => {
  const [songImage, setSongImage] = useState<any>();

  return (
    <Box flex="1">
      <Select mb={5} onChange={(e) => setSongImage(e.target.value)}>
        {qualifierSongs.map((qualifier) => (
          <option
            value={qualifier.image}
            key={`${qualifier.difficulty}-${index}`}
          >
            {qualifier.name} {qualifier.difficulty}
          </option>
        ))}
      </Select>
      <Box
        minH={200}
        maxW={400}
        marginLeft="auto"
        marginRight="auto"
        bgColor="whiteAlpha.100"
        bgImage={songImage}
        bgRepeat="no-repeat"
        bgPos="center"
        bgSize="cover"
        borderRadius="md"
        mb={5}
      />
      {version === 'XX' ? (
        <Stack>
          {[
            {
              field: 'perfect',
              label: 'Perfect',
            },
            {
              field: 'great',
              label: 'Great',
            },
            { field: 'good', label: 'Good' },
            { field: 'bad', label: 'Bad' },
            { field: 'miss', label: 'Miss' },
            { field: 'maxCombo', label: 'Max Combo' },
          ].map((judge) => {
            const id = `song-${index}-${judge.field}`;

            return (
              <FormControl isInvalid={!!errors[id]} key={judge.field}>
                <FormLabel>{judge.label}</FormLabel>
                <Input
                  id={id}
                  type="number"
                  placeholder="0"
                  disabled={isSubmitting}
                  {...register(id, {
                    required: 'Required',
                  })}
                />
              </FormControl>
            );
          })}
        </Stack>
      ) : (
        <FormControl isInvalid={!!errors.score}>
          <FormLabel>Score</FormLabel>
          <Input
            type="number"
            disabled={isSubmitting}
            placeholder="0"
            {...register('score', {
              required: 'Required',
            })}
          />
          <FormErrorMessage>
            {errors?.score?.message?.toString()}
          </FormErrorMessage>
        </FormControl>
      )}

      <Button mt={5}>Upload Picture</Button>
    </Box>
  );
};

const Qualifiers = () => {
  const [selectedVersion, setSelectedVersion] =
    useState<SongQualiferProps['version']>('XX');

  const {
    handleSubmit,
    register,
    control,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = () => {};

  const validateSkills = () => {
    const values = getValues('skill');

    if (values === undefined) return true;

    let countFalse = 0;
    let countTrue = 0;
    const numSkills = Object.values(values).length;

    Object.values(values).forEach((skill) => {
      if (skill) {
        countTrue++;
      } else {
        countFalse++;
      }
    });

    if (countTrue === 3) return true;
    if (countFalse === numSkills) return false;
    return false;
  };

  return (
    <>
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
          Submit Qualifiers
        </Heading>
      </Flex>
      <Container py="12" maxW="container.md">
        <Link as={RemixLink} to="/" color="green.200" textDecor="underline">
          <Flex alignItems="center" mb={12}>
            <ArrowBackIcon mr={3} />
            <Text fontWeight="bold">Back to Home</Text>
          </Flex>
        </Link>
        <Button colorScheme="green">Sign in with Google</Button>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack bg="whiteAlpha.100" padding="8" borderRadius="md" minH="400">
            <Heading size="md">Information</Heading>
            <Text>
              These questions will be used by the stream production team to
              deliver a high broadcast!
            </Text>
            <FormControl isInvalid={!!errors.name}>
              <FormLabel>start.gg Username</FormLabel>
              <Input
                type="text"
                {...register('name', {
                  required: 'Username is required',
                })}
              />
              <FormErrorMessage>
                {errors?.name?.message?.toString()}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.location}>
              <FormLabel>What state/province are you from?</FormLabel>
              <Input
                type="text"
                {...register('location', {
                  required: 'Location is required',
                })}
              />
              <FormErrorMessage>
                {errors?.location?.message?.toString()}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.title}>
              <FormLabel>
                What is your highest XX or Phoenix level title? (ex. Advanced 1,
                Expert 2, etc)
              </FormLabel>
              <Input
                type="text"
                {...register('title', {
                  required: 'Title is required',
                })}
              />
              <FormErrorMessage>
                {errors?.title?.message?.toString()}
              </FormErrorMessage>
            </FormControl>
            <FormControl mb={5} isInvalid={validateSkills() === false}>
              <FormLabel>What are your three strongest skills?</FormLabel>
              <Stack spacing={5} direction={['column', 'column', 'row']}>
                {['Run', 'Drill', 'Gimmick', 'Twist', 'Bracket', 'Half'].map(
                  (skill) => (
                    <Controller
                      key={skill}
                      name={`skill.${skill}`}
                      defaultValue={false}
                      control={control}
                      rules={{
                        validate: validateSkills,
                      }}
                      render={({ field }) => (
                        <Checkbox {...field}>{skill}</Checkbox>
                      )}
                    />
                  )
                )}
              </Stack>
              <FormErrorMessage>Must select exactly 3 skills</FormErrorMessage>
            </FormControl>
            <Heading size="md">Qualifiers</Heading>
            <FormControl>
              <FormLabel>
                Which version will you be submitting qualifiers from?
              </FormLabel>
              <Select
                onChange={(e) =>
                  setSelectedVersion(
                    e.target.value as SongQualiferProps['version']
                  )
                }
              >
                <option value="XX">Pump It Up XX</option>
                <option value="Phoenix">Pump It Up Phoenix</option>
              </Select>
            </FormControl>
            <Divider my={5} />
            <HStack spacing="8" mb={8}>
              <SongQualifier
                register={register}
                isSubmitting={isSubmitting}
                errors={errors}
                version={selectedVersion}
                index={1}
              />
              <SongQualifier
                register={register}
                isSubmitting={isSubmitting}
                errors={errors}
                version={selectedVersion}
                index={2}
              />
            </HStack>
            <Button colorScheme="green" type="submit">
              Submit
            </Button>
          </Stack>
        </form>
      </Container>
    </>
  );
};

export default Qualifiers;
