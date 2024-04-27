import { designTokens } from "design-tokens";
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
            {history.map((historico, index)=>(
                <div key={index} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    borderBottom: `1px solid ${designTokens.color.border}`,
                    padding: 12
                }}>
                    <h2>{historico.dia}</h2>
                    <ul>
                        {historico.logradouros.map((logradouro, index) => (
                            <li key={index}>{logradouro}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </>
    )
}

const ListFavorites = () =>{
    return(
        <>
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

