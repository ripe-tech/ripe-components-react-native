import React, { PureComponent } from "react";
import { PanResponder } from "react-native";
import PropTypes from "prop-types";

import { ContainerOpenable } from "../container-openable";

export class ContainerDraggable extends PureComponent {
    static get propTypes() {
        return {
            pressThreshold: PropTypes.number,
            snapCloseThreshold: PropTypes.number,
            onVisible: PropTypes.func
        };
    }

    static get defaultProps() {
        return {
            pressThreshold: 2.5,
            snapCloseThreshold: 0.4,
            onVisible: visible => {}
        };
    }

    constructor(props) {
        super(props);

        this.initialContentHeight = 0;
        this.dragging = false;

        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (event, gestureState) => true,
            onPanResponderGrant: this.onPanResponderGrant,
            onPanResponderMove: this.onPanResponderMove,
            onPanResponderRelease: this.onPanResponderRelease
        });
    }

    onPanResponderGrant = (event, gestureState) => {
        this.opening = !this.innerE.isVisible();
    };

    onPanResponderMove = (event, gestureState) => {
        if (Math.abs(gestureState.dy) <= this.props.pressThreshold) return;

        this.dragging = true;

        const movePercentage = gestureState.dy / this.innerE.contentHeight();
        this.contentHeightPercentage = this.opening ? -1 * movePercentage : 1 - movePercentage;
        this.contentHeightPercentage = Math.min(1, Math.max(this.contentHeightPercentage, 0));

        this.innerE.setOverlayOpacity(0.5 * this.contentHeightPercentage);
        this.innerE.setContentHeight(this.contentHeightPercentage);
    };

    onPanResponderRelease = (event, gestureState) => {
        if (!this.dragging) {
            this.innerE.onHeaderPress();
            return;
        }

        this.dragging = false;

        if (this.contentHeightPercentage > this.props.snapCloseThreshold) {
            this.innerE.open();
        } else {
            this.innerE.close();
        }
    };

    render() {
        return (
            <ContainerOpenable
                ref={ref => (this.innerE = ref)}
                {...this.props}
                headerPressable={false}
                headerProps={this.panResponder.panHandlers}
            />
        );
    }
}
