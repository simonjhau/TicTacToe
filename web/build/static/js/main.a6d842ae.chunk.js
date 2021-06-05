(this["webpackJsonpreact-tic-tac-toe"]=this["webpackJsonpreact-tic-tac-toe"]||[]).push([[0],{17:function(A,e,t){},27:function(A,e,t){},34:function(A,e,t){"use strict";t.r(e);var n=t(1),r=t.n(n),s=t(21),c=t.n(s),a=(t(27),t(8)),o=t(0),u=function(){return Object(o.jsx)("nav",{className:"navbar",children:Object(o.jsx)(a.b,{to:"/",children:Object(o.jsx)("h1",{children:"Tic Tac Toe"})})})},i=function(){return Object(o.jsxs)("div",{className:"home",children:[Object(o.jsx)(a.b,{to:"local-game",children:Object(o.jsx)("button",{children:"Local Game"})}),Object(o.jsx)(a.b,{to:"online-game",children:Object(o.jsx)("button",{children:"Online Game"})}),Object(o.jsx)(a.b,{to:"experiment",children:Object(o.jsx)("button",{children:"Experiment"})})]})},l=t(4),b=function(A){var e=A.apiUrl,t=A.setGameData,r=A.setGameInfo,s=Object(n.useState)(""),c=Object(l.a)(s,2),a=c[0],u=c[1];return Object(o.jsxs)("form",{className:"join-game",onSubmit:function(A){A.preventDefault(),a?fetch("".concat(e,"/").concat(a),{method:"PATCH"}).then((function(A){return A.json()})).then((function(A){t(A.game),r("")})).catch((function(A){r("Unable to join game ".concat(a))})):r("Please enter the ID of game you wish to join")},children:[Object(o.jsxs)("label",{children:["Game ID:",Object(o.jsx)("input",{type:"text",name:"name",maxLength:"5",onInput:function(A){A.target.value=A.target.value.toUpperCase(),u(A.target.value)}})]}),Object(o.jsx)("input",{type:"submit",value:"Join Game"})]})},j=(t(17),function(A){var e=A.onClick,t=A.value;return Object(o.jsx)("button",{className:"square",onClick:e,children:t})}),d=function(A){var e=A.squares,t=A.onClick,n=function(A){return Object(o.jsx)(j,{value:e[A],onClick:function(){return t(A)}},A)},r=function(A){for(var e=[],t=0;t<3;t++)e.push(n(3*A+t));return Object(o.jsx)("div",{className:"board-row",children:e},"row"+A)};return Object(o.jsx)("div",{children:function(){for(var A=[],e=0;e<3;e++)A.push(r(e));return Object(o.jsx)("div",{children:A})}()})},h="http://192.168.0.11:5000/api/game",f="not-started",v="joining",O="waiting",m="playing",g=function(){var A=Object(n.useState)(f),e=Object(l.a)(A,2),t=e[0],r=e[1],s=Object(n.useState)({id:"",ip1:"",ip2:"",history:[{squares:Array(9).fill(null)}],moveNum:0,timeLastUpdate:null}),c=Object(l.a)(s,2),a=c[0],u=c[1],i=Object(n.useState)(!1),j=Object(l.a)(i,2),g=j[0],x=j[1],p=Object(n.useState)(null),C=Object(l.a)(p,2),B=C[0],N=C[1],D=Object(n.useRef)(""),y=Object(n.useState)(""),X=Object(l.a)(y,2),P=X[0],H=X[1],q=Object(n.useState)(0),T=Object(l.a)(q,2),V=T[0],M=T[1];Object(n.useEffect)((function(){var A=setInterval((function(){!B&&a.id&&fetch("".concat(h,"/").concat(a.id),{method:"GET"}).then((function(A){return A.json()})).then((function(A){u(A),M(0)})).catch((function(A){console.log(A),M(V+1)}))}),500);if(0===V){if(!a.id)return r(f),function(){return clearInterval(A)};if(!a.ip2)return r(O),function(){return clearInterval(A)};r(m);var e=w(a.history[a.moveNum].squares.slice());if(e)return N(),console.log("wonnn",e),H("".concat(e," has won!")),function(){return clearInterval(A)};"X"===D.current&&a.moveNum%2===0||"O"===D.current&&a.moveNum%2===1?(x(!0),H("Your turn!")):(x(!1),H("Waiting for opponent to move..."))}else H("Attempting to reconnect to server..."),V>20&&H("Lost server connection... Please create a new game");return function(){return clearInterval(A)}}),[a,D,B,V]);return Object(o.jsxs)("div",{className:"online-game",children:[Object(o.jsxs)("div",{className:"online-game-setup",children:[t===f&&Object(o.jsxs)("div",{children:[Object(o.jsx)("button",{onClick:function(){H(""),fetch(h,{method:"POST"}).then((function(A){return A.json()})).then((function(A){r(O),u(A.game),D.current="X",x(!0),H("Waiting for opponent to join")})).catch((function(A){H("Unable to create new game... Please try again later")}))},children:"Create New Game"}),Object(o.jsx)("button",{onClick:function(){H(""),r(v),D.current="O",x(!1)},children:"Join Game"})]}),t===v&&Object(o.jsx)(b,{apiUrl:h,setGameData:u,setGameState:r,setGameInfo:H})]}),Object(o.jsx)("div",{children:(t===O||t===m)&&Object(o.jsxs)("div",{children:[Object(o.jsxs)("h1",{children:["Game Code: ",a.id]}),t===m&&Object(o.jsxs)("div",{children:[Object(o.jsx)("br",{}),Object(o.jsx)(d,{squares:a.history[a.history.length-1].squares,onClick:function(A){return function(A){var e=a,t=e.history[e.moveNum].squares.slice();if(!w(t)&&!t[A]&&g){t[A]=D.current;var n={squares:t,moveNum:a.moveNum+1};fetch("".concat(h,"/").concat(a.id),{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)}).then((function(A){return A.json()})).then((function(A){u(A.game)})).catch((function(A){return console.log(A)}))}}(A)}})]}),Object(o.jsxs)("div",{children:[Object(o.jsx)("br",{}),Object(o.jsx)("h2",{children:P})]})]})})]})};function w(A){for(var e=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]],t=0;t<e.length;t++){var n=Object(l.a)(e[t],3),r=n[0],s=n[1],c=n[2];if(A[r]&&A[r]===A[s]&&A[r]===A[c])return A[r]}return null}var x=t(10),p=t(11),C=t(13),B=t(12),N=function(A){Object(C.a)(t,A);var e=Object(B.a)(t);function t(A){var n;return Object(x.a)(this,t),(n=e.call(this,A)).mouseLeave=function(){n.setState({hover:!1}),n.setState({backgroundColor:"#fff"})},n.mouseEnter=function(){var A;A="blue"===n.props.player?"#a9f2f5":"#f5ada9",n.setState({hover:!0,backgroundColor:A})},n.toggleBackgroundColor=function(){"blue"===n.props.player?n.setState({backgroundColor:"#f5ada9"}):n.setState({backgroundColor:"#a9f2f5"})},n.state={hover:!1,backgroundColor:"white"},n}return Object(p.a)(t,[{key:"render",value:function(){var A=this;return Object(o.jsx)("button",{style:{backgroundColor:this.state.backgroundColor},className:"square a"+this.props.id,onClick:function(){A.props.onClick(),A.toggleBackgroundColor()},onMouseEnter:this.mouseEnter,onMouseLeave:this.mouseLeave,children:this.props.value})}}]),t}(r.a.Component),D=function(A){Object(C.a)(t,A);var e=Object(B.a)(t);function t(){var A;Object(x.a)(this,t);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(A=e.call.apply(e,[this].concat(r))).renderRow=function(e){for(var t=[],n=0;n<3;n++)t.push(A.renderSquare(3*e+n));return Object(o.jsx)("div",{className:"board-row",children:t},"row"+e)},A.renderGrid=function(){for(var e=[],t=0;t<3;t++)e.push(A.renderRow(t));return Object(o.jsx)("div",{children:e})},A}return Object(p.a)(t,[{key:"renderSquare",value:function(A){var e=this;return Object(o.jsx)(N,{id:A,player:this.props.player,value:this.props.squares[A],onClick:function(){return e.props.onClick(A)}},A)}},{key:"render",value:function(){return Object(o.jsx)("div",{children:this.renderGrid()})}}]),t}(r.a.Component);function y(A){for(var e=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]],t=0;t<e.length;t++){var n=Object(l.a)(e[t],3),r=n[0],s=n[1],c=n[2];if(A[r]&&A[r]===A[s]&&A[r]===A[c])return A[r]}return null}var X=function(A){Object(C.a)(t,A);var e=Object(B.a)(t);function t(A){var n;return Object(x.a)(this,t),(n=e.call(this,A)).sort=function(){var A=!n.state.sortDesc;n.setState({sortDesc:A})},n.state={history:[{squares:Array(9).fill(null)}],stepNumber:0,bIsNext:!0,moveHistory:[null],sortDesc:!1},n}return Object(p.a)(t,[{key:"handleClick",value:function(A){var e=this.state.history.slice(0,this.state.stepNumber+1),t=this.state.moveHistory.slice(0,this.state.stepNumber+1),n=e[this.state.stepNumber].squares.slice();if(!y(n)&&!n[A]){var r=Math.floor(10*Math.random());n[A]=r<5?"X":"O",this.setState({history:e.concat([{squares:n}]),stepNumber:e.length,bIsNext:!this.state.bIsNext,moveHistory:t.concat(A)})}}},{key:"jumpTo",value:function(A){A>=0&&this.setState({stepNumber:A,bIsNext:A%2===0})}},{key:"render",value:function(){var A,e,t=this,n=this.state.history[this.state.stepNumber];return y(n.squares)?A=this.state.bIsNext?"Red wins!":"Blue wins!":this.state.stepNumber<9?(A="Next player: "+(this.state.bIsNext?"Blue":"Red"),e=this.state.bIsNext?"blue":"red"):A="It's a draw",Object(o.jsx)("div",{className:"game-box",children:Object(o.jsxs)("div",{className:"game",children:[Object(o.jsx)("div",{className:"game-board",children:Object(o.jsx)(D,{squares:n.squares,player:e,onClick:function(A){return t.handleClick(A)}})}),Object(o.jsxs)("div",{className:"game-info",children:[Object(o.jsx)("div",{style:{color:e},children:A}),Object(o.jsx)("img",{style:{width:"30px"},src:"data:image/png;base64,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",alt:"Undo",onClick:function(){return t.jumpTo(t.state.stepNumber-1)}})]})]})})}}]),t}(r.a.Component);function P(A){for(var e=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]],t=0;t<e.length;t++){var n=Object(l.a)(e[t],3),r=n[0],s=n[1],c=n[2];if(A[r]&&A[r]===A[s]&&A[r]===A[c])return A[r]}return null}var H=function(A){Object(C.a)(t,A);var e=Object(B.a)(t);function t(A){var n;return Object(x.a)(this,t),(n=e.call(this,A)).sort=function(){var A=!n.state.sortDesc;n.setState({sortDesc:A})},n.state={history:[{squares:Array(9).fill(null)}],stepNumber:0,xIsNext:!0,moveHistory:[null],sortDesc:!1},n}return Object(p.a)(t,[{key:"handleClick",value:function(A){var e=this.state.history.slice(0,this.state.stepNumber+1),t=this.state.moveHistory.slice(0,this.state.stepNumber+1),n=e[this.state.stepNumber].squares.slice();P(n)||n[A]||(n[A]=this.state.xIsNext?"X":"O",this.setState({history:e.concat([{squares:n}]),stepNumber:e.length,xIsNext:!this.state.xIsNext,moveHistory:t.concat(A)}),console.log(this.state.history))}},{key:"jumpTo",value:function(A){this.setState({stepNumber:A,xIsNext:A%2===0})}},{key:"render",value:function(){var A,e=this,t=this.state.history,n=t[this.state.stepNumber],r=P(n.squares),s=t.map((function(A,t){var n=t%2===1?"X":"O",r=e.state.moveHistory[t],s=Math.floor(r/3+1),c=t?"Go to move #"+t+" ("+n+": ("+s+","+(r%3+1)+"))":"Go to game start";return t>0&&t===e.state.stepNumber?Object(o.jsx)("li",{value:t+1,children:Object(o.jsx)("button",{onClick:function(){return e.jumpTo(t)},children:Object(o.jsx)("strong",{children:c})})},t):Object(o.jsx)("li",{value:t+1,children:Object(o.jsx)("button",{onClick:function(){return e.jumpTo(t)},children:c})},t)})),c="Sort Decending";return this.state.sortDesc&&(s.reverse(),c="Sort Ascending"),A=r?"Winner: "+r:this.state.stepNumber<9?"Next player: "+(this.state.xIsNext?"X":"O"):"It's a draw",Object(o.jsx)("div",{className:"game-box",children:Object(o.jsxs)("div",{className:"game",children:[Object(o.jsx)("div",{className:"game-board",children:Object(o.jsx)(d,{squares:n.squares,onClick:function(A){return e.handleClick(A)}})}),Object(o.jsxs)("div",{className:"game-info",children:[Object(o.jsx)("div",{children:A}),Object(o.jsx)("button",{onClick:function(){return e.sort()},children:c}),Object(o.jsx)("ol",{children:s})]})]})})}}]),t}(r.a.Component),q=t(2),T=function(){return Object(o.jsxs)("div",{className:"not-found",children:[Object(o.jsx)("h2",{children:"Sorry"}),Object(o.jsx)("p",{children:"Page cannot be found"}),Object(o.jsx)(a.b,{to:"/"})]})};var V=function(){return Object(o.jsx)(a.a,{children:Object(o.jsxs)("div",{className:"App",children:[Object(o.jsx)(u,{}),Object(o.jsx)("div",{className:"content",children:Object(o.jsxs)(q.c,{children:[Object(o.jsx)(q.a,{exact:!0,path:"/",children:Object(o.jsx)(i,{})}),Object(o.jsx)(q.a,{path:"/local-game",children:Object(o.jsx)(H,{})}),Object(o.jsx)(q.a,{path:"/online-game",children:Object(o.jsx)(g,{})}),Object(o.jsx)(q.a,{path:"/experiment",children:Object(o.jsx)(X,{})}),Object(o.jsx)(q.a,{path:"*",children:Object(o.jsx)(T,{})})]})})]})})};c.a.render(Object(o.jsx)(r.a.StrictMode,{children:Object(o.jsx)(V,{})}),document.getElementById("root"))}},[[34,1,2]]]);
//# sourceMappingURL=main.a6d842ae.chunk.js.map