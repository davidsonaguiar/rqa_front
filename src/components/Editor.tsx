import {
  BoldItalicUnderlineToggles,
  MDXEditor,
  toolbarPlugin,
  BlockTypeSelect,
  InsertImage,
  imagePlugin,
  listsPlugin,
  ListsToggle,
  headingsPlugin,
  quotePlugin,
  linkPlugin,
  markdownShortcutPlugin,
  tablePlugin,
  InsertTable,
  InsertThematicBreak,
  thematicBreakPlugin,
} from '@mdxeditor/editor'
import '@mdxeditor/editor/style.css'
import { Prose } from './ui/prose'

interface Props {
  placeholder?: string
  onChange?: (value: string) => void
  value?: string
}

export function Editor(props: Props) {
  return (
    <Prose>
      <MDXEditor
        placeholder={props.placeholder}
        markdown={props.value ?? ''}
        onChange={props.onChange}
        plugins={[
          headingsPlugin({
            allowedHeadingLevels: [2, 3, 4],
          }),
          listsPlugin(),
          linkPlugin(),
          quotePlugin(),
          markdownShortcutPlugin(),
          listsPlugin(),
          tablePlugin(),
          thematicBreakPlugin(),
          imagePlugin({
            imageUploadHandler: (image) => {
              const url = URL.createObjectURL(image)
              return Promise.resolve(url)
            },
          }),
          toolbarPlugin({
            toolbarContents: () => (
              <div style={{ display: 'flex', gap: '8px' }}>
                <BlockTypeSelect />
                <BoldItalicUnderlineToggles />
                <InsertImage />
                <ListsToggle />
                <InsertTable />
                <InsertThematicBreak />
              </div>
            ),
          }),
        ]}
      />
    </Prose>
  )
}
