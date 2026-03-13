
const ROOT = document.getElementById("root");

if (!ROOT) {
    throw new Error("Root element was not found.");
}

const STORAGE_KEYS = {
    locale: "interactive-museum:locale",
    room: "interactive-museum:last-room",
    audio: "interactive-museum:audio-enabled"
};

const SESSION_KEYS = {
    cinematicSplashSeen: "interactive-museum:cinematic-splash-seen"
};

const ROOM_ORDER = ["intro", "communication", "media", "workstation", "archive"];

const ROOM_DEFINITIONS = {
    intro: {
        id: "intro",
        theme: "threshold",
        ambient: "threshold",
        eyebrowKey: "rooms.intro.eyebrow",
        titleKey: "rooms.intro.title",
        descriptionKey: "rooms.intro.description",
        atmosphereKey: "rooms.intro.atmosphere",
        layers: [
            { kind: "beam", x: 18, y: 6, w: 18, h: 58, rotate: -12, tone: "warm" },
            { kind: "beam", x: 78, y: 3, w: 20, h: 52, rotate: 10, tone: "soft" },
            { kind: "display", x: 52, y: 22, w: 30, h: 18, rotate: 0 },
            { kind: "cabinet", x: 14, y: 56, w: 20, h: 30, rotate: -2 },
            { kind: "console", x: 57, y: 74, w: 34, h: 16, rotate: -1 },
            { kind: "stack", x: 36, y: 82, w: 18, h: 12, rotate: -4 },
            { kind: "cable", x: 49, y: 86, w: 26, h: 9, rotate: 1 }
        ]
    },
    communication: {
        id: "communication",
        theme: "switchboard",
        ambient: "switchboard",
        eyebrowKey: "rooms.communication.eyebrow",
        titleKey: "rooms.communication.title",
        descriptionKey: "rooms.communication.description",
        atmosphereKey: "rooms.communication.atmosphere",
        layers: [
            { kind: "beam", x: 62, y: 2, w: 24, h: 56, rotate: 8, tone: "warm" },
            { kind: "beam", x: 24, y: 9, w: 14, h: 46, rotate: -8, tone: "soft" },
            { kind: "desk", x: 49, y: 74, w: 42, h: 16, rotate: -1 },
            { kind: "plinth", x: 22, y: 72, w: 16, h: 18, rotate: -1 },
            { kind: "shelf", x: 82, y: 46, w: 16, h: 28, rotate: 1 },
            { kind: "crate", x: 68, y: 82, w: 16, h: 10, rotate: -2 },
            { kind: "plaque", x: 29, y: 24, w: 17, h: 10, rotate: -1 },
            { kind: "cable", x: 35, y: 86, w: 24, h: 8, rotate: -4 }
        ]
    },
    media: {
        id: "media",
        theme: "magnetic",
        ambient: "transport",
        eyebrowKey: "rooms.media.eyebrow",
        titleKey: "rooms.media.title",
        descriptionKey: "rooms.media.description",
        atmosphereKey: "rooms.media.atmosphere",
        layers: [
            { kind: "beam", x: 20, y: 1, w: 18, h: 58, rotate: -13, tone: "warm" },
            { kind: "beam", x: 74, y: 4, w: 18, h: 54, rotate: 12, tone: "soft" },
            { kind: "shelf", x: 22, y: 46, w: 18, h: 30, rotate: -2 },
            { kind: "console", x: 61, y: 74, w: 36, h: 16, rotate: 2 },
            { kind: "stack", x: 80, y: 82, w: 18, h: 12, rotate: 2 },
            { kind: "crate", x: 48, y: 82, w: 14, h: 10, rotate: -2 },
            { kind: "plaque", x: 54, y: 22, w: 18, h: 10, rotate: 0 }
        ]
    },
    workstation: {
        id: "workstation",
        theme: "phosphor",
        ambient: "phosphor",
        eyebrowKey: "rooms.workstation.eyebrow",
        titleKey: "rooms.workstation.title",
        descriptionKey: "rooms.workstation.description",
        atmosphereKey: "rooms.workstation.atmosphere",
        layers: [
            { kind: "beam", x: 48, y: 0, w: 24, h: 60, rotate: 0, tone: "cool", variant: "centered" },
            { kind: "desk", x: 48, y: 74, w: 44, h: 16, rotate: -1 },
            { kind: "cabinet", x: 17, y: 64, w: 14, h: 28, rotate: -2 },
            { kind: "cabinet", x: 83, y: 64, w: 14, h: 28, rotate: 2 },
            { kind: "stack", x: 65, y: 82, w: 16, h: 11, rotate: 1 },
            { kind: "cable", x: 46, y: 87, w: 30, h: 8, rotate: 0 },
            { kind: "plaque", x: 50, y: 22, w: 17, h: 10, rotate: 0 }
        ]
    },
    archive: {
        id: "archive",
        theme: "vault",
        ambient: "vault",
        eyebrowKey: "rooms.archive.eyebrow",
        titleKey: "rooms.archive.title",
        descriptionKey: "rooms.archive.description",
        atmosphereKey: "rooms.archive.atmosphere",
        layers: [
            { kind: "beam", x: 17, y: 2, w: 18, h: 56, rotate: -9, tone: "warm" },
            { kind: "beam", x: 74, y: 3, w: 18, h: 58, rotate: 10, tone: "soft" },
            { kind: "shelf", x: 82, y: 44, w: 16, h: 30, rotate: 2 },
            { kind: "plinth", x: 26, y: 72, w: 18, h: 18, rotate: -1 },
            { kind: "console", x: 59, y: 74, w: 32, h: 15, rotate: -2 },
            { kind: "stack", x: 74, y: 82, w: 18, h: 12, rotate: 2 },
            { kind: "plaque", x: 53, y: 22, w: 17, h: 10, rotate: 0 }
        ]
    }
};

const STRINGS = {
    en: {
        app: {
            documentTitle: "Museum of Forgotten Signals",
            title: "Museum of Forgotten Signals",
            subtitle: "Interactive Museum / Interaktivní muzeum",
            splashTitle: "Archive of Forgotten Signals",
            splashSubtitle: "Interactive Museum of Obsolete Technology",
            curatorNote: "Forgotten signals, old media, abandoned devices, preserved memories.",
            roomAtlas: "Room navigation",
            progressRooms: "Rooms explored",
            progressArtifacts: "Artifacts inspected",
            sceneHint: "Move around the exhibits slowly. Labels, light, and sound behave like a quiet archive waking up.",
            drawerEyebrow: "Archive drawer",
            snapshotLive: "Live frontend snapshot loaded from JSON.",
            snapshotFallback: "Fallback museum snapshot in use. JSON could not be loaded.",
            loading: "Preparing the exhibition",
            loadingDetail: "Restoring rooms, labels, and object records from the archive.",
            archiveStatus: "Atmospheric archive",
            archiveStatusQuiet: "Quiet entry",
            archiveStatusSound: "Sound layer active",
            memoryFragmentRestored: "Memory fragment restored"
        },
        controls: {
            language: "Language",
            sound: "Sound",
            soundOn: "On",
            soundOff: "Muted",
            enableSound: "Enable sound",
            disableSound: "Mute sound",
            audioUnavailable: "Audio unavailable",
            close: "Close",
            nextRoom: "Next room",
            previousRoom: "Previous room",
            enterQuietly: "Enter quietly",
            enterWithSound: "Enter with sound",
            playCue: "Replay cue",
            yearOrEra: "Year / Era",
            category: "Category",
            room: "Room",
            currentRoom: "Current room",
            openArtifact: "Open artifact details",
            jumpToRoom: "Jump to room",
            archiveReady: "Archive ready"
        },
        intro: {
            eyebrow: "Curated access channel",
            title: "Re:BootMuseum",
            lead: "A digital museum of personal technologies that once carried voices, tapes, deadlines, and private rituals.",
            description: "Walk through five calmer exhibition rooms where pagers wait under low light, CRT glass still remembers phosphor glow, and magnetic media feels almost warm beneath the lamps.",
            hint: "Sound is optional and restrained. The museum is meant to feel tactile, composed, and jury-friendly rather than noisy.",
            roomsStat: "5 rooms",
            devicesStat: "10 devices",
            languageStat: "CZ / EN"
        },
        rooms: {
            intro: {
                title: "Intro Hall",
                eyebrow: "Threshold gallery",
                description: "A vestibule of clipped numerals, domestic bells, and the brief suspense that once lived between a ring and a reply.",
                atmosphere: "The room frames communication as anticipation: the moment before contact, before playback, before someone picks up."
            },
            communication: {
                title: "Communication Room",
                eyebrow: "Pocket and home line",
                description: "Personal mobile devices meet household message machines, each one designed around patience, etiquette, and missed timing.",
                atmosphere: "Here the museum listens for small interruptions: keypad chirps, recorded greetings, and the discipline of calling back later."
            },
            media: {
                title: "Media Room",
                eyebrow: "Portable and domestic media",
                description: "Magnetic tape once made soundtracks portable and living rooms communal. In this room the mechanisms stay visible, almost theatrical.",
                atmosphere: "Spools, doors, and tape hiss turn entertainment into a tactile ritual rather than instant access."
            },
            workstation: {
                title: "Workstation Room",
                eyebrow: "Desk light and phosphor glow",
                description: "A neglected office corner where green text, fan hum, and perforated paper made work feel physical and audible.",
                atmosphere: "This scene preserves the rhythm of early desktop labor: warm glass, tractor feeds, and the polite violence of print heads."
            },
            archive: {
                title: "Archive Room",
                eyebrow: "Preservation vault",
                description: "Storage media and recording tools sit under softer light here, as if memory itself had to be filed, rewound, and protected from dust.",
                atmosphere: "The vault is quieter than the rest of the museum, but it carries the deepest sense of private history."
            }
        },
        categories: {
            obsoleteSignalTool: "Obsolete signal tool",
            domesticLine: "Domestic line device",
            personalMobile: "Personal mobile electronics",
            voiceArchive: "Voice archive device",
            portableMedia: "Portable media player",
            homeVideo: "Home video media",
            magneticRecording: "Magnetic recording device",
            officeComputing: "Office computing hardware",
            mediaStorage: "Media storage",
            officeOutput: "Office output device"
        },
        actions: {
            pager: "Listen to the clipped alert",
            telephone: "Hear the bell again",
            nokia: "Wake the keypad tone",
            answeringMachine: "Spin the message spool",
            walkman: "Press play softly",
            vhs: "Release the tape door",
            crt: "Raise the phosphor glow",
            printer: "Start the tractor feed",
            floppy: "Read the saved square",
            tapeRecorder: "Open the magnetic reel"
        }
    },
    cs: {
        app: {
            documentTitle: "Muzeum zapomenutých signálů",
            title: "Muzeum zapomenutých signálů",
            subtitle: "Interactive Museum / Interaktivní muzeum",
            splashTitle: "Archiv zapomenutých signálů",
            splashSubtitle: "Interaktivní muzeum zastaralých technologií",
            curatorNote: "Zapomenuté signály, stará média, opuštěné přístroje, uchované vzpomínky.",
            roomAtlas: "Navigace místnostmi",
            progressRooms: "Prozkoumané místnosti",
            progressArtifacts: "Prohlédnuté artefakty",
            sceneHint: "Pohybujte se kolem exponátů pomalu. Popisky, světlo i zvuk reagují jako tichý archiv, který se právě probouzí.",
            drawerEyebrow: "Archivní zásuvka",
            snapshotLive: "Frontend načetl živý JSON snapshot exponátů.",
            snapshotFallback: "Používá se záložní snapshot muzea. JSON se nepodařilo načíst.",
            loading: "Připravuji expozici",
            loadingDetail: "Obnovuji místnosti, popisky a záznamy o exponátech z archivu.",
            archiveStatus: "Atmosférický archiv",
            archiveStatusQuiet: "Tichý vstup",
            archiveStatusSound: "Zvuková vrstva aktivní",
            memoryFragmentRestored: "Fragment paměti obnoven"
        },
        controls: {
            language: "Jazyk",
            sound: "Zvuk",
            soundOn: "Zapnuto",
            soundOff: "Ztlumeno",
            enableSound: "Zapnout zvuk",
            disableSound: "Ztlumit zvuk",
            audioUnavailable: "Zvuk není dostupný",
            close: "Zavřít",
            nextRoom: "Další místnost",
            previousRoom: "Předchozí místnost",
            enterQuietly: "Vstoupit potichu",
            enterWithSound: "Vstoupit se zvukem",
            playCue: "Přehrát stopu znovu",
            yearOrEra: "Rok / období",
            category: "Kategorie",
            room: "Místnost",
            currentRoom: "Aktuální místnost",
            openArtifact: "Otevřít detail artefaktu",
            jumpToRoom: "Přejít do místnosti",
            archiveReady: "Archiv připraven"
        },
        intro: {
            eyebrow: "Kurátorský přístupový kanál",
            title: "Re:BootMuseum",
            lead: "Digitální muzeum osobních technologií, které kdysi přenášely hlasy, kazety, termíny i drobné každodenní rituály.",
            description: "Projděte pěti klidnějšími výstavními místnostmi, kde pagery čekají pod měkkým světlem, sklo CRT monitorů si stále pamatuje fosfor a magnetická média pod lampami skoro hřejí.",
            hint: "Zvuk je volitelný a umírněný. Celé muzeum má působit hmatatelně, kompozičně čistě a jury-friendly, ne hlučně.",
            roomsStat: "5 místností",
            devicesStat: "10 přístrojů",
            languageStat: "CZ / EN"
        },
        rooms: {
            intro: {
                title: "Vstupní hala",
                eyebrow: "Galerie prahu",
                description: "Předsíň čísel, domácích zvonění a krátkého napětí, které kdysi žilo mezi zazvoněním a odpovědí.",
                atmosphere: "Tato místnost chápe komunikaci jako očekávání: okamžik před kontaktem, před přehráním, před tím, než někdo zvedne sluchátko."
            },
            communication: {
                title: "Místnost komunikace",
                eyebrow: "Kapsa a domácí linka",
                description: "Osobní mobilní přístroje se tu setkávají s domácími záznamníky. Všechny vznikly kolem trpělivosti, etikety a zmeškaného načasování.",
                atmosphere: "Muzeum tu naslouchá drobným přerušením: tónům klávesnice, nahraným pozdravům i disciplíně zavolat později zpět."
            },
            media: {
                title: "Místnost médií",
                eyebrow: "Přenosná a domácí média",
                description: "Magnetická páska kdysi nesla osobní soundtracky i společné večery v obýváku. Mechanika tu zůstává viditelná a téměř divadelní.",
                atmosphere: "Cívky, dvířka a šum pásky proměňují zábavu z okamžité služby na pomalý hmatatelný rituál."
            },
            workstation: {
                title: "Pracovní stanice",
                eyebrow: "Stolní světlo a fosfor",
                description: "Opuštěný kancelářský kout, kde zelený text, hukot větráků a perforovaný papír dávaly práci hmotu i zvuk.",
                atmosphere: "Tato scéna uchovává rytmus rané počítačové práce: teplé sklo, nekonečný podavač papíru a zdvořile násilný tiskový mechanismus."
            },
            archive: {
                title: "Místnost archivu",
                eyebrow: "Trezor paměti",
                description: "Nosiče a záznamová technika tu leží v měkčím světle, jako by samotná vzpomínka musela být založena, převinuta a chráněna před prachem.",
                atmosphere: "Archiv je nejtišší ze všech místností, ale nese v sobě nejsilnější pocit soukromé historie."
            }
        },
        categories: {
            obsoleteSignalTool: "Zastaralý signalizační přístroj",
            domesticLine: "Zařízení domácí linky",
            personalMobile: "Osobní mobilní elektronika",
            voiceArchive: "Zařízení hlasového archivu",
            portableMedia: "Přenosný přehrávač",
            homeVideo: "Domácí video nosič",
            magneticRecording: "Magnetický záznamový přístroj",
            officeComputing: "Kancelářský počítačový hardware",
            mediaStorage: "Datový nosič",
            officeOutput: "Kancelářské výstupní zařízení"
        },
        actions: {
            pager: "Poslechnout krátký signál",
            telephone: "Znovu rozeznít zvonek",
            nokia: "Probudit tón klávesnice",
            answeringMachine: "Roztočit cívku zprávy",
            walkman: "Jemně stisknout play",
            vhs: "Otevřít dvířka pásky",
            crt: "Rozsvítit fosfor",
            printer: "Spustit podavač papíru",
            floppy: "Přečíst uložený čtverec",
            tapeRecorder: "Odhalit magnetickou cívku"
        }
    }
};

