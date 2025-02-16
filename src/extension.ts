'use strict';
import * as vscode from "vscode";
import { subscriptions } from "./subscriptions";

export function activate(context: vscode.ExtensionContext) {
	subscriptions(context.subscriptions);
}

export function deactivate() { }