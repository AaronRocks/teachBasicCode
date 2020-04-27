const handleCharecter = (e) => {
    e.preventDefault();

    if ($("#charecterName").val() == ''){
        handleError("Name Required");
        return false;
    }

    sendAjax('POST', $("#charecterForm").attr('action'), $("#charecterForm").serialize(), function(){
        console.log('running');
        loadCharecterFromServer();
    });

    return false;
};

let currentCharecters = [];

const CharecterForm = (props) => {
    return (
        <form id='charecterForm'
            onSubmit={handleCharecter}
            action='/main'
            method='POST'
            className='charecterForm'
        >
            <label htmlFor='name'>Name: </label>
            <input id='charecterName' type='text' name='name' placeholder='Charecter Name' />
            <input type='hidden' name='_csrf' value={props.csrf} />
            <input className='makeCharecterSubmit' type='submit' value='Make Charecter' />
        </form>
    );
};

class CharecterContainer extends React.Component{
    constructor (props){
        super(props);

        this.state = {
            character: props.charecter,
        };
        this.loadCharecterFromServer = this.loadCharecterFromServer.bind(this);
        this.loadCharecterFromServer();
    }

    loadCharecterFromServer(){
        const xhr = new XMLHttpRequest();

        const setCharecters = () =>{
            const charecter =  JSON.parse(xhr.response);
            this.setState(charecter);
        }

        xhr.onload = setCharecters;
        xhr.open('GET', '/getCharecter');
        xhr.send();

    }

    render () {
        if (this.state.character.length === 0){
            return (
                <div>
                    <h3>No Charecters yet!</h3>
                </div>
            );
        }

        let increment = -1;

        const charecterList = this.state.character.map((charecter) => {
            increment++;
            currentCharecters.push(charecter);
            return (
                <option key={charecter._id} className='charecter' value={increment}>
                    Name: {charecter.name}
                </option>
            );
        });

        return (
            <div>
                <select className='charecter'>
                    <option>Default Value</option>
                    {charecterList}
                </select>
                <h2>Characeter Data</h2>
                {/* display individual character data if time */}
            </div>
        );
    }
}

const LevelWindow = () => {
    return (
    <div id='levels'>
        <div className='levelLink'><a href='/level1'>Level 1</a></div>
        <div className='levelLink'><a href='/level2'>Level 2</a></div>
        <div className='levelLink'><a href='/level3'>Level 3</a></div>
        <div className='levelLink'><a href='/level4'>Level 4</a></div>
    </div>
    )
}

const PlatinumHolder = () => {
    <div id='platinumLevels'>
        <div class='levelLink'><a href='/level5'>Level 5</a></div>
    </div>
}

const createCharacterWindow = (csrf, platinumLevel) =>{
    ReactDOM.render(
        <CharecterForm csrf={csrf}/>, document.querySelector("#createCharecter")
    );

    // run load of charecters already in server at launch time
    ReactDOM.render(
        <CharecterContainer charecter={[]} />,
            document.querySelector("#charecters")
    );

    ReactDOM.render(
        <LevelWindow />,
        document.querySelector("#levels")
    )
    // if user is platinum level, display extra levels
    if (platinumLevel){
        ReactDOM.render(
            <PlatinumHolder />,
            document.querySelector("#platinumLevels")
        )
    }
};

const setup = (csrf, platinumLevel) =>{

    // will call render for different windows depending on current pathname of the url

    // if main, display charecter creation and level select
    if (window.location.pathname === '/main'){
        createCharacterWindow(csrf);
    }
    // if change password, render change password form
    else if (window.location.pathname === '/changePass'){
        createChangePassWindow(csrf, platinumLevel);
    }
    // if any of the levels, render said level
    else if (window.location.pathname === '/level'){
        // do stuff
    }
    // otherwise, not recognized pathname so render 404 page
    else{
        // 404 page not found
    }

}

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        sendAjax('GET', '/platinum', null, (status)=> {
            setup(result.csrfToken, status);
        })
    });
};

$(document).ready(function () {
    getToken();
});