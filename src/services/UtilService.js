import { setLoader } from '../store/common.slice';

//fetch
export async function fetchGet(url, dispatch = null){
    let headers = {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-type' : 'application/json'
    };
    let token = localStorage.getItem("token");
    if(token !== null && token !== "")headers["Authorization"] = `Bearer ${token}`;
    try {
        let response = await fetch(process.env.REACT_APP_baseUrl + url,{
            headers: headers,
            method: 'get'
        });
        return response = await response.json();
    } catch (err) {
        if(dispatch != null)dispatch(setLoader(false))
        throw new Error(err);
    }
}

export async function fetchPost(url,data, dispatch = null){
    let headers = {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-type' : 'application/json'
    };
    let token = localStorage.getItem("token");
    if(token !== null && token !== "")headers["Authorization"] = `Bearer ${token}`;
    let body = null;
    if(data instanceof FormData)body = data;
    else body = JSON.stringify(data);
    try {
        let response = await fetch(process.env.REACT_APP_baseUrl + url,{
            headers: headers,
            method: 'post',
            body: body
        });
        return response = await response.json();
    } catch (err) {
        if(dispatch != null)dispatch(setLoader(false))
        throw new Error(err);
    }
}

export function logout(){
    localStorage.removeItem("token");
    window.location.href = "/";
}


export function readFile(file, type = "dataurl"){
    return new Promise((resolve,err) => {
      let reader = new FileReader();
      reader.onload = (e) => {
        resolve(e);
      };
      if(type === "dataurl")reader.readAsDataURL(file);
      if(type === "arraybuffer")reader.readAsArrayBuffer(file);
    });
}

/**
 * convert bytes(octets)
 * @param {number} bytes 
 * @param {string} unit : bit, octet, ko, mo, go, to
 * @returns {number}
 */
export function convertByte(bytes = 0, unit){
    switch (unit) {
        case 'bit':
            return bytes * 8;//bits
        case 'octet':
            return bytes;//octets
        case 'ko':
            return bytes / 1024;// kilooctet
        case 'mo':
                return bytes / (1024 * 1024);// kilooctet
        case 'go':
            return bytes / (1024 * 1024 * 1024);// gigaoctet
        case 'to':
            return bytes / (1024 * 1024 * 1024 * 1024);// téraoctet 
        default:
            return 0;
    }
}

export function clone(data){
    return JSON.parse(JSON.stringify(data));
}