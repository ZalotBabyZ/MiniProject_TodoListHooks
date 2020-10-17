import React from 'react'
import InputForm from './InputForm'

function TodoBox(props) {
    const { List, onChangeInput, InputList, IsBlank, todoUpdate, todoClass, todoEdit, todoDelete } = props;
    const filterList = List.filter(item => item.todoClass === todoClass);

    const tdStyle = { border: "#f0e4d8 2px dotted", color: "#2d2d2b", fontSize: "0.7rem", textAlign: "left" };
    const buttonStyle = { backgroundColor: "#f6f0f1", color: "#c39e93", border: "#c39e93 2px double", width: "45%", height: "26px",margin: "2px" , fontSize: "0.7rem" };


    return (

        <table className={todoClass} style={{ borderCollapse: "collapse", margin: "5px", width: "30vw" }}>
            <tr>
                <th colSpan={3} style={{ border: "#f0e4d8 2px solid", backgroundColor: "#f0e4d8", padding: "8px"}}>
                    {todoClass}
                </th>
            </tr>
            {filterList.map(item => {
                const inputIndex = InputList.findIndex(obj => obj.id === item.id);
                return item.isAction ?
                    <>
                        <tr onDoubleClick={() => todoEdit(item.id, InputList[inputIndex].todo, InputList[inputIndex].dueDate, IsBlank[inputIndex].disabled)}>
                            <td colSpan={2} style={tdStyle}>
                                <InputForm
                                    id={item.id}
                                    dataBox="todo"
                                    type="text"
                                    value={InputList[inputIndex].todo}
                                    placeholder="new todo list"
                                    onChangeInput={onChangeInput}
                                    width="15vw"
                                    fontSize= "0.6rem"
                                />
                            </td>
                            <td style={tdStyle}>
                                <InputForm
                                    id={item.id}
                                    dataBox="dueDate"
                                    type="date"
                                    value={InputList[inputIndex].dueDate}
                                    placeholder=""
                                    onChangeInput={onChangeInput}
                                    width="10vw"
                                    fontSize= "0.6rem"
                                />
                            </td>
                        </tr>
                        <tr  onDoubleClick={() => todoEdit(item.id, InputList[inputIndex].todo, InputList[inputIndex].dueDate, IsBlank[inputIndex].disabled)}>
                            <td colSpan={3} style={{...tdStyle,textAlign: "center"}}>
                                {todoClass !== "TODO" ? <button onClick={() => todoUpdate("todoClass", "TODO", item.id)} style={buttonStyle}> TODO </button> : null}
                                {todoClass !== "DOING" ? <button onClick={() => todoUpdate("todoClass", "DOING", item.id)} style={buttonStyle}> DOING </button> : null}
                                {todoClass !== "DONE" ? <button onClick={() => todoUpdate("todoClass", "DONE", item.id)} style={buttonStyle}> DONE </button> : null}
                                <button onClick={() => todoDelete(item.id)} style={buttonStyle}> Delete </button>
                                <button onClick={() => todoEdit(item.id, InputList[inputIndex].todo, InputList[inputIndex].dueDate, IsBlank[inputIndex].disabled)} style={buttonStyle}> Save </button>
                            </td>
                        </tr>
                    </>
                    :
                    <tr onDoubleClick={() => todoUpdate("isAction", true, item.id)}>
                        <td colSpan={2} style={tdStyle}>{item.todo}</td>
                        <td style={tdStyle}>{item.dueDate}</td>
                    </tr>

            })}
        </table>



    )
}

export default TodoBox
