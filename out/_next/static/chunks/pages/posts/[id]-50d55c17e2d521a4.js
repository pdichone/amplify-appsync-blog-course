(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[9646],{1369:function(n,t,e){(window.__NEXT_P=window.__NEXT_P||[]).push(["/posts/[id]",function(){return e(9955)}])},9955:function(n,t,e){"use strict";e.r(t),e.d(t,{__N_SSG:function(){return g},default:function(){return w}});var r=e(4051),o=e.n(r),i=e(5893),u=e(3900),a=e(552),c=e(1163),s=e(7294),p=e(9655),d=(e(4363),e(949)),l=e(5152),m=e(490),f=e(531),h=e(5934);e(1312);function v(n,t,e,r,o,i,u){try{var a=n[i](u),c=a.value}catch(s){return void e(s)}a.done?t(c):Promise.resolve(c).then(r,o)}function b(n){return function(){var t=this,e=arguments;return new Promise((function(r,o){var i=n.apply(t,e);function u(n){v(i,r,o,u,a,"next",n)}function a(n){v(i,r,o,u,a,"throw",n)}u(void 0)}))}}function y(n,t,e){return t in n?Object.defineProperty(n,t,{value:e,enumerable:!0,configurable:!0,writable:!0}):n[t]=e,n}var _=(0,l.default)((function(){return Promise.all([e.e(3126),e.e(1634),e.e(2562)]).then(e.bind(e,1634))}),{loadableGenerated:{webpack:function(){return[1634]}},ssr:!1}),x={message:""},g=!0;function w(n){var t=n.post,e=(0,s.useState)(!1),r=e[0],l=e[1],v=(0,s.useState)(null),g=v[0],w=v[1],P=(0,s.useState)(x),k=P[0],C=P[1],I=(0,s.useState)(!1),j=I[0],O=I[1],$=(0,c.useRouter)(),N=k.message;if((0,s.useEffect)((function(){!function(){S.apply(this,arguments)}()}),[]),(0,s.useEffect)((function(){!function(){A.apply(this,arguments)}()}),[]),$.isFallback)return(0,i.jsx)("div",{children:"Loading..."});function A(){return(A=b(o().mark((function n(){return o().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return m.Xb.listen("auth",(function(n){switch(n.payload.event){case"signIn":return l(!0);case"signOut":return l(!1)}})),n.prev=1,n.next=4,f.g.currentAuthenticatedUser();case 4:l(!0),n.next=9;break;case 7:n.prev=7,n.t0=n.catch(1);case 9:case"end":return n.stop()}}),n,null,[[1,7]])})))).apply(this,arguments)}function S(){return(S=b(o().mark((function n(){var e;return o().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(!t.coverImage){n.next=5;break}return n.next=3,u.Ke.get(t.coverImage);case 3:e=n.sent,w(e);case 5:case"end":return n.stop()}}),n)})))).apply(this,arguments)}function E(){return(E=b(o().mark((function n(){var t;return o().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(N){n.next=2;break}return n.abrupt("return");case 2:return t=(0,h.Z)(),k.id=t,n.prev=4,n.next=7,a.b.graphql({query:d.Yr,variables:{input:k},authMode:"AMAZON_COGNITO_USER_POOLS"});case 7:n.next=12;break;case 9:n.prev=9,n.t0=n.catch(4),console.log(n.t0);case 12:$.push("/my-posts");case 13:case"end":return n.stop()}}),n,null,[[4,9]])})))).apply(this,arguments)}return(0,i.jsxs)("div",{children:[(0,i.jsx)("h1",{className:"text-5xl mt-4 font-semibold tracing-wide",children:t.title}),g&&(0,i.jsx)("img",{src:g,className:"mt4"}),(0,i.jsxs)("p",{className:"text-sm font-light my-4",children:["By ",t.username]}),(0,i.jsx)("div",{className:"mt-8",children:(0,i.jsx)(p.D,{className:"prose",children:t.content})}),(0,i.jsxs)("div",{children:[r&&(0,i.jsx)("button",{type:"button",className:"mb-4 bg-green-600 text-white font-semibold px-8 py-2 rounded-lg",onClick:function(){O(!j)},children:"Write a Comment"}),(0,i.jsxs)("div",{style:{display:j?"block":"none"},children:[(0,i.jsx)(_,{value:k.message,onChange:function(n){return C(function(n){for(var t=1;t<arguments.length;t++){var e=null!=arguments[t]?arguments[t]:{},r=Object.keys(e);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(e).filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable})))),r.forEach((function(t){y(n,t,e[t])}))}return n}({},k,{message:n,postID:t.id}))}}),(0,i.jsx)("button",{onClick:function(){return E.apply(this,arguments)},type:"button",className:"mb-4 bg-blue-600 text-white font-semibold px-8 py-2 rounded-lg",children:"Save"})]})]})]})}},949:function(n,t,e){"use strict";e.d(t,{qb:function(){return r},CP:function(){return o},fR:function(){return i},Yr:function(){return u}});var r="\n  mutation CreatePost(\n    $input: CreatePostInput!\n    $condition: ModelPostConditionInput\n  ) {\n    createPost(input: $input, condition: $condition) {\n      id\n      title\n      content\n      username\n      coverImage\n      comments {\n        nextToken\n        __typename\n      }\n      createdAt\n      updatedAt\n      __typename\n    }\n  }\n",o="\n  mutation UpdatePost(\n    $input: UpdatePostInput!\n    $condition: ModelPostConditionInput\n  ) {\n    updatePost(input: $input, condition: $condition) {\n      id\n      title\n      content\n      username\n      coverImage\n      comments {\n        nextToken\n        __typename\n      }\n      createdAt\n      updatedAt\n      __typename\n    }\n  }\n",i="\n  mutation DeletePost(\n    $input: DeletePostInput!\n    $condition: ModelPostConditionInput\n  ) {\n    deletePost(input: $input, condition: $condition) {\n      id\n      title\n      content\n      username\n      coverImage\n      comments {\n        nextToken\n        __typename\n      }\n      createdAt\n      updatedAt\n      __typename\n    }\n  }\n",u="\n  mutation CreateComment(\n    $input: CreateCommentInput!\n    $condition: ModelCommentConditionInput\n  ) {\n    createComment(input: $input, condition: $condition) {\n      id\n      message\n      post {\n        id\n        title\n        content\n        username\n        coverImage\n        createdAt\n        updatedAt\n        __typename\n      }\n      postID\n      createdAt\n      updatedAt\n      createdBy\n      __typename\n    }\n  }\n"}},function(n){n.O(0,[9774,552,8269,9655,2888,179],(function(){return t=1369,n(n.s=t);var t}));var t=n.O();_N_E=t}]);