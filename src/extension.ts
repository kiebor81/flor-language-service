import * as vscode from 'vscode';
import { FlorCompletionProvider } from './florCompletionProvider';
import { FlorDocumentFormatter } from './florFormatter';

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "flor-language" is now active!');

  const florCompletionProvider = vscode.languages.registerCompletionItemProvider(
    { language: 'flor', scheme: 'file' },
    new FlorCompletionProvider(),
    '.' // Trigger completion on dot (you can add more triggers if needed)
  );

  const florDocumentFormatter = vscode.languages.registerDocumentFormattingEditProvider(
    { language: 'flor', scheme: 'file' },
    new FlorDocumentFormatter()
  );

  context.subscriptions.push(florCompletionProvider);
  context.subscriptions.push(florDocumentFormatter);
}

export function deactivate() {}