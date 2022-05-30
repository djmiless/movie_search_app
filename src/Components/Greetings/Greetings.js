function Greetings(props){

    console.log(props);
    console.log(props.whatever)

    return (<div style={{ color: 'white'}}> 
                { props.whatever}
            </div>)




}

export default Greetings