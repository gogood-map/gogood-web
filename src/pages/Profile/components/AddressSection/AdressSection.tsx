import { designTokens } from 'design-tokens'
import { AddressForm } from '../AddressForm/AddressForm'
import { AddressList } from '../AddressList/AddressList'

export function AddressSection() {

  const adresses = [
    {
      street: 'Rua das Laranjeiras',
      number: 123,
      district: 'Centro'
    },
    {
      street: 'Rua das Flores',
      number: 456,
      district: 'Jardim'
    }
  ]

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100%',
    }}>
      <div style={{
        width: '100%',
        height: `calc(50% - ${designTokens.spacing.large})`,
        marginBottom: designTokens.spacing.large
      }}>
        <AddressForm />
      </div>
      <div style={{
        width: '100%',
        height: '50%',
      }}>
        <AddressList addresses={adresses} />
      </div>
    </div>
  )
}
