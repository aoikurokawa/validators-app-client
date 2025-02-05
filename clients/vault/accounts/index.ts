export * from "./Config";
export * from "./Vault";
export * from "./VaultNcnSlasherOperatorTicket";
export * from "./VaultNcnSlasherTicket";
export * from "./VaultNcnTicket";
export * from "./VaultOperatorDelegation";
export * from "./VaultStakerWithdrawalTicket";
export * from "./VaultUpdateStateTracker";

import { Config } from "./Config";
import { Vault } from "./Vault";
import { VaultNcnSlasherOperatorTicket } from "./VaultNcnSlasherOperatorTicket";
import { VaultNcnSlasherTicket } from "./VaultNcnSlasherTicket";
import { VaultNcnTicket } from "./VaultNcnTicket";
import { VaultOperatorDelegation } from "./VaultOperatorDelegation";
import { VaultStakerWithdrawalTicket } from "./VaultStakerWithdrawalTicket";
import { VaultUpdateStateTracker } from "./VaultUpdateStateTracker";

export const accountProviders = {
  Config,
  Vault,
  VaultNcnSlasherOperatorTicket,
  VaultNcnSlasherTicket,
  VaultNcnTicket,
  VaultOperatorDelegation,
  VaultStakerWithdrawalTicket,
  VaultUpdateStateTracker,
};
