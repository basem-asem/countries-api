import { useState, useEffect } from "react";


const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [ispanding, setIspanding] = useState(true);
    const [error, setError] = useState(null);

    useEffect (() => {
        const abortController = new AbortController()
        setTimeout(() => {
            fetch(url, {signal: abortController.signal})
            .then(res => {
                if (!res.ok) {
                    throw Error("could not fetch the data");
                }
                return res.json();
            })
            .then(data => {
                setData(data)
                setIspanding(false)
                setError(null)
            })
            .catch(err => {
                if (err.name === "AbortError") {
                    console.log('fetch aborted')
                } else {                   
                    setIspanding(false);
                    setError(err.message);
                }
            })
        }, 1000);
        return () => abortController.abort();
    }, [url]);
    return {data, ispanding, error}
}

export default useFetch;