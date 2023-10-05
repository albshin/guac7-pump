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
  Divider,
  FormErrorMessage,
  useToast,
  Icon,
} from '@chakra-ui/react';
import { LoaderFunction, json } from '@remix-run/node';
import {
  Link as RemixLink,
  useLoaderData,
  useOutletContext,
} from '@remix-run/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { OutletContext } from '~/types/types';
import { createSupabaseServerClient } from '~/utils/supabase.server';
import { getRedirectURL } from '~/utils/url';
import './assets/qualifiers.css';
import SongQualifier from '~/components/SongQualifier';
import {
  ScoreBreakdown,
  SongInfo,
  calculateRating,
  calculateScore,
} from '~/utils/rating';
import { qualifierDifficulty } from '~/utils/qualifierSongs';
import { useState } from 'react';
import {
  FaArrowLeft,
  FaCircleCheck,
  FaDiscord,
  FaFileExcel,
  FaGoogle,
  FaLink,
  FaRegEye,
  FaRegEyeSlash,
} from 'react-icons/fa6';

const fadeInHero = keyframes({
  '0%': {
    opacity: 0,
    transform: 'translate(0px, 10px)',
  },
  '100%': {
    opacity: 1,
  },
});

export const loader: LoaderFunction = async ({ request }) => {
  const env = {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL!,
    NEXT_PUBLIC_VERCEL_URL: process.env.NEXT_PUBLIC_VERCEL_URL!,
  };

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

  return json(
    { env, data: (data && data[0]) ?? [] },
    { headers: response.headers }
  );
};

