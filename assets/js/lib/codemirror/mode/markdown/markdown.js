CodeMirror.defineMode("markdown",function(e,t){function L(e,t,n){t.f=t.inline=n;return n(e,t)}function A(e,t,n){t.f=t.block=n;return n(e,t)}function O(e){e.linkTitle=false;e.em=false;e.strong=false;e.quote=0;if(!n&&e.f==_){e.f=B;e.block=M}e.thisLineHasContent=false;return null}function M(e,n){var r=n.list!==false;if(n.list!==false&&n.indentationDiff>=0){if(n.indentationDiff<4){n.indentation-=n.indentationDiff}n.list=null}else if(n.list!==false&&n.indentation>0){n.list=null;n.listDepth=Math.floor(n.indentation/4)}else if(n.list!==false){n.list=false;n.listDepth=0}if(n.indentationDiff>=4){n.indentation-=4;e.skipToEnd();return a}else if(e.eatSpace()){return null}else if(e.peek()==="#"||n.prevLineHasContent&&e.match(C)){n.header=true}else if(e.eat(">")){n.indentation++;n.quote=1;e.eatSpace();while(e.eat(">")){e.eatSpace();n.quote++}}else if(e.peek()==="["){return L(e,n,F)}else if(e.match(S,true)){return d}else if((!n.prevLineHasContent||r)&&(e.match(x,true)||e.match(T,true))){n.indentation+=4;n.list=true;n.listDepth++;if(t.taskLists&&e.match(N,false)){n.taskList=true}}else if(t.fencedCodeBlocks&&e.match(/^```([\w+#]*)/,true)){n.localMode=s(RegExp.$1);if(n.localMode)n.localState=n.localMode.startState();A(e,n,D);return a}return L(e,n,n.inline)}function _(e,t){var i=r.token(e,t.htmlState);if(n&&i==="tag"&&t.htmlState.type!=="openTag"&&!t.htmlState.context){t.f=B;t.block=M}if(t.md_inside&&e.current().indexOf(">")!=-1){t.f=B;t.block=M;t.htmlState.context=undefined}return i}function D(e,t){if(e.sol()&&e.match(/^```/,true)){t.localMode=t.localState=null;t.f=B;t.block=M;return a}else if(t.localMode){return t.localMode.token(e,t.localState)}else{e.skipToEnd();return a}}function P(e){var t=[];if(e.taskOpen){return"meta"}if(e.taskClosed){return"property"}if(e.strong){t.push(E)}if(e.em){t.push(w)}if(e.linkText){t.push(y)}if(e.code){t.push(a)}if(e.header){t.push(u)}if(e.quote){t.push(e.quote%2?f:l)}if(e.list!==false){var n=(e.listDepth-1)%3;if(!n){t.push(c)}else if(n===1){t.push(h)}else{t.push(p)}}return t.length?t.join(" "):null}function H(e,t){if(e.match(k,true)){return P(t)}return undefined}function B(e,n){var r=n.text(e,n);if(typeof r!=="undefined")return r;if(n.list){n.list=null;return P(n)}if(n.taskList){var i=e.match(N,true)[1]!=="x";if(i)n.taskOpen=true;else n.taskClosed=true;n.taskList=false;return P(n)}n.taskOpen=false;n.taskClosed=false;var s=e.next();if(s==="\\"){e.next();return P(n)}if(n.linkTitle){n.linkTitle=false;var u=s;if(s==="("){u=")"}u=(u+"").replace(/([.?*+^$[\]\\(){}|-])/g,"\\$1");var a="^\\s*(?:[^"+u+"\\\\]+|\\\\\\\\|\\\\.)"+u;if(e.match(new RegExp(a),true)){return b}}if(s==="`"){var f=P(n);var l=e.pos;e.eatWhile("`");var c=1+e.pos-l;if(!n.code){o=c;n.code=true;return P(n)}else{if(c===o){n.code=false;return f}return P(n)}}else if(n.code){return P(n)}if(s==="!"&&e.match(/\[[^\]]*\] ?(?:\(|\[)/,false)){e.match(/\[[^\]]*\]/);n.inline=n.f=j;return v}if(s==="["&&e.match(/.*\](\(| ?\[)/,false)){n.linkText=true;return P(n)}if(s==="]"&&n.linkText){var h=P(n);n.linkText=false;n.inline=n.f=j;return h}if(s==="<"&&e.match(/^(https?|ftps?):\/\/(?:[^\\>]|\\.)+>/,true)){return L(e,n,U(m,">"))}if(s==="<"&&e.match(/^[^> \\]+@(?:[^\\>]|\\.)+>/,true)){return L(e,n,U(g,">"))}if(s==="<"&&e.match(/^\w/,false)){if(e.string.indexOf(">")!=-1){var p=e.string.substring(1,e.string.indexOf(">"));if(/markdown\s*=\s*('|"){0,1}1('|"){0,1}/.test(p)){n.md_inside=true}}e.backUp(1);return A(e,n,_)}if(s==="<"&&e.match(/^\/\w*?>/)){n.md_inside=false;return"tag"}var d=false;if(!t.underscoresBreakWords){if(s==="_"&&e.peek()!=="_"&&e.match(/(\w)/,false)){var y=e.pos-2;if(y>=0){var w=e.string.charAt(y);if(w!=="_"&&w.match(/(\w)/,false)){d=true}}}}var f=P(n);if(s==="*"||s==="_"&&!d){if(n.strong===s&&e.eat(s)){n.strong=false;return f}else if(!n.strong&&e.eat(s)){n.strong=s;return P(n)}else if(n.em===s){n.em=false;return f}else if(!n.em){n.em=s;return P(n)}}else if(s===" "){if(e.eat("*")||e.eat("_")){if(e.peek()===" "){return P(n)}else{e.backUp(1)}}}return P(n)}function j(e,t){if(e.eatSpace()){return null}var n=e.next();if(n==="("||n==="["){return L(e,t,U(b,n==="("?")":"]"))}return"error"}function F(e,t){if(e.match(/^[^\]]*\]:/,true)){t.f=I;return y}return L(e,t,B)}function I(e,t){if(e.eatSpace()){return null}e.match(/^[^\s]+/,true);if(e.peek()===undefined){t.linkTitle=true}else{e.match(/^(?:\s+(?:"(?:[^"\\]|\\\\|\\.)+"|'(?:[^'\\]|\\\\|\\.)+'|\((?:[^)\\]|\\\\|\\.)+\)))?/,true)}t.f=t.inline=B;return b}function R(e){if(!q[e]){e=(e+"").replace(/([.?*+^$[\]\\(){}|-])/g,"\\$1");q[e]=new RegExp("^(?:[^\\\\]|\\\\.)*?("+e+")")}return q[e]}function U(e,t,n){n=n||B;return function(r,i){r.match(R(t));i.inline=i.f=n;return e}}var n=CodeMirror.modes.hasOwnProperty("xml");var r=CodeMirror.getMode(e,n?{name:"xml",htmlMode:true}:"text/plain");var i={html:"htmlmixed",js:"javascript",json:"application/json",c:"text/x-csrc","c++":"text/x-c++src",java:"text/x-java",csharp:"text/x-csharp","c#":"text/x-csharp",scala:"text/x-scala"};var s=function(){var t,n={},r={},s;var o=[];for(var u in CodeMirror.modes)if(CodeMirror.modes.propertyIsEnumerable(u))o.push(u);for(t=0;t<o.length;t++){n[o[t]]=o[t]}var a=[];for(var u in CodeMirror.mimeModes)if(CodeMirror.mimeModes.propertyIsEnumerable(u))a.push({mime:u,mode:CodeMirror.mimeModes[u]});for(t=0;t<a.length;t++){s=a[t].mime;r[s]=a[t].mime}for(var f in i){if(i[f]in n||i[f]in r)n[f]=i[f]}return function(t){return n[t]?CodeMirror.getMode(e,n[t]):null}}();if(t.underscoresBreakWords===undefined)t.underscoresBreakWords=true;if(t.fencedCodeBlocks===undefined)t.fencedCodeBlocks=false;if(t.taskLists===undefined)t.taskLists=false;var o=0;var u="header",a="comment",f="atom",l="number",c="variable-2",h="variable-3",p="keyword",d="hr",v="tag",m="link",g="link",y="link",b="string",w="em",E="strong";var S=/^([*\-=_])(?:\s*\1){2,}\s*$/,x=/^[*\-+]\s+/,T=/^[0-9]+\.\s+/,N=/^\[(x| )\](?=\s)/,C=/^(?:\={1,}|-{1,})$/,k=/^[^!\[\]*_\\<>` "'(]+/;var q=[];return{startState:function(){return{f:M,prevLineHasContent:false,thisLineHasContent:false,block:M,htmlState:CodeMirror.startState(r),indentation:0,inline:B,text:H,linkText:false,linkTitle:false,em:false,strong:false,header:false,taskList:false,list:false,listDepth:0,quote:0}},copyState:function(e){return{f:e.f,prevLineHasContent:e.prevLineHasContent,thisLineHasContent:e.thisLineHasContent,block:e.block,htmlState:CodeMirror.copyState(r,e.htmlState),indentation:e.indentation,localMode:e.localMode,localState:e.localMode?CodeMirror.copyState(e.localMode,e.localState):null,inline:e.inline,text:e.text,linkTitle:e.linkTitle,em:e.em,strong:e.strong,header:e.header,taskList:e.taskList,list:e.list,listDepth:e.listDepth,quote:e.quote,md_inside:e.md_inside}},token:function(e,t){if(e.sol()){if(e.match(/^\s*$/,true)){t.prevLineHasContent=false;return O(t)}else{t.prevLineHasContent=t.thisLineHasContent;t.thisLineHasContent=true}t.header=false;t.taskList=false;t.code=false;t.f=t.block;var n=e.match(/^\s*/,true)[0].replace(/\t/g,"    ").length;var r=Math.floor((n-t.indentation)/4)*4;if(r>4)r=4;var i=t.indentation+r;t.indentationDiff=i-t.indentation;t.indentation=i;if(n>0)return null}return t.f(e,t)},blankLine:O,getType:P}},"xml");CodeMirror.defineMIME("text/x-markdown","markdown")