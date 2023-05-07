import {API_KEY, BASE_URL} from "./apiConfig"


    function treatHTTPResponseACB(response){
        if(response.status != 200) throw new Error("API problem "+response.status);
        return response.json();
    }

    function transformSearchResultACB(param){
        return param;
    }
    function doPlantSearch(param){
        if(!param){
        param = "";
        }
        return fetch(`https://perenual.com/api/species-list?key=${API_KEY}&q=${param}`)
            .then(treatHTTPResponseACB).then(transformSearchResultACB)
    }
    export{doPlantSearch}
    
 