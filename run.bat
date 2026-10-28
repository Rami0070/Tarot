@echo off
echo ================================================================
echo   UNIVERSAL TAROT - Local Launcher
echo ================================================================
echo.

python -c "import sys" 2>nul
if %ERRORLEVEL% EQU 0 (
    echo Starting app.py with Python...
    python app.py
    exit /b 0
)

py -c "import sys" 2>nul
if %ERRORLEVEL% EQU 0 (
    echo Starting app.py with Py launcher...
    py app.py
    exit /b 0
)

echo Starting standalone index.html in default browser...
start "" "%~dp0index.html"
exit /b 0
