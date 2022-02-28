import React, { Component } from "react";
import { ScrollView, Share, StyleSheet, View } from "react-native";
import PropTypes from "prop-types";

import { baseStyles } from "../../../util";

import { Avatar, Icon, Text, Touchable } from "../../atoms";
import { KeyValues } from "../../molecules";
import { ButtonGroup } from "../button-group";

export class Profile extends Component {
    static get propTypes() {
        return {
            account: PropTypes.object.isRequired,
            actions: PropTypes.object,
            backButton: PropTypes.bool,
            editButton: PropTypes.bool,
            detailsTitle: PropTypes.string,
            showDescription: PropTypes.bool,
            showButtons: PropTypes.bool,
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
            editButton: false,
            backButton: false,
            detailsTitle: "Account Details",
            detailsBackgroundColor: "#f6f7f9",
            showDescription: true,
            showButtons: true,
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
        return [
            {
                key: "E-mail",
                value: this.props.account.email,
                ...(this.props.actions?.email || {})
            },
            {
                key: "Phone",
                value: this.props.account.meta?.phone_number,
                ...(this.props.actions?.phone || {})
            },
            {
                key: "Company",
                value: this.props.account.meta?.company,
                ...(this.props.actions?.company || {})
            },
            {
                key: "Company URL",
                value: this.props.account.meta?.company_url,
                ...(this.props.actions?.companyUrl || {})
            },
            {
                key: "Position",
                value: this.props.account.meta?.position,
                ...(this.props.actions?.position || {})
            },
            {
                key: "Birth Date",
                value: this.props.account.meta?.birth_date,
                ...(this.props.actions?.birthDate || {})
            },
            {
                key: "Nationality",
                value: this.props.account.meta?.nationality,
                ...(this.props.actions?.nationality || {})
            },
            {
                key: "Roles",
                value: this.props.account.roles,
                ...(this.props.actions?.roles || {})
            },
            {
                key: "Start Date",
                value: this.props.account.meta?.start_date,
                ...(this.props.actions?.startDate || {})
            },
            {
                key: "Github",
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
        const buttons = [];
        if (this.props.account.meta?.phone_number) {
            buttons.push({
                label: "Share contact",
                value: "share",
                onPress: () => this.onShareContactPress()
            });
        }
        buttons.push({
            label: "Sign out",
            value: "signout",
            onPress: () => this.props.onLogoutTouch(),
            buttonProps: {
                textColor: "#f86a6a"
            }
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
                <KeyValues items={this._details()} showUnset={false} />
                {this.props.showButtons && (
                    <View style={styles.buttons}>
                        <ButtonGroup
                            items={this._buttons()}
                            orientation={"vertical"}
                            variant={"flat"}
                            align={"left"}
                            toggle={false}
                        />
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
        backgroundColor: "#f6f7f9",
        paddingHorizontal: 15
    },
    signoutButton: {
        marginTop: 13
    }
});
