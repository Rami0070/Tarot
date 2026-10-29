@echo off
chcp 65001 >nul
title UNIVERSAL TAROT - 유니버셜 타로 로컬 실행기
echo ====================================================================
echo   ✦ UNIVERSAL TAROT · INTEGRATED EDITION (로컬 실행기) ✦
echo ====================================================================
echo.
echo 로컬 환경을 탐색하여 최적의 방식으로 타로 프로그램을 시작합니다...
echo.

cd /d "%~dp0"

:: 1. Python 설치 여부 확인 및 로컬 서버 실행
python -c "import sys" 2>nul
if %ERRORLEVEL% EQU 0 (
    echo [안내] Python 환경이 감지되었습니다. 로컬 웹 서버를 실행합니다...
    python app.py
    exit /b 0
)

py -c "import sys" 2>nul
if %ERRORLEVEL% EQU 0 (
    echo [안내] Python (py launcher) 환경이 감지되었습니다. 로컬 웹 서버를 실행합니다...
    py app.py
    exit /b 0
)

:: 2. Python 미설치 시 기본 웹 브라우저에서 직접 실행 (무설치 단독 실행)
echo [안내] Python 미설치 환경입니다. 별도 설치 없이 기본 웹 브라우저로 단독 실행합니다.
echo 브라우저 창이 열리면 바로 타로 리딩을 이용하실 수 있습니다.
echo.
start "" "%~dp0index.html"
exit /b 0