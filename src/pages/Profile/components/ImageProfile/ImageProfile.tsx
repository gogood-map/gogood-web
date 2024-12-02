import React, { useEffect, useRef, useState } from 'react'
import styles from './ImageProfile.module.css'
import { createAvatar } from '@dicebear/core'
import { initials } from '@dicebear/collection'
import { useAuth } from '../../../../hooks/AuthProvider/AuthProvider'
import { getUserImage, updateUserImage, deleteUserImage } from '../../../../utils/requests/user'
import { LoaderIcon } from '../../../../components/LoaderIcon/LoaderIcon'
import { PiCamera, PiTrash } from 'react-icons/pi'

export function ImageProfile() {
  const [image, setImage] = useState<string | null>(null)
  const [tooltipVisible, setTooltipVisible] = useState(false)
  const [updateStatus, setUpdateStatus] = useState(false)
  const { user } = useAuth()
  const tooltipRef = useRef<HTMLDivElement | null>(null)

  const createAvatarImage = () => {
    if (user) {
      const svg = createAvatar(initials, {
        seed: user.name,
        scale: 75,
      })
      setImage(svg.toDataUri())
    }
  }

  const getUserImageProfile = () => {
    if (user) {
      getUserImage(user.id)
        .then((response) => {
          if (response.data.size === 0) {
            createAvatarImage()
            return
          } else {
            setImage(URL.createObjectURL(response.data))
          }
        })
        .catch((error) => {
          console.error('Erro ao buscar imagem do usuário', error)
          createAvatarImage()
        })
    }
  }

  const updateImageProfile = (file: Blob) => {
    if (file && user) {
      setUpdateStatus(true)
      updateUserImage(user.id, file)
        .then(() => {
          setUpdateStatus(false)
        })
        .catch((error) => {
          console.error('Erro ao atualizar imagem do usuário', error)
          setUpdateStatus(false)
        })
    }
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setImage(URL.createObjectURL(file))
      updateImageProfile(file)
    }
  }

  const handleDeleteImage = () => {
    if (user) {
      deleteUserImage(user.id)
        .then(() => {
          createAvatarImage()
        })
        .catch((error) => {
          console.error('Erro ao deletar imagem do usuário', error)
        })
    }
  }

  const handleToggleTooltip = () => setTooltipVisible((prev) => !prev)

  const handleClickOutside = (event: MouseEvent) => {
    if (
      tooltipRef.current &&
      !tooltipRef.current.contains(event.target as Node)
    ) {
      setTooltipVisible(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    getUserImageProfile()
  }, [user])

  return (
    <section>
      <span className={styles['div-main']}>
        <img
          className={styles['image-profile']}
          src={image || ''}
          onClick={handleToggleTooltip}
          alt="Imagem do Perfil"
        />

        {tooltipVisible && (
          <div
            ref={tooltipRef}
            className={styles['tooltip']}
          >
            <label
             className={styles['label-tooltip']}
            >
              <PiCamera size={20} />
              Carregar foto
              <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleImageChange}
              />
            </label>
            <button
              className={styles['label-tooltip']}
              onClick={(event) => {
                event.preventDefault()
                handleDeleteImage()
              }}
            >
              <PiTrash size={20} />
              Apagar foto
            </button>
          </div>
        )}

        {updateStatus && (
          <div
            style={{
              position: 'absolute',
              fontSize: '32px',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: 'transparent',
              color: '#12FFBB',
              borderRadius: '50%',
            }}
          >
            <LoaderIcon />
          </div>
        )}
      </span>
    </section>
  )
}
