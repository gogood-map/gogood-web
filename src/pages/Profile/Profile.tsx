import { FormProfile } from './components/FormProfile/FormProfile'
import { designTokens } from 'design-tokens'
import { AddressSection } from './components/AddressSection/AdressSection'
import { AddressCard } from './components/AddressCard/AddressCard'
import { useEffect, useState } from 'react'
import { AddressFormProps } from './components/AddressForm/AddressForm'
import { Address } from './components/AddressList/AddressList'
import { useAuth } from '../../hooks/AuthProvider/AuthProvider'
import { getAddressByUser } from '../../utils/requests/address'
import { toast } from 'react-toastify'

export const Profile = () => {
  const [showCard, setShowCard] = useState(false)
  const [updateForm, setUpdateForm] = useState(false)
  const [addressCard, setAddressCard] = useState<AddressFormProps | null>(null)
  const [addresses, setAddresses] = useState<Address[]>([])
  const { user } = useAuth()

  const handleCardClickOut = () => {
    setShowCard(false)
  }

  const handleSelectAddress = (address: Address) => {
    setAddressCard({
      id: address.id,
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

  const updateUserAddresses = () => {
    if (!user) {
      toast.error('Faça login para atualizar os endereços')
      return
    }
    getAddressByUser(user.id)
      .then((response) => {
        setAddresses(response.data.map((data) => ({
          id: data.enderecos.id,
          city: data.enderecos.cidade,
          district: data.enderecos.bairro,
          number: data.enderecos.numero,
          street: data.enderecos.rua,
          zipCode: data.enderecos.cep,
          tag: data.tipoEndereco,
        })))
      }).catch((error) => {
        console.error(error)
        toast.error('Erro ao carregar endereços')
      }).finally(() => {
        setShowCard(false)
        setAddressCard(null)
        setUpdateForm(false)
      })
  }

  useEffect(() => {
    if (!user) {
      toast.info('Faça login para visualizar os endereços')
      return
    }
    getAddressByUser(user.id)
      .then((response) => {
        setAddresses(response.data.map((data) => ({
          id: data.enderecos.id,
          city: data.enderecos.cidade,
          district: data.enderecos.bairro,
          number: data.enderecos.numero,
          street: data.enderecos.rua,
          zipCode: data.enderecos.cep,
          tag: data.tipoEndereco,
        })))
      }).catch((error) => {
        console.error(error)
        toast.error('Erro ao carregar endereços')
      })
  }, [])

  return (
    <>
      {showCard && <AddressCard
        updateForm={updateForm}
        updateUserAddresses={updateUserAddresses}
        address={{ ...addressCard }}
        onClickOut={handleCardClickOut}
      />}
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
          <AddressSection adresses={addresses} updateUserAddresses={updateUserAddresses} onSelect={handleSelectAddress} onAdd={handleAddAddress} />
        </section>
      </main>
    </>
  )
}
