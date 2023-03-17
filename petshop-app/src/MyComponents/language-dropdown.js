

const Languageoption =(props) =>{
    return(
        <div style={{marginTop:"100px"}}>
        <select onChange={props.onChange}>
        <option value={"en"}>English</option>
        <option value={"chi"}>Chaina</option>
        <option value={"hin"}>Hindi</option>
      </select>
      </div>
        

    )
}
export default Languageoption;