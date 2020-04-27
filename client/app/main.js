let currentCharecters = [];

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
                    {charecter.name}
                    {/* <option>{charecter.name}: LV - {charecter.level}, XP - {charecter.xp}</option> */}
                </option>
            );
        });

        return (
            <div>
                <select className='charecter'>
                    <option>Default Value</option>
                    {charecterList}
                </select>
                {/*<h2>Characeter Data</h2>
                 display individual character data if time */}
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

const handleUpgrade = (e)=>{
    e.preventDefault();

    if ($("#userFirstName").val() == '' || $("#userLastName").val() == ''){
        handleError("Fist and Last Names Required");
        return false;
    }

    if ($("#creditNumber").val() <=999999999999999 ){
        handleError("Full Credit Card Number Requid");
        return false;
    }

    if ($("#cvcnumber").val() <=99 ){
        handleError("cvc Number Requid");
        return false;
    }

    sendAjax('POST', $("#upgradeForm").attr('action'), $("#upgradeForm").serialize(), function(){
        console.log('running');
    });

    return false;    
}

const GoPlatinum = (props) => {
   return ( <form id="upgradeForm"
    onSubmit={handleUpgrade}
    action='/upgrade'
    method='POST'
    >
    <label htmlFor='name'>First Name: </label>
    <input id='userFirstName' type='text' name='name' placeholder='First Name' />
    <label htmlFor='name'>Last Name: </label>
    <input id='userLastName' type='text' name='name' placeholder='Last Name' />
    <label htmlFor='name'>Credit Card Number: </label>
    <input id='creditNumber' type='number' name='name' placeholder='0000 0000 0000 0000' />
    <label htmlFor='name'>cvc: </label>
    <input id='cvcnumber' type='number' name='name' placeholder='000' />
    <input type='hidden' name='_csrf' value={props.csrf} />
    <input className='upgradeSubmit' type='submit' value='Upgrade to PLatinum' />
</form>);
}

const createCharacterWindow = (csrf/*, platinumLevel*/) =>{
    ReactDOM.render(
        <GoPlatinum csrf={csrf} />,
        document.querySelector("#platinum")
    );

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
    // if (platinumLevel){
    //     ReactDOM.render(
    //         <PlatinumHolder />,
    //         document.querySelector("#platinumLevels")
    //     )
    // }
};

const setup = (csrf /*, platinumLevel*/) =>{

    // will call render for different windows depending on current pathname of the url

    // if main, display charecter creation and level select
    if (window.location.pathname === '/main'){
        createCharacterWindow(csrf);
    }
    // if change password, render change password form
    else if (window.location.pathname === '/changePass'){
        createChangePassWindow(csrf/*, platinumLevel*/);
    }
    // if any of the levels, render said level
    else if (window.location.pathname === '/level1'){
        // do stuff
    }
    // otherwise, not recognized pathname so render 404 page
    else{
        // 404 page not found
        createStatic404Page();
    }

}

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        // sendAjax('GET', '/platinum', null, (status)=> {
        //     setup(result.csrfToken, status);
        // })
        setup(result.csrfToken);
    });
};

$(document).ready(function () {
    getToken();
});