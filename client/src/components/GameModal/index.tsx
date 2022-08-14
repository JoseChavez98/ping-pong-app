import { useCreateGameMutation, useGetPlayersQuery, User } from '../../types'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormLabel,
  Input,
  Flex,
  Divider,
  Select,
  VStack,
  Container,
  Spacer,
  Radio,
  RadioGroup,
  Stack,
  Text
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'

type Props = {
  isOpen: boolean
  onClose: () => void
}

interface FormInput {
  firstUserId: string
  secondUserId: string
  winner: string
  details: string
  completed: boolean
}

const initialFormValues: FormInput = {
  firstUserId: '-1',
  secondUserId: '-1',
  winner: '-1',
  details: '',
  completed: true
}

const GameModal = ({ isOpen, onClose }: Props) => {
  const [formValues, setFormValues] = useState<FormInput>({
    ...initialFormValues
  })
  const [firstPlayerOptions, setFirstPlayerOptions] = useState<User[]>([])
  const [secondPlayerOptions, setSecondPlayerOptions] = useState<User[]>([])
  const [winnerOptions, setWinnerOptions] = useState<User[]>([])
  const [formError, setFormError] = useState(false)

  const { data: playersData, loading: playersLoading } = useGetPlayersQuery({
    onError: (error: any) => {
      console.error(error)
    }
  })
  const [createGameMutation, { data, loading, error }] = useCreateGameMutation()

  const validateFields = (formValues: FormInput) => {
    if (
      formValues.details === '' ||
      formValues.firstUserId === '-1' ||
      formValues.secondUserId === '-1' ||
      (formValues.completed ? formValues.winner === '-1' : false)
    )
      return false
    return true
  }

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (validateFields(formValues)) {
      createGameMutation({
        variables: {
          firstUserId: parseInt(formValues.firstUserId),
          secondUserId: parseInt(formValues.secondUserId),
          winnerId: formValues.completed ? parseInt(formValues.winner) : 0,
          details: formValues.details,
          completed: formValues.completed
        },
        onCompleted: (data) => {
          setFormValues({ ...initialFormValues })
          setFormError(false)
          onClose()
        },
        refetchQueries: ['GetGames']
      })
    } else {
      setFormError(true)
    }
    event.preventDefault()
  }

  useEffect(() => {
    if (playersData?.users) {
      if (formValues.secondUserId !== '-1')
        setFirstPlayerOptions(
          [...(playersData.users as User[])].filter(
            (user) => user.id !== parseInt(formValues.secondUserId)
          )
        )
      else setFirstPlayerOptions([...(playersData.users as User[])])
      if (formValues.firstUserId !== '-1')
        setSecondPlayerOptions(
          [...(playersData.users as User[])].filter(
            (user) => user.id !== parseInt(formValues.firstUserId)
          )
        )
      else setSecondPlayerOptions([...(playersData.users as User[])])
      if (formValues.firstUserId !== '-1' && formValues.secondUserId !== '-1') {
        const firstWinnerOption = [...(playersData.users as User[])].find(
          (player) => player.id === parseInt(formValues.firstUserId)
        )
        const secondWinnerOption = [...(playersData.users as User[])].find(
          (player) => player.id === parseInt(formValues.secondUserId)
        )
        if (firstWinnerOption && secondWinnerOption)
          setWinnerOptions([firstWinnerOption, secondWinnerOption])
      }
    }
  }, [playersData?.users, formValues.secondUserId, formValues.firstUserId])

  useEffect(() => {
    if (!isOpen) {
      setFormValues({ ...initialFormValues })
      setFormError(false)
    }
  }, [isOpen])

  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      closeOnEsc
    >
      <ModalOverlay />
      <form onSubmit={onSubmit}>
        <ModalContent>
          <ModalHeader>Create Game Register</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={6}>
              <Container>
                <FormLabel htmlFor="details">Game Details</FormLabel>
                <Input
                  id="details"
                  placeholder="Details"
                  value={formValues.details}
                  onChange={(event: React.FormEvent<HTMLInputElement>) =>
                    setFormValues({
                      ...formValues,
                      details: event.currentTarget.value
                    })
                  }
                />
              </Container>
              <Flex w="full">
                <Container>
                  <FormLabel htmlFor="firstUser">First Player</FormLabel>
                  <Select
                    id="firstUser"
                    placeholder="Select option"
                    value={formValues.firstUserId}
                    onChange={(event: any) =>
                      setFormValues({
                        ...formValues,
                        firstUserId: event.currentTarget.value
                      })
                    }
                  >
                    {firstPlayerOptions &&
                      firstPlayerOptions.map((player, index: number) => (
                        <option key={index} value={player?.id}>
                          {player?.first_name} {player?.last_name}
                        </option>
                      ))}
                  </Select>
                </Container>
                <Spacer />
                <Container>
                  <FormLabel htmlFor="secondUser">Second Player</FormLabel>
                  <Select
                    id="secondUser"
                    placeholder="Select option"
                    value={formValues.secondUserId}
                    onChange={(event: any) =>
                      setFormValues({
                        ...formValues,
                        secondUserId: event.currentTarget.value
                      })
                    }
                  >
                    {secondPlayerOptions &&
                      secondPlayerOptions.map((player, index: number) => (
                        <option key={index} value={player?.id}>
                          {player?.first_name} {player?.last_name}
                        </option>
                      ))}
                  </Select>
                </Container>
              </Flex>
              <Divider />
              <Container>
                <FormLabel htmlFor="completed">Status</FormLabel>
                <RadioGroup
                  id="completed"
                  onChange={(value) =>
                    setFormValues({
                      ...formValues,
                      completed: value === 'true' ? true : false
                    })
                  }
                  value={formValues.completed ? 'true' : 'false'}
                >
                  <Stack direction="row">
                    <Radio value={'true'}>Completed</Radio>
                    <Radio value={'false'}>Suspended</Radio>
                  </Stack>
                </RadioGroup>
              </Container>
              <Container>
                <FormLabel htmlFor="winner">Winner</FormLabel>
                <Select
                  id="winner"
                  placeholder="Select option"
                  value={formValues.winner}
                  onChange={(event: any) =>
                    setFormValues({
                      ...formValues,
                      winner: event.currentTarget.value
                    })
                  }
                  disabled={
                    !formValues.completed ||
                    formValues.firstUserId === '-1' ||
                    formValues.secondUserId === '-1' ||
                    formValues.firstUserId === formValues.secondUserId
                  }
                >
                  {winnerOptions &&
                    winnerOptions.map((player, index: number) => (
                      <option key={index} value={player?.id}>
                        {player?.first_name} {player?.last_name}
                      </option>
                    ))}
                </Select>
              </Container>
            </VStack>
            {formError && (
              <Text color="red">Please complete and verify all field.</Text>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" mr={3} type="submit">
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  )
}

export default GameModal
