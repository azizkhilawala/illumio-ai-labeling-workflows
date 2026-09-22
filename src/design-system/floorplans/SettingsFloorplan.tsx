'use client';

import React, { useState } from 'react';
import {
  SideNav,
  SideNavSection,
  SideNavItem,
  SideNavSubItem,
  SideNavDivider
} from '../components/SideNav';
import { Header } from '../components/Header';
import { Card, CardHeader, CardBody, CardFooter } from '../components/Card';
import { TextField } from '../components/Form/TextField';
import { Checkbox } from '../components/Form/Checkbox';
import { Switch } from '../components/Switch';
import { Button } from '../components/Button';
import { Icon } from "@/design-system/icons";
import { Grid } from '../icons/icons/Grid';
import { Gear } from '../icons/icons/Gear';
import { WhatsNew } from '../icons/icons/WhatsNew';
import { CircleQuestion } from '../icons/icons/CircleQuestion';

export interface SettingsFloorplanProps {
  pageTitle?: string;
}

export function SettingsFloorplan({ pageTitle = "Settings" }: SettingsFloorplanProps) {
  // Form state
  const [firstName, setFirstName] = useState('John');
  const [lastName, setLastName] = useState('Doe');
  const [email, setEmail] = useState('john.doe@company.com');
  const [phone, setPhone] = useState('+1 (555) 123-4567');

  // Notification preferences
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [smsNotifications, setSmsNotifications] = useState(false);

  // Checkbox preferences
  const [marketingEmails, setMarketingEmails] = useState(true);
  const [productUpdates, setProductUpdates] = useState(true);
  const [securityAlerts, setSecurityAlerts] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);

  // Security settings
  const [twoFactorAuth, setTwoFactorAuth] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState(false);

  const breadcrumbs = [
    { label: 'Home', href: '/', icon: <Grid variant="linear" size={16} /> },
    { label: pageTitle }
  ];

  // Icon buttons for the header
  const iconButtons = [
    {
      icon: <WhatsNew variant="linear" size={20} />,
      onClick: () => console.log('Magic clicked'),
      ariaLabel: "What's New",
    },
    {
      icon: <CircleQuestion variant="linear" size={20} />,
      onClick: () => console.log('Help clicked'),
      ariaLabel: 'Help',
    },
  ];

  return (
    <div className="settings-floorplan">
      {/* SideNav */}
      <SideNav>
        <SideNavSection>
          <SideNavItem icon={<Icon name="grid" size={16} />} href="/dashboard">
            Dashboard
          </SideNavItem>
          <SideNavItem icon={<Icon name="users" size={16} />} href="/users">
            Users
          </SideNavItem>
          <SideNavItem icon={<Icon name="shield" size={16} />} href="/security">
            Security
          </SideNavItem>
          <SideNavItem icon={<Icon name="bell" size={16} />} href="/notifications">
            Notifications
          </SideNavItem>
        </SideNavSection>

        <SideNavDivider />

        <SideNavSection title="Account">
          <SideNavItem
            icon={<Icon name="gear" size={16} />}
            active
            expandable
            defaultExpanded
          >
            Settings
            <SideNavSubItem active>Profile</SideNavSubItem>
            <SideNavSubItem>Preferences</SideNavSubItem>
            <SideNavSubItem>Integrations</SideNavSubItem>
          </SideNavItem>
        </SideNavSection>
      </SideNav>

      {/* Main Content */}
      <div className="settings-floorplan__main">
        {/* Header with Breadcrumbs */}
        <Header
          breadcrumbs={breadcrumbs}
          title={pageTitle}
          titleIcon={<Gear variant="solid" size={20} color="url(#lightning-gradient-100)" />}
          showInfoButton
          onInfoClick={() => console.log('Info clicked')}
          iconButtons={iconButtons}
          user={{ firstName: 'John', lastName: 'Doe', avatarUrl: 'https://i.pravatar.cc/40' }}
          showCoPilot
          onCoPilotClick={() => console.log('CoPilot clicked')}
          sticky
        />

        {/* Page Content */}
        <main className="settings-floorplan__content">

          {/* Profile Settings Card */}
          <Card>
            <CardHeader>
              <h2 className="settings-floorplan__card-title">
                Profile Information
              </h2>
              <p className="settings-floorplan__card-description">
                Update your personal details and contact information
              </p>
            </CardHeader>
            <CardBody>
              <div className="settings-floorplan__form-grid">
                <TextField
                  label="First Name"
                  value={firstName}
                  onChange={setFirstName}
                  placeholder="Enter first name"
                  required
                />
                <TextField
                  label="Last Name"
                  value={lastName}
                  onChange={setLastName}
                  placeholder="Enter last name"
                  required
                />
                <TextField
                  label="Email Address"
                  value={email}
                  onChange={setEmail}
                  placeholder="Enter email"
                  type="validated"
                  helperText="Your email is verified"
                  required
                />
                <TextField
                  label="Phone Number"
                  value={phone}
                  onChange={setPhone}
                  placeholder="Enter phone number"
                />
              </div>
            </CardBody>
            <CardFooter>
              <Button variant="secondary">Cancel</Button>
              <Button variant="primary">Save Changes</Button>
            </CardFooter>
          </Card>

          {/* Notification Preferences Card */}
          <Card>
            <CardHeader>
              <h2 className="settings-floorplan__card-title">
                Notification Preferences
              </h2>
              <p className="settings-floorplan__card-description">
                Choose how you want to receive notifications
              </p>
            </CardHeader>
            <CardBody>
              <div className="settings-floorplan__section-stack">
                {/* Switch controls */}
                <div className="settings-floorplan__switch-section">
                  <h3 className="settings-floorplan__section-title">
                    Notification Channels
                  </h3>
                  <div className="settings-floorplan__switch-row">
                    <div>
                      <span className="settings-floorplan__switch-label">
                        Email Notifications
                      </span>
                      <p className="settings-floorplan__switch-description">
                        Receive notifications via email
                      </p>
                    </div>
                    <Switch checked={emailNotifications} onChange={setEmailNotifications} />
                  </div>
                  <div className="settings-floorplan__switch-row">
                    <div>
                      <span className="settings-floorplan__switch-label">
                        Push Notifications
                      </span>
                      <p className="settings-floorplan__switch-description">
                        Receive push notifications on your device
                      </p>
                    </div>
                    <Switch checked={pushNotifications} onChange={setPushNotifications} />
                  </div>
                  <div className="settings-floorplan__switch-row">
                    <div>
                      <span className="settings-floorplan__switch-label">
                        SMS Notifications
                      </span>
                      <p className="settings-floorplan__switch-description">
                        Receive text messages for important alerts
                      </p>
                    </div>
                    <Switch checked={smsNotifications} onChange={setSmsNotifications} />
                  </div>
                </div>

                {/* Checkbox controls */}
                <div className="settings-floorplan__checkbox-section">
                  <h3 className="settings-floorplan__section-title">
                    Email Preferences
                  </h3>
                  <Checkbox
                    checked={marketingEmails}
                    onChange={setMarketingEmails}
                    label="Marketing emails and promotions"
                  />
                  <Checkbox
                    checked={productUpdates}
                    onChange={setProductUpdates}
                    label="Product updates and new features"
                  />
                  <Checkbox
                    checked={securityAlerts}
                    onChange={setSecurityAlerts}
                    label="Security alerts and account activity"
                  />
                  <Checkbox
                    checked={weeklyDigest}
                    onChange={setWeeklyDigest}
                    label="Weekly digest and summary reports"
                  />
                </div>
              </div>
            </CardBody>
            <CardFooter>
              <Button variant="secondary">Reset to Defaults</Button>
              <Button variant="primary">Save Preferences</Button>
            </CardFooter>
          </Card>

          {/* Security Settings Card */}
          <Card>
            <CardHeader>
              <h2 className="settings-floorplan__card-title">
                Security Settings
              </h2>
              <p className="settings-floorplan__card-description">
                Manage your account security and authentication
              </p>
            </CardHeader>
            <CardBody>
              <div className="settings-floorplan__section-stack">
                <div className="settings-floorplan__switch-row">
                  <div>
                    <span className="settings-floorplan__switch-label">
                      Two-Factor Authentication
                    </span>
                    <p className="settings-floorplan__switch-description">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Switch checked={twoFactorAuth} onChange={setTwoFactorAuth} />
                </div>
                <div className="settings-floorplan__switch-row">
                  <div>
                    <span className="settings-floorplan__switch-label">
                      Auto Session Timeout
                    </span>
                    <p className="settings-floorplan__switch-description">
                      Automatically log out after 30 minutes of inactivity
                    </p>
                  </div>
                  <Switch checked={sessionTimeout} onChange={setSessionTimeout} />
                </div>
                <div className="settings-floorplan__password-section">
                  <TextField
                    label="Current Password"
                    placeholder="Enter current password"
                  />
                  <div className="settings-floorplan__form-grid settings-floorplan__form-grid--mt">
                    <TextField
                      label="New Password"
                      placeholder="Enter new password"
                    />
                    <TextField
                      label="Confirm Password"
                      placeholder="Confirm new password"
                    />
                  </div>
                </div>
              </div>
            </CardBody>
            <CardFooter>
              <Button variant="secondary">Cancel</Button>
              <Button variant="primary">Update Password</Button>
            </CardFooter>
          </Card>

        </main>
      </div>

      <style jsx>{`
        .settings-floorplan {
          display: flex;
          min-height: 100vh;
          background-color: var(--lightning-bluegray-25, #f6f8f9);
        }

        .settings-floorplan__main {
          margin-left: 220px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .settings-floorplan__content {
          padding: var(--offset-xx-large);
          display: flex;
          flex-direction: column;
          gap: var(--offset-xx-large);
        }

        .settings-floorplan__card-title {
          margin: 0;
          font-size: var(--font-size-text-lg);
          font-weight: var(--weight-semibold);
          color: var(--lightning-gray-900);
        }

        .settings-floorplan__card-description {
          margin: var(--offset-x-small) 0 0 0;
          font-size: var(--font-size-text-s);
          color: var(--lightning-gray-600);
        }

        .settings-floorplan__form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--offset-large);
        }

        .settings-floorplan__form-grid--mt {
          margin-top: var(--offset-large);
        }

        .settings-floorplan__section-stack {
          display: flex;
          flex-direction: column;
          gap: var(--offset-large);
        }

        .settings-floorplan__switch-section {
          display: flex;
          flex-direction: column;
          gap: var(--offset-medium);
          padding-bottom: var(--offset-large);
          border-bottom: 1px solid var(--lightning-gray-200);
        }

        .settings-floorplan__checkbox-section {
          display: flex;
          flex-direction: column;
          gap: var(--offset-medium);
        }

        .settings-floorplan__section-title {
          margin: 0;
          font-size: var(--font-size-text-m);
          font-weight: var(--weight-semibold);
          color: var(--lightning-gray-800);
        }

        .settings-floorplan__switch-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .settings-floorplan__switch-label {
          font-size: var(--font-size-text-m);
          font-weight: var(--weight-medium);
          color: var(--lightning-gray-900);
        }

        .settings-floorplan__switch-description {
          margin: var(--offset-xx-small) 0 0 0;
          font-size: var(--font-size-text-s);
          color: var(--lightning-gray-600);
        }

        .settings-floorplan__password-section {
          padding-top: var(--offset-medium);
          border-top: 1px solid var(--lightning-gray-200);
        }
      `}</style>
    </div>
  );
}
