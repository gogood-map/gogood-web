import { designTokens } from 'design-tokens'
import { AddressForm } from '../AddressForm/AddressForm'

export type AddressCardProps = {
  street: string
  number: string
  city: string
  state: string
  cep: string
}

export function AddressCard(props: AddressCardProps) {
  // const { street, number, city, state, cep } = props
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '80%',
      gap: designTokens.spacing.small
    }}>
      <AddressForm {...props} />
    </div>
  )
}
