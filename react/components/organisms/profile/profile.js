import React, { Component } from "react";
import { ScrollView, Share, StyleSheet, View } from "react-native";
import PropTypes from "prop-types";

import { baseStyles } from "../../../util";

import { Avatar, Text, Touchable } from "../../atoms";
import { KeyValues } from "../../molecules";
import { ButtonGroup } from "../button-group";

export class Profile extends Component {
    static get propTypes() {
        return {
            account: PropTypes.object.isRequired,
            editButton: PropTypes.bool,
            onEditPress: PropTypes.func,
            onAvatarPress: PropTypes.func,
            onLogoutTouch: PropTypes.func
        };
    }

    static get defaultProps() {
        return {
            editButton: false,
            onAvatarPress: () => {}
        };
    }

    constructor(props) {
        super(props);

        this.state = {
            account: null,
            roles: null
        };
    }

    scrollTop = () => {
        this.scrollRef?.scrollTo({ animated: true, x: 0 });
    };

    _avatarUrl = () => {
        return `${this.props.account?.avatar_url}`;
    };

    _details = () => {
        return [
            {
                key: "E-mail",
                value: this.props.account.email
            },
            {
                key: "Phone",
                value: this.props.account.meta?.phone_number
            },
            {
                key: "Company",
                value: this.props.account.meta?.company
            },
            {
                key: "Company URL",
                value: this.props.account.meta?.company_url
            },
            {
                key: "Position",
                value: this.props.account.meta?.position
            },
            {
                key: "Birth Date",
                value: this.props.account.meta?.birth_date
            },
            {
                key: "Nationality",
                value: this.props.account.meta?.nationality
            },
            {
                key: "Roles",
                value: this.props.account.roles
            },
            {
                key: "Start Date",
                value: this.props.account.meta?.start_date
            },
            {
                key: "Github",
                value: this.props.account.meta?.github_username
            },
            {
                key: "Twitter",
                value: this.props.account.meta?.twitter_username
            },
            {
                key: "Linkedin",
                value: this.props.account.meta?.linkedin_username
            }
        ].filter(v => Boolean(v));
    };

    _buttons = () => {
        const buttons = [];
        if (this.props.account.meta?.phone_number) {
            buttons.push({
                label: "Share contact",
                value: "share",
                onPress: this.onShareContactPress
            });
        }
        buttons.push({
            label: "Sign out",
            value: "signout",
            onPress: this.props.onLogoutTouch,
            buttonProps: {
                textColor: "#f86a6a"
            }
        });
        return buttons;
    };

    _buttonGroupStyle = () => {
        return {
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0
        };
    };

    onShareContactPress = async () => {
        await Share.share({
            message: this.props.account.meta?.phone_number
        });
    };

    _renderHeader = () => {
        return (
            <>
                <Avatar
                    image={{
                        uri: `${this.props.account?.avatar_url}`
                    }}
                    size={96}
                    onPress={this.props.onAvatarPress}
                />
                <Text style={styles.username}>{this.props.account?.meta?.name || ""}</Text>
                {this.props.account && this.props.account.description ? (
                    <Text style={styles.description}>
                        {this.props.account?.description.trim() || ""}
                    </Text>
                ) : null}
            </>
        );
    };

    _renderDetails = () => {
        return (
            <>
                <KeyValues items={this._details()} showUnset={false} />
                <View style={styles.buttons}>
                    <ButtonGroup
                        buttonStyle={this._buttonGroupStyle()}
                        items={this._buttons()}
                        orientation={"vertical"}
                        variant={"flat"}
                        align={"flex-start"}
                        toggle={false}
                    />
                </View>
            </>
        );
    };

    render() {
        return (
            <>
                <View style={styles.header}>
                    {this._renderHeader()}

                    {this.props.editButton && (
                        <Touchable
                            hitSlop={{ top: 20, left: 20, right: 20, bottom: 20 }}
                            onPress={this.props.onEditPress}
                            style={styles.editButton}
                        >
                            <Text style={styles.editButtonText}>Edit</Text>
                        </Touchable>
                    )}
                </View>
                <View style={styles.detailsTitle}>
                    <Text style={styles.detailsTitleText}>Account Details</Text>
                </View>
                <ScrollView
                    style={styles.details}
                    ref={ref => {
                        this.scrollRef = ref;
                    }}
                >
                    {this._renderDetails()}
                </ScrollView>
            </>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        alignItems: "center",
        paddingVertical: 20
    },
    editButton: {
        position: "absolute",
        right: 18,
        top: 10
    },
    editButtonText: {
        fontSize: 16,
        color: "#4f7af8"
    },
    username: {
        color: "#223645",
        fontSize: 18,
        marginTop: 16,
        fontFamily: baseStyles.FONT_BOLD
    },
    description: {
        fontSize: 14,
        marginTop: 20,
        maxWidth: "90%",
        fontFamily: baseStyles.FONT_LIGHT,
        textAlign: "center"
    },
    details: {
        flex: 1
    },
    detailsTitle: {
        backgroundColor: "#f6f7f9",
        padding: 14,
        borderColor: "#e4e8f0",
        borderStyle: "solid",
        borderTopWidth: 1,
        borderBottomWidth: 1
    },
    detailsTitleText: {
        fontFamily: baseStyles.FONT
    },
    buttons: {
        height: "100%",
        paddingVertical: 15,
        backgroundColor: "#f6f7f9"
    },
    signoutButton: {
        marginTop: 13
    }
});
