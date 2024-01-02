const vscode = require('vscode');
const ngrok = require('ngrok');

function activate(context) {
    // Create and display a status bar item for starting the ngrok tunnel
    let statusBarNgrok = vscode.window.createStatusBarItem(
        vscode.StatusBarAlignment.Right,
        100
    );
    statusBarNgrok.text = `$(globe) Start Live Share`;
    statusBarNgrok.tooltip = 'Click to start Live Share session';
    statusBarNgrok.command = 'livedevshare.startNgrokTunnel'; // Command to execute when the status bar item is clicked
    statusBarNgrok.show();

    // Register a command to start the ngrok tunnel
    let startNgrokCommand = vscode.commands.registerCommand(
        'livedevshare.startNgrokTunnel',
        async () => {
            const port = await vscode.window.showInputBox({
                placeHolder: 'Enter the port number of your local server',
            });

            if (!port) {
                vscode.window.showErrorMessage(
                    'You must provide a port number to start the ngrok tunnel.'
                );
                return;
            }

            try {
                const url = await ngrok.connect({ addr: port });
                statusBarNgrok.tooltip = `Live Share running: ${url}`;
                statusBarNgrok.text = `$(globe) Live Share Active`;

                const openUrlCommandId = 'livedevshare.openNgrokUrl';

                // Update the command of the status bar item to open the ngrok URL
                statusBarNgrok.command = openUrlCommandId;

                // Register a command to open the ngrok URL, or update the existing command
                context.subscriptions.push(
                    vscode.commands.registerCommand(openUrlCommandId, () => {
                        vscode.env.openExternal(vscode.Uri.parse(url));
                    })
                );

                vscode.window
                    .showInformationMessage(
                        `ngrok tunnel started! Access your server at: ${url}`,
                        'Open URL'
                    )
                    .then((selection) => {
                        if (selection === 'Open URL') {
                            vscode.env.openExternal(vscode.Uri.parse(url));
                        }
                    });
            } catch (error) {
                vscode.window.showErrorMessage(
                    `Failed to start ngrok tunnel: ${error.message}`
                );
            }
        }
    );

    // Register the commands and status bar item with the extension context
    context.subscriptions.push(startNgrokCommand, statusBarNgrok);
}

function deactivate() {
    ngrok.disconnect();
    ngrok.kill();
}

module.exports = {
    activate,
    deactivate,
};
