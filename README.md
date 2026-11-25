# Melexis SSC Calibration Web App

[Web-App](https://vadergit.github.io/Melexis-SSC-Calibration-Web-App/) · [SSC Calibration Studio](https://vadergit.github.io/SSC-Calibration-Studio/)

Geführter Laborassistent nach dem ELMOS-Master: Sensor und Bereich, AFE-Abschätzung, Druck-/Temperaturmatrix, unabhängige Prüfung mit Toleranzgraph, Ausgangsentwurf, JSON/CSV und Druck/PDF. MLX90328 analog, MLX90329 SENT.

**Status: Offline-Prototyp.** Manuelle Werte und Simulation; generische lineare Modelle pro Temperatur mit Interpolation, keine Melexis-Festpunktkoeffizienten. Keine Hardwarekommunikation und keine RAM-/EEPROM-Schreiboperationen. Keine Produktionsfreigabe. Die Toleranzprüfung ist nur eine Modellprüfung, keine Chip-Verifikation.

## v0.2.0
32 nominale AFE-Gain-Stufen für beide Modelle mit Offset-DAC-Abschätzung, ADC-Reserve und Eingangsschritt; Sitzung speichern/laden, lokales Berichtsarchiv, Standardmesspunkte 10–90 %. [Hardware-Freigabepfad](docs/HARDWARE.md).

## Start und Tests
`python3 -m http.server 8000 --bind 127.0.0.1`, dann http://127.0.0.1:8000/. Tests: `node --test tests/*.test.mjs`.

## Hardware-Freigabepfad
- Vollständiges Programmierprotokoll (PTC-04 API oder dokumentierter Single-Wire-Transport), Timing, elektrische Schaltung und Identifikation verifizieren.
- Registeradressen, EEPROM-Map, Schutzbereiche, CRC, Schreibsequenzen, Festpunktformate und Kompensationsalgorithmus je Modell bestätigen.
- Read-only Treiber, originale EEPROM-Sicherung, RAM-Test, unabhängige reale Messung, explizite NVM-Freigabe, Rücklesung und Kaltstarttest auf entbehrlichem Chip implementieren.
- ESP32-C3/Arduino nur mit passender Hardwarebeschaltung und validierten Spannungspegeln. Kein ELMOS-Protokoll übernehmen.
- MLX90328 Datenblatt Rev.006, MLX90329 Rev.002: [90328](https://www.melexis.com/en/documents/documentation/datasheets/datasheet-mlx90328), [90329](https://www.melexis.com/en/documents/documentation/datasheets/datasheet-mlx90329).
