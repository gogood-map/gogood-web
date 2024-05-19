import { designTokens } from 'design-tokens'
import { Address } from '../AddressList/AddressList'
import { CSSProperties, useState } from 'react'
import { BiHomeAlt2, BiHomeHeart, BiSolidEditAlt } from 'react-icons/bi'
import { PiSuitcaseSimple } from 'react-icons/pi'
import { IoSchoolOutline } from 'react-icons/io5'
import Icon from '../../../../../public/icon.svg'

export type AddressItemProps = {
  address: Address
  onSelect: (address: Address) => void
}

export function AddressItem(props: AddressItemProps) {
  const { address: { zipCode, city, district, number, street, tag }, onSelect } = props
  const [hover, setHover] = useState(false)
  const [editHover, setEditHover] = useState(false)

  const addressDefaultStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: designTokens.spacing.small,
    cursor: 'pointer',
    padding: `${designTokens.spacing.small} ${designTokens.spacing.medium}`,
    marginRight: designTokens.spacing.medium,
    width: '100%',
    borderRadius: designTokens.borderRadius.medium,
  } as CSSProperties

  const editButtonDefaultStyle = {
    display: hover ? 'flex' : 'none',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    borderRadius: designTokens.borderRadius.medium,
    backgroundColor: designTokens.color.grayScale[300],
  } as CSSProperties

  return (
    <li style={{
      display: 'flex',
      flexDirection: 'row',
    }}>
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={hover ? { ...addressDefaultStyle, backgroundColor: designTokens.color.ligthGray } : addressDefaultStyle}
        onClick={
          () => onSelect(props.address)
        }>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: designTokens.spacing.small,
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '40px',
            height: '40px',
            borderRadius: designTokens.borderRadius.medium,
            backgroundColor: designTokens.color.grayScale[hover ? 300 : 200],
          }}>
            {tag === 'Casa' && <BiHomeAlt2 size={24} />}
            {tag === 'Parceiro(a)' && <BiHomeHeart size={24} />}
            {tag === 'Trabalho' && <PiSuitcaseSimple size={24} />}
            {tag === 'Faculdade' && <IoSchoolOutline size={24} />}
            {tag === 'Outro' && <img src={Icon} alt="Outro" style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
            }} />}
            {!tag && <img src={Icon} alt="Outro" style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
            }} />}
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: designTokens.spacing.tiny,
          }}>
            <span>{street}, {number} - {district} - {city} - {zipCode}</span>
            <span>{tag}</span>
          </div>
        </div>
        <div
          onMouseEnter={() => setEditHover(true)}
          onMouseLeave={() => setEditHover(false)}
          style={editHover
            ? { ...editButtonDefaultStyle, backgroundColor: designTokens.color.grayScale[400] }
            : editButtonDefaultStyle
          }>
            <BiSolidEditAlt size={24} />
        </div>
      </div>
    </li>
  )
}
