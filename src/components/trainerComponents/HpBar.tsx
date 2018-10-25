import * as React from "react";
import { withStyles } from "@material-ui/core";
interface IProps {
  hp: number;
  classes: any;
  maxHp: number;
}

const styles = {
  hpBar: {
    backgroundColor: "green",
    height: "2vh",
    margin: 0
  }
};

function HpBar(props: IProps) {
  return (
    <div className={props.classes.hpBarContainer}>
      {props.hp && (
        <div>
          <span>
            hp: {props.hp}/{props.maxHp}
            <div
              className={props.classes.hpBar}
              style={{
                width: `${8 * (1 / props.maxHp) * props.hp}vw`
              }}
            />
          </span>
        </div>
      )}
    </div>
  );
}

export default withStyles(styles)(HpBar);
