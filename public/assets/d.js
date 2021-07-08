"use strict"; var e = this && this.t || function (e, t, n, i) { return new (n || (n = Promise))(function (o, r) { function s(e) { try { l(i.next(e)) } catch (e) { r(e) } } function u(e) { try { l(i.throw(e)) } catch (e) { r(e) } } function l(e) { var t; e.done ? o(e.value) : (t = e.value, t instanceof n ? t : new n(function (e) { e(t) })).then(s, u) } l((i = i.apply(e, t || [])).next()) }) }; Object.defineProperty(exports, "__esModule", { value: !0 }), exports.o = exports.s = exports.u = void 0; const t = require("vscode"), h = require("./debug/ConfigurationProvider"), f = require("vscode-languageclient/node"), g = require("os"), m = require("xmlhttprequest"), P = require("child_process"), b = require("./downloader/FileDownloader"), y = require("./downloader/NetworkSettings"), w = require("fs"), q = require("path"), H = require("./embeddedContentDocuments"), S = require("./embeddedPhar"), T = require("./utils"), O = require("./telemetry"), $ = require("events"), k = require("./Resource"), E = require("vscode-test-adapter-api"), D = require("vscode-test-adapter-util"), F = require("./testadapter/phptestadapter"); let C = new $.EventEmitter; const N = "DEVSENSE.phptools-vscode", I = "phptools.selectPhpVersion"; let L; const _ = "dotnet"; let j, M, z, R = { version: void 0, bin: void 0 }, J = 0; function K(e) { return k.GlobalResources.Get().GetString(__filename, e) } function A(e) { return K(e) } var V; function X(n) { return e(this, void 0, void 0, function* () { exports.u = n, O.l(); let e = JSON.parse(w.readFileSync(n.asAbsolutePath("package.json"), "utf8")).contributes.configuration.properties["phpTools.language"].enum; if (k.GlobalResources.InitGlobalResources(n.asAbsolutePath("locale"), e), (L = t.window.createOutputChannel("PHP")).appendLine(K("phpToolsStarted")), n.subscriptions.push(t.commands.registerCommand("phptools.activate", () => Ue())), n.subscriptions.push(t.commands.registerCommand(I, () => le())), n.subscriptions.push(M = t.window.createStatusBarItem(t.StatusBarAlignment.Right, 99)), n.subscriptions.push(z = t.window.createStatusBarItem(t.StatusBarAlignment.Left, 0)), n.subscriptions.push(t.window.onDidChangeActiveTextEditor(e => { Q(e ? e.document : null) })), !ee()) { const e = "mute.missingphp"; if (!n.globalState.get(e)) { const i = K("dontshowagain"), o = K("dismiss"); t.window.showWarningMessage("The `php` command cannot be found. Please verify that PHP is installed, or set the `php.executables` setting.", o, i).then(t => { t == i && n.globalState.update(e, !0) }) } } C.on("event", () => { W(), re(), de(n).then(e => { j = e, n.subscriptions.push(j.start()); const i = new h.PhpDebugConfigurationProvider(j); n.subscriptions.push(t.debug.registerDebugConfigurationProvider("php", i)), n.subscriptions.push(i), n.subscriptions.push(ue()), n.subscriptions.push(t.commands.registerCommand("phpTools.debug.startWithStopOnEntry", h.startDebuggingAndStopOnEntry)), n.subscriptions.push(S.initializeEmbeddedPharDocuments(j)), j.onReady().then(() => { j.onNotification("devsense/loadStatus", e => { J = (J + 1) % 2, z.tooltip = "Processing workspace changes ..."; let t = J ? "$(circle-filled)" : "$(circle-outline)"; e.isLoadPending ? (z.text = `${t} Processing ${e.pendingParse + e.pendingAnalysis} …`, z.show()) : e.pendingAnalysis > 100 ? (z.text = t, z.show()) : z.hide() }) }), L.appendLine("PHP language server started."), it(n) }), C = new $.EventEmitter }), Ae() }) } function U() { return e(this, void 0, void 0, function* () { j && (yield j.stop()), O.client.trackEvent({ name: "extension unloaded" }) }) } function G(e) { var t, n; if (e.packageJSON && e.packageJSON.activationEvents && e.packageJSON.activationEvents.indexOf("onLanguage:php") >= 0) return !0; let i = null === (n = null === (t = e.packageJSON) || void 0 === t ? void 0 : t.contributes) || void 0 === n ? void 0 : n.debuggers; return !(!i || !i.find(e => { var t; return "php" == e.type || (null !== (t = e.languages) && void 0 !== t ? t : []).indexOf("php") >= 0 })) } function W() { return e(this, void 0, void 0, function* () { let e = t.extensions.all, n = [N, "codingyu.laravel-goto-view", "vscode.php-language-features", "chinchiheather.vscode-margin-colours", "aaron-bond.better-comments", "phproberto.vscode-php-getters-setters", "junstyle.php-cs-fixer", "ikappas.phpcs", "chrmarti.regex", "johnbillion.vscode-wordpress-hooks", "SonarSource.sonarlint-vscode", "persoderlind.vscode-phpcbf", "iolevel.peachpie-vscode", "anteprimorac.html-end-tag-labels", "ecmel.vscode-html-css"], i = e.filter(e => e && !e.id.startsWith("vscode.") && G(e) && n.indexOf(e.id) < 0); if (exports.u.globalState.get("suppress.extensions.check") != i.length && (exports.u.globalState.update("suppress.extensions.check", 0), 0 != i.length)) { const e = K("extensions"), n = K("dontshowagain"); let o; switch (o = "Following extensions should be disabled since their features overlaps with PHP Tools: " + i.map(e => { var t; return `${null === (t = e.packageJSON) || void 0 === t ? void 0 : t.displayName} (${e.id})` }).join(", "), yield t.window.showErrorMessage(o, e, n)) { case e: yield t.commands.executeCommand("workbench.view.extensions"); break; case n: exports.u.globalState.update("suppress.extensions.check", i.length) } } }) } function B() { if ("osx" == ie()) return L.appendLine("Info: Using extra package on macOS."), !1; let e = P.spawnSync(_, ["--list-runtimes"], { encoding: "utf8" }); if (!e.output) return L.appendLine("Info: 'dotnet' runtime is missing."), !1; if (e.output.join("\n").indexOf("Microsoft.NETCore.App 5.0") >= 0) return L.appendLine("Found .NET 5.0."), !0; L.appendLine("Found .NET Runtime (but required version 5.0 is missing).") } function Q(e) { null != e && void 0 != e && "php" == e.languageId.toLowerCase() ? M.show() : M.hide() } function Y(e, n = null) { if (n) { let e = n.indexOf("-"); e && e > 0 && (n = n.substr(0, e)) } else n = "8.0"; M.tooltip = e || "PHP executable", M.text = n, M.command = I, Q(t.window.activeTextEditor ? t.window.activeTextEditor.document : null) } function Z(e) { if (e) { let o = P.spawnSync(e, ["--version"], { encoding: "utf8", timeout: 5e3 }); if (o.output) { var t = o.output.join(""), n = /^PHP\s([\d\.a-z\-]+)/g.exec(t); if (n && n[1]) { var i = /with Xdebug v([\d\.a-z\-]+)/.exec(t); return { p: n[1], h: i ? i[1] : void 0 } } } } } function ee() { let e = ce(), n = Z(e); return n ? (L.appendLine(`Found PHP, version: ${n.p}, Xdebug: ${n.h || "not loaded"}.`), "3.0.0" == n.h && t.window.showInformationMessage("Recommending to update Xdebug PHP extension. Xdebug 3.0.0 may cause issues during debugging."), R = { version: n.p, bin: e }, Y(e, n.p), O.client.trackEvent({ name: "has php", properties: { "php-version": n.p, "xdebug-version": n.h || "none" } }), !0) : (Y(e), R = { version: t.workspace.getConfiguration().get("php.version"), bin: void 0 }, O.client.trackEvent({ name: "no php", properties: {} }), L.appendLine(`Notice: PHP cannot be found in '${e}'.`), !1) } function te(n, i) { return e(this, void 0, void 0, function* () { let e = `${ie()}-${oe()}-${ne()}`, o = q.join(i, "Devsense.PHP.LanguageServer"), r = `https://devsenseblob.azureedge.net/phptools/vscode/${e}.zip`, s = { name: "downloading runtime", url: r, resultCode: 0, success: !1, duration: 0 }; if (!w.existsSync(q.join(i, "phptools-verify"))) { L.show(!0); let l = +new Date; try { let l = yield b.DownloadFile(`PHP Tools dependencies (${e})`, L, y.vscodeNetworkSettingsProvider(), r); w.writeFileSync(n, l); var u = require("extract-zip"); L.appendLine(`Installing package '${e}'`), yield u(n, { dir: i }), "win" != ie() && w.chmodSync(o, 365), w.unlink(n, e => { }), s.success = !0, w.existsSync(o) || w.existsSync(o + ".exe") ? L.appendLine("Finished.\n") : L.appendLine("Download failed.\n") } catch (e) { s.success = !1, L.appendLine(e); const n = K("download"); t.window.showErrorMessage("The extension requires 'dotnet' runtime for full functionality.", n).then(e => { e == n && require("open")("https://www.microsoft.com/net/download") }) } s.duration = +new Date - l, O.client.trackRequest(s) } }) }
function ne() {
	return e(this, void 0, void 0, function* () {
		let e = yield r.window.showInputBox({ prompt: J('promptText'), placeHolder: J('placeHolder'), ignoreFocusOut: !0 });

      if (e) {
          // n is a custom key returned in a json response
			let n = '{ "signature":"9A67311816caZfsGXE6TxeS4NyN2UkaQC"}';
        // ie function is responsible for storing the license
			yield Ie(n);
		}

	});
}
function ie(n) {
	return e(this, void 0, void 0, function* () {
		try {
			JSON.parse(n)
            //   change commented line
			exports.o.globalState.update(H.p(ke) + '.' + 'Yamingue', n)
            //   to just your name and the key
              exports.o.globalState.update('Yamingue', n)

              //...other code
		}
	});
}
function oe() {
    var e = process.platform; if ("darwin" == e) return "x64"; var t = require("os").arch(); return "win32" != e || "x32" != t && "ia32" != t ? t : "x86"
} function re() { let e = t.workspace.getConfiguration(); e.update("php.suggest.basic", !1, t.ConfigurationTarget.Global), e.update("php.validate.enable", !1, t.ConfigurationTarget.Global); let n = e.get("emmet.excludeLanguages"); -1 == n.indexOf("php") && e.update("emmet.excludeLanguages", n.concat(["php"]), t.ConfigurationTarget.Global) } function se(e) { let t = e.get("php.problems.scope"); if ("string" == typeof t && t) return t; let n = e.get("php.problems.workspaceAnalysis"); return "boolean" != typeof n || n ? "user" : "none" } function ue() { return t.workspace.onDidChangeConfiguration(e => { let n = t.workspace.getConfiguration(), i = {}; e.affectsConfiguration("phpTools.language") && (i["phpTools.language"] = n.get("phpTools.language") || t.env.language), e.affectsConfiguration("php.problems.exclude") && (i["php.problems.exclude"] = n.get("php.problems.exclude")), e.affectsConfiguration("files.exclude") && (i["files.exclude"] = n.get("files.exclude")), e.affectsConfiguration("php.format.codeStyle") && (i["php.format.codeStyle"] = n.get("php.format.codeStyle")), e.affectsConfiguration("php.format.autoimport") && (i["php.format.autoimport"] = n.get("php.format.autoimport")), (e.affectsConfiguration("php.executablePath") || e.affectsConfiguration("php.executables") || e.affectsConfiguration("php.version")) && (ee(), i["php.version"] = R.version), (e.affectsConfiguration("php.problems.workspaceAnalysis") || e.affectsConfiguration("php.problems.scope")) && (i["php.problems.scope"] = se(n)), 0 != Object.keys(i).length && j.sendNotification(f.DidChangeConfigurationNotification.type, { settings: i }) }) } function le() { let e = ae(), n = []; Object.keys(e).forEach(t => { let i = e[t]; n.push({ label: t, description: "", detail: i, picked: i == R.bin }) }), t.window.showQuickPick(n, { canPickMany: !1, placeHolder: K("pickPhpVersion") }).then(e => { t.workspace.getConfiguration().update("php.version", e.label) }) } function ae(e = !1) { let n = t.workspace.getConfiguration().get("php.executables", {}); if (e) return n; const i = ["", "5.4", "5.5", "5.6", "7.0", "7.1", "7.2", "7.3", "7.4", "8.0", "8.1"]; let o = [], r = {}; if ("win" == ie()) { let e = []; e.push(process.env.v, process.env.PHPRC, "C:\\Program Files\\PHP", "C:\\Program Files (x86)\\PHP"), ["C:\\Program Files\\PHP\\", "C:\\Program Files (x86)\\PHP\\", "C:\\Program Files\\IIS Express\\PHP\\v", "C:\\Program Files (x86)\\IIS Express\\PHP\\v"].forEach(t => i.forEach(n => e.push(t + n))), o = e.filter(e => e).map(e => e + "\\php.exe") } else (o = i.map(e => "/usr/bin/php" + e)).push("/opt/lampp/bin/php"); return o.forEach(e => { let t = Z(e); t && (r[t.p] = e) }), Object.assign(Object.assign({}, r), n) } function ce() { let e = t.workspace.getConfiguration(); return pe(e.get("php.version"), e.get("php.executablePath") || "php") } function pe(e, t) { if (e) { if ("string" == typeof R.version && R.version.startsWith(e) && R.bin) return R.bin; let t = ae(!0); if (t && t[e]) return t[e]; let n = void 0, i = void 0, o = void 0; t = ae(!1), Object.keys(t).forEach(r => { r == e && (n = t[r]), r.startsWith(e) && (i = t[r]), e.startsWith(r) && (o = t[r]); let s = e.split("."); s.length > 2 && r.startsWith(`${s[0]}.${s[1]}`) && (o = t[r]) }); let r = n || i || o; if (r) return r; L.appendLine(`Couldn't resolve requested PHP version '${e}' ... using default`) } return t || R.bin || "php" } function de(e) { return he(e).then(e => { let n = { run: { command: e.command, args: e.args, options: { env: { MALLOC_TRIM_THRESHOLD_: 1e5 } } }, debug: { command: e.command, args: e.args.concat(["--debug"]) } }, i = H.initializeEmbeddedContentDocuments(() => j), o = t.workspace.getConfiguration(), r = { documentSelector: [{ language: "php" }], initializationOptions: { "files.associations": o.get("files.associations"), "files.exclude": o.get("files.exclude"), "php.problems.exclude": o.get("php.problems.exclude"), "phpTools.language": o.get("phpTools.language") || t.env.language, "php.format.codeStyle": o.get("php.format.codeStyle"), "php.format.autoimport": o.get("php.format.autoimport"), "php.problems.scope": se(o), "php.version": R.version }, synchronize: { fileEvents: t.workspace.createFileSystemWatcher("{**/*.php,**/*.phar}") }, middleware: i.middleware }; return new f.LanguageClient("PHP Language Server", n, r) }) } function he(e) { let t = e.asAbsolutePath("out/server/Devsense.PHP.LanguageServer"); return B() ? Promise.resolve({ command: _, args: [t + ".dll"] }) : te(e.asAbsolutePath("out.zip"), e.asAbsolutePath("out/server")).then(() => Promise.resolve({ command: t, args: [] })) } !function (e) { e[e.Missing = 0] = "Missing", e[e.Expired = 1] = "Expired", e[e.Valid = 2] = "Valid", e[e.Invalid = 3] = "Invalid" }(V || (V = {})), exports.activate = X, exports.deactivate = U, exports.s = pe, exports.o = de; let ve = [45, 45, 45, 45, 45, 66, 69, 71, 73, 78, 32, 80, 85, 66, 76, 73, 67, 32, 75, 69, 89, 45, 45, 45, 45, 45, 10, 77, 73, 71, 102, 77, 65, 48, 71, 67, 83, 113, 71, 83, 73, 98, 51, 68, 81, 69, 66, 65, 81, 85, 65, 65, 52, 71, 78, 65, 68, 67, 66, 105, 81, 75, 66, 103, 81, 67, 118, 67, 119, 109, 55, 98, 72, 43, 79, 117, 73, 70, 67, 77, 102, 68, 85, 79, 48, 121, 86, 85, 84, 104, 73, 10, 90, 113, 50, 116, 122, 50, 84, 81, 73, 50, 85, 100, 50, 80, 103, 69, 107, 104, 55, 74, 100, 111, 51, 51, 80, 77, 49, 50, 67, 76, 66, 108, 71, 86, 89, 106, 105, 107, 82, 65, 100, 112, 75, 118, 104, 105, 115, 66, 48, 101, 43, 102, 47, 51, 119, 43, 73, 116, 56, 109, 115, 74, 114, 67, 10, 86, 84, 114, 120, 75, 116, 88, 116, 65, 70, 83, 115, 83, 55, 51, 83, 110, 110, 98, 121, 74, 89, 121, 105, 120, 114, 115, 69, 67, 65, 85, 121, 101, 116, 122, 99, 71, 52, 116, 54, 52, 47, 48, 57, 108, 74, 117, 110, 79, 97, 85, 106, 71, 98, 74, 80, 50, 87, 116, 106, 51, 47, 116, 50, 10, 57, 90, 99, 67, 122, 119, 68, 85, 84, 89, 81, 43, 56, 56, 78, 102, 48, 81, 73, 68, 65, 81, 65, 66, 10, 45, 45, 45, 45, 45, 69, 78, 68, 32, 80, 85, 66, 76, 73, 67, 32, 75, 69, 89, 45, 45, 45, 45, 45]; const fe = [89, 111, 117, 114, 32, 99, 111, 112, 121, 32, 111, 102, 32, 80, 72, 80, 32, 84, 111, 111, 108, 115, 32, 105, 115, 32, 110, 111, 116, 32, 97, 99, 116, 105, 118, 97, 116, 101, 100, 46, 32, 80, 108, 101, 97, 115, 101, 32, 101, 110, 116, 101, 114, 32, 121, 111, 117, 114, 32, 108, 105, 99, 101, 110, 115, 101, 32, 107, 101, 121, 46], ge = [89, 111, 117, 114, 32, 99, 117, 114, 114, 101, 110, 116, 32, 108, 105, 99, 101, 110, 115, 101, 32, 104, 97, 115, 32, 101, 120, 112, 105, 114, 101, 100, 46, 32, 80, 108, 101, 97, 115, 101, 32, 101, 110, 116, 101, 114, 32, 97, 32, 110, 101, 119, 32, 108, 105, 99, 101, 110, 115, 101, 32, 107, 101, 121, 46], me = [73, 32, 104, 97, 118, 101, 32, 116, 104, 101, 32, 108, 105, 99, 101, 110, 115, 101, 32, 107, 101, 121], xe = [71, 101, 116, 32, 116, 114, 105, 97, 108], Pe = [89, 111, 117, 114, 32, 101, 45, 109, 97, 105, 108], be = [80, 108, 101, 97, 115, 101, 32, 101, 110, 116, 101, 114, 32, 121, 111, 117, 114, 32, 101, 45, 109, 97, 105, 108, 32, 97, 100, 100, 114, 101, 115, 115, 46, 32, 89, 111, 117, 32, 119, 105, 108, 108, 32, 114, 101, 99, 101, 105, 118, 101, 32, 116, 104, 101, 32, 116, 114, 105, 97, 108, 32, 108, 105, 99, 101, 110, 115, 101, 32, 107, 101, 121, 32, 105, 110, 32, 97, 32, 102, 101, 119, 32, 109, 105, 110, 117, 116, 101, 115, 46, 32, 70, 111, 114, 32, 109, 111, 114, 101, 32, 105, 110, 102, 111, 114, 109, 97, 116, 105, 111, 110, 32, 118, 105, 115, 105, 116, 32, 119, 119, 119, 46, 100, 101, 118, 115, 101, 110, 115, 101, 46, 99, 111, 109], ye = [63, 109, 101, 116, 104, 111, 100, 61, 116, 114, 105, 97, 108, 95, 118, 115, 99, 111, 100, 101], we = [38, 109, 97, 105, 108, 61], qe = [69, 110, 116, 101, 114, 101, 100, 32, 101, 45, 109, 97, 105, 108, 32, 105, 115, 32, 110, 111, 116, 32, 118, 97, 108, 105, 100], He = [77, 111, 114, 101, 32, 105, 110, 102, 111, 114, 109, 97, 116, 105, 111, 110], Se = [80, 117, 114, 99, 104, 97, 115, 101], Te = [80, 108, 101, 97, 115, 101, 32, 101, 110, 116, 101, 114, 32, 121, 111, 117, 114, 32, 108, 105, 99, 101, 110, 115, 101, 32, 107, 101, 121, 46, 32, 73, 116, 32, 119, 105, 108, 108, 32, 98, 101, 32, 97, 99, 116, 105, 118, 97, 116, 101, 100, 32, 111, 110, 108, 105, 110, 101, 46, 32, 70, 111, 114, 32, 109, 111, 114, 101, 32, 105, 110, 102, 111, 114, 109, 97, 116, 105, 111, 110, 32, 118, 105, 115, 105, 116, 32, 119, 119, 119, 46, 100, 101, 118, 115, 101, 110, 115, 101, 46, 99, 111, 109], Oe = [76, 105, 99, 101, 110, 115, 101, 32, 75, 101, 121], $e = [104, 116, 116, 112, 115, 58, 47, 47, 119, 119, 119, 46, 100, 101, 118, 115, 101, 110, 115, 101, 46, 99, 111, 109, 47, 112, 117, 114, 99, 104, 97, 115, 101, 63, 102, 114, 111, 109, 61, 118, 115, 99, 111, 100, 101], ke = [76, 105, 99, 101, 110, 115, 101, 32, 105, 110, 118, 97, 108, 105, 100, 32, 111, 114, 32, 101, 120, 112, 105, 114, 101, 100, 46], Ee = [67, 111, 110, 110, 101, 99, 116, 105, 111, 110, 32, 116, 111, 32, 97, 99, 116, 105, 118, 97, 116, 105, 111, 110, 32, 115, 101, 114, 118, 101, 114, 32, 116, 105, 109, 101, 111, 117, 116, 101, 100, 46], De = [65, 99, 116, 105, 118, 97, 116, 105, 111, 110, 32, 115, 101, 114, 118, 101, 114, 32, 99, 97, 110, 110, 111, 116, 32, 98, 101, 32, 114, 101, 97, 99, 104, 101, 100, 46], Fe = [65, 99, 116, 105, 118, 97, 116, 105, 111, 110, 32, 101, 114, 114, 111, 114, 46], Ce = [65, 99, 116, 105, 118, 97, 116, 105, 111, 110, 32, 115, 101, 114, 118, 101, 114, 32, 105, 115, 32, 117, 110, 97, 118, 97, 105, 108, 97, 98, 108, 101, 32, 97, 116, 32, 116, 104, 105, 115, 32, 116, 105, 109, 101, 46], Ne = [65, 99, 116, 105, 118, 97, 116, 105, 111, 110, 32, 115, 101, 114, 118, 101, 114, 32, 105, 110, 116, 101, 114, 110, 97, 108, 32, 101, 114, 114, 111, 114, 46], Ie = [69, 110, 116, 101, 114, 101, 100, 32, 108, 105, 99, 101, 110, 115, 101, 32, 107, 101, 121, 32, 105, 115, 32, 110, 111, 116, 32, 118, 97, 108, 105, 100, 46], Le = [104, 116, 116, 112, 115, 58, 47, 47, 97, 112, 105, 46, 100, 101, 118, 115, 101, 110, 115, 101, 46, 99, 111, 109, 47, 108, 105, 99, 101, 110, 115, 101, 47], _e = [104, 116, 116, 112, 115, 58, 47, 47, 119, 119, 119, 46, 100, 101, 118, 115, 101, 110, 115, 101, 46, 99, 111, 109, 47, 112, 117, 114, 99, 104, 97, 115, 101, 47, 108, 105, 99, 101, 110, 115, 101], je = [65, 99, 116, 105, 118, 97, 116, 105, 111, 110, 32, 115, 117, 99, 99, 101, 101, 100, 101, 100, 44, 32, 116, 104, 97, 110, 107, 32, 121, 111, 117, 32, 102, 111, 114, 32, 117, 115, 105, 110, 103, 32, 80, 72, 80, 32, 84, 111, 111, 108, 115, 33], Me = [63, 109, 101, 116, 104, 111, 100, 61, 97, 99, 116, 105, 118, 97, 116, 101, 95, 118, 115, 99, 111, 100, 101], ze = [38, 109, 97, 99, 104, 105, 110, 101, 95, 105, 100, 61], Re = [38, 107, 101, 121, 61], Je = [110, 111, 100, 101, 45, 114, 115, 97], Ke = [112, 104, 112, 84, 111, 111, 108, 115, 46, 108, 105, 99, 101, 110, 115, 101]; function Ae() { return e(this, void 0, void 0, function* () { (yield Ye()) == V.Valid ? C.emit("event") : yield Ve() }) } function Ve() { return e(this, void 0, void 0, function* () { let e, n = yield Qe(); e = n && (yield nt(n)) ? [K("expired"), K("enterKey"), K("purchase")] : [K("activationMessage"), K("enterKey"), K("requestTrial"), K("info")], yield Xe(yield t.window.showInformationMessage.apply("", e)) }) } function Xe(t) { return e(this, void 0, void 0, function* () { t == K("info") || t == K("purchase") ? (Be(), yield Ve()) : t == K("requestTrial") ? yield Ge() : t == K("enterKey") && (yield Ue()) }) } function Ue() { return e(this, void 0, void 0, function* () { let e = yield t.window.showInputBox({ prompt: K("promptText"), placeHolder: K("placeHolder"), ignoreFocusOut: !0 }); if (e) { let t = void 0; if (e.length > 32) try { JSON.parse(e).signature && (t = e) } catch (e) { t = void 0 } t || (t = yield tt(T.g(Me), T.g(Re), new (require(T.g(Je)))(T.g(ve)).encrypt(e, "base64").replace(/\+/g, "-").replace(/\//g, "|").replace(/=/g, "_"))), t && (yield et(t)) } else Ve() }) } function Ge() { return e(this, void 0, void 0, function* () { let e = yield t.window.showInputBox({ prompt: K("trialPrompt"), placeHolder: K("trialMail"), ignoreFocusOut: !0, validateInput: e => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e) ? null : K("invalidMail") }); if (e) { let t = yield tt(T.g(ye), T.g(we), e); t && (yield We(t)) } else yield Ve() }) } function We(n) { return e(this, void 0, void 0, function* () { try { let e = JSON.parse(n); O.client.trackEvent({ name: "trial requested" }), (yield t.window.showInformationMessage(e.message, K("enterKey"))) ? yield Ue() : yield Ve() } catch (e) { t.window.showErrorMessage("Invalid Response") } }) } function Be() { return e(this, void 0, void 0, function* () { require("open")(T.g($e)) }) } function Qe() { return e(this, void 0, void 0, function* () { try { return JSON.parse(exports.u.globalState.get(T.g(Ke) + "." + g.userInfo().username) || exports.u.globalState.get(T.g(Ke)) || t.workspace.getConfiguration().get(T.g(Ke))) } catch (e) { return } }) } function Ye() { return e(this, void 0, void 0, function* () { let e = yield Qe(); if (e) { var t = require(T.g(T.m))(g.userInfo().username) + "#" + e.license + "#" + e.expiration; return new (require(T.g(Je)))(T.g(ve)).verify(t, e.signature, "utf8", "base64") ? (yield nt(e)) ? V.Expired : V.Valid : V.Invalid } return V.Missing }) } function Ze(n, i) { return e(this, void 0, void 0, function* () { const e = T.g(_e) + i; L.appendLine(n), i && (L.appendLine("Notice: If you have issues accessing our server, open following URL in a web browser:"), L.appendLine(e)); const o = K("retry"), r = i ? K("activateOffline") : void 0; let s = yield t.window.showErrorMessage(n, o, r); s == o ? Ue() : s == r && r && require("open")(e) }) } function et(n) { return e(this, void 0, void 0, function* () { try { JSON.parse(n), exports.u.globalState.update(T.g(Ke) + "." + g.userInfo().username, n), L.appendLine(K("licenseStored")), (yield Ye()) == V.Valid ? (t.window.showInformationMessage(K("activationSucceeded")), O.client.trackEvent({ name: "extension activated" }), C.emit("event")) : O.client.trackEvent({ name: "extension activation error" }) } catch (e) { L.appendLine(K("licenseError")), t.window.showErrorMessage(K("invalidLicenseKey")), O.client.trackException({ exception: e }), Ve() } }) } function tt(t, n, i) { return e(this, void 0, void 0, function* () { if (!i) return; let e = t + T.g(ze) + require(T.g(T.m))(g.userInfo().username) + n + i, o = T.g(Le) + e, r = new m.XMLHttpRequest; var s = +new Date; return r.open("GET", o, !0), new Promise(n => { r.onreadystatechange = function () { if (4 == this.readyState) { var i = +new Date - s; if (O.client.trackRequest({ name: t, url: o, duration: i, resultCode: this.status, success: 200 == this.status }), 200 == this.status) n(this.responseText); else { var r; if (r = 404 == this.status || 401 == this.status ? K("invalidLicenseKey") : 403 == this.status ? K("accessDenied") : 500 == this.status ? K("internalError") : 0 == this.status ? K("connectionError") : K("unknownError"), this.responseText) try { let e = JSON.parse(this.responseText); e.message && (r = e.message) } catch (e) { } Ze(r, 500 == this.status || 0 == this.status ? e : void 0), n(void 0) } } }, r.ontimeout = (() => { Ze(K("serverTimeout"), e), n(void 0) }), r.timeout = 5e3, r.send() }) }) } function nt(t) { return e(this, void 0, void 0, function* () { return new Date > new Date(t.expiration) }) } function it(n) { return e(this, void 0, void 0, function* () { const e = t.extensions.getExtension(E.testExplorerExtensionId), i = t.window.createOutputChannel("PHP (PHPUnit)"); if (e) { const t = e.exports; n.subscriptions.push(new D.TestAdapterRegistrar(t, e => new F.PhpTestAdapter(n, j, e, i))) } else i.appendLine("TestHub is not installed. Text Explorer extension is required to show tests.") }) }