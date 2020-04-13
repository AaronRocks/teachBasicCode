const handleDomo = (e) => {
    e.preventDefault();

    if ($("#domoName").val() == '' || $("#domoAge").val() == ''){
        handleError("All fields are required");
        return false;
    }

    sendAjax('POST', $("#levelForm").attr('action'), $("#levelForm").serialize(), function(){
        loadDomosFromServer();
    });

    return false;
};

const levelForm = (props) => {
    return (
        <form id='levelForm'
            onSubmit={handleDomo}
            action='/main'
            method='POST'
            className='levelForm'
        >
            <label htmlFor='name'>Name: </label>
            <input id='characterName' type='text' name='name' placeholder='Character Name' />
            <input type='hidden' name='_csrf' value={props.csrf} />
            <input className='makeCharSubmit' type='submit' value='Make Character' />
        </form>
    );
};


const setup = function(csrf){
    ReactDOM.render(
        <levelForm csrf={csrf}/>, document.querySelector("#mainLevel")
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