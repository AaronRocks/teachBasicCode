"use strict";

var handleCharacter = function handleCharacter(e) {
  e.preventDefault();

  if ($("#characterName").val() == '') {
    handleError("All fields are required");
    return false;
  }

  sendAjax('POST', $("#levelForm").attr('action'), $("#levelForm").serialize(), function () {
    loadCharacterFromServer();
  });
  return false;
};

var CharacterForm = function CharacterForm(props) {
  return (/*#__PURE__*/React.createElement("div", {
      id: "characterForm",
      onSubmit: handleCharacter,
      action: "/main",
      method: "POST",
      className: "characterForm"
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

var CharacterList = function CharacterList(props) {
  if (props.character.length === 0) {
    return (/*#__PURE__*/React.createElement("div", {
        className: "characterList"
      }, /*#__PURE__*/React.createElement("h3", {
        className: "emptyCharacter"
      }, "No characters Yet"))
    );
  }

  var characterNodes = props.character.map(function (character) {
    return (/*#__PURE__*/React.createElement("div", {
        key: character._id,
        className: "character"
      }, /*#__PURE__*/React.createElement("h3", {
        className: "characterName"
      }, "Name: ", character.name))
    );
  });
  return (/*#__PURE__*/React.createElement("div", {
      className: "characterList"
    }, characterNodes)
  );
};

var loadCharacterFromServer = function loadCharacterFromServer() {
  sendAjax('GET', '/getCharacter', null, function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(CharacterList, {
      character: data.character
    }), document.querySelector("#character"));
  });
};

var loadLevelsFromServer = function loadLevelsFromServer() {
  sendAjax('GET', '/getLevel', null, function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(CharacterList, {
      character: data.character
    }), document.querySelector("#character"));
  });
};

var setup = function setup(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(CharacterForm, {
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
