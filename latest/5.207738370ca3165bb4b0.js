(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{zFlz:function(l,n,u){"use strict";u.r(n);var a=u("CcnG"),e=function(){},t=u("dJrM"),i=u("seP3"),o=u("Wf4p"),r=u("Fzqc"),c=u("dWZg"),s=u("wFw1"),d=u("gIcY"),p=u("b716"),f=u("/VYK"),b=u("bujt"),m=u("UodH"),g=u("lLAP"),h=u("6UMx"),v=u("0/Q6"),Y=u("Ip0R"),y=u("lzlj"),N=u("FVSy"),_=u("Oipj"),w=u("6233"),C=u("0HsO"),x=function(){function l(l,n,u){this.authService=l,this.db=n,this.calcService=u}return l.prototype.ngOnInit=function(){var l=this;this.subscription=this.authService.user.subscribe(function(n){l.user=n,l.db.list("bets").snapshotChanges().subscribe(function(n){l.db.list("match").snapshotChanges().subscribe(function(u){var a=[];u.forEach(function(n){var u=n.payload.val();l.scores=[],u.id=n.key,a.push(u)}),n.forEach(function(n){var u=[],e=n.payload.val();for(var t in e)if(e.hasOwnProperty(t)&&"displayName"!==t){var i=e[t];i.matchId=t,u.push(i)}var o=l.calcService.merge(a,u);l.calcService.calcResults(o);var r=0;o.forEach(function(l){l.point&&(r+=l.point)});var c=l.user&&n.key===l.user.uid;c&&(l.displayName=e.displayName),l.scores.push({rank:void 0,userName:e.displayName,score:r,isUser:c})}),l.scores.sort(function(l,n){return l.score===n.score?0:l.score>n.score?-1:1}),l.scores.forEach(function(l,n){l.rank=n+1});for(var e,t=function(n){var u=l.scores[n],a=!1;l.scores.filter(function(l){return l.score===u.score&&l.rank!==u.rank}).forEach(function(l,u,e){a=!0,delete l.rank,u<e.length-1&&delete l.score,n++}),a&&delete u.score,e=n},i=0;i<l.scores.length-1;i++)t(i),i=e})})})},l.prototype.ngOnDestroy=function(){this.subscription.unsubscribe()},l.prototype.submit=function(){return l=this,void 0,u=function(){var l;return function(l,n){var u,a,e,t,i={label:0,sent:function(){if(1&e[0])throw e[1];return e[1]},trys:[],ops:[]};return t={next:o(0),throw:o(1),return:o(2)},"function"==typeof Symbol&&(t[Symbol.iterator]=function(){return this}),t;function o(t){return function(o){return function(t){if(u)throw new TypeError("Generator is already executing.");for(;i;)try{if(u=1,a&&(e=a[2&t[0]?"return":t[0]?"throw":"next"])&&!(e=e.call(a,t[1])).done)return e;switch(a=0,e&&(t=[0,e.value]),t[0]){case 0:case 1:e=t;break;case 4:return i.label++,{value:t[1],done:!1};case 5:i.label++,a=t[1],t=[0];continue;case 7:t=i.ops.pop(),i.trys.pop();continue;default:if(!(e=(e=i.trys).length>0&&e[e.length-1])&&(6===t[0]||2===t[0])){i=0;continue}if(3===t[0]&&(!e||t[1]>e[0]&&t[1]<e[3])){i.label=t[1];break}if(6===t[0]&&i.label<e[1]){i.label=e[1],e=t;break}if(e&&i.label<e[2]){i.label=e[2],i.ops.push(t);break}e[2]&&i.ops.pop(),i.trys.pop();continue}t=n.call(l,i)}catch(l){t=[6,l],a=0}finally{u=e=0}if(5&t[0])throw t[1];return{value:t[0]?t[1]:void 0,done:!0}}([t,o])}}}(this,function(n){switch(n.label){case 0:return n.trys.push([0,2,,3]),[4,this.db.list("bets/"+this.user.uid).set("displayName",this.displayName)];case 1:return n.sent(),[3,3];case 2:return l=n.sent(),console.error(l),[3,3];case 3:return[2]}})},new((n=void 0)||(n=Promise))(function(a,e){function t(l){try{o(u.next(l))}catch(l){e(l)}}function i(l){try{o(u.throw(l))}catch(l){e(l)}}function o(l){l.done?a(l.value):new n(function(n){n(l.value)}).then(t,i)}o((u=u.apply(l,[])).next())});var l,n,u},l}(),O=a.Ma({encapsulation:0,styles:[[".mat-raised-button[_ngcontent-%COMP%]{max-width:100px;height:40px}.last[_ngcontent-%COMP%]{margin-bottom:20px}"]],data:{}});function k(l){return a.gb(0,[(l()(),a.Oa(0,0,null,null,1,"div",[["class","col-12 col-md-3"]],null,null,null,null,null)),(l()(),a.eb(1,null,["",""]))],null,function(l,n){l(n,1,0,n.parent.context.$implicit.userName)})}function W(l){return a.gb(0,[(l()(),a.Oa(0,0,null,null,18,"mat-form-field",[["class","col-12 col-md-3 mat-form-field"]],[[2,"mat-form-field-appearance-standard",null],[2,"mat-form-field-appearance-fill",null],[2,"mat-form-field-appearance-outline",null],[2,"mat-form-field-appearance-legacy",null],[2,"mat-form-field-invalid",null],[2,"mat-form-field-can-float",null],[2,"mat-form-field-should-float",null],[2,"mat-form-field-hide-placeholder",null],[2,"mat-form-field-disabled",null],[2,"mat-form-field-autofilled",null],[2,"mat-focused",null],[2,"mat-accent",null],[2,"mat-warn",null],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null],[2,"_mat-animation-noopable",null]],null,null,t.b,t.a)),a.Na(1,7389184,null,7,i.b,[a.k,a.h,[2,o.h],[2,r.b],[2,i.a],c.a,a.x,[2,s.a]],null,null),a.cb(335544320,3,{_control:0}),a.cb(335544320,4,{_placeholderChild:0}),a.cb(335544320,5,{_labelChild:0}),a.cb(603979776,6,{_errorChildren:1}),a.cb(603979776,7,{_hintChildren:1}),a.cb(603979776,8,{_prefixChildren:1}),a.cb(603979776,9,{_suffixChildren:1}),(l()(),a.Oa(9,0,null,1,9,"input",[["class","mat-input-element mat-form-field-autofill-control"],["matInput",""],["maxlength","30"],["name","displayName"],["placeholder","pseudo"]],[[1,"maxlength",0],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null],[2,"mat-input-server",null],[1,"id",0],[1,"placeholder",0],[8,"disabled",0],[8,"required",0],[8,"readOnly",0],[1,"aria-describedby",0],[1,"aria-invalid",0],[1,"aria-required",0]],[[null,"ngModelChange"],[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"],[null,"focus"]],function(l,n,u){var e=!0,t=l.component;return"input"===n&&(e=!1!==a.Ya(l,10)._handleInput(u.target.value)&&e),"blur"===n&&(e=!1!==a.Ya(l,10).onTouched()&&e),"compositionstart"===n&&(e=!1!==a.Ya(l,10)._compositionStart()&&e),"compositionend"===n&&(e=!1!==a.Ya(l,10)._compositionEnd(u.target.value)&&e),"blur"===n&&(e=!1!==a.Ya(l,17)._focusChanged(!1)&&e),"focus"===n&&(e=!1!==a.Ya(l,17)._focusChanged(!0)&&e),"input"===n&&(e=!1!==a.Ya(l,17)._onInput()&&e),"ngModelChange"===n&&(e=!1!==(t.displayName=u)&&e),e},null,null)),a.Na(10,16384,null,0,d.c,[a.C,a.k,[2,d.a]],null,null),a.Na(11,540672,null,0,d.f,[],{maxlength:[0,"maxlength"]},null),a.bb(1024,null,d.g,function(l){return[l]},[d.f]),a.bb(1024,null,d.h,function(l){return[l]},[d.c]),a.Na(14,671744,null,0,d.m,[[2,d.b],[6,d.g],[8,null],[6,d.h]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),a.bb(2048,null,d.i,null,[d.m]),a.Na(16,16384,null,0,d.j,[[4,d.i]],null,null),a.Na(17,999424,null,0,p.b,[a.k,c.a,[6,d.i],[2,d.l],[2,d.d],o.d,[8,null],f.a,a.x],{placeholder:[0,"placeholder"]},null),a.bb(2048,[[3,4]],i.c,null,[p.b])],function(l,n){var u=n.component;l(n,11,0,"30"),l(n,14,0,"displayName",u.displayName),l(n,17,0,"pseudo")},function(l,n){l(n,0,1,["standard"==a.Ya(n,1).appearance,"fill"==a.Ya(n,1).appearance,"outline"==a.Ya(n,1).appearance,"legacy"==a.Ya(n,1).appearance,a.Ya(n,1)._control.errorState,a.Ya(n,1)._canLabelFloat,a.Ya(n,1)._shouldLabelFloat(),a.Ya(n,1)._hideControlPlaceholder(),a.Ya(n,1)._control.disabled,a.Ya(n,1)._control.autofilled,a.Ya(n,1)._control.focused,"accent"==a.Ya(n,1).color,"warn"==a.Ya(n,1).color,a.Ya(n,1)._shouldForward("untouched"),a.Ya(n,1)._shouldForward("touched"),a.Ya(n,1)._shouldForward("pristine"),a.Ya(n,1)._shouldForward("dirty"),a.Ya(n,1)._shouldForward("valid"),a.Ya(n,1)._shouldForward("invalid"),a.Ya(n,1)._shouldForward("pending"),!a.Ya(n,1)._animationsEnabled]),l(n,9,1,[a.Ya(n,11).maxlength?a.Ya(n,11).maxlength:null,a.Ya(n,16).ngClassUntouched,a.Ya(n,16).ngClassTouched,a.Ya(n,16).ngClassPristine,a.Ya(n,16).ngClassDirty,a.Ya(n,16).ngClassValid,a.Ya(n,16).ngClassInvalid,a.Ya(n,16).ngClassPending,a.Ya(n,17)._isServer,a.Ya(n,17).id,a.Ya(n,17).placeholder,a.Ya(n,17).disabled,a.Ya(n,17).required,a.Ya(n,17).readonly,a.Ya(n,17)._ariaDescribedby||null,a.Ya(n,17).errorState,a.Ya(n,17).required.toString()])})}function F(l){return a.gb(0,[(l()(),a.Oa(0,0,null,null,2,"div",[["class","col-1"]],null,null,null,null,null)),(l()(),a.Oa(1,0,null,null,1,"b",[],null,null,null,null,null)),(l()(),a.eb(2,null,["",""]))],null,function(l,n){l(n,2,0,n.parent.context.$implicit.score)})}function I(l){return a.gb(0,[(l()(),a.Oa(0,0,null,null,1,"div",[["class","col-1"]],null,null,null,null,null)),(l()(),a.eb(-1,null,["points"]))],null,null)}function S(l){return a.gb(0,[(l()(),a.Oa(0,0,null,null,1,"div",[["class","col-1"]],null,null,null,null,null)),(l()(),a.eb(-1,null,["point"]))],null,null)}function $(l){return a.gb(0,[(l()(),a.Oa(0,0,null,null,2,"button",[["color","primary"],["mat-raised-button",""],["type","submit"]],[[8,"disabled",0],[2,"_mat-animation-noopable",null]],null,null,b.b,b.a)),a.Na(1,180224,null,0,m.b,[a.k,c.a,g.f,[2,s.a]],{color:[0,"color"]},null),(l()(),a.eb(-1,0,["Enregistrer"]))],function(l,n){l(n,1,0,"primary")},function(l,n){l(n,0,0,a.Ya(n,1).disabled||null,"NoopAnimations"===a.Ya(n,1)._animationMode)})}function P(l){return a.gb(0,[(l()(),a.Oa(0,0,null,null,25,"mat-list-item",[["class","mat-line mat-list-item"],["matLine",""]],[[2,"mat-list-item-avatar",null],[2,"mat-list-item-with-avatar",null]],[[null,"focus"],[null,"blur"]],function(l,n,u){var e=!0;return"focus"===n&&(e=!1!==a.Ya(l,2)._handleFocus()&&e),"blur"===n&&(e=!1!==a.Ya(l,2)._handleBlur()&&e),e},h.b,h.a)),a.Na(1,16384,[[1,4]],0,o.m,[],null,null),a.Na(2,1097728,null,2,v.b,[a.k,[2,v.e]],null,null),a.cb(603979776,1,{_lines:1}),a.cb(335544320,2,{_avatar:0}),(l()(),a.Oa(5,0,null,2,20,"form",[["class","row"],["novalidate",""]],[[2,"last",null],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngSubmit"],[null,"submit"],[null,"reset"]],function(l,n,u){var e=!0,t=l.component;return"submit"===n&&(e=!1!==a.Ya(l,7).onSubmit(u)&&e),"reset"===n&&(e=!1!==a.Ya(l,7).onReset()&&e),"ngSubmit"===n&&(e=!1!==t.submit()&&e),e},null,null)),a.Na(6,16384,null,0,d.q,[],null,null),a.Na(7,4210688,[["form",4]],0,d.l,[[8,null],[8,null]],null,{ngSubmit:"ngSubmit"}),a.bb(2048,null,d.b,null,[d.l]),a.Na(9,16384,null,0,d.k,[[4,d.b]],null,null),(l()(),a.Oa(10,0,null,null,2,"div",[["class","col-1"]],null,null,null,null,null)),(l()(),a.Oa(11,0,null,null,1,"b",[],null,null,null,null,null)),(l()(),a.eb(12,null,["",""])),(l()(),a.Fa(16777216,null,null,1,null,k)),a.Na(14,16384,null,0,Y.k,[a.N,a.K],{ngIf:[0,"ngIf"]},null),(l()(),a.Fa(16777216,null,null,1,null,W)),a.Na(16,16384,null,0,Y.k,[a.N,a.K],{ngIf:[0,"ngIf"]},null),(l()(),a.Fa(16777216,null,null,1,null,F)),a.Na(18,16384,null,0,Y.k,[a.N,a.K],{ngIf:[0,"ngIf"]},null),(l()(),a.Fa(16777216,null,null,1,null,I)),a.Na(20,16384,null,0,Y.k,[a.N,a.K],{ngIf:[0,"ngIf"]},null),(l()(),a.Fa(16777216,null,null,1,null,S)),a.Na(22,16384,null,0,Y.k,[a.N,a.K],{ngIf:[0,"ngIf"]},null),(l()(),a.Oa(23,0,null,null,2,"div",[["class","col-12 col-md"]],null,null,null,null,null)),(l()(),a.Fa(16777216,null,null,1,null,$)),a.Na(25,16384,null,0,Y.k,[a.N,a.K],{ngIf:[0,"ngIf"]},null)],function(l,n){l(n,14,0,!n.context.$implicit.isUser),l(n,16,0,n.context.$implicit.isUser),l(n,18,0,n.context.$implicit.score||0==n.context.$implicit.score),l(n,20,0,n.context.$implicit.score&&n.context.$implicit.score>1),l(n,22,0,0==n.context.$implicit.score||1==n.context.$implicit.score),l(n,25,0,n.context.$implicit.isUser)},function(l,n){l(n,0,0,a.Ya(n,2)._avatar,a.Ya(n,2)._avatar),l(n,5,0,n.context.$implicit.score,a.Ya(n,9).ngClassUntouched,a.Ya(n,9).ngClassTouched,a.Ya(n,9).ngClassPristine,a.Ya(n,9).ngClassDirty,a.Ya(n,9).ngClassValid,a.Ya(n,9).ngClassInvalid,a.Ya(n,9).ngClassPending),l(n,12,0,n.context.$implicit.rank)})}function q(l){return a.gb(0,[(l()(),a.Oa(0,0,null,null,20,"mat-card",[["class","mat-card"]],null,null,null,y.d,y.a)),a.Na(1,49152,null,0,N.a,[],null,null),(l()(),a.Oa(2,0,null,0,4,"p",[],null,null,null,null,null)),(l()(),a.eb(-1,null,[" Si tu trouves le score du match tu gagnes "])),(l()(),a.Oa(4,0,null,null,1,"b",[],null,null,null,null,null)),(l()(),a.eb(-1,null,["3 points"])),(l()(),a.eb(-1,null,[". "])),(l()(),a.Oa(7,0,null,0,4,"p",[],null,null,null,null,null)),(l()(),a.eb(-1,null,[" Si tu trouves le vainqueur du match tu gagnes "])),(l()(),a.Oa(9,0,null,null,1,"b",[],null,null,null,null,null)),(l()(),a.eb(-1,null,["1 points"])),(l()(),a.eb(-1,null,[". "])),(l()(),a.Oa(12,0,null,0,1,"p",[],null,null,null,null,null)),(l()(),a.eb(-1,null,[" Tu peux pronostiquer jusqu'au coup d'envoi. "])),(l()(),a.Oa(14,0,null,0,4,"p",[],null,null,null,null,null)),(l()(),a.eb(-1,null,[" Le 1er gagne "])),(l()(),a.Oa(16,0,null,null,1,"b",[],null,null,null,null,null)),(l()(),a.eb(-1,null,["toute mon estime"])),(l()(),a.eb(-1,null,[". "])),(l()(),a.Fa(16777216,null,0,1,null,P)),a.Na(20,802816,null,0,Y.j,[a.N,a.K,a.q],{ngForOf:[0,"ngForOf"]},null)],function(l,n){l(n,20,0,n.component.scores)},null)}var M=a.Ka("wc-ranking",x,function(l){return a.gb(0,[(l()(),a.Oa(0,0,null,null,1,"wc-ranking",[],null,null,null,q,O)),a.Na(1,245760,null,0,x,[_.a,w.a,C.a],null,null)],function(l,n){l(n,1,0)},null)},{},{},[]),E=u("ZYCi"),K=function(){},j=u("r43C"),U=u("LC5p");u.d(n,"RankingModuleNgFactory",function(){return L});var L=a.La(e,[],function(l){return a.Va([a.Wa(512,a.j,a.Aa,[[8,[M]],[3,a.j],a.v]),a.Wa(4608,Y.m,Y.l,[a.s,[2,Y.v]]),a.Wa(4608,d.r,d.r,[]),a.Wa(4608,o.d,o.d,[]),a.Wa(1073742336,Y.b,Y.b,[]),a.Wa(1073742336,d.o,d.o,[]),a.Wa(1073742336,d.e,d.e,[]),a.Wa(1073742336,E.n,E.n,[[2,E.s],[2,E.k]]),a.Wa(1073742336,K,K,[]),a.Wa(1073742336,r.a,r.a,[]),a.Wa(1073742336,o.l,o.l,[[2,o.e]]),a.Wa(1073742336,N.d,N.d,[]),a.Wa(1073742336,o.n,o.n,[]),a.Wa(1073742336,j.b,j.b,[]),a.Wa(1073742336,c.b,c.b,[]),a.Wa(1073742336,o.w,o.w,[]),a.Wa(1073742336,o.u,o.u,[]),a.Wa(1073742336,U.a,U.a,[]),a.Wa(1073742336,v.c,v.c,[]),a.Wa(1073742336,i.d,i.d,[]),a.Wa(1073742336,f.c,f.c,[]),a.Wa(1073742336,p.c,p.c,[]),a.Wa(1073742336,m.c,m.c,[]),a.Wa(1073742336,e,e,[]),a.Wa(1024,E.i,function(){return[[{path:"",component:x}]]},[])])})}}]);