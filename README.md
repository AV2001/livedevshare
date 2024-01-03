# Live Dev Share Extension for VS Code

Share your local development server in real-time with others by creating a secure tunnel, all from within VS Code.

## Features

-   Start a secure tunnel to your local server with a simple command.
-   Open the generated tunnel URL in your default browser.
-   Allow anyone to view your live development server from anywhere.

## Usage

1. Install the Live Dev Share extension from the Visual Studio Code Marketplace.
2. Activate the extension by using the shortcut `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac) to open the Command Palette.
3. Type `Start Tunnel` into the Command Palette and select the `Live Dev Share: Start Tunnel` command.
4. You'll be prompted to enter the port number that your local server is running on.
5. After you've entered the port number, a secure tunnel will be created and the URL will be shown.
6. An `Open URL` button will appear in an informational message. Click it to launch the URL in your default web browser, or manually copy the URL from the tooltip of the `Live Share Active` status bar item to share with others.

## License

This extension is released under the [MIT License](LICENSE).
