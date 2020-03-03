import React from "react";

import { Steps } from "antd";
import Button, { ButtonGroup } from "src/ui/Button";

import StepsStyles from "src/GoogleCrafter/css/Steps.style";


const { Step } = Steps;

export default function AddItemSteps({ step, setUIStep, submitStep }) {
  return (
    <StepsStyles>
      <Steps size="small" type="navigation" current={ step }>
        <Step title="Create SQL" />
        <Step title="Set settings" />
        <Step title="Upload to server" />
      </Steps>

      <ButtonGroup className="steps__buttons">
        <Button
          icon="left" disabled={ step === 0 }
          onClick={ () => setUIStep(step - 1) }
        >
          Previous step
        </Button>
        <Button
          icon="right" onClick={ submitStep[step] }
          type={ step === 1 ? "primary" : "" }>
          Next step
        </Button>
      </ButtonGroup>
    </StepsStyles>
  )
}
