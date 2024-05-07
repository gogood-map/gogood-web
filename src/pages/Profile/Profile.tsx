import { FormProfile } from './components/FormProfile/FormProfile'
import { designTokens } from 'design-tokens'
import { AddressSection } from './components/AddressSection/AdressSection'
export const Profile = () => {


  return (
    <main style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      height: `calc(100vh - ${designTokens.spacing.large} * 2)`,
      width: `calc(100% - 60px - ${designTokens.spacing.large} * 2)`,
      padding: designTokens.spacing.large,
      marginLeft: '60px',
    }}>
      <section style={{
        width: '35%',
        height: '100%',
      }}>
        <FormProfile />
      </section>

      <section style={{
        width: '65%',
        height: '100%',
      }}>
        <AddressSection />
      </section>

    </main>
  )
}
