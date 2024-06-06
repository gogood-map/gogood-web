import axios, { AxiosResponse } from 'axios'
import { DashboardResponse } from '../types/dashboard'

const baseURL = import.meta.env.VITE_BASE_URL

export const getDashboard = async (city: string, suburb: string)
  : Promise<AxiosResponse<DashboardResponse>> => {
  return await axios.get(`${baseURL}/ocorrencias/regiao?cidade=${city}&bairro=${suburb}`)
}

export const getCitySuburb = async (lat: number, lng: number) => {
  return await axios.get(`https://nominatim.openstreetmap.org/reverse.php?lat=${lat}&lon=${lng}&zoom=18&format=jsonv2`)
}


// const fetchLocationData = async (latitude: number, longitude: number) => {
//   try {
//       const response = await axios.get(`https://nominatim.openstreetmap.org/reverse.php?lat=${latitude}&lon=${longitude}&zoom=18&format=jsonv2`);
//       const data = await response.data;
//       console.log('Dados de localização completos:', data);

//       // Extrair o nome do bairro (suburb)
//       const suburb = data.address.village || data.address.suburb || 'Desconhecido';
//       console.log('Subúrbio:', suburb);

//       // Extrair o nome da cidade (city)
//       const city = data.address.city || 'Desconhecido';
//       console.log('Cidade:', city);

//       const locationInfo = {
//           suburb,
//           city
//       };
//       setLocationData(locationInfo);
//       sessionStorage.setItem('locationData', JSON.stringify(locationInfo));

//       occurrencesRequest(city, suburb)
//           .then((response) => {
//               setMonths([]);
//               setQtyOccurrence([]);

//               console.log('Resposta:', response.data);

//               response.data.forEach((item: {
//                   anoMes: string;
//                   count: number;
//               }) => {
//                   const anomes = item.anoMes // 2021-01
//                   const mes = Number(anomes.split('-')[1]); // 01
//                   const qtd = Number(item.count); // 5

//                   const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']

//                   setMonths((months) => [...months, meses[mes - 1]]);
//                   setQtyOccurrence((qtyOccurrence) => [...qtyOccurrence, qtd]);
//               })

//               setCompleteRequest(true);
//           }).catch((error) => {
//               console.error('Erro ao obter dados de ocorrências:', error);
//           });

//   } catch (error) {
//       console.error('Erro ao obter dados de localização:', error);
//   }
// };
