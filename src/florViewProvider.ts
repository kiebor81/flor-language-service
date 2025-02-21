import * as vscode from 'vscode';

export class FlorViewProvider implements vscode.WebviewViewProvider {
  public static readonly viewType = 'florView';

  constructor(private readonly extensionUri: vscode.Uri) {}

  public resolveWebviewView(
    webviewView: vscode.WebviewView,
    context: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken
  ) {
    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this.extensionUri]
    };

    webviewView.webview.html = this.getHtmlForWebview(webviewView.webview);
  }

  private getHtmlForWebview(webview: vscode.Webview): string {
    const nonce = getNonce();

    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Flor View</title>
        <style>
          html, body {
            height: 100%;
            margin: 0;
            overflow: hidden;
          }
          #rete {
            width: 100%;
            height: 100%;
          }
        </style>
      </head>
      <body>
        <div id="rete"></div>
        <script nonce="${nonce}" src="https://unpkg.com/rete@1.4.4/build/rete.min.js"></script>
        <script nonce="${nonce}" src="https://unpkg.com/rete-vue-render-plugin@0.2.0/build/rete-vue-render-plugin.min.js"></script>
        <script nonce="${nonce}" src="https://unpkg.com/rete-connection-plugin@0.9.0/build/rete-connection-plugin.min.js"></script>
        <script nonce="${nonce}" src="https://unpkg.com/rete-area-plugin@0.2.0/build/rete-area-plugin.min.js"></script>
        <script nonce="${nonce}">
          const container = document.querySelector('#rete');
          const editor = new Rete.NodeEditor('demo@0.1.0', container);

          editor.use(ConnectionPlugin.default);
          editor.use(VueRenderPlugin.default);
          editor.use(AreaPlugin.default);

          const numSocket = new Rete.Socket('Number value');

          class NumComponent extends Rete.Component {
            constructor() {
              super('Number');
            }

            builder(node) {
              const out1 = new Rete.Output('num', 'Number', numSocket);

              node.addOutput(out1);
            }

            worker(node, inputs, outputs) {
              outputs['num'] = node.data.num;
            }
          }

          editor.register(new NumComponent());

          editor.on('process nodecreated noderemoved connectioncreated connectionremoved', async () => {
            await editor.engine.abort();
            await editor.engine.process(editor.toJSON());
          });

          editor.fromJSON({
            id: 'demo@0.1.0',
            nodes: {}
          });

          editor.view.resize();
          AreaPlugin.zoomAt(editor);
          editor.trigger('process');
        </script>
      </body>
      </html>
    `;
  }
}

function getNonce() {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}