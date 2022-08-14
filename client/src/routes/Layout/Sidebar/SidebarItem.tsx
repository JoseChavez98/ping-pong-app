import { Center, Hide, HStack, Icon } from '@chakra-ui/react'

type Props = {
  title: string
  path: string
  icon: any
  selected?: boolean
}

const SidebarItem = ({ title, path, icon, selected = false }: Props) => {
  return (
    <HStack
      as="a"
      href={path}
      spacing={3}
      w="full"
      color={selected ? 'teal.500' : ''}
      _hover={{ color: 'teal.600' }}
    >
      <Center>
        <Hide below="sm">
          <Icon as={icon} w={4} h={4} />
        </Hide>
      </Center>
      <Center fontWeight={selected ? 'bold' : ''}>{title}</Center>
    </HStack>
  )
}

export default SidebarItem
