import { designTokens } from 'design-tokens'
import styled from 'styled-components'
import { AddressItem } from '../AddressItem/AddressItem'
import { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa6'
import { stack } from '../../../../utils/data-structure/Stack/Stack'
import { deleteAddress } from '../../../../utils/requests/address'
import { toast } from 'react-toastify'
import { useAuth } from '../../../../hooks/AuthProvider/AuthProvider'

export type Address = {
  id: number
  zipCode: string
  street: string
  number: string
  district: string
  city: string
  tag?: string
}

export type AddressListProps = {
  addresses: Address[]
  onSelect: (address: Address) => void
  onAdd: () => void
  updateUserAddresses: () => void
}

export function AddressList(props: AddressListProps) {
  const { addresses, onSelect, onAdd, updateUserAddresses } = props
  const { user } = useAuth()
  const addressStack = stack<Address>()
  const [renderAddresses, setRenderAddresses] = useState<Address[]>([])
  const [addAddressHover, setAddAddressHover] = useState(false)

  useEffect(() => {
    addresses.forEach(address => addressStack.push(address))
    setRenderAddresses(addressStack.getStack())
  }, [])

  useEffect(() => {
    addresses.forEach(address => addressStack.push(address))
    setRenderAddresses(addressStack.getStack())
  }, [addresses])

  const handleExclude = (addressId: number) => {
    if (!user) {
      toast.error('Faça login para excluir endereços')
      return
    }
    const notification = toast.loading('Excluindo endereço...', { autoClose: false })

    deleteAddress(user.id, addressId).then(() => {
      toast.update(notification, {
        render: 'Endereço excluído com sucesso!',
        type: 'success',
        isLoading: false,
        autoClose: 2000
      })
      updateUserAddresses()
    }).catch(() => {
      toast.update(notification, {
        render: 'Erro ao excluir endereço',
        type: 'error',
        isLoading: false,
        autoClose: 2000
      })
    }).finally(() => {
      setTimeout(() => {
        toast.dismiss(notification)
      }, 2000)
    })
  }

  const List = styled.ul`
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    padding-left: 0;
    margin: 0;
    gap: ${designTokens.spacing.tiny};
    height: 100%;

    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-track {
      background: ${designTokens.color.ligthGray};
      border-radius: ${designTokens.borderRadius.medium};
    }

    &::-webkit-scrollbar-thumb {
      background: ${designTokens.color.selected};
      border-radius: ${designTokens.borderRadius.medium};
    }

    &::-webkit-scrollbar-thumb:hover {
      background: ${designTokens.color.selectedHover};
    }
  `

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      width: `calc(100% - ${designTokens.spacing.mediumLarge} * 2)`,
      height: `calc(100% - ${designTokens.spacing.medium} * 2)`,
      borderRadius: designTokens.borderRadius.large,
      backgroundColor: designTokens.color.white,
      padding: `${designTokens.spacing.medium} ${designTokens.spacing.mediumLarge}`,
      boxShadow: `0px 4px 14px 0px ${designTokens.color.boxShadow}`,
      gap: designTokens.spacing.medium,
    }}>
      <span style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <h1 style={{
          margin: 0,
          fontSize: designTokens.font.size.extraLarge,
          fontWeight: designTokens.font.weight.semiBold,
        }}>Lista de endereços</h1>

        <button onClick={onAdd}
          onMouseEnter={() => setAddAddressHover(true)}
          onMouseLeave={() => setAddAddressHover(false)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: designTokens.spacing.small,
            padding: `${designTokens.spacing.small} ${designTokens.spacing.small}`,
            borderRadius: designTokens.borderRadius.medium,
            backgroundColor: addAddressHover ? designTokens.color.selected : designTokens.color.selectedLight,
            color: designTokens.color.white,
            border: 'none',
            cursor: 'pointer',
            fontSize: designTokens.font.size.mediumLarge,
            fontWeight: designTokens.font.weight.medium,
          }}> <FaPlus /> Adicionar endereço </button>
      </span>

      <List>
        {renderAddresses.length > 0 ? renderAddresses.map((address, index) => (
          <AddressItem key={index} address={address} onSelect={onSelect} onExclude={() => handleExclude(address.id)} />
        )) : (
          <p style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: designTokens.font.size.medium,
            fontWeight: designTokens.font.weight.medium,
          }}>Nenhum endereço cadastrado</p>

        )}
      </List>
    </div >
  )
}
