export type Address = {
  street: string
  number: number
  district: string
}

export type AddressListProps = {
  addresses: Address[]
}

export function AddressList(props: AddressListProps) {
  const { addresses } = props
  return (
    <div>
      <h1>AddressList</h1>
      <ul>
        {addresses.map((address, index) => (
          <li key={index}>
            {address.street}, {address.number} - {address.district}
          </li>
        ))}
      </ul>
    </div>
  )
}
