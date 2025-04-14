const PersonForm = (props) => {
    return (
        <>
        <form onSubmit={props.addNewContact}>
            <div>
            name: <input value={props.newName} onChange={props.handleNameChange}/>
            </div>
            <div>
            number: <input value={props.newPhoneNum} onChange={props.handlePhoneNumChange}/>
            </div>
            <div>
            <button type="submit">add</button>
            </div>
        </form>
        </>
    )
}

export default PersonForm