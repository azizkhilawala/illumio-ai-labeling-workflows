"use client";

import React, { useState, useMemo } from "react";
import * as DazzleIcons from '@/design-system/icons/icons';
import * as PillIcons from '@/design-system/pill-icons/icons';
import { Icon } from '@/design-system/icons';
import { PillIcon, type LabelType } from '@/design-system/pill-icons';
import type { IconVariant } from '@/design-system/icons';
import {
  ErrorEmptyState,
  PositiveNeutralEmptyState,
  Table_negative_emptystate,
  Table_neutral_emptystate,
} from '@/design-system/illustrations/illustrations';
import {
  Accordion,
  AccordionGroup,
  AccordionGroupItem,
  DataAccordion,
  Badge,
  Breadcrumb,
  Button,
  Card,
  Checkbox,
  Radio,
  RadioGroup,
  DatePicker,
  FilterMenu,
  Header,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  NotificationBanner,
  OptionCard,
  OptionCardGroup,
  OptionSelector,
  Pill,
  PillGroup,
  GlobalSearchInput,
  Selector,
  SideNav,
  SideNavDivider,
  SideNavFooter,
  SideNavItem,
  SideNavSection,
  SideNavSubItem,
  Slideout,
  SlideoutHeader,
  SlideoutBody,
  SlideoutSection,
  SlideoutDivider,
  SlideoutFooter,
  SlideoutFooterGroup,
  Status,
  Switch,
  Tabs,
  TabList,
  TabPanel,
  Toast,
  Toggle,
  Tooltip,
  TextField,
  VideoBanner,
  WidgetContainer,
  WidgetStat,
  Logo,
  MapSquareNode,
  MapCircleNode,
  UserAvatar,
  CoPilotButton,
} from "@/design-system";

const mapNodeComputeIcon = <Icon name="server" size={24} />;
const mapNodeUserIcon = <Icon name="user" size={24} />;
const mapNodeVendorIcon = <Icon name="hexagon" size={12} />;
const mapNodeAwsIcon = <Icon name="cloud" size={14} color="#FF9900" />;

// Navigation item types
type NavItem = {
  id: string;
  label: string;
  type: "component" | "floorplan" | "foundation";
  href?: string;
};

const FOUNDATIONS: NavItem[] = [
  { id: "typography", label: "Typography", type: "foundation" },
  { id: "colors", label: "Colors", type: "foundation" },
  { id: "spacing", label: "Spacing", type: "foundation" },
  { id: "dazzle-icons", label: "Dazzle Icons", type: "foundation" },
  { id: "illumio-icons", label: "Illumio Icons", type: "foundation" },
  { id: "pill-icons", label: "Pill Icons", type: "foundation" },
  { id: "illumio-illustrations", label: "Illumio Illustrations", type: "foundation" },
];

const COMPONENTS: NavItem[] = [
  { id: "accordion", label: "Accordion", type: "component" },
  { id: "badge", label: "Badge", type: "component" },
  { id: "breadcrumb", label: "Breadcrumb", type: "component" },
  { id: "button", label: "Button", type: "component" },
  { id: "card", label: "Card", type: "component" },
  { id: "checkbox", label: "Checkbox", type: "component" },
  { id: "copilotbutton", label: "CoPilotButton", type: "component" },
  { id: "datepicker", label: "DatePicker", type: "component" },
  { id: "filtermenu", label: "FilterMenu", type: "component" },
  { id: "globalsearchinput", label: "GlobalSearchInput", type: "component" },
  { id: "header", label: "Header", type: "component" },
  { id: "logo", label: "Logo", type: "component" },
  { id: "mapnode", label: "MapNode", type: "component" },
  { id: "modal", label: "Modal", type: "component" },
  { id: "notificationbanner", label: "NotificationBanner", type: "component" },
  { id: "optioncard", label: "OptionCard", type: "component" },
  { id: "optionselector", label: "OptionSelector", type: "component" },
  { id: "pill", label: "Pill", type: "component" },
  { id: "radio", label: "Radio", type: "component" },
  { id: "selector", label: "Selector", type: "component" },
  { id: "sidenav", label: "SideNav", type: "component" },
  { id: "slideout", label: "Slideout", type: "component" },
  { id: "status", label: "Status", type: "component" },
  { id: "switch", label: "Switch", type: "component" },
  { id: "tab", label: "Tabs", type: "component" },
  { id: "textfield", label: "TextField", type: "component" },
  { id: "toast", label: "Toast", type: "component" },
  { id: "toggle", label: "Toggle", type: "component" },
  { id: "tooltip", label: "Tooltip", type: "component" },
  { id: "useravatar", label: "UserAvatar", type: "component" },
  { id: "videobanner", label: "VideoBanner", type: "component" },
  { id: "widget", label: "WidgetContainer", type: "component" },
];

const FLOORPLANS: NavItem[] = [
  { id: "dashboard", label: "Dashboard", type: "floorplan", href: "/dashboard" },
  { id: "settings", label: "Settings", type: "floorplan", href: "/settings" },
  { id: "table-grid", label: "Table Grid", type: "floorplan", href: "/table-grid" },
  { id: "wizard", label: "Wizard", type: "floorplan", href: "/wizard" },
];

const DEMOS: NavItem[] = [
  { id: "demos", label: "Demos & Prototypes", type: "floorplan", href: "/demos" },
];

// Icons - Using design system Icon components
const PlusIcon = () => <Icon name="plus" size={16} />;
const ArrowRightIcon = () => <Icon name="arrow-right" size={16} />;
const ExportIcon = () => <Icon name="arrow-up-from-bracket" size={16} />;
const RefreshIcon = () => <Icon name="refresh-cw" size={16} />;
const MoreIcon = () => <Icon name="dots-vertical" size={16} />;
const ListIcon = () => <Icon name="list" size={16} />;
const GridIcon = () => <Icon name="grid" size={16} />;
const TableIcon = () => <Icon name="table" size={16} />;
const MitreIcon = () => <Icon name="shield" size={16} />;

// Demo row for showing variants
function DemoRow({ label, children }: { label?: string; children: React.ReactNode }) {
  return (
    <div className="demo-row">
      {label && <span className="demo-row__label">{label}</span>}
      <div className="demo-row__content">{children}</div>
    </div>
  );
}

// Component demos
function ButtonDemo() {
  return (
    <>
      <DemoRow label="Primary">
        <Button variant="primary">Solid</Button>
        <Button variant="primary-outlined">Outlined</Button>
        <Button variant="primary-ghost">Ghost</Button>
      </DemoRow>
      <DemoRow label="Secondary">
        <Button variant="secondary">Solid</Button>
        <Button variant="secondary-outlined">Outlined</Button>
        <Button variant="secondary-ghost">Ghost</Button>
      </DemoRow>
      <DemoRow label="Sizes">
        <Button size="xxs">XXS</Button>
        <Button size="xs">XS</Button>
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
        <Button size="xl">XL</Button>
      </DemoRow>
      <DemoRow label="With Icons">
        <Button leftIcon={<PlusIcon />}>Left Icon</Button>
        <Button rightIcon={<ArrowRightIcon />}>Right Icon</Button>
        <Button leftIcon={<PlusIcon />} rightIcon={<ArrowRightIcon />}>Both Icons</Button>
      </DemoRow>
      <DemoRow label="Icon Only">
        <Button size="xxs" iconOnly leftIcon={<PlusIcon />} />
        <Button size="xs" iconOnly leftIcon={<PlusIcon />} />
        <Button size="sm" iconOnly leftIcon={<PlusIcon />} />
        <Button size="md" iconOnly leftIcon={<PlusIcon />} />
        <Button size="lg" iconOnly leftIcon={<PlusIcon />} />
        <Button size="xl" iconOnly leftIcon={<PlusIcon />} />
      </DemoRow>
      <DemoRow label="States">
        <Button>Default</Button>
        <Button disabled>Disabled</Button>
        <Button loading>Loading</Button>
      </DemoRow>
      <DemoRow label="Secondary States">
        <Button variant="secondary">Default</Button>
        <Button variant="secondary" disabled>Disabled</Button>
        <Button variant="secondary" loading>Loading</Button>
      </DemoRow>
    </>
  );
}

function TextFieldDemo() {
  const [value, setValue] = useState("");
  const [textareaValue, setTextareaValue] = useState("");

  return (
    <>
      <DemoRow label="Default">
        <div style={{ width: '300px' }}>
          <TextField
            label="Email"
            placeholder="Enter your email"
            value={value}
            onChange={setValue}
          />
        </div>
      </DemoRow>
      <DemoRow label="With Helper Text">
        <div style={{ width: '300px' }}>
          <TextField
            label="Username"
            placeholder="Choose a username"
            helperText="This will be your public display name"
          />
        </div>
      </DemoRow>
      <DemoRow label="Validation States">
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <div style={{ width: '220px' }}>
            <TextField
              label="Error"
              placeholder="Enter value"
              type="error"
              helperText="This field has an error"
              defaultValue="Invalid"
            />
          </div>
          <div style={{ width: '220px' }}>
            <TextField
              label="Validated"
              placeholder="Enter value"
              type="validated"
              helperText="This field is valid"
              defaultValue="Correct"
            />
          </div>
          <div style={{ width: '220px' }}>
            <TextField
              label="Warning"
              placeholder="Enter value"
              type="warning"
              helperText="Check this field"
              defaultValue="Review"
            />
          </div>
        </div>
      </DemoRow>
      <DemoRow label="Textarea (Long)">
        <div style={{ width: '400px' }}>
          <TextField
            label="Description"
            placeholder="Enter a detailed description..."
            size="long"
            value={textareaValue}
            onChange={setTextareaValue}
            maxLength={200}
            showCharCount
            helperText="Describe your project in detail"
          />
        </div>
      </DemoRow>
      <DemoRow label="Horizontal">
        <div style={{ width: '450px' }}>
          <TextField
            label="Full Name"
            placeholder="Enter your full name"
            orientation="horizontal"
          />
        </div>
      </DemoRow>
      <DemoRow label="Required + Disabled">
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <div style={{ width: '220px' }}>
            <TextField
              label="Required Field"
              placeholder="This is required"
              required
            />
          </div>
          <div style={{ width: '220px' }}>
            <TextField
              label="Disabled Field"
              placeholder="Cannot edit"
              disabled
              defaultValue="Read only value"
            />
          </div>
        </div>
      </DemoRow>
    </>
  );
}

function BadgeDemo() {
  return (
    <>
      <DemoRow label="Status">
        <Badge variant="new">New</Badge>
        <Badge variant="created">Created</Badge>
        <Badge variant="updated">Updated</Badge>
        <Badge variant="deleted">Deleted</Badge>
        <Badge variant="disabled">Disabled</Badge>
      </DemoRow>
      <DemoRow label="Severity">
        <Badge variant="low">Low</Badge>
        <Badge variant="medium">Medium</Badge>
        <Badge variant="high">High</Badge>
        <Badge variant="critical">Critical</Badge>
      </DemoRow>
      <DemoRow label="Info">
        <Badge variant="info">Info</Badge>
        <Badge variant="info-light">Info</Badge>
        <Badge variant="preview">Preview</Badge>
      </DemoRow>
      <DemoRow label="Other">
        <Badge variant="beta">Beta</Badge>
        <Badge variant="recommended">Recommended</Badge>
        <Badge variant="draft">Draft</Badge>
        <Badge variant="extrascope">Extrascope</Badge>
        <Badge variant="gray">Any</Badge>
      </DemoRow>
      <DemoRow label="MITRE Tactics">
        <Badge variant="mitre-credential-access" icon={<MitreIcon />}>Credential Access</Badge>
        <Badge variant="mitre-initial-access" icon={<MitreIcon />}>Initial Access</Badge>
        <Badge variant="mitre-persistence" icon={<MitreIcon />}>Persistence</Badge>
        <Badge variant="mitre-privilege-escalation" icon={<MitreIcon />}>Privilege Escalation</Badge>
      </DemoRow>
      <DemoRow label="MITRE Tactics (cont.)">
        <Badge variant="mitre-discovery" icon={<MitreIcon />}>Discovery</Badge>
        <Badge variant="mitre-lateral-movement" icon={<MitreIcon />}>Lateral Movement</Badge>
        <Badge variant="mitre-impact" icon={<MitreIcon />}>Impact</Badge>
        <Badge variant="mitre-exfiltration" icon={<MitreIcon />}>Exfiltration</Badge>
      </DemoRow>
      <DemoRow label="MITRE Tactics (cont.)">
        <Badge variant="mitre-command-and-control" icon={<MitreIcon />}>Command and Control</Badge>
        <Badge variant="mitre-collection" icon={<MitreIcon />}>Collection</Badge>
        <Badge variant="mitre-reconnaissance" icon={<MitreIcon />}>Reconnaissance</Badge>
      </DemoRow>
    </>
  );
}

function CheckboxDemo() {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(true);
  const [checked3, setChecked3] = useState(false);
  const [indeterminate, setIndeterminate] = useState(true);

  return (
    <>
      <DemoRow label="Default">
        <Checkbox />
        <Checkbox checked />
        <Checkbox indeterminate />
      </DemoRow>
      <DemoRow label="With Label">
        <Checkbox
          label="Unchecked"
          checked={checked1}
          onChange={setChecked1}
        />
        <Checkbox
          label="Checked"
          checked={checked2}
          onChange={setChecked2}
        />
        <Checkbox
          label="Indeterminate"
          indeterminate={indeterminate}
          onChange={() => setIndeterminate(false)}
        />
      </DemoRow>
      <DemoRow label="Error State">
        <Checkbox error />
        <Checkbox error label="Error with label" />
      </DemoRow>
      <DemoRow label="Disabled">
        <Checkbox disabled />
        <Checkbox disabled checked />
        <Checkbox disabled indeterminate />
      </DemoRow>
      <DemoRow label="Disabled with Label">
        <Checkbox disabled label="Disabled unchecked" />
        <Checkbox disabled checked label="Disabled checked" />
        <Checkbox disabled indeterminate label="Disabled indeterminate" />
      </DemoRow>
      <DemoRow label="Interactive">
        <Checkbox
          label="Click me to toggle"
          checked={checked3}
          onChange={setChecked3}
        />
      </DemoRow>
    </>
  );
}

function CoPilotButtonDemo() {
  return (
    <>
      <DemoRow label="Small (32px)">
        <CoPilotButton size="sm" onClick={() => alert('CoPilot clicked!')} />
      </DemoRow>
      <DemoRow label="Medium (40px - default)">
        <CoPilotButton size="md" onClick={() => alert('CoPilot clicked!')} />
      </DemoRow>
      <DemoRow label="Large (48px)">
        <CoPilotButton size="lg" onClick={() => alert('CoPilot clicked!')} />
      </DemoRow>
      <DemoRow label="Disabled">
        <CoPilotButton disabled />
      </DemoRow>
      <DemoRow label="All Sizes">
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <CoPilotButton size="sm" />
          <CoPilotButton size="md" />
          <CoPilotButton size="lg" />
        </div>
      </DemoRow>
    </>
  );
}

