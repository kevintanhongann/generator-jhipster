/* eslint-disable @typescript-eslint/consistent-type-imports */
import type { ExportApplicationPropertiesFromCommand } from '../../lib/command/types.js';
import type { ApplicationOptions } from '../../lib/types/application/options.js';
import {
  type Config as BaseConfig,
  type Features as BaseFeatures,
  type Options as BaseOptions,
  Application as SimpleApplication,
} from '../base-simple-application/index.js';
import type { ClientApplication } from '../client/types.js';
import type { I18nApplication } from '../languages/types.js';
import type { SpringBootApplication } from '../server/types.js';
import type { OptionWithDerivedProperties } from './application-options.js';

export type { Source } from '../base-simple-application/types.js';

export type BaseApplication = SimpleApplication & {
  jhiPrefix: string;
  jhiPrefixCapitalized: string;
  jhiPrefixDashed: string;

  entitySuffix: string;
  dtoSuffix: string;

  skipCommitHook: boolean;
  fakerSeed?: string;

  /* @deprecated use nodePackageManager */
  clientPackageManager: string;

  skipClient?: boolean;
  skipServer?: boolean;
  monorepository?: boolean;

  blueprints?: { name: string; version: string }[];
  testFrameworks?: string[];

  /**
   * True if the application has at least one non-builtin entity.
   */
  hasNonBuiltInEntity?: boolean;
} & I18nApplication;

/* ApplicationType Start */
type MicroservicesArchitectureApplication = {
  microfrontend: boolean;
  gatewayServerPort: number;
};

type GatewayApplication = MicroservicesArchitectureApplication & {
  microfrontends: string[];
};

/*
Deterministic option causes types to be too complex
type ApplicationType = DeterministicOptionWithDerivedProperties<
  'applicationType',
  ['monolith', 'gateway', 'microservice'],
  [Record<string, never>, GatewayApplication, MicroservicesArchitectureApplication]
>;
*/
type ApplicationProperties = OptionWithDerivedProperties<'applicationType', ['monolith', 'gateway', 'microservice']> &
  GatewayApplication &
  MicroservicesArchitectureApplication;

/* ApplicationType End */

/* AuthenticationType Start */
/*
Deterministic option causes types to be too complex
type UserManagement =
  | {
      skipUserManagement: true;
      generateUserManagement: false;
      generateBuiltInUserEntity?: false;
      generateBuiltInAuthorityEntity: false;
    }
  | {
      skipUserManagement: false;
      generateBuiltInUserEntity?: boolean;
      generateUserManagement: true;
      user: any;
      userManagement: any;
      generateBuiltInAuthorityEntity: boolean;
      authority: any;
    };
    */
type UserManagement<Entity> = {
  skipUserManagement: boolean;
  generateUserManagement: boolean;
  generateBuiltInUserEntity?: boolean;
  generateBuiltInAuthorityEntity: boolean;
  user: Entity;
  userManagement: Entity;
  authority: Entity;
};

type JwtApplication = {
  jwtSecretKey: string;
};

type Oauth2Application = {
  syncUserWithIdp?: boolean;
};

type SessionApplication = {
  rememberMeKey: string;
};

/*
Deterministic option causes types to be too complex
type AuthenticationType = DeterministicOptionWithDerivedProperties<
  'authenticationType',
  ['jwt', 'oauth2', 'session'],
  [JwtApplication, Oauth2Application, SessionApplication]
>;
*/
type AuthenticationProperties<Entity> = OptionWithDerivedProperties<'authenticationType', ['jwt', 'oauth2', 'session']> &
  UserManagement<Entity> &
  JwtApplication &
  Oauth2Application &
  SessionApplication;

/* AuthenticationType End */

type QuirksApplication = {
  cypressBootstrapEntities?: boolean;
};

export type CommonClientServerApplication<Entity> = BaseApplication &
  QuirksApplication &
  AuthenticationProperties<Entity> &
  SpringBootApplication &
  ClientApplication &
  ExportApplicationPropertiesFromCommand<typeof import('../git/command.ts').default> &
  ExportApplicationPropertiesFromCommand<typeof import('../docker/command.ts').default> &
  import('../docker/types.d.ts').DockerApplicationType &
  ExportApplicationPropertiesFromCommand<typeof import('../project-name/command.ts').default> &
  ApplicationProperties & {
    clientRootDir: string;
    clientSrcDir: string;
    clientTestDir?: string;
    clientDistDir?: string;
    devServerPort: number;
    pages: string[];

    serverPort: number;
    backendType?: string;
    backendTypeJavaAny?: boolean;
    backendTypeSpringBoot?: boolean;
    temporaryDir?: string;

    hipsterName?: string;
    hipsterProductName?: string;
    hipsterHomePageProductName?: string;
    hipsterStackOverflowProductName?: string;
    hipsterBugTrackerProductName?: string;
    hipsterChatProductName?: string;
    hipsterTwitterUsername?: string;
    hipsterDocumentationLink?: string;
    hipsterTwitterLink?: string;
    hipsterProjectLink?: string;
    hipsterStackoverflowLink?: string;
    hipsterBugTrackerLink?: string;
    hipsterChatLink?: string;

    dockerServicesDir?: string;
    dockerServices?: string[];
    prettierFolders?: string;
    prettierExtensions?: string;

    loginRegex?: string;
    jsLoginRegex?: string;
  };

type ServiceDiscoveryApplication = OptionWithDerivedProperties<'serviceDiscoveryType', ['no', 'eureka', 'consul']>;

type MonitoringApplication = OptionWithDerivedProperties<'monitoring', ['no', 'elk', 'prometheus']>;

export type PlatformApplication = ServiceDiscoveryApplication & MonitoringApplication;

export type Config = BaseConfig & {
  baseName?: string;
  entities?: string[];
};

export type Options = BaseOptions & ApplicationOptions;

export type Features = BaseFeatures;
