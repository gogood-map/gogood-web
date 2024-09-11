import { FormProfile } from './components/FormProfile/FormProfile'
import { AddressSection } from './components/AddressSection/AdressSection'
import { AddressCard } from './components/AddressCard/AddressCard'
import { useEffect, useState } from 'react'
import { AddressFormProps } from './components/AddressForm/AddressForm'
import { Address } from './components/AddressList/AddressList'
import { useAuth } from '../../hooks/AuthProvider/AuthProvider'
import { getAddressByUser } from '../../utils/requests/address'
import { toast } from 'react-toastify'
import styles from './Profile.module.css'

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
      toast.error('Faça login para visualizar os endereços')
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
      <main className={styles['profile-page']}>
        <section className={styles['profile-section']}>
          <FormProfile />
        </section>
        <section className={styles['address-section']}>
          <AddressSection
            adresses={addresses}
            updateUserAddresses={updateUserAddresses}
            onSelect={handleSelectAddress}
            onAdd={handleAddAddress}
          />
        </section>
      </main>
    </>
  )
}
