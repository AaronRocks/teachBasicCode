"use strict";

var handleChangePass = function handleChangePass(e) {
  e.preventDefault();

  if ($("#user").val() == '' || $("#pass").val() == '' || $("#newPass").val == '') {
    console.log('fill all fields');
    return false;
  }

  if ($("#pass").val() == $("#newPass").val()) {
    console.log('same password');
    return false;
  }

  sendAjax("POST", $("#signupForm").attr('action'), $("#signupForm").serialize(), redirect);
  return false;
};

var ChangePassWindow = function ChangePassWindow(props) {
  return (/*#__PURE__*/React.createElement("form", {
      id: "passForm",
      onSubmit: handleChangePass,
      action: "/changePass",
      method: "POST",
      className: "passForm"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "username"
    }, "Username: "), /*#__PURE__*/React.createElement("input", {
      id: "user",
      type: "text",
      name: "username",
      placeholder: "username"
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "pass"
    }, "Old Password: "), /*#__PURE__*/React.createElement("input", {
      id: "pass",
      type: "password",
      name: "pass",
      placeholder: "old password"
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "newPass"
    }, "New Password: "), /*#__PURE__*/React.createElement("input", {
      id: "newPass",
      type: "password",
      name: "newPass",
      placeholder: "new password"
    }), /*#__PURE__*/React.createElement("input", {
      type: "hidden",
      name: "_csrf",
      value: props.csrf
    }), /*#__PURE__*/React.createElement("input", {
      className: "formSubmit",
      type: "submit",
      value: "Change"
    }))
  );
};

var createChangePassWindow = function createChangePassWindow(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(ChangePassWindow, {
    csrf: csrf
  }), document.querySelector("#passForm"));
};
"use strict";
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var handleCharecter = function handleCharecter(e) {
  e.preventDefault();

  if ($("#charecterName").val() == '') {
    handleError("Name Required");
    return false;
  }

  sendAjax('POST', $("#charecterForm").attr('action'), $("#charecterForm").serialize(), function () {
    console.log('running');
    loadCharecterFromServer();
  });
  return false;
};

var currentCharecters = [];

var CharecterForm = function CharecterForm(props) {
  return (/*#__PURE__*/React.createElement("form", {
      id: "charecterForm",
      onSubmit: handleCharecter,
      action: "/main",
      method: "POST",
      className: "charecterForm"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "name"
    }, "Name: "), /*#__PURE__*/React.createElement("input", {
      id: "charecterName",
      type: "text",
      name: "name",
      placeholder: "Charecter Name"
    }), /*#__PURE__*/React.createElement("input", {
      type: "hidden",
      name: "_csrf",
      value: props.csrf
    }), /*#__PURE__*/React.createElement("input", {
      className: "makeCharecterSubmit",
      type: "submit",
      value: "Make Charecter"
    }))
  );
};

var CharecterContainer = /*#__PURE__*/function (_React$Component) {
  _inherits(CharecterContainer, _React$Component);

  function CharecterContainer(props) {
    var _this;

    _classCallCheck(this, CharecterContainer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CharecterContainer).call(this, props));
    _this.state = {
      character: props.charecter
    };
    _this.loadCharecterFromServer = _this.loadCharecterFromServer.bind(_assertThisInitialized(_this));

    _this.loadCharecterFromServer();

    return _this;
  }

  _createClass(CharecterContainer, [{
    key: "loadCharecterFromServer",
    value: function loadCharecterFromServer() {
      var _this2 = this;

      var xhr = new XMLHttpRequest();

      var setCharecters = function setCharecters() {
        var charecter = JSON.parse(xhr.response);

        _this2.setState(charecter);
      };

      xhr.onload = setCharecters;
      xhr.open('GET', '/getCharecter');
      xhr.send();
    }
  }, {
    key: "render",
    value: function render() {
      if (this.state.character.length === 0) {
        return (/*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", null, "No Charecters yet!"))
        );
      }

      var increment = -1;
      var charecterList = this.state.character.map(function (charecter) {
        increment++;
        currentCharecters.push(charecter);
        return (/*#__PURE__*/React.createElement("option", {
            key: charecter._id,
            className: "charecter",
            value: increment
          }, charecter.name)
        );
      });
      return (/*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("select", {
          className: "charecter"
        }, /*#__PURE__*/React.createElement("option", null, "Default Value"), charecterList))
      );
    }
  }]);

  return CharecterContainer;
}(React.Component);

