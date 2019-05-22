# tie-api-example-WeChat
This node.js example connector allows you to make your Teneo bot available on WeChat. 
The connector acts as middleware that establishes a conversation between WeChat and Teneo.
This guide will take you through the steps of setting up this WeChat connector.


## Prerequisites
### A Browser with a Translation Extension
WeChat's website is in mandarin. You may need an extension to translate their website.

### Https
Making the connector available via https is preferred. Ngrok is recommended for this.

### WeChat App
WeChat app should already be running on your device. Otherwise, download it from an App Store and Sign up for a new account.

### Teneo Engine
Your bot needs to be published and you need to know the engine URL.


## Setup instructions

### Connector Setup (Part 1)
1. Download or clone the connector source code:
    ```
    git clone https://github.com/artificialsolutions/tie-api-example-wechat.git
    ```
2. Install dependencies by running the following command in the folder where you stored the source:
    ```
    npm install
    ``` 


### WebChat Dashboard setup - Part 1
1. Login to the WebChat Dashboard by tapping the green login button here:
https://mp.weixin.qq.com/debug/cgi-bin/sandbox?t=sandbox/login

2. A QR code will appear. Scan it with the Wechat app, and a sandbox configuration dashboard will be displayed.

3. Choose a value for ```Token```. Now copy the Token's value and the ```appID```



### Connector Setup - Part 2
1. Open a file called ```.env``` that is located in the root folder of this sample project. Now copy the ```AppID``` and ```Token``` from the previous step

3. Start the connector with the following command (replacing the environment variable with the appropriate value):
    ```
    TENEO_ENGINE_URL=<your_engine_url> node server.js
    ```

### Make the connector available via https
Use [ngrok](https://ngrok.com) the connector available via https:

1. Make sure your connector is available via https. When running locally you can for example use [ngrok](https://ngrok.com) for this. Run the connector on port 3000 by default.
    ```
    ngrok http 3000
    ```
2. Running the command above will display a public https URL, copy it, we will use it as a `URL` value for the following steps.

### WebChat Dashboard setup - Part 2
1. Once the connector is available via https, copy the ``URL``` from the previous step into the URL of Webchat's dashboard online. 
Also, add a ````/wechat``` suffix to the URL field, so that it looks something like:
```Http://1234abcd.ngrok.io/wechat```

2. Tap the green Submit button to save all settings.

### Start a chat 
1. Open WeChat, and tap "Scan" from the navigation menu.
2. Scan the QR code that appears halfway down the Webchat Dashboard.
3. A new chat will appear you are now ready to chat with the Teneo solution.
