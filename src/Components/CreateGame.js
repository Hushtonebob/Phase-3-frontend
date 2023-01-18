import {React,useState} from "react";

function CreateGame({render, setRender}){

    const [hideCreate,setHideCreate] = useState(true);
    const [newTitle,setNewTitle] = useState("");
    const [newYear,setNewYear] = useState("");
    const [newReview,setNewReview] = useState("");
    const [newGenre,setNewGenre] = useState("");
    const [newPlatform,setNewPlatform] = useState("");
    const [newURL, setNewURL] = useState("")

    const handleNewGame = (event)=>{
        event.preventDefault();
        setHideCreate(!hideCreate);
      }

    const handleCreate = (event)=>{
        event.preventDefault();

        fetch("http://localhost:9292/games",{
            method:"POST",
            headers:{
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                title:newTitle,
                year:newYear,
                review:newReview,
                genre_id:newGenre,
                platform_id:newPlatform,
                img_url:newURL
            })
        })
        .then(res=>res.json())
        .then(data=>console.log(data));

        setNewTitle(""); document.getElementById("newTitle").value = ""
        setNewYear("");document.getElementById("newYear").value = ""
        setNewReview("");document.getElementById("newReview").value = 0
        setNewGenre("");document.getElementById("newGenre").value = "Genre"
        setNewPlatform("");document.getElementById("newPlatform").value = "Platform"
        setNewURL("");document.getElementById("newImg_URL").value = ""
        setHideCreate(!hideCreate);
        setRender(!render);
    }

return(
<div>    
    <div id='createContainer'> 
        <button id ="createBtn" onClick={handleNewGame}>Create New Review!</button>
    </div>
    <div id="createNewGame" hidden={hideCreate}>
        The new game will be at the bottom of the page!
            <div id="fieldHolder">
                <input id="newTitle" type="text" onChange={(e)=>{setNewTitle(e.target.value);console.log(e.target.value)}} placeholder="Game Title"></input>
                <input id="newYear" type="text" onChange={(e)=>{setNewYear(e.target.value);console.log(e.target.value)}} placeholder="Release Year"></input>
                <input id="newImg_URL" type="text" onChange={(e)=>{setNewURL(e.target.value);console.log(e.target.value)}} placeholder="Game Cover URL"></input>
                <div id="newSelect">
                    <select id="newReview" onChange={(e)=>{setNewReview(e.target.value);console.log(e.target.value)}}>
                        <option value={0}>Review Rating</option>
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
                    <select id="newGenre" onChange={(e)=>{setNewGenre(e.target.value);console.log(e.target.value)}}>
                        <option>Genre</option>
                        <option value={22}>Shooter</option>
                        <option value={23}>Puzzle</option>
                        <option value={24}>RPG</option>
                        <option value={25}>RTS</option>
                        <option value={26}>Adventure</option>
                        <option value={27}>Sports</option>
                        <option value={28}>Sandbox/Survival</option>
                    </select>
                    <select id="newPlatform" onChange={(e)=>{setNewPlatform(e.target.value);console.log(e.target.value)}}>
                        <option>Platform</option>
                        <option value={16}>Xbox</option>
                        <option value={17}>Playstation 5</option>
                        <option value={18}>Nintendo Switch</option>
                        <option value={19}>Multi-Platform</option>
                        <option value={20}>PC</option>
                    </select>
                </div>
            </div>
        <button id="confirmCreateBtn" onClick={handleCreate}>Confirm</button>
    </div>
</div>
)

}

export default CreateGame