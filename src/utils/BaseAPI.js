import request from 'superagent/lib/client';
import ApiSettings from '../config/apiSettings';

export default {
  getData: (url) => { 
    return new Promise((resolve, reject) => {
      request
        .get(ApiSettings.NODE_SERVER + "/" + url)
        .end((err, response) => {
          if (err) reject(err);
          resolve(JSON.parse(response.text));
        })
    });
  },
	 
}