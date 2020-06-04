"use strict";var teams={bw:{captain:{firstName:"Winfried",lastName:"Kretschmann"},state:"Baden-Württemberg",img:"kretschmann.png"},by:{captain:{firstName:"Markus",lastName:"Söder"},state:"Bayern",img:"soeder.png"},be:{captain:{firstName:"Michael",lastName:"Müller"},state:"Berlin",img:"mueller.png"},bb:{captain:{firstName:"Dietmar",lastName:"Woidke"},state:"Brandenburg",img:"woidke.png"},hb:{captain:{firstName:"Andreas",lastName:"Bovenschulte"},state:"Bremen",img:"bovenschulte.png"},hh:{captain:{firstName:"Peter",lastName:"Tschentscher"},state:"Hamburg",img:"tschentscher.png"},he:{captain:{firstName:"Volker",lastName:"Bouffier"},state:"Hessen",img:"bouffier.png"},mv:{captain:{firstName:"Manuela",lastName:"Schwesig"},state:"Mecklenburg-Vorpommern",img:"schwesig.png"},ni:{captain:{firstName:"Stephan",lastName:"Weil"},state:"Niedersachsen",img:"weil.png"},nw:{captain:{firstName:"Armin",lastName:"Laschet"},state:"Nordrhein-Westfalen",img:"laschet.png"},rp:{captain:{firstName:"Malu",lastName:"Dreyer"},state:"Rheinland-Pfalz",img:"dreyer.png"},sl:{captain:{firstName:"Tobias",lastName:"Hans"},state:"Saarland",img:"hans.png"},sn:{captain:{firstName:"Michael",lastName:"Kretschmer"},state:"Sachsen",img:"kretschmer.png"},st:{captain:{firstName:"Reiner",lastName:"Haseloff"},state:"Sachsen-Anhalt",img:"haseloff.png"},sh:{captain:{firstName:"Daniel",lastName:"Günther"},state:"Schleswig-Holstein",img:"guenther.png"},th:{captain:{firstName:"Bodo",lastName:"Ramelow"},state:"Thüringen",img:"ramelow.png"}};!function(){function l(e,t){return Math.random()*(t-e)+e}var t=function(){for(var e=[],t=16,a=0;t--;)a+=l(2e3,2500),e.push(a);return e}();function u(i,m,o){var e=t[Math.floor(Math.random()*t.length)];setTimeout(function(){var e,t,a=(e=i,(t=document.createElement("img")).classList.add("floating-head"),t.setAttribute("src",e),t);m.appendChild(a);var n=a.clientHeight,r=a.clientWidth,s=l(n/2,o.h-Math.round(1.5*n)),c=o.w+r;a.style.top=s+"px",a.style.left=-r+"px",a.style.transform="translate(".concat(c,"px, 0)"),a.style.transition="all ".concat(2e4,"ms linear"),setTimeout(function(){m.removeChild(a),u(i,m,o)},2e4)},e)}!function(e){for(var t=document.querySelector(".hero"),a={w:t.clientWidth,h:t.clientHeight},n=Object.values(teams),r=0,s=n.length;r<s;r++){u(e+n[r].img,t,a)}}(document.getElementById("path-helper").src.replace("1x1.png",""))}(),function(){var t=[{title:"Runde 1",matches:[{number:1,team1:"sh",team2:"st"},{number:2,team1:"hb",team2:"mv"},{number:3,team1:"rp",team2:"he"},{number:4,team1:"be",team2:"bb"},{number:5,team1:"nw",team2:"ni"},{number:6,team1:"sn",team2:"by"},{number:7,team1:"hh",team2:"bw"},{number:8,team1:"sl",team2:"th"}]},{title:"Runde 2",matches:[]},{title:"Halbfinale",matches:[]},{title:"Finale",matches:[]}],n="/tippspiel/",r="fds_meisterschaften_2020_";function s(t,e){var a=new XMLHttpRequest;a.open(e?"POST":"GET",n,!0),e&&(a.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8"),a.setRequestHeader("X-CSRFToken",document.querySelector("[name=csrfmiddlewaretoken]").value)),a.setRequestHeader("X-Requested-With","XMLHttpRequest"),a.onload=function(){if(200<=this.status&&this.status<400){var e=JSON.parse(this.response);t(e)}else window.alert("Error")},a.onerror=function(){window.alert("Error")},a.send(e)}var c="img/",i=!1,m="",o={},l=!1,u=1;function a(e){e.preventDefault();var t=this.dataset.team,a=this.dataset.match;if(i){if(!o[r+"name"]){var n=window.prompt("Unter welchem Namen möchten Sie in der Tipp-Tabelle erscheinen? Durch die Eingabe stimmen Sie unseren Teilnahmebedingungen zu.",m);if(null===n)return;o[r+"name"]=n.substr(0,50)}l?window.alert("Ihre letzte Aktion wird noch verarbeitet."):(o[r+a]=t,p(a,l=!0),s(function(e){o=e.user||{},p(a,l=!1)},"match=".concat(a,"&bet=").concat(t,"&name=").concat(encodeURIComponent(o[r+"name"]))))}else window.alert("Sie müssen eingeloggt sein, um am Tippspiel teilzunehmen.")}function h(){g.innerHTML='\n      <div class="tournament-bracket tournament-bracket--rounded">\n        '.concat(function(e){for(var t="",a=0,n=e.length;a<n;a++)t+=(r=e[a],'\n    <div class="tournament-bracket__round">\n      <h3 class="tournament-bracket__round-title">'.concat(r.title,"</h3>\n      ").concat(r.matches&&0<r.matches.length?'\n      <ul class="tournament-bracket__list">\n        '.concat(function(e){for(var t=[],a=0,n=e.length;a<n;a++)t.push((r=e[a],0,s=teams[r.team1],c=teams[r.team2],'\n    <li class="tournament-bracket__item">\n      <div class="tournament-bracket__match" tabindex="0">\n        <table class="tournament-bracket__table">\n          <tbody class="tournament-bracket__content">\n            '.concat(d(r.team1,s,"team1"===r.winner,r),"\n            ").concat(d(r.team2,c,"team2"===r.winner,r),"\n          </tbody>\n        </table>\n      </div>\n    </li>\n    ")));var r,s,c;return t.join("")}(r.matches),"\n      </ul>\n      "):"","\n    </div>\n    "));var r;return t}(t),"\n      </div>\n      ");var e=g.querySelectorAll(".tournament-bracket__tip a");Array.from(e).forEach(function(e){e.addEventListener("click",a)})}function d(e,t,a,n){var r=n.number,s="".concat(t.captain.firstName," ").concat(t.captain.lastName," (").concat(t.state,")");return'\n    <tr class="tournament-bracket__team">\n      <td class="tournament-bracket__image" title="'.concat(s,'"><img src="').concat(c).concat(t.img,'"></td>\n      <td class="tournament-bracket__label" title="').concat(s,'">\n        <span class="tournament-bracket__name">\n          ').concat(n.request?'<a href="/a/'.concat(n.request,'">'):"","\n          ").concat(t.captain.firstName.charAt(0),". ").concat(t.captain.lastName,"\n          ").concat(n.request?"</a>":"",'\n        </span>&nbsp;<span class="tournament-bracket__token" title="').concat(t.state,'">(').concat(e,')</span>\n      </td>\n      <td class="tournament-bracket__result" title="Gewinner">').concat(a?"🏆️&nbsp;":"",'</td>\n      <td class="tournament-bracket__tip">\n        ').concat(u<=r?'<a href="#" data-team="'.concat(e,'" data-match="').concat(r,'">').concat(f(e,r,!0),"</a>"):f(e,r,!1),"\n      </td>\n    </tr>\n    ")}function p(t,a){var e=g.querySelectorAll('.tournament-bracket__tip a[data-match="'.concat(t,'"]'));Array.from(e).forEach(function(e){e.innerHTML=a?'<i class="fa fa-spinner" aria-hidden="true"></i>':f(e.dataset.team,t,!0)})}function f(e,t,a){if(o&&o[r+t]===e)return'<i class="fa fa-star" aria-hidden="true"></i>';return a?'<i class="fa fa-star-o" aria-hidden="true"></i>':""}t.forEach(function(e){0<e.matches.length&&(u=e.matches[0].number)});var e,g=document.getElementById("tournament-visual");e=document.getElementById("path-helper"),c=e.src.replace("1x1.png",""),(i=null!==document.getElementById("userDropdownMenu"))&&(m=document.querySelector("#userDropdownMenu span").textContent),i?s(function(e){o=e.user||{},h()}):h()}();
//# sourceMappingURL=main.js.map
