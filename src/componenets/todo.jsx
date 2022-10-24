import { useState, useEffect } from "react"
import React  from 'react'
import './todo.css'



export default function Todo() {
 
     
   const[unit, setUnit]= useState('Show all')
    const [time, setTime] = useState('');  
    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState([]);
    const [date, setDate] =useState('');

    const [clik, setClik]= useState(0);
   


    const addTask =(e)=>{
        if(task){
            const newTask ={id: new Date().getTime().toString(),title: task , time: time ,date:date};
            setTasks([ ...tasks, newTask])
            localStorage.setItem("localTasks",JSON.stringify([...tasks, newTask]))
            setTask('');
            desc();

        }
    }
  
const handleclik=(()=>{
   if (clik==0) {
    setClik(1);
 setUnit('Show few');
    } else{
    setClik(0);
  setUnit('Show all');
   } ;

    
})

function desc(){
    document.getElementById("descr").value ='';
}


useEffect(()=>{
    if(localStorage.getItem("localTasks")){
        const storedList =JSON.parse(localStorage.getItem("localTasks"));
        setTasks(storedList);
    }
},[])

    const handledelete = (task)=>{
        const deleted =tasks.filter((t)=>t.id !== task.id);
        setTasks(deleted);
        localStorage.setItem("localTasks", JSON.stringify(deleted))
    }
    const handleclear =()=>{
        setTasks([]);
        localStorage.removeItem("localtasks");
    }
   
    


const noofele = clik==1? tasks.length : 3 ;


  return (
 <div id="main">   <div id="container" >
<h1 className='mt-3 text-black'>Task Creator</h1>
<br></br>
<br/>
<h5>Task Name</h5>
<div className='col-10' >
<input name='task'
type='text'
value={task}
placeholder='Write your task...'
className='form-control'
onChange={(e)=> setTask(e.target.value)}/> <br/>
<h5>Task Description  (Optional)</h5>
<input id="descr" className="form-control" type={'text'}/></div><br></br><span> Date : <input type={"date"} value={date} onChange={(e)=> setDate(e.target.value)}/></span><pre>    </pre> <span> Time :  
<input type={"time"} value={time} onChange={(e)=> setTime(e.target.value)} /> <br/><br></br>
    <button className='btn btn-primary col-4' id="butnc" onClick={addTask}>Create task</button> 
</span>
</div>
<div id="rightside"><br/><span className="toprig">Upcoming</span><button className="btn btn-primary col-3" id="btall" align="right" onClick={()=>handleclik()}>{unit}</button><br/>
<div className="badge1">
 <h6>   You have {!tasks.length? "no tasks": tasks.length === 1 ? "1 task": tasks.length > 1 ?`${tasks.length} tasks`: null}</h6>
</div> 
<div className="right" >{
    
    tasks.slice(0,noofele).map((task)=>(
        <React.Fragment key={task.id}>
            
                <div id="lis"  
                style={{ fontWeight: "bold"}}>
                   <div className="col-5"> {task.title}</div> <span className="sp">{task.date} </span> <span className="sp">{task.time}</span>  <span className="sp"><button className="mt-0 btn btn-warning material-icons" onClick={()=>handledelete(task)}>Delete</button></span>
                </div>
            
            
        </React.Fragment>
    ))
}

{!tasks.length? null:(
    <div>
        <button className="btn btn-secondary mt-4 mb-4" onClick={()=>handleclear()}> Clear all</button>
    </div>
)}</div></div>
    </div>
  );
}
