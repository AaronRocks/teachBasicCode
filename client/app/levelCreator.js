const handleCharacter = (e) => {
    e.preventDefault();

    if ($("#characterName").val() == ''){
        handleError("All fields are required");
        return false;
    }

    sendAjax('POST', $("#levelForm").attr('action'), $("#levelForm").serialize(), function(){
        loadCharacterFromServer();
    });

    return false;
};

const CharacterForm = (props) => {
    return (
        <div id='characterForm'
            onSubmit={handleCharacter}
            action='/main'
            method='POST'
            className='characterForm'
        >
            <label htmlFor='name'>Name: </label>
            <input id='characterName' type='text' name='name' placeholder='Character Name' />
            <input type='hidden' name='_csrf' value={props.csrf} />
            <input className='makeCharSubmit' type='submit' value='Make Character' />
        </div>
    );
};

const CharacterList = (props) => {
    if(props.character.length === 0) {
        return (
            <div className='characterList'>
                <h3 className='emptyCharacter'>No characters Yet</h3>
            </div>
        );
    }

    const characterNodes = props.character.map(function (character) {
        return (
            <div key={character._id} className='character'>
                <h3 className='characterName'>Name: {character.name}</h3>

            </div>
        );
    });

    return (
        <div className='characterList'>
            {characterNodes}
        </div>
    );
};


const loadCharacterFromServer = () => {
    sendAjax('GET', '/getCharacter', null, (data) => {
        ReactDOM.render(
            <CharacterList character={data.character} />,
            document.querySelector("#characters")
        );
    });
};

const loadLevelsFromServer = () => {
    sendAjax('GET', '/getLevel', null, (data)=> {
        ReactDOM.render(
            <CharacterList character={data.character} />,
            document.querySelector("#character")
        );
    })
};


const setup = function(csrf){
    ReactDOM.render(
        <CharacterForm csrf={csrf}/>, document.querySelector("#mainLevel")
    );

};

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

$(document).ready(function () {
    getToken();
});