import { ExtensionContext } from "vscode";
import * as vscode from 'vscode';
import { insertMqh } from "./inserts";

const { registerCommand } = vscode.commands;

export function subscriptions(subs: ExtensionContext["subscriptions"]) {
    const { push } = subs;

    push(registerCommand("smartinclude.insertMqh", (uri) => insertMqh(uri)));
}