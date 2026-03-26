# Deployment Instructies - MBO Bouwkunde Web App

Deze handleiding helpt u stap-voor-stap om uw web applicatie online te zetten via GitHub Pages of Vercel.

---

## Optie 1: GitHub Pages (Gratis en eenvoudig)

### Stap 1: Bestanden voorbereiden
1. Download alle projectbestanden naar uw computer
2. Zorg dat u de volgende mappenstructuur heeft:
   ```
   mbo-bouwkunde-webapp/
   ├── dist/                 (dit is de build folder)
   ├── src/                  (broncode)
   ├── package.json
   ├── vite.config.ts
   └── ... (andere bestanden)
   ```

### Stap 2: GitHub account aanmaken
1. Ga naar https://github.com
2. Klik op "Sign up" rechts bovenin
3. Volg de stappen om een gratis account aan te maken
4. Bevestig uw e-mailadres

### Stap 3: Nieuwe repository aanmaken
1. Log in op GitHub
2. Klik rechtsboven op het "+" icoon
3. Kies "New repository"
4. Vul in:
   - Repository name: `mbo-bouwkunde-webapp` (of een andere naam)
   - Beschrijving: "MBO Bouwkunde Educatieve Web Applicatie"
   - Kies "Public" (zodat GitHub Pages gratis is)
5. Klik op "Create repository"

### Stap 4: GitHub Desktop installeren (makkelijkste optie)
1. Download GitHub Desktop: https://desktop.github.com
2. Installeer het programma
3. Log in met uw GitHub account
4. Klik op "Clone a repository"
5. Selecteer de repository die u net heeft aangemaakt
6. Kies een locatie op uw computer en klik "Clone"

### Stap 5: Bestanden uploaden
1. Open de map waar u de repository heeft gekloond
2. Kopieer ALLE projectbestanden naar deze map
3. Open GitHub Desktop
4. U ziet nu alle bestanden links in beeld
5. Onderaan links, vul in bij "Summary": "Eerste versie van de app"
6. Klik op de blauwe knop "Commit to main"
7. Klik rechtsboven op "Push origin"

### Stap 6: GitHub Pages activeren
1. Ga naar uw repository op GitHub.com
2. Klik op "Settings" (tandwiel icoon bovenaan)
3. Scroll omlaag in het linker menu en klik op "Pages"
4. Bij "Source" selecteer: "GitHub Actions"
5. Klik op "Configure" bij de "Static HTML" optie

### Stap 7: Deployment workflow aanmaken
1. GitHub opent nu een bestand genaamd `.github/workflows/static.yml`
2. Vervang de VOLLEDIGE inhoud met deze code:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install dependencies
        run: npm install

      - name: Build
        run: npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

3. Klik op "Commit changes" rechtsboven
4. Klik nogmaals op "Commit changes" in het popup venster

### Stap 8: Wachten op deployment
1. Ga naar het "Actions" tabblad bovenaan uw repository
2. U ziet nu een workflow draaien (oranje stip)
3. Wacht tot deze klaar is (groene vinkje) - dit duurt 2-3 minuten
4. Als het klaar is, ga naar "Settings" > "Pages"
5. Bovenaan ziet u nu een link: "Your site is live at https://uwgebruikersnaam.github.io/mbo-bouwkunde-webapp"

### Stap 9: App testen
1. Klik op de link naar uw live website
2. Test of alle functionaliteiten werken
3. Deel de link met studenten en collega's

### Updates maken
Wanneer u wijzigingen wilt doorvoeren:
1. Pas bestanden aan op uw computer
2. Open GitHub Desktop
3. Commit de wijzigingen (stap 5 herhalen)
4. Push naar GitHub
5. De website wordt automatisch bijgewerkt binnen 2-3 minuten

---

## Optie 2: Vercel (Sneller en professioneler)

### Stap 1: Vercel account aanmaken
1. Ga naar https://vercel.com
2. Klik op "Sign Up"
3. Kies "Continue with GitHub"
4. Log in met uw GitHub account
5. Geef Vercel toegang tot uw GitHub repositories

### Stap 2: Project uploaden naar GitHub
Volg eerst **Optie 1, Stap 1 t/m 5** om uw project op GitHub te krijgen.

### Stap 3: Project importeren in Vercel
1. Log in op Vercel.com
2. Klik op "Add New..." rechtsboven
3. Kies "Project"
4. Zoek uw `mbo-bouwkunde-webapp` repository
5. Klik op "Import"

### Stap 4: Project configureren
1. Vercel detecteert automatisch dat het een Vite project is
2. Controleer deze instellingen:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. Klik op "Deploy"

### Stap 5: Wachten op deployment
1. Vercel bouwt nu uw applicatie (1-2 minuten)
2. Na afloop ziet u confetti en een "Congratulations" bericht
3. Klik op de screenshot of "Visit" om uw live website te zien

### Stap 6: Custom domein (optioneel)
1. Vercel geeft automatisch een URL zoals: `mbo-bouwkunde-webapp.vercel.app`
2. Wilt u een eigen domeinnaam (bijv. `bouwkunde.mijnschool.nl`)?
   - Ga naar uw project in Vercel
   - Klik op "Settings"
   - Klik op "Domains"
   - Volg de instructies om een custom domein te koppelen

### Updates maken
Vercel is gekoppeld aan uw GitHub repository:
1. Maak wijzigingen in uw code
2. Push naar GitHub (via GitHub Desktop)
3. Vercel detecteert dit automatisch en bouwt opnieuw
4. Uw website is binnen 1-2 minuten bijgewerkt

---

## Veelgestelde vragen

### Welke optie moet ik kiezen?
- **GitHub Pages**: Volledig gratis, goed voor educatieve projecten
- **Vercel**: Sneller, professionelere URL, betere performance, ook gratis

### Wat als er een fout optreedt?
1. Controleer of alle bestanden correct zijn geüpload
2. Kijk in het "Actions" tabblad (GitHub) of "Deployments" (Vercel) voor foutmeldingen
3. Controleer of de `dist` folder aanwezig is in uw project

### Hoe deel ik de app met studenten?
1. Kopieer de URL van uw live website
2. Deel deze via e-mail, Teams, of leeromgeving
3. De app werkt op alle apparaten: desktop, tablet, en mobiel

### Kan ik de app offline gebruiken?
Nee, de app moet online gehost zijn. Studenten hebben een internetverbinding nodig.

### Hoe zit het met privacy en data?
- Alle voortgang wordt lokaal opgeslagen in de browser van de student
- Er wordt geen data naar een externe server gestuurd
- Docenten kunnen geen voortgang van studenten inzien (dit is een standalone app)

### Kost dit geld?
- Beide opties zijn 100% gratis voor educatieve projecten
- Geen verborgen kosten
- Geen limieten op het aantal bezoekers

---

## Technische details voor IT-beheerders

### Technologieën
- **Frontend**: React 18 + TypeScript
- **Build tool**: Vite 6
- **Styling**: Vanilla CSS
- **Routing**: React Router v6

### Browser ondersteuning
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Performance
- First Load: ~240KB (gzipped: ~74KB)
- CSS: ~32KB (gzipped: ~5.4KB)
- Time to Interactive: < 2 seconden

### Beveiligingsoverwegingen
- Geen backend of database
- Geen gebruikersauthenticatie
- Geen cookies
- Alle data blijft lokaal in browser localStorage

---

## Contact en ondersteuning

Voor technische vragen of problemen:
1. Controleer eerst de FAQ hierboven
2. Bekijk de GitHub Issues pagina
3. Neem contact op met uw IT-afdeling

Veel succes met het deployen van uw MBO Bouwkunde Web App!
