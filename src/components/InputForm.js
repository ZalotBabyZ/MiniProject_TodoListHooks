import React from 'react'

function InputForm(props) {
    const { id, dataBox, type, value, placeholder, onChangeInput, width,fontSize} = props;

    return (
        <div>
            <input
                id={id}
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={(e) => onChangeInput(e, id, dataBox)}
                style={{ fontSize: fontSize,width: width, height: "20px", margin: "5px", color: "#c39e9e", border: "#c39e9e 2px dashed" }}
            />
        </div>
    )
}

export default InputForm
