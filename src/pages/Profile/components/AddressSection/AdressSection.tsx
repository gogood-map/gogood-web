import { designTokens } from 'design-tokens'
import { Address, AddressList } from '../AddressList/AddressList'

export type AddressFormProps = {
  adresses: Address[]
  onSelect: (address: Address) => void
  onAdd: () => void
}
export function AddressSection(props: AddressFormProps) {
  const { adresses, onSelect, onAdd } = props

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
        overflowY: 'auto',
        borderRadius: designTokens.borderRadius.large,
        boxShadow: `0px 4px 14px 0px ${designTokens.color.boxShadow}`,
      }}>
        <AddressList addresses={adresses} onSelect={onSelect} onAdd={onAdd} />
      </div>
    </div>
  )
}
