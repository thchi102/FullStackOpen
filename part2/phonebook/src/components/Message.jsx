const Message = ({message, type}) => {

    const color = type === "success" ? 'green' : 'red'

    const style = {
        color: color,
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    if(message === null){
        return null
    }

    return (
        <div style={style}>
            {message}
        </div>
    )
}

export default Message