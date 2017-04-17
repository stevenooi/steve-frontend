import request from 'superagent/lib/client';
import ApiSettings from '../config/apiSettings';


import PromiseHandler from '../utils/general/PromiseHandler';

export default {
 
  postMenu: (url,params) => {
    return new Promise((resolve, reject) => {
      request
        .post(ApiSettings.NODE_SERVER + "/" + url) 
		.set('Content-Type', 'application/json')
		.send(params) 
        .end((err, response) => {
			if (err)
			{ 
				if(!PromiseHandler.checkPromise(url)) reject(err);
			}
			else
			{
				resolve(JSON.parse(response.text));
			}
        })
    });
  },
}