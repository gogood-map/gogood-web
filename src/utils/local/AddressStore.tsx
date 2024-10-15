export function saveAddressLocal(localSearch:string) {
    if(localStorage.getItem("addressSearch")){
        var local = localStorage.getItem("addressSearch")
        if(local){
            var addressListLocal = JSON.parse(local)
            var address = JSON.stringify({"endereco":{localSearch}})
           
            var qtdIguais = 0;
            for(var i=0; i<addressListLocal.length; i++){
                console.log(addressListLocal)
                var item = JSON.parse(addressListLocal[i])

                if(item.endereco.localSearch == localSearch){
                    qtdIguais++;
                }
            }


            if(qtdIguais == 0){
                if(addressListLocal.length > 3){
                    addressListLocal.pop() 
                }
                addressListLocal.push(address)
                localStorage.addressSearch = JSON.stringify(addressListLocal)
            }
        }
      
    }else{
        var addressList = []
        var address = JSON.stringify({"endereco":{localSearch}})
        addressList.push(address)
      
        var jsonAdress = JSON.stringify(addressList)
        localStorage.setItem("addressSearch", jsonAdress)
    }

}
type Endereco = {
    localSearch: string
}
export type LocalAddress ={
    endereco: Endereco
}
export function getAll() {
    var list: string[] = []
    if(localStorage.getItem("addressSearch")){

        var local = localStorage.getItem("addressSearch")
        if(local){
            var addressListLocal = JSON.parse(local)
            addressListLocal.forEach((item: any)=>{
                var item: any = JSON.parse(item)
                list.push(item.endereco.localSearch)
            })

           
        }
        return list
    }
    return undefined
}


