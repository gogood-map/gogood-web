import { AddressCard, AddressCardProps } from './AddressCard'

export default {
  title: 'Components/AddressCard',
  component: AddressCard,
}

const address = {
  address: {
    street: '1234 Elm St',
    city: 'Springfield',
    state: 'IL',
    zipCode: '12345-678',
    number: '1234',
    district: 'Downtown',
    tag: 'home',
  },
  onClick: () => console.log('Address clicked'),
} as AddressCardProps

export const Default = () => <AddressCard {...address} />
