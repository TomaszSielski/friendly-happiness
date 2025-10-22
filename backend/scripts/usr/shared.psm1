# scripts/usr/shared.psm1
function Set-LogFile {
    param ([string]$Path)
    $Global:LogFilePath = $Path
    Logger -Message "Log file initialized at $Path" -Type "INFO"

}


function Logger {
    param (
        [string]$Message,
        [string]$Type = "INFO"
    )
$validTypes = @("INFO", "SUCCESS", "WARNING", "ERROR")
if ($validTypes -notcontains $Type.ToUpper()) {
    $Type = "INFO"
}

    if (-not $Global:LogFilePath) {
        throw "LogFilePath is not set. Use Set-LogFile first."
    }

    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $logLine = "[$timestamp] $($Type): $($Message)"
    Add-Content -Path $Global:LogFilePath -Value $logLine

    switch ($Type.ToUpper()) {
        "INFO"    { $color = "White" }
        "SUCCESS" { $color = "Green" }
        "WARNING" { $color = "Yellow" }
        "ERROR"   { $color = "Red" }
        default   { $color = "Gray" }
    }

    Write-Host $logLine -ForegroundColor $color
}
function Start-PhaseLog {
    param ([string]$Phase)
    Logger -Message "Starting phase $Phase" -Type "INFO"
}

function Complete-PhaseLog {
    param ([string]$Phase)
    Logger -Message "Phase $Phase completed successfully." -Type "SUCCESS"
    tracker -Phase $Phase
}

function Tracker {
    param (
        [string]$Phase
    )

    $basePath = [System.IO.Path]::GetFullPath("$PSScriptRoot\..")
    $phaseFile = Join-Path $basePath "var\.phase"
    Set-Content -Path $phaseFile -Value $Phase
}
