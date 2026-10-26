import * as vscode from "vscode";

// Each provider contributes one hosted server. VS Code handles the Just Publish
// sign-in itself (OAuth with dynamic client registration on the server's root).
const SERVERS = [
  { id: "just-domain", label: "Just Domain.", url: "https://mcp.justdomain.ai/" },
  { id: "just-publish", label: "Just Publish.", url: "https://mcp.justpublish.ai/" },
];

export function activate(context: vscode.ExtensionContext): void {
  const version = String(context.extension.packageJSON.version);
  for (const server of SERVERS) {
    const definition = new vscode.McpHttpServerDefinition(
      server.label,
      vscode.Uri.parse(server.url),
      {},
      version,
    );
    context.subscriptions.push(
      vscode.lm.registerMcpServerDefinitionProvider(server.id, {
        provideMcpServerDefinitions: () => [definition],
        resolveMcpServerDefinition: (resolved) => resolved,
      }),
    );
  }
}

export function deactivate(): void {}
