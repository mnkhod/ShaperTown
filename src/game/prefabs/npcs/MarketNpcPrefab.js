
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class MarketNpcPrefab extends Phaser.GameObjects.Sprite {

	constructor(scene, x, y, texture, frame) {
		super(scene, x ?? 12.8, y ?? 12.8, texture || "GameNpcs1", frame ?? 6);

		this.scaleX = 0.8;
		this.scaleY = 0.8;
		this.play("NpcOldManJack");

		/* START-USER-CTR-CODE */
		// Write your code here.
		scene.events.on('create', this.prefabCreateCycle, this);
		this.setInteractive({ useHandCursor: true });
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	prefabCreateCycle(){
		this.on('pointerover', function (_pointer) {
			this.preFX.addGlow(16777215, 4, 0, false);
		});

		this.on('pointerdown', async function (_pointer) {
			let distance = this.getDistance(this.scene.playerPrefab,this)

			if(distance > 60){
				this.scene.alertPrefab.alert("Too Far")
				return;
			}

			if(this.scene.reactEvent == undefined) throw Error("REACT EVENT BUS NOT HOOKED IN")
			
			this.scene.reactEvent.emit("show-market-modal",this)

		},this);

		this.on('pointerout', function (_pointer) {
			this.preFX.clear();
		});
	}

	getDistance(texture1, texture2) {
		return Phaser.Math.Distance.Between(
			texture1.x,
			texture1.y,
			texture2.x,
			texture2.y
		);
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here