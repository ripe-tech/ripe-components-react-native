import React, { Component } from "react";
import { ScrollView, Share, StyleSheet, TouchableNativeFeedbackBase, View } from "react-native";
import PropTypes from "prop-types";

import { baseStyles } from "../../../util";

import { Avatar, Button, Icon, Text, Touchable } from "../../atoms";
import { KeyValues } from "../../molecules";

export class Profile extends Component {
    static get propTypes() {
        return {
            account: PropTypes.object.isRequired,
            actions: PropTypes.object,
            buttons: PropTypes.array,
            backButton: PropTypes.bool,
            editButton: PropTypes.bool,
            details: PropTypes.array,
            detailsTitle: PropTypes.string,
            showDescription: PropTypes.bool,
            showButtons: PropTypes.bool,
            keyColor: PropTypes.string,
            onBackPress: PropTypes.func,
            onEditPress: PropTypes.func,
            onAvatarPress: PropTypes.func,
            onLogoutTouch: PropTypes.func,
            styles: PropTypes.any
        };
    }

    static get defaultProps() {
        return {
            actions: {},
            buttons: null,
            editButton: false,
            backButton: false,
            details: null,
            detailsTitle: "Account Details",
            detailsBackgroundColor: "#f6f7f9",
            showDescription: true,
            showButtons: true,
            keyColor: undefined,
            onPress: () => {},
            onEditPress: () => {},
            onAvatarPress: () => {},
            styles: styles
        };
    }

    scrollTop = () => {
        this.scrollRef?.scrollTo({ animated: true, x: 0 });
    };

    _avatarUrl() {
        return `${this.props.account?.avatar_url}`;
    }

    _details() {
        if (this.props.details) return this.props.details;
        return [
            {
                key: "E-mail",
                keyColor: this.props.keyColor,
                value: this.props.account.email,
                ...(this.props.actions?.email || {})
            },
            {
                key: "Phone",
                keyColor: this.props.keyColor,
                value: this.props.account.meta?.phone_number,
                ...(this.props.actions?.phone || {})
            },
            {
                key: "Company",
                keyColor: this.props.keyColor,
                value: this.props.account.meta?.company,
                ...(this.props.actions?.company || {})
            },
            {
                key: "Company URL",
                keyColor: this.props.keyColor,
                value: this.props.account.meta?.company_url,
                ...(this.props.actions?.companyUrl || {})
            },
            {
                key: "Position",
                keyColor: this.props.keyColor,
                value: this.props.account.meta?.position,
                ...(this.props.actions?.position || {})
            },
            {
                key: "Birth Date",
                keyColor: this.props.keyColor,
                value: this.props.account.meta?.birth_date,
                ...(this.props.actions?.birthDate || {})
            },
            {
                key: "Nationality",
                keyColor: this.props.keyColor,
                value: this.props.account.meta?.nationality,
                ...(this.props.actions?.nationality || {})
            },
            {
                key: "Roles",
                keyColor: this.props.keyColor,
                value: this.props.account.roles,
                ...(this.props.actions?.roles || {})
            },
            {
                key: "Start Date",
                keyColor: this.props.keyColor,
                value: this.props.account.meta?.start_date,
                ...(this.props.actions?.startDate || {})
            },
            {
                key: "Github",
                keyColor: this.props.keyColor,
                value: this.props.account.meta?.github_username,
                ...(this.props.actions?.githubUsername || {}),
                valueComponent: (
                    <View style={styles.keyValue}>
                        <Text style={styles.keyPrefixValue}>{"github.com/"}</Text>
                        <Text style={styles.keyValueValue}>
                            {this.props.account.meta?.github_username}
                        </Text>
                    </View>
                )
            },
            {
                key: "Twitter",
                keyColor: this.props.keyColor,
                value: this.props.account.meta?.twitter_username,
                ...(this.props.actions?.twitterUsername || {}),
                valueComponent: (
                    <View style={styles.keyValue}>
                        <Text style={styles.keyPrefixValue}>{"twitter.com/"}</Text>
                        <Text style={styles.keyValueValue}>
                            {this.props.account.meta?.twitter_username}
                        </Text>
                    </View>
                )
            },
            {
                key: "Linkedin",
                keyColor: this.props.keyColor,
                value: this.props.account.meta?.linkedin_username,
                ...(this.props.actions?.linkedinUsername || {}),
                valueComponent: (
                    <View style={styles.keyValue}>
                        <Text style={styles.keyPrefixValue}>{"linkedin.com/in/"}</Text>
                        <Text style={styles.keyValueValue}>
                            {this.props.account.meta?.linkedin_username}
                        </Text>
                    </View>
                )
            }
        ].filter(v => Boolean(v));
    }

