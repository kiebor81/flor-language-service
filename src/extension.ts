import * as vscode from 'vscode';
import { FlorCompletionProvider } from './florCompletionProvider';
import { FlorDocumentFormatter } from './florFormatter';
import { FlorViewProvider } from './florViewProvider';

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

  // Register the command to open the Flor view
  let disposable = vscode.commands.registerCommand('extension.openFlorView', () => {
    vscode.commands.executeCommand('workbench.view.extension.florViewContainer');
  });

  context.subscriptions.push(disposable);

  // Register the Flor view provider
  const florViewProvider = new FlorViewProvider(context.extensionUri);
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(FlorViewProvider.viewType, florViewProvider)
  );
}

export function deactivate() {}