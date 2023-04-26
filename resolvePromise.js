function resolvePromise(promiseToResolve, promiseState, notify){
    if(promiseToResolve === null){
        return;
    }
	promiseState.promise=promiseToResolve;
    promiseState.data= null;           // UI update! The user does not keep seeing results from previous search
    promiseState.error= null;

    if(notify) 
        notify();
   

function saveDataACB(result){ 
    if(promiseState.promise !== promiseToResolve) return;
        promiseState.data= result; 
    if(notify)
        notify();

}  // triggers UI update because of changing state
function saveErrorACB(err)  { 
    if(promiseState.promise !== promiseToResolve) return;
        promiseState.error= err; 
    if(notify)
        notify();

    
}    // triggers UI update because of changing state
promiseToResolve.then(saveDataACB).catch(saveErrorACB);
}
export default resolvePromise;