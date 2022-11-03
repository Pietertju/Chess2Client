import React, { Component } from "react";
import ChessGame from "./Chess/ChessGame";

interface State {
    
}

interface MainProps {
    
}

class Main extends Component<MainProps, State> {   

    constructor(props: MainProps) {
        super(props);

        this.state = {
  
        }
    }

    render() {
        return(
            <div className="MainContainer">
                <ChessGame />
            </div>
        )
    }
}

export default Main;