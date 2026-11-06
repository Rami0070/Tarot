@echo off
title GitHub 소스코드 업로드
echo ================================================================
echo   UNIVERSAL TAROT - GitHub (Rami0070/Tarot) Upload
echo ================================================================
echo.
cd /d "%~dp0"

where git >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    if exist "C:\Program Files\Git\cmd\git.exe" set "PATH=C:\Program Files\Git\cmd;%PATH%"
)

echo [1/2] main 브랜치의 최신 커밋을 업로드합니다...
echo.
git push origin main
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ================================================================
    echo   [ERROR] Git push failed.
    echo ================================================================
    echo.
    pause
    exit /b %ERRORLEVEL%
)

echo.
echo [2/2] 버전 태그를 업로드합니다...
git push origin --tags

echo.
echo ================================================================
echo   [SUCCESS] GitHub 업로드가 성공적으로 완료되었습니다!
echo ================================================================
echo.
pause