const FALLBACK_SNAPSHOT = {
    exhibits: [
        [1, "pager", "intro", "Pager", "Pager", "obsoleteSignalTool", "1994 · Konec 80. a 90. léta", "1994 · Late 1980s to late 1990s", "Pager zmenšil naléhavost na pár číslic a krátké pípnutí. Nutil lidi pamatovat si čísla, vymýšlet kódy a ozvat se až od nejbližší pevné linky.", "A pager reduced urgency to a few digits and a clipped beep. It asked people to memorize numbers, improvise codes, and answer later from wherever a landline could be found.", "Muzejní popisek: Pager patří do doby, kdy být dostupný stále vyžadovalo určité úsilí.", "Museum caption: The pager belongs to an era when being reachable still required effort.", "signal", "pager", 28, 66, 1.04, -4, 64, true],
        [2, "old-telephone", "intro", "Starý telefon", "Old Telephone", "domesticLine", "1978 · Domácí linka 70. let", "1978 · 1970s domestic line", "Domácí telefon vázal rozhovor k jedné místnosti, chodbě nebo stolku pod lampou. Hovor byl událostí, ne kulisou.", "The household phone anchored conversations to a room, a hallway, or a small table under family light. Calls were events rather than background noise.", "Muzejní popisek: Váha sluchátka dávala každé pauze, omluvě i smíchu sdílenou přítomnost.", "Museum caption: The weight of the handset made every pause, apology, and laugh feel shared.", "ring", "telephone", 69, 65, 1.08, 2, 82, true],
        [3, "nokia-phone", "communication", "Telefon Nokia", "Nokia Phone", "personalMobile", "2001 · Přelom tisíciletí", "2001 · Turn of the millennium", "Spolehlivá baterie, hmatové klávesy a téměř nezničitelný plast daly raným mobilům zvláštní druh důvěry. Byly stavěné na roky, ne na jednu sezónu.", "Reliable battery life, tactile keys, and nearly indestructible plastic gave early mobile phones an unusual kind of trust. They were built to stay with people for years.", "Muzejní popisek: Tento přístroj připomíná dobu, kdy psaní zpráv působilo soustředěně a ticho bylo běžné.", "Museum caption: This device remembers a time when texting felt deliberate and silence was normal.", "keypad", "nokia", 31, 65, 1.02, -3, 66, true],
        [4, "answering-machine", "communication", "Záznamník", "Answering Machine", "voiceArchive", "1989 · Domácí záznamník konce 80. let", "1989 · Late 1980s household recorder", "Než se hlasová schránka rozpustila do telefonu samotného, malá kazetová krabička doma uchovávala pozdravy, omluvy, přiznání i zmeškané příležitosti.", "Before voicemail dissolved into phone software, a small cassette machine held greetings, excuses, confessions, and missed opportunities at home.", "Muzejní popisek: Záznamník dokázal proměnit nepřítomnost v předmět, který šlo přehrát znovu.", "Museum caption: The answering machine turned absence into an artifact you could replay.", "mechanical", "answering-machine", 69, 64, 1.04, 1, 80, true],
        [5, "walkman", "media", "Kazetový přehrávač / Walkman", "Cassette Player / Walkman", "portableMedia", "1986 · Dekáda přenosných kazet", "1986 · Portable cassette decade", "Přenosný přehrávač dal poslechu soukromý soundtrack i mechanickou texturu: odpor tlačítek, šum pásky a malé drama vybité baterie.", "Portable cassette players gave listeners a private soundtrack with mechanical texture: button travel, tape hiss, and the tiny drama of a battery almost gone.", "Muzejní popisek: Osobní hudba začala působit filmově ve chvíli, kdy si šlo ozvučit ulici za oknem.", "Museum caption: Personal audio began to feel cinematic the moment the city outside could be scored.", "magnetic", "walkman", 33, 65, 1.06, -4, 68, true],
        [6, "vhs-cassette", "media", "Kazeta VHS", "VHS Cassette", "homeVideo", "1993 · Vrchol domácího videa", "1993 · Home video peak", "Kazeta VHS nesla filmy, domácí záznamy i rituál trpělivosti: popisky, převíjení, tracking a pomalý pocit, kdy mechanika spolkne celý hranatý nosič.", "A VHS tape held movies, home recordings, and rituals of patience: labels, rewinding, tracking lines, and the slow certainty of a machine swallowing the cartridge.", "Muzejní popisek: VHS udělala z paměti předmět, který se dal uložit do police, půjčit i opotřebovat.", "Museum caption: VHS made memory physical enough to shelve, lend, and wear out.", "magnetic", "vhs", 72, 59, 1.1, 3, 78, true],
        [7, "crt-monitor", "workstation", "CRT monitor", "CRT Monitor", "officeComputing", "1998 · Rozkvět stolních počítačů", "1998 · Desktop computing bloom", "CRT monitor zaplnil místnost jemnou statikou, zakřiveným sklem a rozkvetlým fosforovým světlem, které ploché displeje nikdy zcela nenahradily.", "The CRT filled a room with soft static, curved glass, and a bloom of phosphor light that modern flat panels never quite replaced.", "Muzejní popisek: Staré počítačové obrazovky působily méně jako okna a více jako světelné objekty.", "Museum caption: Early computer screens felt less like windows and more like illuminated objects.", "phosphor", "crt", 42, 58, 1.12, -2, 86, true],
        [8, "dot-matrix-printer", "workstation", "Jehličková tiskárna", "Dot-Matrix Printer", "officeOutput", "1991 · Přechod kanceláří k automatizaci", "1991 · Office automation transition", "Jehličková tiskárna proměňovala data ve zvuk ještě dřív, než vyjel papír. Tiskla rytmem, rachotem a perforovanou jistotou.", "Dot-matrix printers transformed data into sound before paper even emerged. Their print heads wrote in impact, chatter, and perforated certainty.", "Muzejní popisek: Kancelářský výstup býval dost hlasitý na to, aby o sobě řekl celému patru.", "Museum caption: Office output was once loud enough to announce itself to the whole floor.", "printer", "printer", 72, 69, 1.08, 1, 72, true],
        [9, "floppy-disk", "archive", "Disketa", "Floppy Disk", "mediaStorage", "1997 · Doba osobních záloh", "1997 · Personal backup era", "Disketa dělala z digitální práce něco současně přenosného i křehkého. Eseje, uložené hry i kancelářské poznámky důvěřovaly tenkému magnetickému čtverci.", "The floppy disk made digital work feel precarious and portable at the same time. Essays, save files, and office notes all trusted a thin magnetic square.", "Muzejní popisek: Drobná posuvná krytka kdysi dělila lidskou práci od zmizení.", "Museum caption: A tiny sliding shutter once stood between a person's work and disappearance.", "mechanical", "floppy", 29, 67, 1, -4, 67, true],
        [10, "tape-recorder", "archive", "Magnetofon", "Tape Recorder", "magneticRecording", "1972 · Poválečná kultura magnetického záznamu", "1972 · Postwar magnetic culture", "Kotoučové i kazetové rekordéry uchovávaly hlasy s citelnou křehkostí. Médium vždy připomínalo, že vzpomínka se může natáhnout, zašumět i vyblednout.", "Reel and cassette recorders preserved voices with audible fragility. The medium always reminded listeners that memory could stretch, hiss, and fade.", "Muzejní popisek: Záznam kdysi znamenal slyšet, jak s vámi mechanika přemýšlí.", "Museum caption: Recording once meant hearing the mechanism think along with you.", "magnetic", "tape-recorder", 68, 63, 1.08, 2, 84, true]
    ].map((row) => ({
        id: row[0], slug: row[1], room: row[2], name_cs: row[3], name_en: row[4], category: row[5],
        year_or_era_cs: row[6], year_or_era_en: row[7], description_cs: row[8], description_en: row[9],
        caption_cs: row[10], caption_en: row[11], sound_key: row[12], visual_key: row[13],
        position_x: row[14], position_y: row[15], scale: row[16], rotation: row[17],
        highlight_priority: row[18], is_active: row[19]
    }))
};