function RadioDemo() {
  const [selected1, setSelected1] = useState(false);
  const [selected2, setSelected2] = useState(true);
  const [groupValue, setGroupValue] = useState('option1');

  const radioOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  return (
    <>
      <DemoRow label="Default">
        <Radio />
        <Radio checked />
      </DemoRow>
      <DemoRow label="With Label">
        <Radio
          label="Unselected"
          checked={selected1}
          onChange={setSelected1}
        />
        <Radio
          label="Selected"
          checked={selected2}
          onChange={setSelected2}
        />
      </DemoRow>
      <DemoRow label="Disabled">
        <Radio disabled />
        <Radio disabled checked />
      </DemoRow>
      <DemoRow label="Disabled with Label">
        <Radio disabled label="Disabled unselected" />
        <Radio disabled checked label="Disabled selected" />
      </DemoRow>
      <DemoRow label="Radio Group (Vertical)">
        <RadioGroup
          options={radioOptions}
          value={groupValue}
          onChange={setGroupValue}
          name="demo-group-v"
        />
      </DemoRow>
      <DemoRow label="Radio Group (Horizontal)">
        <RadioGroup
          options={radioOptions}
          value={groupValue}
          onChange={setGroupValue}
          name="demo-group-h"
          orientation="horizontal"
        />
      </DemoRow>
    </>
  );
}

function StatusDemo() {
  return (
    <>
      <DemoRow label="All Variants">
        <Status status="enabled" />
        <Status status="disabled" />
        <Status status="success" />
        <Status status="fail" />
        <Status status="error" />
        <Status status="warning" />
      </DemoRow>
      <DemoRow label="Positive">
        <Status status="enabled" />
        <Status status="success" />
      </DemoRow>
      <DemoRow label="Negative">
        <Status status="disabled" />
        <Status status="fail" />
        <Status status="error" />
      </DemoRow>
      <DemoRow label="Caution">
        <Status status="warning" />
      </DemoRow>
    </>
  );
}

function LogoDemo() {
  return (
    <>
      <DemoRow label="Full (Default)">
        <Logo variant="full" size="sm" />
        <Logo variant="full" size="md" />
        <Logo variant="full" size="lg" />
      </DemoRow>
      <DemoRow label="Icon Only">
        <Logo variant="icon" size="sm" />
        <Logo variant="icon" size="md" />
        <Logo variant="icon" size="lg" />
      </DemoRow>
    </>
  );
}

function MapNodeDemo() {
  return (
    <>
      <DemoRow label="Square Node - Sizes">
        <MapSquareNode size="large" colorTheme="orange" label="Large" subLabel="56px node" icon={mapNodeComputeIcon} />
        <MapSquareNode size="medium" colorTheme="orange" label="Medium" subLabel="40px node" icon={mapNodeComputeIcon} />
        <MapSquareNode size="small" colorTheme="orange" label="Small" subLabel="24px" icon={mapNodeComputeIcon} />
      </DemoRow>
      <DemoRow label="Square Node - States">
        <MapSquareNode size="large" colorTheme="orange" state="default" label="Default" icon={mapNodeComputeIcon} counter={8} />
        <MapSquareNode size="large" colorTheme="orange" state="hover" label="Hover" icon={mapNodeComputeIcon} />
        <MapSquareNode size="large" colorTheme="orange" state="selected" label="Selected" icon={mapNodeComputeIcon} counter={8} />
        <MapSquareNode size="large" colorTheme="orange" state="focused" label="Focused" icon={mapNodeComputeIcon} counter={8} />
      </DemoRow>
      <DemoRow label="Square Node - With Glyphs">
        <MapSquareNode size="large" colorTheme="blue" label="With Status" icon={mapNodeComputeIcon} showStatus counter={5} />
        <MapSquareNode size="large" colorTheme="green" label="With Tag" icon={mapNodeComputeIcon} tagIcon={mapNodeVendorIcon} counter={3} />
        <MapSquareNode size="large" colorTheme="purple" label="With Provider" icon={mapNodeComputeIcon} providerIcon={mapNodeAwsIcon} counter={2} />
      </DemoRow>
      <DemoRow label="Circle Node - Sizes">
        <MapCircleNode size="large" colorTheme="rose" label="Large" subLabel="56px node" icon={mapNodeUserIcon} />
        <MapCircleNode size="medium" colorTheme="rose" label="Medium" subLabel="40px node" icon={mapNodeUserIcon} />
        <MapCircleNode size="small" colorTheme="rose" label="Small" subLabel="24px" icon={mapNodeUserIcon} />
      </DemoRow>
      <DemoRow label="Circle Node - States">
        <MapCircleNode size="large" colorTheme="rose" state="default" label="Default" icon={mapNodeUserIcon} counter={8} />
        <MapCircleNode size="large" colorTheme="rose" state="hover" label="Hover" icon={mapNodeUserIcon} />
        <MapCircleNode size="large" colorTheme="rose" state="selected" label="Selected" icon={mapNodeUserIcon} counter={8} />
        <MapCircleNode size="large" colorTheme="rose" state="focused" label="Focused" icon={mapNodeUserIcon} counter={8} />
      </DemoRow>
      <DemoRow label="Circle Node - With Glyphs">
        <MapCircleNode size="large" colorTheme="blue" label="With Status" icon={mapNodeUserIcon} showStatus counter={5} />
        <MapCircleNode size="large" colorTheme="green" label="With Tag" icon={mapNodeUserIcon} tagIcon={mapNodeVendorIcon} counter={3} />
        <MapCircleNode size="large" colorTheme="purple" label="With Provider" icon={mapNodeUserIcon} providerIcon={mapNodeAwsIcon} counter={2} />
      </DemoRow>
      <DemoRow label="Color Themes">
        <MapSquareNode size="medium" colorTheme="orange" label="Orange" icon={mapNodeComputeIcon} />
        <MapSquareNode size="medium" colorTheme="blue" label="Blue" icon={mapNodeComputeIcon} />
        <MapSquareNode size="medium" colorTheme="green" label="Green" icon={mapNodeComputeIcon} />
        <MapSquareNode size="medium" colorTheme="purple" label="Purple" icon={mapNodeComputeIcon} />
        <MapSquareNode size="medium" colorTheme="red" label="Red" icon={mapNodeComputeIcon} />
        <MapSquareNode size="medium" colorTheme="gray" label="Gray" icon={mapNodeComputeIcon} />
      </DemoRow>
    </>
  );
}

function CardDemo() {
  return (
    <div className="demo-cards">
      <Card>
        {/* Empty card - no padding by default */}
      </Card>
      <Card>
        <div style={{ padding: "16px 12px" }}>
          <p style={{ margin: 0 }}>Card with padded content (16px top/bottom, 12px left/right)</p>
        </div>
      </Card>
    </div>
  );
}

function BreadcrumbDemo() {
  return (
    <>
      <DemoRow label="With Icons">
        <Breadcrumb items={[
          { label: "Home", href: "/", icon: <DazzleIcons.Grid variant="linear" size={16} /> },
          { label: "Products", href: "/products", icon: <DazzleIcons.Grid variant="linear" size={16} /> },
          { label: "Category", icon: <DazzleIcons.Grid variant="linear" size={16} /> },
        ]} />
      </DemoRow>
      <DemoRow label="Text Only">
        <Breadcrumb items={[
          { label: "Dashboard", href: "/" },
          { label: "Settings", href: "/settings" },
          { label: "Profile" },
        ]} />
      </DemoRow>
    </>
  );
}

function GlobalSearchInputDemo() {
  return (
    <>
      <DemoRow label="Default">
        <GlobalSearchInput placeholder="Search components..." />
      </DemoRow>
      <DemoRow label="With Callback">
        <GlobalSearchInput placeholder="Press Enter to search" onSearch={(v: string) => alert(`Searching: ${v}`)} />
      </DemoRow>
    </>
  );
}

function HeaderDemo() {
  return (
    <div className="demo-header-preview">
      <Header
        breadcrumbs={[
          { label: "Home", href: "#", icon: <DazzleIcons.Grid variant="linear" size={16} /> },
          { label: "Components" },
        ]}
        title="Page Title"
        titleIcon={<DazzleIcons.DiamondXmark variant="solid" size={24} />}
        showInfoButton
        user={{ firstName: "John", lastName: "Doe", avatarUrl: "https://i.pravatar.cc/40" }}
        iconButtons={[
          { icon: <DazzleIcons.WhatsNew variant="linear" size={20} />, ariaLabel: "What's New" },
          { icon: <DazzleIcons.CircleQuestion variant="linear" size={20} />, ariaLabel: "Help" },
        ]}
        showCoPilot
      />
    </div>
  );
}

function SideNavDemo() {
  return (
    <>
      <DemoRow label="Item Levels">
        <div className="demo-sidenav-items">
          <div className="demo-sidenav-item-group">
            <span className="demo-sidenav-item-label">1st Level</span>
            <SideNav>
              <SideNavSection>
                <SideNavItem icon={<DazzleIcons.Grid variant="linear" size={16} />} level={1}>Default</SideNavItem>
                <SideNavItem icon={<DazzleIcons.Grid variant="linear" size={16} />} level={1} active>Selected</SideNavItem>
              </SideNavSection>
            </SideNav>
          </div>
          <div className="demo-sidenav-item-group">
            <span className="demo-sidenav-item-label">2nd Level</span>
            <SideNav>
              <SideNavSection>
                <SideNavItem icon={<DazzleIcons.Grid variant="linear" size={16} />} level={2}>Default</SideNavItem>
                <SideNavItem icon={<DazzleIcons.Grid variant="linear" size={16} />} level={2} active>Selected</SideNavItem>
              </SideNavSection>
            </SideNav>
          </div>
          <div className="demo-sidenav-item-group">
            <span className="demo-sidenav-item-label">3rd Level</span>
            <SideNav>
              <SideNavSection>
                <SideNavSubItem>Default</SideNavSubItem>
                <SideNavSubItem active>Selected</SideNavSubItem>
              </SideNavSection>
            </SideNav>
          </div>
        </div>
      </DemoRow>
      <DemoRow label="3rd Level Expandable">
        <div className="demo-sidenav">
          <SideNav logo={<span style={{ fontWeight: 600, fontSize: '16px' }}>Logo</span>}>
            <SideNavSection title="Nested Navigation">
              <SideNavItem icon={<DazzleIcons.Grid variant="linear" size={16} />} level={1} expandable defaultExpanded>
                Settings
                <SideNavSubItem expandable defaultExpanded>
                  Account
                  <SideNavSubItem active>Profile</SideNavSubItem>
                  <SideNavSubItem>Preferences</SideNavSubItem>
                </SideNavSubItem>
                <SideNavSubItem>Security</SideNavSubItem>
              </SideNavItem>
            </SideNavSection>
          </SideNav>
        </div>
      </DemoRow>
      <DemoRow label="Full Example">
        <div className="demo-sidenav">
          <SideNav logo={<span style={{ fontWeight: 600, fontSize: '16px' }}>Logo</span>}>
            <SideNavSection title="Main">
              <SideNavItem icon={<DazzleIcons.Grid variant="linear" size={16} />} level={1} active>Dashboard</SideNavItem>
              <SideNavItem icon={<DazzleIcons.Grid variant="linear" size={16} />} level={1}>Components</SideNavItem>
            </SideNavSection>
            <SideNavDivider />
            <SideNavSection title="Settings" collapsible defaultExpanded>
              <SideNavItem icon={<DazzleIcons.Grid variant="linear" size={16} />} level={1} expandable defaultExpanded>
                Account
                <SideNavSubItem active>Profile</SideNavSubItem>
                <SideNavSubItem>Security</SideNavSubItem>
              </SideNavItem>
            </SideNavSection>
            <SideNavFooter>
              <SideNavItem icon={<DazzleIcons.Grid variant="linear" size={16} />} level={1}>Help</SideNavItem>
            </SideNavFooter>
          </SideNav>
        </div>
      </DemoRow>
    </>
  );
}

function WidgetDemo() {
  return (
    <>
      <DemoRow label="Grid Sizes">
        <div className="demo-widgets">
          <WidgetContainer title="1x1 Widget" size="1x1">
            <WidgetStat label="Active Users" value="1,234" change="+12%" changeType="positive" />
          </WidgetContainer>
          <WidgetContainer title="2x1 Widget" size="2x1">
            <div style={{ display: 'flex', gap: '24px' }}>
              <WidgetStat label="Revenue" value="$45.2K" change="+8.5%" changeType="positive" />
              <WidgetStat label="Orders" value="892" change="-2.3%" changeType="negative" />
            </div>
          </WidgetContainer>
        </div>
      </DemoRow>
      <DemoRow label="Loading State">
        <WidgetContainer title="Loading Widget" size="1x1" loading />
      </DemoRow>
    </>
  );
}

const FolderIcon = () => <Icon name="folder" size={20} />;
const SettingsIcon = () => <Icon name="gear" size={20} />;

function AccordionDemo() {
  const accordionItems = [
    {
      id: 'item-1',
      title: 'Getting Started',
      content: 'Learn how to set up and configure your development environment. This section covers installation, basic configuration, and your first steps.',
      counter: 3,
      icon: <FolderIcon />,
    },
    {
      id: 'item-2',
      title: 'Configuration',
      content: 'Explore advanced configuration options to customize the behavior of your application. Includes settings for themes, localization, and more.',
      counter: 5,
      icon: <SettingsIcon />,
    },
    {
      id: 'item-3',
      title: 'API Reference',
      content: 'Comprehensive API documentation with examples, type definitions, and best practices for integrating with external services.',
      defaultExpanded: true,
    },
  ];

  return (
    <>
      <DemoRow label="Single Accordion">
        <div style={{ width: '100%', maxWidth: '500px' }}>
          <Accordion title="Getting Started" counter={3} defaultExpanded>
            A single standalone accordion component that can be used independently.
          </Accordion>
        </div>
      </DemoRow>
      <DemoRow label="Data-Driven (Items Array)">
        <div style={{ width: '100%', maxWidth: '500px' }}>
          <DataAccordion items={accordionItems} />
        </div>
      </DemoRow>
      <DemoRow label="Allow Multiple">
        <div style={{ width: '100%', maxWidth: '500px' }}>
          <DataAccordion items={accordionItems} allowMultiple />
        </div>
      </DemoRow>
      <DemoRow label="Using AccordionGroup">
        <div style={{ width: '100%', maxWidth: '500px' }}>
          <AccordionGroup allowMultiple>
            <AccordionGroupItem id="panel-1" title="Panel 1" counter={2}>
              This is the content for panel 1. It can contain any React content.
            </AccordionGroupItem>
            <AccordionGroupItem id="panel-2" title="Panel 2" icon={<FolderIcon />} defaultExpanded>
              This panel is expanded by default and has an icon.
            </AccordionGroupItem>
            <AccordionGroupItem id="panel-3" title="Panel 3">
              Simple panel without icon or counter.
            </AccordionGroupItem>
          </AccordionGroup>
        </div>
      </DemoRow>
    </>
  );
}

function VideoBannerDemo() {
  return (
    <>
      <DemoRow label="Default">
        <div style={{ width: '100%', maxWidth: '900px' }}>
          <VideoBanner
            header="Learn More about Insights"
            description="Porem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."
            buttonText="Learn More"
            videoDuration="0:52"
            onButtonClick={() => alert('Learn More clicked')}
            onVideoClick={() => alert('Video clicked')}
          />
        </div>
      </DemoRow>
      <DemoRow label="Custom Content">
        <div style={{ width: '100%', maxWidth: '900px' }}>
          <VideoBanner
            header="Getting Started with Components"
            description="Watch this quick tutorial to learn how to use our design system components effectively in your projects."
            buttonText="View Tutorial"
            videoDuration="3:24"
          />
        </div>
      </DemoRow>
    </>
  );
}

const ShieldIcon = () => <Icon name="shield" size={16} />;
const CloudIcon = () => <Icon name="cloud" size={16} />;
const RocketIcon = () => <Icon name="rocket" size={16} />;

