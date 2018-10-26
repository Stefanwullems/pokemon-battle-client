import * as React from "react";

interface IProps {
  log: string;
  onNextButtonClick: () => void;
}

function LogPanel(props: IProps) {
  return (
    <div>
      {props.log}
      <button onClick={props.onNextButtonClick}>Next</button>
    </div>
  );
}

export default LogPanel;
