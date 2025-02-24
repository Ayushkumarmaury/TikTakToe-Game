
import { useState, useEffect } from 'react';
import './App.css';
import { Provider, connect } from 'react-redux';
import { createStore } from 'redux'


const initial_state =   {
 marks:[0,0,0,0,0,0,0,0,0],
 player:1,
 gameOver:false
}

const reducer  = (state=initial_state, action)=>{

  switch(action.type){
    case 'SET_PLAYER':
      return {...state, player: action.payload}
    case 'SET_MARKS':
      return {...state, marks: action.payload}
    case 'SET_GAMEOVER':
      return {...state, gameOver: action.payload}
    default:
      return state;
  }
  
}
const store = createStore(reducer);



function App() {
 

  return (
    <>
    <Provider store={store}>
    <BoardContainer></BoardContainer>
    </Provider>
      
       
    </>
  )
}

const mapStateToProps=(state)=>{
  return{
    marks: state.marks,
    player: state.player,
    gameOver: state.gameOver
  }
}
const mapDispatchToProps=(dispatch)=>{
  return{
    setMarks:(marks)=>{
      dispatch({type:'SET_MARKS',payload:marks})
    },
    setplayer:(player)=>{
      dispatch({type:'SET_PLAYER',payload:player})

    },
    setGAMEOVER:(status)=>{
      dispatch({type:'SET_GAMEOVER',payload:status})

    }
  }

}

const BoardContainer = connect(mapStateToProps,mapDispatchToProps)(Board);

function Board({marks,player,setMarks,setplayer,gameOver,setGAMEOVER}) {

  // const [marks, setMarks] = useState([0,0,0,0,0,0,0,0,0]);
  // const [player, setplayer] = useState(1);

  useEffect(() => {
    const combinations = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6],
    ]
    
    for(let c of combinations) {
      if(marks[c[0]]===1 && marks[c[1]]===1 && marks[c[2]]===1 ) {
        alert("PLAYER 1 WIN THE GAME !!!...");
        setGAMEOVER(true);
      }
      if(marks[c[0]]===2 && marks[c[1]]===2 && marks[c[2]]===2 ) {
        alert("PLAYER 2 WIN THE GAME !!!...");
        setGAMEOVER(true);

      }

    };


  }, [marks])
  



  const changeMark = (i)=>{
      const m = [...marks];
     
      if(m[i]===0 && !gameOver){
      m[i] = player;
      setMarks(m);
      setplayer(player===1?2:1);
      }else{
        alert("PLEASE CLICK ON BLANK BLOCK !!...");
      }
      
  }



  return(
    <div className='Board'>
      <div>
      <Block mark={marks[0]} position={0} changeMark={changeMark}></Block>
      <Block mark={marks[1]} position={1} changeMark={changeMark}></Block>
      <Block mark={marks[2]} position={2} changeMark={changeMark}></Block>
      </div>
      <div>
      <Block mark={marks[3]} position={3} changeMark={changeMark}></Block>
      <Block mark={marks[4]} position={4} changeMark={changeMark}></Block>
      <Block mark={marks[5]} position={5} changeMark={changeMark}></Block>
      </div>
      <div>
      <Block mark={marks[6]} position={6} changeMark={changeMark}></Block>
      <Block mark={marks[7]} position={7} changeMark={changeMark}></Block>
      <Block mark={marks[8]} position={8} changeMark={changeMark}></Block>
      </div>
      
    </div>
  )
}

function Block({mark, changeMark, position}) {
  


  return(
    <div className={`Block mark${mark}`} onClick={e=>changeMark(position)}>

    </div>
  )
}

export default App
