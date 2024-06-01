import { FormProfile } from './components/FormProfile/FormProfile'
import { designTokens } from 'design-tokens'
import { AddressSection } from './components/AddressSection/AdressSection'
import { AddressCard } from './components/AddressCard/AddressCard'
import { useState } from 'react'
import { AddressFormProps } from './components/AddressForm/AddressForm'
import { Address } from './components/AddressList/AddressList'

export const Profile = () => {
  const [showCard, setShowCard] = useState(false)
  const [updateForm, setUpdateForm] = useState(false)
  const [addressCard, setAddressCard] = useState<AddressFormProps | null>({
    street: 'Rua das Laranjeiras',
    number: '123',
    city: 'São Paulo',
    zipCode: '12345-678',
    district: 'Centro',
    tag: 'Casa',
  })

  const handleCardClickOut = () => {
    setShowCard(false)
  }

  const handleSelectAddress = (address: Address) => {
    setAddressCard({
      street: address.street,
      number: address.number,
      city: address.city,
      zipCode: address.zipCode,
      district: address.district,
      tag: address.tag,
    })
    setShowCard(true)
    setUpdateForm(true)
  }

  const handleAddAddress = () => {
    setAddressCard(null)
    setShowCard(true)
    setUpdateForm(false)
  }

  const adresses = [
    {
      zipCode: '12345-678',
      street: 'Rua das Laranjeiras',
      number: '123',
      district: 'Centro',
      city: 'São Paulo',
      tag: 'Casa',
    },
    {
      zipCode: '12345-678',
      street: 'Rua das macieiras',
      number: '123',
      district: 'Vila Maça',
      city: 'São Paulo',
      tag: 'Trabalho',
    },
    {
      zipCode: '12345-678',
      street: 'Rua das Limoeiras',
      number: '123',
      district: 'Jd Limão',
      city: 'São Paulo',
      tag: 'Outro',
    },
    {
      zipCode: '12345-678',
      street: 'Rua dos Cajuzeiros',
      number: '123',
      district: 'Vila Caju',
      city: 'São Paulo',
      tag: 'Outro',
    },
    {
      zipCode: '12345-678',
      street: 'Rua das Bananeiras',
      number: '123',
      district: 'Cohab Banana',
      city: 'São Paulo',
      tag: 'Faculdade',
    },
    {
      zipCode: '12345-678',
      street: 'Rua das Pitangueiras',
      number: '123',
      district: 'Vale Pitanga',
      city: 'São Paulo',
      tag: 'Faculdade',
    },
    {
      zipCode: '12345-678',
      street: 'Rua das Jabuticabeiras',
      number: '123',
      district: 'Jd Jabuticaba',
      city: 'São Paulo',
      tag: 'Parceiro(a)',
    },
    {
      zipCode: '12345-678',
      street: 'Rua das Aceroleiras',
      number: '123',
      district: 'Vila Acerola',
      city: 'São Paulo',
      tag: 'Parceiro(a)',
    },
    {
      zipCode: '12345-678',
      street: 'Rua das Goiabeiras',
      number: '123',
      district: 'Vila Goiaba',
      city: 'São Paulo',
      tag: 'Casa',
    },
    {
      zipCode: '12345-678',
      street: 'Rua das Mangueiras',
      number: '123',
      district: 'Vila Manga',
      city: 'São Paulo',
      tag: 'Trabalho',
    },
  ] as Address[]


  return (
    <>
      {showCard && <AddressCard updateForm={updateForm} address={{...addressCard}} onClickOut={handleCardClickOut} />}
      <main style={{
        display: 'flex',
        flexDirection: 'row',
        height: `calc(100vh - ${designTokens.spacing.large} * 2)`,
        width: `calc(100% - 60px - ${designTokens.spacing.large} * 2)`,
        padding: designTokens.spacing.large,
        marginLeft: '60px',
        gap: designTokens.spacing.large,
      }}>
        <section style={{
          width: '35%',
          height: '100%',
        }}>
          <FormProfile />
        </section>
        <section style={{
          width: '65%',
          height: '100%',
        }}>
          <AddressSection adresses={adresses} onSelect={handleSelectAddress} onAdd={handleAddAddress} />
        </section>
      </main>
    </>
  )
}
