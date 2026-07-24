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

// Placeholder set — Derik is still refining which shots make the final cut.
// Filenames are working labels, not final copy.
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
    ],
  },
  {
    id: "netherrealm",
    studio: "NetherRealm",
    description:
      "Mortal Kombat (2011), Mortal Kombat VITA, and unreleased Batman: Arkham Lockdown icon work. Injustice: Gods Among Us concepts still pending.",
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
    ],
  },
];
