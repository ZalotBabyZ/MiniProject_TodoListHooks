import React, { useState, useEffect } from 'react'
import TodoBox from './TodoBox'
import InputForm from './InputForm'

function TodoList() {
    const [todoList, setTodoList] = useState([
        {
            id: "000",
            todo: "add Todo",
            dueDate: "2020-10-13",
            todoClass: "TODO",
            isAction: false
        }
    ])
    const [inputList, setInputList] = useState([
        {
            id: "add",
            todo: "",
            dueDate: ""
        },
        {
            id: "000",
            todo: "add Todo",
            dueDate: "2020-10-13"
        }
    ])
    const [isBlank, setIsBlank] = useState([
        {
            id: "add",
            todo: true,
            dueDate: true,
            disabled: true
        },
        {
            id: "000",
            todo: false,
            dueDate: false,
            disabled: false
        }
    ])

    const addTodo = () => {
        let newTodo = [...todoList];
        newTodo = newTodo.map((item, idx) => { return { ...item, id: (`000${idx}`).slice(-3) } });
        const inputIndex = inputList.findIndex(obj => obj.id === "add");
        newTodo.push({
            id: ("000" + todoList.length).slice(-3),
            todo: inputList[inputIndex].todo,
            dueDate: inputList[inputIndex].dueDate,
            todoClass: "TODO",
            isAction: false
        });
        let newInputList = [...inputList];
        newInputList = newInputList.filter(item => item.id !== "add");
        newInputList = newInputList.concat({ id: "add", todo: "", dueDate: 0 }, { id: ("000" + todoList.length).slice(-3), todo: inputList[inputIndex].todo, dueDate: inputList[inputIndex].dueDate })
        setTodoList(newTodo);
        setInputList(newInputList);
    }

    const onChangeInput = (e, idx, key) => {
        let newInputList = [...inputList];
        newInputList = newInputList.reduce((acc, item) => {
            const obj = item.id === idx ? { ...item, [key]: e.target.value } : { ...item };
            return acc.concat(obj)
        }, [])
        setInputList(newInputList);
    }

    const update = (key, value, idx) => {
        let newTodoList = [...todoList];
        newTodoList = newTodoList.reduce((acc, item) => {
            const obj = item.id === idx ? { ...item, [key]: value } : { ...item };
            return acc.concat(obj)
        }, [])
        setTodoList(newTodoList);
    }

    const toEdit = (idx, todo, dueDate, disabled) => {
        let newTodoList = [...todoList];
        newTodoList = newTodoList.reduce((acc, item) => {
            const obj = item.id === idx ? { ...item, todo: todo, dueDate: dueDate, isAction: disabled } : { ...item };
            return acc.concat(obj)
        }, [])
        setTodoList(newTodoList);
    }

    const toDelete=(idx)=>{
        let newTodoList = [...todoList];
        newTodoList=newTodoList.filter(item=>item.id!==idx);
        setTodoList(newTodoList);
    }


    useEffect(() => {
        setIsBlank([...inputList].map(item => {
            return {
                id: item.id,
                todo: !Boolean(item.todo),
                dueDate: !Boolean(item.dueDate),
                disabled: !Boolean(item.dueDate) || !Boolean(item.todo)
            }
        }))
    }, [inputList])



    const addInputIndex = inputList.findIndex(obj => obj.id === "add");
    return (
        <div style={{display:"flex",flexFlow:"column",width: "100vw", height: "100vh", justifyContent: "center",backgroundColor: "#f6f0f1"}}>
            <div style={{width: "100vw", height: "80vh",backgroundColor: "#ffffff"}}>

            <div className="createTodo" style={{ display: "flex", color: "#c39e93", backgroundColor: "#f6f0f1", padding: "5px", borderBottom: "#c39e93 solid 3px", justifyContent: "center", alignItems: "center" }}>
                <InputForm
                    id="add"
                    dataBox="todo"
                    type="text"
                    value={inputList[addInputIndex].todo}
                    placeholder="new todo list"
                    onChangeInput={onChangeInput}
                    width="30vw"
                    fontSize="0.7rem"
                />
                <InputForm
                    id="add"
                    dataBox="dueDate"
                    type="date"
                    value={inputList[addInputIndex].dueDate}
                    placeholder=""
                    onChangeInput={onChangeInput}
                    width="30vw"
                    fontSize="0.7rem"
                />
                <button disabled={isBlank[addInputIndex].disabled} onClick={addTodo} style={{ backgroundColor: "#f6f0f1", color: "#c39e93", border: "#c39e93 2px double", width: "10vw", height: "26px" }}>
                    Add
                    </button>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <TodoBox
                    todoClass="TODO"
                    List={todoList}
                    IsBlank={isBlank}
                    onChangeInput={onChangeInput}
                    InputList={inputList}
                    todoUpdate={update}
                    todoEdit={toEdit}
                    todoDelete={toDelete}
                />
                <TodoBox
                    todoClass="DOING"
                    List={todoList}
                    IsBlank={isBlank}
                    onChangeInput={onChangeInput}
                    InputList={inputList}
                    todoUpdate={update}
                    todoEdit={toEdit}
                    todoDelete={toDelete}
                />
                <TodoBox
                    todoClass="DONE"
                    List={todoList}
                    IsBlank={isBlank}
                    onChangeInput={onChangeInput}
                    InputList={inputList}
                    todoUpdate={update}
                    todoEdit={toEdit}
                    todoDelete={toDelete}
                />

            </div>
            </div>

            <p style={{ color: "#c39e93", fontSize: "0.6rem", textAlign: "left", padding: "20px" }}>
                To add: Type at new todo list box + select due date -&gt; Click add button <br />
                To edit: Double click on task you want to edit -&gt; Action -&gt; Click Save or Double click that box area again   <br />
                Note: Fill all empty input box before "Add" or "Edit"  </p>
        </div>

    )
}

export default TodoList
