const controller = new ScrollMagic.Controller();

let exploreScene = new ScrollMagic.Scene({
    triggerElement: ".hike-explore",
    triggerHook: 0.5,
    offset: 0
})
    // .addIndicators({ colorStart: "white", colorTrigger: "green" })
    .setClassToggle(".hike-explore", "active")
    .addTo(controller);

exploreScene.duration(300);
console.log(`Current Scene Duration: ${exploreScene.duration()}`);

exploreScene.enabled()
    ? console.log("Explorer Scene Enabled")
    : console.log("Explorer Scene Disabled");

console.log(`Current Offset: ${exploreScene.offset()}`);

exploreScene.on("destroy", (event) => {
    event.reset ? console.log("Why U Do Dis 2 Me M8?") : console.log("I Live");
});

exploreScene = exploreScene.destroy(true);
