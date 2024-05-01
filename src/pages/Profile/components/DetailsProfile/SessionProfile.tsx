import { designTokens } from "design-tokens";
import { FaRoad } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
import { FaHouseChimney } from "react-icons/fa6";
const favorites =
[
    "Rua Reinado do Cavalo Marinho, 10",
    "Rua Haddock Lobo, 595",
    "Rua Mikey, 10"
]

const history = [
    {
        dia: "Quinta-feira, 25 Jan, 2024",
        logradouros: favorites
    }
]
const ListHistory = () =>{
    return(
        <>
            {history.map((historico)=>(
                <div  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    borderBottom: `1px solid ${designTokens.color.border}`,
                    padding: 12
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8
                    }}>
                        <FaHistory /> <span style={{
                            fontSize: designTokens.font.size.large,
                            fontWeight: designTokens.font.weight.semiBold
                        }}>{historico.dia}</span>
                    </div>


                        {historico.logradouros.map((logradouro, index) => (
                            <span style={{
                                marginLeft: '24px',
                                display:'flex',
                                alignItems: 'center',
                                gap: 8
                            }}>
                             <FaRoad /><p key={index}>{logradouro}</p>
                            </span>

                        ))}
                </div>
            ))}
        </>
    )
}

const ListFavorites = () =>{
    return(
        <>

        {favorites.map((favorito)=>{
        return(
            <div style={{
                display:'flex',
                alignItems: 'center',
                gap: 8
            }}>
           <FaHouseChimney /> <span>{favorito}</span>
            </div>
        )

        })}
        </>
    )
}

export type DetailsProfile = {
    title:string, type: string
}

export const DetailsProfile = (props:DetailsProfile) =>{
    return(
        <article style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <h1 style={{fontSize: designTokens.font.size.extraLarge}}>{props.title}</h1>
            <div style={{
                backgroundColor: 'white',
                width: 730,
                padding: 24,
                borderRadius: designTokens.borderRadius.large,
                boxShadow: `0px 4px 13.9px 0px ${designTokens.color.boxShadow}`,
            }}>
                    {props.type=="history"
                    ?
                    <ListHistory />
                    :
                    <ListFavorites/>
                    }
            </div>
        </article>
    )
}