function OptionCardDemo() {
  const [selectedCheckbox, setSelectedCheckbox] = useState<string | null>(null);
  const [selectedRadio, setSelectedRadio] = useState<string | null>('option1');

  return (
    <>
      <DemoRow label="Checkbox Style">
        <div style={{ width: '100%', maxWidth: '500px' }}>
          <OptionCardGroup>
            <OptionCard
              title="Basic Plan"
              description="Perfect for individuals and small projects"
              icon={<ShieldIcon />}
              selected={selectedCheckbox === 'basic'}
              selectionType="checkbox"
              onChange={() => setSelectedCheckbox(selectedCheckbox === 'basic' ? null : 'basic')}
            />
            <OptionCard
              title="Pro Plan"
              description="Advanced features for growing teams"
              icon={<CloudIcon />}
              selected={selectedCheckbox === 'pro'}
              selectionType="checkbox"
              onChange={() => setSelectedCheckbox(selectedCheckbox === 'pro' ? null : 'pro')}
            />
            <OptionCard
              title="Enterprise Plan"
              description="Custom solutions for large organizations"
              icon={<RocketIcon />}
              selected={selectedCheckbox === 'enterprise'}
              selectionType="checkbox"
              onChange={() => setSelectedCheckbox(selectedCheckbox === 'enterprise' ? null : 'enterprise')}
            />
          </OptionCardGroup>
        </div>
      </DemoRow>
      <DemoRow label="Radio Style">
        <div style={{ width: '100%', maxWidth: '500px' }}>
          <OptionCardGroup>
            <OptionCard
              title="Option One"
              description="This is the first option you can select"
              selectionType="radio"
              selected={selectedRadio === 'option1'}
              onChange={() => setSelectedRadio('option1')}
            />
            <OptionCard
              title="Option Two"
              description="This is the second option available"
              selectionType="radio"
              selected={selectedRadio === 'option2'}
              onChange={() => setSelectedRadio('option2')}
            />
          </OptionCardGroup>
        </div>
      </DemoRow>
      <DemoRow label="States">
        <div style={{ width: '100%', maxWidth: '500px' }}>
          <OptionCardGroup>
            <OptionCard
              title="Default State"
              description="This card is in its default state"
            />
            <OptionCard
              title="Selected State"
              description="This card is selected"
              selected
            />
            <OptionCard
              title="Disabled State"
              description="This card is disabled"
              disabled
            />
            <OptionCard
              title="Disabled + Selected"
              description="This card is both disabled and selected"
              selected
              disabled
            />
          </OptionCardGroup>
        </div>
      </DemoRow>
    </>
  );
}

function OptionSelectorDemo() {
  const [singleValue, setSingleValue] = useState<string>('');
  const [multiValue, setMultiValue] = useState<string[]>([]);

  const options = [
    { id: 'option1', label: 'Option 1' },
    { id: 'option2', label: 'Option 2' },
    { id: 'option3', label: 'Option 3' },
    { id: 'option4', label: 'Option 4' },
    { id: 'option5', label: 'Option 5' },
  ];

  const optionsWithIcons = [
    { id: 'aws', label: 'AWS', icon: <CloudIcon /> },
    { id: 'azure', label: 'Azure', icon: <CloudIcon /> },
    { id: 'gcp', label: 'Google Cloud', icon: <CloudIcon /> },
  ];

  const optionsWithDescriptions = [
    { id: 'basic', label: 'Basic Plan', description: 'For individuals and small projects' },
    { id: 'pro', label: 'Pro Plan', description: 'Advanced features for teams' },
    { id: 'enterprise', label: 'Enterprise', description: 'Custom solutions for organizations' },
  ];

  return (
    <>
      <DemoRow label="Default">
        <div style={{ width: '250px' }}>
          <OptionSelector
            options={options}
            value={singleValue}
            onChange={(val) => setSingleValue(val as string)}
            placeholder="Select an option"
          />
        </div>
      </DemoRow>
      <DemoRow label="With Label">
        <div style={{ width: '250px' }}>
          <OptionSelector
            label="Choose Option"
            options={options}
            value={singleValue}
            onChange={(val) => setSingleValue(val as string)}
            placeholder="Select an option"
          />
        </div>
      </DemoRow>
      <DemoRow label="With Icons">
        <div style={{ width: '250px' }}>
          <OptionSelector
            label="Cloud Provider"
            options={optionsWithIcons}
            placeholder="Select provider"
          />
        </div>
      </DemoRow>
      <DemoRow label="With Descriptions">
        <div style={{ width: '300px' }}>
          <OptionSelector
            label="Select Plan"
            options={optionsWithDescriptions}
            placeholder="Choose a plan"
          />
        </div>
      </DemoRow>
      <DemoRow label="Multi-Select with Checkboxes">
        <div style={{ width: '250px' }}>
          <OptionSelector
            label="Select Multiple"
            options={options}
            value={multiValue}
            onChange={(val) => setMultiValue(val as string[])}
            placeholder="Select options"
            multiSelect
            showCheckboxes
          />
        </div>
      </DemoRow>
      <DemoRow label="Error State">
        <div style={{ width: '250px' }}>
          <OptionSelector
            label="Required Field"
            options={options}
            placeholder="Select an option"
            error="This field is required"
            required
          />
        </div>
      </DemoRow>
      <DemoRow label="Disabled">
        <div style={{ width: '250px' }}>
          <OptionSelector
            label="Disabled Field"
            options={options}
            placeholder="Select an option"
            disabled
          />
        </div>
      </DemoRow>
    </>
  );
}

function DatePickerDemo() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(new Date());

  return (
    <>
      <DemoRow label="Default">
        <DatePicker
          value={selectedDate}
          onChange={setSelectedDate}
        />
      </DemoRow>
      <DemoRow label="With Time Picker">
        <DatePicker
          value={selectedDateTime}
          onChange={setSelectedDateTime}
          showTimePicker
        />
      </DemoRow>
      <DemoRow label="Selected Date">
        <div style={{ fontSize: '14px', color: 'var(--lightning-bluegray-700)' }}>
          {selectedDate ? selectedDate.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }) : 'No date selected'}
        </div>
      </DemoRow>
    </>
  );
}

function FilterMenuDemo() {
  const [selectedCategory, setSelectedCategory] = useState('os');
  const [selectedOperator, setSelectedOperator] = useState('eq');
  const [selectedValue, setSelectedValue] = useState('');

  const categories = [
    { id: 'os', label: 'Operating System' },
    { id: 'region', label: 'Region' },
    { id: 'status', label: 'Status' },
    { id: 'env', label: 'Environment' },
  ];

  const operators = [
    { id: 'eq', label: '=' },
    { id: 'neq', label: '!=' },
    { id: 'contains', label: 'contains' },
  ];

  const values = [
    { id: 'windows', label: 'Windows 11', category: 'Desktop' },
    { id: 'macos', label: 'macOS Sonoma', category: 'Desktop' },
    { id: 'ubuntu', label: 'Ubuntu 24.04', category: 'Linux' },
    { id: 'rhel', label: 'RHEL 9', category: 'Linux' },
    { id: 'centos', label: 'CentOS Stream', category: 'Linux' },
  ];

  const handleClear = () => {
    setSelectedCategory('os');
    setSelectedOperator('eq');
    setSelectedValue('');
  };

  const handleRunQuery = () => {
    alert(`Query: ${selectedCategory} ${selectedOperator} ${selectedValue || '(no value)'}`);
  };

  return (
    <>
      <DemoRow label="Default">
        <FilterMenu
          categories={categories}
          operators={operators}
          values={values}
          selectedCategory={selectedCategory}
          selectedOperator={selectedOperator}
          selectedValue={selectedValue}
          onCategoryChange={setSelectedCategory}
          onOperatorChange={setSelectedOperator}
          onValueChange={setSelectedValue}
          onClear={handleClear}
          onRunQuery={handleRunQuery}
        />
      </DemoRow>
      <DemoRow label="Current Selection">
        <div style={{ fontSize: '14px', color: 'var(--lightning-bluegray-700)' }}>
          <strong>Category:</strong> {categories.find(c => c.id === selectedCategory)?.label || 'None'}<br />
          <strong>Operator:</strong> {operators.find(o => o.id === selectedOperator)?.label || 'None'}<br />
          <strong>Value:</strong> {values.find(v => v.id === selectedValue)?.label || 'None selected'}
        </div>
      </DemoRow>
    </>
  );
}

function ModalDemo() {
  const [smallOpen, setSmallOpen] = useState(false);
  const [mediumOpen, setMediumOpen] = useState(false);
  const [largeOpen, setLargeOpen] = useState(false);
  const [xlargeOpen, setXlargeOpen] = useState(false);

  return (
    <>
      <DemoRow label="Sizes">
        <Button onClick={() => setSmallOpen(true)}>Small (400px)</Button>
        <Button onClick={() => setMediumOpen(true)}>Medium (500px)</Button>
        <Button onClick={() => setLargeOpen(true)}>Large (800px)</Button>
        <Button onClick={() => setXlargeOpen(true)}>XLarge (1100px)</Button>
      </DemoRow>

      <Modal isOpen={smallOpen} onClose={() => setSmallOpen(false)} size="small">
        <ModalHeader title="Small Modal" subtitle="This is a subtitle" onClose={() => setSmallOpen(false)} />
        <ModalBody>
          <p>This is a small modal with 400px width. It&apos;s perfect for simple confirmations or short forms.</p>
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary-outlined" onClick={() => setSmallOpen(false)}>Cancel</Button>
          <Button onClick={() => setSmallOpen(false)}>Confirm</Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={mediumOpen} onClose={() => setMediumOpen(false)} size="medium">
        <ModalHeader title="Medium Modal" subtitle="Default size for most use cases" onClose={() => setMediumOpen(false)} />
        <ModalBody>
          <p>This is a medium modal with 500px width. It works well for forms, settings panels, and content that needs a bit more space.</p>
          <p style={{ marginTop: '16px' }}>You can close this modal by:</p>
          <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
            <li>Clicking the X button</li>
            <li>Pressing the Escape key</li>
            <li>Clicking outside the modal</li>
          </ul>
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary-outlined" onClick={() => setMediumOpen(false)}>Cancel</Button>
          <Button onClick={() => setMediumOpen(false)}>Done</Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={largeOpen} onClose={() => setLargeOpen(false)} size="large">
        <ModalHeader title="Large Modal" subtitle="For complex content and data tables" onClose={() => setLargeOpen(false)} />
        <ModalBody>
          <p>This is a large modal with 800px width. Use it for:</p>
          <ul style={{ marginTop: '12px', paddingLeft: '20px' }}>
            <li>Data tables and grids</li>
            <li>Complex forms with multiple sections</li>
            <li>Preview panels</li>
            <li>Comparison views</li>
          </ul>
          <div style={{ marginTop: '20px', padding: '16px', backgroundColor: 'var(--lightning-gray-50)', borderRadius: '8px' }}>
            <p style={{ margin: 0, color: 'var(--lightning-bluegray-600)' }}>
              This area could contain a data table, form fields, or other complex content that benefits from the additional width.
            </p>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary-outlined" onClick={() => setLargeOpen(false)}>Cancel</Button>
          <Button onClick={() => setLargeOpen(false)}>Save Changes</Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={xlargeOpen} onClose={() => setXlargeOpen(false)} size="xlarge">
        <ModalHeader title="Extra Large Modal" subtitle="Maximum width for rich content experiences" onClose={() => setXlargeOpen(false)} />
        <ModalBody>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div>
              <h4 style={{ margin: '0 0 12px 0' }}>Left Column</h4>
              <p>The extra large modal at 1100px provides maximum space for complex interfaces like:</p>
              <ul style={{ marginTop: '12px', paddingLeft: '20px' }}>
                <li>Side-by-side comparisons</li>
                <li>Multi-column layouts</li>
                <li>Rich media galleries</li>
                <li>Dashboard-like views</li>
              </ul>
            </div>
            <div>
              <h4 style={{ margin: '0 0 12px 0' }}>Right Column</h4>
              <div style={{ padding: '16px', backgroundColor: 'var(--lightning-blue-50)', borderRadius: '8px', height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: 'var(--lightning-blue-600)' }}>Content Area</span>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary-outlined" onClick={() => setXlargeOpen(false)}>Cancel</Button>
          <Button onClick={() => setXlargeOpen(false)}>Apply</Button>
        </ModalFooter>
      </Modal>

      <DemoRow label="Info">
        <div style={{ fontSize: '14px', color: 'var(--lightning-bluegray-600)' }}>
          Click a button above to open the modal. Modals support ESC to close, overlay click, and focus trapping.
        </div>
      </DemoRow>
    </>
  );
}

function NotificationBannerDemo() {
  return (
    <>
      <DemoRow label="Info">
        <div style={{ width: '100%' }}>
          <NotificationBanner
            status="info"
            title="Title"
            description="This is an informational message to keep you updated."
            linkText="Link"
            onLinkClick={() => alert('Link clicked')}
            buttonText="Button"
            onButtonClick={() => alert('Button clicked')}
            onClose={() => alert('Close clicked')}
          />
        </div>
      </DemoRow>
      <DemoRow label="Success">
        <div style={{ width: '100%' }}>
          <NotificationBanner
            status="success"
            title="Success"
            description="Your changes have been saved successfully."
            linkText="View Details"
            onLinkClick={() => alert('View Details clicked')}
            buttonText="Done"
            onButtonClick={() => alert('Done clicked')}
            onClose={() => alert('Close clicked')}
          />
        </div>
      </DemoRow>
      <DemoRow label="Warning">
        <div style={{ width: '100%' }}>
          <NotificationBanner
            status="warning"
            title="Warning"
            description="Please review your settings before proceeding."
            linkText="Learn More"
            onLinkClick={() => alert('Learn More clicked')}
            buttonText="Review"
            onButtonClick={() => alert('Review clicked')}
            onClose={() => alert('Close clicked')}
          />
        </div>
      </DemoRow>
      <DemoRow label="Error">
        <div style={{ width: '100%' }}>
          <NotificationBanner
            status="error"
            title="Error"
            description="Something went wrong. Please try again later."
            linkText="Get Help"
            onLinkClick={() => alert('Get Help clicked')}
            buttonText="Retry"
            onButtonClick={() => alert('Retry clicked')}
            onClose={() => alert('Close clicked')}
          />
        </div>
      </DemoRow>
      <DemoRow label="Neutral">
        <div style={{ width: '100%' }}>
          <NotificationBanner
            status="neutral"
            title="Note"
            description="This is a neutral notification without urgency."
            linkText="Details"
            onLinkClick={() => alert('Details clicked')}
            buttonText="Dismiss"
            onButtonClick={() => alert('Dismiss clicked')}
            onClose={() => alert('Close clicked')}
          />
        </div>
      </DemoRow>
      <DemoRow label="Read Only">
        <div style={{ width: '100%' }}>
          <NotificationBanner
            status="readonly"
            title="Locked"
            description="This record is locked and cannot be edited."
            linkText="Link"
            onLinkClick={() => alert('Link clicked')}
            buttonText="Button"
            onButtonClick={() => alert('Button clicked')}
            onClose={() => alert('Close clicked')}
          />
        </div>
      </DemoRow>
      <DemoRow label="Minimal">
        <div style={{ width: '100%' }}>
          <NotificationBanner
            status="info"
            description="A simple notification with just a description and close button."
            showTitle={false}
            onClose={() => alert('Close clicked')}
          />
        </div>
      </DemoRow>
    </>
  );
}

