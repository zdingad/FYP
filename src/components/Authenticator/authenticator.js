/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react-native';
import { Amplify, Auth } from 'aws-amplify';
import awsExports from './aws-exports';
import { RegisterInfo } from '../DBinterface/DBinterface.js';
Amplify.configure(awsExports);

import {
    Alert,
    Button
} from 'react-native'

var username;

export function GetUserName() {
    return username;
}

export function SignOutButton() {
    const { signOut } = useAuthenticator();
    return <Button title="Sign Out" onPress={signOut} />;
}

Temp = () => {
    return <Button title="Press me" onPress={() => { Alert.alert("Table created") }} />;
}

export const alter_content = (input) => {
    Temp = input
}

const UserInit = () => {
    const { user } = useAuthenticator((context) => [context.user]);
    username = user.username;
    return;
}

export const Authentication = () => {
    return (
        <Authenticator.Provider>
            <Authenticator loginMechanisms={['username']}
                services={{
                    handleSignUp: async (formData) => {
                        let { username, password, attributes } = formData;
                        var table_name = 'User'
                        var item = {
                            'username': { S: username },
                            'nickname': { S: username } //by default
                        }
                        await RegisterInfo(table_name, item);
                        
                        return Auth.signUp({
                            username,
                            password,
                            attributes,
                            autoSignIn: {
                                enabled: true,
                            },
                        });
                    },
                }}
            >
                <UserInit/>
                <Temp/>
            </Authenticator>
        </Authenticator.Provider>
    )
}
