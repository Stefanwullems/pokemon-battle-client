import * as React from "react";

import doesExist from "../../scripts/does-exist";
import { IPokemon } from "../../tools/interfaces";
import { withStyles } from "@material-ui/core";

interface IProps {
  toggleShowMoves: () => void;
  showMoves: boolean;
  playerPokemon: IPokemon;
  onMoveButtonClick: (e) => void;
  classes: any;
}

const styles = {
  button: {
    width: 100
  }
};

function AttackPanel(props: IProps) {
  return (
    <React.Fragment>
      <button onClick={props.toggleShowMoves}>attack</button>

      {props.showMoves && (
        <div>
          <div>
            {doesExist(props.playerPokemon) &&
              props.playerPokemon.moves.map(move => {
                return (
                  <div key={move.name}>
                    <button
                      onClick={props.onMoveButtonClick}
                      name={move.name}
                      className={props.classes.button}
                    >
                      {move.name}
                    </button>
                    <span>
                      {"  "}
                      type: {move.type}, dmg: {move.damage}
                    </span>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

export default withStyles(styles)(AttackPanel);
