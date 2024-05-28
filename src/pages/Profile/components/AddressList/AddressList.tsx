import { designTokens } from 'design-tokens'
import styled from 'styled-components'
import { AddressItem } from '../AddressItem/AddressItem'
import { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa6'
import { Stack } from '../../../../utils/Stack/Stack'

export type Address = {
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
}

export function AddressList(props: AddressListProps) {
  const { addresses, onSelect, onAdd } = props
  const addressStack = Stack<Address>()
  const [renderAddresses, setRenderAddresses] = useState<Address[]>([])
  const [addAddressHover, setAddAddressHover] = useState(false)

  useEffect(() => {
    addresses.forEach(address => addressStack.push(address))
    setRenderAddresses(addressStack.getStack())
  }, [addresses])

  const List = styled.ul`
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    padding-left: 0;
    margin: 0;
    gap: ${designTokens.spacing.small};
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
        {renderAddresses.map((address, index) => (
          <AddressItem key={index} address={address} onSelect={onSelect} />
        ))}
      </List>
    </div >
  )
}
