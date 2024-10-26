import { designTokens } from 'design-tokens'
import { useContext, useEffect, useState } from 'react'
import { IoIosBicycle } from 'react-icons/io'
import { IoBusOutline, IoSearchSharp } from 'react-icons/io5'
import { MdDirectionsWalk, MdOutlineExpandLess, MdOutlineExpandMore } from 'react-icons/md'
import { RiCarLine } from 'react-icons/ri'
import { RouteSearchCardContext, RouteSearchCardContextProps } from '../RouteSearchCard/RouteSearchCard'
import { useForm } from 'react-hook-form'
import { RouteRequest } from '../../../../utils/types/route'
import { ListAutoComplete } from '../ListAutoComplete/ListAutoComplete'
import { Address } from '../../../Profile/components/AddressList/AddressList'
import { AddressCarousel } from '../AddressCarousel/AddressCarousel'
import { AddressResponse } from '../../../../utils/types/address'
import { useAuth } from '../../../../hooks/AuthProvider/AuthProvider'
import { getAddressByUser } from '../../../../utils/requests/address'

type RouteFormProps = {
    onClickExpand: () => void
    onSubmitSearchRoute: (origem: string, destino: string, tipoTransporte: string) => void
    onSearchLocal: (query: string) => void
}

export function RouteForm(props: RouteFormProps) {
    const { onClickExpand, onSubmitSearchRoute, onSearchLocal } = props
    const { user } = useAuth()
    const { register, watch, handleSubmit, setValue } = useForm<RouteRequest>({ mode: 'all' })
    const { expandedCard } = useContext(RouteSearchCardContext) as RouteSearchCardContextProps
    const [listLocalSearch, setListLocalSearch] = useState<string[]>([])
    const [listOrigin, setListOrigin] = useState<string[]>([])
    const [listDestination, setListDestination] = useState<string[]>([])
    const [address, setAddress] = useState<AddressResponse[]>([])
    const [localSearch, setLocalSearch] = useState('')
    const [isFocusedSearch, setIsFocusedSearch] = useState(false)
    const [isFocusedOrigin, setIsFocusedOrigin] = useState(false)
    const [isFocusedDestination, setIsFocusedDestination] = useState(false)
    const iconSize = '22px'

    const inputStyle = {
        borderRadius: designTokens.borderRadius.medium,
        border: `0.25px solid ${designTokens.color.border}`,
        width: `calc(100% - ${designTokens.spacing.medium} - 2px)`,
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

    const handleFormSubmit = (data: RouteRequest) => {
        if (data.origem && data.destino && data.tipoTransporte) {
            handleLocalStorage(data.origem, 'listOrigin')
            handleLocalStorage(data.destino, 'listDestination')

            onSubmitSearchRoute(data.origem, data.destino, data.tipoTransporte)
        }
    }

    const handleLocalStorage = (query: string, key: string) => {
        const list = localStorage.getItem(key)
        if (list && query !== '') {
            const listParsed = JSON.parse(list)
            if (!listParsed.includes(query)) {
                listParsed.splice(0, 0, query)

                if (listParsed.length > 3) {
                    listParsed.pop()
                }

                localStorage.setItem(key, JSON.stringify(listParsed))

                if (key === 'listLocalSearch') setListLocalSearch(listParsed)
                if (key === 'listOrigin') setListOrigin(listParsed)
                if (key === 'listDestination') setListDestination(listParsed)
            } else {

                listParsed.splice(listParsed.indexOf(query), 1)
                listParsed.splice(0, 0, query)
                localStorage.setItem(key, JSON.stringify(listParsed))

                if (key === 'listLocalSearch') setListLocalSearch(listParsed)
                if (key === 'listOrigin') setListOrigin(listParsed)
                if (key === 'listDestination') setListDestination(listParsed)
            }
        } else {
            localStorage.setItem(key, JSON.stringify([query]))
            if (key === 'listLocalSearch') setListLocalSearch([query])
            if (key === 'listOrigin') setListOrigin([query])
            if (key === 'listDestination') setListDestination([query])
        }
    }

    useEffect(() => {
        const listLocalSearch = localStorage.getItem('listLocalSearch')
        const listOrigin = localStorage.getItem('listOrigin')
        const listDestination = localStorage.getItem('listDestination')

        listLocalSearch
            ? setListLocalSearch(JSON.parse(listLocalSearch))
            : localStorage.setItem('listLocalSearch', JSON.stringify([]))

        listOrigin
            ? setListOrigin(JSON.parse(listOrigin))
            : localStorage.setItem('listOrigin', JSON.stringify([]))

        listDestination
            ? setListDestination(JSON.parse(listDestination))
            : localStorage.setItem('listDestination', JSON.stringify([]))

        if (user) {
            getAddressByUser(user?.id).then((response) => {
                setAddress(response.data)

            }).catch((error) => {
                console.error(error)
            })
        }
    }, [])

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: `calc(100% - 2 * ${designTokens.spacing.medium})`,
            minHeight: expandedCard
                ? address.length > 0
                    ? '225px' : '180px'
                : address.length > 0
                    ? '116px' : '80px',
            gap: designTokens.spacing.medium,
            padding: `${designTokens.spacing.mediumLarge} ${designTokens.spacing.medium}`,
            paddingBottom: expandedCard ? designTokens.spacing.medium : designTokens.spacing.mediumLarge,
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
                    {expandedCard && <MdOutlineExpandLess size={iconSize} />}
                    {!expandedCard && <MdOutlineExpandMore size={iconSize} />}
                </span>
            </div>

            {!expandedCard ? (
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
                        <div style={{
                            position: 'relative',
                        }}>
                            <input style={inputStyle}
                                type='text'
                                id='localQuery'
                                value={localSearch}
                                onChange={(e) => setLocalSearch(e.target.value)}
                                autoComplete='off'
                                onFocus={() => setIsFocusedSearch(true)}
                                onBlur={() => { setTimeout(() => setIsFocusedSearch(false), 100) }}
                            />
                            <ListAutoComplete
                                items={listLocalSearch}
                                show={isFocusedSearch}
                                onSelect={(item) => { setLocalSearch(item) }}
                            />
                        </div>
                        <AddressCarousel onClick={(address: Address) => {
                            setLocalSearch(`${address.street}, ${address.number} - ${address.city}`)
                        }} />
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
                        }} onClick={() => {
                            handleLocalStorage(localSearch, 'listLocalSearch')
                            onSearchLocal(localSearch)
                        }}><IoSearchSharp size={'20px'} />Buscar Endereço</button>
                    </div>
                </div>
            ) : (
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: designTokens.spacing.small,
                    width: '100%',
                }}>
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
                            <div style={{ position: 'relative' }}>
                                <input
                                    id='origem'
                                    type='text'
                                    autoComplete='off'
                                    style={inputStyle}
                                    onFocus={() => setIsFocusedOrigin(true)}
                                    {...register('origem', {
                                        onBlur: () => { setTimeout(() => setIsFocusedOrigin(false), 100) }
                                    })}
                                />
                                <ListAutoComplete
                                    items={listOrigin}
                                    show={isFocusedOrigin}
                                    onSelect={(item) => {
                                        setValue('origem', item)
                                        setLocalSearch(item)
                                    }}
                                />
                            </div>
                            <div style={{ position: 'relative' }}>
                                <input
                                    id='destino'
                                    type='text'
                                    autoComplete='off'
                                    style={inputStyle}
                                    onFocus={() => setIsFocusedDestination(true)}
                                    {...register('destino', {
                                        onBlur: () => { setTimeout(() => setIsFocusedDestination(false), 100) }
                                    })}
                                />
                                <ListAutoComplete
                                    items={listDestination}
                                    show={isFocusedDestination}
                                    onSelect={(item) => {
                                        setValue('destino', item)
                                        setLocalSearch(item)
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <AddressCarousel onClick={(address: Address) => {
                        setValue('origem', `${address.street}, ${address.number} - ${address.city}`)
                    }} />
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
                            {...register('tipoTransporte', { required: true })}
                            style={radioInputStyle}
                            type='radio'
                            id='walk'
                            name='tipoTransporte'
                            value='a-pe'
                        />
                        <input
                            {...register('tipoTransporte', { required: true })}
                            style={radioInputStyle}
                            type='radio'
                            id='bicycle'
                            name='tipoTransporte'
                            value='bike'
                        />
                        <input
                            {...register('tipoTransporte', { required: true })}
                            style={radioInputStyle}
                            type='radio'
                            id='car'
                            name='tipoTransporte'
                            value='veiculo'
                        />
                        <input
                            {...register('tipoTransporte', { required: true })}
                            style={radioInputStyle}
                            type='radio'
                            id='bus'
                            name='tipoTransporte'
                            value='transporte-publico'
                        />

                        <label
                            style={watch('tipoTransporte') === 'a-pe'
                                ? { ...routeLabelStyle, ...selectedRouteLabelStyle }
                                : routeLabelStyle}
                            htmlFor='walk'
                        >
                            <MdDirectionsWalk size={iconSize} />
                        </label>
                        <label
                            style={watch('tipoTransporte') === 'bike'
                                ? { ...routeLabelStyle, ...selectedRouteLabelStyle }
                                : routeLabelStyle}
                            htmlFor='bicycle'
                        >
                            <IoIosBicycle size={iconSize} />
                        </label>
                        <label
                            style={watch('tipoTransporte') === 'veiculo'
                                ? { ...routeLabelStyle, ...selectedRouteLabelStyle }
                                : routeLabelStyle}
                            htmlFor='car'
                        >
                            <RiCarLine size={iconSize} />
                        </label>
                        <label
                            style={watch('tipoTransporte') === 'transporte-publico'
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
                </div>
            )}
        </form>
    )
}
