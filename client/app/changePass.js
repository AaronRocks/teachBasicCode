const handleChangePass = (e) =>{
    e.preventDefault();

    if ($("#user").val() == '' || $("#pass").val() == '' || $("#newPass").val == ''){
        console.log('fill all fields');
        return false;
    }

    if ($("#pass").val() == $("#newPass").val()){
        console.log('same password');
        return false;
    }

    sendAjax("POST", $("#signupForm").attr('action'), $("#signupForm").serialize(), redirect);

    return false;
};

const ChangePassWindow = (props) => {
    return (
        <form id='passForm'
            onSubmit={handleChangePass}
            action='/changePass'
            method='POST'
            className='passForm'
        >
            <label htmlFor='username'>Username: </label>
            <input id="user" type="text" name="username" placeholder="username"/>
            <label htmlFor="pass">Old Password: </label>
            <input id='pass' type="password" name="pass" placeholder="old password" />
            <label htmlFor="newPass">New Password: </label>
            <input id='newPass' type="password" name="newPass" placeholder="new password" />
            <input type="hidden" name="_csrf" value={props.csrf} />
            <input className="formSubmit" type="submit" value="Change" />
        </form>
    );
}

const createChangePassWindow = (csrf) => {
    ReactDOM.render(
        <ChangePassWindow csrf={csrf} />,
        document.querySelector("#passForm")
    );
};