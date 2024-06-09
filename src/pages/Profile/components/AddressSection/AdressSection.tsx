import { designTokens } from 'design-tokens'
import { Address, AddressList } from '../AddressList/AddressList'

export type AddressFormProps = {
  adresses: Address[]
  onSelect: (address: Address) => void
  onAdd: () => void
  updateUserAddresses: () => void
}
export function AddressSection(props: AddressFormProps) {
  const { adresses, onSelect, onAdd, updateUserAddresses } = props

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100%',
      position: 'relative',
    }}>
      <div style={{
        width: '100%',
        height: '100%',
        borderRadius: designTokens.borderRadius.large,
        boxShadow: `0px 4px 14px 0px ${designTokens.color.boxShadow}`,
      }}>
        <AddressList updateUserAddresses={updateUserAddresses} addresses={adresses} onSelect={onSelect} onAdd={onAdd} />
      </div>
    </div>
  )
}
