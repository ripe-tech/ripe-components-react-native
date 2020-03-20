import React, { PureComponent } from "react";
import { PanResponder } from "react-native";
import PropTypes from "prop-types";

export class ContainerDraggable extends PureComponent {
    static get propTypes() {
        return {
            childRef: PropTypes.func,
            pressThreshold: PropTypes.number,
            snapCloseThreshold: PropTypes.number,
            onVisible: PropTypes.func
        };
    }

    static get defaultProps() {
        return {
            childRef: ref => {},
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
        this.opening = !this.child.isVisible();
    };

    onPanResponderMove = (event, gestureState) => {
        if (Math.abs(gestureState.dy) <= this.props.pressThreshold) return;

        this.dragging = true;

        const movePercentage = gestureState.dy / this.child.contentHeight();
        this.contentHeightPercentage = this.opening ? -1 * movePercentage : 1 - movePercentage;
        this.contentHeightPercentage = Math.min(1, Math.max(this.contentHeightPercentage, 0));

        this.child.setOverlayOpacity(0.5 * this.contentHeightPercentage);
        this.child.setContentHeight(this.contentHeightPercentage);
    };

    onPanResponderRelease = (event, gestureState) => {
        if (!this.dragging) {
            this.child.onHeaderPress();
            return;
        }

        this.dragging = false;

        if (this.contentHeightPercentage > this.props.snapCloseThreshold) {
            this.child.open();
        } else {
            this.child.close();
        }
    };

    render() {
        return React.cloneElement(React.Children.only(this.props.children), {
            ref: ref => {
                this.child = ref;
                this.props.childRef(ref);
            },
            headerPressable: false,
            headerProps: this.panResponder.panHandlers
        });
    }
}
