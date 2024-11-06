import axios from "axios"
import { useEffect, useState } from "react"


export type ImageProfileProps = {
  userImage?: Blob
}

export function ImageProfile(props: ImageProfileProps) {
  const { userImage } = props
  const [image, setImage] = useState<string | null>(null)

  useEffect(() => {
    if (!userImage) {
      axios.get('https://api.github.com/users/rafaelbogfreitas')
    }
  }, [])

  return (
    <section>

    </section>
  )
}