const VISUAL_REGISTRY = {
    pager: { width: 8.2, aspect: 1.34, labelSide: "left", actionKey: "pager", render: renderPager },
    telephone: { width: 13.4, aspect: 0.84, labelSide: "right", actionKey: "telephone", render: renderTelephone },
    nokia: { width: 8.4, aspect: 1.62, labelSide: "left", actionKey: "nokia", render: renderNokia },
    "answering-machine": { width: 12.8, aspect: 0.82, labelSide: "right", actionKey: "answeringMachine", render: renderAnsweringMachine },
    walkman: { width: 11.2, aspect: 1.2, labelSide: "left", actionKey: "walkman", render: renderWalkman },
    vhs: { width: 12.4, aspect: 0.72, labelSide: "right", actionKey: "vhs", render: renderVhs },
    crt: { width: 15.8, aspect: 0.96, labelSide: "left", actionKey: "crt", render: renderCrtMonitor },
    printer: { width: 15.2, aspect: 0.72, labelSide: "right", actionKey: "printer", render: renderPrinter },
    floppy: { width: 8.8, aspect: 1.08, labelSide: "left", actionKey: "floppy", render: renderFloppy },
    "tape-recorder": { width: 15.2, aspect: 0.88, labelSide: "right", actionKey: "tapeRecorder", render: renderTapeRecorder },
    fallback: { width: 10, aspect: 1, labelSide: "center", actionKey: "pager", render: renderFallbackVisual }
};

const AMBIENT_PRESETS = {
    threshold: { base: 88, companion: 132, filter: 680, noiseFilter: 980, gain: 0.034, motion: 0.03 },
    switchboard: { base: 104, companion: 156, filter: 840, noiseFilter: 1160, gain: 0.032, motion: 0.04 },
    transport: { base: 96, companion: 144, filter: 620, noiseFilter: 760, gain: 0.03, motion: 0.05 },
    phosphor: { base: 124, companion: 248, filter: 920, noiseFilter: 1480, gain: 0.026, motion: 0.025 },
    vault: { base: 76, companion: 114, filter: 520, noiseFilter: 720, gain: 0.028, motion: 0.02 }
};

const dataSourceMeta = document.querySelector('meta[name="museum-data-url"]');
const initialRoom = getStoredRoom();
const CINEMATIC_SPLASH_HOLD_MS = 3200;
const CINEMATIC_SPLASH_EXIT_MS = 760;
const DRAWER_ENTER_MS = 560;
const DRAWER_EXIT_MS = 520;
const DRAWER_ENTER_FOCUS_MS = 240;
const MEMORY_FRAGMENT_TOAST_MS = 2600;
const MEMORY_FRAGMENT_PULSE_MS = 1800;

const state = {
    locale: getStoredLocale(),
    activeRoomId: initialRoom,
    audioEnabled: getStoredAudioPreference(),
    entered: false,
    loading: true,
    usingFallbackData: false,
    cinematicSplashVisible: false,
    cinematicSplashClosing: false,
    exhibits: [],
    selectedExhibitSlug: null,
    presentedExhibitSlug: null,
    drawerEntering: false,
    drawerClosing: false,
    crtSequenceCount: 0,
    memoryFragmentVisible: false,
    memoryFragmentPulse: false,
    roomTransitionDirection: null,
    visitedRooms: new Set([initialRoom]),
    viewedArtifacts: new Set(),
    lastTrigger: null
};

const audio = createAudioManager(state.audioEnabled);
let cinematicSplashTimer = null;
let cinematicSplashTeardownTimer = null;
let drawerTeardownTimer = null;
let drawerEnterTimer = null;
let drawerFocusTimer = null;
let memoryFragmentTimer = null;
let memoryFragmentPulseTimer = null;

boot();

async function boot() {
    initCustomCursor();
    bindEvents();
    renderLoadingState();

    const snapshot = await loadSnapshot();
    state.exhibits = normalizeExhibits(snapshot.exhibits);
    state.usingFallbackData = snapshot.usingFallbackData;
    state.loading = false;

    if (!state.exhibits.some((item) => item.room === state.activeRoomId)) {
        state.activeRoomId = ROOM_ORDER.find((roomId) => state.exhibits.some((item) => item.room === roomId)) ?? ROOM_ORDER[0];
    }

    state.visitedRooms.add(state.activeRoomId);
    state.cinematicSplashVisible = shouldShowCinematicSplash();
    persistRoom();
    render();
    if (state.cinematicSplashVisible) scheduleCinematicSplash();
}
function bindEvents() {
    ROOT.addEventListener("click", handleClick);
    document.addEventListener("keydown", handleKeydown);
}

function handleClick(event) {
    const button = event.target.closest("button");

    if (!button) {
        closeBackdropTarget(event);
        return;
    }

    switch (button.dataset.action) {
        case "set-locale":
            setLocale(button.dataset.locale);
            break;
        case "toggle-sound":
            toggleSound();
            break;
        case "enter-quiet":
            enterMuseum(false);
            break;
        case "enter-sound":
            enterMuseum(true);
            break;
        case "go-room":
            changeRoom(button.dataset.roomId);
            break;
        case "previous-room":
            changeRoom(getAdjacentRoom(-1));
            break;
        case "next-room":
            changeRoom(getAdjacentRoom(1));
            break;
        case "open-exhibit":
            openExhibit(button.dataset.slug, button);
            break;
        case "close-modal":
            closeModal();
            break;
        case "replay-cue":
            replaySelectedCue();
            break;
        default:
            break;
    }
}

function handleKeydown(event) {
    if (event.key === "Escape" && state.selectedExhibitSlug) {
        event.preventDefault();
        closeModal();
        return;
    }

    if (state.selectedExhibitSlug && event.key === "Tab") {
        trapModalFocus(event);
        return;
    }

    if (!state.entered || state.selectedExhibitSlug) {
        return;
    }

    if (event.key === "ArrowLeft") {
        event.preventDefault();
        changeRoom(getAdjacentRoom(-1));
    }

    if (event.key === "ArrowRight") {
        event.preventDefault();
        changeRoom(getAdjacentRoom(1));
    }
}

function renderLoadingState() {
    document.title = t("app.documentTitle");
    document.documentElement.lang = state.locale;
    ROOT.innerHTML = `
        <div class="museum-loading-shell">
            <div class="museum-loading-panel">
                <p class="museum-loading-panel__eyebrow">${escapeHtml(t("app.archiveStatus"))}</p>
                <h1 class="museum-loading-panel__title">${escapeHtml(t("app.loading"))}</h1>
                <p class="museum-loading-panel__copy">${escapeHtml(t("app.loadingDetail"))}</p>
            </div>
        </div>
    `;
}

function render() {
    document.title = t("app.documentTitle");
    document.documentElement.lang = state.locale;

    const activeRoom = getActiveRoom();
    const activeExhibit = getPresentedExhibit();
    const drawerIsOpen = Boolean(activeExhibit && state.selectedExhibitSlug && !state.drawerClosing);

    ROOT.innerHTML = `
        <div class="museum-app" data-theme="${activeRoom.theme}">
            <div class="museum-vignette" aria-hidden="true"></div>
            <div class="museum-grain" aria-hidden="true"></div>
            <div class="museum-shell ${state.entered ? "" : "museum-shell--locked"} ${activeExhibit ? "museum-shell--with-drawer" : ""}" ${state.entered ? "" : 'aria-hidden="true"'}>
                ${renderHeader(activeRoom)}
                ${renderRoomStage(activeRoom, state.roomTransitionDirection)}
            </div>
            ${renderDrawer(activeExhibit, drawerIsOpen)}
            ${renderMemoryFragmentToast()}
            ${renderIntroOverlay()}
            ${renderCinematicSplash()}
        </div>
    `;

    if (state.roomTransitionDirection) {
        queueRoomNavigationSmoothing();
    }
    syncAmbientSound();
}

function renderHeader(activeRoom) {
    const soundState = audio.isSupported()
        ? state.audioEnabled ? t("controls.soundOn") : t("controls.soundOff")
        : t("controls.audioUnavailable");

    return `
        <header class="museum-header">
            <div class="museum-header__top">
                <div class="museum-branding">
                    <p class="museum-branding__eyebrow">${escapeHtml(t("app.curatorNote"))}</p>
                    <h1 class="museum-branding__title">${escapeHtml(t("app.title"))}</h1>
                    <p class="museum-branding__subtitle">${escapeHtml(t("app.subtitle"))}</p>
                </div>
                <div class="museum-toolbar">
                    <div class="museum-toolbar__controls">
                        ${renderLocaleSwitcher()}
                        <button class="museum-sound-toggle ${state.audioEnabled ? "is-enabled" : ""}" type="button" data-action="toggle-sound" data-cursor="interactive" ${audio.isSupported() ? "" : "disabled"}>
                            <span class="museum-sound-toggle__dot" aria-hidden="true"></span>
                            <span class="museum-sound-toggle__label">${escapeHtml(t("controls.sound"))}</span>
                            <span class="museum-sound-toggle__state">${escapeHtml(soundState)}</span>
                        </button>
                    </div>
                    <div class="museum-toolbar__stats">
                        <div class="museum-toolbar__room">
                            <span>${escapeHtml(t("controls.currentRoom"))}</span>
                            <strong>${escapeHtml(t(activeRoom.titleKey))}</strong>
                        </div>
                        <div class="museum-stat">
                            <span>${escapeHtml(t("app.progressRooms"))}</span>
                            <strong>${state.visitedRooms.size}/${ROOM_ORDER.length}</strong>
                        </div>
                        <div class="museum-stat">
                            <span>${escapeHtml(t("app.progressArtifacts"))}</span>
                            <strong>${state.viewedArtifacts.size}/${state.exhibits.length}</strong>
                        </div>
                    </div>
                    <p class="museum-toolbar__note ${state.usingFallbackData ? "is-fallback" : ""}">${escapeHtml(state.usingFallbackData ? t("app.snapshotFallback") : t("app.snapshotLive"))}</p>
                </div>
            </div>
            ${renderTopNavigation(activeRoom)}
        </header>
    `;
}

function renderLocaleSwitcher() {
    return `
        <div class="locale-switcher" aria-label="${escapeHtml(t("controls.language"))}">
            ${["en", "cs"].map((localeCode) => `
                <button class="locale-switcher__button ${state.locale === localeCode ? "is-active" : ""}" type="button" data-action="set-locale" data-locale="${localeCode}" data-cursor="interactive">${localeCode.toUpperCase()}</button>
            `).join("")}
        </div>
    `;
}

