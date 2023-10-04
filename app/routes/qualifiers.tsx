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
  Divider,
  FormErrorMessage,
  useToast,
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
    formState: { errors, isSubmitting, isDirty },
  } = useForm({
    defaultValues: {
      username: data.username,
      location: data?.questions?.location,
      title: data?.questions?.title,
      strongest_skill: data?.questions?.strongest_skill ?? 'Run',
      weakest_skill: data?.questions?.weakest_skill ?? 'Drill',

      song_one_version: data?.song_one?.version,
      song_one_name: data?.song_one?.name,
      song_two_version: data?.song_two?.version,
      song_two_name: data?.song_two?.name,
    },
    mode: 'onChange',
    shouldUnregister: true,
  });

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

  const onSubmit: SubmitHandler<any> = async (data) => {
    try {
      await supabase.storage
        .from('qualifier_pictures')
        .upload(`${session.user.id}/song_one.jpg`, data.song_one_picture[0], {
          upsert: true,
        });

      await supabase.storage
        .from('qualifier_pictures')
        .upload(`${session.user.id}/song_two.jpg`, data.song_two_picture[0], {
          upsert: true,
        });

      const songOneData = prepareSongData('one', data);
      const songTwoData = prepareSongData('two', data);
      const totalRating = songOneData.rating + songTwoData.rating;

      await supabase.from('qualifiers').upsert({
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
    } catch (e) {
      toast({
        title: 'Error',
        description:
          'An error has occurred! If this persists please message @deadcake on Discord.',
        status: 'error',
      });
    }

    toast({
      title: 'Qualifier submitted',
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
            <Flex alignItems="center">
              <ArrowBackIcon mr={3} />
              <Text fontWeight="bold">Back to Home</Text>
            </Flex>
          </Link>
          {!session?.user ? (
            <Button colorScheme="green" onClick={onAuthenticate}>
              Sign in with Google
            </Button>
          ) : (
            <Stack>
              <Text
                textAlign="right"
                fontSize="md"
                fontWeight="semibold"
                mb={2}
              >
                Signed in as {session?.user.email}
              </Text>
              <Button
                variant="link"
                colorScheme="green"
                ml="auto"
                onClick={onAuthenticate}
              >
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
                <HStack spacing={5} mb={5}>
                  <SongQualifier
                    defaultSong="District 1"
                    watch={watch}
                    register={register}
                    isSubmitting={isSubmitting}
                    errors={errors}
                    index="one"
                  />
                  <SongQualifier
                    defaultSong="Black Swan"
                    watch={watch}
                    register={register}
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
                  isDisabled={isSubmitting}
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
