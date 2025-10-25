## Description

- Environment: Windows Server VM hosted on Hyper-V
- Purpose: Perform tasks in local Active Directory on behalf of users authenticated via the frontend app
- Identity Source: Users are registered in Microsoft Entra ID (tenant)
- Integration Goal: Enable secure, role-aware backend operations by linking Entra ID identities to local AD accounts
- Use Cases:
- Provision or update AD users based on frontend actions
- Query AD group membership for access control
- Log and audit identity-linked backend operations
- Security Model: Hybrid identity architecture with local AD and cloud Entra ID sync (via Microsoft Entra Connect)

## Prerequisites

Prerequisites

- Prepare Domain Controller (DC) via PowerShell
  []- Rename host (e.g. DC01)
  [] Install AD DS role and promote to domain controller
  [] Configure static IP and DNS
  [] Create test users and organizational units
  [] Download Cloud Sync from Entra ID portal
  Configure sync between local AD (corp.local) and Entra ID
- Set up UPN suffix alignment and password hash sync
- Confirm Sync Status
- Verify sync health in Entra Connect dashboard
- Confirm AD users appear in Entra ID portal
- Test login flow with synced users
- Install Development Tools
- .NET Framework
- Visual Studio Code
- PowerShell
- Git (for repo management and version control)
