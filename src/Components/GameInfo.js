import {React, useState} from "react"


function GameInfo({
    title, coverArt, gameYear,review,id,render,setRender
}){

    const [reviewHidden, setReviewHidden] = useState(true);
    const [deleteHidden, setDeleteHidden] = useState(true);
    const [hiddenInfo, setHiddenInfo] = useState(true);
    const [patch, setPatch] = useState(0);
    const [frontValue, setFrontValue] = useState(review);
    const [info, setInfo] = useState([]);
    
    function handleNumber(e){
        setPatch(e.target.value);
        console.log(patch);
    };
    
  const handleUpdate = ()=>{

        fetch(`http://localhost:9292/games/${id}`,{
            method:"PATCH",
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                review: patch
            }),
        })
        .then((res =>res.json()))
        .then(data => setFrontValue(data.review));
        setReviewHidden(!reviewHidden)
    }

    const handleDelete = () => {
        fetch(`http://localhost:9292/games/${id}`,{
            method:"DELETE",})
        .then(res=>res.json())
        setDeleteHidden(!deleteHidden);
        alert("This entry has been deleted!");
        setRender(!render);
    }
    const handleInfo = () =>{
        fetch(`http://localhost:9292/games/platform/${id}`)
        .then(res=>res.json())
        .then(data=>{console.log(data);setInfo(data)})
        setHiddenInfo(!hiddenInfo)
    }
    return(
        
        <div id="gameInfo">
            <img id="coverArt" src={coverArt} alt="This didn't load for some reason"></img>            
            <h1 id="gameTitle">{title}</h1>
            <h2 id="gameYear">Release Year: {gameYear}</h2>
            <h2 id="review">{frontValue}/10</h2>
            <div id="buttons">
                <button id="updateGame" onClick={()=>setReviewHidden(!reviewHidden)}>Change Review?</button>
                <button id="deleteGame" onClick={()=>setDeleteHidden(!deleteHidden)}>Delete?</button>
                <button id="moreInfo" onClick ={handleInfo}>More Info?</button>
            </div>
            <div id="update">
                <select id="textUpdate" onChange={handleNumber} type="text" hidden={reviewHidden} placeholder="Update rating here!">
                    <option value={0}></option>
                    <option value={0}>0</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                    <option value={7}>7</option>
                    <option value={8}>8</option>
                    <option value={9}>9</option>
                    <option value={10}>10</option>                    
                </select>
                    <button id="updateConfirm" onClick={handleUpdate} hidden={reviewHidden}>Click here to update</button>
            </div>
                <button id="confirmDeleteBtn" onClick={handleDelete} hidden={deleteHidden}>This cannot be undone!</button>
                <h1 id="platInfo" hidden={hiddenInfo}>{info[0]}</h1>
        </div>
    )
};

export default GameInfo