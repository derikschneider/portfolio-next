export type GalleryImage = {
  src: string;
  alt: string;
  caption: string;
};

export type StudioGallery = {
  id: "volition" | "netherrealm";
  studio: string;
  description: string;
  images: GalleryImage[];
};

// Full set, including all Injustice: Gods Among Us shots (added 2026-07-24,
// commit 23b111e) — not a placeholder. Derik may still trim which shots make
// the final cut (2026-07-27: confirmed no NDA concerns, just curation).
export const gameUIGalleries: StudioGallery[] = [
  {
    id: "volition",
    studio: "Volition",
    description:
      "Saints Row 2 and Red Faction: Armageddon — HUD, menus, and the vehicle paint rendering system.",
    images: [
      {
        src: "/case-studies/volition-netherrealm/volition/saints-row-2/saints-row-2-hires.jpg",
        alt: "Saints Row 2 UI reference sheet",
        caption: "Saints Row 2 — UI reference sheet",
      },
      {
        src: "/case-studies/volition-netherrealm/volition/saints-row-2/radio-stations.png",
        alt: "Saints Row 2 radio stations UI",
        caption: "Saints Row 2 — radio stations",
      },
      {
        src: "/case-studies/volition-netherrealm/volition/saints-row-2/sr2-radio-icons.jpg",
        alt: "Saints Row 2 radio icon set",
        caption: "Saints Row 2 — radio icons",
      },
      {
        src: "/case-studies/volition-netherrealm/volition/saints-row-2/sr2-phone.jpg",
        alt: "Saints Row 2 phone UI",
        caption: "Saints Row 2 — phone UI",
      },
      {
        src: "/case-studies/volition-netherrealm/volition/saints-row-2/sr2-main-menu.jpg",
        alt: "Saints Row 2 main menu",
        caption: "Saints Row 2 — main menu",
      },
      {
        src: "/case-studies/volition-netherrealm/volition/saints-row-2/sr2-big-buttons.png",
        alt: "Saints Row 2 large button UI",
        caption: "Saints Row 2 — big button UI",
      },
      {
        src: "/case-studies/volition-netherrealm/volition/saints-row-2/sr2-hud-1.jpg",
        alt: "Saints Row 2 HUD",
        caption: "Saints Row 2 — HUD",
      },
      {
        src: "/case-studies/volition-netherrealm/volition/saints-row-2/sr2-hud-zombie.jpg",
        alt: "Saints Row 2 Zombie Uprising HUD",
        caption: "Saints Row 2 — Zombie Uprising HUD",
      },
      {
        src: "/case-studies/volition-netherrealm/volition/saints-row-2/sr2-icon-samples.jpg",
        alt: "Saints Row 2 icon samples",
        caption: "Saints Row 2 — icon samples",
      },
      {
        src: "/case-studies/volition-netherrealm/volition/saints-row-2/sr2-car-paint.jpg",
        alt: "Saints Row 2 vehicle paint rendering system",
        caption: "Saints Row 2 — vehicle paint rendering system",
      },
      {
        src: "/case-studies/volition-netherrealm/volition/saints-row-2/sr2-drive-thru.jpg",
        alt: "Saints Row 2 drive-thru UI",
        caption: "Saints Row 2 — drive-thru UI",
      },
      {
        src: "/case-studies/volition-netherrealm/volition/saints-row-2/sr2-complete-mission.jpg",
        alt: "Saints Row 2 mission complete screen",
        caption: "Saints Row 2 — mission complete",
      },
      {
        src: "/case-studies/volition-netherrealm/volition/saints-row-2/sr2-complete-fuzz.jpg",
        alt: "Saints Row 2 Fuzz mission complete screen",
        caption: "Saints Row 2 — mission complete (Fuzz)",
      },
      {
        src: "/case-studies/volition-netherrealm/volition/saints-row-2/sr2-eyes.jpg",
        alt: "Saints Row 2 character customization, eyes",
        caption: "Saints Row 2 — character customization (eyes)",
      },
      {
        src: "/case-studies/volition-netherrealm/volition/red-faction-armageddon/thumbnail-1.jpg",
        alt: "Red Faction: Armageddon UI overview",
        caption: "Red Faction: Armageddon — overview",
      },
      {
        src: "/case-studies/volition-netherrealm/volition/red-faction-armageddon/weapon-hud.jpg",
        alt: "Red Faction: Armageddon weapon HUD",
        caption: "Red Faction: Armageddon — weapon HUD",
      },
      {
        src: "/case-studies/volition-netherrealm/volition/red-faction-armageddon/power-hud.jpg",
        alt: "Red Faction: Armageddon power HUD",
        caption: "Red Faction: Armageddon — power HUD",
      },
      {
        src: "/case-studies/volition-netherrealm/volition/red-faction-armageddon/ruin-hud.jpg",
        alt: "Red Faction: Armageddon Ruin mode HUD",
        caption: "Red Faction: Armageddon — Ruin mode HUD",
      },
      {
        src: "/case-studies/volition-netherrealm/volition/red-faction-armageddon/ruin-menu.jpg",
        alt: "Red Faction: Armageddon Ruin mode menu",
        caption: "Red Faction: Armageddon — Ruin mode menu",
      },
      {
        src: "/case-studies/volition-netherrealm/volition/red-faction-armageddon/ruin-loading.jpg",
        alt: "Red Faction: Armageddon Ruin mode loading screen",
        caption: "Red Faction: Armageddon — Ruin mode loading screen",
      },
      {
        src: "/case-studies/volition-netherrealm/volition/red-faction-armageddon/ruin-score.jpg",
        alt: "Red Faction: Armageddon Ruin mode score screen",
        caption: "Red Faction: Armageddon — Ruin mode score screen",
      },
      {
        src: "/case-studies/volition-netherrealm/volition/red-faction-armageddon/red-faction-hires.webp",
        alt: "Red Faction: Armageddon UI reference sheet",
        caption: "Red Faction: Armageddon — UI reference sheet",
      },
      {
        src: "/case-studies/volition-netherrealm/volition/red-faction-armageddon/title-card.png",
        alt: "Red Faction: Armageddon title card",
        caption: "Red Faction: Armageddon — title card",
      },
      {
        src: "/case-studies/volition-netherrealm/volition/red-faction-armageddon/main-menu-1.png",
        alt: "Red Faction: Armageddon main menu",
        caption: "Red Faction: Armageddon — main menu",
      },
      {
        src: "/case-studies/volition-netherrealm/volition/red-faction-armageddon/pause-screen.png",
        alt: "Red Faction: Armageddon pause screen",
        caption: "Red Faction: Armageddon — pause screen",
      },
      {
        src: "/case-studies/volition-netherrealm/volition/red-faction-armageddon/loading-1.png",
        alt: "Red Faction: Armageddon loading screen",
        caption: "Red Faction: Armageddon — loading screen",
      },
      {
        src: "/case-studies/volition-netherrealm/volition/red-faction-armageddon/saving-1.png",
        alt: "Red Faction: Armageddon saving indicator",
        caption: "Red Faction: Armageddon — saving indicator",
      },
      {
        src: "/case-studies/volition-netherrealm/volition/red-faction-armageddon/inventory-1.png",
        alt: "Red Faction: Armageddon inventory screen",
        caption: "Red Faction: Armageddon — inventory screen",
      },
      {
        src: "/case-studies/volition-netherrealm/volition/red-faction-armageddon/upgrades-1.png",
        alt: "Red Faction: Armageddon upgrades screen",
        caption: "Red Faction: Armageddon — upgrades screen",
      },
      {
        src: "/case-studies/volition-netherrealm/volition/red-faction-armageddon/upgrades-2.png",
        alt: "Red Faction: Armageddon upgrades screen, alternate state",
        caption: "Red Faction: Armageddon — upgrades screen",
      },
      {
        src: "/case-studies/volition-netherrealm/volition/red-faction-armageddon/hud-various-1.png",
        alt: "Red Faction: Armageddon HUD variations",
        caption: "Red Faction: Armageddon — HUD variations",
      },
      {
        src: "/case-studies/volition-netherrealm/volition/red-faction-armageddon/hud-various-2.png",
        alt: "Red Faction: Armageddon HUD variations, alternate set",
        caption: "Red Faction: Armageddon — HUD variations",
      },
      {
        src: "/case-studies/volition-netherrealm/volition/red-faction-armageddon/ui-art-in-game.png",
        alt: "Red Faction: Armageddon in-game UI art",
        caption: "Red Faction: Armageddon — in-game UI art",
      },
      {
        src: "/case-studies/volition-netherrealm/volition/red-faction-armageddon/infest-start-1.png",
        alt: "Red Faction: Armageddon Infestation mode start screen",
        caption: "Red Faction: Armageddon — Infestation mode start",
      },
      {
        src: "/case-studies/volition-netherrealm/volition/red-faction-armageddon/ruin-end-timer.png",
        alt: "Red Faction: Armageddon Ruin mode end timer",
        caption: "Red Faction: Armageddon — Ruin mode end timer",
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
        src: "/case-studies/volition-netherrealm/netherrealm/mortal-kombat/mk-psn-avatars.jpg",
        alt: "Mortal Kombat PSN avatar icon set",
        caption: "Mortal Kombat — PSN avatar icons",
      },
      {
        src: "/case-studies/volition-netherrealm/netherrealm/mortal-kombat/mk-slot-machine-icons.jpg",
        alt: "Mortal Kombat Krypt slot machine icon set",
        caption: "Mortal Kombat — Krypt slot machine icons",
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
        src: "/case-studies/volition-netherrealm/netherrealm/injustice/concept-a-1-1.jpg",
        alt: "Injustice: Gods Among Us concept art",
        caption: "Injustice: Gods Among Us — concept art",
      },
      {
        src: "/case-studies/volition-netherrealm/netherrealm/injustice/concept-a-7.jpg",
        alt: "Injustice: Gods Among Us concept art",
        caption: "Injustice: Gods Among Us — concept art",
      },
      {
        src: "/case-studies/volition-netherrealm/netherrealm/injustice/concept-c-3-3.jpg",
        alt: "Injustice: Gods Among Us concept art",
        caption: "Injustice: Gods Among Us — concept art",
      },
      {
        src: "/case-studies/volition-netherrealm/netherrealm/injustice/concept-f-2-1.jpg",
        alt: "Injustice: Gods Among Us concept art",
        caption: "Injustice: Gods Among Us — concept art",
      },
      {
        src: "/case-studies/volition-netherrealm/netherrealm/injustice/concept-f-4-1.jpg",
        alt: "Injustice: Gods Among Us concept art",
        caption: "Injustice: Gods Among Us — concept art",
      },
      {
        src: "/case-studies/volition-netherrealm/netherrealm/injustice/wireframe-training-character-select.png",
        alt: "Injustice: Gods Among Us training mode wireframe, character select",
        caption: "Injustice: Gods Among Us — training wireframe, character select",
      },
      {
        src: "/case-studies/volition-netherrealm/netherrealm/injustice/wireframe-training-detail-1.png",
        alt: "Injustice: Gods Among Us training mode wireframe, detail",
        caption: "Injustice: Gods Among Us — training wireframe, detail",
      },
      {
        src: "/case-studies/volition-netherrealm/netherrealm/injustice/wireframe-training-detail-2.png",
        alt: "Injustice: Gods Among Us training mode wireframe, detail",
        caption: "Injustice: Gods Among Us — training wireframe, detail",
      },
      {
        src: "/case-studies/volition-netherrealm/netherrealm/injustice/healthbar-crystal.jpg",
        alt: "Injustice: Gods Among Us health bar crystal UI",
        caption: "Injustice: Gods Among Us — health bar crystal UI",
      },
      {
        src: "/case-studies/volition-netherrealm/netherrealm/injustice/player-select-highlighted-6.jpg",
        alt: "Injustice: Gods Among Us player select screen",
        caption: "Injustice: Gods Among Us — player select",
      },
      {
        src: "/case-studies/volition-netherrealm/netherrealm/injustice/player-select-highlighted-7.jpg",
        alt: "Injustice: Gods Among Us player select screen, alternate state",
        caption: "Injustice: Gods Among Us — player select",
      },
      {
        src: "/case-studies/volition-netherrealm/netherrealm/injustice/challenge-char-select-thin-17-2-default.jpg",
        alt: "Injustice: Gods Among Us Challenge mode character select",
        caption: "Injustice: Gods Among Us — Challenge mode character select",
      },
      {
        src: "/case-studies/volition-netherrealm/netherrealm/injustice/challenge-char-select-thin-17-5-purchase-screen.jpg",
        alt: "Injustice: Gods Among Us Challenge mode character select, purchase screen",
        caption: "Injustice: Gods Among Us — Challenge mode, purchase screen",
      },
      {
        src: "/case-studies/volition-netherrealm/netherrealm/injustice/challenge-char-select-thin-17-8-rightside-scroll.jpg",
        alt: "Injustice: Gods Among Us Challenge mode character select, scroll state",
        caption: "Injustice: Gods Among Us — Challenge mode, scroll state",
      },
      {
        src: "/case-studies/volition-netherrealm/netherrealm/injustice/room-challenge-champ.png",
        alt: "Injustice: Gods Among Us room challenge, champion state",
        caption: "Injustice: Gods Among Us — room challenge, champion",
      },
      {
        src: "/case-studies/volition-netherrealm/netherrealm/injustice/room-challenge-koth-waiting.png",
        alt: "Injustice: Gods Among Us room challenge, King of the Hill waiting screen",
        caption: "Injustice: Gods Among Us — room challenge, King of the Hill waiting",
      },
      {
        src: "/case-studies/volition-netherrealm/netherrealm/injustice/room-incoming-challenge.png",
        alt: "Injustice: Gods Among Us incoming challenge notification",
        caption: "Injustice: Gods Among Us — incoming challenge",
      },
      {
        src: "/case-studies/volition-netherrealm/netherrealm/injustice/room-players-2.png",
        alt: "Injustice: Gods Among Us room players screen",
        caption: "Injustice: Gods Among Us — room players",
      },
      {
        src: "/case-studies/volition-netherrealm/netherrealm/injustice/room-players-champion.png",
        alt: "Injustice: Gods Among Us room players screen, champion state",
        caption: "Injustice: Gods Among Us — room players, champion",
      },
      {
        src: "/case-studies/volition-netherrealm/netherrealm/injustice/player-rooms-2.png",
        alt: "Injustice: Gods Among Us player rooms screen",
        caption: "Injustice: Gods Among Us — player rooms",
      },
      {
        src: "/case-studies/volition-netherrealm/netherrealm/injustice/player-rooms-create-room.png",
        alt: "Injustice: Gods Among Us create room screen",
        caption: "Injustice: Gods Among Us — create room",
      },
      {
        src: "/case-studies/volition-netherrealm/netherrealm/injustice/koth-live-match.png",
        alt: "Injustice: Gods Among Us King of the Hill live match",
        caption: "Injustice: Gods Among Us — King of the Hill, live match",
      },
      {
        src: "/case-studies/volition-netherrealm/netherrealm/injustice/koth-place-your-vote.png",
        alt: "Injustice: Gods Among Us King of the Hill voting screen",
        caption: "Injustice: Gods Among Us — King of the Hill, voting",
      },
      {
        src: "/case-studies/volition-netherrealm/netherrealm/injustice/koth-round-end-xp.png",
        alt: "Injustice: Gods Among Us King of the Hill round-end XP screen",
        caption: "Injustice: Gods Among Us — King of the Hill, round-end XP",
      },
      {
        src: "/case-studies/volition-netherrealm/netherrealm/injustice/koth-chat-1.png",
        alt: "Injustice: Gods Among Us King of the Hill chat",
        caption: "Injustice: Gods Among Us — King of the Hill, chat",
      },
      {
        src: "/case-studies/volition-netherrealm/netherrealm/injustice/online-1.png",
        alt: "Injustice: Gods Among Us online menu",
        caption: "Injustice: Gods Among Us — online menu",
      },
      {
        src: "/case-studies/volition-netherrealm/netherrealm/injustice/online-2.png",
        alt: "Injustice: Gods Among Us online menu, alternate state",
        caption: "Injustice: Gods Among Us — online menu",
      },
      {
        src: "/case-studies/volition-netherrealm/netherrealm/injustice/survival-1.png",
        alt: "Injustice: Gods Among Us Survival mode",
        caption: "Injustice: Gods Among Us — Survival mode",
      },
      {
        src: "/case-studies/volition-netherrealm/netherrealm/injustice/survival-searching.png",
        alt: "Injustice: Gods Among Us Survival mode, searching for opponent",
        caption: "Injustice: Gods Among Us — Survival mode, searching",
      },
      {
        src: "/case-studies/volition-netherrealm/netherrealm/injustice/survival-connecting.png",
        alt: "Injustice: Gods Among Us Survival mode, connecting",
        caption: "Injustice: Gods Among Us — Survival mode, connecting",
      },
      {
        src: "/case-studies/volition-netherrealm/netherrealm/injustice/survival-opponent-found.png",
        alt: "Injustice: Gods Among Us Survival mode, opponent found",
        caption: "Injustice: Gods Among Us — Survival mode, opponent found",
      },
      {
        src: "/case-studies/volition-netherrealm/netherrealm/injustice/survival-waiting.png",
        alt: "Injustice: Gods Among Us Survival mode, waiting screen",
        caption: "Injustice: Gods Among Us — Survival mode, waiting",
      },
      {
        src: "/case-studies/volition-netherrealm/netherrealm/injustice/survival-declined.png",
        alt: "Injustice: Gods Among Us Survival mode, challenge declined",
        caption: "Injustice: Gods Among Us — Survival mode, declined",
      },
      {
        src: "/case-studies/volition-netherrealm/netherrealm/injustice/stats-offline.png",
        alt: "Injustice: Gods Among Us offline stats screen",
        caption: "Injustice: Gods Among Us — offline stats",
      },
      {
        src: "/case-studies/volition-netherrealm/netherrealm/injustice/stats-ranked-1v1.png",
        alt: "Injustice: Gods Among Us ranked 1v1 stats screen",
        caption: "Injustice: Gods Among Us — ranked 1v1 stats",
      },
      {
        src: "/case-studies/volition-netherrealm/netherrealm/injustice/stats-rivalry.png",
        alt: "Injustice: Gods Among Us rivalry stats screen",
        caption: "Injustice: Gods Among Us — rivalry stats",
      },
      {
        src: "/case-studies/volition-netherrealm/netherrealm/injustice/stats-mp-summary-0.png",
        alt: "Injustice: Gods Among Us multiplayer stats summary",
        caption: "Injustice: Gods Among Us — multiplayer stats summary",
      },
      {
        src: "/case-studies/volition-netherrealm/netherrealm/injustice/stats-mp-summary-1.png",
        alt: "Injustice: Gods Among Us multiplayer stats summary, alternate state",
        caption: "Injustice: Gods Among Us — multiplayer stats summary",
      },
      {
        src: "/case-studies/volition-netherrealm/netherrealm/injustice/stats-mp-summary-2.png",
        alt: "Injustice: Gods Among Us multiplayer stats summary, alternate state",
        caption: "Injustice: Gods Among Us — multiplayer stats summary",
      },
    ],
  },
];
