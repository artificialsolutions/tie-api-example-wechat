# tie-api-example-WeChat
This node.js example connector allows you to make your Teneo bot available on WeChat.  The connector acts as middleware that establishes a conversation between WeChat and Teneo. This guide will take you through the steps of setting up this WeChat connector.

## Prerequisites
### A Browser with a Translation Extension
WeChat's website is in mandarin. The instructions below should be able to get you going even if you don't understand Mandarin. If desired however, you may wish to use an extension to translate their website.

### Https
Making the connector available via https is preferred. We recommend using [ngrok](https://ngrok.com) for this.

### WeChat App
WeChat app should already be running on your device. If not, download it from an App Store and Sign up for a new account.

### Teneo Engine
Your bot needs to be published and you need to know the engine URL.

## Setup instructions
### Connector Setup
1. Download or clone the connector source code:
    ```
    git clone https://github.com/artificialsolutions/tie-api-example-wechat.git
    ```
2. Install dependencies by running the following command in the folder where you stored the source:
    ```
    npm install
    ``` 

### WebChat Dashboard Setup
1. Login to the WebChat Dashboard by clicking the green login button on this page:
[https://mp.weixin.qq.com/debug/cgi-bin/sandbox?t=sandbox/login](https://mp.weixin.qq.com/debug/cgi-bin/sandbox?t=sandbox/login)
2. A QR code will appear. In the Wechat app, go to the Discover tab and choose 'Scan'. Scan the QR code with the Wechat app, and a sandbox configuration dashboard will be displayed.
3. Choose yor own value to use in the `Token` field and copy or remember it, you will need it later.
4. Next copy the `appID` that is shown in the first row of the first table at the top of the page.

### Back to Connector Setup
1. Create a file called `.env` in the root folder of the project. Give it the following content:
    ```
    APP_ID=<your app id here>
    TOKEN=<your Token here>
    TENEO_ENGINE_URL=<your teneo engine url here>
    ```
    Replace the placeholders with the values you copied earlier.
2. Start the connector with the following command (replacing the environment variable with the appropriate value):
    ```
    node server.js
    ```

### Make the connector available via https
Use [ngrok](https://ngrok.com) the connector available via https:

1. Make sure your connector is available via https. When running locally you can for example use [ngrok](https://ngrok.com) for this. Run the connector on port 3000 by default.
    ```
    ngrok http 3000
    ```
2. Running the command above will display a public https URL, copy it, we will use it as a `URL` value for the following steps.

### Back to WebChat Dashboard Setup
1. Once the connector is available via https, copy the `URL` from the previous step into the URL of Webchat's dashboard online. Also, add a `/wechat` suffix to the URL field, so that it looks something like this:
    ```
    http://1234abcd.ngrok.io/wechat
    ```
2. Tap the green Submit button to save all settings.

### Start a chat 
1. Open WeChat, and tap "Scan" from the 'Discover' tab menu.
2. Scan the QR code that appears halfway down the Webchat Dashboard.
3. A new chat will appear. You are now ready to chat with your Teneo chatbot.
