import { designTokens } from "design-tokens";
import {
  MdOutlineExpandLess,
  MdOutlineExpandMore,
} from "react-icons/md";
import { useEffect, useState } from "react";
import ItemRanking from "./ItemRanking";
import { getDetails } from "../../../../utils/requests/details";
import { DetailResponse } from "../../../../utils/types/details";
import { CardQtdOcorrencia } from "./CardQtdOcorrencias";
import { CardCrimeMaisOcorrencia } from "./CardCrimeMaisOcorrencia";
import { CardRanking } from "./CardRanking";

type AreaDetailsProps = {
  centerMap:number[];
  zoom: number
};

export function AreaDetails(props: AreaDetailsProps) {
  const { centerMap, zoom } = props
  const [expandDetails, setExpandDetails] = useState(false);
  const [detailsData, setDetailsData] = useState<DetailResponse | undefined>(undefined);
  
  useEffect(()=>{
    if(centerMap.length > 0){
      loadDetails().then((resposta)=>{
      })
    }

  }, [centerMap])

  const loadDetails = async()=>{
    await getDetails(centerMap[0],centerMap[1]).then((resposta)=>{
      setDetailsData(resposta.data)
    })
  }

  
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        color: '#334049',
        height: expandDetails ? "260px" : "70px",
        padding: designTokens.spacing.medium,
        background: designTokens.color.white,
        borderRadius: designTokens.borderRadius.medium,
        boxShadow: `0 4px 14px 0 ${designTokens.color.boxShadow}`,
        transition: "height 0.3s ease",
        position: "relative",
      }}>

      <div
        style={{
          padding: '12px 0',
          display: "flex",
          flexDirection: "row",
          alignItems: 'center',
          gap: '46px',
          width: "100%",
        }}>
        <div
          style={{
            display: "flex",
            justifyContent: 'space-around',
            flexDirection: "column",
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
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              verticalAlign: "center",
              background: designTokens.color.text,
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              cursor: "pointer",
            }}
            onClick={() => {
              setExpandDetails(!expandDetails);
            }}
          >
            {expandDetails && (
              <MdOutlineExpandLess
                color={designTokens.color.white}
                size={"24px"}
              />
            )}
            {!expandDetails && (
              <MdOutlineExpandMore
                color={designTokens.color.white}
                size={"24px"}
              />
            )}
          </span>
        </div>
      </div>
      



    

    {expandDetails && 
    
    <div
        style={{
            overflow: 'auto',
            borderTop: '1px solid #c5d1e2',
            paddingTop: '16px',
            display: 'flex',
            gap: '16px',
            alignItems: 'center',
            flexDirection: 'column',  
        }}>
         
        <CardQtdOcorrencia qtd={detailsData?.qtdOcorrencias} ></CardQtdOcorrencia>

        <CardCrimeMaisOcorrencia topCrime={detailsData?.top5Ocorrencias[0]}></CardCrimeMaisOcorrencia>

        <CardRanking lista={detailsData?.top5Ocorrencias}></CardRanking>

        
    </div>
    
    }
    </div>

  );
}

