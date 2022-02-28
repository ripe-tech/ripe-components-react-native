import React, { PureComponent } from "react";
import { Image, StyleSheet, View, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";

import { equal } from "yonius";

export class ImageLoading extends PureComponent {
    static get propTypes() {
        return {
            uri: PropTypes.string,
            src: PropTypes.string,
            source: PropTypes.object,
            width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
            height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
            borderRadius: PropTypes.number,
            resizeMode: PropTypes.string,
            placeholder: PropTypes.object,
            style: ViewPropTypes.style,
            imageStyle: ViewPropTypes.style,
            styles: PropTypes.any
        };
    }

    static get defaultProps() {
        return {
            uri: undefined,
            src: undefined,
            source: undefined,
            width: "100%",
            height: "100%",
            borderRadius: undefined,
            resizeMode: undefined,
            placeholder: undefined,
            style: {},
            imageStyle: {},
            styles: styles
        };
    }

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            cached: false
        };
    }

    async componentDidMount() {
        await this._verifyCache();
    }

    async componentDidUpdate(prevProps) {
        if (
            prevProps.uri !== this.props.uri ||
            prevProps.src !== this.props.uri ||
            !equal(prevProps.source, this.props.source)
        ) {
            await this._verifyCache();
            this.setState({ ended: false });
        }
    }

    async _verifyCache() {
        const cached = await Image.queryCache([this._imageSource().uri]);
        this.setState({
            cached: Object.keys(cached).length > 0
        });
    }

    _imageSource() {
        if (this.props.source) return this.props.source;
        if (this.props.src) return { uri: this.props.src };
        return { uri: this.props.uri };
    }

    _onLoadStart() {
        if (this.state.cached) return;
        this.setState({
            loading: true
        });
    }

    _onLoad() {
        this.setState({
            loading: false,
            ended: true
        });
    }

    _imageStyle() {
        return [
            {
                width: this.state.loading && this.props.placeholder ? 0 : this.props.width,
                height: this.state.loading && this.props.placeholder ? 0 : this.props.height,
                borderRadius: this.props.borderRadius,
                resizeMode: this.props.resizeMode
            },
            this.props.imageStyle
        ];
    }

    render() {
        return (
            <View style={this.props.style}>
                {this.state.loading &&
                    this.props.placeholder &&
                    React.cloneElement(React.Children.only(this.props.placeholder), {
                        style: { zIndex: 10 },
                        height: this.props.height,
                        width: this.props.width
                    })}
                <Image
                    style={this._imageStyle()}
                    source={this._imageSource()}
                    onLoadStart={() => this._onLoadStart()}
                    onLoad={() => this._onLoad()}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({});

export default ImageLoading;
