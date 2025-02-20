import * as vscode from 'vscode';

export class FlorCompletionProvider implements vscode.CompletionItemProvider {
  private florKeywords: string[] = [
    "sequence", "task", "if", "else", "while", "for", "def", "return",
    "_arr", "_obj", "_skip", "all?", "and", "or", "any?", "apply", "+", "-", "*", "/", "%",
    "array?", "object?", "boolean?", "number?", "string?", "null?", "list?", "dict?", "hash?",
    "nil?", "false?", "true?", "pair?", "float?", "break", "continue", "case", "collect",
    "cond", "cursor", "def", "fun", "define", "detect", "do-return", "each", "empty?", "fail",
    "error", "filter", "filter-out", "find", "flatten", "for-each", "if", "unless", "ife",
    "unlesse", "_if", "_unless", "inject", "keys", "values", "length", "size", "loop", "map",
    "match", "matchr", "match?", "pmatch", "merge", "move", "noeval", "noret", "not", "on",
    "on_cancel", "on_error", "on_receive", "push", "pushr", "rand", "range", "reduce",
    "reverse", "select", "reject", "sequence", "begin", "set", "setr", "shuffle", "sample",
    "slice", "index", "sort", "sort_by", "stall", "downcase", "lowercase", "lowcase", "upcase",
    "uppercase", "capitalize", "trim", "strip", "snakecase", "snake_case", "camelcase",
    "camelCase", "timestamp", "ltimestamp", "to-array", "to-object", "type-of", "type",
    "until", "while", "abort", "kabort", "ccollect", "c-collect", "ceach", "c-each",
    "c-for-each", "cmap", "c-map", "cancel", "kill", "concurrence", "cron", "do-trap", "every",
    "graft", "import", "on_timeout", "schedule", "signal", "sleep", "task", "trap"
  ];

  provideCompletionItems(
    document: vscode.TextDocument,
    position: vscode.Position,
    token: vscode.CancellationToken,
    context: vscode.CompletionContext
  ): vscode.CompletionItem[] {
    const completionItems: vscode.CompletionItem[] = [];

    this.florKeywords.forEach(keyword => {
      const completionItem = new vscode.CompletionItem(
        keyword,
        vscode.CompletionItemKind.Keyword
      );
      completionItems.push(completionItem);
    });

    return completionItems;
  }
}