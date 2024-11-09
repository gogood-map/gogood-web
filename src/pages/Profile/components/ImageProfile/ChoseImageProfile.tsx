import React, { useState } from 'react'
import styles from './ChoseImageProfile.module.css'
import { updateUserImage } from '../../../../utils/requests/user'
import { LoaderIcon } from '../../../../components/LoaderIcon/LoaderIcon'
import { FaCamera } from 'react-icons/fa'

export type ChoseImageProfileProps = {
  setImage: React.Dispatch<React.SetStateAction<string | null>>
  userId?: number
}

export function ChoseImageProfile(props: ChoseImageProfileProps) {
  const { setImage, userId } = props
  const [updateStatus, setUpdateStatus] = useState(false)

  const updateImageProfile = (image: Blob) => {
    if (image && userId) {
      setUpdateStatus(true)
      updateUserImage(userId, image)
        .then(() => {
          setUpdateStatus(false)
        }).catch((error) => {
          console.error(error)
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

  return (
    <>
      <input
        id='profile-image'
        style={{ display: 'none' }}
        type='file'
        accept='image/*'
        onChange={handleImageChange} />
      <label className={styles['file-input-label']} htmlFor='profile-image'>
        <FaCamera size={32} />
      </label>
      {updateStatus &&
        <div className={styles['file-loader']} >
          <LoaderIcon />
        </div>
      }
    </>
  )
}
