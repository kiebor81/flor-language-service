import * as vscode from 'vscode';

export class FlorDocumentFormatter implements vscode.DocumentFormattingEditProvider {
  provideDocumentFormattingEdits(
    document: vscode.TextDocument,
    options: vscode.FormattingOptions,
    token: vscode.CancellationToken
  ): vscode.TextEdit[] {
    try {
      const textEdits: vscode.TextEdit[] = [];
      const fullText = document.getText();
      const formattedText = this.formatFlorCode(fullText, options);
  
      const fullRange = new vscode.Range(
        document.positionAt(0),
        document.positionAt(fullText.length)
      );
  
      textEdits.push(vscode.TextEdit.replace(fullRange, formattedText));
      return textEdits;
    } catch (error) {
      console.error('Error in provideDocumentFormattingEdits:', error);
      return [];
    }
  }

  private formatFlorCode(code: string, options: vscode.FormattingOptions): string {
    console.log('Starting formatFlorCode');
    const lines = code.split('\n');
    const formattedLines = lines.map(line => line.trimEnd());
  
    const indentSize = options.insertSpaces ? options.tabSize : 1;
    const indentChar = options.insertSpaces ? ' ' : '\t';
  
    let indentLevel = 0;
    const formattedCode = formattedLines.map(line => {
      console.log(`Processing line: ${line}`);
      if (line.match(/^\s*end\b/)) {
        indentLevel = Math.max(indentLevel - 1, 0);
      }
  
      const formattedLine = indentChar.repeat(indentLevel * indentSize) + line.trim();
  
      if (line.match(/\b(do|if|else|while|for|def|case|begin)\b/)) {
        indentLevel += 1;
      }
  
      return formattedLine;
    }).join('\n');
  
    console.log('Finished formatFlorCode');
    return formattedCode;
  }
}