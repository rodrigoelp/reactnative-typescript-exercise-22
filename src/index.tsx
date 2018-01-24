import * as React from "react";
import { AppRegistry, View, Text, Animated } from "react-native";
import LottieView = require("lottie-react-native");

interface AppState {
    animationProgress: Animated.Value;
}

class App extends React.Component<{}, AppState> {
    constructor(props: any) {
        super(props);

        this.state = {
            animationProgress: new Animated.Value(0)
        }
    }

    componentDidMount() {
        Animated.timing(this.state.animationProgress, { toValue: 1, duration: 3000 })
            .start();
    }

    public render() {
        const source = require("./animations/coding_ape.json");
        return (
            <View style={{ flex: 1}}>
                <LottieView source={source} progress={this.state.animationProgress} />
            </View>
        );
    }
}

AppRegistry.registerComponent("lottieApp", () => App);
