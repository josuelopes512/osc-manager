import { Select, SelectItem, SelectProps } from '@nextui-org/react'

// interface SelectCompProps extends SelectProps{
//   data: any
//   loading: boolean
// }
export const SelectComp = ({
  // data,
  // loading,
  // error,
  // field,
  // form: { setValue },
  items,
  ...props
}: SelectProps) => {
  return (
    <Select
      // label="Participants"
      // id={field.label}
      // onSelectionChange={(value) => field.onChange(Array.from(value))}
      // name={field.label}
      // selectedKeys={
      //   Array.isArray(field.value) ? new Set(field.value) : new Set()
      // }
      variant="bordered"
      // isInvalid={!!error}
      // errorMessage={error?.message}
      classNames={{
        value: 'text-foreground',
        label: 'overflow-visible',
        base: 'w-full',
      }}
      items={items ?? []}
      {...props}
      // selectionMode="multiple"
      // isMultiline={(field.value?.length ?? 0) > 0}
      // renderValue={(items) => {
      //   return (
      //     <div className="flex flex-wrap gap-2">
      //       {items.map((item) => (
      //         <div key={item.key}>
      //           <Chip
      //             isCloseable
      //             onClose={() => {
      //               setValue(
      //                 field.label,
      //                 field.value?.filter((a) => a !== item.key?.toString()),
      //               )
      //             }}
      //             classNames={{
      //               base: 'h-full',
      //               content: 'px-0 pr-0',
      //               closeButton: 'ml-3 [&>svg]:h-[1.4em] [&>svg]:w-[1.4em]',
      //             }}
      //           >
      //             {item.data?.photo && (
      //               <User
      //                 name={item.data?.label || 'No name'}
      //                 avatarProps={{
      //                   name: item.data?.label || '',
      //                   showFallback: true,
      //                   className: 'mr-2 cursor-pointer',
      //                   src: item.data?.photo,
      //                 }}
      //                 classNames={{
      //                   description: 'cursor-pointer',
      //                   name: 'cursor-pointer',
      //                   base: 'flex',
      //                 }}
      //               />
      //             )}
      //             {!item.data?.photo && (
      //               <span className="ml-2">{item?.data?.label}</span>
      //             )}
      //           </Chip>
      //         </div>
      //       ))}
      //     </div>
      //   )
      // }}
    >
      {(item: any) => (
        <SelectItem
          key={item.value}
          className="capitalize"
          textValue={String(item.label)}
        >
          <div className="flex flex-col gap-2">{item.label}</div>
        </SelectItem>
      )}
    </Select>
  )
}