function renderTopNavigation(activeRoom) {
    return `
        <nav class="museum-top-nav" aria-label="${escapeHtml(t("app.roomAtlas"))}">
            <div class="museum-top-nav__track">
                ${ROOM_ORDER.map((roomId, index) => {
                    const room = ROOM_DEFINITIONS[roomId];
                    const isActive = roomId === activeRoom.id;
                    const isVisited = state.visitedRooms.has(roomId);
                    return `
                        <button class="museum-top-nav__item ${isActive ? "is-active" : ""} ${isVisited ? "is-visited" : ""}" type="button" data-action="go-room" data-room-id="${roomId}" data-cursor="interactive" aria-current="${isActive ? "true" : "false"}" aria-label="${escapeHtml(t("controls.jumpToRoom"))}: ${escapeHtml(t(room.titleKey))}">
                            <span class="museum-top-nav__index">${String(index + 1).padStart(2, "0")}</span>
                            <span class="museum-top-nav__label">${escapeHtml(t(room.titleKey))}</span>
                        </button>
                    `;
                }).join("")}
            </div>
        </nav>
    `;
}

function renderLayer(layer) {
    const classes = ["museum-scene__layer", `museum-scene__layer--${layer.kind}`];
    if (layer.tone) classes.push(`is-${layer.tone}`);
    if (layer.variant) classes.push(`is-${layer.variant}`);
    return `<span class="${classes.join(" ")}" style="left:${layer.x}%;top:${layer.y}%;width:${layer.w}%;height:${layer.h}%;--layer-rotate:${layer.rotate ?? 0}deg;"></span>`;
}

function renderExhibit(exhibit) {
    const config = VISUAL_REGISTRY[exhibit.visualKey] ?? VISUAL_REGISTRY.fallback;
    const width = (config.width * exhibit.scale).toFixed(2);
    const height = (config.width * config.aspect * exhibit.scale).toFixed(2);
    const name = localizeExhibit(exhibit, "name");
    const action = t(`actions.${config.actionKey}`);
    const isSelected = state.presentedExhibitSlug === exhibit.slug;
    const isMemoryFragmentHot = state.memoryFragmentPulse && exhibit.slug === "crt-monitor";
    const revealDelay = Math.min(0.34, (exhibit.highlightPriority / 100) * 0.32).toFixed(2);
    return `
        <button class="exhibit-hotspot exhibit-hotspot--${config.labelSide} ${isSelected ? "is-selected" : ""} ${isMemoryFragmentHot ? "is-memory-fragment" : ""}" type="button" data-action="open-exhibit" data-slug="${exhibit.slug}" data-cursor="interactive" aria-label="${escapeHtml(name)}. ${escapeHtml(action)}" aria-expanded="${state.selectedExhibitSlug === exhibit.slug ? "true" : "false"}" aria-controls="artifact-drawer" style="left:${exhibit.positionX}%;top:${exhibit.positionY}%;width:${width}rem;height:${height}rem;z-index:${40 + exhibit.highlightPriority};--exhibit-rotation:${exhibit.rotation}deg;--exhibit-delay:${revealDelay}s;">
            <span class="exhibit-hotspot__shadow" aria-hidden="true"></span>
            <span class="exhibit-hotspot__plinth" aria-hidden="true"></span>
            <span class="exhibit-hotspot__halo" aria-hidden="true"></span>
            <span class="exhibit-hotspot__artwork" aria-hidden="true">${renderVisual(exhibit, "stage")}</span>
            <span class="exhibit-hotspot__label">
                <span class="exhibit-hotspot__name">${escapeHtml(name)}</span>
                <span class="exhibit-hotspot__action">${escapeHtml(action)}</span>
            </span>
        </button>
    `;
}

function renderIntroOverlay() {
    const introHidden = state.entered || state.cinematicSplashVisible;
    return `
        <section class="intro-overlay ${introHidden ? "is-hidden" : "is-open"}" ${introHidden ? 'aria-hidden="true"' : ""}>
            <div class="intro-overlay__backdrop" aria-hidden="true"></div>
            <div class="intro-overlay__beam intro-overlay__beam--left" aria-hidden="true"></div>
            <div class="intro-overlay__beam intro-overlay__beam--right" aria-hidden="true"></div>
            <div class="intro-overlay__panel">
                <div class="intro-overlay__topbar">
                    <p class="intro-overlay__eyebrow">${escapeHtml(t("intro.eyebrow"))}</p>
                    ${renderLocaleSwitcher()}
                </div>
                <h2 class="intro-overlay__title">${escapeHtml(t("intro.title"))}</h2>
                <p class="intro-overlay__lead">${escapeHtml(t("intro.lead"))}</p>
                <p class="intro-overlay__description">${escapeHtml(t("intro.description"))}</p>
                <div class="intro-overlay__stats">
                    <span>${escapeHtml(t("intro.roomsStat"))}</span>
                    <span>${escapeHtml(t("intro.devicesStat"))}</span>
                    <span>${escapeHtml(t("intro.languageStat"))}</span>
                </div>
                <p class="intro-overlay__hint">${escapeHtml(t("intro.hint"))}</p>
                <div class="intro-overlay__actions">
                    <button class="intro-overlay__button intro-overlay__button--quiet" type="button" data-action="enter-quiet" data-cursor="interactive">${escapeHtml(t("controls.enterQuietly"))}</button>
                    <button class="intro-overlay__button intro-overlay__button--sound" type="button" data-action="enter-sound" data-cursor="interactive">${escapeHtml(t("controls.enterWithSound"))}</button>
                </div>
            </div>
        </section>
    `;
}

function renderCinematicSplash() {
    if (!state.cinematicSplashVisible) return "";
    return `
        <section class="cinematic-splash ${state.cinematicSplashClosing ? "is-closing" : "is-visible"}" aria-live="polite" aria-label="${escapeHtml(t("app.splashTitle"))}">
            <div class="cinematic-splash__glow" aria-hidden="true"></div>
            <div class="cinematic-splash__panel">
                <p class="cinematic-splash__eyebrow">${escapeHtml(t("app.curatorNote"))}</p>
                <h2 class="cinematic-splash__title">${escapeHtml(t("app.splashTitle"))}</h2>
                <p class="cinematic-splash__subtitle">${escapeHtml(t("app.splashSubtitle"))}</p>
            </div>
        </section>
    `;
}

function renderMemoryFragmentToast() {
    if (!state.memoryFragmentVisible) return "";
    return `
        <aside class="memory-fragment-toast is-visible" aria-live="polite">
            <p class="memory-fragment-toast__eyebrow">${escapeHtml(t("app.drawerEyebrow"))}</p>
            <strong class="memory-fragment-toast__title">${escapeHtml(t("app.memoryFragmentRestored"))}</strong>
        </aside>
    `;
}

function renderDrawer(exhibit, isOpen) {
    const drawerVisible = Boolean(exhibit);
    const drawerOpen = Boolean(isOpen && exhibit);
    const backdropStateClass = state.drawerClosing
        ? "is-closing"
        : state.drawerEntering
            ? "is-entering"
            : drawerVisible
                ? "is-open"
                : "";
    const drawerStateClass = state.drawerClosing
        ? "is-closing"
        : state.drawerEntering
            ? "is-entering is-open"
            : drawerOpen
                ? "is-open"
                : "";
    return `
        <div class="artifact-drawer-backdrop ${backdropStateClass}" ${drawerVisible ? "" : 'aria-hidden="true"'}></div>
        <aside class="artifact-drawer ${drawerStateClass}" id="artifact-drawer" ${(drawerOpen || state.drawerEntering) ? 'role="dialog" aria-modal="true" aria-labelledby="artifact-title"' : 'aria-hidden="true"'}>
            ${drawerVisible ? renderDrawerPanel(exhibit) : '<div class="artifact-drawer__placeholder" aria-hidden="true"></div>'}
        </aside>
    `;
}

function renderDrawerPanel(exhibit) {
    const config = VISUAL_REGISTRY[exhibit.visualKey] ?? VISUAL_REGISTRY.fallback;
    return `
        <div class="artifact-drawer__panel">
            <div class="artifact-drawer__topbar">
                <p class="artifact-drawer__eyebrow">${escapeHtml(t("app.drawerEyebrow"))}</p>
                <button class="artifact-drawer__close" type="button" data-action="close-modal" data-cursor="interactive">${escapeHtml(t("controls.close"))}</button>
            </div>
            <div class="artifact-drawer__preview-shell">
                <div class="artifact-drawer__preview">${renderVisual(exhibit, "drawer")}</div>
            </div>
            <div class="artifact-drawer__content">
                <h3 class="artifact-drawer__title" id="artifact-title">${escapeHtml(localizeExhibit(exhibit, "name"))}</h3>
                <p class="artifact-drawer__subtitle">${escapeHtml(t(ROOM_DEFINITIONS[exhibit.room].titleKey))} · ${escapeHtml(t(`actions.${config.actionKey}`))}</p>
                <div class="artifact-drawer__meta">
                    <div class="artifact-drawer__meta-card"><span>${escapeHtml(t("controls.yearOrEra"))}</span><strong>${escapeHtml(localizeExhibit(exhibit, "year_or_era"))}</strong></div>
                    <div class="artifact-drawer__meta-card"><span>${escapeHtml(t("controls.category"))}</span><strong>${escapeHtml(t(`categories.${exhibit.category}`))}</strong></div>
                    <div class="artifact-drawer__meta-card"><span>${escapeHtml(t("controls.room"))}</span><strong>${escapeHtml(t(ROOM_DEFINITIONS[exhibit.room].titleKey))}</strong></div>
                </div>
                <p class="artifact-drawer__description">${escapeHtml(localizeExhibit(exhibit, "description"))}</p>
                <p class="artifact-drawer__caption">${escapeHtml(localizeExhibit(exhibit, "caption"))}</p>
                <button class="artifact-drawer__action" type="button" data-action="replay-cue" data-cursor="interactive">${escapeHtml(t(`actions.${config.actionKey}`))}</button>
            </div>
        </div>
    `;
}

function closeBackdropTarget(event) {
    if (event.target.classList.contains("artifact-drawer-backdrop")) {
        closeModal();
        return true;
    }
    return false;
}

function renderSceneLayers(activeRoom) {
    return activeRoom.layers.map(renderLayer).join("");
}

function renderSceneObjects(exhibits) {
    return exhibits.map(renderExhibit).join("");
}

function renderSceneHint() {
    return escapeHtml(t("app.sceneHint"));
}

function renderSceneFooter() {
    return `<p class="museum-scene__hint">${renderSceneHint()}</p>`;
}

function renderSceneArticle(activeRoom, exhibits) {
    return `
        <article class="museum-scene" data-room="${activeRoom.id}" data-theme="${activeRoom.theme}" aria-label="${escapeHtml(t(activeRoom.titleKey))}">
            <div class="museum-scene__wall" aria-hidden="true"></div>
            <div class="museum-scene__niche" aria-hidden="true"></div>
            <div class="museum-scene__floor" aria-hidden="true"></div>
            <div class="museum-scene__ambient" aria-hidden="true"></div>
            <div class="museum-scene__layers" aria-hidden="true">${renderSceneLayers(activeRoom)}</div>
            <div class="museum-scene__objects">${renderSceneObjects(exhibits)}</div>
            <div class="museum-scene__footer">${renderSceneFooter()}</div>
        </article>
    `;
}

