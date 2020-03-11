import React from "react";

import { Steps } from "antd";
import Button, { ButtonGroup } from "src/ui/Button";

import StepsStyles from "src/GoogleCrafter/css/Steps.style";


const { Step } = Steps;

export default function AddItemSteps({ step, setStep, submitStep }) {
  const prevStep = () => setStep(step - 1);
  return (
    <StepsStyles>
      <Steps size="small" type="navigation" current={ step }>
        <Step title="Create SQL" />
        <Step title="Set settings" />
        <Step title="Upload to server" />
      </Steps>

      { step < 2 && (
        <ButtonGroup className="steps__buttons">
          <Button icon="left" disabled={ !step } onClick={ prevStep }>
            Previous step
          </Button>
          <Button
            icon="right" onClick={ submitStep[step] }
            type={ step === 1 ? "primary" : "" }>
            { step === 1 ? "Upload to server" : "Set settings" }
          </Button>
        </ButtonGroup>
      ) }
    </StepsStyles>
  )
}
