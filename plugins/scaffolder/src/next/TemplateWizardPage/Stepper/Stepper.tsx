/*
 * Copyright 2022 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { JsonObject } from '@backstage/types';
import {
  Stepper as MuiStepper,
  Step as MuiStep,
  StepLabel as MuiStepLabel,
  Button,
  makeStyles,
} from '@material-ui/core';
import { withTheme } from '@rjsf/core';
import { Theme as MuiTheme } from '@rjsf/material-ui';
import React, { useMemo, useState } from 'react';
import { FieldExtensionOptions } from '../../../extensions';
import { TemplateParameterSchema } from '../../../types';
import { useTemplateSchema } from './useTemplateSchema';

const useStyles = makeStyles(theme => ({
  backButton: {
    marginRight: theme.spacing(1),
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'right',
  },
  formWrapper: {
    padding: theme.spacing(2),
  },
}));

export interface StepperProps {
  manifest: TemplateParameterSchema;
  extensions: FieldExtensionOptions<any, any>[];
}

const Form = withTheme(MuiTheme);

export const Stepper = (props: StepperProps) => {
  const { steps } = useTemplateSchema(props.manifest);
  const [activeStep, setActiveStep] = useState(0);
  const [formState, setFormState] = useState({});
  const styles = useStyles();

  const extensions = useMemo(() => {
    return Object.fromEntries(
      props.extensions.map(({ name, component }) => [name, component]),
    );
  }, [props.extensions]);

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleNext = ({ formData }: { formData: JsonObject }) => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
    setFormState(current => ({ ...current, ...formData }));
  };

  return (
    <>
      <MuiStepper activeStep={activeStep} alternativeLabel variant="elevation">
        {steps.map((step, index) => (
          <MuiStep key={index}>
            <MuiStepLabel>{step.title}</MuiStepLabel>
          </MuiStep>
        ))}
      </MuiStepper>
      <div className={styles.formWrapper}>
        <Form
          formData={formState}
          schema={steps[activeStep].schema}
          uiSchema={steps[activeStep].uiSchema}
          onSubmit={handleNext}
          fields={extensions}
          showErrorList={false}
        >
          <div className={styles.footer}>
            <Button
              onClick={handleBack}
              className={styles.backButton}
              disabled={activeStep < 1}
            >
              Back
            </Button>
            <Button variant="contained" color="primary" type="submit">
              {activeStep === steps.length - 1 ? 'Review' : 'Next'}
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};