function renderRoomStage(activeRoom, transitionDirection) {
    const exhibits = getRoomExhibits(activeRoom.id);
    const activeIndex = ROOM_ORDER.indexOf(activeRoom.id);
    const previousRoomId = ROOM_ORDER[activeIndex - 1] ?? null;
    const nextRoomId = ROOM_ORDER[activeIndex + 1] ?? null;
    const transitionClass = transitionDirection ? ` room-panel--transition room-panel--${transitionDirection}` : "";

    return `
        <section class="room-panel${transitionClass}">
            <div class="room-copy">
                <div class="room-copy__meta">
                    <span class="room-copy__count">${String(activeIndex + 1).padStart(2, "0")} / ${String(ROOM_ORDER.length).padStart(2, "0")}</span>
                    <span class="room-copy__divider" aria-hidden="true"></span>
                    <span class="room-copy__eyebrow">${escapeHtml(t(activeRoom.eyebrowKey))}</span>
                </div>
                <div class="room-copy__grid">
                    <div class="room-copy__lead">
                        <h2 class="room-copy__title">${escapeHtml(t(activeRoom.titleKey))}</h2>
                        <p class="room-copy__description">${escapeHtml(t(activeRoom.descriptionKey))}</p>
                    </div>
                    <aside class="room-copy__atmosphere">${escapeHtml(t(activeRoom.atmosphereKey))}</aside>
                </div>
            </div>
            ${renderSceneArticle(activeRoom, exhibits)}
            <footer class="room-panel__footer">
                <button class="room-nav room-nav--previous ${previousRoomId ? "" : "is-hidden"}" type="button" data-action="previous-room" data-cursor="interactive" ${previousRoomId ? "" : "disabled"}>
                    <span>${escapeHtml(t("controls.previousRoom"))}</span>
                    <strong>${previousRoomId ? escapeHtml(t(ROOM_DEFINITIONS[previousRoomId].titleKey)) : ""}</strong>
                </button>
                <div class="room-panel__status">
                    <span>${escapeHtml(t("controls.archiveReady"))}</span>
                    <strong>${escapeHtml(state.entered ? (state.audioEnabled ? t("app.archiveStatusSound") : t("app.archiveStatusQuiet")) : t("app.archiveStatus"))}</strong>
                </div>
                <button class="room-nav room-nav--next ${nextRoomId ? "" : "is-hidden"}" type="button" data-action="next-room" data-cursor="interactive" ${nextRoomId ? "" : "disabled"}>
                    <span>${escapeHtml(t("controls.nextRoom"))}</span>
                    <strong>${nextRoomId ? escapeHtml(t(ROOM_DEFINITIONS[nextRoomId].titleKey)) : ""}</strong>
                </button>
            </footer>
        </section>
    `;
}

async function loadSnapshot() {
    const sourceUrl = dataSourceMeta?.content;
    if (!sourceUrl) {
        return { exhibits: FALLBACK_SNAPSHOT.exhibits, usingFallbackData: true };
    }

    try {
        const response = await fetch(sourceUrl, { headers: { Accept: "application/json" }, credentials: "same-origin" });
        if (!response.ok) throw new Error(`Snapshot request failed with status ${response.status}.`);
        const payload = await response.json();
        const exhibits = Array.isArray(payload) ? payload : payload.exhibits;
        if (!Array.isArray(exhibits)) throw new Error("Snapshot payload does not contain an exhibits array.");
        return { exhibits, usingFallbackData: false };
    } catch (error) {
        console.warn("Falling back to embedded museum snapshot.", error);
        return { exhibits: FALLBACK_SNAPSHOT.exhibits, usingFallbackData: true };
    }
}

function normalizeExhibits(records) {
    return records
        .filter((record) => coerceBoolean(record.is_active, true))
        .filter((record) => ROOM_ORDER.includes(record.room))
        .map((record) => {
            const config = VISUAL_REGISTRY[record.visual_key] ?? VISUAL_REGISTRY.fallback;
            return {
                id: Number(record.id) || 0,
                slug: String(record.slug),
                room: record.room,
                category: record.category,
                visualKey: record.visual_key in VISUAL_REGISTRY ? record.visual_key : "fallback",
                soundKey: record.sound_key || "signal",
                name_cs: String(record.name_cs),
                name_en: String(record.name_en),
                year_or_era_cs: String(record.year_or_era_cs),
                year_or_era_en: String(record.year_or_era_en),
                description_cs: String(record.description_cs),
                description_en: String(record.description_en),
                caption_cs: String(record.caption_cs),
                caption_en: String(record.caption_en),
                positionX: clampNumber(record.position_x, 12, 88),
                positionY: clampNumber(record.position_y, 24, 84),
                scale: clampNumber(record.scale, 0.72, 1.38),
                rotation: clampNumber(record.rotation, -12, 12),
                highlightPriority: Number.isFinite(Number(record.highlight_priority)) ? Number(record.highlight_priority) : 0,
                actionKey: config.actionKey
            };
        })
        .sort((left, right) => {
            const roomDifference = ROOM_ORDER.indexOf(left.room) - ROOM_ORDER.indexOf(right.room);
            return roomDifference !== 0 ? roomDifference : right.highlightPriority - left.highlightPriority;
        });
}

function getRoomExhibits(roomId) {
    return state.exhibits.filter((exhibit) => exhibit.room === roomId);
}

function getActiveRoom() {
    return ROOM_DEFINITIONS[state.activeRoomId] ?? ROOM_DEFINITIONS[ROOM_ORDER[0]];
}

function getSelectedExhibit() {
    return state.exhibits.find((exhibit) => exhibit.slug === state.selectedExhibitSlug) ?? null;
}

function getPresentedExhibit() {
    return state.exhibits.find((exhibit) => exhibit.slug === state.presentedExhibitSlug) ?? null;
}

function getAdjacentRoom(direction) {
    return ROOM_ORDER[ROOM_ORDER.indexOf(state.activeRoomId) + direction] ?? null;
}

function setLocale(locale) {
    if (locale !== "en" && locale !== "cs") return;
    state.locale = locale;
    window.localStorage.setItem(STORAGE_KEYS.locale, locale);
    render();
}

function enterMuseum(withSound) {
    clearCinematicSplashImmediately();
    state.entered = true;
    if (withSound) {
        void audio.setEnabled(true).then((enabled) => {
            state.audioEnabled = enabled;
            persistAudioPreference();
            if (enabled) audio.playCue("transition", 0.72);
            render();
        });
        return;
    }
    void audio.setEnabled(false).then(() => {
        state.audioEnabled = false;
        persistAudioPreference();
        render();
    });
}

function changeRoom(roomId) {
    if (!roomId || !ROOM_DEFINITIONS[roomId] || roomId === state.activeRoomId) return;
    const currentIndex = ROOM_ORDER.indexOf(state.activeRoomId);
    const nextIndex = ROOM_ORDER.indexOf(roomId);
    const direction = nextIndex > currentIndex ? "forward" : "backward";
    clearDrawerImmediately();
    state.roomTransitionDirection = direction;
    state.activeRoomId = roomId;
    state.visitedRooms.add(roomId);
    persistRoom();
    if (state.entered && state.audioEnabled) audio.playCue("transition", 0.7);
    render();
    state.roomTransitionDirection = null;
}

async function toggleSound() {
    const enabled = await audio.setEnabled(!state.audioEnabled);
    state.audioEnabled = enabled;
    persistAudioPreference();
    if (enabled && state.entered) audio.playCue("transition", 0.68);
    render();
}

function openExhibit(slug, trigger) {
    const exhibit = state.exhibits.find((item) => item.slug === slug);
    if (!exhibit) return;
    const shouldAnimateOpen = !state.presentedExhibitSlug || state.drawerClosing;
    updateCrtSequence(exhibit.slug);
    cancelDrawerTeardown();
    cancelDrawerEnter();
    state.lastTrigger = trigger ?? null;
    state.selectedExhibitSlug = exhibit.slug;
    state.presentedExhibitSlug = exhibit.slug;
    state.drawerClosing = false;
    state.drawerEntering = shouldAnimateOpen;
    state.viewedArtifacts.add(exhibit.slug);
    if (state.entered && state.audioEnabled) audio.playCue(exhibit.soundKey, 0.82);
    render();

    if (!shouldAnimateOpen) {
        return;
    }

    drawerEnterTimer = window.setTimeout(() => {
        state.drawerEntering = false;
        render();
        drawerFocusTimer = window.setTimeout(() => {
            ROOT.querySelector('[data-action="close-modal"]')?.focus();
            drawerFocusTimer = null;
        }, prefersReducedMotion() ? 0 : DRAWER_ENTER_FOCUS_MS);
        drawerEnterTimer = null;
    }, prefersReducedMotion() ? 0 : DRAWER_ENTER_MS);
}

function closeModal() {
    if (!state.selectedExhibitSlug) return;
    cancelDrawerTeardown();
    cancelDrawerEnter();
    state.selectedExhibitSlug = null;
    state.drawerEntering = false;
    state.drawerClosing = true;
    render();
    drawerTeardownTimer = window.setTimeout(() => {
        state.presentedExhibitSlug = null;
        state.drawerEntering = false;
        state.drawerClosing = false;
        render();
        state.lastTrigger?.focus?.();
        drawerTeardownTimer = null;
    }, DRAWER_EXIT_MS);
}

function replaySelectedCue() {
    const exhibit = getSelectedExhibit();
    if (exhibit) audio.playCue(exhibit.soundKey, 0.92);
}

function cancelDrawerTeardown() {
    if (!drawerTeardownTimer) return;
    window.clearTimeout(drawerTeardownTimer);
    drawerTeardownTimer = null;
}

function cancelDrawerEnter() {
    if (drawerEnterTimer) {
        window.clearTimeout(drawerEnterTimer);
        drawerEnterTimer = null;
    }
    if (drawerFocusTimer) {
        window.clearTimeout(drawerFocusTimer);
        drawerFocusTimer = null;
    }
}

function clearDrawerImmediately() {
    cancelDrawerTeardown();
    cancelDrawerEnter();
    state.selectedExhibitSlug = null;
    state.presentedExhibitSlug = null;
    state.drawerEntering = false;
    state.drawerClosing = false;
}

function shouldShowCinematicSplash() {
    if (prefersReducedMotion()) return false;
    try {
        return window.sessionStorage.getItem(SESSION_KEYS.cinematicSplashSeen) !== "true";
    } catch (error) {
        return true;
    }
}

function markCinematicSplashSeen() {
    try {
        window.sessionStorage.setItem(SESSION_KEYS.cinematicSplashSeen, "true");
    } catch (error) {
        // Ignore session storage failures and keep the splash ephemeral.
    }
}

function scheduleCinematicSplash() {
    cancelCinematicSplashTimers();
    const holdMs = prefersReducedMotion() ? 40 : CINEMATIC_SPLASH_HOLD_MS;
    cinematicSplashTimer = window.setTimeout(() => {
        state.cinematicSplashClosing = true;
        render();
        cinematicSplashTimer = null;
        cinematicSplashTeardownTimer = window.setTimeout(() => {
            state.cinematicSplashVisible = false;
            state.cinematicSplashClosing = false;
            markCinematicSplashSeen();
            render();
            cinematicSplashTeardownTimer = null;
        }, prefersReducedMotion() ? 0 : CINEMATIC_SPLASH_EXIT_MS);
    }, holdMs);
}

function cancelCinematicSplashTimers() {
    if (cinematicSplashTimer) {
        window.clearTimeout(cinematicSplashTimer);
        cinematicSplashTimer = null;
    }
    if (cinematicSplashTeardownTimer) {
        window.clearTimeout(cinematicSplashTeardownTimer);
        cinematicSplashTeardownTimer = null;
    }
}

function clearCinematicSplashImmediately() {
    cancelCinematicSplashTimers();
    if (!state.cinematicSplashVisible && !state.cinematicSplashClosing) return;
    state.cinematicSplashVisible = false;
    state.cinematicSplashClosing = false;
    markCinematicSplashSeen();
}

