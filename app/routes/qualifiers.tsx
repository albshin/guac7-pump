import { ArrowBackIcon, WarningIcon } from '@chakra-ui/icons';
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
  Select,
  HStack,
  Box,
  Divider,
  FormErrorMessage,
  SimpleGrid,
} from '@chakra-ui/react';
import { LoaderFunction, json } from '@remix-run/node';
import {
  Link as RemixLink,
  useLoaderData,
  useOutletContext,
} from '@remix-run/react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  FieldErrors,
  SubmitHandler,
  UseFormRegister,
  useForm,
} from 'react-hook-form';
import { OutletContext } from '~/types/types';
import { qualifierSongs } from '~/utils/qualifierSongs';
import { createSupabaseServerClient } from '~/utils/supabase.server';
import { getRedirectURL } from '~/utils/url';

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
  index: 'one' | 'two';
  register: UseFormRegister<any>;
  watch: any;
  errors: FieldErrors<any>;
  isSubmitting: boolean;
  picture?: File;
  setPicture: (file: File) => void;
}

const SongQualifier = ({
  register,
  errors,
  watch,
  isSubmitting,
  index,
  picture,
  setPicture,
}: SongQualiferProps) => {
  const versionId = `song_${index}_version`;
  const songId = `song_${index}_name`;
  const scoreId = `song_${index}_score`;
  const version = watch(versionId);
  const songName = watch(songId, 'District 1');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log(acceptedFiles[0]);
    setPicture(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    maxSize: 5242880,
    multiple: false,
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg'],
    },
  });

  return (
    <Stack flex="1" alignSelf="flex-start">
      <FormControl>
        <FormLabel>Version</FormLabel>
        <Select
          key={versionId}
          size="sm"
          {...register(versionId, {
            required: true,
          })}
        >
          <option value="XX">Pump It Up XX</option>
          <option value="Phoenix">Pump It Up Phoenix</option>
        </Select>
      </FormControl>
      <FormControl>
        <FormLabel>Song</FormLabel>
        <Select
          size="sm"
          mb={3}
          {...register(songId, {
            required: true,
          })}
        >
          {qualifierSongs.map((qualifier) => (
            <option
              value={qualifier.name}
              key={`song_${index}_${qualifier.difficulty}`}
            >
              {qualifier.name} {qualifier.difficulty}
            </option>
          ))}
        </Select>
      </FormControl>
      <Box
        w="100%"
        height="200px"
        border="3px red solid"
        borderColor={
          qualifierSongs.find((qualifer) => qualifer.name === songName)
            ?.border ?? 'red'
        }
        bgColor="whiteAlpha.100"
        bgImage={
          qualifierSongs.find((qualifer) => qualifer.name === songName)?.image
        }
        bgRepeat="no-repeat"
        bgPos="center"
        bgSize="cover"
        borderRadius="md"
        mb={5}
      />
      <Box
        {...getRootProps()}
        border="2px solid"
        borderColor="whiteAlpha.400"
        borderRadius="md"
        px={3}
        py={2}
        mb={3}
      >
        <input name={`song_${index}_picture`} {...getInputProps()} />
        <Text fontSize="sm" textAlign="center">
          {isDragActive ? (
            'Drop Here'
          ) : (
            <>
              {picture ? 'Uploaded! ' : 'Drag or '}
              <Text
                as="u"
                textDecor="underline"
                display="inline"
                cursor="pointer"
              >
                {picture ? 'Change Picture' : 'Upload Score Picture'}
              </Text>
            </>
          )}
        </Text>
      </Box>
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
            const id = `song_${index}_${judge.field}`;

            return (
              <FormControl isInvalid={!!errors[id]} key={judge.field}>
                <FormLabel>{judge.label}</FormLabel>
                <Input
                  size="sm"
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
        <FormControl isInvalid={!!errors[scoreId]}>
          <FormLabel>Score</FormLabel>
          <Input
            size="sm"
            id={scoreId}
            type="number"
            disabled={isSubmitting}
            placeholder="0"
            {...register(scoreId, {
              required: 'Required',
            })}
          />
          <FormErrorMessage>
            {errors[scoreId]?.message?.toString()}
          </FormErrorMessage>
        </FormControl>
      )}
    </Stack>
  );
};

