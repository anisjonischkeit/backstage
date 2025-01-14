## API Report File for "@backstage/backend-test-utils"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts
import { AnyServiceFactory } from '@backstage/backend-plugin-api';
import { BackendFeature } from '@backstage/backend-plugin-api';
import { ExtensionPoint } from '@backstage/backend-plugin-api';
import { Knex } from 'knex';
import { ServiceRef } from '@backstage/backend-plugin-api';

// @public (undocumented)
export function isDockerDisabledForTests(): boolean;

// @public
export function setupRequestMockHandlers(worker: {
  listen: (t: any) => void;
  close: () => void;
  resetHandlers: () => void;
}): void;

// @alpha (undocumented)
export function startTestBackend<
  TServices extends any[],
  TExtensionPoints extends any[],
>(options: TestBackendOptions<TServices, TExtensionPoints>): Promise<void>;

// @alpha (undocumented)
export interface TestBackendOptions<
  TServices extends any[],
  TExtensionPoints extends any[],
> {
  // (undocumented)
  extensionPoints?: readonly [
    ...{
      [index in keyof TExtensionPoints]: [
        ExtensionPoint<TExtensionPoints[index]>,
        Partial<TExtensionPoints[index]>,
      ];
    },
  ];
  // (undocumented)
  features?: BackendFeature[];
  // (undocumented)
  services?: readonly [
    ...{
      [index in keyof TServices]:
        | AnyServiceFactory
        | [ServiceRef<TServices[index]>, Partial<TServices[index]>];
    },
  ];
}

// @public
export type TestDatabaseId =
  | 'POSTGRES_13'
  | 'POSTGRES_9'
  | 'MYSQL_8'
  | 'SQLITE_3';

// @public
export class TestDatabases {
  static create(options?: {
    ids?: TestDatabaseId[];
    disableDocker?: boolean;
  }): TestDatabases;
  // (undocumented)
  eachSupportedId(): [TestDatabaseId][];
  init(id: TestDatabaseId): Promise<Knex>;
  // (undocumented)
  supports(id: TestDatabaseId): boolean;
}
```
