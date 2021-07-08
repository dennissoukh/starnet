# Starnet

Elegant web-based astronomy written in JavaScript 🪐🌌

## Structure

| Codebase        | Description        |
| :-------------- | :----------------- |
| core            | NodeJS Fastify API |
| client          | React Application  |

## Branches

- staging -> pr this branch for everything
- prod -> don't touch, this is what's running in prod

## Data Sources

| Source          | Description        |
| :-------------- | :----------------- |
| HYG 3.0         | Database containing all stars in Hipparcos, Yale Bright Star, and Gliese catalogs (almost 120,000 stars) |
| DSO             | Approximately 220K deep sky objects, mostly galaxies, but also all known NGC and IC objects |
| Constellation Lines | Stick figures used to depict the 88 astronomical constellations |
