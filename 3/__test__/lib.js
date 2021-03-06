!function (e) {
  var t = {};

  function i(n) {
    if (t[n]) return t[n].exports;
    var r = t[n] = {i: n, l: !1, exports: {}};
    return e[n].call(r.exports, r, r.exports, i), r.l = !0, r.exports
  }

  i.m = e, i.c = t, i.d = function (e, t, n) {
    i.o(e, t) || Object.defineProperty(e, t, {enumerable: !0, get: n})
  }, i.r = function (e) {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(e, "__esModule", {value: !0})
  }, i.t = function (e, t) {
    if (1 & t && (e = i(e)), 8 & t) return e;
    if (4 & t && "object" == typeof e && e && e.__esModule) return e;
    var n = Object.create(null);
    if (i.r(n), Object.defineProperty(n, "default", {
      enumerable: !0,
      value: e
    }), 2 & t && "string" != typeof e) for (var r in e) i.d(n, r, function (t) {
      return e[t]
    }.bind(null, r));
    return n
  }, i.n = function (e) {
    var t = e && e.__esModule ? function () {
      return e.default
    } : function () {
      return e
    };
    return i.d(t, "a", t), t
  }, i.o = function (e, t) {
    return Object.prototype.hasOwnProperty.call(e, t)
  }, i.p = "", i(i.s = 0)
}([function (e, t, i) {
  window.esprima = i(1), window.esquery = i(2)
}, function (e, t, i) {
  var n;
  n = function () {
    return function (e) {
      var t = {};

      function i(n) {
        if (t[n]) return t[n].exports;
        var r = t[n] = {exports: {}, id: n, loaded: !1};
        return e[n].call(r.exports, r, r.exports, i), r.loaded = !0, r.exports
      }

      return i.m = e, i.c = t, i.p = "", i(0)
    }([function (e, t, i) {
      "use strict";
      Object.defineProperty(t, "__esModule", {value: !0});
      var n = i(1), r = i(3), s = i(8), a = i(15);

      function o(e, t, i) {
        var a = null, o = function (e, t) {
          i && i(e, t), a && a.visit(e, t)
        }, u = "function" == typeof i ? o : null, l = !1;
        if (t) {
          l = "boolean" == typeof t.comment && t.comment;
          var h = "boolean" == typeof t.attachComment && t.attachComment;
          (l || h) && ((a = new n.CommentHandler).attach = h, t.comment = !0, u = o)
        }
        var c, p = !1;
        t && "string" == typeof t.sourceType && (p = "module" === t.sourceType), c = t && "boolean" == typeof t.jsx && t.jsx ? new r.JSXParser(e, t, u) : new s.Parser(e, t, u);
        var d = p ? c.parseModule() : c.parseScript();
        return l && a && (d.comments = a.comments), c.config.tokens && (d.tokens = c.tokens), c.config.tolerant && (d.errors = c.errorHandler.errors), d
      }

      t.parse = o, t.parseModule = function (e, t, i) {
        var n = t || {};
        return n.sourceType = "module", o(e, n, i)
      }, t.parseScript = function (e, t, i) {
        var n = t || {};
        return n.sourceType = "script", o(e, n, i)
      }, t.tokenize = function (e, t, i) {
        var n, r = new a.Tokenizer(e, t);
        n = [];
        try {
          for (; ;) {
            var s = r.getNextToken();
            if (!s) break;
            i && (s = i(s)), n.push(s)
          }
        } catch (e) {
          r.errorHandler.tolerate(e)
        }
        return r.errorHandler.tolerant && (n.errors = r.errors()), n
      };
      var u = i(2);
      t.Syntax = u.Syntax, t.version = "4.0.1"
    }, function (e, t, i) {
      "use strict";
      Object.defineProperty(t, "__esModule", {value: !0});
      var n = i(2), r = function () {
        function e() {
          this.attach = !1, this.comments = [], this.stack = [], this.leading = [], this.trailing = []
        }

        return e.prototype.insertInnerComments = function (e, t) {
          if (e.type === n.Syntax.BlockStatement && 0 === e.body.length) {
            for (var i = [], r = this.leading.length - 1; r >= 0; --r) {
              var s = this.leading[r];
              t.end.offset >= s.start && (i.unshift(s.comment), this.leading.splice(r, 1), this.trailing.splice(r, 1))
            }
            i.length && (e.innerComments = i)
          }
        }, e.prototype.findTrailingComments = function (e) {
          var t = [];
          if (this.trailing.length > 0) {
            for (var i = this.trailing.length - 1; i >= 0; --i) {
              var n = this.trailing[i];
              n.start >= e.end.offset && t.unshift(n.comment)
            }
            return this.trailing.length = 0, t
          }
          var r = this.stack[this.stack.length - 1];
          if (r && r.node.trailingComments) {
            var s = r.node.trailingComments[0];
            s && s.range[0] >= e.end.offset && (t = r.node.trailingComments, delete r.node.trailingComments)
          }
          return t
        }, e.prototype.findLeadingComments = function (e) {
          for (var t, i = []; this.stack.length > 0;) {
            if (!((s = this.stack[this.stack.length - 1]) && s.start >= e.start.offset)) break;
            t = s.node, this.stack.pop()
          }
          if (t) {
            for (var n = (t.leadingComments ? t.leadingComments.length : 0) - 1; n >= 0; --n) {
              var r = t.leadingComments[n];
              r.range[1] <= e.start.offset && (i.unshift(r), t.leadingComments.splice(n, 1))
            }
            return t.leadingComments && 0 === t.leadingComments.length && delete t.leadingComments, i
          }
          for (n = this.leading.length - 1; n >= 0; --n) {
            var s;
            (s = this.leading[n]).start <= e.start.offset && (i.unshift(s.comment), this.leading.splice(n, 1))
          }
          return i
        }, e.prototype.visitNode = function (e, t) {
          if (!(e.type === n.Syntax.Program && e.body.length > 0)) {
            this.insertInnerComments(e, t);
            var i = this.findTrailingComments(t), r = this.findLeadingComments(t);
            r.length > 0 && (e.leadingComments = r), i.length > 0 && (e.trailingComments = i), this.stack.push({
              node: e,
              start: t.start.offset
            })
          }
        }, e.prototype.visitComment = function (e, t) {
          var i = "L" === e.type[0] ? "Line" : "Block", n = {type: i, value: e.value};
          if (e.range && (n.range = e.range), e.loc && (n.loc = e.loc), this.comments.push(n), this.attach) {
            var r = {comment: {type: i, value: e.value, range: [t.start.offset, t.end.offset]}, start: t.start.offset};
            e.loc && (r.comment.loc = e.loc), e.type = i, this.leading.push(r), this.trailing.push(r)
          }
        }, e.prototype.visit = function (e, t) {
          "LineComment" === e.type ? this.visitComment(e, t) : "BlockComment" === e.type ? this.visitComment(e, t) : this.attach && this.visitNode(e, t)
        }, e
      }();
      t.CommentHandler = r
    }, function (e, t) {
      "use strict";
      Object.defineProperty(t, "__esModule", {value: !0}), t.Syntax = {
        AssignmentExpression: "AssignmentExpression",
        AssignmentPattern: "AssignmentPattern",
        ArrayExpression: "ArrayExpression",
        ArrayPattern: "ArrayPattern",
        ArrowFunctionExpression: "ArrowFunctionExpression",
        AwaitExpression: "AwaitExpression",
        BlockStatement: "BlockStatement",
        BinaryExpression: "BinaryExpression",
        BreakStatement: "BreakStatement",
        CallExpression: "CallExpression",
        CatchClause: "CatchClause",
        ClassBody: "ClassBody",
        ClassDeclaration: "ClassDeclaration",
        ClassExpression: "ClassExpression",
        ConditionalExpression: "ConditionalExpression",
        ContinueStatement: "ContinueStatement",
        DoWhileStatement: "DoWhileStatement",
        DebuggerStatement: "DebuggerStatement",
        EmptyStatement: "EmptyStatement",
        ExportAllDeclaration: "ExportAllDeclaration",
        ExportDefaultDeclaration: "ExportDefaultDeclaration",
        ExportNamedDeclaration: "ExportNamedDeclaration",
        ExportSpecifier: "ExportSpecifier",
        ExpressionStatement: "ExpressionStatement",
        ForStatement: "ForStatement",
        ForOfStatement: "ForOfStatement",
        ForInStatement: "ForInStatement",
        FunctionDeclaration: "FunctionDeclaration",
        FunctionExpression: "FunctionExpression",
        Identifier: "Identifier",
        IfStatement: "IfStatement",
        ImportDeclaration: "ImportDeclaration",
        ImportDefaultSpecifier: "ImportDefaultSpecifier",
        ImportNamespaceSpecifier: "ImportNamespaceSpecifier",
        ImportSpecifier: "ImportSpecifier",
        Literal: "Literal",
        LabeledStatement: "LabeledStatement",
        LogicalExpression: "LogicalExpression",
        MemberExpression: "MemberExpression",
        MetaProperty: "MetaProperty",
        MethodDefinition: "MethodDefinition",
        NewExpression: "NewExpression",
        ObjectExpression: "ObjectExpression",
        ObjectPattern: "ObjectPattern",
        Program: "Program",
        Property: "Property",
        RestElement: "RestElement",
        ReturnStatement: "ReturnStatement",
        SequenceExpression: "SequenceExpression",
        SpreadElement: "SpreadElement",
        Super: "Super",
        SwitchCase: "SwitchCase",
        SwitchStatement: "SwitchStatement",
        TaggedTemplateExpression: "TaggedTemplateExpression",
        TemplateElement: "TemplateElement",
        TemplateLiteral: "TemplateLiteral",
        ThisExpression: "ThisExpression",
        ThrowStatement: "ThrowStatement",
        TryStatement: "TryStatement",
        UnaryExpression: "UnaryExpression",
        UpdateExpression: "UpdateExpression",
        VariableDeclaration: "VariableDeclaration",
        VariableDeclarator: "VariableDeclarator",
        WhileStatement: "WhileStatement",
        WithStatement: "WithStatement",
        YieldExpression: "YieldExpression"
      }
    }, function (e, t, i) {
      "use strict";
      var n,
          r = this && this.__extends || (n = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
            e.__proto__ = t
          } || function (e, t) {
            for (var i in t) t.hasOwnProperty(i) && (e[i] = t[i])
          }, function (e, t) {
            function i() {
              this.constructor = e
            }

            n(e, t), e.prototype = null === t ? Object.create(t) : (i.prototype = t.prototype, new i)
          });
      Object.defineProperty(t, "__esModule", {value: !0});
      var s = i(4), a = i(5), o = i(6), u = i(7), l = i(8), h = i(13), c = i(14);

      function p(e) {
        var t;
        switch (e.type) {
          case o.JSXSyntax.JSXIdentifier:
            t = e.name;
            break;
          case o.JSXSyntax.JSXNamespacedName:
            var i = e;
            t = p(i.namespace) + ":" + p(i.name);
            break;
          case o.JSXSyntax.JSXMemberExpression:
            var n = e;
            t = p(n.object) + "." + p(n.property)
        }
        return t
      }

      h.TokenName[100] = "JSXIdentifier", h.TokenName[101] = "JSXText";
      var d = function (e) {
        function t(t, i, n) {
          return e.call(this, t, i, n) || this
        }

        return r(t, e), t.prototype.parsePrimaryExpression = function () {
          return this.match("<") ? this.parseJSXRoot() : e.prototype.parsePrimaryExpression.call(this)
        }, t.prototype.startJSX = function () {
          this.scanner.index = this.startMarker.index, this.scanner.lineNumber = this.startMarker.line, this.scanner.lineStart = this.startMarker.index - this.startMarker.column
        }, t.prototype.finishJSX = function () {
          this.nextToken()
        }, t.prototype.reenterJSX = function () {
          this.startJSX(), this.expectJSX("}"), this.config.tokens && this.tokens.pop()
        }, t.prototype.createJSXNode = function () {
          return this.collectComments(), {
            index: this.scanner.index,
            line: this.scanner.lineNumber,
            column: this.scanner.index - this.scanner.lineStart
          }
        }, t.prototype.createJSXChildNode = function () {
          return {
            index: this.scanner.index,
            line: this.scanner.lineNumber,
            column: this.scanner.index - this.scanner.lineStart
          }
        }, t.prototype.scanXHTMLEntity = function (e) {
          for (var t = "&", i = !0, n = !1, r = !1, a = !1; !this.scanner.eof() && i && !n;) {
            var o = this.scanner.source[this.scanner.index];
            if (o === e) break;
            if (n = ";" === o, t += o, ++this.scanner.index, !n) switch (t.length) {
              case 2:
                r = "#" === o;
                break;
              case 3:
                r && (i = (a = "x" === o) || s.Character.isDecimalDigit(o.charCodeAt(0)), r = r && !a);
                break;
              default:
                i = (i = i && !(r && !s.Character.isDecimalDigit(o.charCodeAt(0)))) && !(a && !s.Character.isHexDigit(o.charCodeAt(0)))
            }
          }
          if (i && n && t.length > 2) {
            var u = t.substr(1, t.length - 2);
            r && u.length > 1 ? t = String.fromCharCode(parseInt(u.substr(1), 10)) : a && u.length > 2 ? t = String.fromCharCode(parseInt("0" + u.substr(1), 16)) : r || a || !c.XHTMLEntities[u] || (t = c.XHTMLEntities[u])
          }
          return t
        }, t.prototype.lexJSX = function () {
          var e = this.scanner.source.charCodeAt(this.scanner.index);
          if (60 === e || 62 === e || 47 === e || 58 === e || 61 === e || 123 === e || 125 === e) return {
            type: 7,
            value: o = this.scanner.source[this.scanner.index++],
            lineNumber: this.scanner.lineNumber,
            lineStart: this.scanner.lineStart,
            start: this.scanner.index - 1,
            end: this.scanner.index
          };
          if (34 === e || 39 === e) {
            for (var t = this.scanner.index, i = this.scanner.source[this.scanner.index++], n = ""; !this.scanner.eof();) {
              if ((u = this.scanner.source[this.scanner.index++]) === i) break;
              n += "&" === u ? this.scanXHTMLEntity(i) : u
            }
            return {
              type: 8,
              value: n,
              lineNumber: this.scanner.lineNumber,
              lineStart: this.scanner.lineStart,
              start: t,
              end: this.scanner.index
            }
          }
          if (46 === e) {
            var r = this.scanner.source.charCodeAt(this.scanner.index + 1),
                a = this.scanner.source.charCodeAt(this.scanner.index + 2), o = 46 === r && 46 === a ? "..." : ".";
            t = this.scanner.index;
            return this.scanner.index += o.length, {
              type: 7,
              value: o,
              lineNumber: this.scanner.lineNumber,
              lineStart: this.scanner.lineStart,
              start: t,
              end: this.scanner.index
            }
          }
          if (96 === e) return {
            type: 10,
            value: "",
            lineNumber: this.scanner.lineNumber,
            lineStart: this.scanner.lineStart,
            start: this.scanner.index,
            end: this.scanner.index
          };
          if (s.Character.isIdentifierStart(e) && 92 !== e) {
            t = this.scanner.index;
            for (++this.scanner.index; !this.scanner.eof();) {
              var u = this.scanner.source.charCodeAt(this.scanner.index);
              if (s.Character.isIdentifierPart(u) && 92 !== u) ++this.scanner.index; else {
                if (45 !== u) break;
                ++this.scanner.index
              }
            }
            return {
              type: 100,
              value: this.scanner.source.slice(t, this.scanner.index),
              lineNumber: this.scanner.lineNumber,
              lineStart: this.scanner.lineStart,
              start: t,
              end: this.scanner.index
            }
          }
          return this.scanner.lex()
        }, t.prototype.nextJSXToken = function () {
          this.collectComments(), this.startMarker.index = this.scanner.index, this.startMarker.line = this.scanner.lineNumber, this.startMarker.column = this.scanner.index - this.scanner.lineStart;
          var e = this.lexJSX();
          return this.lastMarker.index = this.scanner.index, this.lastMarker.line = this.scanner.lineNumber, this.lastMarker.column = this.scanner.index - this.scanner.lineStart, this.config.tokens && this.tokens.push(this.convertToken(e)), e
        }, t.prototype.nextJSXText = function () {
          this.startMarker.index = this.scanner.index, this.startMarker.line = this.scanner.lineNumber, this.startMarker.column = this.scanner.index - this.scanner.lineStart;
          for (var e = this.scanner.index, t = ""; !this.scanner.eof();) {
            var i = this.scanner.source[this.scanner.index];
            if ("{" === i || "<" === i) break;
            ++this.scanner.index, t += i, s.Character.isLineTerminator(i.charCodeAt(0)) && (++this.scanner.lineNumber, "\r" === i && "\n" === this.scanner.source[this.scanner.index] && ++this.scanner.index, this.scanner.lineStart = this.scanner.index)
          }
          this.lastMarker.index = this.scanner.index, this.lastMarker.line = this.scanner.lineNumber, this.lastMarker.column = this.scanner.index - this.scanner.lineStart;
          var n = {
            type: 101,
            value: t,
            lineNumber: this.scanner.lineNumber,
            lineStart: this.scanner.lineStart,
            start: e,
            end: this.scanner.index
          };
          return t.length > 0 && this.config.tokens && this.tokens.push(this.convertToken(n)), n
        }, t.prototype.peekJSXToken = function () {
          var e = this.scanner.saveState();
          this.scanner.scanComments();
          var t = this.lexJSX();
          return this.scanner.restoreState(e), t
        }, t.prototype.expectJSX = function (e) {
          var t = this.nextJSXToken();
          7 === t.type && t.value === e || this.throwUnexpectedToken(t)
        }, t.prototype.matchJSX = function (e) {
          var t = this.peekJSXToken();
          return 7 === t.type && t.value === e
        }, t.prototype.parseJSXIdentifier = function () {
          var e = this.createJSXNode(), t = this.nextJSXToken();
          return 100 !== t.type && this.throwUnexpectedToken(t), this.finalize(e, new a.JSXIdentifier(t.value))
        }, t.prototype.parseJSXElementName = function () {
          var e = this.createJSXNode(), t = this.parseJSXIdentifier();
          if (this.matchJSX(":")) {
            var i = t;
            this.expectJSX(":");
            var n = this.parseJSXIdentifier();
            t = this.finalize(e, new a.JSXNamespacedName(i, n))
          } else if (this.matchJSX(".")) for (; this.matchJSX(".");) {
            var r = t;
            this.expectJSX(".");
            var s = this.parseJSXIdentifier();
            t = this.finalize(e, new a.JSXMemberExpression(r, s))
          }
          return t
        }, t.prototype.parseJSXAttributeName = function () {
          var e, t = this.createJSXNode(), i = this.parseJSXIdentifier();
          if (this.matchJSX(":")) {
            var n = i;
            this.expectJSX(":");
            var r = this.parseJSXIdentifier();
            e = this.finalize(t, new a.JSXNamespacedName(n, r))
          } else e = i;
          return e
        }, t.prototype.parseJSXStringLiteralAttribute = function () {
          var e = this.createJSXNode(), t = this.nextJSXToken();
          8 !== t.type && this.throwUnexpectedToken(t);
          var i = this.getTokenRaw(t);
          return this.finalize(e, new u.Literal(t.value, i))
        }, t.prototype.parseJSXExpressionAttribute = function () {
          var e = this.createJSXNode();
          this.expectJSX("{"), this.finishJSX(), this.match("}") && this.tolerateError("JSX attributes must only be assigned a non-empty expression");
          var t = this.parseAssignmentExpression();
          return this.reenterJSX(), this.finalize(e, new a.JSXExpressionContainer(t))
        }, t.prototype.parseJSXAttributeValue = function () {
          return this.matchJSX("{") ? this.parseJSXExpressionAttribute() : this.matchJSX("<") ? this.parseJSXElement() : this.parseJSXStringLiteralAttribute()
        }, t.prototype.parseJSXNameValueAttribute = function () {
          var e = this.createJSXNode(), t = this.parseJSXAttributeName(), i = null;
          return this.matchJSX("=") && (this.expectJSX("="), i = this.parseJSXAttributeValue()), this.finalize(e, new a.JSXAttribute(t, i))
        }, t.prototype.parseJSXSpreadAttribute = function () {
          var e = this.createJSXNode();
          this.expectJSX("{"), this.expectJSX("..."), this.finishJSX();
          var t = this.parseAssignmentExpression();
          return this.reenterJSX(), this.finalize(e, new a.JSXSpreadAttribute(t))
        }, t.prototype.parseJSXAttributes = function () {
          for (var e = []; !this.matchJSX("/") && !this.matchJSX(">");) {
            var t = this.matchJSX("{") ? this.parseJSXSpreadAttribute() : this.parseJSXNameValueAttribute();
            e.push(t)
          }
          return e
        }, t.prototype.parseJSXOpeningElement = function () {
          var e = this.createJSXNode();
          this.expectJSX("<");
          var t = this.parseJSXElementName(), i = this.parseJSXAttributes(), n = this.matchJSX("/");
          return n && this.expectJSX("/"), this.expectJSX(">"), this.finalize(e, new a.JSXOpeningElement(t, n, i))
        }, t.prototype.parseJSXBoundaryElement = function () {
          var e = this.createJSXNode();
          if (this.expectJSX("<"), this.matchJSX("/")) {
            this.expectJSX("/");
            var t = this.parseJSXElementName();
            return this.expectJSX(">"), this.finalize(e, new a.JSXClosingElement(t))
          }
          var i = this.parseJSXElementName(), n = this.parseJSXAttributes(), r = this.matchJSX("/");
          return r && this.expectJSX("/"), this.expectJSX(">"), this.finalize(e, new a.JSXOpeningElement(i, r, n))
        }, t.prototype.parseJSXEmptyExpression = function () {
          var e = this.createJSXChildNode();
          return this.collectComments(), this.lastMarker.index = this.scanner.index, this.lastMarker.line = this.scanner.lineNumber, this.lastMarker.column = this.scanner.index - this.scanner.lineStart, this.finalize(e, new a.JSXEmptyExpression)
        }, t.prototype.parseJSXExpressionContainer = function () {
          var e, t = this.createJSXNode();
          return this.expectJSX("{"), this.matchJSX("}") ? (e = this.parseJSXEmptyExpression(), this.expectJSX("}")) : (this.finishJSX(), e = this.parseAssignmentExpression(), this.reenterJSX()), this.finalize(t, new a.JSXExpressionContainer(e))
        }, t.prototype.parseJSXChildren = function () {
          for (var e = []; !this.scanner.eof();) {
            var t = this.createJSXChildNode(), i = this.nextJSXText();
            if (i.start < i.end) {
              var n = this.getTokenRaw(i), r = this.finalize(t, new a.JSXText(i.value, n));
              e.push(r)
            }
            if ("{" !== this.scanner.source[this.scanner.index]) break;
            var s = this.parseJSXExpressionContainer();
            e.push(s)
          }
          return e
        }, t.prototype.parseComplexJSXElement = function (e) {
          for (var t = []; !this.scanner.eof();) {
            e.children = e.children.concat(this.parseJSXChildren());
            var i = this.createJSXChildNode(), n = this.parseJSXBoundaryElement();
            if (n.type === o.JSXSyntax.JSXOpeningElement) {
              var r = n;
              if (r.selfClosing) {
                var s = this.finalize(i, new a.JSXElement(r, [], null));
                e.children.push(s)
              } else t.push(e), e = {node: i, opening: r, closing: null, children: []}
            }
            if (n.type === o.JSXSyntax.JSXClosingElement) {
              e.closing = n;
              var u = p(e.opening.name);
              if (u !== p(e.closing.name) && this.tolerateError("Expected corresponding JSX closing tag for %0", u), !(t.length > 0)) break;
              s = this.finalize(e.node, new a.JSXElement(e.opening, e.children, e.closing));
              (e = t[t.length - 1]).children.push(s), t.pop()
            }
          }
          return e
        }, t.prototype.parseJSXElement = function () {
          var e = this.createJSXNode(), t = this.parseJSXOpeningElement(), i = [], n = null;
          if (!t.selfClosing) {
            var r = this.parseComplexJSXElement({node: e, opening: t, closing: n, children: i});
            i = r.children, n = r.closing
          }
          return this.finalize(e, new a.JSXElement(t, i, n))
        }, t.prototype.parseJSXRoot = function () {
          this.config.tokens && this.tokens.pop(), this.startJSX();
          var e = this.parseJSXElement();
          return this.finishJSX(), e
        }, t.prototype.isStartOfExpression = function () {
          return e.prototype.isStartOfExpression.call(this) || this.match("<")
        }, t
      }(l.Parser);
      t.JSXParser = d
    }, function (e, t) {
      "use strict";
      Object.defineProperty(t, "__esModule", {value: !0});
      var i = {
        NonAsciiIdentifierStart: /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDEC0-\uDEF8]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]/,
        NonAsciiIdentifierPart: /[\xAA\xB5\xB7\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B4\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C81-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1369-\u1371\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFC-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C4\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDCA-\uDDCC\uDDD0-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDCA0-\uDCE9\uDCFF\uDEC0-\uDEF8]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF]/
      };
      t.Character = {
        fromCodePoint: function (e) {
          return e < 65536 ? String.fromCharCode(e) : String.fromCharCode(55296 + (e - 65536 >> 10)) + String.fromCharCode(56320 + (e - 65536 & 1023))
        }, isWhiteSpace: function (e) {
          return 32 === e || 9 === e || 11 === e || 12 === e || 160 === e || e >= 5760 && [5760, 8192, 8193, 8194, 8195, 8196, 8197, 8198, 8199, 8200, 8201, 8202, 8239, 8287, 12288, 65279].indexOf(e) >= 0
        }, isLineTerminator: function (e) {
          return 10 === e || 13 === e || 8232 === e || 8233 === e
        }, isIdentifierStart: function (e) {
          return 36 === e || 95 === e || e >= 65 && e <= 90 || e >= 97 && e <= 122 || 92 === e || e >= 128 && i.NonAsciiIdentifierStart.test(t.Character.fromCodePoint(e))
        }, isIdentifierPart: function (e) {
          return 36 === e || 95 === e || e >= 65 && e <= 90 || e >= 97 && e <= 122 || e >= 48 && e <= 57 || 92 === e || e >= 128 && i.NonAsciiIdentifierPart.test(t.Character.fromCodePoint(e))
        }, isDecimalDigit: function (e) {
          return e >= 48 && e <= 57
        }, isHexDigit: function (e) {
          return e >= 48 && e <= 57 || e >= 65 && e <= 70 || e >= 97 && e <= 102
        }, isOctalDigit: function (e) {
          return e >= 48 && e <= 55
        }
      }
    }, function (e, t, i) {
      "use strict";
      Object.defineProperty(t, "__esModule", {value: !0});
      var n = i(6), r = function () {
        return function (e) {
          this.type = n.JSXSyntax.JSXClosingElement, this.name = e
        }
      }();
      t.JSXClosingElement = r;
      var s = function () {
        return function (e, t, i) {
          this.type = n.JSXSyntax.JSXElement, this.openingElement = e, this.children = t, this.closingElement = i
        }
      }();
      t.JSXElement = s;
      var a = function () {
        return function () {
          this.type = n.JSXSyntax.JSXEmptyExpression
        }
      }();
      t.JSXEmptyExpression = a;
      var o = function () {
        return function (e) {
          this.type = n.JSXSyntax.JSXExpressionContainer, this.expression = e
        }
      }();
      t.JSXExpressionContainer = o;
      var u = function () {
        return function (e) {
          this.type = n.JSXSyntax.JSXIdentifier, this.name = e
        }
      }();
      t.JSXIdentifier = u;
      var l = function () {
        return function (e, t) {
          this.type = n.JSXSyntax.JSXMemberExpression, this.object = e, this.property = t
        }
      }();
      t.JSXMemberExpression = l;
      var h = function () {
        return function (e, t) {
          this.type = n.JSXSyntax.JSXAttribute, this.name = e, this.value = t
        }
      }();
      t.JSXAttribute = h;
      var c = function () {
        return function (e, t) {
          this.type = n.JSXSyntax.JSXNamespacedName, this.namespace = e, this.name = t
        }
      }();
      t.JSXNamespacedName = c;
      var p = function () {
        return function (e, t, i) {
          this.type = n.JSXSyntax.JSXOpeningElement, this.name = e, this.selfClosing = t, this.attributes = i
        }
      }();
      t.JSXOpeningElement = p;
      var d = function () {
        return function (e) {
          this.type = n.JSXSyntax.JSXSpreadAttribute, this.argument = e
        }
      }();
      t.JSXSpreadAttribute = d;
      var m = function () {
        return function (e, t) {
          this.type = n.JSXSyntax.JSXText, this.value = e, this.raw = t
        }
      }();
      t.JSXText = m
    }, function (e, t) {
      "use strict";
      Object.defineProperty(t, "__esModule", {value: !0}), t.JSXSyntax = {
        JSXAttribute: "JSXAttribute",
        JSXClosingElement: "JSXClosingElement",
        JSXElement: "JSXElement",
        JSXEmptyExpression: "JSXEmptyExpression",
        JSXExpressionContainer: "JSXExpressionContainer",
        JSXIdentifier: "JSXIdentifier",
        JSXMemberExpression: "JSXMemberExpression",
        JSXNamespacedName: "JSXNamespacedName",
        JSXOpeningElement: "JSXOpeningElement",
        JSXSpreadAttribute: "JSXSpreadAttribute",
        JSXText: "JSXText"
      }
    }, function (e, t, i) {
      "use strict";
      Object.defineProperty(t, "__esModule", {value: !0});
      var n = i(2), r = function () {
        return function (e) {
          this.type = n.Syntax.ArrayExpression, this.elements = e
        }
      }();
      t.ArrayExpression = r;
      var s = function () {
        return function (e) {
          this.type = n.Syntax.ArrayPattern, this.elements = e
        }
      }();
      t.ArrayPattern = s;
      var a = function () {
        return function (e, t, i) {
          this.type = n.Syntax.ArrowFunctionExpression, this.id = null, this.params = e, this.body = t, this.generator = !1, this.expression = i, this.async = !1
        }
      }();
      t.ArrowFunctionExpression = a;
      var o = function () {
        return function (e, t, i) {
          this.type = n.Syntax.AssignmentExpression, this.operator = e, this.left = t, this.right = i
        }
      }();
      t.AssignmentExpression = o;
      var u = function () {
        return function (e, t) {
          this.type = n.Syntax.AssignmentPattern, this.left = e, this.right = t
        }
      }();
      t.AssignmentPattern = u;
      var l = function () {
        return function (e, t, i) {
          this.type = n.Syntax.ArrowFunctionExpression, this.id = null, this.params = e, this.body = t, this.generator = !1, this.expression = i, this.async = !0
        }
      }();
      t.AsyncArrowFunctionExpression = l;
      var h = function () {
        return function (e, t, i) {
          this.type = n.Syntax.FunctionDeclaration, this.id = e, this.params = t, this.body = i, this.generator = !1, this.expression = !1, this.async = !0
        }
      }();
      t.AsyncFunctionDeclaration = h;
      var c = function () {
        return function (e, t, i) {
          this.type = n.Syntax.FunctionExpression, this.id = e, this.params = t, this.body = i, this.generator = !1, this.expression = !1, this.async = !0
        }
      }();
      t.AsyncFunctionExpression = c;
      var p = function () {
        return function (e) {
          this.type = n.Syntax.AwaitExpression, this.argument = e
        }
      }();
      t.AwaitExpression = p;
      var d = function () {
        return function (e, t, i) {
          var r = "||" === e || "&&" === e;
          this.type = r ? n.Syntax.LogicalExpression : n.Syntax.BinaryExpression, this.operator = e, this.left = t, this.right = i
        }
      }();
      t.BinaryExpression = d;
      var m = function () {
        return function (e) {
          this.type = n.Syntax.BlockStatement, this.body = e
        }
      }();
      t.BlockStatement = m;
      var f = function () {
        return function (e) {
          this.type = n.Syntax.BreakStatement, this.label = e
        }
      }();
      t.BreakStatement = f;
      var x = function () {
        return function (e, t) {
          this.type = n.Syntax.CallExpression, this.callee = e, this.arguments = t
        }
      }();
      t.CallExpression = x;
      var D = function () {
        return function (e, t) {
          this.type = n.Syntax.CatchClause, this.param = e, this.body = t
        }
      }();
      t.CatchClause = D;
      var y = function () {
        return function (e) {
          this.type = n.Syntax.ClassBody, this.body = e
        }
      }();
      t.ClassBody = y;
      var E = function () {
        return function (e, t, i) {
          this.type = n.Syntax.ClassDeclaration, this.id = e, this.superClass = t, this.body = i
        }
      }();
      t.ClassDeclaration = E;
      var C = function () {
        return function (e, t, i) {
          this.type = n.Syntax.ClassExpression, this.id = e, this.superClass = t, this.body = i
        }
      }();
      t.ClassExpression = C;
      var v = function () {
        return function (e, t) {
          this.type = n.Syntax.MemberExpression, this.computed = !0, this.object = e, this.property = t
        }
      }();
      t.ComputedMemberExpression = v;
      var A = function () {
        return function (e, t, i) {
          this.type = n.Syntax.ConditionalExpression, this.test = e, this.consequent = t, this.alternate = i
        }
      }();
      t.ConditionalExpression = A;
      var g = function () {
        return function (e) {
          this.type = n.Syntax.ContinueStatement, this.label = e
        }
      }();
      t.ContinueStatement = g;
      var S = function () {
        return function () {
          this.type = n.Syntax.DebuggerStatement
        }
      }();
      t.DebuggerStatement = S;
      var F = function () {
        return function (e, t) {
          this.type = n.Syntax.ExpressionStatement, this.expression = e, this.directive = t
        }
      }();
      t.Directive = F;
      var k = function () {
        return function (e, t) {
          this.type = n.Syntax.DoWhileStatement, this.body = e, this.test = t
        }
      }();
      t.DoWhileStatement = k;
      var w = function () {
        return function () {
          this.type = n.Syntax.EmptyStatement
        }
      }();
      t.EmptyStatement = w;
      var b = function () {
        return function (e) {
          this.type = n.Syntax.ExportAllDeclaration, this.source = e
        }
      }();
      t.ExportAllDeclaration = b;
      var B = function () {
        return function (e) {
          this.type = n.Syntax.ExportDefaultDeclaration, this.declaration = e
        }
      }();
      t.ExportDefaultDeclaration = B;
      var T = function () {
        return function (e, t, i) {
          this.type = n.Syntax.ExportNamedDeclaration, this.declaration = e, this.specifiers = t, this.source = i
        }
      }();
      t.ExportNamedDeclaration = T;
      var P = function () {
        return function (e, t) {
          this.type = n.Syntax.ExportSpecifier, this.exported = t, this.local = e
        }
      }();
      t.ExportSpecifier = P;
      var N = function () {
        return function (e) {
          this.type = n.Syntax.ExpressionStatement, this.expression = e
        }
      }();
      t.ExpressionStatement = N;
      var I = function () {
        return function (e, t, i) {
          this.type = n.Syntax.ForInStatement, this.left = e, this.right = t, this.body = i, this.each = !1
        }
      }();
      t.ForInStatement = I;
      var M = function () {
        return function (e, t, i) {
          this.type = n.Syntax.ForOfStatement, this.left = e, this.right = t, this.body = i
        }
      }();
      t.ForOfStatement = M;
      var X = function () {
        return function (e, t, i, r) {
          this.type = n.Syntax.ForStatement, this.init = e, this.test = t, this.update = i, this.body = r
        }
      }();
      t.ForStatement = X;
      var J = function () {
        return function (e, t, i, r) {
          this.type = n.Syntax.FunctionDeclaration, this.id = e, this.params = t, this.body = i, this.generator = r, this.expression = !1, this.async = !1
        }
      }();
      t.FunctionDeclaration = J;
      var L = function () {
        return function (e, t, i, r) {
          this.type = n.Syntax.FunctionExpression, this.id = e, this.params = t, this.body = i, this.generator = r, this.expression = !1, this.async = !1
        }
      }();
      t.FunctionExpression = L;
      var U = function () {
        return function (e) {
          this.type = n.Syntax.Identifier, this.name = e
        }
      }();
      t.Identifier = U;
      var z = function () {
        return function (e, t, i) {
          this.type = n.Syntax.IfStatement, this.test = e, this.consequent = t, this.alternate = i
        }
      }();
      t.IfStatement = z;
      var O = function () {
        return function (e, t) {
          this.type = n.Syntax.ImportDeclaration, this.specifiers = e, this.source = t
        }
      }();
      t.ImportDeclaration = O;
      var _ = function () {
        return function (e) {
          this.type = n.Syntax.ImportDefaultSpecifier, this.local = e
        }
      }();
      t.ImportDefaultSpecifier = _;
      var R = function () {
        return function (e) {
          this.type = n.Syntax.ImportNamespaceSpecifier, this.local = e
        }
      }();
      t.ImportNamespaceSpecifier = R;
      var j = function () {
        return function (e, t) {
          this.type = n.Syntax.ImportSpecifier, this.local = e, this.imported = t
        }
      }();
      t.ImportSpecifier = j;
      var K = function () {
        return function (e, t) {
          this.type = n.Syntax.LabeledStatement, this.label = e, this.body = t
        }
      }();
      t.LabeledStatement = K;
      var H = function () {
        return function (e, t) {
          this.type = n.Syntax.Literal, this.value = e, this.raw = t
        }
      }();
      t.Literal = H;
      var W = function () {
        return function (e, t) {
          this.type = n.Syntax.MetaProperty, this.meta = e, this.property = t
        }
      }();
      t.MetaProperty = W;
      var G = function () {
        return function (e, t, i, r, s) {
          this.type = n.Syntax.MethodDefinition, this.key = e, this.computed = t, this.value = i, this.kind = r, this.static = s
        }
      }();
      t.MethodDefinition = G;
      var V = function () {
        return function (e) {
          this.type = n.Syntax.Program, this.body = e, this.sourceType = "module"
        }
      }();
      t.Module = V;
      var Y = function () {
        return function (e, t) {
          this.type = n.Syntax.NewExpression, this.callee = e, this.arguments = t
        }
      }();
      t.NewExpression = Y;
      var q = function () {
        return function (e) {
          this.type = n.Syntax.ObjectExpression, this.properties = e
        }
      }();
      t.ObjectExpression = q;
      var $ = function () {
        return function (e) {
          this.type = n.Syntax.ObjectPattern, this.properties = e
        }
      }();
      t.ObjectPattern = $;
      var Z = function () {
        return function (e, t, i, r, s, a) {
          this.type = n.Syntax.Property, this.key = t, this.computed = i, this.value = r, this.kind = e, this.method = s, this.shorthand = a
        }
      }();
      t.Property = Z;
      var Q = function () {
        return function (e, t, i, r) {
          this.type = n.Syntax.Literal, this.value = e, this.raw = t, this.regex = {pattern: i, flags: r}
        }
      }();
      t.RegexLiteral = Q;
      var ee = function () {
        return function (e) {
          this.type = n.Syntax.RestElement, this.argument = e
        }
      }();
      t.RestElement = ee;
      var te = function () {
        return function (e) {
          this.type = n.Syntax.ReturnStatement, this.argument = e
        }
      }();
      t.ReturnStatement = te;
      var ie = function () {
        return function (e) {
          this.type = n.Syntax.Program, this.body = e, this.sourceType = "script"
        }
      }();
      t.Script = ie;
      var ne = function () {
        return function (e) {
          this.type = n.Syntax.SequenceExpression, this.expressions = e
        }
      }();
      t.SequenceExpression = ne;
      var re = function () {
        return function (e) {
          this.type = n.Syntax.SpreadElement, this.argument = e
        }
      }();
      t.SpreadElement = re;
      var se = function () {
        return function (e, t) {
          this.type = n.Syntax.MemberExpression, this.computed = !1, this.object = e, this.property = t
        }
      }();
      t.StaticMemberExpression = se;
      var ae = function () {
        return function () {
          this.type = n.Syntax.Super
        }
      }();
      t.Super = ae;
      var oe = function () {
        return function (e, t) {
          this.type = n.Syntax.SwitchCase, this.test = e, this.consequent = t
        }
      }();
      t.SwitchCase = oe;
      var ue = function () {
        return function (e, t) {
          this.type = n.Syntax.SwitchStatement, this.discriminant = e, this.cases = t
        }
      }();
      t.SwitchStatement = ue;
      var le = function () {
        return function (e, t) {
          this.type = n.Syntax.TaggedTemplateExpression, this.tag = e, this.quasi = t
        }
      }();
      t.TaggedTemplateExpression = le;
      var he = function () {
        return function (e, t) {
          this.type = n.Syntax.TemplateElement, this.value = e, this.tail = t
        }
      }();
      t.TemplateElement = he;
      var ce = function () {
        return function (e, t) {
          this.type = n.Syntax.TemplateLiteral, this.quasis = e, this.expressions = t
        }
      }();
      t.TemplateLiteral = ce;
      var pe = function () {
        return function () {
          this.type = n.Syntax.ThisExpression
        }
      }();
      t.ThisExpression = pe;
      var de = function () {
        return function (e) {
          this.type = n.Syntax.ThrowStatement, this.argument = e
        }
      }();
      t.ThrowStatement = de;
      var me = function () {
        return function (e, t, i) {
          this.type = n.Syntax.TryStatement, this.block = e, this.handler = t, this.finalizer = i
        }
      }();
      t.TryStatement = me;
      var fe = function () {
        return function (e, t) {
          this.type = n.Syntax.UnaryExpression, this.operator = e, this.argument = t, this.prefix = !0
        }
      }();
      t.UnaryExpression = fe;
      var xe = function () {
        return function (e, t, i) {
          this.type = n.Syntax.UpdateExpression, this.operator = e, this.argument = t, this.prefix = i
        }
      }();
      t.UpdateExpression = xe;
      var De = function () {
        return function (e, t) {
          this.type = n.Syntax.VariableDeclaration, this.declarations = e, this.kind = t
        }
      }();
      t.VariableDeclaration = De;
      var ye = function () {
        return function (e, t) {
          this.type = n.Syntax.VariableDeclarator, this.id = e, this.init = t
        }
      }();
      t.VariableDeclarator = ye;
      var Ee = function () {
        return function (e, t) {
          this.type = n.Syntax.WhileStatement, this.test = e, this.body = t
        }
      }();
      t.WhileStatement = Ee;
      var Ce = function () {
        return function (e, t) {
          this.type = n.Syntax.WithStatement, this.object = e, this.body = t
        }
      }();
      t.WithStatement = Ce;
      var ve = function () {
        return function (e, t) {
          this.type = n.Syntax.YieldExpression, this.argument = e, this.delegate = t
        }
      }();
      t.YieldExpression = ve
    }, function (e, t, i) {
      "use strict";
      Object.defineProperty(t, "__esModule", {value: !0});
      var n = i(9), r = i(10), s = i(11), a = i(7), o = i(12), u = i(2), l = i(13), h = function () {
        function e(e, t, i) {
          void 0 === t && (t = {}), this.config = {
            range: "boolean" == typeof t.range && t.range,
            loc: "boolean" == typeof t.loc && t.loc,
            source: null,
            tokens: "boolean" == typeof t.tokens && t.tokens,
            comment: "boolean" == typeof t.comment && t.comment,
            tolerant: "boolean" == typeof t.tolerant && t.tolerant
          }, this.config.loc && t.source && null !== t.source && (this.config.source = String(t.source)), this.delegate = i, this.errorHandler = new r.ErrorHandler, this.errorHandler.tolerant = this.config.tolerant, this.scanner = new o.Scanner(e, this.errorHandler), this.scanner.trackComment = this.config.comment, this.operatorPrecedence = {
            ")": 0,
            ";": 0,
            ",": 0,
            "=": 0,
            "]": 0,
            "||": 1,
            "&&": 2,
            "|": 3,
            "^": 4,
            "&": 5,
            "==": 6,
            "!=": 6,
            "===": 6,
            "!==": 6,
            "<": 7,
            ">": 7,
            "<=": 7,
            ">=": 7,
            "<<": 8,
            ">>": 8,
            ">>>": 8,
            "+": 9,
            "-": 9,
            "*": 11,
            "/": 11,
            "%": 11
          }, this.lookahead = {
            type: 2,
            value: "",
            lineNumber: this.scanner.lineNumber,
            lineStart: 0,
            start: 0,
            end: 0
          }, this.hasLineTerminator = !1, this.context = {
            isModule: !1,
            await: !1,
            allowIn: !0,
            allowStrictDirective: !0,
            allowYield: !0,
            firstCoverInitializedNameError: null,
            isAssignmentTarget: !1,
            isBindingElement: !1,
            inFunctionBody: !1,
            inIteration: !1,
            inSwitch: !1,
            labelSet: {},
            strict: !1
          }, this.tokens = [], this.startMarker = {
            index: 0,
            line: this.scanner.lineNumber,
            column: 0
          }, this.lastMarker = {
            index: 0,
            line: this.scanner.lineNumber,
            column: 0
          }, this.nextToken(), this.lastMarker = {
            index: this.scanner.index,
            line: this.scanner.lineNumber,
            column: this.scanner.index - this.scanner.lineStart
          }
        }

        return e.prototype.throwError = function (e) {
          for (var t = [], i = 1; i < arguments.length; i++) t[i - 1] = arguments[i];
          var r = Array.prototype.slice.call(arguments, 1), s = e.replace(/%(\d)/g, function (e, t) {
            return n.assert(t < r.length, "Message reference must be in range"), r[t]
          }), a = this.lastMarker.index, o = this.lastMarker.line, u = this.lastMarker.column + 1;
          throw this.errorHandler.createError(a, o, u, s)
        }, e.prototype.tolerateError = function (e) {
          for (var t = [], i = 1; i < arguments.length; i++) t[i - 1] = arguments[i];
          var r = Array.prototype.slice.call(arguments, 1), s = e.replace(/%(\d)/g, function (e, t) {
            return n.assert(t < r.length, "Message reference must be in range"), r[t]
          }), a = this.lastMarker.index, o = this.scanner.lineNumber, u = this.lastMarker.column + 1;
          this.errorHandler.tolerateError(a, o, u, s)
        }, e.prototype.unexpectedTokenError = function (e, t) {
          var i, n = t || s.Messages.UnexpectedToken;
          if (e ? (t || (n = 2 === e.type ? s.Messages.UnexpectedEOS : 3 === e.type ? s.Messages.UnexpectedIdentifier : 6 === e.type ? s.Messages.UnexpectedNumber : 8 === e.type ? s.Messages.UnexpectedString : 10 === e.type ? s.Messages.UnexpectedTemplate : s.Messages.UnexpectedToken, 4 === e.type && (this.scanner.isFutureReservedWord(e.value) ? n = s.Messages.UnexpectedReserved : this.context.strict && this.scanner.isStrictModeReservedWord(e.value) && (n = s.Messages.StrictReservedWord))), i = e.value) : i = "ILLEGAL", n = n.replace("%0", i), e && "number" == typeof e.lineNumber) {
            var r = e.start, a = e.lineNumber, o = this.lastMarker.index - this.lastMarker.column, u = e.start - o + 1;
            return this.errorHandler.createError(r, a, u, n)
          }
          r = this.lastMarker.index, a = this.lastMarker.line, u = this.lastMarker.column + 1;
          return this.errorHandler.createError(r, a, u, n)
        }, e.prototype.throwUnexpectedToken = function (e, t) {
          throw this.unexpectedTokenError(e, t)
        }, e.prototype.tolerateUnexpectedToken = function (e, t) {
          this.errorHandler.tolerate(this.unexpectedTokenError(e, t))
        }, e.prototype.collectComments = function () {
          if (this.config.comment) {
            var e = this.scanner.scanComments();
            if (e.length > 0 && this.delegate) for (var t = 0; t < e.length; ++t) {
              var i = e[t], n = void 0;
              n = {
                type: i.multiLine ? "BlockComment" : "LineComment",
                value: this.scanner.source.slice(i.slice[0], i.slice[1])
              }, this.config.range && (n.range = i.range), this.config.loc && (n.loc = i.loc);
              var r = {
                start: {line: i.loc.start.line, column: i.loc.start.column, offset: i.range[0]},
                end: {line: i.loc.end.line, column: i.loc.end.column, offset: i.range[1]}
              };
              this.delegate(n, r)
            }
          } else this.scanner.scanComments()
        }, e.prototype.getTokenRaw = function (e) {
          return this.scanner.source.slice(e.start, e.end)
        }, e.prototype.convertToken = function (e) {
          var t = {type: l.TokenName[e.type], value: this.getTokenRaw(e)};
          if (this.config.range && (t.range = [e.start, e.end]), this.config.loc && (t.loc = {
            start: {
              line: this.startMarker.line,
              column: this.startMarker.column
            }, end: {line: this.scanner.lineNumber, column: this.scanner.index - this.scanner.lineStart}
          }), 9 === e.type) {
            var i = e.pattern, n = e.flags;
            t.regex = {pattern: i, flags: n}
          }
          return t
        }, e.prototype.nextToken = function () {
          var e = this.lookahead;
          this.lastMarker.index = this.scanner.index, this.lastMarker.line = this.scanner.lineNumber, this.lastMarker.column = this.scanner.index - this.scanner.lineStart, this.collectComments(), this.scanner.index !== this.startMarker.index && (this.startMarker.index = this.scanner.index, this.startMarker.line = this.scanner.lineNumber, this.startMarker.column = this.scanner.index - this.scanner.lineStart);
          var t = this.scanner.lex();
          return this.hasLineTerminator = e.lineNumber !== t.lineNumber, t && this.context.strict && 3 === t.type && this.scanner.isStrictModeReservedWord(t.value) && (t.type = 4), this.lookahead = t, this.config.tokens && 2 !== t.type && this.tokens.push(this.convertToken(t)), e
        }, e.prototype.nextRegexToken = function () {
          this.collectComments();
          var e = this.scanner.scanRegExp();
          return this.config.tokens && (this.tokens.pop(), this.tokens.push(this.convertToken(e))), this.lookahead = e, this.nextToken(), e
        }, e.prototype.createNode = function () {
          return {index: this.startMarker.index, line: this.startMarker.line, column: this.startMarker.column}
        }, e.prototype.startNode = function (e, t) {
          void 0 === t && (t = 0);
          var i = e.start - e.lineStart, n = e.lineNumber;
          return i < 0 && (i += t, n--), {index: e.start, line: n, column: i}
        }, e.prototype.finalize = function (e, t) {
          if (this.config.range && (t.range = [e.index, this.lastMarker.index]), this.config.loc && (t.loc = {
            start: {
              line: e.line,
              column: e.column
            }, end: {line: this.lastMarker.line, column: this.lastMarker.column}
          }, this.config.source && (t.loc.source = this.config.source)), this.delegate) {
            var i = {
              start: {line: e.line, column: e.column, offset: e.index},
              end: {line: this.lastMarker.line, column: this.lastMarker.column, offset: this.lastMarker.index}
            };
            this.delegate(t, i)
          }
          return t
        }, e.prototype.expect = function (e) {
          var t = this.nextToken();
          7 === t.type && t.value === e || this.throwUnexpectedToken(t)
        }, e.prototype.expectCommaSeparator = function () {
          if (this.config.tolerant) {
            var e = this.lookahead;
            7 === e.type && "," === e.value ? this.nextToken() : 7 === e.type && ";" === e.value ? (this.nextToken(), this.tolerateUnexpectedToken(e)) : this.tolerateUnexpectedToken(e, s.Messages.UnexpectedToken)
          } else this.expect(",")
        }, e.prototype.expectKeyword = function (e) {
          var t = this.nextToken();
          4 === t.type && t.value === e || this.throwUnexpectedToken(t)
        }, e.prototype.match = function (e) {
          return 7 === this.lookahead.type && this.lookahead.value === e
        }, e.prototype.matchKeyword = function (e) {
          return 4 === this.lookahead.type && this.lookahead.value === e
        }, e.prototype.matchContextualKeyword = function (e) {
          return 3 === this.lookahead.type && this.lookahead.value === e
        }, e.prototype.matchAssign = function () {
          if (7 !== this.lookahead.type) return !1;
          var e = this.lookahead.value;
          return "=" === e || "*=" === e || "**=" === e || "/=" === e || "%=" === e || "+=" === e || "-=" === e || "<<=" === e || ">>=" === e || ">>>=" === e || "&=" === e || "^=" === e || "|=" === e
        }, e.prototype.isolateCoverGrammar = function (e) {
          var t = this.context.isBindingElement, i = this.context.isAssignmentTarget,
              n = this.context.firstCoverInitializedNameError;
          this.context.isBindingElement = !0, this.context.isAssignmentTarget = !0, this.context.firstCoverInitializedNameError = null;
          var r = e.call(this);
          return null !== this.context.firstCoverInitializedNameError && this.throwUnexpectedToken(this.context.firstCoverInitializedNameError), this.context.isBindingElement = t, this.context.isAssignmentTarget = i, this.context.firstCoverInitializedNameError = n, r
        }, e.prototype.inheritCoverGrammar = function (e) {
          var t = this.context.isBindingElement, i = this.context.isAssignmentTarget,
              n = this.context.firstCoverInitializedNameError;
          this.context.isBindingElement = !0, this.context.isAssignmentTarget = !0, this.context.firstCoverInitializedNameError = null;
          var r = e.call(this);
          return this.context.isBindingElement = this.context.isBindingElement && t, this.context.isAssignmentTarget = this.context.isAssignmentTarget && i, this.context.firstCoverInitializedNameError = n || this.context.firstCoverInitializedNameError, r
        }, e.prototype.consumeSemicolon = function () {
          this.match(";") ? this.nextToken() : this.hasLineTerminator || (2 === this.lookahead.type || this.match("}") || this.throwUnexpectedToken(this.lookahead), this.lastMarker.index = this.startMarker.index, this.lastMarker.line = this.startMarker.line, this.lastMarker.column = this.startMarker.column)
        }, e.prototype.parsePrimaryExpression = function () {
          var e, t, i, n = this.createNode();
          switch (this.lookahead.type) {
            case 3:
              (this.context.isModule || this.context.await) && "await" === this.lookahead.value && this.tolerateUnexpectedToken(this.lookahead), e = this.matchAsyncFunction() ? this.parseFunctionExpression() : this.finalize(n, new a.Identifier(this.nextToken().value));
              break;
            case 6:
            case 8:
              this.context.strict && this.lookahead.octal && this.tolerateUnexpectedToken(this.lookahead, s.Messages.StrictOctalLiteral), this.context.isAssignmentTarget = !1, this.context.isBindingElement = !1, t = this.nextToken(), i = this.getTokenRaw(t), e = this.finalize(n, new a.Literal(t.value, i));
              break;
            case 1:
              this.context.isAssignmentTarget = !1, this.context.isBindingElement = !1, t = this.nextToken(), i = this.getTokenRaw(t), e = this.finalize(n, new a.Literal("true" === t.value, i));
              break;
            case 5:
              this.context.isAssignmentTarget = !1, this.context.isBindingElement = !1, t = this.nextToken(), i = this.getTokenRaw(t), e = this.finalize(n, new a.Literal(null, i));
              break;
            case 10:
              e = this.parseTemplateLiteral();
              break;
            case 7:
              switch (this.lookahead.value) {
                case"(":
                  this.context.isBindingElement = !1, e = this.inheritCoverGrammar(this.parseGroupExpression);
                  break;
                case"[":
                  e = this.inheritCoverGrammar(this.parseArrayInitializer);
                  break;
                case"{":
                  e = this.inheritCoverGrammar(this.parseObjectInitializer);
                  break;
                case"/":
                case"/=":
                  this.context.isAssignmentTarget = !1, this.context.isBindingElement = !1, this.scanner.index = this.startMarker.index, t = this.nextRegexToken(), i = this.getTokenRaw(t), e = this.finalize(n, new a.RegexLiteral(t.regex, i, t.pattern, t.flags));
                  break;
                default:
                  e = this.throwUnexpectedToken(this.nextToken())
              }
              break;
            case 4:
              !this.context.strict && this.context.allowYield && this.matchKeyword("yield") ? e = this.parseIdentifierName() : !this.context.strict && this.matchKeyword("let") ? e = this.finalize(n, new a.Identifier(this.nextToken().value)) : (this.context.isAssignmentTarget = !1, this.context.isBindingElement = !1, this.matchKeyword("function") ? e = this.parseFunctionExpression() : this.matchKeyword("this") ? (this.nextToken(), e = this.finalize(n, new a.ThisExpression)) : e = this.matchKeyword("class") ? this.parseClassExpression() : this.throwUnexpectedToken(this.nextToken()));
              break;
            default:
              e = this.throwUnexpectedToken(this.nextToken())
          }
          return e
        }, e.prototype.parseSpreadElement = function () {
          var e = this.createNode();
          this.expect("...");
          var t = this.inheritCoverGrammar(this.parseAssignmentExpression);
          return this.finalize(e, new a.SpreadElement(t))
        }, e.prototype.parseArrayInitializer = function () {
          var e = this.createNode(), t = [];
          for (this.expect("["); !this.match("]");) if (this.match(",")) this.nextToken(), t.push(null); else if (this.match("...")) {
            var i = this.parseSpreadElement();
            this.match("]") || (this.context.isAssignmentTarget = !1, this.context.isBindingElement = !1, this.expect(",")), t.push(i)
          } else t.push(this.inheritCoverGrammar(this.parseAssignmentExpression)), this.match("]") || this.expect(",");
          return this.expect("]"), this.finalize(e, new a.ArrayExpression(t))
        }, e.prototype.parsePropertyMethod = function (e) {
          this.context.isAssignmentTarget = !1, this.context.isBindingElement = !1;
          var t = this.context.strict, i = this.context.allowStrictDirective;
          this.context.allowStrictDirective = e.simple;
          var n = this.isolateCoverGrammar(this.parseFunctionSourceElements);
          return this.context.strict && e.firstRestricted && this.tolerateUnexpectedToken(e.firstRestricted, e.message), this.context.strict && e.stricted && this.tolerateUnexpectedToken(e.stricted, e.message), this.context.strict = t, this.context.allowStrictDirective = i, n
        }, e.prototype.parsePropertyMethodFunction = function () {
          var e = this.createNode(), t = this.context.allowYield;
          this.context.allowYield = !0;
          var i = this.parseFormalParameters(), n = this.parsePropertyMethod(i);
          return this.context.allowYield = t, this.finalize(e, new a.FunctionExpression(null, i.params, n, !1))
        }, e.prototype.parsePropertyMethodAsyncFunction = function () {
          var e = this.createNode(), t = this.context.allowYield, i = this.context.await;
          this.context.allowYield = !1, this.context.await = !0;
          var n = this.parseFormalParameters(), r = this.parsePropertyMethod(n);
          return this.context.allowYield = t, this.context.await = i, this.finalize(e, new a.AsyncFunctionExpression(null, n.params, r))
        }, e.prototype.parseObjectPropertyKey = function () {
          var e, t = this.createNode(), i = this.nextToken();
          switch (i.type) {
            case 8:
            case 6:
              this.context.strict && i.octal && this.tolerateUnexpectedToken(i, s.Messages.StrictOctalLiteral);
              var n = this.getTokenRaw(i);
              e = this.finalize(t, new a.Literal(i.value, n));
              break;
            case 3:
            case 1:
            case 5:
            case 4:
              e = this.finalize(t, new a.Identifier(i.value));
              break;
            case 7:
              "[" === i.value ? (e = this.isolateCoverGrammar(this.parseAssignmentExpression), this.expect("]")) : e = this.throwUnexpectedToken(i);
              break;
            default:
              e = this.throwUnexpectedToken(i)
          }
          return e
        }, e.prototype.isPropertyKey = function (e, t) {
          return e.type === u.Syntax.Identifier && e.name === t || e.type === u.Syntax.Literal && e.value === t
        }, e.prototype.parseObjectProperty = function (e) {
          var t, i = this.createNode(), n = this.lookahead, r = null, o = null, u = !1, l = !1, h = !1, c = !1;
          if (3 === n.type) {
            var p = n.value;
            this.nextToken(), u = this.match("["), r = (c = !(this.hasLineTerminator || "async" !== p || this.match(":") || this.match("(") || this.match("*") || this.match(","))) ? this.parseObjectPropertyKey() : this.finalize(i, new a.Identifier(p))
          } else this.match("*") ? this.nextToken() : (u = this.match("["), r = this.parseObjectPropertyKey());
          var d = this.qualifiedPropertyName(this.lookahead);
          if (3 === n.type && !c && "get" === n.value && d) t = "get", u = this.match("["), r = this.parseObjectPropertyKey(), this.context.allowYield = !1, o = this.parseGetterMethod(); else if (3 === n.type && !c && "set" === n.value && d) t = "set", u = this.match("["), r = this.parseObjectPropertyKey(), o = this.parseSetterMethod(); else if (7 === n.type && "*" === n.value && d) t = "init", u = this.match("["), r = this.parseObjectPropertyKey(), o = this.parseGeneratorMethod(), l = !0; else if (r || this.throwUnexpectedToken(this.lookahead), t = "init", this.match(":") && !c) !u && this.isPropertyKey(r, "__proto__") && (e.value && this.tolerateError(s.Messages.DuplicateProtoProperty), e.value = !0), this.nextToken(), o = this.inheritCoverGrammar(this.parseAssignmentExpression); else if (this.match("(")) o = c ? this.parsePropertyMethodAsyncFunction() : this.parsePropertyMethodFunction(), l = !0; else if (3 === n.type) {
            p = this.finalize(i, new a.Identifier(n.value));
            if (this.match("=")) {
              this.context.firstCoverInitializedNameError = this.lookahead, this.nextToken(), h = !0;
              var m = this.isolateCoverGrammar(this.parseAssignmentExpression);
              o = this.finalize(i, new a.AssignmentPattern(p, m))
            } else h = !0, o = p
          } else this.throwUnexpectedToken(this.nextToken());
          return this.finalize(i, new a.Property(t, r, u, o, l, h))
        }, e.prototype.parseObjectInitializer = function () {
          var e = this.createNode();
          this.expect("{");
          for (var t = [], i = {value: !1}; !this.match("}");) t.push(this.parseObjectProperty(i)), this.match("}") || this.expectCommaSeparator();
          return this.expect("}"), this.finalize(e, new a.ObjectExpression(t))
        }, e.prototype.parseTemplateHead = function () {
          n.assert(this.lookahead.head, "Template literal must start with a template head");
          var e = this.createNode(), t = this.nextToken(), i = t.value, r = t.cooked;
          return this.finalize(e, new a.TemplateElement({raw: i, cooked: r}, t.tail))
        }, e.prototype.parseTemplateElement = function () {
          10 !== this.lookahead.type && this.throwUnexpectedToken();
          var e = this.createNode(), t = this.nextToken(), i = t.value, n = t.cooked;
          return this.finalize(e, new a.TemplateElement({raw: i, cooked: n}, t.tail))
        }, e.prototype.parseTemplateLiteral = function () {
          var e = this.createNode(), t = [], i = [], n = this.parseTemplateHead();
          for (i.push(n); !n.tail;) t.push(this.parseExpression()), n = this.parseTemplateElement(), i.push(n);
          return this.finalize(e, new a.TemplateLiteral(i, t))
        }, e.prototype.reinterpretExpressionAsPattern = function (e) {
          switch (e.type) {
            case u.Syntax.Identifier:
            case u.Syntax.MemberExpression:
            case u.Syntax.RestElement:
            case u.Syntax.AssignmentPattern:
              break;
            case u.Syntax.SpreadElement:
              e.type = u.Syntax.RestElement, this.reinterpretExpressionAsPattern(e.argument);
              break;
            case u.Syntax.ArrayExpression:
              e.type = u.Syntax.ArrayPattern;
              for (var t = 0; t < e.elements.length; t++) null !== e.elements[t] && this.reinterpretExpressionAsPattern(e.elements[t]);
              break;
            case u.Syntax.ObjectExpression:
              e.type = u.Syntax.ObjectPattern;
              for (t = 0; t < e.properties.length; t++) this.reinterpretExpressionAsPattern(e.properties[t].value);
              break;
            case u.Syntax.AssignmentExpression:
              e.type = u.Syntax.AssignmentPattern, delete e.operator, this.reinterpretExpressionAsPattern(e.left)
          }
        }, e.prototype.parseGroupExpression = function () {
          var e;
          if (this.expect("("), this.match(")")) this.nextToken(), this.match("=>") || this.expect("=>"), e = {
            type: "ArrowParameterPlaceHolder",
            params: [],
            async: !1
          }; else {
            var t = this.lookahead, i = [];
            if (this.match("...")) e = this.parseRestElement(i), this.expect(")"), this.match("=>") || this.expect("=>"), e = {
              type: "ArrowParameterPlaceHolder",
              params: [e],
              async: !1
            }; else {
              var n = !1;
              if (this.context.isBindingElement = !0, e = this.inheritCoverGrammar(this.parseAssignmentExpression), this.match(",")) {
                var r = [];
                for (this.context.isAssignmentTarget = !1, r.push(e); 2 !== this.lookahead.type && this.match(",");) {
                  if (this.nextToken(), this.match(")")) {
                    this.nextToken();
                    for (var s = 0; s < r.length; s++) this.reinterpretExpressionAsPattern(r[s]);
                    n = !0, e = {type: "ArrowParameterPlaceHolder", params: r, async: !1}
                  } else if (this.match("...")) {
                    this.context.isBindingElement || this.throwUnexpectedToken(this.lookahead), r.push(this.parseRestElement(i)), this.expect(")"), this.match("=>") || this.expect("=>"), this.context.isBindingElement = !1;
                    for (s = 0; s < r.length; s++) this.reinterpretExpressionAsPattern(r[s]);
                    n = !0, e = {type: "ArrowParameterPlaceHolder", params: r, async: !1}
                  } else r.push(this.inheritCoverGrammar(this.parseAssignmentExpression));
                  if (n) break
                }
                n || (e = this.finalize(this.startNode(t), new a.SequenceExpression(r)))
              }
              if (!n) {
                if (this.expect(")"), this.match("=>") && (e.type === u.Syntax.Identifier && "yield" === e.name && (n = !0, e = {
                  type: "ArrowParameterPlaceHolder",
                  params: [e],
                  async: !1
                }), !n)) {
                  if (this.context.isBindingElement || this.throwUnexpectedToken(this.lookahead), e.type === u.Syntax.SequenceExpression) for (s = 0; s < e.expressions.length; s++) this.reinterpretExpressionAsPattern(e.expressions[s]); else this.reinterpretExpressionAsPattern(e);
                  e = {
                    type: "ArrowParameterPlaceHolder",
                    params: e.type === u.Syntax.SequenceExpression ? e.expressions : [e],
                    async: !1
                  }
                }
                this.context.isBindingElement = !1
              }
            }
          }
          return e
        }, e.prototype.parseArguments = function () {
          this.expect("(");
          var e = [];
          if (!this.match(")")) for (; ;) {
            var t = this.match("...") ? this.parseSpreadElement() : this.isolateCoverGrammar(this.parseAssignmentExpression);
            if (e.push(t), this.match(")")) break;
            if (this.expectCommaSeparator(), this.match(")")) break
          }
          return this.expect(")"), e
        }, e.prototype.isIdentifierName = function (e) {
          return 3 === e.type || 4 === e.type || 1 === e.type || 5 === e.type
        }, e.prototype.parseIdentifierName = function () {
          var e = this.createNode(), t = this.nextToken();
          return this.isIdentifierName(t) || this.throwUnexpectedToken(t), this.finalize(e, new a.Identifier(t.value))
        }, e.prototype.parseNewExpression = function () {
          var e, t = this.createNode(), i = this.parseIdentifierName();
          if (n.assert("new" === i.name, "New expression must start with `new`"), this.match(".")) if (this.nextToken(), 3 === this.lookahead.type && this.context.inFunctionBody && "target" === this.lookahead.value) {
            var r = this.parseIdentifierName();
            e = new a.MetaProperty(i, r)
          } else this.throwUnexpectedToken(this.lookahead); else {
            var s = this.isolateCoverGrammar(this.parseLeftHandSideExpression),
                o = this.match("(") ? this.parseArguments() : [];
            e = new a.NewExpression(s, o), this.context.isAssignmentTarget = !1, this.context.isBindingElement = !1
          }
          return this.finalize(t, e)
        }, e.prototype.parseAsyncArgument = function () {
          var e = this.parseAssignmentExpression();
          return this.context.firstCoverInitializedNameError = null, e
        }, e.prototype.parseAsyncArguments = function () {
          this.expect("(");
          var e = [];
          if (!this.match(")")) for (; ;) {
            var t = this.match("...") ? this.parseSpreadElement() : this.isolateCoverGrammar(this.parseAsyncArgument);
            if (e.push(t), this.match(")")) break;
            if (this.expectCommaSeparator(), this.match(")")) break
          }
          return this.expect(")"), e
        }, e.prototype.parseLeftHandSideExpressionAllowCall = function () {
          var e, t = this.lookahead, i = this.matchContextualKeyword("async"), n = this.context.allowIn;
          for (this.context.allowIn = !0, this.matchKeyword("super") && this.context.inFunctionBody ? (e = this.createNode(), this.nextToken(), e = this.finalize(e, new a.Super), this.match("(") || this.match(".") || this.match("[") || this.throwUnexpectedToken(this.lookahead)) : e = this.inheritCoverGrammar(this.matchKeyword("new") ? this.parseNewExpression : this.parsePrimaryExpression); ;) if (this.match(".")) {
            this.context.isBindingElement = !1, this.context.isAssignmentTarget = !0, this.expect(".");
            var r = this.parseIdentifierName();
            e = this.finalize(this.startNode(t), new a.StaticMemberExpression(e, r))
          } else if (this.match("(")) {
            var s = i && t.lineNumber === this.lookahead.lineNumber;
            this.context.isBindingElement = !1, this.context.isAssignmentTarget = !1;
            var o = s ? this.parseAsyncArguments() : this.parseArguments();
            if (e = this.finalize(this.startNode(t), new a.CallExpression(e, o)), s && this.match("=>")) {
              for (var u = 0; u < o.length; ++u) this.reinterpretExpressionAsPattern(o[u]);
              e = {type: "ArrowParameterPlaceHolder", params: o, async: !0}
            }
          } else if (this.match("[")) {
            this.context.isBindingElement = !1, this.context.isAssignmentTarget = !0, this.expect("[");
            r = this.isolateCoverGrammar(this.parseExpression);
            this.expect("]"), e = this.finalize(this.startNode(t), new a.ComputedMemberExpression(e, r))
          } else {
            if (10 !== this.lookahead.type || !this.lookahead.head) break;
            var l = this.parseTemplateLiteral();
            e = this.finalize(this.startNode(t), new a.TaggedTemplateExpression(e, l))
          }
          return this.context.allowIn = n, e
        }, e.prototype.parseSuper = function () {
          var e = this.createNode();
          return this.expectKeyword("super"), this.match("[") || this.match(".") || this.throwUnexpectedToken(this.lookahead), this.finalize(e, new a.Super)
        }, e.prototype.parseLeftHandSideExpression = function () {
          n.assert(this.context.allowIn, "callee of new expression always allow in keyword.");
          for (var e = this.startNode(this.lookahead), t = this.matchKeyword("super") && this.context.inFunctionBody ? this.parseSuper() : this.inheritCoverGrammar(this.matchKeyword("new") ? this.parseNewExpression : this.parsePrimaryExpression); ;) if (this.match("[")) {
            this.context.isBindingElement = !1, this.context.isAssignmentTarget = !0, this.expect("[");
            var i = this.isolateCoverGrammar(this.parseExpression);
            this.expect("]"), t = this.finalize(e, new a.ComputedMemberExpression(t, i))
          } else if (this.match(".")) {
            this.context.isBindingElement = !1, this.context.isAssignmentTarget = !0, this.expect(".");
            i = this.parseIdentifierName();
            t = this.finalize(e, new a.StaticMemberExpression(t, i))
          } else {
            if (10 !== this.lookahead.type || !this.lookahead.head) break;
            var r = this.parseTemplateLiteral();
            t = this.finalize(e, new a.TaggedTemplateExpression(t, r))
          }
          return t
        }, e.prototype.parseUpdateExpression = function () {
          var e, t = this.lookahead;
          if (this.match("++") || this.match("--")) {
            var i = this.startNode(t), n = this.nextToken();
            e = this.inheritCoverGrammar(this.parseUnaryExpression), this.context.strict && e.type === u.Syntax.Identifier && this.scanner.isRestrictedWord(e.name) && this.tolerateError(s.Messages.StrictLHSPrefix), this.context.isAssignmentTarget || this.tolerateError(s.Messages.InvalidLHSInAssignment);
            var r = !0;
            e = this.finalize(i, new a.UpdateExpression(n.value, e, r)), this.context.isAssignmentTarget = !1, this.context.isBindingElement = !1
          } else if (e = this.inheritCoverGrammar(this.parseLeftHandSideExpressionAllowCall), !this.hasLineTerminator && 7 === this.lookahead.type && (this.match("++") || this.match("--"))) {
            this.context.strict && e.type === u.Syntax.Identifier && this.scanner.isRestrictedWord(e.name) && this.tolerateError(s.Messages.StrictLHSPostfix), this.context.isAssignmentTarget || this.tolerateError(s.Messages.InvalidLHSInAssignment), this.context.isAssignmentTarget = !1, this.context.isBindingElement = !1;
            var o = this.nextToken().value;
            r = !1;
            e = this.finalize(this.startNode(t), new a.UpdateExpression(o, e, r))
          }
          return e
        }, e.prototype.parseAwaitExpression = function () {
          var e = this.createNode();
          this.nextToken();
          var t = this.parseUnaryExpression();
          return this.finalize(e, new a.AwaitExpression(t))
        }, e.prototype.parseUnaryExpression = function () {
          var e;
          if (this.match("+") || this.match("-") || this.match("~") || this.match("!") || this.matchKeyword("delete") || this.matchKeyword("void") || this.matchKeyword("typeof")) {
            var t = this.startNode(this.lookahead), i = this.nextToken();
            e = this.inheritCoverGrammar(this.parseUnaryExpression), e = this.finalize(t, new a.UnaryExpression(i.value, e)), this.context.strict && "delete" === e.operator && e.argument.type === u.Syntax.Identifier && this.tolerateError(s.Messages.StrictDelete), this.context.isAssignmentTarget = !1, this.context.isBindingElement = !1
          } else e = this.context.await && this.matchContextualKeyword("await") ? this.parseAwaitExpression() : this.parseUpdateExpression();
          return e
        }, e.prototype.parseExponentiationExpression = function () {
          var e = this.lookahead, t = this.inheritCoverGrammar(this.parseUnaryExpression);
          if (t.type !== u.Syntax.UnaryExpression && this.match("**")) {
            this.nextToken(), this.context.isAssignmentTarget = !1, this.context.isBindingElement = !1;
            var i = t, n = this.isolateCoverGrammar(this.parseExponentiationExpression);
            t = this.finalize(this.startNode(e), new a.BinaryExpression("**", i, n))
          }
          return t
        }, e.prototype.binaryPrecedence = function (e) {
          var t = e.value;
          return 7 === e.type ? this.operatorPrecedence[t] || 0 : 4 === e.type && ("instanceof" === t || this.context.allowIn && "in" === t) ? 7 : 0
        }, e.prototype.parseBinaryExpression = function () {
          var e = this.lookahead, t = this.inheritCoverGrammar(this.parseExponentiationExpression), i = this.lookahead,
              n = this.binaryPrecedence(i);
          if (n > 0) {
            this.nextToken(), this.context.isAssignmentTarget = !1, this.context.isBindingElement = !1;
            for (var r = [e, this.lookahead], s = t, o = this.isolateCoverGrammar(this.parseExponentiationExpression), u = [s, i.value, o], l = [n]; !((n = this.binaryPrecedence(this.lookahead)) <= 0);) {
              for (; u.length > 2 && n <= l[l.length - 1];) {
                o = u.pop();
                var h = u.pop();
                l.pop(), s = u.pop(), r.pop();
                var c = this.startNode(r[r.length - 1]);
                u.push(this.finalize(c, new a.BinaryExpression(h, s, o)))
              }
              u.push(this.nextToken().value), l.push(n), r.push(this.lookahead), u.push(this.isolateCoverGrammar(this.parseExponentiationExpression))
            }
            var p = u.length - 1;
            t = u[p];
            for (var d = r.pop(); p > 1;) {
              var m = r.pop(), f = d && d.lineStart;
              c = this.startNode(m, f), h = u[p - 1];
              t = this.finalize(c, new a.BinaryExpression(h, u[p - 2], t)), p -= 2, d = m
            }
          }
          return t
        }, e.prototype.parseConditionalExpression = function () {
          var e = this.lookahead, t = this.inheritCoverGrammar(this.parseBinaryExpression);
          if (this.match("?")) {
            this.nextToken();
            var i = this.context.allowIn;
            this.context.allowIn = !0;
            var n = this.isolateCoverGrammar(this.parseAssignmentExpression);
            this.context.allowIn = i, this.expect(":");
            var r = this.isolateCoverGrammar(this.parseAssignmentExpression);
            t = this.finalize(this.startNode(e), new a.ConditionalExpression(t, n, r)), this.context.isAssignmentTarget = !1, this.context.isBindingElement = !1
          }
          return t
        }, e.prototype.checkPatternParam = function (e, t) {
          switch (t.type) {
            case u.Syntax.Identifier:
              this.validateParam(e, t, t.name);
              break;
            case u.Syntax.RestElement:
              this.checkPatternParam(e, t.argument);
              break;
            case u.Syntax.AssignmentPattern:
              this.checkPatternParam(e, t.left);
              break;
            case u.Syntax.ArrayPattern:
              for (var i = 0; i < t.elements.length; i++) null !== t.elements[i] && this.checkPatternParam(e, t.elements[i]);
              break;
            case u.Syntax.ObjectPattern:
              for (i = 0; i < t.properties.length; i++) this.checkPatternParam(e, t.properties[i].value)
          }
          e.simple = e.simple && t instanceof a.Identifier
        }, e.prototype.reinterpretAsCoverFormalsList = function (e) {
          var t, i = [e], n = !1;
          switch (e.type) {
            case u.Syntax.Identifier:
              break;
            case"ArrowParameterPlaceHolder":
              i = e.params, n = e.async;
              break;
            default:
              return null
          }
          t = {simple: !0, paramSet: {}};
          for (var r = 0; r < i.length; ++r) {
            (a = i[r]).type === u.Syntax.AssignmentPattern ? a.right.type === u.Syntax.YieldExpression && (a.right.argument && this.throwUnexpectedToken(this.lookahead), a.right.type = u.Syntax.Identifier, a.right.name = "yield", delete a.right.argument, delete a.right.delegate) : n && a.type === u.Syntax.Identifier && "await" === a.name && this.throwUnexpectedToken(this.lookahead), this.checkPatternParam(t, a), i[r] = a
          }
          if (this.context.strict || !this.context.allowYield) for (r = 0; r < i.length; ++r) {
            var a;
            (a = i[r]).type === u.Syntax.YieldExpression && this.throwUnexpectedToken(this.lookahead)
          }
          if (t.message === s.Messages.StrictParamDupe) {
            var o = this.context.strict ? t.stricted : t.firstRestricted;
            this.throwUnexpectedToken(o, t.message)
          }
          return {
            simple: t.simple,
            params: i,
            stricted: t.stricted,
            firstRestricted: t.firstRestricted,
            message: t.message
          }
        }, e.prototype.parseAssignmentExpression = function () {
          var e;
          if (!this.context.allowYield && this.matchKeyword("yield")) e = this.parseYieldExpression(); else {
            var t = this.lookahead, i = t;
            if (e = this.parseConditionalExpression(), 3 === i.type && i.lineNumber === this.lookahead.lineNumber && "async" === i.value && (3 === this.lookahead.type || this.matchKeyword("yield"))) {
              var n = this.parsePrimaryExpression();
              this.reinterpretExpressionAsPattern(n), e = {type: "ArrowParameterPlaceHolder", params: [n], async: !0}
            }
            if ("ArrowParameterPlaceHolder" === e.type || this.match("=>")) {
              this.context.isAssignmentTarget = !1, this.context.isBindingElement = !1;
              var r = e.async, o = this.reinterpretAsCoverFormalsList(e);
              if (o) {
                this.hasLineTerminator && this.tolerateUnexpectedToken(this.lookahead), this.context.firstCoverInitializedNameError = null;
                var l = this.context.strict, h = this.context.allowStrictDirective;
                this.context.allowStrictDirective = o.simple;
                var c = this.context.allowYield, p = this.context.await;
                this.context.allowYield = !0, this.context.await = r;
                var d = this.startNode(t);
                this.expect("=>");
                var m = void 0;
                if (this.match("{")) {
                  var f = this.context.allowIn;
                  this.context.allowIn = !0, m = this.parseFunctionSourceElements(), this.context.allowIn = f
                } else m = this.isolateCoverGrammar(this.parseAssignmentExpression);
                var x = m.type !== u.Syntax.BlockStatement;
                this.context.strict && o.firstRestricted && this.throwUnexpectedToken(o.firstRestricted, o.message), this.context.strict && o.stricted && this.tolerateUnexpectedToken(o.stricted, o.message), e = r ? this.finalize(d, new a.AsyncArrowFunctionExpression(o.params, m, x)) : this.finalize(d, new a.ArrowFunctionExpression(o.params, m, x)), this.context.strict = l, this.context.allowStrictDirective = h, this.context.allowYield = c, this.context.await = p
              }
            } else if (this.matchAssign()) {
              if (this.context.isAssignmentTarget || this.tolerateError(s.Messages.InvalidLHSInAssignment), this.context.strict && e.type === u.Syntax.Identifier) {
                var D = e;
                this.scanner.isRestrictedWord(D.name) && this.tolerateUnexpectedToken(i, s.Messages.StrictLHSAssignment), this.scanner.isStrictModeReservedWord(D.name) && this.tolerateUnexpectedToken(i, s.Messages.StrictReservedWord)
              }
              this.match("=") ? this.reinterpretExpressionAsPattern(e) : (this.context.isAssignmentTarget = !1, this.context.isBindingElement = !1);
              var y = (i = this.nextToken()).value, E = this.isolateCoverGrammar(this.parseAssignmentExpression);
              e = this.finalize(this.startNode(t), new a.AssignmentExpression(y, e, E)), this.context.firstCoverInitializedNameError = null
            }
          }
          return e
        }, e.prototype.parseExpression = function () {
          var e = this.lookahead, t = this.isolateCoverGrammar(this.parseAssignmentExpression);
          if (this.match(",")) {
            var i = [];
            for (i.push(t); 2 !== this.lookahead.type && this.match(",");) this.nextToken(), i.push(this.isolateCoverGrammar(this.parseAssignmentExpression));
            t = this.finalize(this.startNode(e), new a.SequenceExpression(i))
          }
          return t
        }, e.prototype.parseStatementListItem = function () {
          var e;
          if (this.context.isAssignmentTarget = !0, this.context.isBindingElement = !0, 4 === this.lookahead.type) switch (this.lookahead.value) {
            case"export":
              this.context.isModule || this.tolerateUnexpectedToken(this.lookahead, s.Messages.IllegalExportDeclaration), e = this.parseExportDeclaration();
              break;
            case"import":
              this.context.isModule || this.tolerateUnexpectedToken(this.lookahead, s.Messages.IllegalImportDeclaration), e = this.parseImportDeclaration();
              break;
            case"const":
              e = this.parseLexicalDeclaration({inFor: !1});
              break;
            case"function":
              e = this.parseFunctionDeclaration();
              break;
            case"class":
              e = this.parseClassDeclaration();
              break;
            case"let":
              e = this.isLexicalDeclaration() ? this.parseLexicalDeclaration({inFor: !1}) : this.parseStatement();
              break;
            default:
              e = this.parseStatement()
          } else e = this.parseStatement();
          return e
        }, e.prototype.parseBlock = function () {
          var e = this.createNode();
          this.expect("{");
          for (var t = []; !this.match("}");) t.push(this.parseStatementListItem());
          return this.expect("}"), this.finalize(e, new a.BlockStatement(t))
        }, e.prototype.parseLexicalBinding = function (e, t) {
          var i = this.createNode(), n = this.parsePattern([], e);
          this.context.strict && n.type === u.Syntax.Identifier && this.scanner.isRestrictedWord(n.name) && this.tolerateError(s.Messages.StrictVarName);
          var r = null;
          return "const" === e ? this.matchKeyword("in") || this.matchContextualKeyword("of") || (this.match("=") ? (this.nextToken(), r = this.isolateCoverGrammar(this.parseAssignmentExpression)) : this.throwError(s.Messages.DeclarationMissingInitializer, "const")) : (!t.inFor && n.type !== u.Syntax.Identifier || this.match("=")) && (this.expect("="), r = this.isolateCoverGrammar(this.parseAssignmentExpression)), this.finalize(i, new a.VariableDeclarator(n, r))
        }, e.prototype.parseBindingList = function (e, t) {
          for (var i = [this.parseLexicalBinding(e, t)]; this.match(",");) this.nextToken(), i.push(this.parseLexicalBinding(e, t));
          return i
        }, e.prototype.isLexicalDeclaration = function () {
          var e = this.scanner.saveState();
          this.scanner.scanComments();
          var t = this.scanner.lex();
          return this.scanner.restoreState(e), 3 === t.type || 7 === t.type && "[" === t.value || 7 === t.type && "{" === t.value || 4 === t.type && "let" === t.value || 4 === t.type && "yield" === t.value
        }, e.prototype.parseLexicalDeclaration = function (e) {
          var t = this.createNode(), i = this.nextToken().value;
          n.assert("let" === i || "const" === i, "Lexical declaration must be either let or const");
          var r = this.parseBindingList(i, e);
          return this.consumeSemicolon(), this.finalize(t, new a.VariableDeclaration(r, i))
        }, e.prototype.parseBindingRestElement = function (e, t) {
          var i = this.createNode();
          this.expect("...");
          var n = this.parsePattern(e, t);
          return this.finalize(i, new a.RestElement(n))
        }, e.prototype.parseArrayPattern = function (e, t) {
          var i = this.createNode();
          this.expect("[");
          for (var n = []; !this.match("]");) if (this.match(",")) this.nextToken(), n.push(null); else {
            if (this.match("...")) {
              n.push(this.parseBindingRestElement(e, t));
              break
            }
            n.push(this.parsePatternWithDefault(e, t)), this.match("]") || this.expect(",")
          }
          return this.expect("]"), this.finalize(i, new a.ArrayPattern(n))
        }, e.prototype.parsePropertyPattern = function (e, t) {
          var i, n, r = this.createNode(), s = !1, o = !1;
          if (3 === this.lookahead.type) {
            var u = this.lookahead;
            i = this.parseVariableIdentifier();
            var l = this.finalize(r, new a.Identifier(u.value));
            if (this.match("=")) {
              e.push(u), o = !0, this.nextToken();
              var h = this.parseAssignmentExpression();
              n = this.finalize(this.startNode(u), new a.AssignmentPattern(l, h))
            } else this.match(":") ? (this.expect(":"), n = this.parsePatternWithDefault(e, t)) : (e.push(u), o = !0, n = l)
          } else s = this.match("["), i = this.parseObjectPropertyKey(), this.expect(":"), n = this.parsePatternWithDefault(e, t);
          return this.finalize(r, new a.Property("init", i, s, n, !1, o))
        }, e.prototype.parseObjectPattern = function (e, t) {
          var i = this.createNode(), n = [];
          for (this.expect("{"); !this.match("}");) n.push(this.parsePropertyPattern(e, t)), this.match("}") || this.expect(",");
          return this.expect("}"), this.finalize(i, new a.ObjectPattern(n))
        }, e.prototype.parsePattern = function (e, t) {
          var i;
          return this.match("[") ? i = this.parseArrayPattern(e, t) : this.match("{") ? i = this.parseObjectPattern(e, t) : (!this.matchKeyword("let") || "const" !== t && "let" !== t || this.tolerateUnexpectedToken(this.lookahead, s.Messages.LetInLexicalBinding), e.push(this.lookahead), i = this.parseVariableIdentifier(t)), i
        }, e.prototype.parsePatternWithDefault = function (e, t) {
          var i = this.lookahead, n = this.parsePattern(e, t);
          if (this.match("=")) {
            this.nextToken();
            var r = this.context.allowYield;
            this.context.allowYield = !0;
            var s = this.isolateCoverGrammar(this.parseAssignmentExpression);
            this.context.allowYield = r, n = this.finalize(this.startNode(i), new a.AssignmentPattern(n, s))
          }
          return n
        }, e.prototype.parseVariableIdentifier = function (e) {
          var t = this.createNode(), i = this.nextToken();
          return 4 === i.type && "yield" === i.value ? this.context.strict ? this.tolerateUnexpectedToken(i, s.Messages.StrictReservedWord) : this.context.allowYield || this.throwUnexpectedToken(i) : 3 !== i.type ? this.context.strict && 4 === i.type && this.scanner.isStrictModeReservedWord(i.value) ? this.tolerateUnexpectedToken(i, s.Messages.StrictReservedWord) : (this.context.strict || "let" !== i.value || "var" !== e) && this.throwUnexpectedToken(i) : (this.context.isModule || this.context.await) && 3 === i.type && "await" === i.value && this.tolerateUnexpectedToken(i), this.finalize(t, new a.Identifier(i.value))
        }, e.prototype.parseVariableDeclaration = function (e) {
          var t = this.createNode(), i = this.parsePattern([], "var");
          this.context.strict && i.type === u.Syntax.Identifier && this.scanner.isRestrictedWord(i.name) && this.tolerateError(s.Messages.StrictVarName);
          var n = null;
          return this.match("=") ? (this.nextToken(), n = this.isolateCoverGrammar(this.parseAssignmentExpression)) : i.type === u.Syntax.Identifier || e.inFor || this.expect("="), this.finalize(t, new a.VariableDeclarator(i, n))
        }, e.prototype.parseVariableDeclarationList = function (e) {
          var t = {inFor: e.inFor}, i = [];
          for (i.push(this.parseVariableDeclaration(t)); this.match(",");) this.nextToken(), i.push(this.parseVariableDeclaration(t));
          return i
        }, e.prototype.parseVariableStatement = function () {
          var e = this.createNode();
          this.expectKeyword("var");
          var t = this.parseVariableDeclarationList({inFor: !1});
          return this.consumeSemicolon(), this.finalize(e, new a.VariableDeclaration(t, "var"))
        }, e.prototype.parseEmptyStatement = function () {
          var e = this.createNode();
          return this.expect(";"), this.finalize(e, new a.EmptyStatement)
        }, e.prototype.parseExpressionStatement = function () {
          var e = this.createNode(), t = this.parseExpression();
          return this.consumeSemicolon(), this.finalize(e, new a.ExpressionStatement(t))
        }, e.prototype.parseIfClause = function () {
          return this.context.strict && this.matchKeyword("function") && this.tolerateError(s.Messages.StrictFunction), this.parseStatement()
        }, e.prototype.parseIfStatement = function () {
          var e, t = this.createNode(), i = null;
          this.expectKeyword("if"), this.expect("(");
          var n = this.parseExpression();
          return !this.match(")") && this.config.tolerant ? (this.tolerateUnexpectedToken(this.nextToken()), e = this.finalize(this.createNode(), new a.EmptyStatement)) : (this.expect(")"), e = this.parseIfClause(), this.matchKeyword("else") && (this.nextToken(), i = this.parseIfClause())), this.finalize(t, new a.IfStatement(n, e, i))
        }, e.prototype.parseDoWhileStatement = function () {
          var e = this.createNode();
          this.expectKeyword("do");
          var t = this.context.inIteration;
          this.context.inIteration = !0;
          var i = this.parseStatement();
          this.context.inIteration = t, this.expectKeyword("while"), this.expect("(");
          var n = this.parseExpression();
          return !this.match(")") && this.config.tolerant ? this.tolerateUnexpectedToken(this.nextToken()) : (this.expect(")"), this.match(";") && this.nextToken()), this.finalize(e, new a.DoWhileStatement(i, n))
        }, e.prototype.parseWhileStatement = function () {
          var e, t = this.createNode();
          this.expectKeyword("while"), this.expect("(");
          var i = this.parseExpression();
          if (!this.match(")") && this.config.tolerant) this.tolerateUnexpectedToken(this.nextToken()), e = this.finalize(this.createNode(), new a.EmptyStatement); else {
            this.expect(")");
            var n = this.context.inIteration;
            this.context.inIteration = !0, e = this.parseStatement(), this.context.inIteration = n
          }
          return this.finalize(t, new a.WhileStatement(i, e))
        }, e.prototype.parseForStatement = function () {
          var e, t, i, n = null, r = null, o = null, l = !0, h = this.createNode();
          if (this.expectKeyword("for"), this.expect("("), this.match(";")) this.nextToken(); else if (this.matchKeyword("var")) {
            n = this.createNode(), this.nextToken();
            var c = this.context.allowIn;
            this.context.allowIn = !1;
            var p = this.parseVariableDeclarationList({inFor: !0});
            if (this.context.allowIn = c, 1 === p.length && this.matchKeyword("in")) {
              var d = p[0];
              d.init && (d.id.type === u.Syntax.ArrayPattern || d.id.type === u.Syntax.ObjectPattern || this.context.strict) && this.tolerateError(s.Messages.ForInOfLoopInitializer, "for-in"), n = this.finalize(n, new a.VariableDeclaration(p, "var")), this.nextToken(), e = n, t = this.parseExpression(), n = null
            } else 1 === p.length && null === p[0].init && this.matchContextualKeyword("of") ? (n = this.finalize(n, new a.VariableDeclaration(p, "var")), this.nextToken(), e = n, t = this.parseAssignmentExpression(), n = null, l = !1) : (n = this.finalize(n, new a.VariableDeclaration(p, "var")), this.expect(";"))
          } else if (this.matchKeyword("const") || this.matchKeyword("let")) {
            n = this.createNode();
            var m = this.nextToken().value;
            if (this.context.strict || "in" !== this.lookahead.value) {
              c = this.context.allowIn;
              this.context.allowIn = !1;
              p = this.parseBindingList(m, {inFor: !0});
              this.context.allowIn = c, 1 === p.length && null === p[0].init && this.matchKeyword("in") ? (n = this.finalize(n, new a.VariableDeclaration(p, m)), this.nextToken(), e = n, t = this.parseExpression(), n = null) : 1 === p.length && null === p[0].init && this.matchContextualKeyword("of") ? (n = this.finalize(n, new a.VariableDeclaration(p, m)), this.nextToken(), e = n, t = this.parseAssignmentExpression(), n = null, l = !1) : (this.consumeSemicolon(), n = this.finalize(n, new a.VariableDeclaration(p, m)))
            } else n = this.finalize(n, new a.Identifier(m)), this.nextToken(), e = n, t = this.parseExpression(), n = null
          } else {
            var f = this.lookahead;
            c = this.context.allowIn;
            if (this.context.allowIn = !1, n = this.inheritCoverGrammar(this.parseAssignmentExpression), this.context.allowIn = c, this.matchKeyword("in")) this.context.isAssignmentTarget && n.type !== u.Syntax.AssignmentExpression || this.tolerateError(s.Messages.InvalidLHSInForIn), this.nextToken(), this.reinterpretExpressionAsPattern(n), e = n, t = this.parseExpression(), n = null; else if (this.matchContextualKeyword("of")) this.context.isAssignmentTarget && n.type !== u.Syntax.AssignmentExpression || this.tolerateError(s.Messages.InvalidLHSInForLoop), this.nextToken(), this.reinterpretExpressionAsPattern(n), e = n, t = this.parseAssignmentExpression(), n = null, l = !1; else {
              if (this.match(",")) {
                for (var x = [n]; this.match(",");) this.nextToken(), x.push(this.isolateCoverGrammar(this.parseAssignmentExpression));
                n = this.finalize(this.startNode(f), new a.SequenceExpression(x))
              }
              this.expect(";")
            }
          }
          if (void 0 === e && (this.match(";") || (r = this.parseExpression()), this.expect(";"), this.match(")") || (o = this.parseExpression())), !this.match(")") && this.config.tolerant) this.tolerateUnexpectedToken(this.nextToken()), i = this.finalize(this.createNode(), new a.EmptyStatement); else {
            this.expect(")");
            var D = this.context.inIteration;
            this.context.inIteration = !0, i = this.isolateCoverGrammar(this.parseStatement), this.context.inIteration = D
          }
          return void 0 === e ? this.finalize(h, new a.ForStatement(n, r, o, i)) : l ? this.finalize(h, new a.ForInStatement(e, t, i)) : this.finalize(h, new a.ForOfStatement(e, t, i))
        }, e.prototype.parseContinueStatement = function () {
          var e = this.createNode();
          this.expectKeyword("continue");
          var t = null;
          if (3 === this.lookahead.type && !this.hasLineTerminator) {
            var i = this.parseVariableIdentifier();
            t = i;
            var n = "$" + i.name;
            Object.prototype.hasOwnProperty.call(this.context.labelSet, n) || this.throwError(s.Messages.UnknownLabel, i.name)
          }
          return this.consumeSemicolon(), null !== t || this.context.inIteration || this.throwError(s.Messages.IllegalContinue), this.finalize(e, new a.ContinueStatement(t))
        }, e.prototype.parseBreakStatement = function () {
          var e = this.createNode();
          this.expectKeyword("break");
          var t = null;
          if (3 === this.lookahead.type && !this.hasLineTerminator) {
            var i = this.parseVariableIdentifier(), n = "$" + i.name;
            Object.prototype.hasOwnProperty.call(this.context.labelSet, n) || this.throwError(s.Messages.UnknownLabel, i.name), t = i
          }
          return this.consumeSemicolon(), null !== t || this.context.inIteration || this.context.inSwitch || this.throwError(s.Messages.IllegalBreak), this.finalize(e, new a.BreakStatement(t))
        }, e.prototype.parseReturnStatement = function () {
          this.context.inFunctionBody || this.tolerateError(s.Messages.IllegalReturn);
          var e = this.createNode();
          this.expectKeyword("return");
          var t = !this.match(";") && !this.match("}") && !this.hasLineTerminator && 2 !== this.lookahead.type || 8 === this.lookahead.type || 10 === this.lookahead.type ? this.parseExpression() : null;
          return this.consumeSemicolon(), this.finalize(e, new a.ReturnStatement(t))
        }, e.prototype.parseWithStatement = function () {
          this.context.strict && this.tolerateError(s.Messages.StrictModeWith);
          var e, t = this.createNode();
          this.expectKeyword("with"), this.expect("(");
          var i = this.parseExpression();
          return !this.match(")") && this.config.tolerant ? (this.tolerateUnexpectedToken(this.nextToken()), e = this.finalize(this.createNode(), new a.EmptyStatement)) : (this.expect(")"), e = this.parseStatement()), this.finalize(t, new a.WithStatement(i, e))
        }, e.prototype.parseSwitchCase = function () {
          var e, t = this.createNode();
          this.matchKeyword("default") ? (this.nextToken(), e = null) : (this.expectKeyword("case"), e = this.parseExpression()), this.expect(":");
          for (var i = []; !(this.match("}") || this.matchKeyword("default") || this.matchKeyword("case"));) i.push(this.parseStatementListItem());
          return this.finalize(t, new a.SwitchCase(e, i))
        }, e.prototype.parseSwitchStatement = function () {
          var e = this.createNode();
          this.expectKeyword("switch"), this.expect("(");
          var t = this.parseExpression();
          this.expect(")");
          var i = this.context.inSwitch;
          this.context.inSwitch = !0;
          var n = [], r = !1;
          for (this.expect("{"); !this.match("}");) {
            var o = this.parseSwitchCase();
            null === o.test && (r && this.throwError(s.Messages.MultipleDefaultsInSwitch), r = !0), n.push(o)
          }
          return this.expect("}"), this.context.inSwitch = i, this.finalize(e, new a.SwitchStatement(t, n))
        }, e.prototype.parseLabelledStatement = function () {
          var e, t = this.createNode(), i = this.parseExpression();
          if (i.type === u.Syntax.Identifier && this.match(":")) {
            this.nextToken();
            var n = i, r = "$" + n.name;
            Object.prototype.hasOwnProperty.call(this.context.labelSet, r) && this.throwError(s.Messages.Redeclaration, "Label", n.name), this.context.labelSet[r] = !0;
            var o = void 0;
            if (this.matchKeyword("class")) this.tolerateUnexpectedToken(this.lookahead), o = this.parseClassDeclaration(); else if (this.matchKeyword("function")) {
              var l = this.lookahead, h = this.parseFunctionDeclaration();
              this.context.strict ? this.tolerateUnexpectedToken(l, s.Messages.StrictFunction) : h.generator && this.tolerateUnexpectedToken(l, s.Messages.GeneratorInLegacyContext), o = h
            } else o = this.parseStatement();
            delete this.context.labelSet[r], e = new a.LabeledStatement(n, o)
          } else this.consumeSemicolon(), e = new a.ExpressionStatement(i);
          return this.finalize(t, e)
        }, e.prototype.parseThrowStatement = function () {
          var e = this.createNode();
          this.expectKeyword("throw"), this.hasLineTerminator && this.throwError(s.Messages.NewlineAfterThrow);
          var t = this.parseExpression();
          return this.consumeSemicolon(), this.finalize(e, new a.ThrowStatement(t))
        }, e.prototype.parseCatchClause = function () {
          var e = this.createNode();
          this.expectKeyword("catch"), this.expect("("), this.match(")") && this.throwUnexpectedToken(this.lookahead);
          for (var t = [], i = this.parsePattern(t), n = {}, r = 0; r < t.length; r++) {
            var o = "$" + t[r].value;
            Object.prototype.hasOwnProperty.call(n, o) && this.tolerateError(s.Messages.DuplicateBinding, t[r].value), n[o] = !0
          }
          this.context.strict && i.type === u.Syntax.Identifier && this.scanner.isRestrictedWord(i.name) && this.tolerateError(s.Messages.StrictCatchVariable), this.expect(")");
          var l = this.parseBlock();
          return this.finalize(e, new a.CatchClause(i, l))
        }, e.prototype.parseFinallyClause = function () {
          return this.expectKeyword("finally"), this.parseBlock()
        }, e.prototype.parseTryStatement = function () {
          var e = this.createNode();
          this.expectKeyword("try");
          var t = this.parseBlock(), i = this.matchKeyword("catch") ? this.parseCatchClause() : null,
              n = this.matchKeyword("finally") ? this.parseFinallyClause() : null;
          return i || n || this.throwError(s.Messages.NoCatchOrFinally), this.finalize(e, new a.TryStatement(t, i, n))
        }, e.prototype.parseDebuggerStatement = function () {
          var e = this.createNode();
          return this.expectKeyword("debugger"), this.consumeSemicolon(), this.finalize(e, new a.DebuggerStatement)
        }, e.prototype.parseStatement = function () {
          var e;
          switch (this.lookahead.type) {
            case 1:
            case 5:
            case 6:
            case 8:
            case 10:
            case 9:
              e = this.parseExpressionStatement();
              break;
            case 7:
              var t = this.lookahead.value;
              e = "{" === t ? this.parseBlock() : "(" === t ? this.parseExpressionStatement() : ";" === t ? this.parseEmptyStatement() : this.parseExpressionStatement();
              break;
            case 3:
              e = this.matchAsyncFunction() ? this.parseFunctionDeclaration() : this.parseLabelledStatement();
              break;
            case 4:
              switch (this.lookahead.value) {
                case"break":
                  e = this.parseBreakStatement();
                  break;
                case"continue":
                  e = this.parseContinueStatement();
                  break;
                case"debugger":
                  e = this.parseDebuggerStatement();
                  break;
                case"do":
                  e = this.parseDoWhileStatement();
                  break;
                case"for":
                  e = this.parseForStatement();
                  break;
                case"function":
                  e = this.parseFunctionDeclaration();
                  break;
                case"if":
                  e = this.parseIfStatement();
                  break;
                case"return":
                  e = this.parseReturnStatement();
                  break;
                case"switch":
                  e = this.parseSwitchStatement();
                  break;
                case"throw":
                  e = this.parseThrowStatement();
                  break;
                case"try":
                  e = this.parseTryStatement();
                  break;
                case"var":
                  e = this.parseVariableStatement();
                  break;
                case"while":
                  e = this.parseWhileStatement();
                  break;
                case"with":
                  e = this.parseWithStatement();
                  break;
                default:
                  e = this.parseExpressionStatement()
              }
              break;
            default:
              e = this.throwUnexpectedToken(this.lookahead)
          }
          return e
        }, e.prototype.parseFunctionSourceElements = function () {
          var e = this.createNode();
          this.expect("{");
          var t = this.parseDirectivePrologues(), i = this.context.labelSet, n = this.context.inIteration,
              r = this.context.inSwitch, s = this.context.inFunctionBody;
          for (this.context.labelSet = {}, this.context.inIteration = !1, this.context.inSwitch = !1, this.context.inFunctionBody = !0; 2 !== this.lookahead.type && !this.match("}");) t.push(this.parseStatementListItem());
          return this.expect("}"), this.context.labelSet = i, this.context.inIteration = n, this.context.inSwitch = r, this.context.inFunctionBody = s, this.finalize(e, new a.BlockStatement(t))
        }, e.prototype.validateParam = function (e, t, i) {
          var n = "$" + i;
          this.context.strict ? (this.scanner.isRestrictedWord(i) && (e.stricted = t, e.message = s.Messages.StrictParamName), Object.prototype.hasOwnProperty.call(e.paramSet, n) && (e.stricted = t, e.message = s.Messages.StrictParamDupe)) : e.firstRestricted || (this.scanner.isRestrictedWord(i) ? (e.firstRestricted = t, e.message = s.Messages.StrictParamName) : this.scanner.isStrictModeReservedWord(i) ? (e.firstRestricted = t, e.message = s.Messages.StrictReservedWord) : Object.prototype.hasOwnProperty.call(e.paramSet, n) && (e.stricted = t, e.message = s.Messages.StrictParamDupe)), "function" == typeof Object.defineProperty ? Object.defineProperty(e.paramSet, n, {
            value: !0,
            enumerable: !0,
            writable: !0,
            configurable: !0
          }) : e.paramSet[n] = !0
        }, e.prototype.parseRestElement = function (e) {
          var t = this.createNode();
          this.expect("...");
          var i = this.parsePattern(e);
          return this.match("=") && this.throwError(s.Messages.DefaultRestParameter), this.match(")") || this.throwError(s.Messages.ParameterAfterRestParameter), this.finalize(t, new a.RestElement(i))
        }, e.prototype.parseFormalParameter = function (e) {
          for (var t = [], i = this.match("...") ? this.parseRestElement(t) : this.parsePatternWithDefault(t), n = 0; n < t.length; n++) this.validateParam(e, t[n], t[n].value);
          e.simple = e.simple && i instanceof a.Identifier, e.params.push(i)
        }, e.prototype.parseFormalParameters = function (e) {
          var t;
          if (t = {
            simple: !0,
            params: [],
            firstRestricted: e
          }, this.expect("("), !this.match(")")) for (t.paramSet = {}; 2 !== this.lookahead.type && (this.parseFormalParameter(t), !this.match(")")) && (this.expect(","), !this.match(")"));) ;
          return this.expect(")"), {
            simple: t.simple,
            params: t.params,
            stricted: t.stricted,
            firstRestricted: t.firstRestricted,
            message: t.message
          }
        }, e.prototype.matchAsyncFunction = function () {
          var e = this.matchContextualKeyword("async");
          if (e) {
            var t = this.scanner.saveState();
            this.scanner.scanComments();
            var i = this.scanner.lex();
            this.scanner.restoreState(t), e = t.lineNumber === i.lineNumber && 4 === i.type && "function" === i.value
          }
          return e
        }, e.prototype.parseFunctionDeclaration = function (e) {
          var t = this.createNode(), i = this.matchContextualKeyword("async");
          i && this.nextToken(), this.expectKeyword("function");
          var n, r = !i && this.match("*");
          r && this.nextToken();
          var o = null, u = null;
          if (!e || !this.match("(")) {
            var l = this.lookahead;
            o = this.parseVariableIdentifier(), this.context.strict ? this.scanner.isRestrictedWord(l.value) && this.tolerateUnexpectedToken(l, s.Messages.StrictFunctionName) : this.scanner.isRestrictedWord(l.value) ? (u = l, n = s.Messages.StrictFunctionName) : this.scanner.isStrictModeReservedWord(l.value) && (u = l, n = s.Messages.StrictReservedWord)
          }
          var h = this.context.await, c = this.context.allowYield;
          this.context.await = i, this.context.allowYield = !r;
          var p = this.parseFormalParameters(u), d = p.params, m = p.stricted;
          u = p.firstRestricted, p.message && (n = p.message);
          var f = this.context.strict, x = this.context.allowStrictDirective;
          this.context.allowStrictDirective = p.simple;
          var D = this.parseFunctionSourceElements();
          return this.context.strict && u && this.throwUnexpectedToken(u, n), this.context.strict && m && this.tolerateUnexpectedToken(m, n), this.context.strict = f, this.context.allowStrictDirective = x, this.context.await = h, this.context.allowYield = c, i ? this.finalize(t, new a.AsyncFunctionDeclaration(o, d, D)) : this.finalize(t, new a.FunctionDeclaration(o, d, D, r))
        },e.prototype.parseFunctionExpression = function () {
          var e = this.createNode(), t = this.matchContextualKeyword("async");
          t && this.nextToken(), this.expectKeyword("function");
          var i, n = !t && this.match("*");
          n && this.nextToken();
          var r, o = null, u = this.context.await, l = this.context.allowYield;
          if (this.context.await = t, this.context.allowYield = !n, !this.match("(")) {
            var h = this.lookahead;
            o = this.context.strict || n || !this.matchKeyword("yield") ? this.parseVariableIdentifier() : this.parseIdentifierName(), this.context.strict ? this.scanner.isRestrictedWord(h.value) && this.tolerateUnexpectedToken(h, s.Messages.StrictFunctionName) : this.scanner.isRestrictedWord(h.value) ? (r = h, i = s.Messages.StrictFunctionName) : this.scanner.isStrictModeReservedWord(h.value) && (r = h, i = s.Messages.StrictReservedWord)
          }
          var c = this.parseFormalParameters(r), p = c.params, d = c.stricted;
          r = c.firstRestricted, c.message && (i = c.message);
          var m = this.context.strict, f = this.context.allowStrictDirective;
          this.context.allowStrictDirective = c.simple;
          var x = this.parseFunctionSourceElements();
          return this.context.strict && r && this.throwUnexpectedToken(r, i), this.context.strict && d && this.tolerateUnexpectedToken(d, i), this.context.strict = m, this.context.allowStrictDirective = f, this.context.await = u, this.context.allowYield = l, t ? this.finalize(e, new a.AsyncFunctionExpression(o, p, x)) : this.finalize(e, new a.FunctionExpression(o, p, x, n))
        },e.prototype.parseDirective = function () {
          var e = this.lookahead, t = this.createNode(), i = this.parseExpression(),
              n = i.type === u.Syntax.Literal ? this.getTokenRaw(e).slice(1, -1) : null;
          return this.consumeSemicolon(), this.finalize(t, n ? new a.Directive(i, n) : new a.ExpressionStatement(i))
        },e.prototype.parseDirectivePrologues = function () {
          for (var e = null, t = []; ;) {
            var i = this.lookahead;
            if (8 !== i.type) break;
            var n = this.parseDirective();
            t.push(n);
            var r = n.directive;
            if ("string" != typeof r) break;
            "use strict" === r ? (this.context.strict = !0, e && this.tolerateUnexpectedToken(e, s.Messages.StrictOctalLiteral), this.context.allowStrictDirective || this.tolerateUnexpectedToken(i, s.Messages.IllegalLanguageModeDirective)) : !e && i.octal && (e = i)
          }
          return t
        },e.prototype.qualifiedPropertyName = function (e) {
          switch (e.type) {
            case 3:
            case 8:
            case 1:
            case 5:
            case 6:
            case 4:
              return !0;
            case 7:
              return "[" === e.value
          }
          return !1
        },e.prototype.parseGetterMethod = function () {
          var e = this.createNode(), t = this.context.allowYield;
          this.context.allowYield = !0;
          var i = this.parseFormalParameters();
          i.params.length > 0 && this.tolerateError(s.Messages.BadGetterArity);
          var n = this.parsePropertyMethod(i);
          return this.context.allowYield = t, this.finalize(e, new a.FunctionExpression(null, i.params, n, !1))
        },e.prototype.parseSetterMethod = function () {
          var e = this.createNode(), t = this.context.allowYield;
          this.context.allowYield = !0;
          var i = this.parseFormalParameters();
          1 !== i.params.length ? this.tolerateError(s.Messages.BadSetterArity) : i.params[0] instanceof a.RestElement && this.tolerateError(s.Messages.BadSetterRestParameter);
          var n = this.parsePropertyMethod(i);
          return this.context.allowYield = t, this.finalize(e, new a.FunctionExpression(null, i.params, n, !1))
        },e.prototype.parseGeneratorMethod = function () {
          var e = this.createNode(), t = this.context.allowYield;
          this.context.allowYield = !0;
          var i = this.parseFormalParameters();
          this.context.allowYield = !1;
          var n = this.parsePropertyMethod(i);
          return this.context.allowYield = t, this.finalize(e, new a.FunctionExpression(null, i.params, n, !0))
        },e.prototype.isStartOfExpression = function () {
          var e = !0, t = this.lookahead.value;
          switch (this.lookahead.type) {
            case 7:
              e = "[" === t || "(" === t || "{" === t || "+" === t || "-" === t || "!" === t || "~" === t || "++" === t || "--" === t || "/" === t || "/=" === t;
              break;
            case 4:
              e = "class" === t || "delete" === t || "function" === t || "let" === t || "new" === t || "super" === t || "this" === t || "typeof" === t || "void" === t || "yield" === t
          }
          return e
        },e.prototype.parseYieldExpression = function () {
          var e = this.createNode();
          this.expectKeyword("yield");
          var t = null, i = !1;
          if (!this.hasLineTerminator) {
            var n = this.context.allowYield;
            this.context.allowYield = !1, (i = this.match("*")) ? (this.nextToken(), t = this.parseAssignmentExpression()) : this.isStartOfExpression() && (t = this.parseAssignmentExpression()), this.context.allowYield = n
          }
          return this.finalize(e, new a.YieldExpression(t, i))
        },e.prototype.parseClassElement = function (e) {
          var t = this.lookahead, i = this.createNode(), n = "", r = null, o = null, u = !1, l = !1, h = !1, c = !1;
          if (this.match("*")) this.nextToken(); else if (u = this.match("["), "static" === (r = this.parseObjectPropertyKey()).name && (this.qualifiedPropertyName(this.lookahead) || this.match("*")) && (t = this.lookahead, h = !0, u = this.match("["), this.match("*") ? this.nextToken() : r = this.parseObjectPropertyKey()), 3 === t.type && !this.hasLineTerminator && "async" === t.value) {
            var p = this.lookahead.value;
            ":" !== p && "(" !== p && "*" !== p && (c = !0, t = this.lookahead, r = this.parseObjectPropertyKey(), 3 === t.type && "constructor" === t.value && this.tolerateUnexpectedToken(t, s.Messages.ConstructorIsAsync))
          }
          var d = this.qualifiedPropertyName(this.lookahead);
          return 3 === t.type ? "get" === t.value && d ? (n = "get", u = this.match("["), r = this.parseObjectPropertyKey(), this.context.allowYield = !1, o = this.parseGetterMethod()) : "set" === t.value && d && (n = "set", u = this.match("["), r = this.parseObjectPropertyKey(), o = this.parseSetterMethod()) : 7 === t.type && "*" === t.value && d && (n = "init", u = this.match("["), r = this.parseObjectPropertyKey(), o = this.parseGeneratorMethod(), l = !0), !n && r && this.match("(") && (n = "init", o = c ? this.parsePropertyMethodAsyncFunction() : this.parsePropertyMethodFunction(), l = !0), n || this.throwUnexpectedToken(this.lookahead), "init" === n && (n = "method"), u || (h && this.isPropertyKey(r, "prototype") && this.throwUnexpectedToken(t, s.Messages.StaticPrototype), !h && this.isPropertyKey(r, "constructor") && (("method" !== n || !l || o && o.generator) && this.throwUnexpectedToken(t, s.Messages.ConstructorSpecialMethod), e.value ? this.throwUnexpectedToken(t, s.Messages.DuplicateConstructor) : e.value = !0, n = "constructor")), this.finalize(i, new a.MethodDefinition(r, u, o, n, h))
        },e.prototype.parseClassElementList = function () {
          var e = [], t = {value: !1};
          for (this.expect("{"); !this.match("}");) this.match(";") ? this.nextToken() : e.push(this.parseClassElement(t));
          return this.expect("}"), e
        },e.prototype.parseClassBody = function () {
          var e = this.createNode(), t = this.parseClassElementList();
          return this.finalize(e, new a.ClassBody(t))
        },e.prototype.parseClassDeclaration = function (e) {
          var t = this.createNode(), i = this.context.strict;
          this.context.strict = !0, this.expectKeyword("class");
          var n = e && 3 !== this.lookahead.type ? null : this.parseVariableIdentifier(), r = null;
          this.matchKeyword("extends") && (this.nextToken(), r = this.isolateCoverGrammar(this.parseLeftHandSideExpressionAllowCall));
          var s = this.parseClassBody();
          return this.context.strict = i, this.finalize(t, new a.ClassDeclaration(n, r, s))
        },e.prototype.parseClassExpression = function () {
          var e = this.createNode(), t = this.context.strict;
          this.context.strict = !0, this.expectKeyword("class");
          var i = 3 === this.lookahead.type ? this.parseVariableIdentifier() : null, n = null;
          this.matchKeyword("extends") && (this.nextToken(), n = this.isolateCoverGrammar(this.parseLeftHandSideExpressionAllowCall));
          var r = this.parseClassBody();
          return this.context.strict = t, this.finalize(e, new a.ClassExpression(i, n, r))
        },e.prototype.parseModule = function () {
          this.context.strict = !0, this.context.isModule = !0, this.scanner.isModule = !0;
          for (var e = this.createNode(), t = this.parseDirectivePrologues(); 2 !== this.lookahead.type;) t.push(this.parseStatementListItem());
          return this.finalize(e, new a.Module(t))
        },e.prototype.parseScript = function () {
          for (var e = this.createNode(), t = this.parseDirectivePrologues(); 2 !== this.lookahead.type;) t.push(this.parseStatementListItem());
          return this.finalize(e, new a.Script(t))
        },e.prototype.parseModuleSpecifier = function () {
          var e = this.createNode();
          8 !== this.lookahead.type && this.throwError(s.Messages.InvalidModuleSpecifier);
          var t = this.nextToken(), i = this.getTokenRaw(t);
          return this.finalize(e, new a.Literal(t.value, i))
        },e.prototype.parseImportSpecifier = function () {
          var e, t, i = this.createNode();
          return 3 === this.lookahead.type ? (t = e = this.parseVariableIdentifier(), this.matchContextualKeyword("as") && (this.nextToken(), t = this.parseVariableIdentifier())) : (t = e = this.parseIdentifierName(), this.matchContextualKeyword("as") ? (this.nextToken(), t = this.parseVariableIdentifier()) : this.throwUnexpectedToken(this.nextToken())), this.finalize(i, new a.ImportSpecifier(t, e))
        },e.prototype.parseNamedImports = function () {
          this.expect("{");
          for (var e = []; !this.match("}");) e.push(this.parseImportSpecifier()), this.match("}") || this.expect(",");
          return this.expect("}"), e
        },e.prototype.parseImportDefaultSpecifier = function () {
          var e = this.createNode(), t = this.parseIdentifierName();
          return this.finalize(e, new a.ImportDefaultSpecifier(t))
        },e.prototype.parseImportNamespaceSpecifier = function () {
          var e = this.createNode();
          this.expect("*"), this.matchContextualKeyword("as") || this.throwError(s.Messages.NoAsAfterImportNamespace), this.nextToken();
          var t = this.parseIdentifierName();
          return this.finalize(e, new a.ImportNamespaceSpecifier(t))
        },e.prototype.parseImportDeclaration = function () {
          this.context.inFunctionBody && this.throwError(s.Messages.IllegalImportDeclaration);
          var e, t = this.createNode();
          this.expectKeyword("import");
          var i = [];
          if (8 === this.lookahead.type) e = this.parseModuleSpecifier(); else {
            if (this.match("{") ? i = i.concat(this.parseNamedImports()) : this.match("*") ? i.push(this.parseImportNamespaceSpecifier()) : this.isIdentifierName(this.lookahead) && !this.matchKeyword("default") ? (i.push(this.parseImportDefaultSpecifier()), this.match(",") && (this.nextToken(), this.match("*") ? i.push(this.parseImportNamespaceSpecifier()) : this.match("{") ? i = i.concat(this.parseNamedImports()) : this.throwUnexpectedToken(this.lookahead))) : this.throwUnexpectedToken(this.nextToken()), !this.matchContextualKeyword("from")) {
              var n = this.lookahead.value ? s.Messages.UnexpectedToken : s.Messages.MissingFromClause;
              this.throwError(n, this.lookahead.value)
            }
            this.nextToken(), e = this.parseModuleSpecifier()
          }
          return this.consumeSemicolon(), this.finalize(t, new a.ImportDeclaration(i, e))
        },e.prototype.parseExportSpecifier = function () {
          var e = this.createNode(), t = this.parseIdentifierName(), i = t;
          return this.matchContextualKeyword("as") && (this.nextToken(), i = this.parseIdentifierName()), this.finalize(e, new a.ExportSpecifier(t, i))
        },e.prototype.parseExportDeclaration = function () {
          this.context.inFunctionBody && this.throwError(s.Messages.IllegalExportDeclaration);
          var e, t = this.createNode();
          if (this.expectKeyword("export"), this.matchKeyword("default")) if (this.nextToken(), this.matchKeyword("function")) {
            var i = this.parseFunctionDeclaration(!0);
            e = this.finalize(t, new a.ExportDefaultDeclaration(i))
          } else if (this.matchKeyword("class")) {
            i = this.parseClassDeclaration(!0);
            e = this.finalize(t, new a.ExportDefaultDeclaration(i))
          } else if (this.matchContextualKeyword("async")) {
            i = this.matchAsyncFunction() ? this.parseFunctionDeclaration(!0) : this.parseAssignmentExpression();
            e = this.finalize(t, new a.ExportDefaultDeclaration(i))
          } else {
            this.matchContextualKeyword("from") && this.throwError(s.Messages.UnexpectedToken, this.lookahead.value);
            i = this.match("{") ? this.parseObjectInitializer() : this.match("[") ? this.parseArrayInitializer() : this.parseAssignmentExpression();
            this.consumeSemicolon(), e = this.finalize(t, new a.ExportDefaultDeclaration(i))
          } else if (this.match("*")) {
            if (this.nextToken(), !this.matchContextualKeyword("from")) {
              var n = this.lookahead.value ? s.Messages.UnexpectedToken : s.Messages.MissingFromClause;
              this.throwError(n, this.lookahead.value)
            }
            this.nextToken();
            var r = this.parseModuleSpecifier();
            this.consumeSemicolon(), e = this.finalize(t, new a.ExportAllDeclaration(r))
          } else if (4 === this.lookahead.type) {
            i = void 0;
            switch (this.lookahead.value) {
              case"let":
              case"const":
                i = this.parseLexicalDeclaration({inFor: !1});
                break;
              case"var":
              case"class":
              case"function":
                i = this.parseStatementListItem();
                break;
              default:
                this.throwUnexpectedToken(this.lookahead)
            }
            e = this.finalize(t, new a.ExportNamedDeclaration(i, [], null))
          } else if (this.matchAsyncFunction()) {
            i = this.parseFunctionDeclaration();
            e = this.finalize(t, new a.ExportNamedDeclaration(i, [], null))
          } else {
            var o = [], u = null, l = !1;
            for (this.expect("{"); !this.match("}");) l = l || this.matchKeyword("default"), o.push(this.parseExportSpecifier()), this.match("}") || this.expect(",");
            if (this.expect("}"), this.matchContextualKeyword("from")) this.nextToken(), u = this.parseModuleSpecifier(), this.consumeSemicolon(); else if (l) {
              n = this.lookahead.value ? s.Messages.UnexpectedToken : s.Messages.MissingFromClause;
              this.throwError(n, this.lookahead.value)
            } else this.consumeSemicolon();
            e = this.finalize(t, new a.ExportNamedDeclaration(null, o, u))
          }
          return e
        },e
      }();
      t.Parser = h
    }, function (e, t) {
      "use strict";
      Object.defineProperty(t, "__esModule", {value: !0}), t.assert = function (e, t) {
        if (!e) throw new Error("ASSERT: " + t)
      }
    }, function (e, t) {
      "use strict";
      Object.defineProperty(t, "__esModule", {value: !0});
      var i = function () {
        function e() {
          this.errors = [], this.tolerant = !1
        }

        return e.prototype.recordError = function (e) {
          this.errors.push(e)
        }, e.prototype.tolerate = function (e) {
          if (!this.tolerant) throw e;
          this.recordError(e)
        }, e.prototype.constructError = function (e, t) {
          var i = new Error(e);
          try {
            throw i
          } catch (e) {
            Object.create && Object.defineProperty && (i = Object.create(e), Object.defineProperty(i, "column", {value: t}))
          }
          return i
        }, e.prototype.createError = function (e, t, i, n) {
          var r = "Line " + t + ": " + n, s = this.constructError(r, i);
          return s.index = e, s.lineNumber = t, s.description = n, s
        }, e.prototype.throwError = function (e, t, i, n) {
          throw this.createError(e, t, i, n)
        }, e.prototype.tolerateError = function (e, t, i, n) {
          var r = this.createError(e, t, i, n);
          if (!this.tolerant) throw r;
          this.recordError(r)
        }, e
      }();
      t.ErrorHandler = i
    }, function (e, t) {
      "use strict";
      Object.defineProperty(t, "__esModule", {value: !0}), t.Messages = {
        BadGetterArity: "Getter must not have any formal parameters",
        BadSetterArity: "Setter must have exactly one formal parameter",
        BadSetterRestParameter: "Setter function argument must not be a rest parameter",
        ConstructorIsAsync: "Class constructor may not be an async method",
        ConstructorSpecialMethod: "Class constructor may not be an accessor",
        DeclarationMissingInitializer: "Missing initializer in %0 declaration",
        DefaultRestParameter: "Unexpected token =",
        DuplicateBinding: "Duplicate binding %0",
        DuplicateConstructor: "A class may only have one constructor",
        DuplicateProtoProperty: "Duplicate __proto__ fields are not allowed in object literals",
        ForInOfLoopInitializer: "%0 loop variable declaration may not have an initializer",
        GeneratorInLegacyContext: "Generator declarations are not allowed in legacy contexts",
        IllegalBreak: "Illegal break statement",
        IllegalContinue: "Illegal continue statement",
        IllegalExportDeclaration: "Unexpected token",
        IllegalImportDeclaration: "Unexpected token",
        IllegalLanguageModeDirective: "Illegal 'use strict' directive in function with non-simple parameter list",
        IllegalReturn: "Illegal return statement",
        InvalidEscapedReservedWord: "Keyword must not contain escaped characters",
        InvalidHexEscapeSequence: "Invalid hexadecimal escape sequence",
        InvalidLHSInAssignment: "Invalid left-hand side in assignment",
        InvalidLHSInForIn: "Invalid left-hand side in for-in",
        InvalidLHSInForLoop: "Invalid left-hand side in for-loop",
        InvalidModuleSpecifier: "Unexpected token",
        InvalidRegExp: "Invalid regular expression",
        LetInLexicalBinding: "let is disallowed as a lexically bound name",
        MissingFromClause: "Unexpected token",
        MultipleDefaultsInSwitch: "More than one default clause in switch statement",
        NewlineAfterThrow: "Illegal newline after throw",
        NoAsAfterImportNamespace: "Unexpected token",
        NoCatchOrFinally: "Missing catch or finally after try",
        ParameterAfterRestParameter: "Rest parameter must be last formal parameter",
        Redeclaration: "%0 '%1' has already been declared",
        StaticPrototype: "Classes may not have static property named prototype",
        StrictCatchVariable: "Catch variable may not be eval or arguments in strict mode",
        StrictDelete: "Delete of an unqualified identifier in strict mode.",
        StrictFunction: "In strict mode code, functions can only be declared at top level or inside a block",
        StrictFunctionName: "Function name may not be eval or arguments in strict mode",
        StrictLHSAssignment: "Assignment to eval or arguments is not allowed in strict mode",
        StrictLHSPostfix: "Postfix increment/decrement may not have eval or arguments operand in strict mode",
        StrictLHSPrefix: "Prefix increment/decrement may not have eval or arguments operand in strict mode",
        StrictModeWith: "Strict mode code may not include a with statement",
        StrictOctalLiteral: "Octal literals are not allowed in strict mode.",
        StrictParamDupe: "Strict mode function may not have duplicate parameter names",
        StrictParamName: "Parameter name eval or arguments is not allowed in strict mode",
        StrictReservedWord: "Use of future reserved word in strict mode",
        StrictVarName: "Variable name may not be eval or arguments in strict mode",
        TemplateOctalLiteral: "Octal literals are not allowed in template strings.",
        UnexpectedEOS: "Unexpected end of input",
        UnexpectedIdentifier: "Unexpected identifier",
        UnexpectedNumber: "Unexpected number",
        UnexpectedReserved: "Unexpected reserved word",
        UnexpectedString: "Unexpected string",
        UnexpectedTemplate: "Unexpected quasi %0",
        UnexpectedToken: "Unexpected token %0",
        UnexpectedTokenIllegal: "Unexpected token ILLEGAL",
        UnknownLabel: "Undefined label '%0'",
        UnterminatedRegExp: "Invalid regular expression: missing /"
      }
    }, function (e, t, i) {
      "use strict";
      Object.defineProperty(t, "__esModule", {value: !0});
      var n = i(9), r = i(4), s = i(11);

      function a(e) {
        return "0123456789abcdef".indexOf(e.toLowerCase())
      }

      function o(e) {
        return "01234567".indexOf(e)
      }

      var u = function () {
        function e(e, t) {
          this.source = e, this.errorHandler = t, this.trackComment = !1, this.isModule = !1, this.length = e.length, this.index = 0, this.lineNumber = e.length > 0 ? 1 : 0, this.lineStart = 0, this.curlyStack = []
        }

        return e.prototype.saveState = function () {
          return {index: this.index, lineNumber: this.lineNumber, lineStart: this.lineStart}
        }, e.prototype.restoreState = function (e) {
          this.index = e.index, this.lineNumber = e.lineNumber, this.lineStart = e.lineStart
        }, e.prototype.eof = function () {
          return this.index >= this.length
        }, e.prototype.throwUnexpectedToken = function (e) {
          return void 0 === e && (e = s.Messages.UnexpectedTokenIllegal), this.errorHandler.throwError(this.index, this.lineNumber, this.index - this.lineStart + 1, e)
        }, e.prototype.tolerateUnexpectedToken = function (e) {
          void 0 === e && (e = s.Messages.UnexpectedTokenIllegal), this.errorHandler.tolerateError(this.index, this.lineNumber, this.index - this.lineStart + 1, e)
        }, e.prototype.skipSingleLineComment = function (e) {
          var t, i, n = [];
          for (this.trackComment && (n = [], t = this.index - e, i = {
            start: {
              line: this.lineNumber,
              column: this.index - this.lineStart - e
            }, end: {}
          }); !this.eof();) {
            var s = this.source.charCodeAt(this.index);
            if (++this.index, r.Character.isLineTerminator(s)) {
              if (this.trackComment) {
                i.end = {line: this.lineNumber, column: this.index - this.lineStart - 1};
                var a = {multiLine: !1, slice: [t + e, this.index - 1], range: [t, this.index - 1], loc: i};
                n.push(a)
              }
              return 13 === s && 10 === this.source.charCodeAt(this.index) && ++this.index, ++this.lineNumber, this.lineStart = this.index, n
            }
          }
          if (this.trackComment) {
            i.end = {line: this.lineNumber, column: this.index - this.lineStart};
            a = {multiLine: !1, slice: [t + e, this.index], range: [t, this.index], loc: i};
            n.push(a)
          }
          return n
        }, e.prototype.skipMultiLineComment = function () {
          var e, t, i = [];
          for (this.trackComment && (i = [], e = this.index - 2, t = {
            start: {
              line: this.lineNumber,
              column: this.index - this.lineStart - 2
            }, end: {}
          }); !this.eof();) {
            var n = this.source.charCodeAt(this.index);
            if (r.Character.isLineTerminator(n)) 13 === n && 10 === this.source.charCodeAt(this.index + 1) && ++this.index, ++this.lineNumber, ++this.index, this.lineStart = this.index; else if (42 === n) {
              if (47 === this.source.charCodeAt(this.index + 1)) {
                if (this.index += 2, this.trackComment) {
                  t.end = {line: this.lineNumber, column: this.index - this.lineStart};
                  var s = {multiLine: !0, slice: [e + 2, this.index - 2], range: [e, this.index], loc: t};
                  i.push(s)
                }
                return i
              }
              ++this.index
            } else ++this.index
          }
          if (this.trackComment) {
            t.end = {line: this.lineNumber, column: this.index - this.lineStart};
            s = {multiLine: !0, slice: [e + 2, this.index], range: [e, this.index], loc: t};
            i.push(s)
          }
          return this.tolerateUnexpectedToken(), i
        }, e.prototype.scanComments = function () {
          var e;
          this.trackComment && (e = []);
          for (var t = 0 === this.index; !this.eof();) {
            var i = this.source.charCodeAt(this.index);
            if (r.Character.isWhiteSpace(i)) ++this.index; else if (r.Character.isLineTerminator(i)) ++this.index, 13 === i && 10 === this.source.charCodeAt(this.index) && ++this.index, ++this.lineNumber, this.lineStart = this.index, t = !0; else if (47 === i) if (47 === (i = this.source.charCodeAt(this.index + 1))) {
              this.index += 2;
              var n = this.skipSingleLineComment(2);
              this.trackComment && (e = e.concat(n)), t = !0
            } else {
              if (42 !== i) break;
              this.index += 2;
              n = this.skipMultiLineComment();
              this.trackComment && (e = e.concat(n))
            } else if (t && 45 === i) {
              if (45 !== this.source.charCodeAt(this.index + 1) || 62 !== this.source.charCodeAt(this.index + 2)) break;
              this.index += 3;
              n = this.skipSingleLineComment(3);
              this.trackComment && (e = e.concat(n))
            } else {
              if (60 !== i || this.isModule) break;
              if ("!--" !== this.source.slice(this.index + 1, this.index + 4)) break;
              this.index += 4;
              n = this.skipSingleLineComment(4);
              this.trackComment && (e = e.concat(n))
            }
          }
          return e
        }, e.prototype.isFutureReservedWord = function (e) {
          switch (e) {
            case"enum":
            case"export":
            case"import":
            case"super":
              return !0;
            default:
              return !1
          }
        }, e.prototype.isStrictModeReservedWord = function (e) {
          switch (e) {
            case"implements":
            case"interface":
            case"package":
            case"private":
            case"protected":
            case"public":
            case"static":
            case"yield":
            case"let":
              return !0;
            default:
              return !1
          }
        }, e.prototype.isRestrictedWord = function (e) {
          return "eval" === e || "arguments" === e
        }, e.prototype.isKeyword = function (e) {
          switch (e.length) {
            case 2:
              return "if" === e || "in" === e || "do" === e;
            case 3:
              return "var" === e || "for" === e || "new" === e || "try" === e || "let" === e;
            case 4:
              return "this" === e || "else" === e || "case" === e || "void" === e || "with" === e || "enum" === e;
            case 5:
              return "while" === e || "break" === e || "catch" === e || "throw" === e || "const" === e || "yield" === e || "class" === e || "super" === e;
            case 6:
              return "return" === e || "typeof" === e || "delete" === e || "switch" === e || "export" === e || "import" === e;
            case 7:
              return "default" === e || "finally" === e || "extends" === e;
            case 8:
              return "function" === e || "continue" === e || "debugger" === e;
            case 10:
              return "instanceof" === e;
            default:
              return !1
          }
        }, e.prototype.codePointAt = function (e) {
          var t = this.source.charCodeAt(e);
          if (t >= 55296 && t <= 56319) {
            var i = this.source.charCodeAt(e + 1);
            if (i >= 56320 && i <= 57343) t = 1024 * (t - 55296) + i - 56320 + 65536
          }
          return t
        }, e.prototype.scanHexEscape = function (e) {
          for (var t = "u" === e ? 4 : 2, i = 0, n = 0; n < t; ++n) {
            if (this.eof() || !r.Character.isHexDigit(this.source.charCodeAt(this.index))) return null;
            i = 16 * i + a(this.source[this.index++])
          }
          return String.fromCharCode(i)
        }, e.prototype.scanUnicodeCodePointEscape = function () {
          var e = this.source[this.index], t = 0;
          for ("}" === e && this.throwUnexpectedToken(); !this.eof() && (e = this.source[this.index++], r.Character.isHexDigit(e.charCodeAt(0)));) t = 16 * t + a(e);
          return (t > 1114111 || "}" !== e) && this.throwUnexpectedToken(), r.Character.fromCodePoint(t)
        }, e.prototype.getIdentifier = function () {
          for (var e = this.index++; !this.eof();) {
            var t = this.source.charCodeAt(this.index);
            if (92 === t) return this.index = e, this.getComplexIdentifier();
            if (t >= 55296 && t < 57343) return this.index = e, this.getComplexIdentifier();
            if (!r.Character.isIdentifierPart(t)) break;
            ++this.index
          }
          return this.source.slice(e, this.index)
        }, e.prototype.getComplexIdentifier = function () {
          var e, t = this.codePointAt(this.index), i = r.Character.fromCodePoint(t);
          for (this.index += i.length, 92 === t && (117 !== this.source.charCodeAt(this.index) && this.throwUnexpectedToken(), ++this.index, "{" === this.source[this.index] ? (++this.index, e = this.scanUnicodeCodePointEscape()) : null !== (e = this.scanHexEscape("u")) && "\\" !== e && r.Character.isIdentifierStart(e.charCodeAt(0)) || this.throwUnexpectedToken(), i = e); !this.eof() && (t = this.codePointAt(this.index), r.Character.isIdentifierPart(t));) i += e = r.Character.fromCodePoint(t), this.index += e.length, 92 === t && (i = i.substr(0, i.length - 1), 117 !== this.source.charCodeAt(this.index) && this.throwUnexpectedToken(), ++this.index, "{" === this.source[this.index] ? (++this.index, e = this.scanUnicodeCodePointEscape()) : null !== (e = this.scanHexEscape("u")) && "\\" !== e && r.Character.isIdentifierPart(e.charCodeAt(0)) || this.throwUnexpectedToken(), i += e);
          return i
        }, e.prototype.octalToDecimal = function (e) {
          var t = "0" !== e, i = o(e);
          return !this.eof() && r.Character.isOctalDigit(this.source.charCodeAt(this.index)) && (t = !0, i = 8 * i + o(this.source[this.index++]), "0123".indexOf(e) >= 0 && !this.eof() && r.Character.isOctalDigit(this.source.charCodeAt(this.index)) && (i = 8 * i + o(this.source[this.index++]))), {
            code: i,
            octal: t
          }
        }, e.prototype.scanIdentifier = function () {
          var e, t = this.index,
              i = 92 === this.source.charCodeAt(t) ? this.getComplexIdentifier() : this.getIdentifier();
          if (3 !== (e = 1 === i.length ? 3 : this.isKeyword(i) ? 4 : "null" === i ? 5 : "true" === i || "false" === i ? 1 : 3) && t + i.length !== this.index) {
            var n = this.index;
            this.index = t, this.tolerateUnexpectedToken(s.Messages.InvalidEscapedReservedWord), this.index = n
          }
          return {type: e, value: i, lineNumber: this.lineNumber, lineStart: this.lineStart, start: t, end: this.index}
        }, e.prototype.scanPunctuator = function () {
          var e = this.index, t = this.source[this.index];
          switch (t) {
            case"(":
            case"{":
              "{" === t && this.curlyStack.push("{"), ++this.index;
              break;
            case".":
              ++this.index, "." === this.source[this.index] && "." === this.source[this.index + 1] && (this.index += 2, t = "...");
              break;
            case"}":
              ++this.index, this.curlyStack.pop();
              break;
            case")":
            case";":
            case",":
            case"[":
            case"]":
            case":":
            case"?":
            case"~":
              ++this.index;
              break;
            default:
              ">>>=" === (t = this.source.substr(this.index, 4)) ? this.index += 4 : "===" === (t = t.substr(0, 3)) || "!==" === t || ">>>" === t || "<<=" === t || ">>=" === t || "**=" === t ? this.index += 3 : "&&" === (t = t.substr(0, 2)) || "||" === t || "==" === t || "!=" === t || "+=" === t || "-=" === t || "*=" === t || "/=" === t || "++" === t || "--" === t || "<<" === t || ">>" === t || "&=" === t || "|=" === t || "^=" === t || "%=" === t || "<=" === t || ">=" === t || "=>" === t || "**" === t ? this.index += 2 : (t = this.source[this.index], "<>=!+-*%&|^/".indexOf(t) >= 0 && ++this.index)
          }
          return this.index === e && this.throwUnexpectedToken(), {
            type: 7,
            value: t,
            lineNumber: this.lineNumber,
            lineStart: this.lineStart,
            start: e,
            end: this.index
          }
        }, e.prototype.scanHexLiteral = function (e) {
          for (var t = ""; !this.eof() && r.Character.isHexDigit(this.source.charCodeAt(this.index));) t += this.source[this.index++];
          return 0 === t.length && this.throwUnexpectedToken(), r.Character.isIdentifierStart(this.source.charCodeAt(this.index)) && this.throwUnexpectedToken(), {
            type: 6,
            value: parseInt("0x" + t, 16),
            lineNumber: this.lineNumber,
            lineStart: this.lineStart,
            start: e,
            end: this.index
          }
        }, e.prototype.scanBinaryLiteral = function (e) {
          for (var t, i = ""; !this.eof() && ("0" === (t = this.source[this.index]) || "1" === t);) i += this.source[this.index++];
          return 0 === i.length && this.throwUnexpectedToken(), this.eof() || (t = this.source.charCodeAt(this.index), (r.Character.isIdentifierStart(t) || r.Character.isDecimalDigit(t)) && this.throwUnexpectedToken()), {
            type: 6,
            value: parseInt(i, 2),
            lineNumber: this.lineNumber,
            lineStart: this.lineStart,
            start: e,
            end: this.index
          }
        }, e.prototype.scanOctalLiteral = function (e, t) {
          var i = "", n = !1;
          for (r.Character.isOctalDigit(e.charCodeAt(0)) ? (n = !0, i = "0" + this.source[this.index++]) : ++this.index; !this.eof() && r.Character.isOctalDigit(this.source.charCodeAt(this.index));) i += this.source[this.index++];
          return n || 0 !== i.length || this.throwUnexpectedToken(), (r.Character.isIdentifierStart(this.source.charCodeAt(this.index)) || r.Character.isDecimalDigit(this.source.charCodeAt(this.index))) && this.throwUnexpectedToken(), {
            type: 6,
            value: parseInt(i, 8),
            octal: n,
            lineNumber: this.lineNumber,
            lineStart: this.lineStart,
            start: t,
            end: this.index
          }
        }, e.prototype.isImplicitOctalLiteral = function () {
          for (var e = this.index + 1; e < this.length; ++e) {
            var t = this.source[e];
            if ("8" === t || "9" === t) return !1;
            if (!r.Character.isOctalDigit(t.charCodeAt(0))) return !0
          }
          return !0
        }, e.prototype.scanNumericLiteral = function () {
          var e = this.index, t = this.source[e];
          n.assert(r.Character.isDecimalDigit(t.charCodeAt(0)) || "." === t, "Numeric literal must start with a decimal digit or a decimal point");
          var i = "";
          if ("." !== t) {
            if (i = this.source[this.index++], t = this.source[this.index], "0" === i) {
              if ("x" === t || "X" === t) return ++this.index, this.scanHexLiteral(e);
              if ("b" === t || "B" === t) return ++this.index, this.scanBinaryLiteral(e);
              if ("o" === t || "O" === t) return this.scanOctalLiteral(t, e);
              if (t && r.Character.isOctalDigit(t.charCodeAt(0)) && this.isImplicitOctalLiteral()) return this.scanOctalLiteral(t, e)
            }
            for (; r.Character.isDecimalDigit(this.source.charCodeAt(this.index));) i += this.source[this.index++];
            t = this.source[this.index]
          }
          if ("." === t) {
            for (i += this.source[this.index++]; r.Character.isDecimalDigit(this.source.charCodeAt(this.index));) i += this.source[this.index++];
            t = this.source[this.index]
          }
          if ("e" === t || "E" === t) if (i += this.source[this.index++], "+" !== (t = this.source[this.index]) && "-" !== t || (i += this.source[this.index++]), r.Character.isDecimalDigit(this.source.charCodeAt(this.index))) for (; r.Character.isDecimalDigit(this.source.charCodeAt(this.index));) i += this.source[this.index++]; else this.throwUnexpectedToken();
          return r.Character.isIdentifierStart(this.source.charCodeAt(this.index)) && this.throwUnexpectedToken(), {
            type: 6,
            value: parseFloat(i),
            lineNumber: this.lineNumber,
            lineStart: this.lineStart,
            start: e,
            end: this.index
          }
        }, e.prototype.scanStringLiteral = function () {
          var e = this.index, t = this.source[e];
          n.assert("'" === t || '"' === t, "String literal must starts with a quote"), ++this.index;
          for (var i = !1, a = ""; !this.eof();) {
            var o = this.source[this.index++];
            if (o === t) {
              t = "";
              break
            }
            if ("\\" === o) if ((o = this.source[this.index++]) && r.Character.isLineTerminator(o.charCodeAt(0))) ++this.lineNumber, "\r" === o && "\n" === this.source[this.index] && ++this.index, this.lineStart = this.index; else switch (o) {
              case"u":
                if ("{" === this.source[this.index]) ++this.index, a += this.scanUnicodeCodePointEscape(); else {
                  var u = this.scanHexEscape(o);
                  null === u && this.throwUnexpectedToken(), a += u
                }
                break;
              case"x":
                var l = this.scanHexEscape(o);
                null === l && this.throwUnexpectedToken(s.Messages.InvalidHexEscapeSequence), a += l;
                break;
              case"n":
                a += "\n";
                break;
              case"r":
                a += "\r";
                break;
              case"t":
                a += "\t";
                break;
              case"b":
                a += "\b";
                break;
              case"f":
                a += "\f";
                break;
              case"v":
                a += "\v";
                break;
              case"8":
              case"9":
                a += o, this.tolerateUnexpectedToken();
                break;
              default:
                if (o && r.Character.isOctalDigit(o.charCodeAt(0))) {
                  var h = this.octalToDecimal(o);
                  i = h.octal || i, a += String.fromCharCode(h.code)
                } else a += o
            } else {
              if (r.Character.isLineTerminator(o.charCodeAt(0))) break;
              a += o
            }
          }
          return "" !== t && (this.index = e, this.throwUnexpectedToken()), {
            type: 8,
            value: a,
            octal: i,
            lineNumber: this.lineNumber,
            lineStart: this.lineStart,
            start: e,
            end: this.index
          }
        }, e.prototype.scanTemplate = function () {
          var e = "", t = !1, i = this.index, n = "`" === this.source[i], a = !1, o = 2;
          for (++this.index; !this.eof();) {
            var u = this.source[this.index++];
            if ("`" === u) {
              o = 1, a = !0, t = !0;
              break
            }
            if ("$" === u) {
              if ("{" === this.source[this.index]) {
                this.curlyStack.push("${"), ++this.index, t = !0;
                break
              }
              e += u
            } else if ("\\" === u) if (u = this.source[this.index++], r.Character.isLineTerminator(u.charCodeAt(0))) ++this.lineNumber, "\r" === u && "\n" === this.source[this.index] && ++this.index, this.lineStart = this.index; else switch (u) {
              case"n":
                e += "\n";
                break;
              case"r":
                e += "\r";
                break;
              case"t":
                e += "\t";
                break;
              case"u":
                if ("{" === this.source[this.index]) ++this.index, e += this.scanUnicodeCodePointEscape(); else {
                  var l = this.index, h = this.scanHexEscape(u);
                  null !== h ? e += h : (this.index = l, e += u)
                }
                break;
              case"x":
                var c = this.scanHexEscape(u);
                null === c && this.throwUnexpectedToken(s.Messages.InvalidHexEscapeSequence), e += c;
                break;
              case"b":
                e += "\b";
                break;
              case"f":
                e += "\f";
                break;
              case"v":
                e += "\v";
                break;
              default:
                "0" === u ? (r.Character.isDecimalDigit(this.source.charCodeAt(this.index)) && this.throwUnexpectedToken(s.Messages.TemplateOctalLiteral), e += "\0") : r.Character.isOctalDigit(u.charCodeAt(0)) ? this.throwUnexpectedToken(s.Messages.TemplateOctalLiteral) : e += u
            } else r.Character.isLineTerminator(u.charCodeAt(0)) ? (++this.lineNumber, "\r" === u && "\n" === this.source[this.index] && ++this.index, this.lineStart = this.index, e += "\n") : e += u
          }
          return t || this.throwUnexpectedToken(), n || this.curlyStack.pop(), {
            type: 10,
            value: this.source.slice(i + 1, this.index - o),
            cooked: e,
            head: n,
            tail: a,
            lineNumber: this.lineNumber,
            lineStart: this.lineStart,
            start: i,
            end: this.index
          }
        }, e.prototype.testRegExp = function (e, t) {
          var i = e, n = this;
          t.indexOf("u") >= 0 && (i = i.replace(/\\u\{([0-9a-fA-F]+)\}|\\u([a-fA-F0-9]{4})/g, function (e, t, i) {
            var r = parseInt(t || i, 16);
            return r > 1114111 && n.throwUnexpectedToken(s.Messages.InvalidRegExp), r <= 65535 ? String.fromCharCode(r) : "???"
          }).replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, "???"));
          try {
            RegExp(i)
          } catch (e) {
            this.throwUnexpectedToken(s.Messages.InvalidRegExp)
          }
          try {
            return new RegExp(e, t)
          } catch (e) {
            return null
          }
        }, e.prototype.scanRegExpBody = function () {
          var e = this.source[this.index];
          n.assert("/" === e, "Regular expression literal must start with a slash");
          for (var t = this.source[this.index++], i = !1, a = !1; !this.eof();) if (t += e = this.source[this.index++], "\\" === e) e = this.source[this.index++], r.Character.isLineTerminator(e.charCodeAt(0)) && this.throwUnexpectedToken(s.Messages.UnterminatedRegExp), t += e; else if (r.Character.isLineTerminator(e.charCodeAt(0))) this.throwUnexpectedToken(s.Messages.UnterminatedRegExp); else if (i) "]" === e && (i = !1); else {
            if ("/" === e) {
              a = !0;
              break
            }
            "[" === e && (i = !0)
          }
          return a || this.throwUnexpectedToken(s.Messages.UnterminatedRegExp), t.substr(1, t.length - 2)
        }, e.prototype.scanRegExpFlags = function () {
          for (var e = ""; !this.eof();) {
            var t = this.source[this.index];
            if (!r.Character.isIdentifierPart(t.charCodeAt(0))) break;
            if (++this.index, "\\" !== t || this.eof()) e += t, t; else if ("u" === (t = this.source[this.index])) {
              ++this.index;
              var i = this.index, n = this.scanHexEscape("u");
              if (null !== n) for (e += n, "\\u"; i < this.index; ++i) this.source[i]; else this.index = i, e += "u", "\\u";
              this.tolerateUnexpectedToken()
            } else "\\", this.tolerateUnexpectedToken()
          }
          return e
        }, e.prototype.scanRegExp = function () {
          var e = this.index, t = this.scanRegExpBody(), i = this.scanRegExpFlags();
          return {
            type: 9,
            value: "",
            pattern: t,
            flags: i,
            regex: this.testRegExp(t, i),
            lineNumber: this.lineNumber,
            lineStart: this.lineStart,
            start: e,
            end: this.index
          }
        }, e.prototype.lex = function () {
          if (this.eof()) return {
            type: 2,
            value: "",
            lineNumber: this.lineNumber,
            lineStart: this.lineStart,
            start: this.index,
            end: this.index
          };
          var e = this.source.charCodeAt(this.index);
          return r.Character.isIdentifierStart(e) ? this.scanIdentifier() : 40 === e || 41 === e || 59 === e ? this.scanPunctuator() : 39 === e || 34 === e ? this.scanStringLiteral() : 46 === e ? r.Character.isDecimalDigit(this.source.charCodeAt(this.index + 1)) ? this.scanNumericLiteral() : this.scanPunctuator() : r.Character.isDecimalDigit(e) ? this.scanNumericLiteral() : 96 === e || 125 === e && "${" === this.curlyStack[this.curlyStack.length - 1] ? this.scanTemplate() : e >= 55296 && e < 57343 && r.Character.isIdentifierStart(this.codePointAt(this.index)) ? this.scanIdentifier() : this.scanPunctuator()
        }, e
      }();
      t.Scanner = u
    }, function (e, t) {
      "use strict";
      Object.defineProperty(t, "__esModule", {value: !0}), t.TokenName = {}, t.TokenName[1] = "Boolean", t.TokenName[2] = "<end>", t.TokenName[3] = "Identifier", t.TokenName[4] = "Keyword", t.TokenName[5] = "Null", t.TokenName[6] = "Numeric", t.TokenName[7] = "Punctuator", t.TokenName[8] = "String", t.TokenName[9] = "RegularExpression", t.TokenName[10] = "Template"
    }, function (e, t) {
      "use strict";
      Object.defineProperty(t, "__esModule", {value: !0}), t.XHTMLEntities = {
        quot: '"',
        amp: "&",
        apos: "'",
        gt: ">",
        nbsp: "??",
        iexcl: "??",
        cent: "??",
        pound: "??",
        curren: "??",
        yen: "??",
        brvbar: "??",
        sect: "??",
        uml: "??",
        copy: "??",
        ordf: "??",
        laquo: "??",
        not: "??",
        shy: "??",
        reg: "??",
        macr: "??",
        deg: "??",
        plusmn: "??",
        sup2: "??",
        sup3: "??",
        acute: "??",
        micro: "??",
        para: "??",
        middot: "??",
        cedil: "??",
        sup1: "??",
        ordm: "??",
        raquo: "??",
        frac14: "??",
        frac12: "??",
        frac34: "??",
        iquest: "??",
        Agrave: "??",
        Aacute: "??",
        Acirc: "??",
        Atilde: "??",
        Auml: "??",
        Aring: "??",
        AElig: "??",
        Ccedil: "??",
        Egrave: "??",
        Eacute: "??",
        Ecirc: "??",
        Euml: "??",
        Igrave: "??",
        Iacute: "??",
        Icirc: "??",
        Iuml: "??",
        ETH: "??",
        Ntilde: "??",
        Ograve: "??",
        Oacute: "??",
        Ocirc: "??",
        Otilde: "??",
        Ouml: "??",
        times: "??",
        Oslash: "??",
        Ugrave: "??",
        Uacute: "??",
        Ucirc: "??",
        Uuml: "??",
        Yacute: "??",
        THORN: "??",
        szlig: "??",
        agrave: "??",
        aacute: "??",
        acirc: "??",
        atilde: "??",
        auml: "??",
        aring: "??",
        aelig: "??",
        ccedil: "??",
        egrave: "??",
        eacute: "??",
        ecirc: "??",
        euml: "??",
        igrave: "??",
        iacute: "??",
        icirc: "??",
        iuml: "??",
        eth: "??",
        ntilde: "??",
        ograve: "??",
        oacute: "??",
        ocirc: "??",
        otilde: "??",
        ouml: "??",
        divide: "??",
        oslash: "??",
        ugrave: "??",
        uacute: "??",
        ucirc: "??",
        uuml: "??",
        yacute: "??",
        thorn: "??",
        yuml: "??",
        OElig: "??",
        oelig: "??",
        Scaron: "??",
        scaron: "??",
        Yuml: "??",
        fnof: "??",
        circ: "??",
        tilde: "??",
        Alpha: "??",
        Beta: "??",
        Gamma: "??",
        Delta: "??",
        Epsilon: "??",
        Zeta: "??",
        Eta: "??",
        Theta: "??",
        Iota: "??",
        Kappa: "??",
        Lambda: "??",
        Mu: "??",
        Nu: "??",
        Xi: "??",
        Omicron: "??",
        Pi: "??",
        Rho: "??",
        Sigma: "??",
        Tau: "??",
        Upsilon: "??",
        Phi: "??",
        Chi: "??",
        Psi: "??",
        Omega: "??",
        alpha: "??",
        beta: "??",
        gamma: "??",
        delta: "??",
        epsilon: "??",
        zeta: "??",
        eta: "??",
        theta: "??",
        iota: "??",
        kappa: "??",
        lambda: "??",
        mu: "??",
        nu: "??",
        xi: "??",
        omicron: "??",
        pi: "??",
        rho: "??",
        sigmaf: "??",
        sigma: "??",
        tau: "??",
        upsilon: "??",
        phi: "??",
        chi: "??",
        psi: "??",
        omega: "??",
        thetasym: "??",
        upsih: "??",
        piv: "??",
        ensp: "???",
        emsp: "???",
        thinsp: "???",
        zwnj: "???",
        zwj: "???",
        lrm: "???",
        rlm: "???",
        ndash: "???",
        mdash: "???",
        lsquo: "???",
        rsquo: "???",
        sbquo: "???",
        ldquo: "???",
        rdquo: "???",
        bdquo: "???",
        dagger: "???",
        Dagger: "???",
        bull: "???",
        hellip: "???",
        permil: "???",
        prime: "???",
        Prime: "???",
        lsaquo: "???",
        rsaquo: "???",
        oline: "???",
        frasl: "???",
        euro: "???",
        image: "???",
        weierp: "???",
        real: "???",
        trade: "???",
        alefsym: "???",
        larr: "???",
        uarr: "???",
        rarr: "???",
        darr: "???",
        harr: "???",
        crarr: "???",
        lArr: "???",
        uArr: "???",
        rArr: "???",
        dArr: "???",
        hArr: "???",
        forall: "???",
        part: "???",
        exist: "???",
        empty: "???",
        nabla: "???",
        isin: "???",
        notin: "???",
        ni: "???",
        prod: "???",
        sum: "???",
        minus: "???",
        lowast: "???",
        radic: "???",
        prop: "???",
        infin: "???",
        ang: "???",
        and: "???",
        or: "???",
        cap: "???",
        cup: "???",
        int: "???",
        there4: "???",
        sim: "???",
        cong: "???",
        asymp: "???",
        ne: "???",
        equiv: "???",
        le: "???",
        ge: "???",
        sub: "???",
        sup: "???",
        nsub: "???",
        sube: "???",
        supe: "???",
        oplus: "???",
        otimes: "???",
        perp: "???",
        sdot: "???",
        lceil: "???",
        rceil: "???",
        lfloor: "???",
        rfloor: "???",
        loz: "???",
        spades: "???",
        clubs: "???",
        hearts: "???",
        diams: "???",
        lang: "???",
        rang: "???"
      }
    }, function (e, t, i) {
      "use strict";
      Object.defineProperty(t, "__esModule", {value: !0});
      var n = i(10), r = i(12), s = i(13), a = function () {
        function e() {
          this.values = [], this.curly = this.paren = -1
        }

        return e.prototype.beforeFunctionExpression = function (e) {
          return ["(", "{", "[", "in", "typeof", "instanceof", "new", "return", "case", "delete", "throw", "void", "=", "+=", "-=", "*=", "**=", "/=", "%=", "<<=", ">>=", ">>>=", "&=", "|=", "^=", ",", "+", "-", "*", "**", "/", "%", "++", "--", "<<", ">>", ">>>", "&", "|", "^", "!", "~", "&&", "||", "?", ":", "===", "==", ">=", "<=", "<", ">", "!=", "!=="].indexOf(e) >= 0
        }, e.prototype.isRegexStart = function () {
          var e = this.values[this.values.length - 1], t = null !== e;
          switch (e) {
            case"this":
            case"]":
              t = !1;
              break;
            case")":
              var i = this.values[this.paren - 1];
              t = "if" === i || "while" === i || "for" === i || "with" === i;
              break;
            case"}":
              if (t = !1, "function" === this.values[this.curly - 3]) t = !!(n = this.values[this.curly - 4]) && !this.beforeFunctionExpression(n); else if ("function" === this.values[this.curly - 4]) {
                var n;
                t = !(n = this.values[this.curly - 5]) || !this.beforeFunctionExpression(n)
              }
          }
          return t
        }, e.prototype.push = function (e) {
          7 === e.type || 4 === e.type ? ("{" === e.value ? this.curly = this.values.length : "(" === e.value && (this.paren = this.values.length), this.values.push(e.value)) : this.values.push(null)
        }, e
      }(), o = function () {
        function e(e, t) {
          this.errorHandler = new n.ErrorHandler, this.errorHandler.tolerant = !!t && ("boolean" == typeof t.tolerant && t.tolerant), this.scanner = new r.Scanner(e, this.errorHandler), this.scanner.trackComment = !!t && ("boolean" == typeof t.comment && t.comment), this.trackRange = !!t && ("boolean" == typeof t.range && t.range), this.trackLoc = !!t && ("boolean" == typeof t.loc && t.loc), this.buffer = [], this.reader = new a
        }

        return e.prototype.errors = function () {
          return this.errorHandler.errors
        }, e.prototype.getNextToken = function () {
          if (0 === this.buffer.length) {
            var e = this.scanner.scanComments();
            if (this.scanner.trackComment) for (var t = 0; t < e.length; ++t) {
              var i = e[t], n = this.scanner.source.slice(i.slice[0], i.slice[1]),
                  r = {type: i.multiLine ? "BlockComment" : "LineComment", value: n};
              this.trackRange && (r.range = i.range), this.trackLoc && (r.loc = i.loc), this.buffer.push(r)
            }
            if (!this.scanner.eof()) {
              var a = void 0;
              this.trackLoc && (a = {
                start: {
                  line: this.scanner.lineNumber,
                  column: this.scanner.index - this.scanner.lineStart
                }, end: {}
              });
              var o = "/" === this.scanner.source[this.scanner.index] && this.reader.isRegexStart() ? this.scanner.scanRegExp() : this.scanner.lex();
              this.reader.push(o);
              var u = {type: s.TokenName[o.type], value: this.scanner.source.slice(o.start, o.end)};
              if (this.trackRange && (u.range = [o.start, o.end]), this.trackLoc && (a.end = {
                line: this.scanner.lineNumber,
                column: this.scanner.index - this.scanner.lineStart
              }, u.loc = a), 9 === o.type) {
                var l = o.pattern, h = o.flags;
                u.regex = {pattern: l, flags: h}
              }
              this.buffer.push(u)
            }
          }
          return this.buffer.shift()
        }, e
      }();
      t.Tokenizer = o
    }])
  }, e.exports = n()
}, function (e, t, i) {
  var n, r;
  !function () {
    var s = i(3), a = i(5), o = Array.isArray || function (e) {
      return "[object Array]" === {}.toString.call(e)
    }, u = {}, h = {};
    void 0 === (r = "function" == typeof (n = function () {
      function e(t, i, n) {
        var r, s, a;
        if (0 === n.length) return t === i;
        if (null == i) return !1;
        if (r = i[n[0]], s = n.slice(1), o(r)) {
          for (a = 0, l = r.length; a < l; ++a) if (e(t, r[a], s)) return !0;
          return !1
        }
        return e(t, r, s)
      }

      function t(a, o, l) {
        var c, p, d, m;
        if (!o) return !0;
        if (!a) return !1;
        switch (l || (l = []), o.type) {
          case"wildcard":
            return !0;
          case"identifier":
            return o.value.toLowerCase() === a.type.toLowerCase();
          case"field":
            return e(a, l[(c = o.name.split(".")).length - 1], c);
          case"matches":
            for (p = 0, d = o.selectors.length; p < d; ++p) if (t(a, o.selectors[p], l)) return !0;
            return !1;
          case"compound":
            for (p = 0, d = o.selectors.length; p < d; ++p) if (!t(a, o.selectors[p], l)) return !1;
            return !0;
          case"not":
            for (p = 0, d = o.selectors.length; p < d; ++p) if (t(a, o.selectors[p], l)) return !1;
            return !0;
          case"has":
            var f, x = [];
            for (p = 0, d = o.selectors.length; p < d; ++p) f = [], s.traverse(a, {
              enter: function (e, i) {
                null != i && f.unshift(i), t(e, o.selectors[p], f) && x.push(e)
              }, leave: function () {
                f.shift()
              }
            });
            return 0 !== x.length;
          case"child":
            return !!t(a, o.right, l) && t(l[0], o.left, l.slice(1));
          case"descendant":
            if (t(a, o.right, l)) for (p = 0, d = l.length; p < d; ++p) if (t(l[p], o.left, l.slice(p + 1))) return !0;
            return !1;
          case"attribute":
            switch (m = function (e, t) {
              var i, n = t.split(".");
              for (i = 0; i < n.length; i++) {
                if (null == e) return e;
                e = e[n[i]]
              }
              return e
            }(a, o.name), o.operator) {
              case null:
              case void 0:
                return null != m;
              case"=":
                switch (o.value.type) {
                  case"regexp":
                    return "string" == typeof m && o.value.value.test(m);
                  case"literal":
                    return "" + o.value.value == "" + m;
                  case"type":
                    return o.value.value === typeof m
                }
              case"!=":
                switch (o.value.type) {
                  case"regexp":
                    return !o.value.value.test(m);
                  case"literal":
                    return "" + o.value.value != "" + m;
                  case"type":
                    return o.value.value !== typeof m
                }
              case"<=":
                return m <= o.value.value;
              case"<":
                return m < o.value.value;
              case">":
                return m > o.value.value;
              case">=":
                return m >= o.value.value
            }
          case"sibling":
            return t(a, o.right, l) && i(a, o.left, l, u) || o.left.subject && t(a, o.left, l) && i(a, o.right, l, h);
          case"adjacent":
            return t(a, o.right, l) && n(a, o.left, l, u) || o.right.subject && t(a, o.left, l) && n(a, o.right, l, h);
          case"nth-child":
            return t(a, o.right, l) && r(a, l, function (e) {
              return o.index.value - 1
            });
          case"nth-last-child":
            return t(a, o.right, l) && r(a, l, function (e) {
              return e - o.index.value
            });
          case"class":
            if (!a.type) return !1;
            switch (o.name.toLowerCase()) {
              case"statement":
                if ("Statement" === a.type.slice(-9)) return !0;
              case"declaration":
                return "Declaration" === a.type.slice(-11);
              case"pattern":
                if ("Pattern" === a.type.slice(-7)) return !0;
              case"expression":
                return "Expression" === a.type.slice(-10) || "Literal" === a.type.slice(-7) || "Identifier" === a.type && (0 === l.length || "MetaProperty" !== l[0].type) || "MetaProperty" === a.type;
              case"function":
                return "Function" === a.type.slice(0, 8) || "ArrowFunctionExpression" === a.type
            }
            throw new Error("Unknown class name: " + o.name)
        }
        throw new Error("Unknown selector type: " + o.type)
      }

      function i(e, i, n, r) {
        var a, l, h, c, p, d, m, f, x = n[0];
        if (!x) return !1;
        for (c = 0, p = (h = s.VisitorKeys[x.type]).length; c < p; ++c) if (a = x[h[c]], o(a)) {
          if ((l = a.indexOf(e)) < 0) continue;
          for (r === u ? (m = 0, f = l) : (m = l + 1, f = a.length), d = m; d < f; ++d) if (t(a[d], i, n)) return !0
        }
        return !1
      }

      function n(e, i, n, r) {
        var a, l, c, p, d, m = n[0];
        if (!m) return !1;
        for (c = 0, p = (l = s.VisitorKeys[m.type]).length; c < p; ++c) if (a = m[l[c]], o(a)) {
          if ((d = a.indexOf(e)) < 0) continue;
          if (r === u && d > 0 && t(a[d - 1], i, n)) return !0;
          if (r === h && d < a.length - 1 && t(a[d + 1], i, n)) return !0
        }
        return !1
      }

      function r(e, t, i) {
        var n, r, a, u, l, h = t[0];
        if (!h) return !1;
        for (a = 0, u = (r = s.VisitorKeys[h.type]).length; a < u; ++a) if (n = h[r[a]], o(n) && (l = n.indexOf(e)) >= 0 && l === i(n.length)) return !0;
        return !1
      }

      function c(e, i) {
        var n, r, a, o, u, l = [], h = [];
        return i ? (n = function e(t, i) {
          var n, r;
          if (null == t || "object" != typeof t) return [];
          for (r in null == i && (i = t), n = t.subject ? [i] : [], t) ({}).hasOwnProperty.call(t, r) && [].push.apply(n, e(t[r], "left" === r ? t[r] : i));
          return n
        }(i), s.traverse(e, {
          enter: function (e, s) {
            if (null != s && l.unshift(s), t(e, i, l)) if (n.length) for (r = 0, a = n.length; r < a; ++r) for (t(e, n[r], l) && h.push(e), o = 0, u = l.length; o < u; ++o) t(l[o], n[r], l.slice(o + 1)) && h.push(l[o]); else h.push(e)
          }, leave: function () {
            l.shift()
          }
        }), h) : h
      }

      function p(e) {
        return a.parse(e)
      }

      function d(e, t) {
        return c(e, p(t))
      }

      return d.parse = p, d.match = c, d.matches = t, d.query = d
    }) ? n.call(t, i, t, e) : n) || (e.exports = r)
  }()
}, function (e, t, i) {
  !function e(t) {
    "use strict";
    var n, r, s, a, o, u, l, h, c;

    function p(e) {
      var t, i, n = {};
      for (t in e) e.hasOwnProperty(t) && (i = e[t], n[t] = "object" == typeof i && null !== i ? p(i) : i);
      return n
    }

    function d(e, t) {
      this.parent = e, this.key = t
    }

    function m(e, t, i, n) {
      this.node = e, this.path = t, this.wrap = i, this.ref = n
    }

    function f() {
    }

    function x(e) {
      return null != e && ("object" == typeof e && "string" == typeof e.type)
    }

    function D(e, t) {
      return (e === n.ObjectExpression || e === n.ObjectPattern) && "properties" === t
    }

    function y(e, t) {
      return (new f).traverse(e, t)
    }

    function E(e, t) {
      var i;
      return i = function (e, t) {
        var i, n, r, s;
        for (n = e.length, r = 0; n;) t(e[s = r + (i = n >>> 1)]) ? n = i : (r = s + 1, n -= i + 1);
        return r
      }(t, function (t) {
        return t.range[0] > e.range[0]
      }), e.extendedRange = [e.range[0], e.range[1]], i !== t.length && (e.extendedRange[1] = t[i].range[0]), (i -= 1) >= 0 && (e.extendedRange[0] = t[i].range[1]), e
    }

    return (r = Array.isArray) || (r = function (e) {
      return "[object Array]" === Object.prototype.toString.call(e)
    }), o = Object.create || function () {
      function e() {
      }

      return function (t) {
        return e.prototype = t, new e
      }
    }(), u = Object.keys || function (e) {
      var t, i = [];
      for (t in e) i.push(t);
      return i
    }, n = {
      AssignmentExpression: "AssignmentExpression",
      AssignmentPattern: "AssignmentPattern",
      ArrayExpression: "ArrayExpression",
      ArrayPattern: "ArrayPattern",
      ArrowFunctionExpression: "ArrowFunctionExpression",
      AwaitExpression: "AwaitExpression",
      BlockStatement: "BlockStatement",
      BinaryExpression: "BinaryExpression",
      BreakStatement: "BreakStatement",
      CallExpression: "CallExpression",
      CatchClause: "CatchClause",
      ClassBody: "ClassBody",
      ClassDeclaration: "ClassDeclaration",
      ClassExpression: "ClassExpression",
      ComprehensionBlock: "ComprehensionBlock",
      ComprehensionExpression: "ComprehensionExpression",
      ConditionalExpression: "ConditionalExpression",
      ContinueStatement: "ContinueStatement",
      DebuggerStatement: "DebuggerStatement",
      DirectiveStatement: "DirectiveStatement",
      DoWhileStatement: "DoWhileStatement",
      EmptyStatement: "EmptyStatement",
      ExportAllDeclaration: "ExportAllDeclaration",
      ExportDefaultDeclaration: "ExportDefaultDeclaration",
      ExportNamedDeclaration: "ExportNamedDeclaration",
      ExportSpecifier: "ExportSpecifier",
      ExpressionStatement: "ExpressionStatement",
      ForStatement: "ForStatement",
      ForInStatement: "ForInStatement",
      ForOfStatement: "ForOfStatement",
      FunctionDeclaration: "FunctionDeclaration",
      FunctionExpression: "FunctionExpression",
      GeneratorExpression: "GeneratorExpression",
      Identifier: "Identifier",
      IfStatement: "IfStatement",
      ImportDeclaration: "ImportDeclaration",
      ImportDefaultSpecifier: "ImportDefaultSpecifier",
      ImportNamespaceSpecifier: "ImportNamespaceSpecifier",
      ImportSpecifier: "ImportSpecifier",
      Literal: "Literal",
      LabeledStatement: "LabeledStatement",
      LogicalExpression: "LogicalExpression",
      MemberExpression: "MemberExpression",
      MetaProperty: "MetaProperty",
      MethodDefinition: "MethodDefinition",
      ModuleSpecifier: "ModuleSpecifier",
      NewExpression: "NewExpression",
      ObjectExpression: "ObjectExpression",
      ObjectPattern: "ObjectPattern",
      Program: "Program",
      Property: "Property",
      RestElement: "RestElement",
      ReturnStatement: "ReturnStatement",
      SequenceExpression: "SequenceExpression",
      SpreadElement: "SpreadElement",
      Super: "Super",
      SwitchStatement: "SwitchStatement",
      SwitchCase: "SwitchCase",
      TaggedTemplateExpression: "TaggedTemplateExpression",
      TemplateElement: "TemplateElement",
      TemplateLiteral: "TemplateLiteral",
      ThisExpression: "ThisExpression",
      ThrowStatement: "ThrowStatement",
      TryStatement: "TryStatement",
      UnaryExpression: "UnaryExpression",
      UpdateExpression: "UpdateExpression",
      VariableDeclaration: "VariableDeclaration",
      VariableDeclarator: "VariableDeclarator",
      WhileStatement: "WhileStatement",
      WithStatement: "WithStatement",
      YieldExpression: "YieldExpression"
    }, a = {
      AssignmentExpression: ["left", "right"],
      AssignmentPattern: ["left", "right"],
      ArrayExpression: ["elements"],
      ArrayPattern: ["elements"],
      ArrowFunctionExpression: ["params", "body"],
      AwaitExpression: ["argument"],
      BlockStatement: ["body"],
      BinaryExpression: ["left", "right"],
      BreakStatement: ["label"],
      CallExpression: ["callee", "arguments"],
      CatchClause: ["param", "body"],
      ClassBody: ["body"],
      ClassDeclaration: ["id", "superClass", "body"],
      ClassExpression: ["id", "superClass", "body"],
      ComprehensionBlock: ["left", "right"],
      ComprehensionExpression: ["blocks", "filter", "body"],
      ConditionalExpression: ["test", "consequent", "alternate"],
      ContinueStatement: ["label"],
      DebuggerStatement: [],
      DirectiveStatement: [],
      DoWhileStatement: ["body", "test"],
      EmptyStatement: [],
      ExportAllDeclaration: ["source"],
      ExportDefaultDeclaration: ["declaration"],
      ExportNamedDeclaration: ["declaration", "specifiers", "source"],
      ExportSpecifier: ["exported", "local"],
      ExpressionStatement: ["expression"],
      ForStatement: ["init", "test", "update", "body"],
      ForInStatement: ["left", "right", "body"],
      ForOfStatement: ["left", "right", "body"],
      FunctionDeclaration: ["id", "params", "body"],
      FunctionExpression: ["id", "params", "body"],
      GeneratorExpression: ["blocks", "filter", "body"],
      Identifier: [],
      IfStatement: ["test", "consequent", "alternate"],
      ImportDeclaration: ["specifiers", "source"],
      ImportDefaultSpecifier: ["local"],
      ImportNamespaceSpecifier: ["local"],
      ImportSpecifier: ["imported", "local"],
      Literal: [],
      LabeledStatement: ["label", "body"],
      LogicalExpression: ["left", "right"],
      MemberExpression: ["object", "property"],
      MetaProperty: ["meta", "property"],
      MethodDefinition: ["key", "value"],
      ModuleSpecifier: [],
      NewExpression: ["callee", "arguments"],
      ObjectExpression: ["properties"],
      ObjectPattern: ["properties"],
      Program: ["body"],
      Property: ["key", "value"],
      RestElement: ["argument"],
      ReturnStatement: ["argument"],
      SequenceExpression: ["expressions"],
      SpreadElement: ["argument"],
      Super: [],
      SwitchStatement: ["discriminant", "cases"],
      SwitchCase: ["test", "consequent"],
      TaggedTemplateExpression: ["tag", "quasi"],
      TemplateElement: [],
      TemplateLiteral: ["quasis", "expressions"],
      ThisExpression: [],
      ThrowStatement: ["argument"],
      TryStatement: ["block", "handler", "finalizer"],
      UnaryExpression: ["argument"],
      UpdateExpression: ["argument"],
      VariableDeclaration: ["declarations"],
      VariableDeclarator: ["id", "init"],
      WhileStatement: ["test", "body"],
      WithStatement: ["object", "body"],
      YieldExpression: ["argument"]
    }, s = {Break: l = {}, Skip: h = {}, Remove: c = {}}, d.prototype.replace = function (e) {
      this.parent[this.key] = e
    }, d.prototype.remove = function () {
      return r(this.parent) ? (this.parent.splice(this.key, 1), !0) : (this.replace(null), !1)
    }, f.prototype.path = function () {
      var e, t, i, n, s;

      function a(e, t) {
        if (r(t)) for (i = 0, n = t.length; i < n; ++i) e.push(t[i]); else e.push(t)
      }

      if (!this.__current.path) return null;
      for (s = [], e = 2, t = this.__leavelist.length; e < t; ++e) a(s, this.__leavelist[e].path);
      return a(s, this.__current.path), s
    }, f.prototype.type = function () {
      return this.current().type || this.__current.wrap
    }, f.prototype.parents = function () {
      var e, t, i;
      for (i = [], e = 1, t = this.__leavelist.length; e < t; ++e) i.push(this.__leavelist[e].node);
      return i
    }, f.prototype.current = function () {
      return this.__current.node
    }, f.prototype.__execute = function (e, t) {
      var i, n;
      return n = void 0, i = this.__current, this.__current = t, this.__state = null, e && (n = e.call(this, t.node, this.__leavelist[this.__leavelist.length - 1].node)), this.__current = i, n
    }, f.prototype.notify = function (e) {
      this.__state = e
    }, f.prototype.skip = function () {
      this.notify(h)
    }, f.prototype.break = function () {
      this.notify(l)
    }, f.prototype.remove = function () {
      this.notify(c)
    }, f.prototype.__initialize = function (e, t) {
      this.visitor = t, this.root = e, this.__worklist = [], this.__leavelist = [], this.__current = null, this.__state = null, this.__fallback = null, "iteration" === t.fallback ? this.__fallback = u : "function" == typeof t.fallback && (this.__fallback = t.fallback), this.__keys = a, t.keys && (this.__keys = function (e, t) {
        var i, n, r, s = u(t);
        for (n = 0, r = s.length; n < r; n += 1) e[i = s[n]] = t[i];
        return e
      }(o(this.__keys), t.keys))
    }, f.prototype.traverse = function (e, t) {
      var i, n, s, a, o, u, c, p, d, f, y, E;
      for (this.__initialize(e, t), E = {}, i = this.__worklist, n = this.__leavelist, i.push(new m(e, null, null, null)), n.push(new m(null, null, null, null)); i.length;) if ((s = i.pop()) !== E) {
        if (s.node) {
          if (u = this.__execute(t.enter, s), this.__state === l || u === l) return;
          if (i.push(E), n.push(s), this.__state === h || u === h) continue;
          if (o = (a = s.node).type || s.wrap, !(f = this.__keys[o])) {
            if (!this.__fallback) throw new Error("Unknown node type " + o + ".");
            f = this.__fallback(a)
          }
          for (p = f.length; (p -= 1) >= 0;) if (y = a[c = f[p]]) if (r(y)) {
            for (d = y.length; (d -= 1) >= 0;) if (y[d]) {
              if (D(o, f[p])) s = new m(y[d], [c, d], "Property", null); else {
                if (!x(y[d])) continue;
                s = new m(y[d], [c, d], null, null)
              }
              i.push(s)
            }
          } else x(y) && i.push(new m(y, c, null, null))
        }
      } else if (s = n.pop(), u = this.__execute(t.leave, s), this.__state === l || u === l) return
    }, f.prototype.replace = function (e, t) {
      var i, n, s, a, o, u, p, f, y, E, C, v, A;

      function g(e) {
        var t, n, r, s;
        if (e.ref.remove()) for (n = e.ref.key, s = e.ref.parent, t = i.length; t--;) if ((r = i[t]).ref && r.ref.parent === s) {
          if (r.ref.key < n) break;
          --r.ref.key
        }
      }

      for (this.__initialize(e, t), C = {}, i = this.__worklist, n = this.__leavelist, u = new m(e, null, null, new d(v = {root: e}, "root")), i.push(u), n.push(u); i.length;) if ((u = i.pop()) !== C) {
        if (void 0 !== (o = this.__execute(t.enter, u)) && o !== l && o !== h && o !== c && (u.ref.replace(o), u.node = o), this.__state !== c && o !== c || (g(u), u.node = null), this.__state === l || o === l) return v.root;
        if ((s = u.node) && (i.push(C), n.push(u), this.__state !== h && o !== h)) {
          if (a = s.type || u.wrap, !(y = this.__keys[a])) {
            if (!this.__fallback) throw new Error("Unknown node type " + a + ".");
            y = this.__fallback(s)
          }
          for (p = y.length; (p -= 1) >= 0;) if (E = s[A = y[p]]) if (r(E)) {
            for (f = E.length; (f -= 1) >= 0;) if (E[f]) {
              if (D(a, y[p])) u = new m(E[f], [A, f], "Property", new d(E, f)); else {
                if (!x(E[f])) continue;
                u = new m(E[f], [A, f], null, new d(E, f))
              }
              i.push(u)
            }
          } else x(E) && i.push(new m(E, A, null, new d(s, A)))
        }
      } else if (u = n.pop(), void 0 !== (o = this.__execute(t.leave, u)) && o !== l && o !== h && o !== c && u.ref.replace(o), this.__state !== c && o !== c || g(u), this.__state === l || o === l) return v.root;
      return v.root
    }, t.version = i(4).version, t.Syntax = n, t.traverse = y, t.replace = function (e, t) {
      return (new f).replace(e, t)
    }, t.attachComments = function (e, t, i) {
      var n, r, a, o, u = [];
      if (!e.range) throw new Error("attachComments needs range information");
      if (!i.length) {
        if (t.length) {
          for (a = 0, r = t.length; a < r; a += 1) (n = p(t[a])).extendedRange = [0, e.range[0]], u.push(n);
          e.leadingComments = u
        }
        return e
      }
      for (a = 0, r = t.length; a < r; a += 1) u.push(E(p(t[a]), i));
      return o = 0, y(e, {
        enter: function (e) {
          for (var t; o < u.length && !((t = u[o]).extendedRange[1] > e.range[0]);) t.extendedRange[1] === e.range[0] ? (e.leadingComments || (e.leadingComments = []), e.leadingComments.push(t), u.splice(o, 1)) : o += 1;
          return o === u.length ? s.Break : u[o].extendedRange[0] > e.range[1] ? s.Skip : void 0
        }
      }), o = 0, y(e, {
        leave: function (e) {
          for (var t; o < u.length && (t = u[o], !(e.range[1] < t.extendedRange[0]));) e.range[1] === t.extendedRange[0] ? (e.trailingComments || (e.trailingComments = []), e.trailingComments.push(t), u.splice(o, 1)) : o += 1;
          return o === u.length ? s.Break : u[o].extendedRange[0] > e.range[1] ? s.Skip : void 0
        }
      }), e
    }, t.VisitorKeys = a, t.VisitorOption = s, t.Controller = f, t.cloneEnvironment = function () {
      return e({})
    }, t
  }(t)
}, function (e) {
  e.exports = {
    name: "estraverse",
    description: "ECMAScript JS AST traversal functions",
    homepage: "https://github.com/estools/estraverse",
    main: "estraverse.js",
    version: "4.2.0",
    engines: {node: ">=0.10.0"},
    maintainers: [{name: "Yusuke Suzuki", email: "utatane.tea@gmail.com", web: "http://github.com/Constellation"}],
    repository: {type: "git", url: "http://github.com/estools/estraverse.git"},
    devDependencies: {
      "babel-preset-es2015": "^6.3.13",
      "babel-register": "^6.3.13",
      chai: "^2.1.1",
      espree: "^1.11.0",
      gulp: "^3.8.10",
      "gulp-bump": "^0.2.2",
      "gulp-filter": "^2.0.0",
      "gulp-git": "^1.0.1",
      "gulp-tag-version": "^1.2.1",
      jshint: "^2.5.6",
      mocha: "^2.1.0"
    },
    license: "BSD-2-Clause",
    scripts: {
      test: "npm run-script lint && npm run-script unit-test",
      lint: "jshint estraverse.js",
      "unit-test": "mocha --compilers js:babel-register"
    }
  }
}, function (e, t, i) {
  var n, r = function () {
    function e(e) {
      return '"' + e.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\x08/g, "\\b").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\f/g, "\\f").replace(/\r/g, "\\r").replace(/[\x00-\x07\x0B\x0E-\x1F\x80-\uFFFF]/g, escape) + '"'
    }

    var t = {
      parse: function (t, i) {
        var n = {
          start: function () {
            var e, t, i, n, s, a = "start@" + r, o = u[a];
            if (o) return r = o.nextPos, o.result;
            n = r, s = r, null !== (e = h()) && null !== (t = d()) && null !== (i = h()) ? e = [e, t, i] : (e = null, r = s);
            null !== e && (l = e[1], e = 1 === l.length ? l[0] : {type: "matches", selectors: l});
            var l;
            null === e && (r = n);
            null === e && (n = r, null !== (e = h()) && (e = void 0), null === e && (r = n));
            return u[a] = {nextPos: r, result: e}, e
          },
          _: h,
          identifierName: c,
          binaryOp: p,
          selectors: d,
          selector: m,
          sequence: f,
          atom: x,
          wildcard: D,
          identifier: y,
          attr: E,
          attrOps: C,
          attrEqOps: v,
          attrName: A,
          attrValue: g,
          string: S,
          number: F,
          path: k,
          type: w,
          regex: b,
          field: B,
          negation: T,
          matches: P,
          has: N,
          firstChild: I,
          lastChild: M,
          nthChild: X,
          nthLastChild: J,
          class: L
        };
        if (void 0 !== i) {
          if (void 0 === n[i]) throw new Error("Invalid rule name: " + e(i) + ".")
        } else i = "start";
        var r = 0, s = 0, a = 0, o = [], u = {};

        function l(e) {
          r < a || (r > a && (a = r, o = []), o.push(e))
        }

        function h() {
          var e, i, n = "_@" + r, a = u[n];
          if (a) return r = a.nextPos, a.result;
          for (e = [], 32 === t.charCodeAt(r) ? (i = " ", r++) : (i = null, 0 === s && l('" "')); null !== i;) e.push(i), 32 === t.charCodeAt(r) ? (i = " ", r++) : (i = null, 0 === s && l('" "'));
          return u[n] = {nextPos: r, result: e}, e
        }

        function c() {
          var e, i, n, a = "identifierName@" + r, o = u[a];
          if (o) return r = o.nextPos, o.result;
          if (n = r, /^[^ [\],():#!=><~+.]/.test(t.charAt(r)) ? (i = t.charAt(r), r++) : (i = null, 0 === s && l("[^ [\\],():#!=><~+.]")), null !== i) for (e = []; null !== i;) e.push(i), /^[^ [\],():#!=><~+.]/.test(t.charAt(r)) ? (i = t.charAt(r), r++) : (i = null, 0 === s && l("[^ [\\],():#!=><~+.]")); else e = null;
          return null !== e && (e = e.join("")), null === e && (r = n), u[a] = {nextPos: r, result: e}, e
        }

        function p() {
          var e, i, n, a, o, c = "binaryOp@" + r, p = u[c];
          return p ? (r = p.nextPos, p.result) : (a = r, o = r, null !== (e = h()) ? (62 === t.charCodeAt(r) ? (i = ">", r++) : (i = null, 0 === s && l('">"')), null !== i && null !== (n = h()) ? e = [e, i, n] : (e = null, r = o)) : (e = null, r = o), null !== e && (e = "child"), null === e && (r = a), null === e && (a = r, o = r, null !== (e = h()) ? (126 === t.charCodeAt(r) ? (i = "~", r++) : (i = null, 0 === s && l('"~"')), null !== i && null !== (n = h()) ? e = [e, i, n] : (e = null, r = o)) : (e = null, r = o), null !== e && (e = "sibling"), null === e && (r = a), null === e && (a = r, o = r, null !== (e = h()) ? (43 === t.charCodeAt(r) ? (i = "+", r++) : (i = null, 0 === s && l('"+"')), null !== i && null !== (n = h()) ? e = [e, i, n] : (e = null, r = o)) : (e = null, r = o), null !== e && (e = "adjacent"), null === e && (r = a), null === e && (a = r, o = r, 32 === t.charCodeAt(r) ? (e = " ", r++) : (e = null, 0 === s && l('" "')), null !== e && null !== (i = h()) ? e = [e, i] : (e = null, r = o), null !== e && (e = "descendant"), null === e && (r = a)))), u[c] = {
            nextPos: r,
            result: e
          }, e)
        }

        function d() {
          var e, i, n, a, o, c, p, d, f, x, D, y = "selectors@" + r, E = u[y];
          if (E) return r = E.nextPos, E.result;
          if (p = r, d = r, null !== (e = m())) {
            for (i = [], f = r, null !== (n = h()) ? (44 === t.charCodeAt(r) ? (a = ",", r++) : (a = null, 0 === s && l('","')), null !== a && null !== (o = h()) && null !== (c = m()) ? n = [n, a, o, c] : (n = null, r = f)) : (n = null, r = f); null !== n;) i.push(n), f = r, null !== (n = h()) ? (44 === t.charCodeAt(r) ? (a = ",", r++) : (a = null, 0 === s && l('","')), null !== a && null !== (o = h()) && null !== (c = m()) ? n = [n, a, o, c] : (n = null, r = f)) : (n = null, r = f);
            null !== i ? e = [e, i] : (e = null, r = d)
          } else e = null, r = d;
          return null !== e && (x = e[0], D = e[1], e = [x].concat(D.map(function (e) {
            return e[3]
          }))), null === e && (r = p), u[y] = {nextPos: r, result: e}, e
        }

        function m() {
          var e, t, i, n, s, a, o, l, h = "selector@" + r, c = u[h];
          if (c) return r = c.nextPos, c.result;
          if (s = r, a = r, null !== (e = f())) {
            for (t = [], o = r, null !== (i = p()) && null !== (n = f()) ? i = [i, n] : (i = null, r = o); null !== i;) t.push(i), o = r, null !== (i = p()) && null !== (n = f()) ? i = [i, n] : (i = null, r = o);
            null !== t ? e = [e, t] : (e = null, r = a)
          } else e = null, r = a;
          return null !== e && (l = e[0], e = e[1].reduce(function (e, t) {
            return {type: t[0], left: e, right: t[1]}
          }, l)), null === e && (r = s), u[h] = {nextPos: r, result: e}, e
        }

        function f() {
          var e, i, n, a, o, h, c, p, d = "sequence@" + r, m = u[d];
          if (m) return r = m.nextPos, m.result;
          if (a = r, o = r, 33 === t.charCodeAt(r) ? (e = "!", r++) : (e = null, 0 === s && l('"!"')), null !== (e = null !== e ? e : "")) {
            if (null !== (n = x())) for (i = []; null !== n;) i.push(n), n = x(); else i = null;
            null !== i ? e = [e, i] : (e = null, r = o)
          } else e = null, r = o;
          return null !== e && (h = e[0], c = e[1], p = 1 === c.length ? c[0] : {
            type: "compound",
            selectors: c
          }, h && (p.subject = !0), e = p), null === e && (r = a), u[d] = {nextPos: r, result: e}, e
        }

        function x() {
          var e, t = "atom@" + r, i = u[t];
          return i ? (r = i.nextPos, i.result) : (null === (e = D()) && null === (e = y()) && null === (e = E()) && null === (e = B()) && null === (e = T()) && null === (e = P()) && null === (e = N()) && null === (e = I()) && null === (e = M()) && null === (e = X()) && null === (e = J()) && (e = L()), u[t] = {
            nextPos: r,
            result: e
          }, e)
        }

        function D() {
          var e, i, n = "wildcard@" + r, a = u[n];
          return a ? (r = a.nextPos, a.result) : (i = r, 42 === t.charCodeAt(r) ? (e = "*", r++) : (e = null, 0 === s && l('"*"')), null !== e && (e = {
            type: "wildcard",
            value: e
          }), null === e && (r = i), u[n] = {nextPos: r, result: e}, e)
        }

        function y() {
          var e, i, n, a, o = "identifier@" + r, h = u[o];
          return h ? (r = h.nextPos, h.result) : (n = r, a = r, 35 === t.charCodeAt(r) ? (e = "#", r++) : (e = null, 0 === s && l('"#"')), null !== (e = null !== e ? e : "") && null !== (i = c()) ? e = [e, i] : (e = null, r = a), null !== e && (e = {
            type: "identifier",
            value: e[1]
          }), null === e && (r = n), u[o] = {nextPos: r, result: e}, e)
        }

        function E() {
          var e, i, n, a, o, c, p, d = "attr@" + r, m = u[d];
          return m ? (r = m.nextPos, m.result) : (c = r, p = r, 91 === t.charCodeAt(r) ? (e = "[", r++) : (e = null, 0 === s && l('"["')), null !== e && null !== (i = h()) && null !== (n = g()) && null !== (a = h()) ? (93 === t.charCodeAt(r) ? (o = "]", r++) : (o = null, 0 === s && l('"]"')), null !== o ? e = [e, i, n, a, o] : (e = null, r = p)) : (e = null, r = p), null !== e && (e = e[2]), null === e && (r = c), u[d] = {
            nextPos: r,
            result: e
          }, e)
        }

        function C() {
          var e, i, n, a, o = "attrOps@" + r, h = u[o];
          return h ? (r = h.nextPos, h.result) : (n = r, a = r, /^[><!]/.test(t.charAt(r)) ? (e = t.charAt(r), r++) : (e = null, 0 === s && l("[><!]")), null !== (e = null !== e ? e : "") ? (61 === t.charCodeAt(r) ? (i = "=", r++) : (i = null, 0 === s && l('"="')), null !== i ? e = [e, i] : (e = null, r = a)) : (e = null, r = a), null !== e && (e = e[0] + "="), null === e && (r = n), null === e && (/^[><]/.test(t.charAt(r)) ? (e = t.charAt(r), r++) : (e = null, 0 === s && l("[><]"))), u[o] = {
            nextPos: r,
            result: e
          }, e)
        }

        function v() {
          var e, i, n, a, o = "attrEqOps@" + r, h = u[o];
          return h ? (r = h.nextPos, h.result) : (n = r, a = r, 33 === t.charCodeAt(r) ? (e = "!", r++) : (e = null, 0 === s && l('"!"')), null !== (e = null !== e ? e : "") ? (61 === t.charCodeAt(r) ? (i = "=", r++) : (i = null, 0 === s && l('"="')), null !== i ? e = [e, i] : (e = null, r = a)) : (e = null, r = a), null !== e && (e = e[0] + "="), null === e && (r = n), u[o] = {
            nextPos: r,
            result: e
          }, e)
        }

        function A() {
          var e, i, n, a = "attrName@" + r, o = u[a];
          if (o) return r = o.nextPos, o.result;
          if (n = r, null === (i = c()) && (46 === t.charCodeAt(r) ? (i = ".", r++) : (i = null, 0 === s && l('"."'))), null !== i) for (e = []; null !== i;) e.push(i), null === (i = c()) && (46 === t.charCodeAt(r) ? (i = ".", r++) : (i = null, 0 === s && l('"."'))); else e = null;
          return null !== e && (e = e.join("")), null === e && (r = n), u[a] = {nextPos: r, result: e}, e
        }

        function g() {
          var e, t, i, n, s, a, o, l = "attrValue@" + r, c = u[l];
          return c ? (r = c.nextPos, c.result) : (a = r, o = r, null !== (e = A()) && null !== (t = h()) && null !== (i = v()) && null !== (n = h()) ? (null === (s = w()) && (s = b()), null !== s ? e = [e, t, i, n, s] : (e = null, r = o)) : (e = null, r = o), null !== e && (e = {
            type: "attribute",
            name: e[0],
            operator: e[2],
            value: e[4]
          }), null === e && (r = a), null === e && (a = r, o = r, null !== (e = A()) && null !== (t = h()) && null !== (i = C()) && null !== (n = h()) ? (null === (s = S()) && null === (s = F()) && (s = k()), null !== s ? e = [e, t, i, n, s] : (e = null, r = o)) : (e = null, r = o), null !== e && (e = {
            type: "attribute",
            name: e[0],
            operator: e[2],
            value: e[4]
          }), null === e && (r = a), null === e && (a = r, null !== (e = A()) && (e = {
            type: "attribute",
            name: e
          }), null === e && (r = a))), u[l] = {nextPos: r, result: e}, e)
        }

        function S() {
          var e, i, n, a, o, h, c, p, d = "string@" + r, m = u[d];
          if (m) return r = m.nextPos, m.result;
          if (o = r, h = r, 34 === t.charCodeAt(r) ? (e = '"', r++) : (e = null, 0 === s && l('"\\""')), null !== e) {
            for (i = [], /^[^\\"]/.test(t.charAt(r)) ? (n = t.charAt(r), r++) : (n = null, 0 === s && l('[^\\\\"]')), null === n && (c = r, p = r, 92 === t.charCodeAt(r) ? (n = "\\", r++) : (n = null, 0 === s && l('"\\\\"')), null !== n ? (t.length > r ? (a = t.charAt(r), r++) : (a = null, 0 === s && l("any character")), null !== a ? n = [n, a] : (n = null, r = p)) : (n = null, r = p), null !== n && (n = n[0] + n[1]), null === n && (r = c)); null !== n;) i.push(n), /^[^\\"]/.test(t.charAt(r)) ? (n = t.charAt(r), r++) : (n = null, 0 === s && l('[^\\\\"]')), null === n && (c = r, p = r, 92 === t.charCodeAt(r) ? (n = "\\", r++) : (n = null, 0 === s && l('"\\\\"')), null !== n ? (t.length > r ? (a = t.charAt(r), r++) : (a = null, 0 === s && l("any character")), null !== a ? n = [n, a] : (n = null, r = p)) : (n = null, r = p), null !== n && (n = n[0] + n[1]), null === n && (r = c));
            null !== i ? (34 === t.charCodeAt(r) ? (n = '"', r++) : (n = null, 0 === s && l('"\\""')), null !== n ? e = [e, i, n] : (e = null, r = h)) : (e = null, r = h)
          } else e = null, r = h;
          if (null !== e && (e = {type: "literal", value: O(e[1].join(""))}), null === e && (r = o), null === e) {
            if (o = r, h = r, 39 === t.charCodeAt(r) ? (e = "'", r++) : (e = null, 0 === s && l('"\'"')), null !== e) {
              for (i = [], /^[^\\']/.test(t.charAt(r)) ? (n = t.charAt(r), r++) : (n = null, 0 === s && l("[^\\\\']")), null === n && (c = r, p = r, 92 === t.charCodeAt(r) ? (n = "\\", r++) : (n = null, 0 === s && l('"\\\\"')), null !== n ? (t.length > r ? (a = t.charAt(r), r++) : (a = null, 0 === s && l("any character")), null !== a ? n = [n, a] : (n = null, r = p)) : (n = null, r = p), null !== n && (n = n[0] + n[1]), null === n && (r = c)); null !== n;) i.push(n), /^[^\\']/.test(t.charAt(r)) ? (n = t.charAt(r), r++) : (n = null, 0 === s && l("[^\\\\']")), null === n && (c = r, p = r, 92 === t.charCodeAt(r) ? (n = "\\", r++) : (n = null, 0 === s && l('"\\\\"')), null !== n ? (t.length > r ? (a = t.charAt(r), r++) : (a = null, 0 === s && l("any character")), null !== a ? n = [n, a] : (n = null, r = p)) : (n = null, r = p), null !== n && (n = n[0] + n[1]), null === n && (r = c));
              null !== i ? (39 === t.charCodeAt(r) ? (n = "'", r++) : (n = null, 0 === s && l('"\'"')), null !== n ? e = [e, i, n] : (e = null, r = h)) : (e = null, r = h)
            } else e = null, r = h;
            null !== e && (e = {type: "literal", value: O(e[1].join(""))}), null === e && (r = o)
          }
          return u[d] = {nextPos: r, result: e}, e
        }

        function F() {
          var e, i, n, a, o, h, c, p, d = "number@" + r, m = u[d];
          if (m) return r = m.nextPos, m.result;
          for (a = r, o = r, h = r, e = [], /^[0-9]/.test(t.charAt(r)) ? (i = t.charAt(r), r++) : (i = null, 0 === s && l("[0-9]")); null !== i;) e.push(i), /^[0-9]/.test(t.charAt(r)) ? (i = t.charAt(r), r++) : (i = null, 0 === s && l("[0-9]"));
          if (null !== e ? (46 === t.charCodeAt(r) ? (i = ".", r++) : (i = null, 0 === s && l('"."')), null !== i ? e = [e, i] : (e = null, r = h)) : (e = null, r = h), null !== (e = null !== e ? e : "")) {
            if (/^[0-9]/.test(t.charAt(r)) ? (n = t.charAt(r), r++) : (n = null, 0 === s && l("[0-9]")), null !== n) for (i = []; null !== n;) i.push(n), /^[0-9]/.test(t.charAt(r)) ? (n = t.charAt(r), r++) : (n = null, 0 === s && l("[0-9]")); else i = null;
            null !== i ? e = [e, i] : (e = null, r = o)
          } else e = null, r = o;
          return null !== e && (c = e[0], p = e[1], e = {
            type: "literal",
            value: parseFloat((c ? c.join("") : "") + p.join(""))
          }), null === e && (r = a), u[d] = {nextPos: r, result: e}, e
        }

        function k() {
          var e, t, i = "path@" + r, n = u[i];
          return n ? (r = n.nextPos, n.result) : (t = r, null !== (e = c()) && (e = {
            type: "literal",
            value: e
          }), null === e && (r = t), u[i] = {nextPos: r, result: e}, e)
        }

        function w() {
          var e, i, n, a, o, c, p, d = "type@" + r, m = u[d];
          if (m) return r = m.nextPos, m.result;
          if (c = r, p = r, "type(" === t.substr(r, 5) ? (e = "type(", r += 5) : (e = null, 0 === s && l('"type("')), null !== e) if (null !== (i = h())) {
            if (/^[^ )]/.test(t.charAt(r)) ? (a = t.charAt(r), r++) : (a = null, 0 === s && l("[^ )]")), null !== a) for (n = []; null !== a;) n.push(a), /^[^ )]/.test(t.charAt(r)) ? (a = t.charAt(r), r++) : (a = null, 0 === s && l("[^ )]")); else n = null;
            null !== n && null !== (a = h()) ? (41 === t.charCodeAt(r) ? (o = ")", r++) : (o = null, 0 === s && l('")"')), null !== o ? e = [e, i, n, a, o] : (e = null, r = p)) : (e = null, r = p)
          } else e = null, r = p; else e = null, r = p;
          return null !== e && (e = {type: "type", value: e[2].join("")}), null === e && (r = c), u[d] = {
            nextPos: r,
            result: e
          }, e
        }

        function b() {
          var e, i, n, a, o, h, c = "regex@" + r, p = u[c];
          if (p) return r = p.nextPos, p.result;
          if (a = r, o = r, 47 === t.charCodeAt(r) ? (e = "/", r++) : (e = null, 0 === s && l('"/"')), null !== e) {
            if (/^[^\/]/.test(t.charAt(r)) ? (n = t.charAt(r), r++) : (n = null, 0 === s && l("[^\\/]")), null !== n) for (i = []; null !== n;) i.push(n), /^[^\/]/.test(t.charAt(r)) ? (n = t.charAt(r), r++) : (n = null, 0 === s && l("[^\\/]")); else i = null;
            null !== i ? (47 === t.charCodeAt(r) ? (n = "/", r++) : (n = null, 0 === s && l('"/"')), null !== n ? e = [e, i, n] : (e = null, r = o)) : (e = null, r = o)
          } else e = null, r = o;
          return null !== e && (h = e[1], e = {
            type: "regexp",
            value: new RegExp(h.join(""))
          }), null === e && (r = a), u[c] = {nextPos: r, result: e}, e
        }

        function B() {
          var e, i, n, a, o, h, p, d, m, f = "field@" + r, x = u[f];
          if (x) return r = x.nextPos, x.result;
          if (h = r, p = r, 46 === t.charCodeAt(r) ? (e = ".", r++) : (e = null, 0 === s && l('"."')), null !== e) if (null !== (i = c())) {
            for (n = [], d = r, 46 === t.charCodeAt(r) ? (a = ".", r++) : (a = null, 0 === s && l('"."')), null !== a && null !== (o = c()) ? a = [a, o] : (a = null, r = d); null !== a;) n.push(a), d = r, 46 === t.charCodeAt(r) ? (a = ".", r++) : (a = null, 0 === s && l('"."')), null !== a && null !== (o = c()) ? a = [a, o] : (a = null, r = d);
            null !== n ? e = [e, i, n] : (e = null, r = p)
          } else e = null, r = p; else e = null, r = p;
          return null !== e && (m = e[1], e = {
            type: "field", name: e[2].reduce(function (e, t) {
              return e + t[0] + t[1]
            }, m)
          }), null === e && (r = h), u[f] = {nextPos: r, result: e}, e
        }

        function T() {
          var e, i, n, a, o, c, p, m = "negation@" + r, f = u[m];
          return f ? (r = f.nextPos, f.result) : (c = r, p = r, ":not(" === t.substr(r, 5) ? (e = ":not(", r += 5) : (e = null, 0 === s && l('":not("')), null !== e && null !== (i = h()) && null !== (n = d()) && null !== (a = h()) ? (41 === t.charCodeAt(r) ? (o = ")", r++) : (o = null, 0 === s && l('")"')), null !== o ? e = [e, i, n, a, o] : (e = null, r = p)) : (e = null, r = p), null !== e && (e = {
            type: "not",
            selectors: e[2]
          }), null === e && (r = c), u[m] = {nextPos: r, result: e}, e)
        }

        function P() {
          var e, i, n, a, o, c, p, m = "matches@" + r, f = u[m];
          return f ? (r = f.nextPos, f.result) : (c = r, p = r, ":matches(" === t.substr(r, 9) ? (e = ":matches(", r += 9) : (e = null, 0 === s && l('":matches("')), null !== e && null !== (i = h()) && null !== (n = d()) && null !== (a = h()) ? (41 === t.charCodeAt(r) ? (o = ")", r++) : (o = null, 0 === s && l('")"')), null !== o ? e = [e, i, n, a, o] : (e = null, r = p)) : (e = null, r = p), null !== e && (e = {
            type: "matches",
            selectors: e[2]
          }), null === e && (r = c), u[m] = {nextPos: r, result: e}, e)
        }

        function N() {
          var e, i, n, a, o, c, p, m = "has@" + r, f = u[m];
          return f ? (r = f.nextPos, f.result) : (c = r, p = r, ":has(" === t.substr(r, 5) ? (e = ":has(", r += 5) : (e = null, 0 === s && l('":has("')), null !== e && null !== (i = h()) && null !== (n = d()) && null !== (a = h()) ? (41 === t.charCodeAt(r) ? (o = ")", r++) : (o = null, 0 === s && l('")"')), null !== o ? e = [e, i, n, a, o] : (e = null, r = p)) : (e = null, r = p), null !== e && (e = {
            type: "has",
            selectors: e[2]
          }), null === e && (r = c), u[m] = {nextPos: r, result: e}, e)
        }

        function I() {
          var e, i, n = "firstChild@" + r, a = u[n];
          return a ? (r = a.nextPos, a.result) : (i = r, ":first-child" === t.substr(r, 12) ? (e = ":first-child", r += 12) : (e = null, 0 === s && l('":first-child"')), null !== e && (e = U(1)), null === e && (r = i), u[n] = {
            nextPos: r,
            result: e
          }, e)
        }

        function M() {
          var e, i, n = "lastChild@" + r, a = u[n];
          return a ? (r = a.nextPos, a.result) : (i = r, ":last-child" === t.substr(r, 11) ? (e = ":last-child", r += 11) : (e = null, 0 === s && l('":last-child"')), null !== e && (e = z(1)), null === e && (r = i), u[n] = {
            nextPos: r,
            result: e
          }, e)
        }

        function X() {
          var e, i, n, a, o, c, p, d, m = "nthChild@" + r, f = u[m];
          if (f) return r = f.nextPos, f.result;
          if (c = r, p = r, ":nth-child(" === t.substr(r, 11) ? (e = ":nth-child(", r += 11) : (e = null, 0 === s && l('":nth-child("')), null !== e) if (null !== (i = h())) {
            if (/^[0-9]/.test(t.charAt(r)) ? (a = t.charAt(r), r++) : (a = null, 0 === s && l("[0-9]")), null !== a) for (n = []; null !== a;) n.push(a), /^[0-9]/.test(t.charAt(r)) ? (a = t.charAt(r), r++) : (a = null, 0 === s && l("[0-9]")); else n = null;
            null !== n && null !== (a = h()) ? (41 === t.charCodeAt(r) ? (o = ")", r++) : (o = null, 0 === s && l('")"')), null !== o ? e = [e, i, n, a, o] : (e = null, r = p)) : (e = null, r = p)
          } else e = null, r = p; else e = null, r = p;
          return null !== e && (d = e[2], e = U(parseInt(d.join(""), 10))), null === e && (r = c), u[m] = {
            nextPos: r,
            result: e
          }, e
        }

        function J() {
          var e, i, n, a, o, c, p, d, m = "nthLastChild@" + r, f = u[m];
          if (f) return r = f.nextPos, f.result;
          if (c = r, p = r, ":nth-last-child(" === t.substr(r, 16) ? (e = ":nth-last-child(", r += 16) : (e = null, 0 === s && l('":nth-last-child("')), null !== e) if (null !== (i = h())) {
            if (/^[0-9]/.test(t.charAt(r)) ? (a = t.charAt(r), r++) : (a = null, 0 === s && l("[0-9]")), null !== a) for (n = []; null !== a;) n.push(a), /^[0-9]/.test(t.charAt(r)) ? (a = t.charAt(r), r++) : (a = null, 0 === s && l("[0-9]")); else n = null;
            null !== n && null !== (a = h()) ? (41 === t.charCodeAt(r) ? (o = ")", r++) : (o = null, 0 === s && l('")"')), null !== o ? e = [e, i, n, a, o] : (e = null, r = p)) : (e = null, r = p)
          } else e = null, r = p; else e = null, r = p;
          return null !== e && (d = e[2], e = z(parseInt(d.join(""), 10))), null === e && (r = c), u[m] = {
            nextPos: r,
            result: e
          }, e
        }

        function L() {
          var e, i, n, a, o = "class@" + r, h = u[o];
          return h ? (r = h.nextPos, h.result) : (n = r, a = r, 58 === t.charCodeAt(r) ? (e = ":", r++) : (e = null, 0 === s && l('":"')), null !== e ? ("statement" === t.substr(r, 9).toLowerCase() ? (i = t.substr(r, 9), r += 9) : (i = null, 0 === s && l('"statement"')), null === i && ("expression" === t.substr(r, 10).toLowerCase() ? (i = t.substr(r, 10), r += 10) : (i = null, 0 === s && l('"expression"')), null === i && ("declaration" === t.substr(r, 11).toLowerCase() ? (i = t.substr(r, 11), r += 11) : (i = null, 0 === s && l('"declaration"')), null === i && ("function" === t.substr(r, 8).toLowerCase() ? (i = t.substr(r, 8), r += 8) : (i = null, 0 === s && l('"function"')), null === i && ("pattern" === t.substr(r, 7).toLowerCase() ? (i = t.substr(r, 7), r += 7) : (i = null, 0 === s && l('"pattern"')))))), null !== i ? e = [e, i] : (e = null, r = a)) : (e = null, r = a), null !== e && (e = {
            type: "class",
            name: e[1]
          }), null === e && (r = n), u[o] = {nextPos: r, result: e}, e)
        }

        function U(e) {
          return {type: "nth-child", index: {type: "literal", value: e}}
        }

        function z(e) {
          return {type: "nth-last-child", index: {type: "literal", value: e}}
        }

        function O(e) {
          return e.replace(/\\(.)/g, function (e, t) {
            switch (t) {
              case"a":
                return "a";
              case"b":
                return "\b";
              case"f":
                return "\f";
              case"n":
                return "\n";
              case"r":
                return "\r";
              case"t":
                return "\t";
              case"v":
                return "\v";
              default:
                return t
            }
          })
        }

        var _ = n[i]();
        if (null === _ || r !== t.length) {
          var R = Math.max(r, a), j = R < t.length ? t.charAt(R) : null, K = function () {
            for (var e = 1, i = 1, n = !1, s = 0; s < Math.max(r, a); s++) {
              var o = t.charAt(s);
              "\n" === o ? (n || e++, i = 1, n = !1) : "\r" === o || "\u2028" === o || "\u2029" === o ? (e++, i = 1, n = !0) : (i++, n = !1)
            }
            return {line: e, column: i}
          }();
          throw new this.SyntaxError(function (e) {
            e.sort();
            for (var t = null, i = [], n = 0; n < e.length; n++) e[n] !== t && (i.push(e[n]), t = e[n]);
            return i
          }(o), j, R, K.line, K.column)
        }
        return _
      }, toSource: function () {
        return this._source
      }, SyntaxError: function (t, i, n, r, s) {
        this.name = "SyntaxError", this.expected = t, this.found = i, this.message = function (t, i) {
          var n;
          switch (t.length) {
            case 0:
              n = "end of input";
              break;
            case 1:
              n = t[0];
              break;
            default:
              n = t.slice(0, t.length - 1).join(", ") + " or " + t[t.length - 1]
          }
          return "Expected " + n + " but " + (i ? e(i) : "end of input") + " found."
        }(t, i), this.offset = n, this.line = r, this.column = s
      }
    };
    return t.SyntaxError.prototype = Error.prototype, t
  }();
  void 0 === (n = function () {
    return r
  }.call(t, i, t, e)) || (e.exports = n)
}]);
