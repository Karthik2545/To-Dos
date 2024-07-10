let tasktext=document.getElementById("tasktext");
let obj=gettodolist();
function Addon(todo){
        let c=todo.id;
        c=c+1;
        let container=document.getElementById("p-container");
        let div=document.createElement("div");
        div.classList.add("items")
        let uniqueid=todo.id;
        div.setAttribute("id",uniqueid);
        container.appendChild(div)
        let input=document.createElement("input");
        input.setAttribute("type","checkbox");
        input.setAttribute("id","task"+c);
        let labelid="label"+c;
        input.checked=todo.ischecked;
        input.onclick=function(){
            mark(labelid,todo);
        }
        let label=document.createElement("label");
        label.setAttribute("for","task"+c);
        label.setAttribute("id",labelid);
        label.classList.add("edit");
        label.textContent=todo.text;
        let icon=document.createElement("i");
        if(input.checked===true){
            label.classList.add("cross");
        }
        icon.onclick=function(){
            remove(uniqueid);
        }
        icon.setAttribute("class","fa-solid fa-trash-can icon");
        div.appendChild(input);
        div.appendChild(label);
        div.appendChild(icon);
        tasktext.value="";
    }
function task(){
    let len=obj.length;
    if (tasktext.value===""){
        alert("Please Enter Text");
    }
    let id=len+1
    unique_id=id;
    let newtodo={
        id:unique_id,
        text:tasktext.value,
        ischecked:false
    }
    obj.push(newtodo)
    Addon(newtodo)
    tasktext.value==""
}
function mark(unique,todo){
    let index=obj.findIndex(function(todos){
        if(todos.id===todo.id){
            return true;
        }
        else{
            return false;
        }
    })
    let ob=obj[index];
    if(ob.ischecked===true){
        ob.ischecked=false;
    }
    else{
        ob.ischecked=true;
    }
    let input=document.getElementById(unique);
    input.classList.toggle("cross");

}
function remove(id){
    let main=document.getElementById(id);
    main.classList.add("remove");
    let index=obj.findIndex(function(todo){
        if(todo.id===id){
            return true;
        }
        else{
            return false;
        }
    })
    obj.splice(index,1);
}
function save(){
    let local=JSON.stringify(obj);
    localStorage.setItem("details",local)
}
function gettodolist(){
    let final=localStorage.getItem("details");
    let data=JSON.parse(final)
    if(data===null){
        return []
    }
    else{
        return data;
    }
}

for(let todo of obj){
    Addon(todo)
}