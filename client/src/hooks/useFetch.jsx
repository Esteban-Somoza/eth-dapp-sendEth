import { useEffect, useState } from 'react'

const API_KEY = import.meta.env.VITE_GIPHY_API;

const useFetch = ({ keyword }) => {
    const [gifUrl, setGifUrl] = useState('');
    const fetchGifs = async () => {
        try {
            let query = keyword.split(' ').join('')
            console.log(query);
            let gifData = ''
            const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${query}&limit=1`)
            // console.log(query, await response.json());
            const { data } = await response.json()
            if (data.length) {
                gifData = data[0]?.images?.downsized_medium?.url
            } else {
                const response = await fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=1`)
                const { data } = await response.json()
                gifData = data[0]?.images?.downsized_medium?.url
            }

            return setGifUrl(gifData)

        } catch (error) {
            console.log(error);
            setGifUrl("https://acegif.com/wp-content/uploads/gif-shaking-head-38.gif")
        }
    }

    useEffect(() => {
        // console.log(keyword);
        if (keyword) { fetchGifs() };
    }, [keyword])

    return gifUrl
}

export default useFetch