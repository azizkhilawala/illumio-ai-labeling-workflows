export interface Label {
  id: string;
  name: string;
  type: 'Application' | 'Environment' | 'Location' | 'Role' | 'System' | 'Terraform';
  locked: boolean;
}

export interface Resource {
  id: string;
  resource: string;
  resourceType: string;
  state: string;
  category: string;
  accountId: string;
  cloudProvider: 'aws' | 'azure' | 'gcp' | 'oci';
  region: string;
  labels: string[]; // label IDs
}

export interface SavePayload {
  resourceIds: string[];
  labelIds: string[];
}

export interface SaveResult {
  status: 'success' | 'partial' | 'failure';
  succeeded: string[];
  failed: string[];
  error?: string;
}

export interface DomainError {
  reason: string;
  dependencies: { name: string; href: string }[];
  resourceNames: string[];
}

export const AVAILABLE_LABELS: Label[] = [
  // Application
  { id: 'app-web-frontend', name: 'web-frontend', type: 'Application', locked: false },
  { id: 'app-api-gateway', name: 'api-gateway', type: 'Application', locked: false },
  { id: 'app-data-pipeline', name: 'data-pipeline', type: 'Application', locked: false },
  { id: 'app-batch-processor', name: 'batch-processor', type: 'Application', locked: false },

  // Environment
  { id: 'env-production', name: 'production', type: 'Environment', locked: false },
  { id: 'env-staging', name: 'staging', type: 'Environment', locked: false },
  { id: 'env-development', name: 'development', type: 'Environment', locked: false },

  // Location
  { id: 'loc-us-west-2', name: 'us-west-2', type: 'Location', locked: false },
  { id: 'loc-eu-central-1', name: 'eu-central-1', type: 'Location', locked: false },

  // Role
  { id: 'role-database-admin', name: 'database-admin', type: 'Role', locked: false },

  // System (locked)
  { id: 'sys-system-managed-vpc', name: 'system-managed-vpc', type: 'System', locked: true },

  // Terraform (locked)
  { id: 'tf-tf-managed-network', name: 'tf-managed-network', type: 'Terraform', locked: true },
];

export const MOCK_RESOURCES: Resource[] = [
  {
    id: 'res-001',
    resource: 'glacier-storage-alpha-server-005f-instance',
    resourceType: 'AWS::RDS::DBInstance',
    state: 'Running',
    category: 'Database',
    accountId: 'acl-12345678901234567890',
    cloudProvider: 'aws',
    region: 'us-west-2',
    labels: ['app-web-frontend', 'env-production', 'loc-us-west-2'],
  },
  {
    id: 'res-002',
    resource: 'nebula-compute-bravo-node-18a3-cluster',
    resourceType: 'AWS::EC2::Instance',
    state: 'Running',
    category: 'Compute',
    accountId: 'acl-23456789012345678901',
    cloudProvider: 'aws',
    region: 'us-west-2',
    labels: ['app-api-gateway', 'env-production'],
  },
  {
    id: 'res-003',
    resource: 'aurora-bucket-charlie-store-7b2e-volume',
    resourceType: 'AWS::S3::Bucket',
    state: 'Running',
    category: 'Object Storage',
    accountId: 'acl-34567890123456789012',
    cloudProvider: 'aws',
    region: 'eu-central-1',
    labels: ['app-data-pipeline', 'env-staging', 'loc-eu-central-1'],
  },
  {
    id: 'res-004',
    resource: 'stratos-container-delta-pod-9c41-service',
    resourceType: 'AWS::ECS::Service',
    state: 'Running',
    category: 'Container',
    accountId: 'acl-45678901234567890123',
    cloudProvider: 'aws',
    region: 'us-west-2',
    labels: ['app-batch-processor', 'env-development', 'loc-us-west-2'],
  },
  {
    id: 'res-005',
    resource: 'cirrus-function-echo-exec-3d08-lambda',
    resourceType: 'AWS::Lambda::Function',
    state: 'Running',
    category: 'Function as a Service',
    accountId: 'acl-56789012345678901234',
    cloudProvider: 'aws',
    region: 'us-west-2',
    labels: ['app-api-gateway', 'env-staging', 'loc-us-west-2'],
  },
  {
    id: 'res-006',
    resource: 'polaris-disk-foxtrot-vol-a6f2-storage',
    resourceType: 'Azure::Storage::BlobContainer',
    state: 'Running',
    category: 'Storage',
    accountId: 'acl-67890123456789012345',
    cloudProvider: 'azure',
    region: 'eu-central-1',
    labels: ['app-data-pipeline', 'env-production', 'loc-eu-central-1'],
  },
  {
    id: 'res-007',
    resource: 'helix-db-golf-primary-52b9-cluster',
    resourceType: 'GCP::CloudSQL::Instance',
    state: 'Running',
    category: 'Database',
    accountId: 'acl-78901234567890123456',
    cloudProvider: 'gcp',
    region: 'us-west-2',
    labels: ['app-web-frontend', 'env-development', 'role-database-admin'],
  },
  {
    id: 'res-008',
    resource: 'vortex-compute-hotel-vm-e1c7-instance',
    resourceType: 'AWS::EC2::Instance',
    state: 'Running',
    category: 'Compute',
    accountId: 'acl-89012345678901234567',
    cloudProvider: 'aws',
    region: 'eu-central-1',
    labels: ['app-batch-processor', 'env-staging', 'loc-eu-central-1'],
  },
];

export function getLabelById(id: string): Label | undefined {
  return AVAILABLE_LABELS.find((label) => label.id === id);
}

export function getLabelsByIds(ids: string[]): Label[] {
  return ids
    .map((id) => getLabelById(id))
    .filter((label): label is Label => label !== undefined);
}

export function getLabelsForResource(resource: Resource): Label[] {
  return getLabelsByIds(resource.labels);
}