    _buttons() {
        if (this.props.buttons?.length) return this.props.buttons;
        const buttons = [];
        if (this.props.account.meta?.phone_number) {
            buttons.push({
                style: {
                    borderColor: "#4a6fe9",
                    borderStyle: "solid",
                    borderWidth: 1,
                    marginBottom: 11
                },
                text: "Share contact",
                textColor: "#4a6fe9",
                backgroundColor: "#ffffff",
                onPress: () => this.onShareContactPress()
            });
        }
        buttons.push({
            text: "Sign out",
            textColor: "#ffffff",
            backgroundColor: "#f76969",
            onPress: () => this.props.onLogoutTouch()
        });
        return buttons;
    }

    _showDescription() {
        return this.props.account && this.props.account.description && this.props.showDescription;
    }

    async onShareContactPress() {
        await Share.share({
            message: this.props.account.meta?.phone_number
        });
    }

    _renderHeader() {
        return (
            <View style={styles.header}>
                <Avatar
                    image={{
                        uri: `${this.props.account?.avatar_url}`
                    }}
                    size={96}
                    onPress={this.props.onAvatarPress}
                />
                <Text style={styles.username}>{this.props.account?.meta?.name || ""}</Text>
                {this._showDescription() ? (
                    <Text style={styles.description}>
                        {this.props.account?.description.trim() || ""}
                    </Text>
                ) : null}
            </View>
        );
    }

    _renderDetails() {
        return (
            <>
                <KeyValues
                    items={this._details()}
                    showUnset={false}
                    keyColor={this.props.keyColor}
                    {...this.props.keyValuesProps}
                />
                {this.props.showButtons && (
                    <View style={styles.buttons}>
                        {this._buttons().map(buttonProps => (
                            <Button {...buttonProps} />
                        ))}
                    </View>
                )}
            </>
        );
    }

    render() {
        return (
            <View style={styles.profile}>
                <View style={styles.headerContainer}>
                    <View style={styles.headerButtons}>
                        {this.props.backButton && (
                            <Touchable
                                style={styles.backButton}
                                hitSlop={{ top: 20, left: 20, right: 20, bottom: 20 }}
                                onPress={() => this.props.onBackPress()}
                            >
                                <Icon
                                    style={styles.goBackButtonIcon}
                                    color="#1d2631"
                                    icon="arrow-left"
                                    width={24}
                                    height={24}
                                    strokeWidth={2}
                                />
                            </Touchable>
                        )}
                        {this.props.editButton && (
                            <Touchable
                                style={styles.editButton}
                                hitSlop={{ top: 20, left: 20, right: 20, bottom: 20 }}
                                onPress={this.props.onEditPress}
                            >
                                <Text style={styles.editButtonText}>Edit</Text>
                            </Touchable>
                        )}
                    </View>
                    {this._renderHeader()}
                </View>
                <View style={styles.detailsTitle}>
                    <Text style={styles.detailsTitleText}>{this.props.detailsTitle}</Text>
                </View>
                <ScrollView
                    style={styles.details}
                    ref={ref => {
                        this.scrollRef = ref;
                    }}
                >
                    {this._renderDetails()}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    profile: {
        flex: 1,
        backgroundColor: "#ffffff"
    },
    headerContainer: {
        alignItems: "center"
    },
    header: {
        alignItems: "center",
        paddingVertical: 15
    },
    headerButtons: {
        width: "100%",
        backgroundColor: "#f6f7f9"
    },
    backButton: {
        position: "relative",
        height: 50,
        width: 66
    },
    goBackButtonIcon: {
        position: "absolute",
        left: 21,
        top: 10
    },
    editButton: {
        alignSelf: "flex-end",
        position: "relative",
        paddingVertical: 14,
        right: 18,
        top: 0
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
    keyValue: {
        flexDirection: "row"
    },
    keyPrefixValue: {
        color: "#9a9a9a",
        fontSize: 16,
        lineHeight: 18
    },
    keyValueValue: {
        marginTop: 0,
        fontFamily: baseStyles.FONT,
        fontSize: 16,
        lineHeight: 18
    },
    buttons: {
        height: "100%",
        paddingVertical: 15,
        backgroundColor: "#ffffff",
        paddingHorizontal: 15
    },
    signoutButton: {
        marginTop: 13
    }
});
