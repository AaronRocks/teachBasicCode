// this is the first and most basic level of the game
// introduces users to working with JS
const Intro2 = () =>{
    let h1 = `<h1></h1>`;
    let p = '<p></p>'
    return (
        <div>
            <h2>Learning about HTML (<i>Hypertransfer Markup Language</i>)</h2>
            <h3>This page is made up of elements of different sizes</h3>
            <h4>In this exersize we'll learn about creating HTML Elements.</h4>
            <p>Simply put, there if a variable is a container for information in code,
                an element on a website page is a containter for the webpage. Unlike for variables,
                the boxes for website elements come in a much wider range of sizes. These boxes, like their
                physical counterparts can be stacked in one another. A basic tag would be a header tag.
                Most tags have something that opens it, and then another one to close it (kind of like a boxe 
                with a lid). An example would be {h1}. While there are many types of h tags, the most common are
                h1 - h5. smaller than that and a paragraph tag {p} is larger.
            </p>
            <h5>Now you try it. Create a container that has the phrase "Hello World" in it.</h5>
        </div>
    )
};

class IntroUser2 extends React.Component {
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
        let myVariable = (this.state.myVar).toString().trim().toLowerCase();
        let ending = false;
        if (myVariable.includes('<h' )&& myVariable.includes('</h')){
            let userVarArray = myVariable.split('>');
            let userVar = userVarArray[1];
            if (userVar.includes("hello") && userVar.includes("world"))
            if (userVar){
                // they did it
                ending = true;
            }
        }
        createEnding2(ending);
    }

    render() {
        return (
            <div id="workspace">
                <input id="answer" type='text' value={this.state.myVar} onChange={this.handleVarChange}/>
                <button onClick={this.runVar}>Run Code</button>
                <p id='card'>{this.state.myVar}</p>
            </div>
        );
    };
}

const Ending2 = (end) =>{
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

const createEnding2 = (ending) => {
    ReactDOM.render(
        <Ending2 end={ending}/>,
        document.querySelector("#ending")
    );
}

const createLevel2 = () =>{
    ReactDOM.render(
        <Intro2 />,
        document.querySelector("#intro")
    );

    ReactDOM.render(
        <IntroUser2 />,
        document.querySelector("#level")
    )
}
