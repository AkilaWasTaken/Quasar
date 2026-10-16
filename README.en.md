<p align="center">
  <img src="public/logo.png" alt="Quasar" width="140" />
</p>

<h1 align="center">Quasar — FTC #19097</h1>

<p align="center">
  Website of the Quasar robotics team from Huși, Vaslui, Romania.<br />
  <a href="https://quasarftc.com"><strong>quasarftc.com</strong></a>
</p>

<p align="center">
  <a href="README.md">Română</a> · <strong>English</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-20232a?logo=react&logoColor=61dafb" alt="React 19" />
  <img src="https://img.shields.io/badge/Three.js-r181-000000?logo=three.js&logoColor=white" alt="Three.js" />
  <img src="https://img.shields.io/badge/Vite-7-646cff?logo=vite&logoColor=white" alt="Vite 7" />
  <img src="https://img.shields.io/badge/TypeScript-5.9-3178c6?logo=typescript&logoColor=white" alt="TypeScript" />
</p>

---

We wanted a site that doesn't look like a school template. So it's a single 3D scene the camera flies
through from left to right, and every stop is a "chapter": the robot, awards, the team, outreach,
sponsors, donations and contact. A video camera HUD sits on top of everything, with REC, a timecode
and viewfinder corners.

## Running it locally

You need Node 20 or newer.

```bash
git clone https://github.com/Quasar-Robotics/Quasar-Website.git
cd Quasar-Website
npm install
cp .env.example .env   # optional, only if you want to test donations
npm run dev
```

| Command                | What it does                                    |
| ---------------------- | ----------------------------------------------- |
| `npm run dev`          | local server with hot reload                    |
| `npm run dev:host`     | local server you can open from a phone on the same network |
| `npm run build`        | type-checks and builds into `dist/`             |
| `npm run typecheck`    | type-checks without building                    |
| `npm run lint`         | ESLint on the whole project                     |
| `npm run lint:fix`     | fixes what ESLint can fix on its own            |
| `npm run check`        | runs lint and build                             |
| `npm run preview`      | serves the `dist/` build locally                |
| `npm run preview:host` | serves the build and exposes it on your local network |

## How it's organised

```
src/
├── config/          all the site content (team, awards, sponsors, outreach, contact)
├── components/
│   ├── chapters/    one folder per chapter
│   ├── core/        the Three.js scene, the starfield, the particles
│   └── ui/          the HUD, chapter headers, the modal
├── hooks/           camera, input (scroll / keyboard / swipe), render loop
└── utils/           Three.js and scroll helpers

public/
├── models/          the robot model (Robot.glb, Draco-compressed)
├── team/            team member photos
├── outreach/        event photos
└── draco/           the Draco decoder
```

## Changing the content

Almost everything you see on the site lives in `src/config/`, so you don't have to dig through components.

- **New member**: put the photo in `public/team/` and add an object to `team.config.ts`. Keep photos small
  (around 480px on the long side). If a member has no photo, their initial is shown instead.
- **New award**: one line in `awards.config.ts`. With `isMain: true` the award is highlighted.
- **Outreach event**: the photo goes in `public/outreach/`, the text in `outreach.config.ts`.
- **Sponsor**: one line in `sponsors.config.ts`.
- **The robot**: put the model at `public/models/Robot.glb` (Draco-compressed). While the file is
  missing, the chapter shows "BIOBUZZ — ROBOT IN THE WORKS" written in pollen. The file is checked at
  build time, so restart `npm run dev` after adding it.
- **Chapters**: their order and positions in the scene are in `chapters.config.ts`. For a new chapter,
  also create the component in `components/chapters/` and register it in `components/chapters/index.ts`.

## Donations

The donate button sends people to a Stripe Payment Link with the amount already filled in. Stripe
handles the payment and the receipt, and we never see any card details.

Setup:

1. In Stripe: **Payment Links → New**, with "Customers choose what to pay" and RON as the currency.
2. After payment, redirect to `https://quasarftc.com/?donation=success`.
3. Put the link in `VITE_STRIPE_PAYMENT_LINK`, locally in `.env` and in the Vercel project settings.

The variable is read at build time, so you need to redeploy after changing it.

## Deploy

The site is hosted on Vercel. Every push to `main` deploys automatically. Security headers and asset
caching are set in `vercel.json`. Page views are tracked with Vercel Analytics.

## Contact

You can reach us at [contact@quasarftc.com](mailto:contact@quasarftc.com), on
[Instagram](https://www.instagram.com/quasarftc), [TikTok](https://www.tiktok.com/@quasarftc) and
[YouTube](https://www.youtube.com/@quasarftc).

If you're on another FTC team and want to start from this code, go for it. We'd just love a message or
a link back.

## License

The code is under the [MIT](LICENSE) license. The photos, the logo and the robot model belong to the
Quasar team.
