import React, { Component } from "react";
import { ProfileData } from "../../Models/ProfileData";
import "../../Styles/ProfilePage.scss"

interface State {

}

interface ProfilePageProps {
    LoggedIn: Boolean
    User: ProfileData
}

class ProfilePage extends Component<ProfilePageProps, State> {   

    constructor(props: ProfilePageProps) {
        super(props);

        this.state = {          

        }
    }

    render() {
        return(
            <div className={"ProfileMenu"}>
                <div className={"ProfileInformation"}>
                    <h1>Hey</h1>
                    <h2>Logged in is {this.props.LoggedIn ? "true" : "false"}</h2>
                    <h3>Username: {this.props.User.name}</h3>
                    <h3>Id: {this.props.User.id}</h3>
                    <h3>Elo rating: {this.props.User.eloRating}</h3>
                    <h3>Roles: {this.props.User.name ? this.props.User.roles.map((v,k) => {
                        return <span key={k}>{v}, </span>
                    }) : ""}</h3>
                </div>
            </div>
        )
    }
}

export default ProfilePage;