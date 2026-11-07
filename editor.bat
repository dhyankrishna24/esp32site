@echo off
title EduSphere - Slides Data Editor
cd /d "%~dp0"
echo ====================================================
echo Starting EduSphere Slides Data Desktop Studio...
echo ====================================================
python slides_editor.py
if %errorlevel% neq 0 (
    echo.
    echo An error occurred running python slides_editor.py.
    pause
)
