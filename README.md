# React Native + Typescript + Lottie = Fantastic Animations!

Building animations is hard, especially when you get to compare it to something done by a proffessional. So, I wonder... is there a better way of introducing animations in my code without the need to hand writting all of it?

The short answer is yes and that is lottie.

![Lottie](./static/lottie.gif)

## About Lottie

Built by Airbnb, [lottie](http://airbnb.io/lottie/react-native) allows you to have files with rich vector graphics animations that can be loaded by your application and control it the way you want it.

What is even better is, you will do the animations in Adobe After Effects, export it with a plugin (generating a json file) to just drop it in your app! Your designers will love you as you will not need to spend hours trying to get the animation exactly the way they wanted and your app is going to look super interactive.

## What's the catch?

You are effectively introducing a contained animation, if you require to interact with the user, react to gestures you might need to build something more complex. But I just loved what I could achieve so easily.

## What did I do?

A pretty simple app, all I wanted to do is to get two (or more) animations to play, check the performance of each of them and how easy is to introduce this.

![app](./static/appAnimation.gif)

## Issues encountered

Not many...

### The first issue

The first issue I ran into is specifically stated in the documentation right [here](http://airbnb.io/lottie/react-native/react-native.html#ios)... I just did pay attention to it.

In the past, I've typed `react-native link` and wait for the script to browse through the code and link what is required... If you do this with lottie it does not quite work and you end up with a compilation error with xcode telling you "I can't find lottie/lottie.h!!!"

Checking the doco again I noticed how they specify the two libraries:

```sh
react-native link lottie-ios
react-native link lottie-react-native
```

I facepalmed myself, typed the missing link and got everything to compile as expected.

### The second issue

Reading lottie's repo I found their `index.d.ts` file and I was so happy, this amazing library does not require me to scratch my brains, to understand the javascript file and create my type definition...

I... was... wrong.

Writing the code below results in an `invariant violation` when the generated code tries to execute **after** typescript has compiled your code. Unfortunately, this is one of those areas in which no type definition is better than the wrong type definition.

In this particular case, the type definition provides the required information to typescript to think is dealing with the correct api and compiles it without problems. Now... the compilation generates a tiny difference in the code... let's see if you can spot it.

```javascript
// this code works
    render() {
        return (React.createElement(react_native_1.View, { style: { flex: 1, backgroundColor: "black" } },
            React.createElement(lottie_react_native_1, { source: require("./animation.json"), progress: this.state.animatedProgress })));
    }
```

```javascript
// this code does not work.
    render() {
        return (React.createElement(react_native_1.View, { style: { flex: 1, backgroundColor: "black" } },
            React.createElement(lottie_react_native_1.default, { source: require("./animation.json"), progress: this.state.animatedProgress })));
    }
```

The way lottie has been written, requires you to import the library and use that as your view... The type definition tells the compiler "Hey! I am a namespace of sort defaulting to a type... if you want to use me you better get the default!" causing the nasty runtime error.

So... to fix it I rolled my own typescript definition (which is linked here) and pulled request the code fixing the issue, trying to get Airbnb to include it (hopefully soon).

## Disclaimer

I have **not** testing this on Android... If you do and it does not work, please leave an issue so I can look at it 😅