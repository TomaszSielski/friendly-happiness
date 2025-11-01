name: Feature Request
description: Suggest a new capability or improvement
title: "[Feature] <brief description>"
labels: [enhancement, needs-triage]
assignees: []

body:
  - type: markdown
    attributes:
      value: |
        Thanks for suggesting a feature! Please describe how it improves auditability, maintainability, or user experience.

  - type: input
    id: context
    attributes:
      label: Context
      description: What problem does this solve or improve?
      placeholder: "Improve layout detection for Linux onboarding"

  - type: textarea
    id: proposal
    attributes:
      label: Proposed Solution
      description: Describe the feature or enhancement

  - type: textarea
    id: impact
    attributes:
      label: Impact
      description: How does this help with audit clarity, restart safety, or DevOps workflows?