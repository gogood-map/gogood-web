import { designTokens } from 'design-tokens'
import { PiMapPin } from 'react-icons/pi'
import styled from 'styled-components'

export type Address = {
  cep: string
  street: string
  number: number
  district: string
  city: string
}

export type AddressListProps = {
  addresses: Address[]
}

export function AddressList(props: AddressListProps) {
  const { addresses } = props

  const List = styled.ul`
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    padding: 0;
    margin: 0;
    padding-left: ${designTokens.spacing.medium};
    gap: ${designTokens.spacing.small};
    height: 100%;

    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-track {
      background: ${designTokens.color.gray};
      border-radius: ${designTokens.borderRadius.medium};  // Adicione o border-radius aqui
    }

    &::-webkit-scrollbar-thumb {
      background: ${designTokens.color.selected};
      border-radius: ${designTokens.borderRadius.medium};  // Adicione o border-radius aqui
    }

    &::-webkit-scrollbar-thumb:hover {
      background: ${designTokens.color.text};
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
      <h1 style={{
        margin: 0,
        fontSize: designTokens.font.size.large,
        fontWeight: designTokens.font.weight.bold,
      }}>Lista de endereços</h1>
      <List>
        {addresses.map((address, index) => (
          <li key={index} style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: designTokens.spacing.tiny,
            listStyle: 'none',
            fontSize: designTokens.font.size.medium,
          }}>
            <PiMapPin size={designTokens.font.size.large}/>  {address.street}, {address.number} - {address.district} - {address.city} - {address.cep}
          </li>
        ))}
      </List>
    </div>
  )
}