var LevelWindow = function LevelWindow() {
  return (/*#__PURE__*/React.createElement("div", {
      id: "levels"
    }, /*#__PURE__*/React.createElement("div", {
      className: "levelLink"
    }, /*#__PURE__*/React.createElement("a", {
      href: "/level1"
    }, "Level 1")), /*#__PURE__*/React.createElement("div", {
      className: "levelLink"
    }, /*#__PURE__*/React.createElement("a", {
      href: "/level2"
    }, "Level 2")), /*#__PURE__*/React.createElement("div", {
      className: "levelLink"
    }, /*#__PURE__*/React.createElement("a", {
      href: "/level3"
    }, "Level 3")), /*#__PURE__*/React.createElement("div", {
      className: "levelLink"
    }, /*#__PURE__*/React.createElement("a", {
      href: "/level4"
    }, "Level 4")))
  );
};

var PlatinumHolder = function PlatinumHolder() {
  /*#__PURE__*/
  React.createElement("div", {
    id: "platinumLevels"
  }, /*#__PURE__*/React.createElement("div", {
    "class": "levelLink"
  }, /*#__PURE__*/React.createElement("a", {
    href: "/level5"
  }, "Level 5")));
};

var createCharacterWindow = function createCharacterWindow(csrf, platinumLevel) {
  ReactDOM.render( /*#__PURE__*/React.createElement(CharecterForm, {
    csrf: csrf
  }), document.querySelector("#createCharecter")); // run load of charecters already in server at launch time

  ReactDOM.render( /*#__PURE__*/React.createElement(CharecterContainer, {
    charecter: []
  }), document.querySelector("#charecters"));
  ReactDOM.render( /*#__PURE__*/React.createElement(LevelWindow, null), document.querySelector("#levels")); // if user is platinum level, display extra levels

  if (platinumLevel) {
    ReactDOM.render( /*#__PURE__*/React.createElement(PlatinumHolder, null), document.querySelector("#platinumLevels"));
  }
};

var setup = function setup(csrf
/*, platinumLevel*/
) {
  // will call render for different windows depending on current pathname of the url
  // if main, display charecter creation and level select
  if (window.location.pathname === '/main') {
    createCharacterWindow(csrf);
  } // if change password, render change password form
  else if (window.location.pathname === '/changePass') {
      createChangePassWindow(csrf
      /*, platinumLevel*/
      );
    } // if any of the levels, render said level
    else if (window.location.pathname === '/level') {} // do stuff
      // otherwise, not recognized pathname so render 404 page
      else {
          // 404 page not found
          createStatic404Page();
        }
};

var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    // sendAjax('GET', '/platinum', null, (status)=> {
    //     setup(result.csrfToken, status);
    // })
    setup(result.csrfToken);
  });
};

$(document).ready(function () {
  getToken();
});
"use strict";

var Static404Page = function Static404Page() {
  return (/*#__PURE__*/React.createElement("div", {
      id: "notFound"
    }, /*#__PURE__*/React.createElement("h1", null, "The Page You Are Looking For Does Not Exist"), /*#__PURE__*/React.createElement("h3", null, "Click the 'game'  button above to return to the main app."))
  );
};

var createStatic404Page = function createStatic404Page() {
  ReactDOM.render( /*#__PURE__*/React.createElement(Static404Page, null), document.querySelector("#notFound"));
};
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
