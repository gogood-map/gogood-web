import { FormProfile } from "./components/FormProfile/FormProfile";
import { DetailsProfile } from "./components/DetailsProfile/SessionProfile";
export const Profile = () => {

  
  return (
    <main style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: '100%',
        width: '88%',
        alignItems: 'center'
    }}>

    <FormProfile/>

     <section style={{
        display: 'flex',
        flexDirection: 'column',

     }}>
     
     <DetailsProfile title="Histórico" type="history"/>
     <DetailsProfile title="Favoritos" type="favorites"/>
     
     </section>
     
    </main>
  );
};
