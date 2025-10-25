function Test-ScriptsStructure {
    <#
    .SYNOPSIS
    Validates or inspects expected script structure components.

    .DESCRIPTION
    Dynamically checks for the presence of key files and folders used in orchestration and phase execution.
    Returns either a boolean (for validation) or a detailed status object (for diagnostics/audit), with optional missing component output.

    .PARAMETER Base
    The base path to inspect.

    .PARAMETER StructureMap
    A hashtable defining component names and associated test logic blocks.

    .PARAMETER Detailed
    If set, returns a structured object with per-component flags and metadata.

    .PARAMETER ShowMissing
    If set, prints a list of missing components to the console.

    .EXAMPLE
    Test-ScriptsStructure -Base $base -StructureMap $map -Detailed -ShowMissing

    .NOTES
    Author: Tomasz Sielski
    Version: 3.2
    #>
    [CmdletBinding()]
    [OutputType([bool], [pscustomobject])]
    param (
        [Parameter(Mandatory, Position = 0)]
        [string]$Base,

        [Parameter(Mandatory)]
        [hashtable]$StructureMap,

        [switch]$Detailed,
        [switch]$ShowMissing
    )

    $sep = if ($IsLinux) { '/' } else { '\' }

    $results = [ordered]@{}
    foreach ($key in $StructureMap.Keys) {
        $results[$key] = & $StructureMap[$key]
        Write-Verbose "$key exists: $($results[$key])"
    }

    if ($ShowMissing) {
        $missing = ($results.GetEnumerator() | Where-Object { $_.Value -eq $false }).Name
        if ($missing.Count -gt 0) {
            Write-Host "`nMissing components:`n$($missing -join "`n")"
        }
    }

    if ($Detailed) {
        $results["BasePath"] = $Base
        $results["Timestamp"] = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss")
        return [PSCustomObject]$results
    }
    else {
        return ($results.Values -notcontains $false)
    }
}
function Get-AutoStructureMap {
    <#
    .SYNOPSIS
    Returns a structure map based on detected layout style and platform.

    .DESCRIPTION
    Determines whether the script structure follows a portable layout (relative paths)
    or a system layout (FHS-compliant Linux paths). Returns a hashtable of test logic blocks
    for each expected component, suitable for validation or diagnostics.

    .PARAMETER Base
    The base path to inspect.

    .EXAMPLE
    $base = [System.IO.Path]::GetFullPath("$PSScriptRoot/..")
    $map = Get-AutoStructureMap -Base $base

    .NOTES
    Author: Tomasz Sielski
    Version: 1.0
    #>
    [CmdletBinding()]
    param (
        [Parameter(Mandatory)]
        [string]$Base
    )

    $sep = if ($IsLinux) { '/' } else { '\' }

    # Detect layout style
    $isSystemLayout = $IsLinux -and (
        ($Base -like "/opt/*") -or
        ($Base -like "/usr/local/*") -or
        ($Base -like "/etc/*") -or
        ($Base -like "/var/*")
    )

    # Define structure map
    if ($isSystemLayout) {
        return @{
            "EnvFile"       = { Test-Path "/etc/myapp/.env.ps1" }
            "PhaseScripts"  = { (Get-ChildItem "$Base${sep}bin${sep}phase*.ps1" -ErrorAction SilentlyContinue).Count -gt 0 }
            "Orchestrator"  = { Test-Path "$Base${sep}sbin${sep}run-all.ps1" }
            "ModulesFolder" = { Test-Path "/usr/local/lib/myapp" }
            "VariableStore" = { Test-Path "/var/lib/myapp" }
        }
    }

    return @{
        "EnvFile"       = { Test-Path "$Base${sep}etc${sep}.env.ps1" }
        "PhaseScripts"  = { (Get-ChildItem "$Base${sep}bin${sep}phase*.ps1" -ErrorAction SilentlyContinue).Count -gt 0 }
        "Orchestrator"  = { Test-Path "$Base${sep}sbin${sep}run-all.ps1" }
        "ModulesFolder" = { Test-Path "$Base${sep}usr" }
        "VariableStore" = { Test-Path "$Base${sep}var" }
    }
}