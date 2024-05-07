import { designTokens } from 'design-tokens'
import { AddressForm } from '../AddressForm/AddressForm'
import { AddressList } from '../AddressList/AddressList'

export function AddressSection() {

  const adresses = [
    {
      cep: '12345-678',
      street: 'Rua das Laranjeiras',
      number: 123,
      district: 'Centro',
      city: 'São Paulo',
    },
    {
      cep: '12345-678',
      street: 'Rua das macieiras',
      number: 123,
      district: 'Vila Maça',
      city: 'São Paulo',
    },
    {
      cep: '12345-678',
      street: 'Rua das Limoeiras',
      number: 123,
      district: 'Jd Limão',
      city: 'São Paulo',
    },
    {
      cep: '12345-678',
      street: 'Rua dos Cajuzeiros',
      number: 123,
      district: 'Vila Caju',
      city: 'São Paulo',
    },
    {
      cep: '12345-678',
      street: 'Rua das Bananeiras',
      number: 123,
      district: 'Cohab Banana',
      city: 'São Paulo',
    },
    {
      cep: '12345-678',
      street: 'Rua das Pitangueiras',
      number: 123,
      district: 'Vale Pitanga',
      city: 'São Paulo',
    },
    {
      cep: '12345-678',
      street: 'Rua das Jabuticabeiras',
      number: 123,
      district: 'Jd Jabuticaba',
      city: 'São Paulo',
    },
    {
      cep: '12345-678',
      street: 'Rua das Aceroleiras',
      number: 123,
      district: 'Vila Acerola',
      city: 'São Paulo',
    },
    {
      cep: '12345-678',
      street: 'Rua das Goiabeiras',
      number: 123,
      district: 'Vila Goiaba',
      city: 'São Paulo',
    },
    {
      cep: '12345-678',
      street: 'Rua das Mangueiras',
      number: 123,
      district: 'Vila Manga',
      city: 'São Paulo',
    },
  ]

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100%',
    }}>
      <div id='address-form' style={{
        width: '100%',
        marginBottom: designTokens.spacing.large
      }}>
        <AddressForm />
      </div>
      <div style={{
        width: '100%',
        flex: 1,
        overflowY: 'auto',
        borderRadius: designTokens.borderRadius.large,
        boxShadow: `0px 4px 14px 0px ${designTokens.color.boxShadow}`,
      }}>
        <AddressList addresses={adresses} />
      </div>
    </div>
  )
}
