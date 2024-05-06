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
      cep: '98765-432',
      street: 'Rua das Flores',
      number: 456,
      district: 'Jardim',
      city: 'Rio de Janeiro',
    },
    {
      cep: '98765-432',
      street: 'Rua das Flores',
      number: 456,
      district: 'Jardim',
      city: 'Rio de Janeiro',
    },
    {
      cep: '98765-432',
      street: 'Rua das Flores',
      number: 456,
      district: 'Jardim',
      city: 'Rio de Janeiro',
    },
    {
      cep: '98765-432',
      street: 'Rua das Flores',
      number: 456,
      district: 'Jardim',
      city: 'Rio de Janeiro',
    },
    {
      cep: '98765-432',
      street: 'Rua das Flores',
      number: 456,
      district: 'Jardim',
      city: 'Rio de Janeiro',
    },
    {
      cep: '98765-432',
      street: 'Rua das Flores',
      number: 456,
      district: 'Jardim',
      city: 'Rio de Janeiro',
    },
    {
      cep: '98765-432',
      street: 'Rua das Flores',
      number: 456,
      district: 'Jardim',
      city: 'Rio de Janeiro',
    },
    {
      cep: '98765-432',
      street: 'Rua das Flores',
      number: 456,
      district: 'Jardim',
      city: 'Rio de Janeiro',
    },
    {
      cep: '98765-432',
      street: 'Rua das Flores',
      number: 456,
      district: 'Jardim',
      city: 'Rio de Janeiro',
    },
    {
      cep: '98765-432',
      street: 'Rua das Flores',
      number: 456,
      district: 'Jardim',
      city: 'Rio de Janeiro',
    },
    {
      cep: '98765-432',
      street: 'Rua das Flores',
      number: 456,
      district: 'Jardim',
      city: 'Rio de Janeiro',
    },
    {
      cep: '98765-432',
      street: 'Rua das Flores',
      number: 456,
      district: 'Jardim',
      city: 'Rio de Janeiro',
    },
    {
      cep: '98765-432',
      street: 'Rua das Flores',
      number: 456,
      district: 'Jardim',
      city: 'Rio de Janeiro',
    }
  ]

  const heightForm = document.getElementById('address-form')?.clientHeight
    || document.getElementById('address-form')?.offsetHeight

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
        maxHeight: `calc(100% - ${designTokens.spacing.large} - ${heightForm}px)`,
      }}>
        <AddressList addresses={adresses} />
      </div>
    </div>
  )
}
