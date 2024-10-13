import { RouteForm } from './RouteForm'

export default {
  title: 'Components/RouteForm',
  component: RouteForm,
}

const onSubmit = (origin: string, destination: string, travelMode: string) => {
  console.log(origin, destination, travelMode)
}

export const Default = () => {
  return <RouteForm onClickExpand={() => {
    console.log('clicked')
  }} onSubmitSearchRoute={onSubmit} />
}