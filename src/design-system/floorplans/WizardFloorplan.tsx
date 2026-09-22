"use client";

import React, { useState } from "react";
import {
  Wizard,
  WizardHeader,
  WizardBody,
  WizardStepper,
  WizardContent,
  WizardContentBody,
  WizardFooter,
  WizardFormSection,
  useWizard,
} from "../components/Wizard";
import { TextField } from "../components/Form/TextField";
import { RadioGroup } from "../components/Form/Radio";
import { Checkbox } from "../components/Form/Checkbox";
import { Logo } from "../components/Logo";
import { Icon } from "@/design-system/icons";

// Step 1 Content
function Step1Content() {
  return (
    <div className="wizard-step-content">
      <div className="wizard-form-fields">
        <TextField
          label="Organization Name"
          placeholder="Enter your organization name"
          required
          helperText="This will be displayed in your dashboard"
        />
        <TextField
          label="Admin Email"
          placeholder="admin@example.com"
          required
          helperText="We'll send important notifications to this email"
        />
      </div>
    </div>
  );
}

// Step 2 Content
function Step2Content() {
  const [scope, setScope] = useState<string>('organization');

  const scopeOptions = [
    { value: 'organization', label: 'Organization' },
    { value: 'account', label: 'Account' },
  ];

  return (
    <div className="wizard-step-content">
      <RadioGroup
        label="Select Integration Scope"
        options={scopeOptions}
        value={scope}
        onChange={setScope}
      />

      <WizardFormSection>
        <div className="wizard-form-fields">
          <TextField
            label="Management Account ID"
            placeholder="Enter Management Account ID"
            required
            helperText="Your 12-digit Management Account ID can be found in your AWS console"
          />
          <TextField
            label="Organization Name"
            placeholder="Enter Organization Name"
            required
            helperText="A friendly name to identify your organization"
          />
        </div>
      </WizardFormSection>
    </div>
  );
}

// Step 3 Content
function Step3Content() {
  return (
    <div className="wizard-step-content">
      <p className="wizard-step-description">
        VPC Flow Logs capture information about the IP traffic going to and from network interfaces in your VPC.
        This data is essential for monitoring and analyzing network traffic patterns.
      </p>
      <WizardFormSection>
        <div className="wizard-form-fields">
          <TextField
            label="S3 Bucket Name"
            placeholder="my-flow-logs-bucket"
            required
            helperText="The S3 bucket where flow logs will be stored"
          />
          <TextField
            label="Log Format"
            placeholder="default"
            helperText="Leave as 'default' for standard fields or specify custom format"
          />
        </div>
      </WizardFormSection>
    </div>
  );
}

// Step 4 Content
function Step4Content() {
  const [permissions, setPermissions] = useState({
    ec2: true,
    vpc: true,
    securityGroups: true,
    iam: false,
  });

  return (
    <div className="wizard-step-content">
      <p className="wizard-step-description">
        Select the permissions you want to grant. We recommend the default settings for most use cases.
      </p>
      <div className="wizard-checkbox-list">
        <Checkbox
          label="Read EC2 instances"
          checked={permissions.ec2}
          onChange={(checked) => setPermissions({ ...permissions, ec2: checked })}
        />
        <Checkbox
          label="Read VPC configurations"
          checked={permissions.vpc}
          onChange={(checked) => setPermissions({ ...permissions, vpc: checked })}
        />
        <Checkbox
          label="Read security groups"
          checked={permissions.securityGroups}
          onChange={(checked) => setPermissions({ ...permissions, securityGroups: checked })}
        />
        <Checkbox
          label="Read IAM roles (optional)"
          checked={permissions.iam}
          onChange={(checked) => setPermissions({ ...permissions, iam: checked })}
        />
      </div>
    </div>
  );
}

// Step 5 Content
function Step5Content() {
  return (
    <div className="wizard-step-content">
      <p className="wizard-step-description">
        Click the button below to deploy the CloudFormation stack in your AWS account.
        This will create the necessary IAM roles and permissions.
      </p>
      <div className="wizard-info-box">
        <p className="wizard-info-item">
          <strong>Stack Name:</strong> acme-integration-stack
        </p>
        <p className="wizard-info-item">
          <strong>Region:</strong> us-east-1
        </p>
      </div>
    </div>
  );
}

