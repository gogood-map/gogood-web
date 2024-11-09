import { useEffect, useState } from 'react'
import { createAvatar } from '@dicebear/core'
import { initials } from '@dicebear/collection'
import { useAuth } from '../../../../hooks/AuthProvider/AuthProvider'
import { getUserImage } from '../../../../utils/requests/user'
import { ChoseImageProfile } from './ChoseImageProfile'

export function ImageProfile() {
  const [image, setImage] = useState<string | null>(null)
  const { user } = useAuth()

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
          console.log('Imagem', response.data)
          if (response.data.size === 0) {
            createAvatarImage()
            return
          } else {
            setImage(URL.createObjectURL(response.data))
          }
        })
        .catch((error) => {
          console.log('Erro ao buscar imagem do usuário')
          console.log(error)
          createAvatarImage()
        })
    }
  }

  useEffect(() => {
    getUserImageProfile()
  }, [user])

  return (
    <section>
      <span style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
      }}>
        <img
          style={{
            width: 100,
            height: 100,
            borderRadius: 100,
            objectFit: 'cover',
          }}
          src={image || ''}
        />
        <ChoseImageProfile setImage={setImage} userId={user?.id} />
      </span>
    </section>
  )
}
