import { designTokens } from 'design-tokens'
import { useContext } from 'react'
import { IoIosBicycle } from 'react-icons/io'
import { IoSearchSharp } from 'react-icons/io5'
import { MdDirectionsWalk, MdOutlineExpandLess, MdOutlineExpandMore } from 'react-icons/md'
import { RiCarLine } from 'react-icons/ri'
import { RouteSearchCardContext, RouteSearchCardContextProps } from '../RouteSearchCard/RouteSearchCard'

type RouteFormProps = {
    onClickExpand: () => void
}

export function RouteForm(props: RouteFormProps) {
    const { onClickExpand } = props
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
        backgroundColor: designTokens.color.gray,
        padding: `${designTokens.spacing.small} ${designTokens.spacing.medium}`,
        borderRadius: designTokens.borderRadius.smallMedium,
        cursor: 'pointer',
    } as React.CSSProperties

    const iconSize = '24px'

    return (
        <>
            <form style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: expandedCard ? '210px' : '24px',
                gap: designTokens.spacing.medium,
                padding: expandedCard
                    ? `${designTokens.spacing.mediumLarge} ${designTokens.spacing.medium}`
                    : `${designTokens.spacing.tiny} ${designTokens.spacing.medium}`,
                borderRadius: designTokens.borderRadius.medium,
                backgroundColor: designTokens.color.background,
                boxShadow: `0 4px 14px 0 ${designTokens.color.boxShadow}`,
                transition: 'height 0.3s ease',
            }}>
                <div style={{
                    width: '100%',
                    position: expandedCard ? 'absolute' : 'initial',
                    top: designTokens.spacing.tiny,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'start',
                    height: '100%',
                }}>
                    <span style={{
                        width: expandedCard ? '0' : '150px',
                        overflow: 'hidden',
                        transition: 'width 0.3s ease',
                        whiteSpace: 'nowrap',
                        fontSize: designTokens.font.size.medium,
                        fontWeight: designTokens.font.weight.bold,
                        color: designTokens.color.text,
                    }}>
                        Buscar rota
                    </span>
                    <span style={{
                        display: 'flex',
                        height: '24px',
                    }} onClick={onClickExpand}>
                        {expandedCard && <MdOutlineExpandLess size={iconSize} />}
                        {!expandedCard && <MdOutlineExpandMore size={iconSize} />}
                    </span>
                </div>
                <div style={{
                    display: expandedCard ? 'flex' : 'none',
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
                        <input style={inputStyle} type='text' id='origin' />
                        <input style={inputStyle} type='text' id='destination' />
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
                    <input style={radioInputStyle} type='radio' id='walk' name='locomotion' />
                    <input style={radioInputStyle} type='radio' id='bicycle' name='locomotion' />
                    <input style={radioInputStyle} type='radio' id='car' name='locomotion' />
                    <label style={routeLabelStyle} htmlFor='walk'><MdDirectionsWalk size={iconSize} /></label>
                    <label style={routeLabelStyle} htmlFor='bicycle'><IoIosBicycle size={iconSize} /></label>
                    <label style={routeLabelStyle} htmlFor='car'><RiCarLine size={iconSize} /></label>
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
            </form>
        </>
    )
}