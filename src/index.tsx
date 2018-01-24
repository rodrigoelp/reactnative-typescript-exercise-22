import * as React from "react";
import { AppRegistry, View, Text, Animated, Button, Switch } from "react-native";
import LottieView = require("lottie-react-native");

const animationOptions = {
    codingApe: require("./animations/coding_ape.json"),
    reactLogo: require("./animations/reactlogo.json")
};

interface AppState {
    animationProgress: Animated.Value;
    playAnimation: boolean;
    animation?: Animated.CompositeAnimation;

    animationSource: any;
    chooseApeOverLogo: boolean;
}

class App extends React.Component<{}, AppState> {
    constructor(props: any) {
        super(props);

        this.state = {
            animationProgress: new Animated.Value(0),
            playAnimation: false,
            chooseApeOverLogo: false,
            animationSource: animationOptions.reactLogo
        }

        this.toggleAnimation = this.toggleAnimation.bind(this);
        this.toggleAnimationSource = this.toggleAnimationSource.bind(this);
    }

    public render() {
        return (
            <View style={{ flex: 1, backgroundColor: "black" }}>
                <LottieView source={this.state.animationSource} progress={this.state.animationProgress} />
                <View style={{ flexDirection: "row", marginTop: 60, marginHorizontal: 30 }}>
                    <Switch value={this.state.playAnimation} onValueChange={this.toggleAnimation} />
                    <Text style={{ color: "white", alignSelf: "center", marginLeft: 16 }}>Toogle the animation</Text>
                </View>
                <View style={{ flexDirection: "row", marginTop: 16, marginHorizontal: 30 }}>
                    <Text style={{ color: "white", alignSelf: "center", marginRight: 16 }}>React Logo</Text>
                    <Switch value={this.state.chooseApeOverLogo} onValueChange={this.toggleAnimationSource} />
                    <Text style={{ color: "white", alignSelf: "center", marginLeft: 16 }}>Coding Ape</Text>
                </View>
            </View>
        );
    }

    toggleAnimation(play: boolean) {
        if (play) {
            const animation = Animated.loop(
                Animated.timing(this.state.animationProgress, { toValue: 1, duration: 3000 })
            );
            this.setState(
                { ...this.state, animation: animation, playAnimation: play },
                () => animation.start()
            );
        } else {
            const animation = this.state.animation;
            if (animation !== undefined) {
                this.setState(
                    { ...this.state, animation: undefined, playAnimation: play },
                    () => animation.stop()
                );
            }
        }
    }

    toggleAnimationSource(chooseApe: boolean) {
        this.setState({ ...this.state, chooseApeOverLogo: chooseApe, animationSource: chooseApe ? animationOptions.codingApe : animationOptions.reactLogo });
    }
}

AppRegistry.registerComponent("lottieApp", () => App);
