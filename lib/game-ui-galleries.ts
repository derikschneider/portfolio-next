export type GalleryImage = {
  src: string;
  alt: string;
  caption: string;
};

export type StudioGallery = {
  id: "volition" | "netherrealm" | "state-farm" | "novant-health";
  studio: string;
  description: string;
  // "stack" (default, omit the field) — the fanned collection-preview card.
  // "sideBySide" — images shown directly, no preview card; still opens the
  // same Lightbox. Use for small, fully-known image sets (see State Farm).
  layout?: "stack" | "sideBySide";
  images: GalleryImage[];
};

// Reorganized 2026-07-29 — Derik cleaned up/renamed the source folders into
// per-title subfolders (hud/, menus/, screens/, icons/) with "not used"
// subfolders holding shots he decided not to feature (excluded here on
// purpose, not an oversight — see .gitignore, those never even reach the
// repo). Injustice's character-select/, concepts/, and wireframes/
// subfolders carry numbered filenames — order below follows that numbering.
export const gameUIGalleries: StudioGallery[] = [
  {
    id: "volition",
    studio: "Volition",
    description:
      "Saints Row 2 and Red Faction: Armageddon — HUD, menus, and the vehicle paint rendering system.",
    images: [
      {
        src: "/case-studies/volition-netherrealm/volition/saints-row-2/title.jpg",
        alt: "Saints Row 2 UI reference sheet",
        caption: "Saints Row 2 — UI reference sheet",
      },
      {
        src: "/case-studies/volition-netherrealm/volition/saints-row-2/menus/sr2-main-menu.jpg",
        alt: "Saints Row 2 main menu",
        caption: "Saints Row 2 — main menu",
      },
      {
        src: "/case-studies/volition-netherrealm/volition/saints-row-2/menus/sr2-drive-thru.jpg",
        alt: "Saints Row 2 drive-thru UI",
        caption: "Saints Row 2 — drive-thru UI",
      },
      {
        src: "/case-studies/volition-netherrealm/volition/saints-row-2/menus/radio-stations.png",
        alt: "Saints Row 2 radio stations UI",
        caption: "Saints Row 2 — radio stations",
      },
      {
        src: "/case-studies/volition-netherrealm/volition/saints-row-2/menus/sr2-car-paint.jpg",
        alt: "Saints Row 2 vehicle paint rendering system",
        caption: "Saints Row 2 — vehicle paint rendering system",
      },
      {
        src: "/case-studies/volition-netherrealm/volition/saints-row-2/hud/sr2-hud-1.jpg",
        alt: "Saints Row 2 HUD",
        caption: "Saints Row 2 — HUD",
      },
      {
        src: "/case-studies/volition-netherrealm/volition/saints-row-2/hud/sr2-hud-zombie.jpg",
        alt: "Saints Row 2 Zombie Uprising HUD",
        caption: "Saints Row 2 — Zombie Uprising HUD",
      },
      {
        src: "/case-studies/volition-netherrealm/volition/saints-row-2/hud/sr2-big-buttons.png",
        alt: "Saints Row 2 large button UI",
        caption: "Saints Row 2 — big button UI",
      },
      {
        src: "/case-studies/volition-netherrealm/volition/saints-row-2/icons/sr2-icon-samples.jpg",
        alt: "Saints Row 2 icon samples",
        caption: "Saints Row 2 — icon samples",
      },
      {
        src: "/case-studies/volition-netherrealm/volition/saints-row-2/icons/sr2-radio-icons.jpg",
        alt: "Saints Row 2 radio icon set",
        caption: "Saints Row 2 — radio icons",
      },
      {
        src: "/case-studies/volition-netherrealm/volition/saints-row-2/icons/sr2-eyes.jpg",
        alt: "Saints Row 2 character customization, eyes",
        caption: "Saints Row 2 — character customization (eyes)",
      },
      {
        src: "/case-studies/volition-netherrealm/volition/saints-row-2/screens/sr2-complete-mission.jpg",
        alt: "Saints Row 2 mission complete screen",
        caption: "Saints Row 2 — mission complete",
      },
      {
        src: "/case-studies/volition-netherrealm/volition/saints-row-2/screens/sr2-complete-fuzz.jpg",
        alt: "Saints Row 2 Fuzz mission complete screen",
        caption: "Saints Row 2 — mission complete (Fuzz)",
      },
      {
        src: "/case-studies/volition-netherrealm/volition/saints-row-2/screens/sr2-phone.jpg",
        alt: "Saints Row 2 phone UI",
        caption: "Saints Row 2 — phone UI",
      },
      {
        src: "/case-studies/volition-netherrealm/volition/red-faction-armageddon/title.jpg",
        alt: "Red Faction: Armageddon title card",
        caption: "Red Faction: Armageddon — title card",
      },
      {
        src: "/case-studies/volition-netherrealm/volition/red-faction-armageddon/menus/main-menu-1.png",
        alt: "Red Faction: Armageddon main menu",
        caption: "Red Faction: Armageddon — main menu",
      },
      {
        src: "/case-studies/volition-netherrealm/volition/red-faction-armageddon/menus/ruin-menu.jpg",
        alt: "Red Faction: Armageddon Ruin mode menu",
        caption: "Red Faction: Armageddon — Ruin mode menu",
      },
      {
        src: "/case-studies/volition-netherrealm/volition/red-faction-armageddon/hud/weapon-hud.jpg",
        alt: "Red Faction: Armageddon weapon HUD",
        caption: "Red Faction: Armageddon — weapon HUD",
      },
      {
        src: "/case-studies/volition-netherrealm/volition/red-faction-armageddon/hud/power-hud.jpg",
        alt: "Red Faction: Armageddon power HUD",
        caption: "Red Faction: Armageddon — power HUD",
      },
      {
        src: "/case-studies/volition-netherrealm/volition/red-faction-armageddon/hud/hud-various-1.png",
        alt: "Red Faction: Armageddon HUD variations",
        caption: "Red Faction: Armageddon — HUD variations",
      },
      {
        src: "/case-studies/volition-netherrealm/volition/red-faction-armageddon/hud/ruin-end-timer.png",
        alt: "Red Faction: Armageddon Ruin mode end timer",
        caption: "Red Faction: Armageddon — Ruin mode end timer",
      },
      {
        src: "/case-studies/volition-netherrealm/volition/red-faction-armageddon/screens/loading-1.png",
        alt: "Red Faction: Armageddon loading screen",
        caption: "Red Faction: Armageddon — loading screen",
      },
      {
        src: "/case-studies/volition-netherrealm/volition/red-faction-armageddon/screens/saving-1.png",
        alt: "Red Faction: Armageddon saving indicator",
        caption: "Red Faction: Armageddon — saving indicator",
      },
      {
        src: "/case-studies/volition-netherrealm/volition/red-faction-armageddon/screens/inventory-1.png",
        alt: "Red Faction: Armageddon inventory screen",
        caption: "Red Faction: Armageddon — inventory screen",
      },
      {
        src: "/case-studies/volition-netherrealm/volition/red-faction-armageddon/screens/upgrades-1.png",
        alt: "Red Faction: Armageddon upgrades screen",
        caption: "Red Faction: Armageddon — upgrades screen",
      },
      {
        src: "/case-studies/volition-netherrealm/volition/red-faction-armageddon/screens/ruin-score.jpg",
        alt: "Red Faction: Armageddon Ruin mode score screen",
        caption: "Red Faction: Armageddon — Ruin mode score screen",
      },
    ],
  },
  {
    id: "netherrealm",
    studio: "NetherRealm",
    description:
      "Mortal Kombat (2011), Mortal Kombat VITA, Injustice: Gods Among Us, and unreleased Batman: Arkham Lockdown icon work.",
    images: [
      {
        src: "/case-studies/volition-netherrealm/netherrealm/mortal-kombat/mk-challenge-tower-slot-machine-icons.jpg",
        alt: "Mortal Kombat Challenge Tower slot machine icon set",
        caption: "Mortal Kombat — Challenge Tower slot machine icons",
      },
      {
        src: "/case-studies/volition-netherrealm/netherrealm/mortal-kombat/mk-koth-avatars.jpg",
        alt: "Mortal Kombat King of the Hill avatar icon set",
        caption: "Mortal Kombat — King of the Hill avatar icons",
      },
      {
        src: "/case-studies/volition-netherrealm/netherrealm/mortal-kombat-vita/vita-challenge-tower.jpg",
        alt: "Mortal Kombat VITA Challenge Tower screen",
        caption: "Mortal Kombat VITA — Challenge Tower",
      },
      {
        src: "/case-studies/volition-netherrealm/netherrealm/batman-arkham-lockdown/icons.png",
        alt: "Batman: Arkham Lockdown icon set",
        caption: "Batman: Arkham Lockdown — icon set (unreleased)",
      },
      {
        src: "/case-studies/volition-netherrealm/netherrealm/injustice/concepts/1-main-menu.jpg",
        alt: "Injustice: Gods Among Us concept art, main menu",
        caption: "Injustice: Gods Among Us — concept art, main menu",
      },
      {
        src: "/case-studies/volition-netherrealm/netherrealm/injustice/concepts/2-single-player-chapter-select-og.jpg",
        alt: "Injustice: Gods Among Us concept art, single-player chapter select",
        caption: "Injustice: Gods Among Us — concept art, single-player chapter select",
      },
      {
        src: "/case-studies/volition-netherrealm/netherrealm/injustice/concepts/3-single-player-chapter-select-alt.jpg",
        alt: "Injustice: Gods Among Us concept art, single-player chapter select, alternate",
        caption: "Injustice: Gods Among Us — concept art, chapter select (alternate)",
      },
      {
        src: "/case-studies/volition-netherrealm/netherrealm/injustice/concepts/4-healthbar-states.jpg",
        alt: "Injustice: Gods Among Us concept art, health bar states",
        caption: "Injustice: Gods Among Us — concept art, health bar states",
      },
      {
        src: "/case-studies/volition-netherrealm/netherrealm/injustice/character-select/1-player-select.jpg",
        alt: "Injustice: Gods Among Us player select screen",
        caption: "Injustice: Gods Among Us — player select",
      },
      {
        src: "/case-studies/volition-netherrealm/netherrealm/injustice/character-select/2-player-select-confirmed.jpg",
        alt: "Injustice: Gods Among Us player select screen, confirmed state",
        caption: "Injustice: Gods Among Us — player select, confirmed",
      },
      {
        src: "/case-studies/volition-netherrealm/netherrealm/injustice/screens/challenge-char-select-thin-17-2-default.jpg",
        alt: "Injustice: Gods Among Us Challenge mode character select",
        caption: "Injustice: Gods Among Us — Challenge mode character select",
      },
      {
        src: "/case-studies/volition-netherrealm/netherrealm/injustice/wireframes/0-mp-menu.png",
        alt: "Injustice: Gods Among Us wireframe, multiplayer menu",
        caption: "Injustice: Gods Among Us — wireframe, multiplayer menu",
      },
      {
        src: "/case-studies/volition-netherrealm/netherrealm/injustice/wireframes/1-koth-live-match.png",
        alt: "Injustice: Gods Among Us wireframe, King of the Hill live match",
        caption: "Injustice: Gods Among Us — wireframe, King of the Hill live match",
      },
      {
        src: "/case-studies/volition-netherrealm/netherrealm/injustice/wireframes/2-koth-round-end-xp.png",
        alt: "Injustice: Gods Among Us wireframe, King of the Hill round-end XP",
        caption: "Injustice: Gods Among Us — wireframe, King of the Hill round-end XP",
      },
      {
        src: "/case-studies/volition-netherrealm/netherrealm/injustice/wireframes/3-stats-ranked-1v1.png",
        alt: "Injustice: Gods Among Us wireframe, ranked 1v1 stats",
        caption: "Injustice: Gods Among Us — wireframe, ranked 1v1 stats",
      },
      {
        src: "/case-studies/volition-netherrealm/netherrealm/injustice/wireframes/4-survival-1.png",
        alt: "Injustice: Gods Among Us wireframe, Survival mode",
        caption: "Injustice: Gods Among Us — wireframe, Survival mode",
      },
      {
        src: "/case-studies/volition-netherrealm/netherrealm/injustice/wireframes/5-survival-searching.png",
        alt: "Injustice: Gods Among Us wireframe, Survival mode searching",
        caption: "Injustice: Gods Among Us — wireframe, Survival mode searching",
      },
      {
        src: "/case-studies/volition-netherrealm/netherrealm/injustice/wireframes/6-survival-connecting.png",
        alt: "Injustice: Gods Among Us wireframe, Survival mode connecting",
        caption: "Injustice: Gods Among Us — wireframe, Survival mode connecting",
      },
      {
        src: "/case-studies/volition-netherrealm/netherrealm/injustice/wireframes/7-survival-opponent-found.png",
        alt: "Injustice: Gods Among Us wireframe, Survival mode opponent found",
        caption: "Injustice: Gods Among Us — wireframe, Survival mode opponent found",
      },
      {
        src: "/case-studies/volition-netherrealm/netherrealm/injustice/wireframes/8-training.png",
        alt: "Injustice: Gods Among Us wireframe, training mode",
        caption: "Injustice: Gods Among Us — wireframe, training mode",
      },
    ],
  },
];