// Step 6 Content
function Step6Content() {
  return (
    <div className="wizard-step-content">
      <p className="wizard-step-description">
        Create a passkey for secure, passwordless authentication to your account.
      </p>
      <TextField
        label="Passkey Name"
        placeholder="My Work Laptop"
        required
        helperText="Give your passkey a memorable name"
      />
    </div>
  );
}

// Dynamic step content renderer
function StepContent() {
  const { currentStep } = useWizard();

  const stepContents = [
    {
      icon: null,
      title: "Configure Your Account",
      description: "Set up your organization details to get started",
      content: <Step1Content />,
    },
    {
      icon: <Icon name="cloud" size={16} />,
      title: "Connect your AWS Cloud",
      description: "Select how you want to connect your AWS environment",
      content: <Step2Content />,
    },
    {
      icon: null,
      title: "Enable VPC Flow Logs",
      description: "Configure flow logs to capture network traffic data",
      content: <Step3Content />,
    },
    {
      icon: null,
      title: "Select Permissions",
      description: "Choose the access permissions for your integration",
      content: <Step4Content />,
    },
    {
      icon: null,
      title: "Deploy Stack in AWS",
      description: "Deploy the CloudFormation stack to complete the integration",
      content: <Step5Content />,
    },
    {
      icon: null,
      title: "Create Passkey",
      description: "Set up secure authentication for your account",
      content: <Step6Content />,
    },
  ];

  const current = stepContents[currentStep];

  return (
    <WizardContentBody
      icon={current.icon}
      title={current.title}
      description={current.description}
    >
      {current.content}
    </WizardContentBody>
  );
}

export interface WizardFloorplanProps {
  onComplete?: () => void;
}

export function WizardFloorplan({ onComplete }: WizardFloorplanProps) {
  const steps = [
    { id: "step1", label: "Configure Account" },
    { id: "step2", label: "Connect your AWS Cloud" },
    { id: "step3", label: "Enable VPC Flow Logs" },
    { id: "step4", label: "Select Permissions" },
    { id: "step5", label: "Deploy Stack in AWS" },
    { id: "step6", label: "Create Passkey" },
  ];

  const handleComplete = () => {
    if (onComplete) {
      onComplete();
    } else {
      alert("Wizard completed! In a real app, you would submit the data here.");
    }
  };

  return (
    <>
      <Wizard steps={steps} onComplete={handleComplete}>
        <WizardHeader
          logo={<Logo size="sm" />}
          title="Cloud Onboarding"
        />
        <WizardBody>
          <WizardStepper />
          <WizardContent>
            <StepContent />
            <WizardFooter />
          </WizardContent>
        </WizardBody>
      </Wizard>

      <style jsx>{`
        :global(.wizard-step-content) {
          display: flex;
          flex-direction: column;
          gap: var(--offset-large);
          max-width: 600px;
        }

        :global(.wizard-step-description) {
          font-size: var(--font-size-text-s);
          color: var(--lightning-bluegray-700);
          line-height: 1.6;
          margin: 0;
        }

        :global(.wizard-form-fields) {
          display: flex;
          flex-direction: column;
          gap: var(--offset-large);
        }

        :global(.wizard-checkbox-list) {
          display: flex;
          flex-direction: column;
          gap: var(--offset-medium);
        }

        :global(.wizard-info-box) {
          padding: var(--offset-large);
          background-color: var(--lightning-blue-25);
          border-radius: var(--radius-md);
          border: 1px solid var(--lightning-bluegray-200);
        }

        :global(.wizard-info-item) {
          font-size: var(--font-size-text-s);
          color: var(--lightning-bluegray-700);
          margin: 0;
        }

        :global(.wizard-info-item + .wizard-info-item) {
          margin-top: var(--offset-small);
        }
      `}</style>
    </>
  );
}