export const loader: LoaderFunction = async ({ request }) => {
  const response = new Response();
  const supabase = createSupabaseServerClient({
    request,
    response,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data } = await supabase
    .from('qualifiers')
    .select()
    .eq('id', session?.user.id);

  return json({ data: (data && data[0]) ?? [] }, { headers: response.headers });
};

const Qualifiers = () => {
  const { supabase, session } = useOutletContext<OutletContext>();
  const { data } = useLoaderData<typeof loader>();
  const [pictureOne, setPictureOne] = useState<File>();
  const [pictureTwo, setPictureTwo] = useState<File>();

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    defaultValues: {
      username: data.username,
      location: data?.questions?.location,
      title: data?.questions?.title,
      strongest_skill: data?.questions?.strongest_skill ?? 'Run',
      weakest_skill: data?.questions?.weakest_skill ?? 'Drill',

      song_one_version: data?.song_one?.version,
      song_one_name: data?.song_one?.name,
      song_one_perfect: data?.song_one?.perfect,
      song_one_great: data?.song_one?.great,
      song_one_good: data?.song_one?.good,
      song_one_bad: data?.song_one?.bad,
      song_one_miss: data?.song_one?.miss,
      song_one_maxCombo: data?.song_one?.maxCombo,
      song_one_score: data?.song_one?.score,

      song_two_version: data?.song_two?.version,
      song_two_name: data?.song_two?.name,
      song_two_perfect: data?.song_two?.perfect,
      song_two_great: data?.song_two?.great,
      song_two_good: data?.song_two?.good,
      song_two_bad: data?.song_two?.bad,
      song_two_miss: data?.song_two?.miss,
      song_two_maxCombo: data?.song_two?.maxCombo,
      song_two_score: data?.song_two?.score,
    },
    mode: 'onBlur',
  });

  const selectedStrongestSkill = watch<any>('strongest_skill', 'Run');
  const selectedWeakestSkill = watch<any>('weakest_skill', 'Drill');

  const onAuthenticate = async () => {
    supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: getRedirectURL(),
      },
    });
  };

  const onSubmit: SubmitHandler<any> = async (data) => {
    if (pictureOne === undefined || pictureTwo === undefined) {
      return;
    }

    const { error: uploadErrorOne } = await supabase.storage
      .from('qualifier_pictures')
      .upload(`${session.user.id}/song_one.jpg`, pictureOne, { upsert: true });

    const { error: uploadErrorTwo } = await supabase.storage
      .from('qualifier_pictures')
      .upload(`${session.user.id}/song_two.jpg`, pictureTwo, { upsert: true });

    const { error } = await supabase.from('qualifiers').upsert({
      id: session.user.id,
      username: data.username,
      email: session.user.email,
      questions: {
        location: data.location,
        title: data.title,
        strongest_skill: data.strongest_skill,
        weakest_skill: data.weakest_skill,
      },
      song_one: {
        version: data.song_one_version,
        perfect: data.song_one_perfect,
        great: data.song_one_great,
        good: data.song_one_good,
        bad: data.song_one_bad,
        miss: data.song_one_miss,
        maxCombo: data.song_one_maxCombo,
        score: data.song_one_score,
      },
      song_two: {
        version: data.song_two_version,
        perfect: data.song_two_perfect,
        great: data.song_two_great,
        good: data.song_two_good,
        bad: data.song_two_bad,
        miss: data.song_two_miss,
        maxCombo: data.song_two_maxCombo,
        score: data.song_two_score,
      },
      updated_at: new Date(Date.now()).toISOString(),
    });

    console.error(error);
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
        <Flex justifyContent="space-between" align="center" mb={12}>
          <Link as={RemixLink} to="/" color="green.200" textDecor="underline">
            <Flex alignItems="center">
              <ArrowBackIcon mr={3} />
              <Text fontWeight="bold">Back to Home</Text>
            </Flex>
          </Link>
          {!session?.user && (
            <Button colorScheme="green" onClick={onAuthenticate}>
              Sign in with Google
            </Button>
          )}
        </Flex>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex
            bg="whiteAlpha.100"
            padding={8}
            borderRadius="md"
            justify="center"
            align="center"
          >
            {!session?.user ? (
              <Stack py={12}>
                <WarningIcon
                  boxSize={36}
                  mb={6}
                  marginLeft="auto"
                  marginRight="auto"
                  color="green.400"
                />
                <Heading size="md">Sign in to Submit Qualifiers</Heading>
              </Stack>
            ) : (
              <Stack>
                <Heading size="md">Information</Heading>
                <Text fontSize="md">
                  Questions will be used by the stream production team to
                  deliver a high quality broadcast!
                </Text>
                <FormControl isInvalid={!!errors.username}>
                  <FormLabel>start.gg Username</FormLabel>
                  <Input
                    size="sm"
                    type="text"
                    {...register('username', {
                      required: 'Username is required',
                    })}
                  />
                  <FormErrorMessage>
                    {errors?.username?.message?.toString()}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.location}>
                  <FormLabel>What state/province are you from?</FormLabel>
                  <Input
                    type="text"
                    size="sm"
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
                    What is your highest XX or Phoenix level title? (ex.
                    Advanced 1, Expert 2, etc)
                  </FormLabel>
                  <Input
                    type="text"
                    size="sm"
                    {...register('title', {
                      required: 'Title is required',
                    })}
                  />
                  <FormErrorMessage>
                    {errors?.title?.message?.toString()}
                  </FormErrorMessage>
                </FormControl>
                <HStack gap={3}>
                  <FormControl>
                    <FormLabel>What is your strongest skill?</FormLabel>

                    <Select
                      size="sm"
                      {...register('strongest_skill', {
                        required: 'Required',
                      })}
                    >
                      {['Run', 'Drill', 'Gimmick', 'Twist', 'Bracket', 'Half']
                        .filter((skill) => skill !== selectedWeakestSkill)
                        .map((skill) => (
                          <option key={`strongest-${skill}`}>{skill}</option>
                        ))}
                    </Select>
                    <FormErrorMessage>
                      {errors?.strongest_skill?.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl>
                    <FormLabel>What is your weakest skill?</FormLabel>

                    <Select
                      {...register('weakest_skill', {
                        required: 'Required',
                      })}
                      size="sm"
                    >
                      {['Run', 'Drill', 'Gimmick', 'Twist', 'Bracket', 'Half']
                        .filter((skill) => skill !== selectedStrongestSkill)
                        .map((skill) => (
                          <option key={`weakest-${skill}`}>{skill}</option>
                        ))}
                    </Select>
                    <FormErrorMessage>
                      {errors?.weakest_skill?.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                </HStack>
                <Divider my={5} />
                <Heading size="md">Qualifiers</Heading>
                <HStack spacing="8" mb={5}>
                  <SongQualifier
                    watch={watch}
                    register={register}
                    isSubmitting={isSubmitting}
                    errors={errors}
                    index="one"
                    picture={pictureOne}
                    setPicture={setPictureOne}
                  />
                  <SongQualifier
                    watch={watch}
                    register={register}
                    isSubmitting={isSubmitting}
                    errors={errors}
                    index="two"
                    picture={pictureTwo}
                    setPicture={setPictureTwo}
                  />
                </HStack>
                <Divider mb={5} />
                <Button
                  type="submit"
                  colorScheme="green"
                  isDisabled={isSubmitting || !isValid}
                >
                  Submit
                </Button>
              </Stack>
            )}
          </Flex>
        </form>
      </Container>
    </>
  );
};

export default Qualifiers;
