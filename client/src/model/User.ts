
export type UserSchema = { // used for authentication
    username: string,
    password: string,
}

export type User = { //used for API response
    username: string,
    token: string,
}
