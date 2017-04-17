export default {
    
  checkPromise: (promiseUrl) =>
  {   
	var returnBool = true;
	var promiseCounter = localStorage.getItem('promise-' + promiseUrl);
	if(promiseCounter == null)promiseCounter = 0;
	else 
	{
		//promiseCounter = parseInt(promiseCounter);
		promiseCounter = parseInt(promiseCounter) + 1;
	}
	if(promiseCounter > 5)
	{
		promiseCounter = 0;
		returnBool = false;
	}
	localStorage.setItem('promise-' + promiseUrl,promiseCounter);
	console.log('promise-' + promiseUrl + "," + promiseCounter);
	
	// alert('promise-' + promiseUrl + ",promiseCounter:" + promiseCounter);
	return returnBool; 
  }
}