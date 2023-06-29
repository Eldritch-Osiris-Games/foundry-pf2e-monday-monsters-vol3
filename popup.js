function registerSettings() {
	// Create the setting for disabling/re-enabling the popup.
	game.settings.register("foundry-pf2e-monday-monsters-vol3", "popupVis", {
		name: "Renable One-Time Popup",
		scope: "client",
		hint: "Renables the popup displayed when the module was first activated, will force a reload to immediately present the pop up, useful if you need to retrive the bug report URL ",
		requiresReload: true,
		config: true,
		type: Boolean,
		default: true
})
};

Hooks.once("init", () => {
	//Wait until the game is initialized, then register the settings created previously.
	registerSettings();
});

Hooks.once('ready', async function () {
    if (game.user.isGM) {
        if (game.settings.get("foundry-pf2e-monday-monsters-vol3", "popupVis") == true) {
            let d = new Dialog({
                title: "Premium Content Activated",

                content: `
                <h3>
								Thank you for purchasing Monday Monsters Volume 3: Weirds & Wonders  by Brett James Tomko!
								</h3>
								<p>
								This FoundryVTT module has been prepared by Avery for Eldritch Osiris Games, please report any bugs to:
								<a href="https://github.com/Eldritch-Osiris-Games/foundry-pf2e-monday-monsters-vol3/issues">GitHub</a>
								</p>
                `,
                buttons: {
                    one: {
                        label: "Close",
                        callback: () => game.settings.set("foundry-pf2e-monday-monsters-vol3", "popupVis", false)
                    },
                },
            },{ width: 450});
            d.render(true);
        }
    }
})
