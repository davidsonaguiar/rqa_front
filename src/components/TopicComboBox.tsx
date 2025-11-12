import { useGetTopics } from '@/hooks/useGetTopics'
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
  onChange?: (values: string[]) => void
  value?: string[]
  onBlur?: () => void
  selectedSubjectId?: string
}

export function TopicComboBox(props: Props) {
  const { topics } = useGetTopics()
  const { contains } = useFilter({ sensitivity: 'base' })

  const items = useMemo(() => {
    const filtered = props.selectedSubjectId
      ? topics.filter((t) => t.subjectId === props.selectedSubjectId)
      : topics

    return (
      filtered?.map((topic) => ({
        label: topic.name,
        value: topic.id,
      })) || []
    )
  }, [topics, props.selectedSubjectId])

  const { collection, filter } = useListCollection<ListProps>({
    initialItems: items,
    filter: contains,
  })

  return (
    <Combobox.Root
      multiple
      onValueChange={({ value }) => props.onChange?.(value)}
      value={props.value || []}
      closeOnSelect
      collection={collection}
      onInputValueChange={(e) => filter(e.inputValue)}
      width="100%"
      maxW="320px"
    >
      <Combobox.Control>
        <Combobox.Input
          placeholder={
            props.selectedSubjectId
              ? 'Tópicos'
              : 'Selecione uma matéria primeiro'
          }
        />
        <Combobox.IndicatorGroup>
          <Combobox.ClearTrigger />
          <Combobox.Trigger />
        </Combobox.IndicatorGroup>
      </Combobox.Control>

      <Portal>
        <Combobox.Positioner>
          <Combobox.Content>
            <Combobox.ItemGroup>
              <Combobox.ItemGroupLabel>Tópicos</Combobox.ItemGroupLabel>
              {collection.items.map((item) => (
                <Combobox.Item item={item} key={item.value}>
                  {item.label}
                  <Combobox.ItemIndicator />
                </Combobox.Item>
              ))}
              <Combobox.Empty>Não há itens</Combobox.Empty>
            </Combobox.ItemGroup>
          </Combobox.Content>
        </Combobox.Positioner>
      </Portal>
    </Combobox.Root>
  )
}