function updateCrtSequence(slug) {
    if (slug === "crt-monitor") {
        state.crtSequenceCount += 1;
        if (state.crtSequenceCount >= 3) {
            state.crtSequenceCount = 0;
            triggerMemoryFragment();
        }
        return;
    }
    state.crtSequenceCount = 0;
}

function triggerMemoryFragment() {
    cancelMemoryFragmentTimers();
    state.memoryFragmentVisible = true;
    state.memoryFragmentPulse = true;
    if (state.entered && state.audioEnabled) {
        audio.playCue("phosphor", 0.72);
    }
    render();
    memoryFragmentPulseTimer = window.setTimeout(() => {
        state.memoryFragmentPulse = false;
        render();
        memoryFragmentPulseTimer = null;
    }, prefersReducedMotion() ? 0 : MEMORY_FRAGMENT_PULSE_MS);
    memoryFragmentTimer = window.setTimeout(() => {
        state.memoryFragmentVisible = false;
        render();
        memoryFragmentTimer = null;
    }, prefersReducedMotion() ? 0 : MEMORY_FRAGMENT_TOAST_MS);
}

function cancelMemoryFragmentTimers() {
    if (memoryFragmentTimer) {
        window.clearTimeout(memoryFragmentTimer);
        memoryFragmentTimer = null;
    }
    if (memoryFragmentPulseTimer) {
        window.clearTimeout(memoryFragmentPulseTimer);
        memoryFragmentPulseTimer = null;
    }
}

function queueRoomNavigationSmoothing() {
    const reduceMotion = prefersReducedMotion();
    window.requestAnimationFrame(() => {
        ROOT.querySelector(".museum-top-nav__item.is-active")?.scrollIntoView({
            behavior: reduceMotion ? "auto" : "smooth",
            block: "nearest",
            inline: "center"
        });

        const panel = ROOT.querySelector(".room-panel");
        if (!panel) return;
        const top = Math.max(0, panel.getBoundingClientRect().top + window.scrollY - 18);
        window.scrollTo({
            top,
            behavior: reduceMotion ? "auto" : "smooth"
        });
    });
}

function syncAmbientSound() {
    if (!state.entered || !state.audioEnabled) {
        audio.stopAmbient();
        return;
    }
    audio.startAmbient(getActiveRoom().ambient);
}

function trapModalFocus(event) {
    const modal = ROOT.querySelector(".artifact-drawer.is-open");
    if (!modal) return;
    const focusable = Array.from(modal.querySelectorAll("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"));
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
        return;
    }
    if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
    }
}

function localizeExhibit(exhibit, fieldRoot) {
    return state.locale === "cs" ? exhibit[`${fieldRoot}_cs`] : exhibit[`${fieldRoot}_en`];
}

function t(path) {
    const value = path.split(".").reduce((current, key) => {
        if (!current || typeof current !== "object") return undefined;
        return current[key];
    }, STRINGS[state.locale]);
    return typeof value === "string" ? value : path;
}

function persistRoom() {
    window.localStorage.setItem(STORAGE_KEYS.room, state.activeRoomId);
}

function persistAudioPreference() {
    window.localStorage.setItem(STORAGE_KEYS.audio, String(state.audioEnabled));
}

function getStoredLocale() {
    const stored = window.localStorage.getItem(STORAGE_KEYS.locale);
    if (stored === "en" || stored === "cs") return stored;
    return window.navigator.language.toLowerCase().startsWith("cs") ? "cs" : "en";
}

function getStoredRoom() {
    const stored = window.localStorage.getItem(STORAGE_KEYS.room);
    return ROOM_ORDER.includes(stored) ? stored : ROOM_ORDER[0];
}

function getStoredAudioPreference() {
    return window.localStorage.getItem(STORAGE_KEYS.audio) === "true";
}

function prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function coerceBoolean(value, fallback) {
    if (typeof value === "boolean") return value;
    if (typeof value === "number") return value !== 0;
    if (typeof value === "string") {
        if (value === "true" || value === "1") return true;
        if (value === "false" || value === "0") return false;
    }
    return fallback;
}

function clampNumber(value, min, max) {
    const numericValue = Number(value);
    if (!Number.isFinite(numericValue)) return min;
    return Math.min(max, Math.max(min, numericValue));
}

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\"/g, "&quot;")
        .replace(/'/g, "&#39;");
}
function createAudioManager(initialEnabled) {
    let enabled = initialEnabled;
    let supported = typeof getAudioContextConstructor() === "function";
    let context = null;
    let noiseBuffer = null;
    let ambientNodes = null;
    let ambientKey = null;

    function ensureContext() {
        const AudioContextConstructor = getAudioContextConstructor();
        if (!AudioContextConstructor) {
            supported = false;
            return null;
        }
        if (context) return context;
        try {
            context = new AudioContextConstructor();
            noiseBuffer = createNoiseBuffer(context);
            supported = true;
            return context;
        } catch (error) {
            supported = false;
            console.warn("Unable to initialise Web Audio context.", error);
            return null;
        }
    }

    async function setEnabled(nextValue) {
        const desiredState = typeof nextValue === "boolean" ? nextValue : !enabled;
        enabled = desiredState;
        if (!desiredState) {
            stopAmbient();
            if (context && context.state === "running") await context.suspend();
            return false;
        }
        const audioContext = ensureContext();
        if (!audioContext) {
            enabled = false;
            return false;
        }
        if (audioContext.state === "suspended") await audioContext.resume();
        return true;
    }

    function playCue(key, volume = 1) {
        if (!enabled) return;
        const audioContext = ensureContext();
        if (!audioContext || audioContext.state !== "running") return;

        const startTime = audioContext.currentTime;
        const gainNode = audioContext.createGain();
        gainNode.gain.setValueAtTime(0.0001, startTime);
        gainNode.gain.exponentialRampToValueAtTime(Math.max(0.009, 0.026 * volume), startTime + 0.02);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.24);
        gainNode.connect(audioContext.destination);

        const createOscillator = (type, frequency, stopTime) => {
            const oscillator = audioContext.createOscillator();
            oscillator.type = type;
            oscillator.frequency.setValueAtTime(frequency, startTime);
            oscillator.connect(gainNode);
            oscillator.start(startTime);
            oscillator.stop(stopTime);
        };

        switch (key) {
            case "signal":
                createOscillator("sine", 842, startTime + 0.18);
                createOscillator("triangle", 1264, startTime + 0.14);
                break;
            case "ring":
                createOscillator("triangle", 440, startTime + 0.22);
                createOscillator("sine", 660, startTime + 0.22);
                break;
            case "keypad":
                createOscillator("square", 740, startTime + 0.08);
                createOscillator("square", 1110, startTime + 0.08);
                break;
            case "mechanical": {
                const source = audioContext.createBufferSource();
                const bandpass = audioContext.createBiquadFilter();
                source.buffer = noiseBuffer;
                bandpass.type = "bandpass";
                bandpass.frequency.setValueAtTime(920, startTime);
                bandpass.Q.value = 2.4;
                source.connect(bandpass);
                bandpass.connect(gainNode);
                source.start(startTime);
                source.stop(startTime + 0.09);
                break;
            }
            case "magnetic":
                createOscillator("sine", 220, startTime + 0.22);
                createOscillator("triangle", 329.63, startTime + 0.2);
                break;
            case "phosphor":
                createOscillator("sine", 196, startTime + 0.2);
                createOscillator("sawtooth", 392, startTime + 0.14);
                break;
            case "printer":
                createOscillator("square", 520, startTime + 0.06);
                window.setTimeout(() => playCue("mechanical", 0.6), 24);
                break;
            case "transition":
                createOscillator("sine", 164.81, startTime + 0.26);
                createOscillator("triangle", 246.94, startTime + 0.26);
                break;
            default:
                createOscillator("sine", 130.81, startTime + 0.24);
                createOscillator("triangle", 196, startTime + 0.24);
                break;
        }
    }

    function startAmbient(key) {
        if (!enabled) return;
        const audioContext = ensureContext();
        if (!audioContext || audioContext.state !== "running") return;
        if (ambientKey === key && ambientNodes) return;
        stopAmbient();
        const preset = AMBIENT_PRESETS[key];
        if (!preset) return;

        const masterGain = audioContext.createGain();
        masterGain.gain.setValueAtTime(0.0001, audioContext.currentTime);
        masterGain.gain.exponentialRampToValueAtTime(preset.gain, audioContext.currentTime + 1.4);
        masterGain.connect(audioContext.destination);

        const primary = audioContext.createOscillator();
        primary.type = "sine";
        primary.frequency.setValueAtTime(preset.base, audioContext.currentTime);

        const companion = audioContext.createOscillator();
        companion.type = "triangle";
        companion.frequency.setValueAtTime(preset.companion, audioContext.currentTime);

        const motion = audioContext.createOscillator();
        motion.type = "sine";
        motion.frequency.setValueAtTime(preset.motion, audioContext.currentTime);

        const motionGain = audioContext.createGain();
        motionGain.gain.setValueAtTime(18, audioContext.currentTime);
        motion.connect(motionGain);

        const lowpass = audioContext.createBiquadFilter();
        lowpass.type = "lowpass";
        lowpass.frequency.setValueAtTime(preset.filter, audioContext.currentTime);
        lowpass.Q.value = 0.3;
        motionGain.connect(lowpass.frequency);

        const noise = audioContext.createBufferSource();
        noise.buffer = noiseBuffer;
        noise.loop = true;

        const noiseFilter = audioContext.createBiquadFilter();
        noiseFilter.type = "lowpass";
        noiseFilter.frequency.setValueAtTime(preset.noiseFilter, audioContext.currentTime);

        const noiseGain = audioContext.createGain();
        noiseGain.gain.setValueAtTime(preset.gain * 0.35, audioContext.currentTime);

        primary.connect(lowpass);
        companion.connect(lowpass);
        lowpass.connect(masterGain);
        noise.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(masterGain);

        primary.start();
        companion.start();
        motion.start();
        noise.start();

        ambientNodes = { nodes: [primary, companion, motion, noise], disconnectables: [masterGain, motionGain, lowpass, noiseFilter, noiseGain] };
        ambientKey = key;
    }

    function stopAmbient() {
        if (!ambientNodes) {
            ambientKey = null;
            return;
        }
        ambientNodes.nodes.forEach((node) => {
            try { node.stop(); } catch (error) { void error; }
        });
        ambientNodes.disconnectables.forEach((node) => {
            try { node.disconnect(); } catch (error) { void error; }
        });
        ambientNodes = null;
        ambientKey = null;
    }

    return { isSupported: () => supported, setEnabled, playCue, startAmbient, stopAmbient };
}

function getAudioContextConstructor() {
    return window.AudioContext ?? window.webkitAudioContext;
}

function createNoiseBuffer(audioContext) {
    const buffer = audioContext.createBuffer(1, audioContext.sampleRate * 2, audioContext.sampleRate);
    const channelData = buffer.getChannelData(0);
    for (let index = 0; index < channelData.length; index += 1) {
        channelData[index] = Math.random() * 2 - 1;
    }
    return buffer;
}

