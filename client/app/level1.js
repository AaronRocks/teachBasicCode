// this is the first and most basic level of the game
// introduces users to working with JS
const Intro = () =>{
    return (
        <div>
            <h2>Welcome to Javascript (<i>JS for short</i>)</h2>
            <h3>If you've codeded before, skip this leason and go to level 2.
                 Or try this for some easy XP and a brief recap</h3>
            <h4>In this exersize we'll learn about assigning values to variables.</h4>
            <p>Simply put, a variable is a container that holds whatever information you put in it. 
                In other languages, different types of variables are responsible for holding the different bits 
                of information. Normally, I would declare what my box is, and then put in the information corrosponing to that box type 
                ie. if I said 'int' I would be storing an intiger. JS is different. One box fits all here. 
                Instead of typing my variables, I can declare them with the simple expresion 'let'. For exapmple:
                let (name of your variable) = (value being stored);
                Now you try. Try assiagning a variable below.</p>
        </div>
    )
};

class IntroUser extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            myVar: '',
        };

        this.handleVarChange = this.handleVarChange.bind(this);
        this.runVar = this.runVar.bind(this);
    }

    handleVarChange(e) {
        this.setState({myVar: e.target.value});
    }

    runVar (){
        let myVariable = (this.state.myVar).toString().trim();
        let ending = false;
        if (myVariable.includes('=')){
            let userVarArray = myVariable.split('=');
            let userVar = userVarArray[1];
            if (userVar){
                // they did it
                ending = true;
            }
        }
        createEnding(ending);
    }

    render() {
        return (
            <div id="workspace">
                <p>let:</p>
                <input id="answer" type='text' value={this.state.myVar} onChange={this.handleVarChange}/>
                <button onClick={this.runVar}>Run Code</button>
                <p id='container'>{this.state.myVar}</p>
            </div>
        );
    };
}

const Ending = (end) =>{
    let text = '';
    if (end.end){
        text = 'You did it!'
    }
    else{
        text = 'Try Again!'
    }
    return (
        <div>
            <h3>{text}</h3>
        </div>
    )
}

const createEnding = (ending) => {
    ReactDOM.render(
        <Ending end={ending}/>,
        document.querySelector("#ending")
    );
}

const createLevel1 = () =>{
    ReactDOM.render(
        <Intro />,
        document.querySelector("#intro")
    );

    ReactDOM.render(
        <IntroUser />,
        document.querySelector("#level")
    )
}
