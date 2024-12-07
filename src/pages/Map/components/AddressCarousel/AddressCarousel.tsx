import 'react-multi-carousel/lib/styles.css'
import style from './AddressCarousel.module.css'
import React, { useEffect, useState } from 'react'
import Carousel from 'react-multi-carousel'
import { useAuth } from '../../../../hooks/AuthProvider/AuthProvider'
import { getAddressByUser } from '../../../../utils/requests/address'
import { Address } from '../../../Profile/components/AddressList/AddressList'
import { CarouselItem } from './CarouselItem'
import { BiHomeAlt2, BiHomeHeart } from 'react-icons/bi'
import { PiSuitcaseSimple } from 'react-icons/pi'
import { IoSchoolOutline } from 'react-icons/io5'
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight, MdOutlinePlace } from 'react-icons/md'
import { designTokens } from 'design-tokens'

export type AddressCarouselProps = {
  onClick: (address: Address) => void
}

export function AddressCarousel(props: AddressCarouselProps) {
  const { onClick } = props
  const { user } = useAuth()
  const [addresses, setAddresses] = useState<Address[]>([])
  const iconSize = 24

  const buttonStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    borderRadius: '50%',
    top: '50%',
    width: '24px',
    height: '24px',
    transform: `translateY(calc(-50% - ${designTokens.spacing.tiny} / 2))`,
    backgroundColor: designTokens.color.secondary,
  } as React.CSSProperties

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1920 },
      items: 2
    },
    desktop: {
      breakpoint: { max: 1920, min: 1024 },
      items: 2
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  }

  const handleIcon = (tag: string): React.ReactNode => {
    switch (tag) {
      case 'Casa': return <BiHomeAlt2 size={iconSize} />
      case 'Parceiro(a)': return <BiHomeHeart size={iconSize} />
      case 'Trabalho': return <PiSuitcaseSimple size={iconSize} />
      case 'Faculdade': return <IoSchoolOutline size={iconSize} />
      default: return <MdOutlinePlace size={iconSize} />
    }
  }

  useEffect(() => {
    if (user) {
      getAddressByUser(user?.id).then((response) => {
        const formatedAddresses = response.data.map((address) => ({
          id: address.enderecos.id,
          zipCode: address.enderecos.cep,
          street: address.enderecos.rua,
          number: address.enderecos.numero,
          city: address.enderecos.cidade,
          district: address.enderecos.bairro,
          tag: address.tipoEndereco,
        }))

        setAddresses(formatedAddresses)

      }).catch((error) => {
        console.error(error)
      })
    }
  }, [])

  return (
    <>
      {addresses.length > 0 && (
        <Carousel
          responsive={responsive}
          partialVisible={true}
          // sliderClass={style['carousel-slider']}
          // itemClass={style['carousel-item']}
          // containerClass={style['carousel-container']}
          customRightArrow={<div style={{
            right: 0,
            ...buttonStyle
          }}>
            <MdOutlineKeyboardArrowRight size={24} color={designTokens.color.background} />
          </div>}
          customLeftArrow={<div style={{
            left: 0,
            ...buttonStyle
          }}>
            <MdOutlineKeyboardArrowLeft size={24} color={designTokens.color.background} />
          </div>}
        >
          {addresses.map((address, index) => (
            <div key={index} className={style['carousel-item']}>
              <CarouselItem
                key={index}
                address={address}
                icon={handleIcon(address.tag || 'Outro')}
                onClick={onClick}
              />
            </div>
          ))}
        </Carousel>
      )}
    </>
  )
}
