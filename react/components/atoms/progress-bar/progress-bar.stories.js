import React, { PureComponent } from "react";
import { Text, View } from "react-native";
import PropTypes from "prop-types";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, boolean, number, select, text } from "@storybook/addon-knobs";

import { Button } from "../button";
import { ProgressBar } from "./progress-bar";

class Wrapper extends PureComponent {
    static get propTypes() {
        return {
            color: PropTypes.string,
            steps: PropTypes.number,
            currentStep: PropTypes.number,
            showLabel: PropTypes.bool,
            fillTransitionTime: PropTypes.number,
            fillTransitionMode: PropTypes.string,
            simulationAdvanceStep: PropTypes.number,
            simulationStepTime: PropTypes.number
        };
    }

    static get defaultProps() {
        return {
            color: undefined,
            steps: undefined,
            currentStep: undefined,
            showLabel: false,
            fillTransitionTime: undefined,
            fillTransitionMode: undefined,
            simulationAdvanceStep: 5,
            simulationStepTime: 500
        };
    }

    constructor(props) {
        super(props);

        this.state = {
            simulatedCurrentStep: 0
        };
    }

    onButtonPress = () => {
        this.setState(
            () => ({
                simulatedCurrentStep: 0
            }),
            () => setTimeout(this._updateProgress, 500)
        );
    };

    _updateProgress = () => {
        if (this.state.simulatedCurrentStep >= 100) return;
        const simulatedCurrentStep =
            this.state.simulatedCurrentStep + this.props.simulationAdvanceStep;
        this.setState(
            () => ({
                simulatedCurrentStep: Math.min(simulatedCurrentStep, 100)
            }),
            () => setTimeout(() => this._updateProgress(), this.props.simulationStepTime)
        );
    };

    render() {
        return (
            <View style={{ margin: 10 }}>
                <View style={{ marginBottom: 10 }}>
                    <Text style={{ marginBottom: 10 }}>Simple Progress Bar</Text>
                    <ProgressBar
                        color={this.props.color}
                        currentStep={this.props.currentStep}
                        steps={this.props.steps}
                        showLabel={this.props.showLabel}
                        fillTransitionTime={this.props.fillTransitionTime}
                        fillTransitionMode={this.props.fillTransitionMode}
                    />
                </View>
                <View>
                    <Text style={{ marginBottom: 10 }}>Simulated Progress Bar</Text>
                    <Button
                        style={{ marginBottom: 10 }}
                        text={"Start"}
                        onPress={this.onButtonPress}
                    />
                    <ProgressBar
                        color={this.props.color}
                        currentStep={this.state.simulatedCurrentStep}
                        steps={100}
                        showLabel={this.props.showLabel}
                        fillTransitionTime={this.props.fillTransitionTime}
                        fillTransitionMode={this.props.fillTransitionMode}
                    />
                </View>
            </View>
        );
    }
}

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("Progress Bar", () => {
        const steps = number("Steps", 3);
        const currentStep = number("Current Step", 1);
        const color = text("Color", "#4a6fe9");
        const showLabel = boolean("Show Label", false);
        const fillTransitionTime = number("Fill Transition Time (ms)", 500);
        const fillTransitionMode = select(
            "Fill Transition Mode",
            {
                ease: "ease",
                "ease-in": "ease-in",
                "ease-out": "ease-out",
                "ease-in-out": "ease-in-out",
                linear: "linear"
            },
            "ease"
        );
        const simulationAdvanceStep = number("Simulation Advance Step", 5);
        const simulationStepTime = number("Simulation Step Time (ms)", 500);

        return (
            <Wrapper
                color={color}
                steps={steps}
                currentStep={currentStep}
                showLabel={showLabel}
                fillTransitionTime={fillTransitionTime}
                fillTransitionMode={fillTransitionMode}
                simulationAdvanceStep={simulationAdvanceStep}
                simulationStepTime={simulationStepTime}
            />
        );
    });