const Qualifiers = () => {
  const { supabase, session } = useOutletContext<OutletContext>();
  const { env, data } = useLoaderData<typeof loader>();
  const toast = useToast();

  const {
    handleSubmit,
    register,
    watch,
    resetField,
    setValue,
    formState: { errors, isSubmitting, isDirty, isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      username: data.username,
      location: data?.questions?.location,
      title: data?.questions?.title,
      strongest_skill: data?.questions?.strongest_skill ?? 'Run',
      weakest_skill: data?.questions?.weakest_skill ?? 'Drill',

      song_one_version: data?.song_one?.version,
      song_one_name: data?.song_one?.name,
      song_one_score: data?.song_one?.score,
      song_one_perfect: data?.song_one?.breakdown?.perfect,
      song_one_great: data?.song_one?.breakdown?.great,
      song_one_good: data?.song_one?.breakdown?.good,
      song_one_bad: data?.song_one?.breakdown?.bad,
      song_one_miss: data?.song_one?.breakdown?.miss,
      song_one_maxCombo: data?.song_one?.breakdown?.maxCombo,

      song_two_version: data?.song_two?.version,
      song_two_name: data?.song_two?.name,
      song_two_score: data?.song_two?.score,
      song_two_perfect: data?.song_two?.breakdown?.perfect,
      song_two_great: data?.song_two?.breakdown?.great,
      song_two_good: data?.song_two?.breakdown?.good,
      song_two_bad: data?.song_two?.breakdown?.bad,
      song_two_miss: data?.song_two?.breakdown?.miss,
      song_two_maxCombo: data?.song_two?.breakdown?.maxCombo,
    },
    mode: 'onChange',
    shouldUnregister: true,
  });

  const isNewUser = data?.username === undefined;
  const [showInformation, setShowInformation] = useState(isNewUser);
  const selectedStrongestSkill = watch<any>('strongest_skill', 'Run');
  const selectedWeakestSkill = watch<any>('weakest_skill', 'Drill');

  const onAuthenticate = async () => {
    supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: getRedirectURL(env),
      },
    });
  };

  const prepareSongData = (index: string, data: any) => {
    const songData = {
      version: data[`song_${index}_version`],
      name: data[`song_${index}_name`],
      breakdown: {
        perfect: data[`song_${index}_perfect`] ?? 0,
        great: data[`song_${index}_great`] ?? 0,
        good: data[`song_${index}_good`] ?? 0,
        bad: data[`song_${index}_bad`] ?? 0,
        miss: data[`song_${index}_miss`] ?? 0,
        maxCombo: data[`song_${index}_maxCombo`] ?? 0,
      } as ScoreBreakdown,
      score: data[`song_${index}_score`],
    } as SongInfo;
    const difficulty =
      qualifierDifficulty[songData.name as keyof typeof qualifierDifficulty];
    const rating = calculateRating(songData);
    const score = calculateScore(songData);

    return { ...songData, difficulty, rating, score };
  };

  const handleError = (err: any) => {
    console.error(err);
    toast({
      title: 'Error',
      description:
        'An error has occurred! If this persists please message @deadcake on Discord.',
      status: 'error',
    });
  };

  const onSubmit: SubmitHandler<any> = async (data) => {
    if (!data.song_one_picture && !data.song_two_picture) {
      handleError('Both pictures were not supplied!');
      return;
    }

    if (data.song_one_picture && data.song_one_picture.length === 1) {
      const { error: pictureOneError } = await supabase.storage
        .from('qualifier_pictures')
        .upload(`${session.user.id}/song_one.jpg`, data.song_one_picture[0], {
          upsert: true,
        });
      if (pictureOneError) {
        handleError(pictureOneError);
        return;
      }
    }

    if (data.song_two_picture && data.song_two_picture.length === 1) {
      const { error: pictureTwoError } = await supabase.storage
        .from('qualifier_pictures')
        .upload(`${session.user.id}/song_two.jpg`, data.song_two_picture[0], {
          upsert: true,
        });
      if (pictureTwoError) {
        handleError(pictureTwoError);
        return;
      }
    }

    const songOneData = prepareSongData('one', data);
    const songTwoData = prepareSongData('two', data);
    const totalRating = songOneData.rating + songTwoData.rating;

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
      song_one: songOneData,
      song_two: songTwoData,
      total_rating: totalRating,
    });
    if (error) {
      handleError(error);
      return;
    }

    toast({
      title: 'Success',
      description: 'Your qualifier was submitted.',
      status: 'success',
    });
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
            <Flex alignItems="center" mr={8}>
              <Icon as={FaArrowLeft} mr={3} />
              <Text fontWeight="bold">Back to Home</Text>
            </Flex>
          </Link>
          {!session?.user ? (
            <Button colorScheme="green" onClick={onAuthenticate} p={5}>
              <Icon as={FaGoogle} mr={3} />
              Sign in with Google
            </Button>
          ) : (
            <Stack>
              <Text textAlign="right" fontSize="md" fontWeight="semibold">
                Signed in as {session?.user.email}
              </Text>
              <Button variant="link" colorScheme="green" ml="auto">
                Change User
              </Button>
            </Stack>
          )}
        </Flex>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex
            bg="whiteAlpha.100"
            paddingX={8}
            paddingY={5}
            borderRadius="md"
            justify="center"
            align="center"
          >
            {!session?.user ? (
              <Stack py={12}>
                <Icon
                  as={FaFileExcel}
                  boxSize={36}
                  mb={6}
                  marginLeft="auto"
                  marginRight="auto"
                  color="green.400"
                />
                <Heading size="md">Sign in to Submit Qualifiers</Heading>
              </Stack>
            ) : isSubmitSuccessful ? (
              <Flex
                px={5}
                py={12}
                justify="center"
                align="center"
                flexDir="column"
              >
                <Icon as={FaCircleCheck} boxSize={32} mb={12} />
                <Heading textAlign="center" fontSize="3xl" mb={8}>
                  Your qualifier was submitted successfully!
                </Heading>
                <Link href="https://discord.gg/4MZXqJbgz" target="_blank">
                  <Button colorScheme="blue">
                    <Icon mr={3} as={FaDiscord} /> Join the Discord
                  </Button>
                </Link>
              </Flex>
            ) : (
              <Stack>
                <HStack justifyContent="space-between" align="center">
                  <Heading size="md">Information</Heading>
                  {!isNewUser && (
                    <Button
                      variant="ghost"
                      colorScheme="green"
                      onClick={() =>
                        setShowInformation((prevState) => !prevState)
                      }
                    >
                      <Text mr={2}>{showInformation ? 'Hide' : 'Show'} </Text>
                      {showInformation ? (
                        <Icon as={FaRegEye} />
                      ) : (
                        <Icon as={FaRegEyeSlash} />
                      )}
                    </Button>
                  )}
                </HStack>
                <Stack
                  opacity={showInformation ? 100 : 0}
                  height={showInformation ? '100%' : 0}
                >
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
                        maxLength: {
                          value: 30,
                          message: 'Cannot be longer than 30 characters',
                        },
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
                        maxLength: {
                          value: 40,
                          message: 'Cannot be longer than 40 characters',
                        },
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
                        maxLength: {
                          value: 40,
                          message: 'Cannot be longer than 40 characters',
                        },
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
                </Stack>
                <Divider
                  my={showInformation ? 5 : 3}
                  mt={showInformation ? 5 : 0}
                />
                <HStack
                  justifyContent="space-between"
                  justify="center"
                  align="center"
                >
                  <Heading size="md">Qualifiers</Heading>
                  <a
                    href="https://piuscores.arroweclip.se/PhoenixCalculator"
                    target="_blank"
                  >
                    <Button variant="link" colorScheme="blue" size="sm">
                      <Icon as={FaLink} mr={1} /> Phoenix Score Converter
                    </Button>
                  </a>
                </HStack>
                <HStack spacing={5} mb={5}>
                  <SongQualifier
                    defaultSong="District 1"
                    previousScore={data?.song_one?.score}
                    watch={watch}
                    register={register}
                    setValue={setValue}
                    resetField={resetField}
                    isEditable={data.song_one === undefined}
                    isSubmitting={isSubmitting}
                    errors={errors}
                    index="one"
                  />
                  <SongQualifier
                    defaultSong="Black Swan"
                    previousScore={data?.song_two?.score}
                    watch={watch}
                    register={register}
                    setValue={setValue}
                    resetField={resetField}
                    isEditable={data.song_two === undefined}
                    isSubmitting={isSubmitting}
                    errors={errors}
                    index="two"
                  />
                </HStack>
                <Divider mb={5} />
                <Button
                  type="submit"
                  colorScheme="green"
                  isLoading={isSubmitting}
                  isDisabled={isSubmitting || !isDirty}
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
