import * as vscode from "vscode";
import * as path from "path";
import { inIncludePath, toLinuxSlash } from "./utils/path-utils";

export function insertMqh(uri: vscode.Uri) {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        return;
    }

    const { document, selection } = editor;
    const { dir: currentDir, ext: fileExt } = path.parse(document.uri.fsPath);

    const workspaceRoot = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath || "";

    const projectIncludeDir = path.join(workspaceRoot, "Include");

    if (![".mq4", ".mq5", ".mqh"].includes(fileExt)) {
        return;
    }
    const targetPath = uri.fsPath;
    const includePath = path.join(workspaceRoot, "Include");

    const relativePath = path.relative(currentDir, targetPath);
    const inInclude = inIncludePath(projectIncludeDir, currentDir, targetPath);

    const adjustedPath = toLinuxSlash(targetPath.includes(currentDir)
        ? relativePath
        :
        (inInclude
            ? path.relative(includePath, targetPath)
            : relativePath));

    const includeStatement = inInclude
        ? `#include <${adjustedPath}>`
        : `#include "${adjustedPath}"`;

    const line = selection.start.line;
    const column = document.lineAt(line).text.length;
    const position = new vscode.Position(line, column);

    editor.edit(editBuilder => {
        editBuilder.insert(position, (column > 0 ? "\n" : "") + includeStatement);
    });
}
