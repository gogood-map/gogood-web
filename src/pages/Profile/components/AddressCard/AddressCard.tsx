import { designTokens } from 'design-tokens'
import { AddressForm, AddressFormProps } from '../AddressForm/AddressForm'
import { IoClose } from 'react-icons/io5'

export type AddressCardProps = {
  address: AddressFormProps
  updateForm?: boolean
  updateUserAddresses?: () => void
  onClickOut?: () => void
}

export function AddressCard(props: AddressCardProps) {
  const { address, updateForm, updateUserAddresses, onClickOut } = props

  const handleChildClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }
  return (
    <div onClick={onClickOut} style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      position: 'absolute',
      minWidth: '100vw',
      minHeight: '100vh',
      gap: designTokens.spacing.small,
      zIndex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    }}>
      <div onClick={handleChildClick} style={{
        display: 'flex',
        flexDirection: 'column',
        height: 'fit-content',
        width: '50%',
        maxWidth: '876px',
        position: 'relative',
      }}>
        <div onClick={onClickOut} style={{
          display: 'flex',
          position: 'absolute',
          top: designTokens.spacing.medium,
          right: designTokens.spacing.medium,
          cursor: 'pointer',
        }}>
          <IoClose size={30} color={designTokens.color.text} />
        </div>
        <AddressForm updateUserAddresses={updateUserAddresses} update={updateForm} {...address} />
      </div>
    </div>
  )
}
