import {React, useState, useEffect} from 'react';
import './App.css';
import GameInfo from './GameInfo';
import Header from './Header';

function App() {

  const [blam,setBlam] = useState([])

  useEffect(()=>{
    fetch('http://localhost:9292/games')
    .then(res => res.json())
    .then(data => {
      console.log(data); setBlam(data)
})},[]
)

let games = blam.map((e)=>{
  return (
    <GameInfo 
    title = {e.title}
    coverArt = {e.img_url}
    gameYear = {e.year}
    review = {e.review}
    id = {e.id}
    />
  )
})

console.log(blam)

  return (
    <div className="App"> 
    <Header />
      {games} 
    </div>
  );
}

export default App;
