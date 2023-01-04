import { useState, useEffect } from 'react';


const useData = (dataUrl) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const getData = async() => {
            const data = await(await fetch(dataUrl)).json();
            setData(data);
        }
        getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return data;
};

export default useData;