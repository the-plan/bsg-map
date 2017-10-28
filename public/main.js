class Raider {
    constructor(name, color, x, y, size, paper) {
        this.name = name;
        this.x = x;
        this.y = y;

        this.xVelocity = 1;
        this.yVelocity = -1;

        this.size = size;

        this.color = color == null ? '#0099FF' : `#${color}`;

        this.circle = paper.circle(x, y, size).attr({fill: this.color});
        this.legend = paper.text(x, y + 12, name).attr({fill: '#000000'});

    }

    move(color) {
        this.circle.animate({r: this.size});
        this.circle.translate(this.xVelocity, this.yVelocity);
        this.legend.translate(this.xVelocity, this.yVelocity);

        if (this.xVelocity === 0 && this.yVelocity === 0) {
            this.color = '#FFFFFF';
        } else {
            this.color = `#${color}`
        }
        this.circle.attr({fill: this.color});
    }

    remove() {
        this.circle.remove();
        this.legend.remove();
    }
}


window.onload = function () {
    let width = 600;
    let height = 600;
    let elem = document.getElementById("bsg-map");
    elem.innerHTML = "<div id='bsg-map-canvas' style='border: 1px dotted;border-radius: 5px; margin: auto; background: white; width:" + width + "px; height:" + height + "px;'></div>";
    let paper = Raphael("bsg-map-canvas", width, height);

    window.raidersArmy = [];

    let eb = new EventBus("http://localhost:8080/eventbus");
    eb.onopen = function () {
        eb.registerHandler("raiders", function (err, msg) {
            if(raidersArmy.length === 0) {
                JSON.parse(msg.body).forEach((raider) => {

                    raidersArmy.push(
                        new Raider(
                            raider.name,
                            raider.metadata.basestar.color, // raider.color
                            raider.metadata.coordinates.x,
                            raider.metadata.coordinates.y,
                            5, // raider.size
                            paper)
                    );



                });
            }
            else{
                let raiderOnTheMap = null;
                JSON.parse(msg.body).forEach((raider) => {
                    // search the raider on the mao
                    raiderOnTheMap = raidersArmy.filter(function (raiderOnTheMap) {
                        return raiderOnTheMap.name === raider.name;
                    })[0];
                    if (raiderOnTheMap) {
                        raiderOnTheMap.xVelocity = raider.metadata.coordinates.xVelocity;
                        raiderOnTheMap.yVelocity = raider.metadata.coordinates.yVelocity;
                        //raiderOnTheMap.size = raider.size;
                        //raiderOnTheMap.color = `#${raider.metadata.basestar.color}`;

                        //console.log(raiderOnTheMap)

                        raiderOnTheMap.move(raider.metadata.basestar.color);
                    } else { // there is a new raider!!!

                        //TODO: change the color with the basestar
                        // raider.metadata.basestar
                        raiderOnTheMap = new Raider(
                            raider.name,
                            raider.metadata.basestar.color,
                            raider.metadata.coordinates.x,
                            raider.metadata.coordinates.y,
                            5,
                            paper
                        );

                        console.log(raiderOnTheMap);

                        raidersArmy.push(raiderOnTheMap);
                        raiderOnTheMap.xVelocity = raider.metadata.coordinates.xVelocity;
                        raiderOnTheMap.yVelocity = raider.metadata.coordinates.yVelocity;
                        raiderOnTheMap.size = 5;
                        raiderOnTheMap.move();
                    }
                });
            }
        })
    }
}
