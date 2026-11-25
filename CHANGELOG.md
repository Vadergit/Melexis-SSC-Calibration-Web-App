# Changelog

## v0.4.1
- ADC-Polarität nach Datenblatt korrigiert, nominelle Brücken-Rückrechnung.
- SDK-Identitätsprüfung, Schutz vor Wechsel während Messaufnahme, EEPROM-Diff, Diagnoseexport.

## v0.4.0
- Lokaler SDK-Lesepfad, EEPROM-Doppellesung, RAM-Dump, Live- und Messpunktaufnahme.
- Konfigurierbares COM-Profil ohne erfundene Methoden, getrennte Testsimulation.
- Hardwarevalidierung und Schreibpfad offen.

## v0.3.0 — 2026-11-25
- Originale ELMOS-Master-CSS, Header, acht Aufgabenkacheln und geführte Navigation.
- Geführt, klassisch, kompakt; Referenztemperaturen, 2–5 Druckpunkte, AFE-Modellgraph und separate Berechnung/Prüfung.
- EEPROM-Rohdatenimport, Offline-Logging, Archivsuche und Druckbericht.
- Keine Hardwarefreigabe; keine ELMOS-Befehle oder Register übernommen.

## v0.2.0 — 2026-11-25
- ELMOS-orientierte geführte Offline-Kalibrierung.
- MLX90328/90329: 32 nominale AFE-Stufen, Offset-DAC und ADC-Reserve.
- Druck-/Temperaturmatrix, Verifikation, Toleranzgraph, JSON/CSV/PDF-Druck, Sitzungsdateien und lokales Archiv.
- Hardwarezugriff weiterhin gesperrt: keine bestätigte Register-/Programmierschnittstelle.
