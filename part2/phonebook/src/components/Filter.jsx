const Filter = ({filterName, handleFilterName}) => {
    return (
        <>
        Filter shown with <input value={filterName} onChange={handleFilterName}/>
        </>
    )

}

export default Filter