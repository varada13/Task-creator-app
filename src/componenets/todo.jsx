import { useState, useEffect } from "react"
import React  from 'react'
import './todo.css'



export default function Todo() {
 
     
   const[unit, setUnit]= useState('Show all');
   const[unit1, setUnit1]= useState('Show all');
   const[clik1, setClik1]=useState(0);
    const [time, setTime] = useState('');  
    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState([]);
    const [date, setDate] =useState('');
const [Status, setStatus]= useState(0);
    const [clik, setClik]= useState(0);
    const[comptasks, setcomptasks]= useState([]);
   


    const addTask =(e)=>{
        if(task){
            const newTask ={id: new Date().getTime().toString(),title: task , time: time ,date:date, Status : Status};
            setTasks([ ...tasks, newTask])
            localStorage.setItem("localTasks",JSON.stringify([...tasks, newTask]))
            setTask('');
            desc();

        }
    }
  
const handleclik=(()=>{
   if (clik===0) {
    setClik(1);
 setUnit('Show few');
    } else{
    setClik(0);
  setUnit('Show all');
   } });

   const handleclik1=(()=>{
    if (clik1===0) {
     setClik1(1);
  setUnit1('Show few');
     } else{
     setClik1(0);
   setUnit1('Show all');
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

    const handledelete1 = (task)=>{
        const deleted1 =comptasks.filter((t)=>t.id !== task.id);
        setcomptasks(deleted1);
        localStorage.setItem("localTasks", JSON.stringify(deleted1))
    }

    const handleclear =()=>{
        setTasks([]);
        localStorage.removeItem("localtasks");
    }

    const handleclear1 =()=>{
        setcomptasks([]);
        localStorage.removeItem("localtasks");
    }

   const completeclick= (e)=>{
    const newcpTask ={id: new Date().getTime().toString(),title: e.title , time: e.time ,date: e.date, Status : Status};
    setcomptasks([...comptasks, newcpTask]);
        localStorage.setItem("localTasks",JSON.stringify([...comptasks, newcpTask]))

   handledelete(e);

   }
    


const noofele = clik===1? tasks.length : 3 ;
const noofele1 = clik1===1? comptasks.length : 3 ;


  return (
 <div id="main">   <div id="container" >
<h1 className='mt-3 text-black'>To Do App</h1>
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
<div id="rightside"><br/><span className="toprig">Tasks</span><button className="btn btn-primary col-3" id="btall" align="right" onClick={()=>handleclik()}>{unit}</button><br/>
<div className="badge1">
 <h6 className="toprigh">   You have {!tasks.length? "no pending tasks": tasks.length === 1 ? "1 pending task": tasks.length > 1 ?`${tasks.length} pending tasks`: null}</h6>
</div> 
<div className="right" >{
    
    tasks.slice(0,noofele).map((task)=>(
        <React.Fragment key={task.id}>
            
                <div id="lis"  
                style={{ fontWeight: "bold"}}>
                   <div className="col-4"> {task.title}</div> <span className="sp">{task.date} </span> <span className="sp">{task.time}</span> <svg xmlns="http://www.w3.org/2000/svg" width="56" height="66" fill="currentColor" onClick={()=>completeclick(task)} class="bi bi-check-circle but" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
  <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
</svg> <span className="sp"><button className="mt-0 btn btn-warning material-icons del" onClick={()=>handledelete(task)}>Delete</button></span>
                </div>
            
            
        </React.Fragment>
    ))
}
{!tasks.length? null:(
    <div>
        <button className="btn btn-secondary mt-4 mb-4" onClick={()=>handleclear()}> Clear all</button>
    </div>
)}
<br/>
<div>
<span><h3>Completed tasks</h3> <button className="btn btn-primary col-3" id="btall1" align="right" onClick={()=>handleclik1()}>{unit1}</button></span><br/>


    {comptasks.slice(0,noofele1).map((task)=>(
         <React.Fragment key={task.id}>
            
         <div id="lis"  
         style={{ fontWeight: "bold"}}>
            <div className="col-4"> {task.title}</div> <span className="sp">{task.date} </span> <span className="sp">{task.time}</span> <svg xmlns="http://www.w3.org/2000/svg" width="56" height="66" fill="green"  class="bi bi-check-circle-fill but" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
</svg><span className="sp"><button className="mt-0 btn btn-warning material-icons del" onClick={()=>handledelete1(task)}>Delete</button></span>
         </div>
     
     
 </React.Fragment>

    ))}

{!comptasks.length? null:(
    <div>
        <button className="btn btn-secondary mt-4 mb-4" onClick={()=>handleclear1()}> Clear all</button>
    </div>
)}
</div>

</div></div>
    </div>
  );
}