function PillDemo() {
  const [pills, setPills] = useState(['Location 1', 'Location 2', 'Location 3']);

  const removePill = (index: number) => {
    setPills(pills.filter((_, i) => i !== index));
  };

  const resetPills = () => {
    setPills(['Location 1', 'Location 2', 'Location 3']);
  };

  return (
    <>
      <DemoRow label="Variants">
        <PillGroup>
          <Pill variant="default" onClose={() => {}}>Default</Pill>
          <Pill variant="new" onClose={() => {}}>New</Pill>
          <Pill variant="warning" onClose={() => {}}>Warning</Pill>
          <Pill variant="error" onClose={() => {}}>Error</Pill>
          <Pill variant="deleted" onClose={() => {}}>Deleted</Pill>
        </PillGroup>
      </DemoRow>
      <DemoRow label="Without Icon">
        <PillGroup>
          <Pill variant="default" icon={null} onClose={() => {}}>No Icon</Pill>
          <Pill variant="new" icon={null} onClose={() => {}}>No Icon</Pill>
          <Pill variant="warning" icon={null} onClose={() => {}}>No Icon</Pill>
        </PillGroup>
      </DemoRow>
      <DemoRow label="Without Close">
        <PillGroup>
          <Pill variant="default" showCloseButton={false}>Read Only</Pill>
          <Pill variant="new" showCloseButton={false}>Read Only</Pill>
          <Pill variant="warning" showCloseButton={false}>Read Only</Pill>
        </PillGroup>
      </DemoRow>
      <DemoRow label="Clickable">
        <PillGroup>
          <Pill variant="default" onClick={() => alert('Clicked!')} onClose={() => alert('Close clicked')}>Click Me</Pill>
          <Pill variant="new" onClick={() => alert('Clicked!')} showCloseButton={false}>Click Me</Pill>
        </PillGroup>
      </DemoRow>
      <DemoRow label="Disabled">
        <PillGroup>
          <Pill variant="default" disabled onClose={() => {}}>Disabled</Pill>
          <Pill variant="new" disabled onClose={() => {}}>Disabled</Pill>
        </PillGroup>
      </DemoRow>
      <DemoRow label="Interactive">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <PillGroup>
            {pills.map((pill, index) => (
              <Pill key={index} variant="default" onClose={() => removePill(index)}>
                {pill}
              </Pill>
            ))}
          </PillGroup>
          {pills.length === 0 && (
            <Button size="sm" onClick={resetPills}>Reset Pills</Button>
          )}
        </div>
      </DemoRow>
    </>
  );
}

function SelectorDemo() {
  const [singleValue, setSingleValue] = useState<string>('');
  const [multiValue, setMultiValue] = useState<string[]>([]);

  const sampleOptions = [
    { id: 'aws', label: 'AWS', icon: <CloudIcon />, category: 'Cloud' },
    { id: 'azure', label: 'Azure', icon: <CloudIcon />, category: 'Cloud' },
    { id: 'gcp', label: 'Google Cloud', icon: <CloudIcon />, category: 'Cloud' },
    { id: 'digitalocean', label: 'DigitalOcean', icon: <CloudIcon />, category: 'Cloud' },
    { id: 'heroku', label: 'Heroku', icon: <CloudIcon />, category: 'Platform' },
    { id: 'vercel', label: 'Vercel', icon: <CloudIcon />, category: 'Platform' },
    { id: 'netlify', label: 'Netlify', icon: <CloudIcon />, category: 'Platform' },
  ];

  const nestedOptions = [
    {
      id: 'cloud',
      label: 'Cloud Providers',
      icon: <CloudIcon />,
      children: [
        { id: 'aws', label: 'AWS', icon: <CloudIcon /> },
        { id: 'azure', label: 'Azure', icon: <CloudIcon /> },
        { id: 'gcp', label: 'Google Cloud', icon: <CloudIcon /> },
      ],
    },
    {
      id: 'platform',
      label: 'Platforms',
      icon: <CloudIcon />,
      children: [
        { id: 'heroku', label: 'Heroku', icon: <CloudIcon /> },
        { id: 'vercel', label: 'Vercel', icon: <CloudIcon /> },
      ],
    },
  ];

  return (
    <>
      <DemoRow label="Single Select">
        <Selector
          options={sampleOptions}
          value={singleValue}
          onChange={(val) => setSingleValue(val as string)}
          searchPlaceholder="Search providers..."
        />
      </DemoRow>
      <DemoRow label="Multi Select">
        <Selector
          options={sampleOptions}
          value={multiValue}
          onChange={(val) => setMultiValue(val as string[])}
          multiSelect
          searchPlaceholder="Search providers..."
          showSelectedPills
        />
      </DemoRow>
      <DemoRow label="With Actions">
        <Selector
          options={sampleOptions.slice(0, 4)}
          value={multiValue}
          onChange={(val) => setMultiValue(val as string[])}
          multiSelect
          actions={[
            { id: 'add', label: 'Add New Provider', onClick: () => alert('Add clicked') },
          ]}
        />
      </DemoRow>
      <DemoRow label="With Nested">
        <Selector
          options={nestedOptions}
          value={singleValue}
          onChange={(val) => setSingleValue(val as string)}
          searchPlaceholder="Search..."
        />
      </DemoRow>
      <DemoRow label="With Footer">
        <Selector
          options={sampleOptions}
          value={multiValue}
          onChange={(val) => setMultiValue(val as string[])}
          multiSelect
          showFooter
          onClear={() => setMultiValue([])}
          onApply={() => alert(`Applied: ${multiValue.join(', ')}`)}
        />
      </DemoRow>
    </>
  );
}

function SlideoutDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeAnchor, setActiveAnchor] = useState('details');

  const tabs = [
    { id: 'tab1', label: 'Account Details', closable: true },
    { id: 'tab2', label: 'Settings', closable: true },
  ];

  const anchors = [
    { id: 'details', label: 'Details' },
    { id: 'permissions', label: 'Permissions' },
    { id: 'history', label: 'History' },
  ];

  return (
    <>
      <DemoRow label="Basic Slideout">
        <Button onClick={() => setIsOpen(true)}>Open Slideout</Button>
        <Slideout
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          tabs={tabs}
          activeTabId="tab1"
          onTabChange={(id) => console.log('Tab changed:', id)}
          onTabClose={(id) => console.log('Tab closed:', id)}
          showTabNav
          canPrev={false}
          canNext={true}
        >
          <SlideoutHeader
            icon={<CloudIcon />}
            iconColor="blue"
            title="Account Record"
            titleHref="#"
            subtitle="Last modified: March 12, 2026"
            actions={
              <>
                <button className="ds-slideout__header-action" aria-label="Export">
                  <ExportIcon />
                </button>
                <button className="ds-slideout__header-action" aria-label="Refresh">
                  <RefreshIcon />
                </button>
                <button className="ds-slideout__header-action" aria-label="More">
                  <MoreIcon />
                </button>
              </>
            }
          />
          <SlideoutBody
            anchors={anchors}
            activeAnchorId={activeAnchor}
            onAnchorChange={setActiveAnchor}
          >
            <SlideoutSection
              id="details"
              title="Account Details"
              description="View and manage account information."
            >
              <div style={{ padding: '16px', background: 'var(--lightning-gray-50)', borderRadius: '8px' }}>
                <p style={{ margin: 0, color: 'var(--lightning-bluegray-700)' }}>Content slot for account details...</p>
              </div>
            </SlideoutSection>
            <SlideoutDivider />
            <SlideoutSection
              id="permissions"
              title="Permissions"
              description="Manage user access and permissions."
            >
              <div style={{ padding: '16px', background: 'var(--lightning-gray-50)', borderRadius: '8px' }}>
                <p style={{ margin: 0, color: 'var(--lightning-bluegray-700)' }}>Content slot for permissions...</p>
              </div>
            </SlideoutSection>
            <SlideoutDivider />
            <SlideoutSection
              id="history"
              title="History"
              description="View activity history."
            >
              <div style={{ padding: '16px', background: 'var(--lightning-gray-50)', borderRadius: '8px' }}>
                <p style={{ margin: 0, color: 'var(--lightning-bluegray-700)' }}>Content slot for history...</p>
              </div>
            </SlideoutSection>
          </SlideoutBody>
          <SlideoutFooter split>
            <SlideoutFooterGroup>
              <Button variant="primary-ghost" onClick={() => setIsOpen(false)}>Cancel</Button>
            </SlideoutFooterGroup>
            <SlideoutFooterGroup>
              <Button variant="primary" onClick={() => setIsOpen(false)}>Save Changes</Button>
            </SlideoutFooterGroup>
          </SlideoutFooter>
        </Slideout>
      </DemoRow>
      <DemoRow label="Sizes">
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button size="sm" onClick={() => alert('Open sm slideout')}>Small (480px)</Button>
          <Button size="sm" onClick={() => alert('Open md slideout')}>Medium (735px)</Button>
          <Button size="sm" onClick={() => alert('Open lg slideout')}>Large (960px)</Button>
          <Button size="sm" onClick={() => alert('Open xl slideout')}>XL (1200px)</Button>
        </div>
      </DemoRow>
    </>
  );
}

function SwitchDemo() {
  const [enabled1, setEnabled1] = useState(false);
  const [enabled2, setEnabled2] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <>
      <DemoRow label="Default (Large)">
        <Switch
          checked={enabled1}
          onChange={setEnabled1}
        />
        <Switch
          checked={enabled2}
          onChange={setEnabled2}
        />
      </DemoRow>
      <DemoRow label="Small">
        <Switch
          size="sm"
          checked={enabled1}
          onChange={setEnabled1}
        />
        <Switch
          size="sm"
          checked={enabled2}
          onChange={setEnabled2}
        />
      </DemoRow>
      <DemoRow label="With Label">
        <Switch
          checked={notifications}
          onChange={setNotifications}
          label="Enable notifications"
        />
      </DemoRow>
      <DemoRow label="Label Left">
        <Switch
          checked={darkMode}
          onChange={setDarkMode}
          label="Dark mode"
          labelPosition="left"
        />
      </DemoRow>
      <DemoRow label="Disabled">
        <Switch disabled checked={false} />
        <Switch disabled checked={true} />
        <Switch size="sm" disabled checked={false} />
        <Switch size="sm" disabled checked={true} />
      </DemoRow>
      <DemoRow label="With Label Disabled">
        <Switch
          disabled
          checked={true}
          label="Feature locked"
        />
      </DemoRow>
    </>
  );
}

function ToggleDemo() {
  const [activeTab, setActiveTab] = useState('tab1');
  const [viewMode, setViewMode] = useState('list');

  const basicOptions = [
    { id: 'tab1', label: 'Tab 1' },
    { id: 'tab2', label: 'Tab 2' },
  ];

  const threeOptions = [
    { id: 'all', label: 'All' },
    { id: 'active', label: 'Active' },
    { id: 'inactive', label: 'Inactive' },
  ];

  const viewOptions = [
    { id: 'list', label: 'List', icon: <ListIcon /> },
    { id: 'grid', label: 'Grid', icon: <GridIcon /> },
    { id: 'table', label: 'Table', icon: <TableIcon /> },
  ];

  const badgeOptions = [
    { id: 'all', label: 'All', badge: 42 },
    { id: 'pending', label: 'Pending', badge: 12 },
    { id: 'completed', label: 'Completed', badge: 30 },
  ];

  return (
    <>
      <DemoRow label="2 Options">
        <Toggle
          options={basicOptions}
          value={activeTab}
          onChange={setActiveTab}
        />
      </DemoRow>
      <DemoRow label="3 Options">
        <Toggle
          options={threeOptions}
          value={activeTab === 'tab1' ? 'all' : activeTab === 'tab2' ? 'active' : 'inactive'}
          onChange={(val) => setActiveTab(val === 'all' ? 'tab1' : val === 'active' ? 'tab2' : 'tab3')}
        />
      </DemoRow>
      <DemoRow label="With Icons">
        <Toggle
          options={viewOptions}
          value={viewMode}
          onChange={setViewMode}
        />
      </DemoRow>
      <DemoRow label="With Badges">
        <Toggle
          options={badgeOptions}
          value={activeTab === 'tab1' ? 'all' : activeTab === 'tab2' ? 'pending' : 'completed'}
          onChange={(val) => setActiveTab(val === 'all' ? 'tab1' : val === 'pending' ? 'tab2' : 'tab3')}
        />
      </DemoRow>
      <DemoRow label="Full Width">
        <div style={{ width: '100%', maxWidth: '400px' }}>
          <Toggle
            options={threeOptions}
            value={activeTab === 'tab1' ? 'all' : activeTab === 'tab2' ? 'active' : 'inactive'}
            onChange={(val) => setActiveTab(val === 'all' ? 'tab1' : val === 'active' ? 'tab2' : 'tab3')}
            fullWidth
          />
        </div>
      </DemoRow>
    </>
  );
}

function TabDemo() {
  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'details', label: 'Details' },
    { id: 'settings', label: 'Settings' },
  ];

  const tabsWithDisabled = [
    { id: 'active', label: 'Active' },
    { id: 'pending', label: 'Pending' },
    { id: 'archived', label: 'Archived', disabled: true },
  ];

  return (
    <>
      <DemoRow label="Primary">
        <Tabs variant="primary" defaultTab="overview">
          <TabList tabs={tabs} />
          <TabPanel tabId="overview">Overview content goes here.</TabPanel>
          <TabPanel tabId="details">Details content goes here.</TabPanel>
          <TabPanel tabId="settings">Settings content goes here.</TabPanel>
        </Tabs>
      </DemoRow>
      <DemoRow label="Secondary">
        <Tabs variant="secondary" defaultTab="overview">
          <TabList tabs={tabs} />
          <TabPanel tabId="overview">Overview content goes here.</TabPanel>
          <TabPanel tabId="details">Details content goes here.</TabPanel>
          <TabPanel tabId="settings">Settings content goes here.</TabPanel>
        </Tabs>
      </DemoRow>
      <DemoRow label="Tertiary">
        <Tabs variant="tertiary" defaultTab="overview">
          <TabList tabs={tabs} />
          <TabPanel tabId="overview">Overview content goes here.</TabPanel>
          <TabPanel tabId="details">Details content goes here.</TabPanel>
          <TabPanel tabId="settings">Settings content goes here.</TabPanel>
        </Tabs>
      </DemoRow>
      <DemoRow label="With Disabled Tab">
        <Tabs variant="primary" defaultTab="active">
          <TabList tabs={tabsWithDisabled} />
          <TabPanel tabId="active">Active items content.</TabPanel>
          <TabPanel tabId="pending">Pending items content.</TabPanel>
          <TabPanel tabId="archived">Archived items content.</TabPanel>
        </Tabs>
      </DemoRow>
    </>
  );
}

function ToastDemo() {
  return (
    <>
      <DemoRow label="Loading">
        <Toast
          type="loading"
          title="Toast Title"
          description="Toast Description"
          linkText="Toast Link"
          onLinkClick={() => alert('Link clicked')}
          onClose={() => {}}
        />
      </DemoRow>
      <DemoRow label="Success">
        <Toast
          type="success"
          title="Toast Title"
          description="Toast Description"
          linkText="Toast Link"
          onLinkClick={() => alert('Link clicked')}
          onClose={() => {}}
        />
      </DemoRow>
      <DemoRow label="Error">
        <Toast
          type="error"
          title="Toast Title"
          description="Toast Description"
          linkText="Toast Link"
          onLinkClick={() => alert('Link clicked')}
          onClose={() => {}}
        />
      </DemoRow>
      <DemoRow label="General">
        <Toast
          type="general"
          title="Toast Title"
          description="Toast Description"
          linkText="Toast Link"
          onLinkClick={() => alert('Link clicked')}
          onClose={() => {}}
        />
      </DemoRow>
      <DemoRow label="Title Only">
        <Toast
          type="success"
          title="Operation completed successfully"
          onClose={() => {}}
        />
      </DemoRow>
      <DemoRow label="No Close Button">
        <Toast
          type="loading"
          title="Processing..."
          description="Please wait while we process your request"
          showCloseButton={false}
        />
      </DemoRow>
    </>
  );
}

