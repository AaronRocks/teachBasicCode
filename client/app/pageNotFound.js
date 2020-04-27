const Static404Page = () =>{
    return (
        <div id="notFound">
            <h1>The Page You Are Looking For Does Not Exist</h1>
            <h3>Click the 'game'  button above to return to the main app.</h3>
        </div>
    );
};

const createStatic404Page = () =>{
    ReactDOM.render(
        <Static404Page />,
        document.querySelector("#notFound")
    );
};