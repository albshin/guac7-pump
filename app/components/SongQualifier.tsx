import {
  Box,
  Stack,
  FormControl,
  FormLabel,
  Select,
  FormErrorMessage,
  Input,
  Text,
} from '@chakra-ui/react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { qualifierSongs, qualifierTotalNotes } from '~/utils/qualifierSongs';
import FileUpload from './FileUpload';
import { useRef } from 'react';

const breakdownValues = [
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
];

interface SongQualiferProps {
  defaultSong?: string;
  index: 'one' | 'two';
  register: UseFormRegister<any>;
  watch: any;
  errors: FieldErrors<any>;
  isSubmitting: boolean;
}

const validateFile = (value: FileList) => {
  if (value.length < 1) {
    return 'Picture is required';
  }
  if (value.length > 1) {
    return 'Cannot use multiple files';
  }
  for (const file of Array.from(value)) {
    const fsMb = file.size / (1024 * 1024);
    const MAX_FILE_SIZE = 10;
    if (fsMb > MAX_FILE_SIZE) {
      return `Cannot be greater than ${MAX_FILE_SIZE}MB`;
    }
  }
  return true;
};

const validateTotalNotes = (
  songName: string,
  index: string,
  formValues: any
) => {
  const maxNotes =
    qualifierTotalNotes[songName as keyof typeof qualifierTotalNotes];
  const totalNotes = breakdownValues.reduce((acc, val) => {
    if (val.field === 'maxCombo') return acc;
    return acc + Number(formValues[`song_${index}_${val.field}`] ?? 0);
  }, 0);

  if (totalNotes > maxNotes) {
    return `Exceeded note count (Max: ${maxNotes}, Over: ${
      totalNotes - maxNotes
    })`;
  }
  return true;
};

const SongQualifier = ({
  register,
  defaultSong = 'District 1',
  errors,
  watch,
  isSubmitting,
  index,
}: SongQualiferProps) => {
  const versionId = `song_${index}_version`;
  const songId = `song_${index}_name`;
  const scoreId = `song_${index}_score`;
  const pictureId = `song_${index}_picture`;
  const version = watch(versionId) ?? 'Phoenix';
  const songName = watch(songId) ?? defaultSong;
  const picture = watch(pictureId);
  const otherSong = `song_${index === 'one' ? 'two' : 'one'}_name`;

  return (
    <Stack flex="1" alignSelf="flex-start" minWidth={0}>
      <FormControl>
        <FormLabel>Version</FormLabel>
        <Select
          defaultValue={version}
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
      <FormControl isInvalid={!!errors[songId]}>
        <FormLabel>Song</FormLabel>
        <Select
          defaultValue={songName}
          size="sm"
          mb={3}
          {...register(songId, {
            required: true,
            validate: (value: string, formValues) => {
              if (value === formValues[otherSong]) {
                return 'Songs must not be the same';
              }
              return true;
            },
          })}
        >
          {qualifierSongs.map((qualifier) => (
            <option
              value={qualifier.name}
              key={`song_${index}_${qualifier.name}`}
            >
              {qualifier.name} {qualifier.difficulty}
            </option>
          ))}
        </Select>
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
          mb={2}
        />
        <FormErrorMessage>
          {errors[songId]?.message?.toString()}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!errors.pictureId} isRequired>
        <FileUpload
          name={pictureId}
          accept={'image/jpeg, image/png'}
          multiple={false}
          register={register(pictureId, { validate: validateFile })}
        >
          <Box
            border="2px solid"
            borderColor={picture?.length === 1 ? 'whiteAlpha.400' : 'red.500'}
            borderRadius="md"
            w="100%"
            mb={3}
            paddingX={3}
            paddingY={2}
          >
            <Text
              fontSize="sm"
              textOverflow="ellipsis"
              overflow="hidden"
              whiteSpace="nowrap"
              textAlign="center"
            >
              {picture?.length === 1 ? (
                picture[0].name
              ) : (
                <Text
                  as="u"
                  textDecor="underline"
                  display="inline"
                  cursor="pointer"
                  textColor={
                    picture?.length === 1 ? 'whiteAlpha.400' : 'red.500'
                  }
                >
                  {picture?.length === 1 ? 'Change Picture' : 'Upload Picture'}
                </Text>
              )}
            </Text>
          </Box>
        </FileUpload>
        <FormErrorMessage>
          {errors[pictureId]?.message?.toString()}
        </FormErrorMessage>
      </FormControl>
      {version === 'XX' ? (
        <Stack>
          {breakdownValues.map((judge) => {
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
                    required: 'Invalid number',
                    validate: (value: number, formValues) => {
                      if (judge.field === 'maxCombo') return true;
                      return validateTotalNotes(songName, index, formValues);
                    },
                    min: { value: 0, message: 'Cannot be negative' },
                    max: {
                      value:
                        qualifierTotalNotes[
                          songName as keyof typeof qualifierTotalNotes
                        ],
                      message: 'Cannot be greater than total amount of notes',
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors[id]?.message?.toString()}
                </FormErrorMessage>
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
              required: 'Invalid number',
              min: { value: 0, message: 'Cannot be negative' },
              max: {
                value: 1_000_000,
                message: 'Cannot be greater than maximum score',
              },
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

export default SongQualifier;
