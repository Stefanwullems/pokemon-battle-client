import * as React from "react";
import { Button } from "@material-ui/core";

interface IProps {
  logging: boolean;
  log: string;
  onNextButtonClick: () => void;
}

function LogPanel(props: IProps) {
  return (
    <React.Fragment>
      {props.logging && (
        <div>
          {props.log}
          <Button onClick={props.onNextButtonClick}>Next</Button>
        </div>
      )}
    </React.Fragment>
  );
}

export default LogPanel;
