import { designTokens } from 'design-tokens'
import { useContext, useState } from 'react'
import { IoIosBicycle } from 'react-icons/io'
import { IoBusOutline, IoSearchSharp } from 'react-icons/io5'
import { MdDirectionsWalk, MdOutlineExpandLess, MdOutlineExpandMore, MdOutlineMap, MdOutlinePlace, MdOutlineRoute, MdOutlineSearch } from 'react-icons/md'
import { RiCarLine } from 'react-icons/ri'
import { RouteSearchCardContext, RouteSearchCardContextProps } from '../RouteSearchCard/RouteSearchCard'
import { useForm } from 'react-hook-form'
import { PiPathBold } from 'react-icons/pi'

type RouteFormProps = {
    onClickExpand: () => void
    onSubmitSearchRoute: (origin: string, destination: string, travelMode: string) => void
    onSearchLocal: (query: string)=>void
}

export function RouteForm(props: RouteFormProps) {
    const { register, watch, handleSubmit } = useForm({ mode: 'all' })
    const [localSearch, setLocalSearch] = useState("")
    const { onClickExpand, onSubmitSearchRoute, onSearchLocal } = props
    const { expandedCard } = useContext(RouteSearchCardContext) as RouteSearchCardContextProps

    const inputStyle = {
        borderRadius: designTokens.borderRadius.medium,
        border: `0.25px solid ${designTokens.color.border}`,
        width: `calc(100% - ${designTokens.spacing.medium})`,
        padding: designTokens.spacing.small,
        fontSize: designTokens.font.size.medium,
        boxShadow: `0 1px 4px 0 ${designTokens.color.boxShadow}`,
        margin: 0,
    } as React.CSSProperties

    const radioInputStyle = { display: 'none' } as React.CSSProperties

    const routeLabelStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: designTokens.color.ligthGray,
        padding: `${designTokens.spacing.small} ${designTokens.spacing.medium}`,
        borderRadius: designTokens.borderRadius.smallMedium,
        cursor: 'pointer',
    } as React.CSSProperties

    const selectedRouteLabelStyle = {
        backgroundColor: designTokens.color.secondary,
        color: designTokens.color.ligthGray,
    } as React.CSSProperties

    const iconSize = '24px'

    const handleFormSubmit = (data: any) => {
       
        
        if(data.origin && data.destination && data.travelMode){
            console.log(data.origin);
            onSubmitSearchRoute(data.origin, data.destination, data.travelMode)
        }
        
    }



    return (
        <>
            <form onSubmit={handleSubmit(handleFormSubmit)} style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'start',
                width: '100%',
                height: expandedCard ? '210px' : '80px',
                gap: designTokens.spacing.medium,
                padding: `${designTokens.spacing.mediumLarge} ${designTokens.spacing.medium}`,
                borderRadius: designTokens.borderRadius.medium,
                backgroundColor: designTokens.color.background,
                boxShadow: `0 4px 14px 0 ${designTokens.color.boxShadow}`,
                transition: 'height 0.3s ease',
                position: 'relative',
            }}>
                <div style={{
                    position: 'absolute',
                    top: designTokens.spacing.tiny,
                    right: designTokens.spacing.tiny,
                    display: 'flex',
                    justifyContent: 'end',
                    alignItems: 'start',
                }}>
                    <span style={{
                        display: 'flex',
                        cursor: 'pointer',
                    }} onClick={onClickExpand}>
                        {expandedCard && <MdOutlinePlace size={iconSize} />}
                        {!expandedCard && <PiPathBold size={iconSize} />}
                    </span>
                </div>

                
                {
                    !expandedCard ?
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row',
                        gap: designTokens.spacing.small,
                        width: `calc(100% - ${designTokens.spacing.medium})`,
                    }}>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: designTokens.spacing.small,
                            width: '100%',
                        }}>
                            <input onChange={(e)=>{
                                setLocalSearch(e.target.value)
                            }} style={inputStyle} type='text' id='localQuery' value={localSearch} />
                            <button style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%',
                            gap: designTokens.spacing.small,
                            backgroundColor: designTokens.color.selectedLight,
                            color: designTokens.color.white,
                            padding: designTokens.spacing.small,
                            borderRadius: designTokens.borderRadius.medium,
                            cursor: 'pointer',
                            border: 'none',
                            fontSize: designTokens.font.size.medium,
                        }} onClick={()=>{   
                            onSearchLocal(localSearch)
                            setLocalSearch("")
                        }}><IoSearchSharp size={'20px'} />Buscar Endereço</button>
                        </div>

                    
                    </div>

                    :

                    <>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row',
                        gap: designTokens.spacing.small,
                        width: `calc(100% - ${designTokens.spacing.medium})`,
                    }}>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '9px',
                        }}>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                height: '9px',
                                width: '9px',
                                borderRadius: '50%',
                                backgroundColor: designTokens.color.secondary,
                            }} />
                            <div style={{
                                display: 'flex',
                                position: 'relative',
                                flexDirection: 'column',
                                height: '35px',
                                width: '1px',
                                backgroundColor: designTokens.color.secondary,
                            }} />
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                height: '7px',
                                width: '7px',
                                borderRadius: '50%',
                                backgroundColor: designTokens.color.background,
                                outline: `1px solid ${designTokens.color.secondary}`,
                            }} />
                        </div>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: designTokens.spacing.small,
                            width: '100%',
                        }}>
                            <input {...register('origin')} style={inputStyle} type='text' id='origin' />
                            <input {...register('destination')} style={inputStyle} type='text' id='destination' />
                        </div>
                    </div>
                    <div style={{
                        display: expandedCard ? 'flex' : 'none',
                        width: '100%',
                        height: '1px',
                        backgroundColor: designTokens.color.border,
                    }} />
                    <div style={{
                        display: expandedCard ? 'flex' : 'none',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: designTokens.spacing.tiny,
                    }}>
                        <input
                            {...register('travelMode', { required: true })}
                            style={radioInputStyle}
                            type='radio'
                            id='walk'
                            name='travelMode'
                            value='a-pe'
                        />
                        <input
                            {...register('travelMode', { required: true })}
                            style={radioInputStyle}
                            type='radio'
                            id='bicycle'
                            name='travelMode'
                            value='bike'
                        />
                        <input
                            {...register('travelMode', { required: true })}
                            style={radioInputStyle}
                            type='radio'
                            id='car'
                            name='travelMode'
                            value='veiculo'
                        />
                        <input
                            {...register('travelMode', { required: true })}
                            style={radioInputStyle}
                            type='radio'
                            id='bus'
                            name='travelMode'
                            value='transporte-publico'
                        />
    
                        <label
                            style={watch('travelMode') === 'a-pe'
                                ? { ...routeLabelStyle, ...selectedRouteLabelStyle }
                                : routeLabelStyle}
                            htmlFor='walk'
                        >
                            <MdDirectionsWalk size={iconSize} />
                        </label>
                        <label
                            style={watch('travelMode') === 'bike'
                                ? { ...routeLabelStyle, ...selectedRouteLabelStyle }
                                : routeLabelStyle}
                            htmlFor='bicycle'
                        >
                            <IoIosBicycle size={iconSize} />
                        </label>
                        <label
                            style={watch('travelMode') === 'veiculo'
                                ? { ...routeLabelStyle, ...selectedRouteLabelStyle }
                                : routeLabelStyle}
                            htmlFor='car'
                        >
                            <RiCarLine size={iconSize} />
                        </label>
                        <label
                            style={watch('travelMode') === 'transporte-publico'
                                ? { ...routeLabelStyle, ...selectedRouteLabelStyle }
                                : routeLabelStyle}
                            htmlFor='bus'
                        >
                            <IoBusOutline size={iconSize} />
                        </label>
                    </div>
                    <button style={{
                        display: expandedCard ? 'flex' : 'none',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        gap: designTokens.spacing.small,
                        backgroundColor: designTokens.color.selectedLight,
                        color: designTokens.color.white,
                        padding: designTokens.spacing.small,
                        borderRadius: designTokens.borderRadius.medium,
                        cursor: 'pointer',
                        border: 'none',
                        fontSize: designTokens.font.size.medium,
                    }} type='submit'><IoSearchSharp size={'20px'} />Buscar Rota</button>
                    </>
                }
              
                
            </form>
        </>
    )
}
