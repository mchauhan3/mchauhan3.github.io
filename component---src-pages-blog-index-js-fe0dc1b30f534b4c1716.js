"use strict";(self.webpackChunkpersonal_website=self.webpackChunkpersonal_website||[]).push([[334],{4040:function(e,t,l){var n=l(6540),a=l(4794),r=l(3895);t.A=e=>{let{location:t,title:l,children:i}=e;let o;return o="/blog/"===t.pathname?n.createElement("h1",{className:"main-heading"},l):n.createElement(a.Link,{className:"header-link-home",to:"/blog"},l),n.createElement(r.A,{location:t,title:l},n.createElement("header",{className:"global-header"},o),i)}},3895:function(e,t,l){var n=l(6540);t.A=e=>{let{location:t,title:l,children:a}=e;return n.createElement("div",{className:"global-wrapper"},n.createElement("main",null,a),n.createElement("footer",null,"© ",(new Date).getFullYear(),", Built with"," ",n.createElement("a",{href:"https://www.gatsbyjs.com"},"Gatsby")))}},7528:function(e,t,l){var n=l(6540),a=l(4794);t.A=e=>{var t,l,r;let{description:i,title:o,children:c}=e;const{site:m}=(0,a.useStaticQuery)("3589320610"),s=i||m.siteMetadata.description,u=null===(t=m.siteMetadata)||void 0===t?void 0:t.title;return n.createElement(n.Fragment,null,n.createElement("title",null,u?o+" | "+u:o),n.createElement("meta",{name:"description",content:s}),n.createElement("meta",{property:"og:title",content:o}),n.createElement("meta",{property:"og:description",content:s}),n.createElement("meta",{property:"og:type",content:"website"}),n.createElement("meta",{name:"github:card",content:"summary"}),n.createElement("meta",{name:"github:creator",content:(null===(l=m.siteMetadata)||void 0===l||null===(r=l.social)||void 0===r?void 0:r.github)||""}),n.createElement("meta",{name:"github:title",content:o}),n.createElement("meta",{name:"github:description",content:s}),c)}},4624:function(e,t,l){l.r(t),l.d(t,{Head:function(){return o}});var n=l(6540),a=l(4794),r=l(4040),i=l(7528);t.default=e=>{var t;let{data:l,location:i}=e;const o=(null===(t=l.site.siteMetadata)||void 0===t?void 0:t.blogTitle)||"Title",c=l.allMarkdownRemark.nodes;return 0===c.length?n.createElement(r.A,{location:i,title:o},n.createElement("p",null,'No blog posts found. Add markdown posts to "content/blog" (or the directory you specified for the "gatsby-source-filesystem" plugin in gatsby-config.js).')):n.createElement(r.A,{location:i,title:o},n.createElement("ol",{style:{listStyle:"none"}},c.map((e=>{const t=e.frontmatter.title||e.fields.slug;return n.createElement("li",{key:e.fields.slug},n.createElement("article",{className:"post-list-item",itemScope:!0,itemType:"http://schema.org/Article"},n.createElement("header",null,n.createElement("h2",null,n.createElement(a.Link,{to:"/blog"+e.fields.slug,itemProp:"url"},n.createElement("span",{itemProp:"headline"},t))),n.createElement("small",null,e.frontmatter.date)),n.createElement("section",null,n.createElement("p",{dangerouslySetInnerHTML:{__html:e.frontmatter.description||e.excerpt},itemProp:"description"}))))}))))};const o=()=>n.createElement(i.A,{title:"All posts"})}}]);
//# sourceMappingURL=component---src-pages-blog-index-js-fe0dc1b30f534b4c1716.js.map