function initCustomCursor() {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    document.body.classList.add("fine-pointer");

    const dot = document.createElement("div");
    dot.className = "museum-cursor-dot";
    const ring = document.createElement("div");
    ring.className = "museum-cursor-ring";
    document.body.append(dot, ring);

    const syncCursorState = (target) => {
        const interactiveTarget = target?.closest?.("[data-cursor='interactive']");
        const exhibitTarget = target?.closest?.(".exhibit-hotspot");
        ring.classList.toggle("is-interactive", Boolean(interactiveTarget));
        ring.classList.toggle("is-exhibit", Boolean(exhibitTarget));
        dot.classList.toggle("is-interactive", Boolean(interactiveTarget));
    };

    document.addEventListener("pointermove", (event) => {
        dot.style.setProperty("--cursor-x", `${event.clientX}px`);
        dot.style.setProperty("--cursor-y", `${event.clientY}px`);
        ring.style.setProperty("--cursor-x", `${event.clientX}px`);
        ring.style.setProperty("--cursor-y", `${event.clientY}px`);
        dot.classList.add("is-visible");
        ring.classList.add("is-visible");
        syncCursorState(event.target);
    }, { passive: true });

    document.addEventListener("pointerover", (event) => {
        syncCursorState(event.target);
    });
    document.addEventListener("focusin", (event) => {
        syncCursorState(event.target);
    });
    document.addEventListener("pointerleave", () => {
        dot.classList.remove("is-visible");
        ring.classList.remove("is-visible");
    });
    document.addEventListener("pointerdown", () => ring.classList.add("is-pressed"));
    document.addEventListener("pointerup", () => ring.classList.remove("is-pressed"));
    window.addEventListener("blur", () => {
        dot.classList.remove("is-visible");
        ring.classList.remove("is-visible");
        ring.classList.remove("is-pressed");
    });
}

function renderVisual(exhibit, suffix) {
    const config = VISUAL_REGISTRY[exhibit.visualKey] ?? VISUAL_REGISTRY.fallback;
    return config.render(`${exhibit.slug}-${suffix}`);
}

function renderArtifactSvg(prefix, viewBox, inner) {
    return `
        <svg class="artifact-svg" viewBox="${viewBox}" aria-hidden="true" focusable="false">
            <defs>
                <filter id="${prefix}-shadow" x="-30%" y="-30%" width="160%" height="180%">
                    <feDropShadow dx="0" dy="16" stdDeviation="12" flood-color="#000000" flood-opacity="0.28"></feDropShadow>
                </filter>
                <linearGradient id="${prefix}-casing" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#6a4a34"></stop>
                    <stop offset="38%" stop-color="#3a281d"></stop>
                    <stop offset="100%" stop-color="#120b08"></stop>
                </linearGradient>
                <linearGradient id="${prefix}-edge" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#f4dfbd"></stop>
                    <stop offset="56%" stop-color="#c58b55"></stop>
                    <stop offset="100%" stop-color="#7f5331"></stop>
                </linearGradient>
                <linearGradient id="${prefix}-trim" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="#f0d8af"></stop>
                    <stop offset="45%" stop-color="#b7814d"></stop>
                    <stop offset="100%" stop-color="#5e3922"></stop>
                </linearGradient>
                <linearGradient id="${prefix}-glass" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#fbf7ea"></stop>
                    <stop offset="42%" stop-color="#bdcab9"></stop>
                    <stop offset="100%" stop-color="#53615b"></stop>
                </linearGradient>
                <linearGradient id="${prefix}-accent" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#f6dfb7"></stop>
                    <stop offset="100%" stop-color="#cb8d50"></stop>
                </linearGradient>
                <radialGradient id="${prefix}-glow" cx="50%" cy="45%" r="70%">
                    <stop offset="0%" stop-color="#f6d59f" stop-opacity="0.34"></stop>
                    <stop offset="100%" stop-color="#f6d59f" stop-opacity="0"></stop>
                </radialGradient>
                <radialGradient id="${prefix}-sheen" cx="36%" cy="22%" r="78%">
                    <stop offset="0%" stop-color="#fff6ea" stop-opacity="0.18"></stop>
                    <stop offset="100%" stop-color="#fff6ea" stop-opacity="0"></stop>
                </radialGradient>
            </defs>
            ${inner}
        </svg>
    `;
}
function renderPager(prefix) {
    return renderArtifactSvg(prefix, "0 0 260 260", `
        <ellipse cx="130" cy="226" rx="56" ry="15" fill="url(#${prefix}-glow)" opacity="0.4"></ellipse>
        <g filter="url(#${prefix}-shadow)">
            <path d="M126 36h8l8 24h-8z" fill="url(#${prefix}-trim)"></path>
            <path d="M142 30h10l10 34h-10z" fill="url(#${prefix}-edge)"></path>
            <rect x="74" y="48" width="112" height="170" rx="24" fill="url(#${prefix}-casing)" stroke="#f0d4aa" stroke-opacity="0.36" stroke-width="4"></rect>
            <rect x="80" y="54" width="100" height="160" rx="20" fill="url(#${prefix}-sheen)" opacity="0.8"></rect>
            <rect x="92" y="74" width="76" height="42" rx="11" fill="#0e0907" stroke="url(#${prefix}-trim)" stroke-opacity="0.7" stroke-width="3"></rect>
            <rect x="100" y="82" width="60" height="26" rx="8" fill="url(#${prefix}-glass)"></rect>
            <rect x="106" y="88" width="30" height="6" rx="3" fill="#f7f3e5" fill-opacity="0.88"></rect>
            <rect x="106" y="98" width="42" height="4" rx="2" fill="#d2dccb" fill-opacity="0.8"></rect>
            <rect x="126" y="58" width="20" height="7" rx="3.5" fill="#f0d9bc" fill-opacity="0.72"></rect>
            <g fill="url(#${prefix}-accent)">
                <circle cx="102" cy="138" r="5.5"></circle><circle cx="126" cy="138" r="5.5"></circle><circle cx="150" cy="138" r="5.5"></circle><circle cx="174" cy="138" r="5.5"></circle>
                <circle cx="102" cy="160" r="5.5"></circle><circle cx="126" cy="160" r="5.5"></circle><circle cx="150" cy="160" r="5.5"></circle><circle cx="174" cy="160" r="5.5"></circle>
                <circle cx="114" cy="182" r="5.5"></circle><circle cx="138" cy="182" r="5.5"></circle><circle cx="162" cy="182" r="5.5"></circle>
            </g>
            <path d="M92 60c0-8 6-14 14-14h16v14H92z" fill="#090605" opacity="0.46"></path>
        </g>
    `);
}

function renderTelephone(prefix) {
    return renderArtifactSvg(prefix, "0 0 340 240", `
        <ellipse cx="170" cy="214" rx="90" ry="14" fill="url(#${prefix}-glow)" opacity="0.34"></ellipse>
        <g filter="url(#${prefix}-shadow)">
            <path d="M116 84c14-18 32-27 54-27s40 9 54 27l-8 15c-14-7-29-10-46-10s-32 3-46 10z" fill="url(#${prefix}-casing)" stroke="#f0d4aa" stroke-opacity="0.28" stroke-width="4"></path>
            <path d="M98 137c16 8 40 12 72 12s56-4 72-12l10 30c4 12-5 23-18 23H106c-13 0-22-11-18-23z" fill="url(#${prefix}-casing)" stroke="#e8c58f" stroke-opacity="0.24" stroke-width="4"></path>
            <path d="M118 145c14 5 31 8 52 8s38-3 52-8" fill="none" stroke="url(#${prefix}-sheen)" stroke-width="7" stroke-linecap="round" opacity="0.2"></path>
            <circle cx="170" cy="157" r="24" fill="#120b09" stroke="url(#${prefix}-trim)" stroke-width="4"></circle>
            <circle cx="170" cy="157" r="11" fill="#2a1a14" stroke="#f2d5ab" stroke-opacity="0.24" stroke-width="2.5"></circle>
            <g fill="url(#${prefix}-accent)" opacity="0.9">
                <circle cx="170" cy="135" r="3"></circle><circle cx="185" cy="142" r="3"></circle><circle cx="191" cy="157" r="3"></circle><circle cx="185" cy="172" r="3"></circle>
                <circle cx="170" cy="179" r="3"></circle><circle cx="155" cy="172" r="3"></circle><circle cx="149" cy="157" r="3"></circle><circle cx="155" cy="142" r="3"></circle>
            </g>
            <path d="M136 96h13l2 10h-14zm55 0h13l-2 10h-14z" fill="url(#${prefix}-trim)" opacity="0.68"></path>
            <path d="M115 187h24l-4 7h-16zm86 0h24l-4 7h-16z" fill="#140c0a" opacity="0.68"></path>
        </g>
    `);
}

function renderNokia(prefix) {
    return renderArtifactSvg(prefix, "0 0 240 320", `
        <ellipse cx="120" cy="286" rx="56" ry="14" fill="url(#${prefix}-glow)" opacity="0.38"></ellipse>
        <g filter="url(#${prefix}-shadow)">
            <rect x="56" y="30" width="128" height="250" rx="34" fill="url(#${prefix}-casing)" stroke="#f0d4aa" stroke-opacity="0.34" stroke-width="4"></rect>
            <rect x="62" y="36" width="116" height="238" rx="30" fill="url(#${prefix}-sheen)" opacity="0.82"></rect>
            <rect x="88" y="54" width="64" height="8" rx="4" fill="#e9d7b6" fill-opacity="0.64"></rect>
            <rect x="78" y="78" width="84" height="66" rx="12" fill="#0d0806" stroke="url(#${prefix}-trim)" stroke-opacity="0.7" stroke-width="3"></rect>
            <rect x="86" y="86" width="68" height="50" rx="10" fill="url(#${prefix}-glass)"></rect>
            <rect x="94" y="94" width="40" height="6" rx="3" fill="#fbf7ed" fill-opacity="0.88"></rect>
            <rect x="94" y="106" width="50" height="4" rx="2" fill="#d0dfc8" fill-opacity="0.78"></rect>
            <path d="M84 160h72l18 20c4 4 3 10-2 13l-16 10c-5 3-11 1-13-3l-6-10h-34l-6 10c-2 4-8 6-13 3l-16-10c-5-3-6-9-2-13z" fill="url(#${prefix}-trim)"></path>
            <circle cx="120" cy="175" r="10" fill="#2c1d15" stroke="#f3d1a4" stroke-opacity="0.36" stroke-width="3"></circle>
            <g fill="url(#${prefix}-accent)">
                <rect x="86" y="210" width="18" height="14" rx="5"></rect><rect x="111" y="210" width="18" height="14" rx="5"></rect><rect x="136" y="210" width="18" height="14" rx="5"></rect>
                <rect x="86" y="230" width="18" height="14" rx="5"></rect><rect x="111" y="230" width="18" height="14" rx="5"></rect><rect x="136" y="230" width="18" height="14" rx="5"></rect>
                <rect x="86" y="250" width="18" height="14" rx="5"></rect><rect x="111" y="250" width="18" height="14" rx="5"></rect><rect x="136" y="250" width="18" height="14" rx="5"></rect>
            </g>
        </g>
    `);
}

function renderAnsweringMachine(prefix) {
    return renderArtifactSvg(prefix, "0 0 320 240", `
        <ellipse cx="160" cy="214" rx="88" ry="14" fill="url(#${prefix}-glow)" opacity="0.36"></ellipse>
        <g filter="url(#${prefix}-shadow)">
            <path d="M74 90c0-14 12-26 26-26h120c14 0 26 12 26 26v76c0 14-12 26-26 26H100c-14 0-26-12-26-26z" fill="url(#${prefix}-casing)" stroke="#efcf9d" stroke-opacity="0.34" stroke-width="4"></path>
            <rect x="82" y="74" width="156" height="14" rx="7" fill="#140d0a" stroke="url(#${prefix}-trim)" stroke-opacity="0.64" stroke-width="3"></rect>
            <rect x="94" y="88" width="132" height="56" rx="16" fill="#100a08" stroke="#f2d1a4" stroke-opacity="0.2" stroke-width="3"></rect>
            <rect x="108" y="98" width="46" height="34" rx="10" fill="url(#${prefix}-glass)"></rect>
            <rect x="164" y="100" width="48" height="12" rx="6" fill="#2a1a14" stroke="url(#${prefix}-trim)" stroke-width="2"></rect>
            <rect x="164" y="118" width="36" height="8" rx="4" fill="#f3d8b6" fill-opacity="0.68"></rect>
            <path d="M104 152h112" stroke="#f2d1a4" stroke-opacity="0.24" stroke-width="4" stroke-linecap="round"></path>
            <g fill="url(#${prefix}-accent)"><rect x="98" y="162" width="26" height="14" rx="7"></rect><rect x="132" y="162" width="26" height="14" rx="7"></rect><rect x="166" y="162" width="26" height="14" rx="7"></rect><rect x="200" y="162" width="26" height="14" rx="7"></rect></g>
        </g>
    `);
}

