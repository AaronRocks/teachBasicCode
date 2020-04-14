"use strict";

var handleCharacter = function handleCharacter(e) {
  e.preventDefault();

  if ($("#domoName").val() == '') {
    handleError("All fields are required");
    return false;
  }

  sendAjax('POST', $("#levelForm").attr('action'), $("#levelForm").serialize(), function () {
    loadDomosFromServer();
  });
  return false;
};

var levelForm = function levelForm(props) {
  return (/*#__PURE__*/React.createElement("div", {
      id: "levelForm" // onSubmit={handleCharacter}
      // action='/main'
      // method='POST'
      ,
      className: "levelForm"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "name"
    }, "Name: "), /*#__PURE__*/React.createElement("input", {
      id: "characterName",
      type: "text",
      name: "name",
      placeholder: "Character Name"
    }), /*#__PURE__*/React.createElement("input", {
      type: "hidden",
      name: "_csrf",
      value: props.csrf
    }), /*#__PURE__*/React.createElement("input", {
      className: "makeCharSubmit",
      type: "submit",
      value: "Make Character"
    }))
  );
};

var setup = function setup(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement("levelForm", {
    csrf: csrf
  }), document.querySelector("#mainLevel"));
};

var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    setup(result.csrfToken);
  });
};

$(document).ready(function () {
  getToken();
});
"use strict";

var handleError = function handleError(message) {
  $("#errorMessage").text(message);
};

var redirect = function redirect(response) {
  window.location = response.redirect;
};

var sendAjax = function sendAjax(type, action, data, success) {
  $.ajax({
    cache: false,
    type: type,
    url: action,
    data: data,
    dataType: "json",
    success: success,
    error: function error(xhr, status, _error) {
      var messageObj = JSON.parse(xhr.responseText);
      handleError(messageObj.error);
    }
  });
};
