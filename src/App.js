import React, { useState, useEffect, useId } from 'react';
import axios from 'axios';
import Loading from './Components/Loading';
import SearchBar from './Components/SearchBar';
const url = 'https://itunes.apple.com/search?term=radiohead';

function App() {

  const [musicData, setMusicData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [listElements, setListElements] = useState(['A', 'B', 'C', 'D', 'E']);


  useEffect(() => {
    const interval = setInterval(() => {
      rotateElements()
    }, 3000)
    return () => clearInterval(interval)
  }, [listElements])

  useEffect(() => {
    fetchMusicData()
  }, [])


  const fetchMusicData = async () => {
    const response = await axios(url);
    setIsLoading(false);
    const results = response.data.results || [];
    const responseDataResults = results.length >= listElements.length ? results.slice(0, listElements.length) : results.slice(0, results.length);
    setMusicData(responseDataResults);
    const copyOfArray = [...listElements];

    console.log(responseDataResults)
  }

  const rotateElements = () => {
    const rotatedArray = [...listElements];
    const frontItem = rotatedArray.shift();
    rotatedArray.push(frontItem) //push front item to the back
    if (musicData.length > 0) {
      const dataMusicCopy = [...musicData].slice(1, musicData.length);
      const firstDataMusicItem = musicData[0];
      setMusicData(dataMusicCopy);
      rotatedArray[rotatedArray.length - 1] = firstDataMusicItem.collectionName;
    }
    console.log(musicData)
    setListElements(rotatedArray)
  }

  if (isLoading) {
    return (
      <Loading />
    )
  }

  return (
    <div className='app-container'>

      <SearchBar data={musicData} rotateElements={rotateElements} />

      <div className="element-container">
        {listElements.map((element, index) => {
          return (
            <div className="element" key={index}>
              {element}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default App
