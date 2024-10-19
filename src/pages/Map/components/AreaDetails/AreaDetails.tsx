import { designTokens } from 'design-tokens'
import { MdOutlineExpandLess, MdOutlineExpandMore } from 'react-icons/md'
import { useEffect, useState } from 'react'
import { getDetails } from '../../../../utils/requests/details'
import { DetailResponse } from '../../../../utils/types/details'
import { CardQtdOcorrencia } from './CardQtdOcorrencias'
import { CardCrimeMaisOcorrencia } from './CardCrimeMaisOcorrencia'
import { CardRanking } from './CardRanking'

type AreaDetailsProps = {
  centerMap: number[]
  radius: number
}

export function AreaDetails(props: AreaDetailsProps) {
  const { centerMap, radius } = props
  const [expandDetails, setExpandDetails] = useState(false)
  const [detailsData, setDetailsData] = useState<DetailResponse | undefined>(undefined)

  useEffect(() => {
    getDetails(centerMap[0], centerMap[1], radius)
      .then((response) => {
        setDetailsData(response.data)
      })
  }, [centerMap, radius])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        color: designTokens.color.text,
        height: expandDetails ? '260px' : '44px',
        padding: designTokens.spacing.medium,
        background: designTokens.color.background,
        borderRadius: designTokens.borderRadius.medium,
        gap: designTokens.spacing.mediumLarge,
        boxShadow: `0 4px 14px 0 ${designTokens.color.boxShadow}`,
        transition: 'height 0.3s ease',
        position: 'relative',
      }}>

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            flexDirection: 'column',
          }}>
          <span
            style={{
              fontWeight: designTokens.font.weight.bold,
              fontFamily: designTokens.font.family,
              fontSize: designTokens.font.size.medium,
              color: designTokens.color.text,
            }}
          >
            Minha área é perigosa?
          </span>

          <span
            style={{
              fontWeight: designTokens.font.weight.medium,
              fontFamily: designTokens.font.family,
              fontSize: designTokens.font.size.small,
              color: designTokens.color.text,
            }}
          >
            Confira agora sua segurança
          </span>
        </div>

        <div>
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              verticalAlign: 'center',
              background: designTokens.color.text,
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              cursor: 'pointer',
            }}
            onClick={() => {
              setExpandDetails(!expandDetails)
            }}
          >
            {expandDetails && (
              <MdOutlineExpandLess
                color={designTokens.color.white}
                size={'24px'}
              />
            )}
            {!expandDetails && (
              <MdOutlineExpandMore
                color={designTokens.color.white}
                size={'24px'}
              />
            )}
          </span>
        </div>
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: designTokens.spacing.medium,
        height: expandDetails ? '216px' : '0px',
        overflow: 'hidden',
        transition: 'height 0.3s ease',
      }}>

        {expandDetails &&
          <>
            <span style={{
              width: '100%',
              height: '1px',
              background: designTokens.color.border,
            }} />
            <div
              style={{
                overflow: 'auto',
                display: 'flex',
                width: '100%',
                height: '174px',
                gap: '16px',
                flexDirection: 'column',
                transition: 'height 0.3s ease',
              }}>

              <CardQtdOcorrencia qtd={detailsData?.qtdOcorrencias} ></CardQtdOcorrencia>

              <CardCrimeMaisOcorrencia topCrime={detailsData?.top5Ocorrencias[0]}></CardCrimeMaisOcorrencia>

              <CardRanking lista={detailsData?.top5Ocorrencias}></CardRanking>


            </div>
          </>
        }
        
      </div>
    </div>

  );
}

