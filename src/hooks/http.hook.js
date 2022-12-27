import { useCallback } from "react";

export const useHttp = () => {
    // const [process, setProcess] = useState('waiting');

    const request = useCallback(async (url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) => {
        try {
            const response = await fetch(url, {method, body, headers});
            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch(e) {
            // setProcess('error');
            throw e;
        }
    }, []);

    const requestDel = useCallback(async (url, method = 'DELETE', body = null, headers = {'Content-Type': 'application/json'}) => {
        try {
            const response = await fetch(url, {method, body, headers});
            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch(e) {
            throw e;
        }
    }, []);

    const requestADD = useCallback(async (url, method = 'POST', body = null, headers = {'Content-Type': 'application/json'}) => {
        try {
            const response = await fetch(url, {method, body, headers});
            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch(e) {
            throw e;
        }
    }, []);


    // let user = {
    //     "id": 1,
    //     "name": "Hella",
    //     "description": "from Marvel",
    //     "element": "fire"
    // };
    //
    // let response = await fetch('/article/fetch/post/user', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json;charset=utf-8'
    //     },
    //     body: JSON.stringify(user)
    // });
    //
    // let result = await response.json();
    // alert(result.message);


    // const clearError = useCallback(() => {
        // setProcess('loading');
    // }, []);

    return {request,
        requestDel,
        requestADD
            // clearError,
            // process, 
            // setProcess
        }
}