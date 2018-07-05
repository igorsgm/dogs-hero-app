
# SaveBarkley Hero App

### Version 1.0

#### About Ionic

> [Ionic](https://ionicframework.com/) is the open-source mobile app development framework that makes it easy to
build top quality native and progressive web apps with web technologies.
Ionic is based on [Angular](https://angular.io/) and comes with many significant performance, usability, and
feature improvements over the past versions.
See the [Building Apps with Ionic](https://adamdbradley.github.io/building-with-ionic2) slides for a quick
overview or watch Ionic's [Crash Course](https://youtu.be/O2WiI9QrS5s) video for a quick walkthrough on how to get
started using Ionic.

#### Step by step environment configuration

1. First, install [NodeJS](https://nodejs.org/). Then, install the latest Ionic command-line tools in your terminal. Follow the Android and iOS platform guides to install required tools for development.
2. Install the latest Ionic command-line tools in your terminal
```
npm install -g ionic
```
Follow the [Android](https://cordova.apache.org/docs/en/7.x/guide/platforms/android/) and [iOS](https://cordova.apache.org/docs/en/7.x/guide/platforms/ios/) platform guides to install required tools for development.

* _If you’re new to the command line, read [Ionic's Terminal tutorial](https://blog.ionicframework.com/new-to-the-command-line/)._


#### Run SaveBarkley App
Make sure you are inside savebarkley folder in your terminal by runing

```
cd savebarkley-hero-app
```

Install dependencies

```
npm install
```


Much of SaveBarkley's app can be built right in the browser with **ionic serve**. We recommend starting with this workflow.
```
ionic serve
```


When you're ready to deploy SaveBarkley App to a real device, check out Ionic's [Deploying guide](https://ionicframework.com/docs/intro/deploying/)

#### Ionic DevApp 

The Ionic DevApp is a free app that makes it easy to run your Ionic app directly on your iOS or Android device.

Skip dealing with frustrating Native SDK installation issues, just run
```
ionic serve -c
```

Then open the DevApp, connect to the same network, and the app will automatically load and run your app.

The DevApp comes with many native plugins built right in, so you don’t need to worry about installing plugins.