function renderWalkman(prefix) {
    return renderArtifactSvg(prefix, "0 0 280 300", `
        <ellipse cx="140" cy="270" rx="68" ry="15" fill="url(#${prefix}-glow)" opacity="0.38"></ellipse>
        <g filter="url(#${prefix}-shadow)">
            <rect x="62" y="46" width="156" height="206" rx="28" fill="url(#${prefix}-casing)" stroke="#efcf9d" stroke-opacity="0.34" stroke-width="4"></rect>
            <rect x="70" y="54" width="140" height="190" rx="24" fill="url(#${prefix}-sheen)" opacity="0.82"></rect>
            <rect x="84" y="74" width="112" height="108" rx="20" fill="#100a08" stroke="#efd0a5" stroke-opacity="0.26" stroke-width="3"></rect>
            <circle cx="120" cy="128" r="25" fill="url(#${prefix}-glass)"></circle><circle cx="160" cy="128" r="25" fill="url(#${prefix}-glass)"></circle>
            <circle cx="120" cy="128" r="10" fill="#1d120d"></circle><circle cx="160" cy="128" r="10" fill="#1d120d"></circle>
            <rect x="94" y="196" width="92" height="8" rx="4" fill="#f3d7b2" fill-opacity="0.44"></rect>
            <g fill="url(#${prefix}-accent)"><rect x="96" y="220" width="22" height="14" rx="4"></rect><rect x="124" y="220" width="32" height="14" rx="4"></rect><rect x="162" y="220" width="22" height="14" rx="4"></rect></g>
            <path d="M214 98c20 8 30 22 30 44 0 18-7 30-18 42" fill="none" stroke="url(#${prefix}-trim)" stroke-width="6" stroke-linecap="round"></path>
        </g>
    `);
}

function renderVhs(prefix) {
    return renderArtifactSvg(prefix, "0 0 340 220", `
        <ellipse cx="170" cy="198" rx="102" ry="14" fill="url(#${prefix}-glow)" opacity="0.34"></ellipse>
        <g filter="url(#${prefix}-shadow)">
            <path d="M62 66h216c14 0 26 12 26 26v38c0 14-12 26-26 26H62c-14 0-26-12-26-26V92c0-14 12-26 26-26z" fill="url(#${prefix}-casing)" stroke="#efcf9d" stroke-opacity="0.34" stroke-width="4"></path>
            <rect x="76" y="84" width="188" height="54" rx="14" fill="#120b08" stroke="#efd0a5" stroke-opacity="0.24" stroke-width="3"></rect>
            <rect x="88" y="92" width="82" height="38" rx="8" fill="#1c120d"></rect>
            <rect x="178" y="92" width="56" height="38" rx="8" fill="url(#${prefix}-glass)"></rect>
            <circle cx="124" cy="111" r="17" fill="url(#${prefix}-glass)"></circle><circle cx="208" cy="111" r="17" fill="url(#${prefix}-glass)"></circle>
            <circle cx="124" cy="111" r="7" fill="#1b110d"></circle><circle cx="208" cy="111" r="7" fill="#1b110d"></circle>
            <rect x="112" y="144" width="116" height="10" rx="5" fill="url(#${prefix}-trim)"></rect>
            <rect x="62" y="70" width="216" height="12" rx="6" fill="url(#${prefix}-sheen)" opacity="0.42"></rect>
            <path d="M48 156l20 20h204l20-20" fill="#100906" opacity="0.28"></path>
        </g>
    `);
}

function renderCrtMonitor(prefix) {
    return renderArtifactSvg(prefix, "0 0 340 260", `
        <defs><radialGradient id="${prefix}-screen" cx="42%" cy="38%" r="70%"><stop offset="0%" stop-color="#dce8b6"></stop><stop offset="55%" stop-color="#7ea074"></stop><stop offset="100%" stop-color="#243a2d"></stop></radialGradient></defs>
        <ellipse cx="170" cy="228" rx="96" ry="16" fill="url(#${prefix}-glow)" opacity="0.38"></ellipse>
        <g filter="url(#${prefix}-shadow)">
            <path d="M74 58h192c16 0 28 12 28 28v88c0 16-12 28-28 28H74c-16 0-28-12-28-28V86c0-16 12-28 28-28z" fill="url(#${prefix}-casing)" stroke="#efcf9d" stroke-opacity="0.36" stroke-width="4"></path>
            <rect x="72" y="82" width="196" height="96" rx="20" fill="#0f0907" stroke="#f0d4aa" stroke-opacity="0.22" stroke-width="3"></rect>
            <rect x="88" y="92" width="164" height="76" rx="16" fill="url(#${prefix}-screen)"></rect>
            <path d="M102 96c28 12 54 18 120 18" stroke="#f6f8dc" stroke-opacity="0.24" stroke-width="4" stroke-linecap="round"></path>
            <path d="M122 208h96l18 28H104z" fill="url(#${prefix}-casing)" stroke="#efcf9d" stroke-opacity="0.28" stroke-width="4"></path>
            <rect x="110" y="232" width="120" height="12" rx="6" fill="url(#${prefix}-trim)"></rect>
            <path d="M258 90v96" stroke="#f0d4aa" stroke-opacity="0.12" stroke-width="3"></path>
            <circle cx="252" cy="188" r="4" fill="#dce8b6"></circle>
        </g>
    `);
}

function renderPrinter(prefix) {
    return renderArtifactSvg(prefix, "0 0 360 240", `
        <ellipse cx="180" cy="214" rx="102" ry="14" fill="url(#${prefix}-glow)" opacity="0.34"></ellipse>
        <g filter="url(#${prefix}-shadow)">
            <path d="M70 92h220c16 0 30 13 30 30v28c0 16-14 30-30 30H70c-16 0-30-14-30-30v-28c0-17 14-30 30-30z" fill="url(#${prefix}-casing)" stroke="#efcf9d" stroke-opacity="0.34" stroke-width="4"></path>
            <path d="M118 48h124l16 42H102z" fill="#f0e2bf" fill-opacity="0.96" stroke="#d0b48f" stroke-width="3"></path>
            <path d="M112 56h8v54h-8zm120 0h8v54h-8z" fill="#c29b62"></path>
            <path d="M130 66h100" stroke="#d0b48f" stroke-dasharray="4 6" stroke-width="3"></path>
            <rect x="82" y="114" width="196" height="36" rx="14" fill="#100906" stroke="#efd0a5" stroke-opacity="0.24" stroke-width="3"></rect>
            <rect x="112" y="126" width="126" height="10" rx="5" fill="url(#${prefix}-trim)"></rect>
            <rect x="98" y="158" width="164" height="12" rx="6" fill="#f1e4c4"></rect>
            <circle cx="98" cy="132" r="4" fill="url(#${prefix}-accent)"></circle>
            <circle cx="262" cy="132" r="4" fill="url(#${prefix}-accent)"></circle>
        </g>
    `);
}

function renderFloppy(prefix) {
    return renderArtifactSvg(prefix, "0 0 240 260", `
        <ellipse cx="120" cy="230" rx="56" ry="13" fill="url(#${prefix}-glow)" opacity="0.34"></ellipse>
        <g filter="url(#${prefix}-shadow)">
            <path d="M66 40h94l36 36v134c0 14-12 26-26 26H70c-14 0-26-12-26-26V66c0-14 8-26 22-26z" fill="url(#${prefix}-casing)" stroke="#efcf9d" stroke-opacity="0.36" stroke-width="4"></path>
            <path d="M160 40v36h36" fill="#1a100d" opacity="0.54"></path>
            <rect x="84" y="60" width="72" height="38" rx="8" fill="#0f0907" stroke="url(#${prefix}-trim)" stroke-opacity="0.72" stroke-width="3"></rect>
            <rect x="92" y="66" width="56" height="24" rx="6" fill="url(#${prefix}-glass)"></rect>
            <rect x="96" y="74" width="48" height="8" rx="4" fill="#f7f5eb" fill-opacity="0.84"></rect>
            <rect x="76" y="118" width="88" height="24" rx="6" fill="#241612" stroke="url(#${prefix}-trim)" stroke-width="3"></rect>
            <rect x="90" y="150" width="60" height="50" rx="10" fill="#f1e4c4" fill-opacity="0.9"></rect>
            <rect x="154" y="166" width="16" height="28" rx="4" fill="#0f0806"></rect>
        </g>
    `);
}

function renderTapeRecorder(prefix) {
    return renderArtifactSvg(prefix, "0 0 360 240", `
        <ellipse cx="180" cy="214" rx="104" ry="15" fill="url(#${prefix}-glow)" opacity="0.38"></ellipse>
        <g filter="url(#${prefix}-shadow)">
            <rect x="52" y="58" width="256" height="136" rx="28" fill="url(#${prefix}-casing)" stroke="#efcf9d" stroke-opacity="0.36" stroke-width="4"></rect>
            <rect x="74" y="82" width="212" height="72" rx="18" fill="#120b08" stroke="#efd0a5" stroke-opacity="0.22" stroke-width="3"></rect>
            <circle cx="122" cy="118" r="32" fill="url(#${prefix}-glass)"></circle><circle cx="238" cy="118" r="32" fill="url(#${prefix}-glass)"></circle>
            <circle cx="122" cy="118" r="10" fill="#1b110d"></circle><circle cx="238" cy="118" r="10" fill="#1b110d"></circle>
            <path d="M122 86l7 18 18 7-18 7-7 18-7-18-18-7 18-7z" fill="#f4d8b2" fill-opacity="0.52"></path>
            <path d="M238 86l7 18 18 7-18 7-7 18-7-18-18-7 18-7z" fill="#f4d8b2" fill-opacity="0.52"></path>
            <rect x="144" y="92" width="72" height="18" rx="6" fill="url(#${prefix}-trim)"></rect>
            <rect x="146" y="118" width="68" height="10" rx="5" fill="#f0ddbe" fill-opacity="0.72"></rect>
            <g fill="url(#${prefix}-accent)"><circle cx="122" cy="170" r="8"></circle><circle cx="152" cy="170" r="8"></circle><circle cx="182" cy="170" r="8"></circle><circle cx="212" cy="170" r="8"></circle></g>
        </g>
    `);
}

function renderFallbackVisual(prefix) {
    return renderArtifactSvg(prefix, "0 0 220 220", `
        <ellipse cx="110" cy="192" rx="44" ry="12" fill="url(#${prefix}-glow)" opacity="0.3"></ellipse>
        <g filter="url(#${prefix}-shadow)">
            <rect x="56" y="42" width="108" height="132" rx="24" fill="url(#${prefix}-casing)" stroke="#efcf9d" stroke-opacity="0.32" stroke-width="4"></rect>
            <rect x="76" y="68" width="68" height="44" rx="12" fill="#0f0907" stroke="url(#${prefix}-trim)" stroke-opacity="0.72" stroke-width="3"></rect>
            <rect x="84" y="76" width="52" height="28" rx="8" fill="url(#${prefix}-glass)"></rect>
            <rect x="82" y="126" width="56" height="10" rx="5" fill="url(#${prefix}-trim)"></rect>
        </g>
    `);
}