function TooltipDemo() {
  return (
    <>
      <DemoRow label="Top (default)">
        <Tooltip content="This is a helpful tooltip message">
          <Button variant="secondary-outlined">Hover me</Button>
        </Tooltip>
      </DemoRow>
      <DemoRow label="Bottom">
        <Tooltip content="Tooltip appears below the element" position="bottom">
          <Button variant="secondary-outlined">Hover me</Button>
        </Tooltip>
      </DemoRow>
      <DemoRow label="Left">
        <Tooltip content="Tooltip on the left" position="left">
          <Button variant="secondary-outlined">Hover me</Button>
        </Tooltip>
      </DemoRow>
      <DemoRow label="Right">
        <Tooltip content="Tooltip on the right" position="right">
          <Button variant="secondary-outlined">Hover me</Button>
        </Tooltip>
      </DemoRow>
      <DemoRow label="With Link">
        <Tooltip
          content={
            <>
              Click to learn more about this feature.{' '}
              <a href="#" className="ds-tooltip__link" onClick={(e) => e.preventDefault()}>
                Learn more
              </a>
            </>
          }
        >
          <Button variant="secondary-outlined">With Link</Button>
        </Tooltip>
      </DemoRow>
      <DemoRow label="Warning">
        <Tooltip content="This action cannot be undone" variant="warning">
          <Button variant="primary">Delete</Button>
        </Tooltip>
      </DemoRow>
      <DemoRow label="No Arrow">
        <Tooltip content="Tooltip without arrow" showArrow={false}>
          <Button variant="secondary-outlined">No Arrow</Button>
        </Tooltip>
      </DemoRow>
      <DemoRow label="With Delay">
        <Tooltip content="This tooltip appears after 500ms" delay={500}>
          <Button variant="secondary-outlined">Delayed</Button>
        </Tooltip>
      </DemoRow>
    </>
  );
}

function UserAvatarDemo() {
  return (
    <>
      <DemoRow label="With Image (sm)">
        <UserAvatar
          src="https://i.pravatar.cc/150?img=1"
          firstName="John"
          lastName="Doe"
          size="sm"
        />
      </DemoRow>
      <DemoRow label="With Image (md - default)">
        <UserAvatar
          src="https://i.pravatar.cc/150?img=2"
          firstName="Jane"
          lastName="Smith"
          size="md"
        />
      </DemoRow>
      <DemoRow label="With Image (lg)">
        <UserAvatar
          src="https://i.pravatar.cc/150?img=3"
          firstName="Alex"
          lastName="Johnson"
          size="lg"
        />
      </DemoRow>
      <DemoRow label="Initials from Name (sm)">
        <UserAvatar firstName="Aziz" lastName="Khilawala" size="sm" />
      </DemoRow>
      <DemoRow label="Initials from Name (md)">
        <UserAvatar firstName="Aziz" lastName="Khilawala" size="md" />
      </DemoRow>
      <DemoRow label="Initials from Name (lg)">
        <UserAvatar firstName="Aziz" lastName="Khilawala" size="lg" />
      </DemoRow>
      <DemoRow label="Direct Initials">
        <UserAvatar initials="JD" />
      </DemoRow>
      <DemoRow label="Multiple Avatars">
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <UserAvatar src="https://i.pravatar.cc/150?img=4" firstName="User" lastName="One" />
          <UserAvatar firstName="Bob" lastName="Wilson" />
          <UserAvatar src="https://i.pravatar.cc/150?img=5" firstName="User" lastName="Three" />
          <UserAvatar firstName="Carol" lastName="Davis" />
        </div>
      </DemoRow>
    </>
  );
}

