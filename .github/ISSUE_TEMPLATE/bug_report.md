---
name: Bug report
about: Create a report to help us improve
title: ''
labels: ''
assignees: ''

---

name: Bug Report
description: Report a reproducible issue with structure, layout, or scripting logic
title: "[Bug] <brief description>"
labels: [bug, needs-triage]
assignees: []

body:
  - type: markdown
    attributes:
      value: |
        Thanks for reporting a bug! Please include as much detail as possible to help reproduce and diagnose the issue.

  - type: input
    id: environment
    attributes:
      label: Environment
      description: OS, shell, and any relevant platform details
      placeholder: "Windows 11, PowerShell 7.4, Azure CLI 2.56"

  - type: textarea
    id: steps
    attributes:
      label: Steps to Reproduce
      description: What did you do and what went wrong?
      placeholder: |
        1. Ran `Start-Onboarding.ps1`
        2. Layout detection failed with error code 42
        3. Verbose logs showed missing phase marker

  - type: textarea
    id: expected
    attributes:
      label: Expected Behavior
      description: What should have happened?

  - type: textarea
    id: logs
    attributes:
      label: Relevant Logs or Output
      description: Include verbose output or error messages
      render: shell
