# Event Schedule

This repository contains a Vue frontend and a Node.js backend.

## Linting

Run `npm run lint` from the repository root to check both frontend and backend.

## Building

Run `npm run build` to build both applications.

## Rich Text Descriptions

Event descriptions are stored as rich text JSON objects. Each time a
description is saved the backend creates a new `RichTextSnapshot` entry and
updates the event to reference the latest snapshot. Older snapshots remain in
the database so previous versions can be restored if necessary.