// Color palette data
const COLOR_PALETTES = [
  { name: "Gray", prefix: "gray", shades: ["25", "50", "100", "200", "300", "400", "500", "600", "700", "800", "900"] },
  { name: "Blue", prefix: "blue", shades: ["25", "50", "75", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"] },
  { name: "Sky", prefix: "sky", shades: ["25", "50", "75", "100", "200", "300", "400", "500", "600", "700", "800", "900"] },
  { name: "Cyan", prefix: "cyan", shades: ["25", "50", "75", "100", "200", "300", "400", "500", "600", "700", "800", "900"] },
  { name: "Teal", prefix: "teal", shades: ["25", "50", "75", "100", "200", "300", "400", "500", "600", "700", "800", "900"] },
  { name: "Green", prefix: "green", shades: ["25", "50", "75", "100", "200", "300", "400", "500", "600", "700", "800", "900"] },
  { name: "Olive", prefix: "olive", shades: ["25", "50", "75", "100", "200", "300", "400", "500", "600", "700", "800", "900"] },
  { name: "Yellow", prefix: "yellow", shades: ["25", "50", "75", "100", "200", "300", "400", "500", "600", "700", "800", "900"] },
  { name: "Orange", prefix: "orange", shades: ["25", "50", "75", "100", "200", "300", "400", "500", "600", "700", "800", "900"] },
  { name: "Red", prefix: "red", shades: ["25", "50", "75", "100", "200", "300", "400", "500", "600", "700", "800", "900"] },
  { name: "Rose", prefix: "rose", shades: ["25", "50", "75", "100", "200", "300", "400", "500", "600", "700", "800", "900"] },
  { name: "Magenta", prefix: "magenta", shades: ["25", "50", "75", "100", "200", "300", "400", "500", "600", "700", "800", "900"] },
  { name: "Purple", prefix: "purple", shades: ["25", "50", "75", "100", "200", "300", "400", "500", "600", "700", "800", "900"] },
  { name: "Violet", prefix: "violet", shades: ["25", "50", "75", "100", "200", "300", "400", "500", "600", "700", "800", "900"] },
  { name: "Wisteria", prefix: "wisteria", shades: ["25", "50", "75", "100", "200", "300", "400", "500", "600", "700", "800", "900"] },
  { name: "Indigo", prefix: "indigo", shades: ["25", "50", "75", "100", "200", "300", "400", "500", "600", "700", "800", "900"] },
  { name: "BlueGray", prefix: "bluegray", shades: ["25", "50", "75", "100", "200", "300", "400", "500", "600", "700", "800", "900"] },
];

function ColorSwatch({ colorVar, shade }: { colorVar: string; shade: string }) {
  const isDark = parseInt(shade) >= 500;
  return (
    <div className="color-swatch" style={{ backgroundColor: `var(${colorVar})` }}>
      <span className="color-swatch__label" style={{ color: isDark ? "#fff" : "#1d2024" }}>
        {shade}
      </span>
    </div>
  );
}

function TypographyDemo() {
  return (
    <div className="typography-demo">
      {/* Font Families */}
      <section className="typography-section">
        <h3 className="typography-section__title">Font Families</h3>
        <div className="typography-samples">
          <div className="typography-sample">
            <span className="typography-sample__label">Default (Geist)</span>
            <p className="typography-sample__preview" style={{ fontFamily: 'var(--family-font-family-default)' }}>
              The quick brown fox jumps over the lazy dog
            </p>
          </div>
          <div className="typography-sample">
            <span className="typography-sample__label">Monospace (Geist Mono)</span>
            <p className="typography-sample__preview" style={{ fontFamily: 'var(--family-font-family-number)' }}>
              The quick brown fox jumps over the lazy dog
            </p>
          </div>
        </div>
      </section>

      {/* Display Sizes */}
      <section className="typography-section">
        <h3 className="typography-section__title">Display Sizes</h3>
        <div className="typography-scale">
          <div className="typography-scale-item">
            <span className="typography-scale-item__meta">Display LG - 40px</span>
            <p className="typography-scale-item__sample" style={{ fontSize: 'var(--font-size-display-lg)', fontWeight: 'var(--weight-semibold)' }}>
              Display Large
            </p>
          </div>
          <div className="typography-scale-item">
            <span className="typography-scale-item__meta">Display M - 32px</span>
            <p className="typography-scale-item__sample" style={{ fontSize: 'var(--font-size-display-m)', fontWeight: 'var(--weight-semibold)' }}>
              Display Medium
            </p>
          </div>
          <div className="typography-scale-item">
            <span className="typography-scale-item__meta">Display S - 24px</span>
            <p className="typography-scale-item__sample" style={{ fontSize: 'var(--font-size-display-s)', fontWeight: 'var(--weight-semibold)' }}>
              Display Small
            </p>
          </div>
          <div className="typography-scale-item">
            <span className="typography-scale-item__meta">Display XS - 20px</span>
            <p className="typography-scale-item__sample" style={{ fontSize: 'var(--font-size-display-xs)', fontWeight: 'var(--weight-semibold)' }}>
              Display Extra Small
            </p>
          </div>
        </div>
      </section>

      {/* Text Sizes */}
      <section className="typography-section">
        <h3 className="typography-section__title">Text Sizes</h3>
        <div className="typography-scale">
          <div className="typography-scale-item">
            <span className="typography-scale-item__meta">Text XL - 18px</span>
            <p className="typography-scale-item__sample" style={{ fontSize: 'var(--font-size-text-xl)' }}>
              Text Extra Large - The quick brown fox jumps over the lazy dog
            </p>
          </div>
          <div className="typography-scale-item">
            <span className="typography-scale-item__meta">Text LG - 16px</span>
            <p className="typography-scale-item__sample" style={{ fontSize: 'var(--font-size-text-lg)' }}>
              Text Large - The quick brown fox jumps over the lazy dog
            </p>
          </div>
          <div className="typography-scale-item">
            <span className="typography-scale-item__meta">Text M - 14px</span>
            <p className="typography-scale-item__sample" style={{ fontSize: 'var(--font-size-text-m)' }}>
              Text Medium - The quick brown fox jumps over the lazy dog
            </p>
          </div>
          <div className="typography-scale-item">
            <span className="typography-scale-item__meta">Text S - 13px</span>
            <p className="typography-scale-item__sample" style={{ fontSize: 'var(--font-size-text-s)' }}>
              Text Small - The quick brown fox jumps over the lazy dog
            </p>
          </div>
          <div className="typography-scale-item">
            <span className="typography-scale-item__meta">Text XS - 12px</span>
            <p className="typography-scale-item__sample" style={{ fontSize: 'var(--font-size-text-xs)' }}>
              Text Extra Small - The quick brown fox jumps over the lazy dog
            </p>
          </div>
        </div>
      </section>

      {/* Caption Sizes */}
      <section className="typography-section">
        <h3 className="typography-section__title">Caption Sizes</h3>
        <div className="typography-scale">
          <div className="typography-scale-item">
            <span className="typography-scale-item__meta">Caption S - 11px</span>
            <p className="typography-scale-item__sample" style={{ fontSize: 'var(--font-size-caption-s)' }}>
              Caption Small - The quick brown fox jumps over the lazy dog
            </p>
          </div>
          <div className="typography-scale-item">
            <span className="typography-scale-item__meta">Caption XS - 10px</span>
            <p className="typography-scale-item__sample" style={{ fontSize: 'var(--font-size-caption-xs)' }}>
              Caption Extra Small - The quick brown fox jumps over the lazy dog
            </p>
          </div>
        </div>
      </section>

      {/* Font Weights */}
      <section className="typography-section">
        <h3 className="typography-section__title">Font Weights</h3>
        <div className="typography-weights">
          <div className="typography-weight-item">
            <span className="typography-weight-item__meta">Thin - 100</span>
            <p className="typography-weight-item__sample" style={{ fontWeight: 'var(--weight-thin)' }}>
              The quick brown fox
            </p>
          </div>
          <div className="typography-weight-item">
            <span className="typography-weight-item__meta">Extra Light - 200</span>
            <p className="typography-weight-item__sample" style={{ fontWeight: 'var(--weight-extralight)' }}>
              The quick brown fox
            </p>
          </div>
          <div className="typography-weight-item">
            <span className="typography-weight-item__meta">Light - 300</span>
            <p className="typography-weight-item__sample" style={{ fontWeight: 'var(--weight-light)' }}>
              The quick brown fox
            </p>
          </div>
          <div className="typography-weight-item">
            <span className="typography-weight-item__meta">Regular - 400</span>
            <p className="typography-weight-item__sample" style={{ fontWeight: 'var(--weight-regular)' }}>
              The quick brown fox
            </p>
          </div>
          <div className="typography-weight-item">
            <span className="typography-weight-item__meta">Medium - 500</span>
            <p className="typography-weight-item__sample" style={{ fontWeight: 'var(--weight-medium)' }}>
              The quick brown fox
            </p>
          </div>
          <div className="typography-weight-item">
            <span className="typography-weight-item__meta">Semibold - 600</span>
            <p className="typography-weight-item__sample" style={{ fontWeight: 'var(--weight-semibold)' }}>
              The quick brown fox
            </p>
          </div>
          <div className="typography-weight-item">
            <span className="typography-weight-item__meta">Bold - 700</span>
            <p className="typography-weight-item__sample" style={{ fontWeight: 'var(--weight-bold)' }}>
              The quick brown fox
            </p>
          </div>
          <div className="typography-weight-item">
            <span className="typography-weight-item__meta">Extra Bold - 800</span>
            <p className="typography-weight-item__sample" style={{ fontWeight: 'var(--weight-extrabold)' }}>
              The quick brown fox
            </p>
          </div>
          <div className="typography-weight-item">
            <span className="typography-weight-item__meta">Black - 900</span>
            <p className="typography-weight-item__sample" style={{ fontWeight: 'var(--weight-black)' }}>
              The quick brown fox
            </p>
          </div>
        </div>
      </section>

      <style jsx>{`
        .typography-demo {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }
        .typography-section {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .typography-section__title {
          font-size: var(--font-size-text-lg);
          font-weight: var(--weight-semibold);
          color: var(--lightning-bluegray-800);
          margin: 0;
          padding-bottom: 8px;
          border-bottom: 1px solid var(--lightning-gray-200);
        }
        .typography-samples {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .typography-sample {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .typography-sample__label {
          font-size: var(--font-size-text-xs);
          font-weight: var(--weight-medium);
          color: var(--lightning-bluegray-500);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .typography-sample__preview {
          font-size: var(--font-size-text-lg);
          color: var(--lightning-bluegray-800);
          margin: 0;
        }
        .typography-scale {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .typography-scale-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding: 12px 16px;
          background: var(--lightning-gray-25);
          border-radius: var(--radius-md);
        }
        .typography-scale-item__meta {
          font-size: var(--font-size-text-xs);
          font-weight: var(--weight-medium);
          color: var(--lightning-bluegray-500);
          font-family: var(--family-font-family-number);
        }
        .typography-scale-item__sample {
          color: var(--lightning-bluegray-800);
          margin: 0;
          line-height: 1.4;
        }
        .typography-weights {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 12px;
        }
        .typography-weight-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding: 12px 16px;
          background: var(--lightning-gray-25);
          border-radius: var(--radius-md);
        }
        .typography-weight-item__meta {
          font-size: var(--font-size-text-xs);
          font-weight: var(--weight-medium);
          color: var(--lightning-bluegray-500);
          font-family: var(--family-font-family-number);
        }
        .typography-weight-item__sample {
          font-size: var(--font-size-text-xl);
          color: var(--lightning-bluegray-800);
          margin: 0;
        }
      `}</style>
    </div>
  );
}

function ColorPaletteDemo() {
  return (
    <div className="color-palettes">
      {COLOR_PALETTES.map((palette) => (
        <div key={palette.prefix} className="color-palette">
          <h3 className="color-palette__name">{palette.name}</h3>
          <div className="color-palette__swatches">
            {palette.shades.map((shade) => (
              <ColorSwatch
                key={shade}
                colorVar={`--lightning-${palette.prefix}-${shade}`}
                shade={shade}
              />
            ))}
          </div>
        </div>
      ))}
      <div className="color-palette">
        <h3 className="color-palette__name">Contrast</h3>
        <div className="color-palette__swatches">
          <div className="color-swatch color-swatch--bordered" style={{ backgroundColor: "var(--lightning-contrast-white)" }}>
            <span className="color-swatch__label" style={{ color: "#1d2024" }}>White</span>
          </div>
          <div className="color-swatch" style={{ backgroundColor: "var(--lightning-contrast-black)" }}>
            <span className="color-swatch__label" style={{ color: "#fff" }}>Black</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function SpacingDemo() {
  const spacingTokens = [
    { name: 'XX-Small', token: '--offset-xx-small', value: '2px' },
    { name: 'X-Small', token: '--offset-x-small', value: '4px' },
    { name: 'Small', token: '--offset-small', value: '8px' },
    { name: 'Medium', token: '--offset-medium', value: '12px' },
    { name: 'Large', token: '--offset-large', value: '16px' },
    { name: 'X-Large', token: '--offset-x-large', value: '20px' },
    { name: 'XX-Large', token: '--offset-xx-large', value: '24px' },
    { name: 'XXX-Large', token: '--offset-xxx-large', value: '32px' },
    { name: 'XXXX-Large', token: '--offset-xxxx-large', value: '48px' },
  ];

  return (
    <div className="spacing-demo">
      <section className="spacing-section">
        <h3 className="spacing-section__title">Spacing Scale</h3>
        <p className="spacing-section__description">
          Consistent spacing tokens used throughout the design system for margins, padding, and gaps.
        </p>
        <div className="spacing-tokens">
          {spacingTokens.map((item) => (
            <div key={item.token} className="spacing-token">
              <div className="spacing-token__info">
                <span className="spacing-token__name">{item.name}</span>
                <code className="spacing-token__variable">{item.token}</code>
                <span className="spacing-token__value">{item.value}</span>
              </div>
              <div className="spacing-token__visual">
                <div
                  className="spacing-token__bar"
                  style={{ width: `var(${item.token})` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="spacing-section">
        <h3 className="spacing-section__title">Usage Examples</h3>
        <div className="spacing-examples">
          <div className="spacing-example">
            <span className="spacing-example__label">Padding</span>
            <div className="spacing-example__demo">
              <div className="spacing-box" style={{ padding: 'var(--offset-small)' }}>
                <span>--offset-small (8px)</span>
              </div>
              <div className="spacing-box" style={{ padding: 'var(--offset-medium)' }}>
                <span>--offset-medium (12px)</span>
              </div>
              <div className="spacing-box" style={{ padding: 'var(--offset-large)' }}>
                <span>--offset-large (16px)</span>
              </div>
            </div>
          </div>
          <div className="spacing-example">
            <span className="spacing-example__label">Gap</span>
            <div className="spacing-example__demo">
              <div className="spacing-gap-demo" style={{ gap: 'var(--offset-small)' }}>
                <div className="spacing-gap-item" />
                <div className="spacing-gap-item" />
                <div className="spacing-gap-item" />
              </div>
              <div className="spacing-gap-demo" style={{ gap: 'var(--offset-medium)' }}>
                <div className="spacing-gap-item" />
                <div className="spacing-gap-item" />
                <div className="spacing-gap-item" />
              </div>
              <div className="spacing-gap-demo" style={{ gap: 'var(--offset-large)' }}>
                <div className="spacing-gap-item" />
                <div className="spacing-gap-item" />
                <div className="spacing-gap-item" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .spacing-demo {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }
        .spacing-section {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .spacing-section__title {
          font-size: var(--font-size-text-lg);
          font-weight: var(--weight-semibold);
          color: var(--lightning-bluegray-800);
          margin: 0;
          padding-bottom: 8px;
          border-bottom: 1px solid var(--lightning-gray-200);
        }
        .spacing-section__description {
          font-size: var(--font-size-text-s);
          color: var(--lightning-bluegray-600);
          margin: 0;
        }
        .spacing-tokens {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .spacing-token {
          display: flex;
          align-items: center;
          gap: 24px;
          padding: 12px 16px;
          background: var(--lightning-gray-25);
          border-radius: var(--radius-md);
        }
        .spacing-token__info {
          display: flex;
          align-items: center;
          gap: 16px;
          min-width: 340px;
        }
        .spacing-token__name {
          font-size: var(--font-size-text-m);
          font-weight: var(--weight-medium);
          color: var(--lightning-bluegray-800);
          min-width: 90px;
        }
        .spacing-token__variable {
          font-size: var(--font-size-text-xs);
          font-family: var(--family-font-family-number);
          color: var(--lightning-bluegray-500);
          background: var(--lightning-gray-100);
          padding: 2px 8px;
          border-radius: var(--radius-sm);
          min-width: 160px;
        }
        .spacing-token__value {
          font-size: var(--font-size-text-s);
          font-family: var(--family-font-family-number);
          color: var(--lightning-bluegray-600);
          min-width: 40px;
        }
        .spacing-token__visual {
          flex: 1;
          display: flex;
          align-items: center;
        }
        .spacing-token__bar {
          height: 24px;
          background: var(--lightning-blue-400);
          border-radius: var(--radius-sm);
          min-width: 2px;
        }
        .spacing-examples {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .spacing-example {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .spacing-example__label {
          font-size: var(--font-size-text-s);
          font-weight: var(--weight-medium);
          color: var(--lightning-bluegray-600);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .spacing-example__demo {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
        }
        .spacing-box {
          background: var(--lightning-blue-50);
          border: 1px dashed var(--lightning-blue-300);
          border-radius: var(--radius-md);
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .spacing-box span {
          font-size: var(--font-size-text-xs);
          color: var(--lightning-bluegray-600);
          font-family: var(--family-font-family-number);
          background: var(--lightning-contrast-white);
          padding: 4px 8px;
          border-radius: var(--radius-sm);
        }
        .spacing-gap-demo {
          display: flex;
          padding: 12px;
          background: var(--lightning-gray-50);
          border-radius: var(--radius-md);
        }
        .spacing-gap-item {
          width: 32px;
          height: 32px;
          background: var(--lightning-blue-400);
          border-radius: var(--radius-sm);
        }
      `}</style>
    </div>
  );
}

// Get all icon names from the Dazzle icon exports
const iconEntries = Object.entries(DazzleIcons).filter(
  ([name]) => name !== 'default' && !name.startsWith('register')
);

// Convert PascalCase to kebab-case for display
function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
}

function IconsDemo() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVariant, setSelectedVariant] = useState<IconVariant>('linear');
  const [copiedIcon, setCopiedIcon] = useState<string | null>(null);

  const filteredIcons = useMemo(() => {
    if (!searchQuery.trim()) return iconEntries;
    const query = searchQuery.toLowerCase();
    return iconEntries.filter(([name]) =>
      name.toLowerCase().includes(query) ||
      toKebabCase(name).includes(query)
    );
  }, [searchQuery]);

  const handleCopyIcon = (componentName: string) => {
    const importCode = `import { ${componentName} } from '@/design-system/icons/icons';`;
    const usageCode = `<${componentName} variant="${selectedVariant}" size={24} />`;
    const fullCode = `${importCode}\n\n// Usage:\n${usageCode}`;

    navigator.clipboard.writeText(fullCode);
    setCopiedIcon(componentName);
    setTimeout(() => setCopiedIcon(null), 2000);
  };

  // Keyboard shortcut to focus search
  const searchInputRef = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="icons-demo">
      <div className="icons-demo__header">
        <div className="icons-demo__title-section">
          <p className="icons-demo__subtitle">
            {searchQuery ? (
              <>Showing <strong>{filteredIcons.length}</strong> of {iconEntries.length} icons</>
            ) : (
              <>{iconEntries.length} icons with {selectedVariant === 'linear' ? 'Linear' : 'Solid'} style</>
            )}
          </p>
        </div>

        <div className="icons-demo__controls">
          <div className="icons-demo__search">
            <Icon name="search" size={16} />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Filter by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="icons-demo__search-input"
            />
            {searchQuery ? (
              <button
                className="icons-demo__search-clear"
                onClick={() => setSearchQuery('')}
              >
                <Icon name="xmark" size={14} />
              </button>
            ) : (
              <span className="icons-demo__search-hint">/</span>
            )}
          </div>

          <Toggle
            options={[
              { id: 'linear', label: 'Linear' },
              { id: 'solid', label: 'Solid' },
            ]}
            value={selectedVariant}
            onChange={(value) => setSelectedVariant(value as IconVariant)}
          />
        </div>
      </div>

      <div className="icons-demo__grid">
        {filteredIcons.map(([name, IconComponent]) => {
          const DazzleIcon = IconComponent as React.FC<{ variant?: IconVariant; size?: number; color?: string; className?: string }>;
          const kebabName = toKebabCase(name);
          const isCopied = copiedIcon === name;

          return (
            <button
              key={name}
              className={`icons-demo__item ${isCopied ? 'icons-demo__item--copied' : ''}`}
              onClick={() => handleCopyIcon(name)}
              title={`Click to copy: ${name}`}
            >
              <div className="icons-demo__icon-wrapper">
                <DazzleIcon variant={selectedVariant} size={24} />
              </div>
              <span className="icons-demo__icon-name">{kebabName}</span>
              {isCopied && <span className="icons-demo__copied-badge">Copied!</span>}
            </button>
          );
        })}
      </div>

      {filteredIcons.length === 0 && (
        <div className="icons-demo__empty">
          <Icon name="search" size={32} />
          <p>No icons found matching &quot;{searchQuery}&quot;</p>
          <span>Try a different search term or <button onClick={() => setSearchQuery('')}>clear the filter</button></span>
        </div>
      )}

      <div className="icons-demo__footer">
        <p>Click any icon to copy its import and usage code</p>
      </div>

      <style jsx>{`
        .icons-demo {
          display: flex;
          flex-direction: column;
          gap: var(--offset-large);
          width: 100%;
          max-width: none;
        }
        .icons-demo__header {
          display: flex;
          flex-direction: column;
          gap: var(--offset-medium);
        }
        @media (min-width: 768px) {
          .icons-demo__header {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          }
        }
        .icons-demo__subtitle {
          font-size: var(--font-size-text-s);
          color: var(--text-secondary);
          margin: 0;
        }
        .icons-demo__controls {
          display: flex;
          flex-direction: column;
          gap: var(--offset-small);
        }
        @media (min-width: 640px) {
          .icons-demo__controls {
            flex-direction: row;
            align-items: center;
          }
        }
        .icons-demo__search {
          position: relative;
          display: flex;
          align-items: center;
          min-width: 240px;
          background: var(--lightning-contrast-white);
          border: 1px solid var(--border-input);
          border-radius: var(--radius-md);
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .icons-demo__search:focus-within {
          border-color: var(--lightning-blue-500);
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        .icons-demo__search svg:first-child {
          position: absolute;
          left: 12px;
          color: var(--text-muted);
          pointer-events: none;
        }
        .icons-demo__search-input {
          width: 100%;
          padding: var(--offset-small) var(--offset-xx-large) var(--offset-small) 40px;
          border: none;
          border-radius: var(--radius-md);
          font-size: var(--font-size-text-s);
          background: transparent;
          color: var(--text-primary);
        }
        .icons-demo__search-input:focus {
          outline: none;
        }
        .icons-demo__search-input::placeholder {
          color: var(--text-muted);
        }
        .icons-demo__search-clear {
          position: absolute;
          right: 8px;
          padding: 4px;
          background: none;
          border: none;
          cursor: pointer;
          color: var(--text-muted);
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .icons-demo__search-clear:hover {
          color: var(--text-secondary);
          background: var(--bg-card-hover);
        }
        .icons-demo__search-hint {
          position: absolute;
          right: 12px;
          font-size: 11px;
          font-family: var(--family-font-family-mono, monospace);
          color: var(--text-muted);
          background: var(--lightning-gray-100);
          padding: 2px 6px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-input);
        }
        .icons-demo__grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
          gap: var(--offset-small);
        }
        @media (min-width: 640px) {
          .icons-demo__grid {
            grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
            gap: var(--offset-medium);
          }
        }
        .icons-demo__item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--offset-small);
          padding: var(--offset-medium) var(--offset-small);
          background: var(--lightning-contrast-white);
          border: 1px solid var(--border-card);
          border-radius: var(--radius-lg);
          cursor: pointer;
          transition: all 0.2s;
          position: relative;
        }
        .icons-demo__item:hover {
          border-color: var(--lightning-blue-500);
          box-shadow: var(--shadow-md);
          transform: translateY(-2px);
        }
        .icons-demo__item:active {
          transform: translateY(0);
        }
        .icons-demo__item--copied {
          border-color: var(--color-success);
          background: rgba(34, 197, 94, 0.05);
        }
        .icons-demo__icon-wrapper {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-primary);
        }
        .icons-demo__icon-name {
          font-size: 10px;
          color: var(--text-secondary);
          text-align: center;
          word-break: break-word;
          line-height: 1.3;
        }
        .icons-demo__copied-badge {
          position: absolute;
          top: 6px;
          right: 6px;
          font-size: 9px;
          font-weight: var(--weight-semibold);
          color: var(--color-success);
          background: rgba(34, 197, 94, 0.1);
          padding: 2px 6px;
          border-radius: var(--radius-sm);
        }
        .icons-demo__empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--offset-medium);
          text-align: center;
          padding: var(--offset-xxxx-large) var(--offset-large);
          color: var(--text-muted);
        }
        .icons-demo__empty svg {
          opacity: 0.4;
        }
        .icons-demo__empty p {
          margin: 0;
          font-size: var(--font-size-text-m);
          color: var(--text-secondary);
          font-weight: var(--weight-medium);
        }
        .icons-demo__empty span {
          font-size: var(--font-size-text-s);
          color: var(--text-muted);
        }
        .icons-demo__empty button {
          background: none;
          border: none;
          color: var(--lightning-blue-500);
          font-size: inherit;
          cursor: pointer;
          text-decoration: underline;
          padding: 0;
        }
        .icons-demo__empty button:hover {
          color: var(--lightning-blue-600);
        }
        .icons-demo__footer {
          text-align: center;
          padding: var(--offset-medium);
          color: var(--text-muted);
          font-size: var(--font-size-text-xs);
        }
        .icons-demo__footer p {
          margin: 0;
        }
      `}</style>
    </div>
  );
}

// Illumio Icons Demo
function IllumioIconsDemo() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVariant, setSelectedVariant] = useState<IconVariant>('linear');
  const [copiedIcon, setCopiedIcon] = useState<string | null>(null);

  // Icons with variants (linear/solid)
  const variantIcons = [
    { name: 'WhatsNew', component: DazzleIcons.WhatsNew, hasVariants: true },
    { name: 'Community', component: DazzleIcons.Community, hasVariants: true },
    { name: 'AiStar', component: DazzleIcons.AiStar, hasVariants: true },
  ];

  // CSP icons (single style, no variants)
  const cspIcons = [
    { name: 'CspAws', component: DazzleIcons.CspAws, hasVariants: false },
    { name: 'CspAwsBordered', component: DazzleIcons.CspAwsBordered, hasVariants: false },
    { name: 'CspAzure', component: DazzleIcons.CspAzure, hasVariants: false },
    { name: 'CspAzureBordered', component: DazzleIcons.CspAzureBordered, hasVariants: false },
    { name: 'CspGcp', component: DazzleIcons.CspGcp, hasVariants: false },
    { name: 'CspGcpBordered', component: DazzleIcons.CspGcpBordered, hasVariants: false },
    { name: 'CspOci', component: DazzleIcons.CspOci, hasVariants: false },
    { name: 'CspOciBordered', component: DazzleIcons.CspOciBordered, hasVariants: false },
  ];

  const illumioIcons = [...variantIcons, ...cspIcons];

  const filteredIcons = useMemo(() => {
    if (!searchQuery.trim()) return illumioIcons;
    const query = searchQuery.toLowerCase();
    return illumioIcons.filter(({ name }) =>
      name.toLowerCase().includes(query) ||
      toKebabCase(name).includes(query)
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, illumioIcons]);

  const handleCopyIcon = (componentName: string) => {
    const importCode = `import { ${componentName} } from '@/design-system/icons/icons';`;
    const usageCode = `<${componentName} variant="${selectedVariant}" size={24} />`;
    const fullCode = `${importCode}\n\n// Usage:\n${usageCode}`;

    navigator.clipboard.writeText(fullCode);
    setCopiedIcon(componentName);
    setTimeout(() => setCopiedIcon(null), 2000);
  };

  // Keyboard shortcut to focus search
  const searchInputRef = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="icons-demo">
      <div className="icons-demo__header">
        <div className="icons-demo__title-section">
          <p className="icons-demo__subtitle">
            {searchQuery ? (
              <>Showing <strong>{filteredIcons.length}</strong> of {illumioIcons.length} icons</>
            ) : (
              <>{illumioIcons.length} icons ({variantIcons.length} with variants, {cspIcons.length} CSP)</>
            )}
          </p>
        </div>

        <div className="icons-demo__controls">
          <div className="icons-demo__search">
            <Icon name="search" size={16} />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Filter by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="icons-demo__search-input"
            />
            {searchQuery ? (
              <button
                className="icons-demo__search-clear"
                onClick={() => setSearchQuery('')}
              >
                <Icon name="xmark" size={14} />
              </button>
            ) : (
              <span className="icons-demo__search-hint">/</span>
            )}
          </div>

          <Toggle
            options={[
              { id: 'linear', label: 'Linear' },
              { id: 'solid', label: 'Solid' },
            ]}
            value={selectedVariant}
            onChange={(value) => setSelectedVariant(value as IconVariant)}
          />
        </div>
      </div>

      <div className="icons-demo__grid">
        {filteredIcons.map(({ name, component: IconComponent, hasVariants }) => {
          const IllumioIcon = IconComponent as React.FC<{ variant?: IconVariant; size?: number; color?: string; className?: string }>;
          const kebabName = toKebabCase(name);
          const isCopied = copiedIcon === name;

          return (
            <button
              key={name}
              className={`icons-demo__item ${isCopied ? 'icons-demo__item--copied' : ''}`}
              onClick={() => handleCopyIcon(name)}
              title={`Click to copy: ${name}`}
            >
              <div className="icons-demo__icon-wrapper">
                {hasVariants ? (
                  <IllumioIcon variant={selectedVariant} size={24} />
                ) : (
                  <IllumioIcon size={24} />
                )}
              </div>
              <span className="icons-demo__icon-name">{kebabName}</span>
              {isCopied && <span className="icons-demo__copied-badge">Copied!</span>}
            </button>
          );
        })}
      </div>

      {filteredIcons.length === 0 && (
        <div className="icons-demo__empty">
          <Icon name="search" size={32} />
          <p>No icons found matching &quot;{searchQuery}&quot;</p>
          <span>Try a different search term or <button onClick={() => setSearchQuery('')}>clear the filter</button></span>
        </div>
      )}

      <div className="icons-demo__footer">
        <p>Click any icon to copy its import and usage code</p>
      </div>

      <style jsx>{`
        .icons-demo {
          display: flex;
          flex-direction: column;
          gap: var(--offset-large);
          width: 100%;
          max-width: none;
        }
        .icons-demo__header {
          display: flex;
          flex-direction: column;
          gap: var(--offset-medium);
        }
        @media (min-width: 768px) {
          .icons-demo__header {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          }
        }
        .icons-demo__subtitle {
          font-size: var(--font-size-text-s);
          color: var(--text-secondary);
          margin: 0;
        }
        .icons-demo__controls {
          display: flex;
          flex-direction: column;
          gap: var(--offset-small);
        }
        @media (min-width: 640px) {
          .icons-demo__controls {
            flex-direction: row;
            align-items: center;
          }
        }
        .icons-demo__search {
          position: relative;
          display: flex;
          align-items: center;
          min-width: 240px;
          background: var(--lightning-contrast-white);
          border: 1px solid var(--border-input);
          border-radius: var(--radius-md);
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .icons-demo__search:focus-within {
          border-color: var(--lightning-blue-500);
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        .icons-demo__search svg:first-child {
          position: absolute;
          left: 12px;
          color: var(--text-muted);
          pointer-events: none;
        }
        .icons-demo__search-input {
          width: 100%;
          padding: var(--offset-small) var(--offset-xx-large) var(--offset-small) 40px;
          border: none;
          border-radius: var(--radius-md);
          font-size: var(--font-size-text-s);
          background: transparent;
          color: var(--text-primary);
        }
        .icons-demo__search-input:focus {
          outline: none;
        }
        .icons-demo__search-input::placeholder {
          color: var(--text-muted);
        }
        .icons-demo__search-clear {
          position: absolute;
          right: 8px;
          padding: 4px;
          background: none;
          border: none;
          cursor: pointer;
          color: var(--text-muted);
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .icons-demo__search-clear:hover {
          color: var(--text-secondary);
          background: var(--bg-card-hover);
        }
        .icons-demo__search-hint {
          position: absolute;
          right: 12px;
          font-size: 11px;
          font-family: var(--family-font-family-mono, monospace);
          color: var(--text-muted);
          background: var(--lightning-gray-100);
          padding: 2px 6px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-input);
        }
        .icons-demo__grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
          gap: var(--offset-small);
        }
        @media (min-width: 640px) {
          .icons-demo__grid {
            grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
            gap: var(--offset-medium);
          }
        }
        .icons-demo__item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--offset-small);
          padding: var(--offset-medium) var(--offset-small);
          background: var(--lightning-contrast-white);
          border: 1px solid var(--border-card);
          border-radius: var(--radius-lg);
          cursor: pointer;
          transition: all 0.2s;
          position: relative;
        }
        .icons-demo__item:hover {
          border-color: var(--lightning-blue-500);
          box-shadow: var(--shadow-md);
          transform: translateY(-2px);
        }
        .icons-demo__item:active {
          transform: translateY(0);
        }
        .icons-demo__item--copied {
          border-color: var(--color-success);
          background: rgba(34, 197, 94, 0.05);
        }
        .icons-demo__icon-wrapper {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-primary);
        }
        .icons-demo__icon-name {
          font-size: 10px;
          color: var(--text-secondary);
          text-align: center;
          word-break: break-word;
          line-height: 1.3;
        }
        .icons-demo__copied-badge {
          position: absolute;
          top: 6px;
          right: 6px;
          font-size: 9px;
          font-weight: var(--weight-semibold);
          color: var(--color-success);
          background: rgba(34, 197, 94, 0.1);
          padding: 2px 6px;
          border-radius: var(--radius-sm);
        }
        .icons-demo__empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--offset-medium);
          text-align: center;
          padding: var(--offset-xxxx-large) var(--offset-large);
          color: var(--text-muted);
        }
        .icons-demo__empty svg {
          opacity: 0.4;
        }
        .icons-demo__empty p {
          margin: 0;
          font-size: var(--font-size-text-m);
          color: var(--text-secondary);
          font-weight: var(--weight-medium);
        }
        .icons-demo__empty span {
          font-size: var(--font-size-text-s);
          color: var(--text-muted);
        }
        .icons-demo__empty button {
          background: none;
          border: none;
          color: var(--lightning-blue-500);
          font-size: inherit;
          cursor: pointer;
          text-decoration: underline;
          padding: 0;
        }
        .icons-demo__empty button:hover {
          color: var(--lightning-blue-600);
        }
        .icons-demo__footer {
          text-align: center;
          padding: var(--offset-medium);
          color: var(--text-muted);
          font-size: var(--font-size-text-xs);
        }
        .icons-demo__footer p {
          margin: 0;
        }
      `}</style>
    </div>
  );
}

// Get all pill icon entries
const pillIconEntries = Object.entries(PillIcons).filter(
  ([name]) => name !== 'default' && !name.startsWith('register')
);

// Pill Icons Demo
function PillIconsDemo() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLabelType, setSelectedLabelType] = useState<LabelType | 'default'>('default');
  const [copiedIcon, setCopiedIcon] = useState<string | null>(null);

  const filteredIcons = useMemo(() => {
    if (!searchQuery.trim()) return pillIconEntries;
    const query = searchQuery.toLowerCase();
    return pillIconEntries.filter(([name]) =>
      name.toLowerCase().includes(query) ||
      toKebabCase(name).includes(query)
    );
  }, [searchQuery]);

  const handleCopyIcon = (componentName: string) => {
    const kebabName = toKebabCase(componentName);
    const labelTypeStr = selectedLabelType !== 'default' ? ` labelType="${selectedLabelType}"` : '';
    const importCode = `import { PillIcon } from '@/design-system/pill-icons';`;
    const usageCode = `<PillIcon name="${kebabName}"${labelTypeStr} size={18} />`;
    const fullCode = `${importCode}\n\n// Usage:\n${usageCode}`;

    navigator.clipboard.writeText(fullCode);
    setCopiedIcon(componentName);
    setTimeout(() => setCopiedIcon(null), 2000);
  };

  // Keyboard shortcut to focus search
  const searchInputRef = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="icons-demo">
      <div className="icons-demo__header">
        <div className="icons-demo__title-section">
          <p className="icons-demo__subtitle">
            {searchQuery ? (
              <>Showing <strong>{filteredIcons.length}</strong> of {pillIconEntries.length} icons</>
            ) : (
              <>{pillIconEntries.length} dual-color icons for label pills</>
            )}
          </p>
        </div>

        <div className="icons-demo__controls">
          <div className="icons-demo__search">
            <Icon name="search" size={16} />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Filter by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="icons-demo__search-input"
            />
            {searchQuery ? (
              <button
                className="icons-demo__search-clear"
                onClick={() => setSearchQuery('')}
              >
                <Icon name="xmark" size={14} />
              </button>
            ) : (
              <span className="icons-demo__search-hint">/</span>
            )}
          </div>

          <Toggle
            options={[
              { id: 'default', label: 'Default' },
              { id: 'app', label: 'App' },
              { id: 'role', label: 'Role' },
              { id: 'env', label: 'Env' },
              { id: 'loc', label: 'Loc' },
            ]}
            value={selectedLabelType}
            onChange={(value) => setSelectedLabelType(value as LabelType | 'default')}
          />
        </div>
      </div>

      <div className="icons-demo__grid">
        {filteredIcons.map(([name]) => {
          const kebabName = toKebabCase(name);
          const isCopied = copiedIcon === name;

          return (
            <button
              key={name}
              className={`icons-demo__item ${isCopied ? 'icons-demo__item--copied' : ''}`}
              onClick={() => handleCopyIcon(name)}
              title={`Click to copy: ${name}`}
            >
              <div className="icons-demo__icon-wrapper">
                <PillIcon
                  name={kebabName as Parameters<typeof PillIcon>[0]['name']}
                  labelType={selectedLabelType !== 'default' ? selectedLabelType : undefined}
                  size={24}
                />
              </div>
              <span className="icons-demo__icon-name">{kebabName}</span>
              {isCopied && <span className="icons-demo__copied-badge">Copied!</span>}
            </button>
          );
        })}
      </div>

      {filteredIcons.length === 0 && (
        <div className="icons-demo__empty">
          <Icon name="search" size={32} />
          <p>No icons found matching &quot;{searchQuery}&quot;</p>
          <span>Try a different search term or <button onClick={() => setSearchQuery('')}>clear the filter</button></span>
        </div>
      )}

      <div className="icons-demo__footer">
        <p>Click any icon to copy its import and usage code</p>
      </div>

      <style jsx>{`
        .icons-demo {
          display: flex;
          flex-direction: column;
          gap: var(--offset-large);
          width: 100%;
          max-width: none;
        }
        .icons-demo__header {
          display: flex;
          flex-direction: column;
          gap: var(--offset-medium);
        }
        @media (min-width: 768px) {
          .icons-demo__header {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          }
        }
        .icons-demo__subtitle {
          font-size: var(--font-size-text-s);
          color: var(--text-secondary);
          margin: 0;
        }
        .icons-demo__controls {
          display: flex;
          flex-direction: column;
          gap: var(--offset-small);
        }
        @media (min-width: 640px) {
          .icons-demo__controls {
            flex-direction: row;
            align-items: center;
          }
        }
        .icons-demo__search {
          position: relative;
          display: flex;
          align-items: center;
          min-width: 240px;
          background: var(--lightning-contrast-white);
          border: 1px solid var(--border-input);
          border-radius: var(--radius-md);
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .icons-demo__search:focus-within {
          border-color: var(--lightning-blue-500);
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        .icons-demo__search svg:first-child {
          position: absolute;
          left: 12px;
          color: var(--text-muted);
          pointer-events: none;
        }
        .icons-demo__search-input {
          width: 100%;
          padding: var(--offset-small) var(--offset-xx-large) var(--offset-small) 40px;
          border: none;
          border-radius: var(--radius-md);
          font-size: var(--font-size-text-s);
          background: transparent;
          color: var(--text-primary);
        }
        .icons-demo__search-input:focus {
          outline: none;
        }
        .icons-demo__search-input::placeholder {
          color: var(--text-muted);
        }
        .icons-demo__search-clear {
          position: absolute;
          right: 8px;
          padding: 4px;
          background: none;
          border: none;
          cursor: pointer;
          color: var(--text-muted);
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .icons-demo__search-clear:hover {
          color: var(--text-secondary);
          background: var(--bg-card-hover);
        }
        .icons-demo__search-hint {
          position: absolute;
          right: 12px;
          font-size: 11px;
          font-family: var(--family-font-family-mono, monospace);
          color: var(--text-muted);
          background: var(--lightning-gray-100);
          padding: 2px 6px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-input);
        }
        .icons-demo__grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
          gap: var(--offset-small);
        }
        @media (min-width: 640px) {
          .icons-demo__grid {
            grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
            gap: var(--offset-medium);
          }
        }
        .icons-demo__item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--offset-small);
          padding: var(--offset-medium) var(--offset-small);
          background: var(--lightning-contrast-white);
          border: 1px solid var(--border-card);
          border-radius: var(--radius-lg);
          cursor: pointer;
          transition: all 0.2s;
          position: relative;
        }
        .icons-demo__item:hover {
          border-color: var(--lightning-blue-500);
          box-shadow: var(--shadow-md);
          transform: translateY(-2px);
        }
        .icons-demo__item:active {
          transform: translateY(0);
        }
        .icons-demo__item--copied {
          border-color: var(--color-success);
          background: rgba(34, 197, 94, 0.05);
        }
        .icons-demo__icon-wrapper {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-primary);
        }
        .icons-demo__icon-name {
          font-size: 10px;
          color: var(--text-secondary);
          text-align: center;
          word-break: break-word;
          line-height: 1.3;
        }
        .icons-demo__copied-badge {
          position: absolute;
          top: 6px;
          right: 6px;
          font-size: 9px;
          font-weight: var(--weight-semibold);
          color: var(--color-success);
          background: rgba(34, 197, 94, 0.1);
          padding: 2px 6px;
          border-radius: var(--radius-sm);
        }
        .icons-demo__empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--offset-medium);
          text-align: center;
          padding: var(--offset-xxxx-large) var(--offset-large);
          color: var(--text-muted);
        }
        .icons-demo__empty svg {
          opacity: 0.4;
        }
        .icons-demo__empty p {
          margin: 0;
          font-size: var(--font-size-text-m);
          color: var(--text-secondary);
          font-weight: var(--weight-medium);
        }
        .icons-demo__empty span {
          font-size: var(--font-size-text-s);
          color: var(--text-muted);
        }
        .icons-demo__empty button {
          background: none;
          border: none;
          color: var(--lightning-blue-500);
          font-size: inherit;
          cursor: pointer;
          text-decoration: underline;
          padding: 0;
        }
        .icons-demo__empty button:hover {
          color: var(--lightning-blue-600);
        }
        .icons-demo__footer {
          text-align: center;
          padding: var(--offset-medium);
          color: var(--text-muted);
          font-size: var(--font-size-text-xs);
        }
        .icons-demo__footer p {
          margin: 0;
        }
      `}</style>
    </div>
  );
}

// Illumio Illustrations Demo
function IllumioIllustrationsDemo() {
  const [copiedIllustration, setCopiedIllustration] = useState<string | null>(null);

  const illustrations = [
    { name: 'ErrorEmptyState', label: 'Error Empty State', component: ErrorEmptyState },
    { name: 'PositiveNeutralEmptyState', label: 'Positive/Neutral Empty State', component: PositiveNeutralEmptyState },
    { name: 'Table_negative_emptystate', label: 'Table Negative Empty State', component: Table_negative_emptystate },
    { name: 'Table_neutral_emptystate', label: 'Table Neutral Empty State', component: Table_neutral_emptystate },
  ];

  const handleCopyIllustration = (componentName: string) => {
    const importCode = `import { ${componentName} } from '@/design-system/illustrations/illustrations';`;
    const usageCode = `<${componentName} width={200} />`;
    const fullCode = `${importCode}\n\n// Usage:\n${usageCode}`;

    navigator.clipboard.writeText(fullCode);
    setCopiedIllustration(componentName);
    setTimeout(() => setCopiedIllustration(null), 2000);
  };

  return (
    <div className="illustrations-demo">
      <div className="illustrations-demo__header">
        <p className="illustrations-demo__subtitle">
          {illustrations.length} custom Illumio illustrations
        </p>
      </div>

      <div className="illustrations-demo__grid">
        {illustrations.map(({ name, label, component: IllustrationComponent }) => {
          const isCopied = copiedIllustration === name;

          return (
            <button
              key={name}
              className={`illustrations-demo__item ${isCopied ? 'illustrations-demo__item--copied' : ''}`}
              onClick={() => handleCopyIllustration(name)}
              title={`Click to copy: ${name}`}
            >
              <div className="illustrations-demo__preview">
                <IllustrationComponent width={100} />
              </div>
              <span className="illustrations-demo__name">{label}</span>
              {isCopied && <span className="illustrations-demo__copied-badge">Copied!</span>}
            </button>
          );
        })}
      </div>

      <div className="illustrations-demo__footer">
        <p>Click any illustration to copy its import and usage code</p>
      </div>

      <style jsx>{`
        .illustrations-demo {
          display: flex;
          flex-direction: column;
          gap: var(--offset-large);
        }
        .illustrations-demo__header {
          display: flex;
          flex-direction: column;
          gap: var(--offset-medium);
        }
        .illustrations-demo__subtitle {
          font-size: var(--font-size-text-s);
          color: var(--text-secondary);
          margin: 0;
        }
        .illustrations-demo__grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: var(--offset-medium);
        }
        .illustrations-demo__item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--offset-small);
          padding: var(--offset-large);
          background: var(--lightning-contrast-white);
          border: 1px solid var(--lightning-gray-200);
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: all 0.15s ease;
          position: relative;
        }
        .illustrations-demo__item:hover {
          border-color: var(--lightning-blue-400);
          background: var(--lightning-blue-25);
        }
        .illustrations-demo__item--copied {
          border-color: var(--lightning-green-500);
          background: var(--lightning-green-25);
        }
        .illustrations-demo__preview {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 120px;
          height: 80px;
        }
        .illustrations-demo__name {
          font-size: var(--font-size-text-xs);
          color: var(--text-secondary);
          text-align: center;
        }
        .illustrations-demo__copied-badge {
          position: absolute;
          top: var(--offset-small);
          right: var(--offset-small);
          font-size: 10px;
          padding: 2px 6px;
          background: var(--lightning-green-500);
          color: white;
          border-radius: var(--radius-sm);
        }
        .illustrations-demo__footer {
          text-align: center;
          padding: var(--offset-medium);
          color: var(--text-muted);
          font-size: var(--font-size-text-xs);
        }
        .illustrations-demo__footer p {
          margin: 0;
        }
      `}</style>
    </div>
  );
}

// Render content based on selected item
function renderContent(selectedId: string) {
  switch (selectedId) {
    case "typography": return <TypographyDemo />;
    case "colors": return <ColorPaletteDemo />;
    case "spacing": return <SpacingDemo />;
    case "dazzle-icons": return <IconsDemo />;
    case "illumio-icons": return <IllumioIconsDemo />;
    case "pill-icons": return <PillIconsDemo />;
    case "illumio-illustrations": return <IllumioIllustrationsDemo />;
    case "button": return <ButtonDemo />;
    case "textfield": return <TextFieldDemo />;
    case "badge": return <BadgeDemo />;
    case "status": return <StatusDemo />;
    case "card": return <CardDemo />;
    case "checkbox": return <CheckboxDemo />;
    case "copilotbutton": return <CoPilotButtonDemo />;
    case "radio": return <RadioDemo />;
    case "optioncard": return <OptionCardDemo />;
    case "optionselector": return <OptionSelectorDemo />;
    case "pill": return <PillDemo />;
    case "selector": return <SelectorDemo />;
    case "datepicker": return <DatePickerDemo />;
    case "filtermenu": return <FilterMenuDemo />;
    case "logo": return <LogoDemo />;
    case "mapnode": return <MapNodeDemo />;
    case "modal": return <ModalDemo />;
    case "notificationbanner": return <NotificationBannerDemo />;
    case "accordion": return <AccordionDemo />;
    case "videobanner": return <VideoBannerDemo />;
    case "breadcrumb": return <BreadcrumbDemo />;
    case "globalsearchinput": return <GlobalSearchInputDemo />;
    case "header": return <HeaderDemo />;
    case "sidenav": return <SideNavDemo />;
    case "slideout": return <SlideoutDemo />;
    case "switch": return <SwitchDemo />;
    case "tab": return <TabDemo />;
    case "toast": return <ToastDemo />;
    case "toggle": return <ToggleDemo />;
    case "tooltip": return <TooltipDemo />;
    case "useravatar": return <UserAvatarDemo />;
    case "widget": return <WidgetDemo />;
    default: return <ButtonDemo />;
  }
}

function getItemLabel(id: string): string {
  const item = [...FOUNDATIONS, ...COMPONENTS, ...FLOORPLANS].find(i => i.id === id);
  return item?.label || "Button";
}

function getItemType(id: string): "component" | "floorplan" | "foundation" {
  const item = [...FOUNDATIONS, ...COMPONENTS, ...FLOORPLANS].find(i => i.id === id);
  return item?.type || "component";
}

function getTitleIcon(id: string, type: string): React.ReactNode {
  const gradientColor = "url(#lightning-gradient-100)";

  // Foundation items have specific icons
  if (type === "foundation") {
    switch (id) {
      case "typography":
        return <DazzleIcons.Font variant="solid" size={24} color={gradientColor} />;
      case "spacing":
        return <DazzleIcons.DistributeSpacingHorizontal variant="solid" size={24} color={gradientColor} />;
      case "colors":
        return <DazzleIcons.Colors variant="solid" size={24} color={gradientColor} />;
      case "dazzle-icons":
        return <DazzleIcons.GemAlt variant="solid" size={24} color={gradientColor} />;
      case "illumio-icons":
        return <DazzleIcons.Shapes variant="solid" size={24} color={gradientColor} />;
      case "illumio-illustrations":
        return <DazzleIcons.Image variant="solid" size={24} color={gradientColor} />;
      default:
        return <DazzleIcons.Grid variant="solid" size={24} color={gradientColor} />;
    }
  }
  // Floorplans use Sidebar icon
  if (type === "floorplan") {
    return <DazzleIcons.Sidebar variant="solid" size={24} color={gradientColor} />;
  }
  // Components use DiamondXmark icon
  return <DazzleIcons.DiamondXmark variant="solid" size={24} color={gradientColor} />;
}

export default function ComponentLibrary() {
  const [selectedId, setSelectedId] = useState("colors");
  const [sideNavCollapsed, setSideNavCollapsed] = useState(false);

  const selectedLabel = getItemLabel(selectedId);
  const selectedType = getItemType(selectedId);

  return (
    <div className="library-layout">
      {/* SideNav */}
      <SideNav
        collapsed={sideNavCollapsed}
        onToggleCollapse={() => setSideNavCollapsed(!sideNavCollapsed)}
      >
        <SideNavSection title="Foundation" collapsible defaultExpanded>
          {FOUNDATIONS.map((item) => (
            <SideNavItem
              key={item.id}
              icon={
                item.id === "typography" ? <DazzleIcons.Font variant="linear" size={16} /> :
                item.id === "spacing" ? <DazzleIcons.DistributeSpacingHorizontal variant="linear" size={16} /> :
                item.id === "colors" ? <DazzleIcons.Colors variant="linear" size={16} /> :
                item.id === "dazzle-icons" ? <DazzleIcons.GemAlt variant="linear" size={16} /> :
                item.id === "illumio-icons" ? <DazzleIcons.Shapes variant="linear" size={16} /> :
                item.id === "pill-icons" ? <PillIcon name="app" labelType="app" size={16} /> :
                <DazzleIcons.Image variant="linear" size={16} />
              }
              level={1}
              active={selectedId === item.id}
              href={item.href}
              onClick={() => !item.href && setSelectedId(item.id)}
            >
              {item.label}
            </SideNavItem>
          ))}
        </SideNavSection>

        <SideNavDivider />

        <SideNavSection title="Components" collapsible defaultExpanded>
          {COMPONENTS.map((item) => (
            <SideNavItem
              key={item.id}
              icon={<DazzleIcons.DiamondXmark variant="linear" size={16} />}
              level={1}
              active={selectedId === item.id}
              onClick={() => setSelectedId(item.id)}
            >
              {item.label}
            </SideNavItem>
          ))}
        </SideNavSection>

        <SideNavDivider />

        <SideNavSection title="Floorplans" collapsible defaultExpanded>
          {FLOORPLANS.map((item) => (
            <SideNavItem
              key={item.id}
              icon={<DazzleIcons.Sidebar variant="linear" size={16} />}
              level={1}
              onClick={() => item.href && window.open(item.href, '_blank')}
            >
              {item.label}
            </SideNavItem>
          ))}
        </SideNavSection>

        <SideNavDivider />

        <SideNavSection title="Demos & Prototypes" collapsible defaultExpanded>
          {DEMOS.map((item) => (
            <SideNavItem
              key={item.id}
              icon={<DazzleIcons.Grid variant="linear" size={16} />}
              level={1}
              onClick={() => item.href && window.open(item.href, '_blank')}
            >
              {item.label}
            </SideNavItem>
          ))}
        </SideNavSection>
      </SideNav>

      {/* Main Content Area */}
      <div className="library-main">
        {/* Header */}
        <Header
          breadcrumbs={[
            { label: "Home", href: "#", icon: <DazzleIcons.Grid variant="linear" size={16} /> },
            { label: selectedType === "floorplan" ? "Floorplans" : selectedType === "foundation" ? "Foundation" : "Components" },
            { label: selectedLabel },
          ]}
          title={selectedLabel}
          titleIcon={getTitleIcon(selectedId, selectedType)}
          showInfoButton
          user={{ firstName: "Aziz", lastName: "Khilawala", avatarUrl: "https://i.pravatar.cc/40" }}
          iconButtons={[
            { icon: <DazzleIcons.WhatsNew variant="linear" size={20} />, ariaLabel: "What's New" },
            { icon: <DazzleIcons.CircleQuestion variant="linear" size={20} />, ariaLabel: "Help" },
          ]}
          showCoPilot
          sticky
        />

        {/* Content */}
        <main className="library-content">
          <div className="component-demo">
            {renderContent(selectedId)}
          </div>
        </main>
      </div>

      <style jsx global>{`
        .library-layout {
          min-height: 100vh;
          background: var(--bg-page, #f6f8f9);
        }

        .library-main {
          display: flex;
          flex-direction: column;
          height: 100vh;
          margin-left: ${sideNavCollapsed ? '64px' : '220px'};
          transition: margin-left 0.2s ease;
          overflow-y: auto;
        }

        .library-content {
          flex: 1;
          padding: 32px;
        }

        .component-demo {
          display: flex;
          flex-direction: column;
          gap: 24px;
          max-width: 1000px;
        }

        /* Allow icons demo to use full width */
        .component-demo:has(.icons-demo) {
          max-width: none;
        }

        .demo-row {
          display: flex;
          align-items: flex-start;
          gap: 16px;
        }

        .demo-row__label {
          min-width: 120px;
          font-size: 13px;
          font-weight: 500;
          color: var(--text-secondary, #63788f);
          padding-top: 10px;
        }

        .demo-row__content {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 12px;
        }

        .demo-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
        }

        .demo-widgets {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
        }

        .demo-header-preview {
          border: 1px solid var(--border-divider, #e6e8eb);
          border-radius: 8px;
          overflow: hidden;
        }

        .demo-sidenav {
          height: 350px;
          width: 220px;
          border: 1px solid var(--border-divider, #e6e8eb);
          border-radius: 8px;
          overflow: hidden;
          position: relative;
        }

        /* Override fixed positioning for demo SideNavs */
        .demo-sidenav .ds-sidenav {
          position: relative;
          height: 100%;
          width: 100%;
          z-index: 1;
        }

        .demo-sidenav-items {
          display: flex;
          gap: 24px;
          flex-wrap: wrap;
        }

        .demo-sidenav-item-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .demo-sidenav-item-label {
          font-size: 12px;
          font-weight: 500;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .demo-sidenav-item-group .ds-sidenav {
          position: relative;
          width: 200px;
          height: auto;
          border: 1px solid var(--border-divider);
          border-radius: 8px;
          z-index: 1;
        }

        /* Color Palette Styles */
        .color-palettes {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        .color-palette {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .color-palette__name {
          font-size: 14px;
          font-weight: 600;
          color: var(--text-primary);
          margin: 0;
        }

        .color-palette__swatches {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
        }

        .color-swatch {
          width: 64px;
          height: 48px;
          border-radius: 6px;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding-bottom: 6px;
        }

        .color-swatch--bordered {
          border: 1px solid var(--border-divider);
        }

        .color-swatch__label {
          font-size: 11px;
          font-weight: 500;
          font-family: var(--family-font-family-number, monospace);
        }

        @media (max-width: 768px) {
          .demo-row {
            flex-direction: column;
            gap: 8px;
          }

          .demo-row__label {
            min-width: auto;
            padding-top: 0;
          }

          .library-content {
            padding: 16px;
          }

          .color-swatch {
            width: 48px;
            height: 40px;
          }

          .color-swatch__label {
            font-size: 9px;
          }
        }
      `}</style>
    </div>
  );
}
