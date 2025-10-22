#scripts/sbin/start.ps1

$base = [System.IO.Path]::GetFullPath("$PSScriptRoot\..")
function Test-HappinessStructure { 
    param ([string]$Base)

    return (
        (Test-Path "$Base\etc\.env.ps1") -and
        ((Get-ChildItem "$Base\bin\phase*.ps1" -ErrorAction SilentlyContinue).Count -gt 0) -and
        (Test-Path "$Base\sbin\run-all.ps1") -and
        (Test-Path "$Base\usr\shared.psm1") -and
        (Test-Path "$Base\var")
    )
}

if(!(Test-HappinessStructure -Base $base)){
Write-Host "Structute corrupted. Aborting"
exit 1
}



Import-Module "$Base\usr\shared.psm1"
. "$Base\etc\.env.ps1"

# Set the log file path
Set-LogFile -Path "$Base\var\run-log.txt"



# Validate required environment variables
$requiredVars = @(
    "DC_TEMP_PASSWORD", "DC_hostname", "DC_domainname",
    "DC_NETBIOSname", "ADForestSUFFIX", "DC_IP", "DC_SubnetMask",
    "DC_DefaultGateway", "DC_DNS", "DC_InterfaceAlias"
)

foreach ($var in $requiredVars) {
    if (-not (Get-Item -Path "Env:$var" -ErrorAction SilentlyContinue)) {
        Write-Error "Missing environment variable: $var"
        Logger -message "Missing environment variable: $var" -type "ERROR"
        exit 1
    }
}
### Executing ###
Logger -Message "Startup sequence initiated." -Type "INFO"


function Test-ScheduledTaskExists {
    param ([string]$TaskName)
    return ($null -ne (Get-ScheduledTask -TaskName $TaskName -ErrorAction SilentlyContinue))
}
# get operating system information
$os = Get-WmiObject -Class Win32_OperatingSystem
$env:OS_Name = $os.Caption
$env:OS_Version = $os.Version
$env:OS_Build = $os.BuildNumber

# task creating
$taskName = "HybridLab-AutoRunAll"
if (-not (Test-ScheduledTaskExists -TaskName $taskName)) {
    try {
        $action = New-ScheduledTaskAction -Execute "powershell.exe" -Argument "-NoProfile -ExecutionPolicy Bypass -File `"$scriptPath`""
        $trigger = New-ScheduledTaskTrigger -AtStartup
        $principal = New-ScheduledTaskPrincipal -UserId "SYSTEM" -RunLevel Highest
        Register-ScheduledTask -TaskName $taskName -Action $action -Trigger $trigger -Principal $principal -Description "Runs HybridLab automation at startup" -ErrorAction Stop
        Write-Host "Task '$taskName' has been created."
    } catch {
        Logger -message "Failed to create task '$taskName': $_" -type "ERROR"
    }
} else {
    Logger -message "Task '$taskName' already exists." -type "INFO"
}

Logger -message "OS: $($env:OS_Name) $($env:OS_Version) Build $($env:OS_Build)" -type "INFO"
Logger -message "Task '$taskName' checked/created. Rebooting now." -type "INFO"
Logger -message "Startup sequence finished" -type "INFO"

Start-Sleep -Seconds 5

Restart-Computer
