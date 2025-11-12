import { useSubjects } from '@/hooks/useGetSubjects'
import {
  Combobox,
  Portal,
  useFilter,
  useListCollection,
} from '@chakra-ui/react'
import { useMemo } from 'react'

interface ListProps {
  label: string
  value: string
}

interface Props {
  onChange?: (value: string) => void
  value?: string
  onBlur?: () => void
}

export function SubjectComboBox(props: Props) {
  const { subjects } = useSubjects()
  const { contains } = useFilter({ sensitivity: 'base' })

  const items = useMemo(() => {
    return (
      subjects?.map((subject) => ({
        label: subject.name,
        value: subject.id,
      })) || []
    )
  }, [subjects])

  const { collection, filter } = useListCollection<ListProps>({
    initialItems: items,
    filter: contains,
  })

  return (
    <Combobox.Root
      onValueChange={({ value }) => props.onChange?.(value[0] || '')}
      value={props.value ? [props.value] : []}
      onInteractOutside={() => props.onBlur?.()}
      collection={collection}
      onInputValueChange={(e) => filter(e.inputValue)}
      width="100%"
      maxW="320px"
    >
      <Combobox.Control>
        <Combobox.Input placeholder="Matéria" />
        <Combobox.IndicatorGroup>
          <Combobox.ClearTrigger />
          <Combobox.Trigger />
        </Combobox.IndicatorGroup>
      </Combobox.Control>
      <Portal>
        <Combobox.Positioner>
          <Combobox.Content>
            <Combobox.Empty>Não há itens</Combobox.Empty>
            {collection.items.map((item) => (
              <Combobox.Item item={item} key={item.value}>
                {item.label}
                <Combobox.ItemIndicator />
              </Combobox.Item>
            ))}
          </Combobox.Content>
        </Combobox.Positioner>
      </Portal>
    </Combobox.Root>
  )
}
