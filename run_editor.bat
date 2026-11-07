@echo off
title EduSphere - Slides Data Editor
cd /d "%~dp0"
python slides_editor.py
if %errorlevel% neq 0 pause
