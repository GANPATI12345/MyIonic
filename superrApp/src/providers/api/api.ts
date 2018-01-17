import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class Api {
  url = 'https://example.com/api/v1';

  constructor(public http: HttpClient) {
  }
  //api calling for product adding
callPost(category,product,price,qty,unit,stock):Promise<any>
  {
  let param ={ category:category,ProductName:product, Price:price, Quantity:qty, Unit:unit, Stock:stock };

  console.log("category=" +category+ ", ProductName=" +product+"Price:"+price+"Quantity"+qty+"Unit"+unit+"Stock"+stock);
  let demourl="http://httpbin.org/post";
  let request= this.http.post(demourl, param);
  return request.toPromise();
  }
getProduct(){
 return this.http.get('http://localhost:8080/category/allCategory').map((res)=>res.json()); 
}


  get(endpoint: string, params?: any, reqOpts?: any) {
    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams()
      };
    }

    // Support easy query params for GET requests
    if (params) {
      reqOpts.params = new HttpParams();
      for (let k in params) {
        reqOpts.params.set(k, params[k]);
      }
    }

    return this.http.get(this.url + '/' + endpoint, reqOpts);
  }

  post(endpoint: string, body: any, reqOpts?: any) {
    return this.http.post(this.url + '/' + endpoint, body, reqOpts);
  }

  put(endpoint: string, body: any, reqOpts?: any) {
    return this.http.put(this.url + '/' + endpoint, body, reqOpts);
  }

  delete(endpoint: string, reqOpts?: any) {
    return this.http.delete(this.url + '/' + endpoint, reqOpts);
  }

  patch(endpoint: string, body: any, reqOpts?: any) {
    return this.http.put(this.url + '/' + endpoint, body, reqOpts);
  }
}
