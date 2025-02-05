export * from './Config'
export * from './Ncn'
export * from './NcnOperatorState'
export * from './NcnVaultSlasherTicket'
export * from './NcnVaultTicket'
export * from './Operator'
export * from './OperatorVaultTicket'

import { Config } from './Config'
import { Ncn } from './Ncn'
import { NcnOperatorState } from './NcnOperatorState'
import { NcnVaultSlasherTicket } from './NcnVaultSlasherTicket'
import { NcnVaultTicket } from './NcnVaultTicket'
import { Operator } from './Operator'
import { OperatorVaultTicket } from './OperatorVaultTicket'

export const accountProviders = {
  Config,
  Ncn,
  NcnOperatorState,
  NcnVaultSlasherTicket,
  NcnVaultTicket,
  Operator,
  OperatorVaultTicket,
}
